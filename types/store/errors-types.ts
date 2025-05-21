export interface IErrorsStore {
  errors: IError[];
  addError: (text: string, type: ETypeError) => void;
  removeError: (id: string) => void;
}

export enum ETypeError {
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
  SUCCESS = "success",
}

export interface IError {
  id: string;
  text: string;
  type: ETypeError;
}
