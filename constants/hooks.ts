import { SignInFormData, ValidationRules } from "@/types/hooks/form-types";
import {
  validateEmail,
  validatePassword,
  validateRequired,
} from "@/utils/validation";
import { UserFormData } from "@/types/hooks/form-types";
import { validateName } from "@/utils/validation";

export const INITIAL_SIGNIN_STATE: SignInFormData = {
  email: { value: "" },
  password: { value: "" },
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

export const FORGOT_PASSWORD_VALIDATION_RULES: ValidationRules = {
  email: [validateEmail],
  code: [validateRequired],
  newPassword: [validatePassword],
  // confirmPassword: [validateConfirmPassword],
};
