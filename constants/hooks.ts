import { SignInFormData } from "@/types/hooks/form-types";
import { validateEmail, validatePassword } from "@/utils/validation";
import { UserFormData } from "@/types/hooks/form-types";
import { validateName } from "@/utils/validation";

export const INITIAL_SIGNIN_STATE: SignInFormData = {
  email: { value: '', },
  password: { value: '' }
};

export const SIGNIN_VALIDATION_RULES = {
  email: [validateEmail],
  password: [validatePassword]
};

export const INITIAL_SIGNUP_STATE: UserFormData = {
  email: { value: '' },
  password: { value: '' },
  name: { value: '' },
  surname: { value: '' }
};

export const SIGNUP_VALIDATION_RULES = {
  email: [validateEmail],
  password: [validatePassword],
  name: [validateName],
  surname: [validateName]
};