import { z } from 'zod';
import { useForm } from './Form';

export default function App() {
  const form = useForm({
    initialValues: {
      age: 10,
      a: {
        b: {
          c: 1,
        },
      },
    },
    schema: z
      .object({
        firstName: z.string().min(3),
        lastName: z.string().min(3),
      })
      .required(),
    onSubmit: () => Promise.resolve(),
  });

  return (
    <div>
      <h1>test</h1>

      <form.Form>
        <form.Field name="firstName" validate={value => value.toLowerCase() === value}>
          {fieldProps => <input {...fieldProps} />}
        </form.Field>

        <form.Field name="age" initialValue={12} schema={z.number().positive()}>
          {fieldProps => <input {...fieldProps} />}
        </form.Field>

        {/* test cases ⬇️ */}
        <form.Field
          name="a.b"
          schema={z.object({
            c: z.boolean(), // `c` should be a boolean
          })}
        >
          {fieldProps => <input {...fieldProps} />}
        </form.Field>

        <form.Field
          name="lastName"
          initialValue={12} // expected a string
        >
          {fieldProps => <input {...fieldProps} />}
        </form.Field>

        <form.Field
          name="invalidFieldName" // not a valid field name
        >
          {fieldProps => <input {...fieldProps} />}
        </form.Field>

        <form.Submit>
          {({ getSubmitButtonProps }) => (
            <>
              <a href="#">Cancel</a>

              <button {...getSubmitButtonProps()}>Submit</button>
            </>
          )}
        </form.Submit>
      </form.Form>
    </div>
  );
}
