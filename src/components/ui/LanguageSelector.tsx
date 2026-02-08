import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../theme/Colors";
import { typography } from "../../theme/typography";
import { changeLanguage } from "../../i18n";

const LANGUAGES = [
  { code: "es", label: "ES", fullName: "Español" },
  { code: "en", label: "EN", fullName: "English" },
  { code: "pt", label: "PT", fullName: "Português" },
];

export const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const currentLanguage = i18n.language;

  const handleLanguageChange = async (languageCode: string) => {
    await changeLanguage(languageCode);
    setIsOpen(false);
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconButton} onPress={toggleOpen}>
        <Ionicons name="globe-outline" size={24} color={Colors.textSecondary} />
        <Text style={styles.currentLangLabel}>
          {currentLanguage.toUpperCase()}
        </Text>
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.dropdown}>
          {LANGUAGES.map((lang, index) => {
            const isActive = currentLanguage === lang.code;
            const isLast = index === LANGUAGES.length - 1;

            if (isActive) {
              return (
                <Pressable
                  key={lang.code}
                  onPress={() => handleLanguageChange(lang.code)}
                  style={[
                    styles.optionWrapper,
                    isLast && styles.lastOptionButton,
                  ]}
                >
                  <LinearGradient
                    colors={[Colors.primary, "#2DD4BF"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.activeGradient}
                  >
                    <Text style={[styles.optionText, styles.activeOptionText]}>
                      {lang.fullName}
                    </Text>
                    <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                  </LinearGradient>
                </Pressable>
              );
            }

            return (
              <Pressable
                key={lang.code}
                onPress={() => handleLanguageChange(lang.code)}
                style={({ pressed }) => [
                  styles.optionButton,
                  isLast && styles.lastOptionButton,
                  pressed && styles.pressedOption,
                ]}
              >
                <Text style={styles.optionText}>{lang.fullName}</Text>
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
    // Ensure the dropdown doesn't get clipped if it goes outside bounds,
    // but in absolute positioning context it usually works fine.
    zIndex: 100,
  },
  iconButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 6,
  },
  currentLangLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: Colors.text,
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    right: 0,
    marginTop: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    minWidth: 140,
    // Shadow for dropdown
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 10,
    padding: 4,
  },
  optionWrapper: {
    borderRadius: 8,
    overflow: "hidden", // Important for gradient border radius
    marginBottom: 4,
  },
  activeGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 4,
  },
  lastOptionButton: {
    marginBottom: 0,
  },
  pressedOption: {
    backgroundColor: Colors.background,
    opacity: 0.8,
  },
  optionText: {
    fontSize: typography.fontSize.sm,
    color: Colors.text,
    fontWeight: typography.fontWeight.medium,
  },
  activeOptionText: {
    color: "#FFFFFF",
    fontWeight: typography.fontWeight.bold,
  },
});
