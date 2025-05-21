export interface FormField {
  value: string;
  error?: string;
}

export interface UserFormData {
  [key: string]: FormField;
  name: FormField;
  email: FormField;
  password: FormField;
  surname: FormField;
}

export interface SignInFormData {
  email: FormField;
  password: FormField;
  [key: string]: FormField;
}

export type ValidationRule = (
  value: string,
  fieldName?: string
) => string | undefined;

export interface ValidationRules {
  [key: string]: ValidationRule[];
}
