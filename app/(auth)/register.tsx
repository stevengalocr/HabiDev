import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
import { Button } from "../../src/components/ui/Button";
import { Input } from "../../src/components/ui/Input";
import { TugaAvatar } from "../../src/components/ui/TugaAvatar";
import { useAuth } from "../../src/contexts/AuthContext";
import { Colors } from "../../src/theme/Colors";
import { typography } from "../../src/theme/typography";
import {
  formatAuthError,
  validateEmail,
  validateFullName,
  validatePassword,
  validateConfirmPassword,
} from "../../src/utils/validation";

export default function RegisterScreen() {
  const { t } = useTranslation();
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [fullNameError, setFullNameError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    // Reset errors
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setFullNameError("");

    // Validate inputs
    const fullNameValidation = validateFullName(fullName);
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);
    const confirmPasswordValidation = validateConfirmPassword(
      password,
      confirmPassword,
    );

    if (fullNameValidation) {
      setFullNameError(fullNameValidation);
      return;
    }

    if (emailValidation) {
      setEmailError(emailValidation);
      return;
    }

    if (passwordValidation) {
      setPasswordError(passwordValidation);
      return;
    }

    if (confirmPasswordValidation) {
      setConfirmPasswordError(confirmPasswordValidation);
      return;
    }

    setIsLoading(true);

    const { error } = await signUp(email, password, fullName);

    setIsLoading(false);

    if (error) {
      const friendlyError = formatAuthError(error);
      Alert.alert("Error al registrarse", friendlyError);
      return;
    }

    Alert.alert(
      "¡Cuenta creada!",
      "Por favor verifica tu correo electrónico para activar tu cuenta.",
      [{ text: "Ir al Login", onPress: () => router.replace("/(auth)/login") }],
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TugaAvatar
              size={240}
              animated={true}
              imageSource={require("../../assets/register.png")}
            />
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Input
              label={t("auth.register.nameLabel")}
              placeholder={t("auth.register.namePlaceholder")}
              value={fullName}
              onChangeText={(text) => {
                setFullName(text);
                setFullNameError("");
              }}
              error={fullNameError}
              icon="person-outline"
              autoCapitalize="words"
            />

            <Input
              label={t("auth.register.emailLabel")}
              placeholder={t("auth.register.emailPlaceholder")}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setEmailError("");
              }}
              error={emailError}
              icon="mail-outline"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Input
              label={t("auth.register.passwordLabel")}
              placeholder={t("auth.register.passwordPlaceholder")}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setPasswordError("");
              }}
              error={passwordError}
              icon="lock-closed-outline"
              isPassword
              autoCapitalize="none"
            />

            <Input
              label={t("auth.register.confirmPasswordLabel")}
              placeholder={t("auth.register.confirmPasswordPlaceholder")}
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                setConfirmPasswordError("");
              }}
              error={confirmPasswordError}
              icon="lock-closed-outline"
              isPassword
              autoCapitalize="none"
            />

            <View style={styles.termsContainer}>
              <Text style={styles.termsText}>
                {t("auth.register.termsPrefix")}{" "}
                <Text style={styles.linkText}>{t("auth.register.terms")}</Text>{" "}
                {t("auth.register.and")}{" "}
                <Text style={styles.linkText}>
                  {t("auth.register.privacyPolicy")}
                </Text>
                .
              </Text>
            </View>

            <Button
              title={t("auth.register.registerButton")}
              onPress={handleRegister}
              isLoading={isLoading}
              fullWidth
              size="lg"
            />

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                {t("auth.register.alreadyHaveAccount")}{" "}
              </Text>
              <Link href="/(auth)/login" asChild>
                <Pressable>
                  <Text style={styles.footerLink}>
                    {t("auth.register.signIn")}
                  </Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  title: {
    fontSize: typography.fontSize["3xl"],
    fontWeight: typography.fontWeight.bold,
    color: Colors.text,
    marginBottom: 8,
    textAlign: "center",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    color: Colors.textSecondary,
    textAlign: "center",
    marginBottom: 12,
    lineHeight: 24,
    maxWidth: 300,
  },
  form: {
    width: "100%",
  },
  termsContainer: {
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  termsText: {
    fontSize: typography.fontSize.xs,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 18,
  },
  linkText: {
    color: Colors.primary,
    fontWeight: typography.fontWeight.semibold,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  footerText: {
    fontSize: typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  footerLink: {
    fontSize: typography.fontSize.sm,
    color: Colors.primary,
    fontWeight: typography.fontWeight.bold,
  },
});
