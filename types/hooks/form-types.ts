export type FormField = {
  value: string;
  error?: string;
};

export type UserFormData = {
  name: FormField;
  email: FormField;
  password: FormField;
  surname: FormField;
};

export type SignInFormData = {
  email: FormField;
  password: FormField;
};

export type ValidationRule = (value: string, form?: any) => string | undefined;

export type ValidationRules = {
  [key: string]: ValidationRule[];
};
