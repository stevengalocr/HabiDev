// Professional validation utilities with i18n support
import i18n from "../i18n";

export const validateEmail = (email: string): string | null => {
  if (!email || email.trim() === "") {
    return i18n.t("auth.validation.emailRequired");
  }

  const trimmedEmail = email.trim().toLowerCase();

  // Basic format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return i18n.t("auth.validation.emailInvalid");
  }

  // Length check
  if (trimmedEmail.length > 254) {
    return i18n.t("auth.validation.emailTooLong");
  }

  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password || password.trim() === "") {
    return i18n.t("auth.validation.passwordRequired");
  }

  // No additional requirements - user can use any password they want
  return null;
};

export const validateFullName = (name: string): string | null => {
  if (!name || name.trim() === "") {
    return i18n.t("auth.validation.nameRequired");
  }

  const trimmedName = name.trim();

  if (trimmedName.length < 2) {
    return i18n.t("auth.validation.nameTooShort");
  }

  // Check for at least 2 words (first and last name)
  const words = trimmedName.split(/\s+/).filter((word) => word.length > 0);
  if (words.length < 2) {
    return i18n.t("auth.validation.fullNameRequired");
  }

  // Check for valid characters (letters, spaces, hyphens, apostrophes)
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/.test(trimmedName)) {
    return i18n.t("auth.validation.nameInvalidChars");
  }

  return null;
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string,
): string | null => {
  if (!confirmPassword || confirmPassword.trim() === "") {
    return i18n.t("auth.validation.confirmPasswordRequired");
  }

  if (password !== confirmPassword) {
    return i18n.t("auth.validation.passwordsNoMatch");
  }

  return null;
};

export const formatAuthError = (error: any): string => {
  const errorMessage = error?.message || String(error);

  if (errorMessage.includes("Invalid login credentials")) {
    return i18n.t("auth.login.loginError");
  }

  if (errorMessage.includes("User already registered")) {
    return i18n.t("auth.register.registerError");
  }

  return errorMessage;
};
