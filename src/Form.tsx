/* eslint-disable @typescript-eslint/no-explicit-any */
import { Get, RequireAtLeastOne, RequireExactlyOne, Simplify } from 'type-fest';
import { ObjectPath } from 'typedash';
import { ZodType, z } from 'zod';

type InferValues<TOptions extends Pick<UseFormOptionsValues<any>, 'initialValues' | 'schema'>> =
  Simplify<TOptions['initialValues'] & z.infer<NonNullable<TOptions['schema']>>>;

export declare function useForm<TOptions extends UseFormOptionsValues<any>>(
  options: TOptions
): UseFormReturn<InferValues<TOptions>>;

type UseFormOptionsValues<TValues> = RequireAtLeastOne<
  {
    onSubmit: (values: TValues) => Promise<void>;
    initialValues?: TValues;
    schema?: ZodType<TValues>;
  },
  'initialValues' | 'schema'
>;

interface UseFormReturn<TValues> {
  Form: React.FC<FormProps<TValues>>;
  Field: <TPath extends ObjectPath<TValues>>(
    props: FieldProps<TPath, Get<TValues, TPath>>
  ) => JSX.Element;
  Submit: (props: SubmitProps<TValues>) => JSX.Element;

  _Subscriber: (props: FormSubscriberProps<TValues>) => JSX.Element;
}

interface FormSubscriberProps<TValues> {
  state: 'idle' | 'validating' | 'invalid' | 'valid' | 'submitting' | 'submitted';
  submitCount: number;

  canSubmit: boolean;
  isSubmitting: boolean;

  values: TValues;
}

type SubmitProps<TValues> = {
  children: (props: {
    getSubmitButtonProps(
      partialProps?: Partial<React.ButtonHTMLAttributes<HTMLButtonElement>>
    ): React.ButtonHTMLAttributes<HTMLButtonElement>;
  }) => JSX.Element;
};

export type FormProps<TValues> = React.FormHTMLAttributes<HTMLFormElement>;

export type FieldProps<K extends PropertyKey, TValue> = RequireExactlyOne<
  {
    name: K;
    initialValue?: TValue;
    validate: (value: TValue) => MaybePromise<boolean | string | undefined>;
    schema: ZodType<TValue>;
    children: (props: NativeHTMLFormProps<TValue>) => JSX.Element;
  },
  'validate' | 'schema'
>;

type NativeHTMLFormProps<TValue> = TValue extends string | number
  ? React.InputHTMLAttributes<HTMLInputElement>
  : Record<string, never>;

type _Placeholder<TAs = unknown> = TAs;

type MaybePromise<T> = T | Promise<T>;
