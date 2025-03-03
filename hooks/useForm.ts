import { useState, useCallback } from "react";
import { FormField, ValidationRules } from "../types/hooks/form-types";

export const useForm = <T extends { [key: string]: FormField }>(
  initialState: T,
  validationRules?: ValidationRules
) => {
  const [form, setForm] = useState<T>(initialState);

  const validateField = useCallback((name: keyof T, value: string): string | undefined => {
    if (!validationRules || !validationRules[name as string]) return undefined;

    for (const rule of validationRules[name as string]) {
      const error = rule(value);
      if (error) return error;
    }

    return undefined;
  }, [validationRules]);

  const setFieldValue = useCallback((name: keyof T, value: string) => {
    const error = validateField(name, value);

    setForm(prev => ({
      ...prev,
      [name]: {
        value,
        error,
      }
    }));
  }, [validateField]);

  const isValid = useCallback((): boolean => {
    return Object.keys(form).every(key => {
      const field = form[key];
      return !field.error && field.value !== '';
    });
  }, [form]);

  const resetForm = useCallback(() => {
    setForm(initialState);
  }, [initialState]);

  return {
    form,
    setFieldValue,
    isValid,
    resetForm
  };
};