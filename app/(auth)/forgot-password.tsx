import { Ionicons } from "@expo/vector-icons";
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
import { formatAuthError, validateEmail } from "../../src/utils/validation";

export default function ForgotPasswordScreen() {
  const { t } = useTranslation();
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    setEmailError("");

    const emailValidation = validateEmail(email);
    if (emailValidation) {
      setEmailError(emailValidation);
      return;
    }

    setIsLoading(true);

    const { error } = await resetPassword(email);

    setIsLoading(false);

    if (error) {
      Alert.alert("Error", formatAuthError(error));
      return;
    }

    Alert.alert(
      t("auth.forgotPassword.emailSent"),
      t("auth.forgotPassword.checkInbox"),
      [
        {
          text: t("auth.forgotPassword.goToLogin"),
          onPress: () => router.back(),
        },
      ],
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
          <View style={styles.header}>
            <TugaAvatar
              size={320}
              animated={true}
              imageSource={require("../../assets/forgot-password.png")}
            />

            <Text style={styles.title}>{t("auth.forgotPassword.title")}</Text>
            <Text style={styles.subtitle}>
              {t("auth.forgotPassword.subtitle")}
            </Text>
          </View>

          <View style={styles.form}>
            <Input
              label={t("auth.forgotPassword.emailLabel")}
              placeholder={t("auth.forgotPassword.emailPlaceholder")}
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

            <Button
              title={t("auth.forgotPassword.sendButton")}
              onPress={handleResetPassword}
              isLoading={isLoading}
              fullWidth
              size="lg"
            />

            <Link href="/(auth)/login" asChild>
              <Pressable style={styles.backButton}>
                <Ionicons
                  name="arrow-back"
                  size={20}
                  color={Colors.textSecondary}
                />
                <Text style={styles.backButtonText}>
                  {t("auth.forgotPassword.backToLogin")}
                </Text>
              </Pressable>
            </Link>
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
    paddingTop: 60,
    paddingBottom: 40,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
    gap: 24,
  },
  title: {
    fontSize: typography.fontSize["2xl"],
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
    maxWidth: 280,
  },
  form: {
    width: "100%",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32,
    paddingVertical: 12,
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: typography.fontSize.sm,
    color: Colors.textSecondary,
    fontWeight: typography.fontWeight.medium,
  },
});
