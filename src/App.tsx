import { z } from 'zod';
import { useForm } from './Form';

export default function App() {
  const form = useForm({
    initialValues: {
      age: 10,
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
      </form.Form>
    </div>
  );
}
