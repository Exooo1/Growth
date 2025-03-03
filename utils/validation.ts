export const validateEmail = (email: string): string | undefined => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email is required';
  if (!emailRegex.test(email)) return 'Invalid email format';
  return undefined;
};

export const validatePassword = (password: string): string | undefined => {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
  if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter';
  if (!/[0-9]/.test(password)) return 'Password must contain at least one number';
  return undefined;
};

export const validateRequired = (value: string): string | undefined => {
  if (!value) return 'This field is required';
  return undefined;
};

export const validateName = (value: string): string | undefined => {
  if (!value) return 'This field is required';
  if (value.length < 2) return 'Must be at least 2 characters';
  if (!/^[A-Za-z\s-]+$/.test(value)) return 'Must contain only letters, spaces, and hyphens';
  return undefined;
}; 