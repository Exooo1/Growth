import { ETypeError, IError, IErrorsStore } from "@/types/store/errors-types";
import { create } from "zustand";

export const useErrorsStore = create<IErrorsStore>((set) => ({
  errors: [],
  addError: (text: string, type: ETypeError) => {
    set((state: IErrorsStore) => {
      if (state.errors.length >= 5) return state;
      return {
        errors: [
          ...state.errors,
          { id: (Math.random() * 100).toFixed(34), text, type },
        ],
      };
    });
  },
  removeError: (id: string) =>
    set((state: IErrorsStore) => ({
      errors: state.errors.filter((error: IError) => error.id !== id),
    })),
}));
