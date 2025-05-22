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
        const error = rule(value, name as string);
        if (error) return error;
      }
      return undefined;
    },
    [validationRules]
  );

  const setFieldValue = useCallback(
    (name: keyof T, value: string) => {
      const error = validateField(name, value);

      setForm((prev) => ({
        ...prev,
        [name]: {
          value,
          error,
        },
      }));
    },
    [validateField]
  );

  const isValid = useCallback((): string => {
    let error = "";
    for (const field in form) {
      if (typeof form[field] === "object" && form[field]?.error) {
        error = form[field]?.error;
        break;
      }
    }
    return error;
  }, [form]);

  const resetForm = useCallback(() => {
    setForm(initialState);
  }, [initialState]);

  return {
    form,
    setFieldValue,
    isValid,
    resetForm,
  };
};
