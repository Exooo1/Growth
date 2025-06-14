export const validateEmail = (email: string): string | undefined => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "Email is required";
  if (!emailRegex.test(email)) return "Invalid email format";
  return undefined;
};

export const validatePassword = (password: string): string | undefined => {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters";
  return undefined;
};

export const validateConfirmPassword = (
  value: string,
  passwordToCompare: string
): string | undefined => {
  if (value !== passwordToCompare) return "Passwords do not match";
  return undefined;
};

export const validateRequired = (value: string): string | undefined => {
  if (!value) return "This field is required";
  return undefined;
};

export const validateName = (
  value: string,
  fieldName: string
): string | undefined => {
  if (!value) return `${fieldName} is required`;
  if (value.length < 2) return `${fieldName} must be at least 2 characters`;
  if (!/^[A-Za-z\s-]+$/.test(value))
    return `${fieldName} must contain only letters, spaces, and hyphens`;
  return undefined;
};
