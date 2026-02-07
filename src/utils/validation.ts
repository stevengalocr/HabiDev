// Professional validation utilities with detailed error messages

export const validateEmail = (email: string): string | null => {
  if (!email || email.trim() === "") {
    return "El correo electrónico es requerido";
  }

  const trimmedEmail = email.trim().toLowerCase();

  // Basic format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return "Formato de correo electrónico inválido";
  }

  // Check for common typos
  const commonDomains = [
    "gmail.com",
    "hotmail.com",
    "yahoo.com",
    "outlook.com",
  ];
  const domain = trimmedEmail.split("@")[1];

  // Length check
  if (trimmedEmail.length > 254) {
    return "El correo electrónico es demasiado largo";
  }

  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password || password.trim() === "") {
    return "La contraseña es requerida";
  }

  // No additional requirements - user can use any password they want
  return null;
};

export const validateFullName = (name: string): string | null => {
  if (!name || name.trim() === "") {
    return "El nombre completo es requerido";
  }

  const trimmedName = name.trim();

  if (trimmedName.length < 2) {
    return "El nombre es demasiado corto";
  }

  if (trimmedName.length > 100) {
    return "El nombre es demasiado largo";
  }

  // Check for at least 2 words (first and last name)
  const words = trimmedName.split(/\s+/).filter((word) => word.length > 0);
  if (words.length < 2) {
    return "Ingresa tu nombre y apellido";
  }

  // Check for valid characters (letters, spaces, hyphens, apostrophes)
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/.test(trimmedName)) {
    return "El nombre contiene caracteres inválidos";
  }

  return null;
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string,
): string | null => {
  if (!confirmPassword || confirmPassword.trim() === "") {
    return "Confirma tu contraseña";
  }

  if (password !== confirmPassword) {
    return "Las contraseñas no coinciden";
  }

  return null;
};

// Format Supabase auth errors to user-friendly Spanish messages
export const formatAuthError = (error: any): string => {
  const message = error?.message?.toLowerCase() || "";

  if (message.includes("invalid login credentials")) {
    return "Correo o contraseña incorrectos";
  }

  if (
    message.includes("email already registered") ||
    message.includes("user already registered")
  ) {
    return "Este correo ya está registrado";
  }

  if (
    message.includes("weak password") ||
    message.includes("password should")
  ) {
    return "La contraseña no es lo suficientemente segura";
  }

  if (message.includes("invalid email")) {
    return "Formato de correo inválido";
  }

  if (message.includes("user not found")) {
    return "No existe una cuenta con este correo";
  }

  if (message.includes("email not confirmed")) {
    return "Debes confirmar tu correo antes de iniciar sesión";
  }

  if (message.includes("too many requests")) {
    return "Demasiados intentos. Intenta de nuevo más tarde";
  }

  if (message.includes("network")) {
    return "Error de conexión. Verifica tu internet";
  }

  // Default fallback
  return "Ha ocurrido un error. Intenta de nuevo";
};
