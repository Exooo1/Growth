import { SignInFormData, ValidationRules } from "@/types/hooks/form-types";
import {
  validateEmail,
  validatePassword,
  validateRequired,
  validateConfirmPassword,
} from "@/utils/validation";
import { UserFormData } from "@/types/hooks/form-types";
import { validateName } from "@/utils/validation";

export const INITIAL_SIGNIN_STATE = {
  email: { value: "", error: "" },
  password: { value: "", error: "" },
};

export const SIGNIN_VALIDATION_RULES = {
  email: [validateEmail],
  password: [validatePassword],
};

export const INITIAL_SIGNUP_STATE: UserFormData = {
  email: { value: "" },
  password: { value: "" },
  name: { value: "" },
  surname: { value: "" },
};

export const SIGNUP_VALIDATION_RULES: ValidationRules = {
  name: [(value: string) => validateName(value, "Name")],
  surname: [(value: string) => validateName(value, "Surname")],
  email: [validateEmail],
  password: [validatePassword],
};

export const FORGOT_PASSWORD_VALIDATION_RULES = {
  email: [validateEmail],
  code: [(value: string) => validateRequired(value)],
  newPassword: [validatePassword],
  confirmPassword: [
    (value: string, form: any) =>
      validateConfirmPassword(value, form.newPassword.value),
  ],
};
