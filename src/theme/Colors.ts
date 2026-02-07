// HabiDev Brand Colors - Cyber-Zen Light Edition
// Concept: "Clean Sanctuary" Background + "Arc Reactor" Energy Accents

// Light Theme (Default/Primary) - Clarity & Calm
const lightTheme = {
  background: "#F9FAFB", // Soft off-white (menos agresivo que blanco puro)
  surface: "#FFFFFF",
  card: "#FFFFFF",

  text: "#0F172A", // Slate 900
  textSecondary: "#475569",
  textTertiary: "#94A3B8",

  // Primary = Confianza + calma (NO neón)
  primary: "#3BAFDA", // Soft Tech Blue (más humano)
  primaryDark: "#2B8DBE",
  primaryLight: "#A7D8F0",

  // Accent = recompensa / logro
  accent: "#F4B740", // Golden Amber suave (menos chillón)

  border: "#E5E7EB",

  success: "#22C55E", // Green calm
  warning: "#F4B740",
  error: "#EF4444",
  info: "#3B82F6",
};

// Dark Theme (Optional Night Mode)
const darkTheme = {
  background: "#0B1220", // Deep night blue
  surface: "#111827",
  card: "#111827",

  text: "#E5E7EB",
  textSecondary: "#9CA3AF",
  textTertiary: "#6B7280",

  primary: "#4FC3F7", // Cyan calm (NO neón)
  primaryDark: "#0284C7",
  primaryLight: "#A5E3FF",

  accent: "#F4B740",
  border: "#1F2937",

  success: "#22C55E",
  warning: "#F4B740",
  error: "#FB7185",
  info: "#38BDF8",
};

export const Colors = {
  // Default to Light Theme (Clarity)
  ...lightTheme,

  // Explicit themes for future hooks
  light: lightTheme,
  dark: darkTheme,

  // Habit Colors
  habitGood: "#22C55E", // Progreso saludable
  habitBad: "#FB923C", // Desafío, NO culpa
  habitNeutral: "#CBD5E1", // Suave, no gris muerto
  habitStreak: "#F4B740", // Recompensa visual
};
