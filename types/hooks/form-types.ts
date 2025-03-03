export interface FormField {
  value: string;
  error?: string;
}

export interface UserFormData {
  email: FormField;
  password: FormField;
  name: FormField;
  surname: FormField;
}

export interface SignInFormData {
  email: FormField;
  password: FormField;
  [key: string]: FormField;
}

export type ValidationRule = (value: string) => string | undefined;

export interface ValidationRules {
  [key: string]: ValidationRule[];
} 