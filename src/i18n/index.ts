import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import translation resources
import en from "./locales/en.json";
import es from "./locales/es.json";
import pt from "./locales/pt.json";

// AsyncStorage key for persisting language preference
const LANGUAGE_KEY = "user-language";

// Get device locale (e.g., 'en-US', 'es-MX', 'pt-BR')
const deviceLanguage = Localization.getLocales()[0].languageCode || "en";

// Map device language to supported languages
const getSupportedLanguage = (lang: string): string => {
  const langCode = lang.split("-")[0]; // Extract 'en' from 'en-US'
  const supported = ["en", "es", "pt"];
  return supported.includes(langCode) ? langCode : "en";
};

// Initialize language from AsyncStorage or device settings
const initLanguage = async (): Promise<string> => {
  try {
    const storedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
    return storedLanguage || getSupportedLanguage(deviceLanguage);
  } catch (error) {
    console.error("Error loading language preference:", error);
    return getSupportedLanguage(deviceLanguage);
  }
};

// Initialize i18next
initLanguage().then((language) => {
  i18n
    .use(initReactI18next) // Passes i18n instance to react-i18next
    .init({
      compatibilityJSON: "v4", // Required for React Native
      resources: {
        en: { translation: en },
        es: { translation: es },
        pt: { translation: pt },
      },
      lng: language, // Set initial language
      fallbackLng: "en", // Fallback to English if translation is missing
      interpolation: {
        escapeValue: false, // React already escapes values
      },
      react: {
        useSuspense: false, // Disable Suspense for React Native
      },
    });
});

// Export function to change language and persist it
export const changeLanguage = async (lang: string) => {
  try {
    await AsyncStorage.setItem(LANGUAGE_KEY, lang);
    await i18n.changeLanguage(lang);
  } catch (error) {
    console.error("Error changing language:", error);
  }
};

export default i18n;
