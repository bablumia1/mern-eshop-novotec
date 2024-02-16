// validation.js

// Email validation
export const validateEmail = (email) => {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
};

// Password validation
export const validatePassword = (password) => {
  return password.trim().length > 0;
};

export const validateInput = (input) => {
  return input.trim().length > 0;
};

// Common form validation
export const validateForm = (formData) => {
  const errors = {};

  if (!validateEmail(formData.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!validatePassword(formData.password)) {
    errors.password = "Please enter a password";
  }

  if (!validateInput(formData.firstName)) {
    errors.firstName = "Please enter your first name";
  }

  return errors;
};
