import { useCallback, useState } from "react";
import { FormField, ValidationRules } from "../types/hooks/form-types";

export const useForm = <T extends { [key: string]: FormField }>(
  initialState: T,
  validationRules?: ValidationRules
) => {
  const [form, setForm] = useState<T>(initialState);

  const validateField = useCallback(
    (name: keyof T, value: string): string | undefined => {
      if (!validationRules || !validationRules[name as string])
        return undefined;
      for (const rule of validationRules[name as string]) {
        const error = rule(value, form);
        if (error) return error;
      }
      return undefined;
    },
    [validationRules, form]
  );

  const setFieldValue = useCallback(
    (name: keyof T, value: string) => {
      const error = validateField(name, value);

      setForm((prev) => ({
        ...prev,
        [name]: {
          ...(prev[name] as FormField),
          value,
          error,
        },
      }));
    },
    [validateField]
  );

  const validateFields = useCallback(
    (fieldsToValidate: (keyof T)[]): string | undefined => {
      if (!validationRules) return undefined;

      const newFormState = { ...form };
      let firstError: string | undefined = undefined;

      for (const fieldName of fieldsToValidate) {
        const value = form[fieldName].value;
        const error = validateField(fieldName, value);
        newFormState[fieldName] = {
          ...form[fieldName],
          error,
        };
        if (error && !firstError) {
          firstError = error;
        }
      }
      setForm(newFormState);
      return firstError;
    },
    [form, validationRules, validateField]
  );

  const isValid = useCallback(
    (fieldsToValidate: (keyof T)[]): string => {
      let error = "";
      for (const field of fieldsToValidate) {
        if (typeof form[field] === "object" && form[field]?.error) {
          error = form[field]?.error;
          break;
        }
      }
      return error;
    },
    [form]
  );

  const resetForm = useCallback(() => {
    setForm(initialState);
  }, [initialState]);

  return {
    form,
    setFieldValue,
    isValid,
    validateFields,
    resetForm,
  };
};
