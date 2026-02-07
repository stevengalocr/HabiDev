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
import { Button } from "../../src/components/ui/Button";
import { Input } from "../../src/components/ui/Input";
import { TugaAvatar } from "../../src/components/ui/TugaAvatar"; // New component
import { useAuth } from "../../src/contexts/AuthContext";
import { Colors } from "../../src/theme/Colors";
import { typography } from "../../src/theme/typography";
import {
  formatAuthError,
  validateEmail,
  validatePassword,
} from "../../src/utils/validation";

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    // Reset errors
    setEmailError("");
    setPasswordError("");

    // Validate inputs
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    if (emailValidation) {
      setEmailError(emailValidation);
      return;
    }

    if (passwordValidation) {
      setPasswordError(passwordValidation);
      return;
    }

    setIsLoading(true);

    const { error } = await signIn(email, password);

    setIsLoading(false);

    if (error) {
      const friendlyError = formatAuthError(error);
      Alert.alert("Error al iniciar sesión", friendlyError);
      return;
    }

    router.replace("/(tabs)/explore");
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
          {/* Professional Header */}
          <View style={styles.header}>
            <TugaAvatar
              size={300}
              animated={true}
              imageSource={require("../../assets/logo.png")}
            />
            <Text style={styles.title}>Bienvenido</Text>
            <Text style={styles.subtitle}>
              Tu espacio de crecimiento personal
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Input
              label="Correo Electrónico"
              placeholder="Ingresa tu correo electrónico"
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
              label="Contraseña"
              placeholder="Escribe tu contraseña aquí"
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

            <Link href="/(auth)/forgot-password" asChild>
              <Pressable style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>
                  ¿Olvidaste tu contraseña?
                </Text>
              </Pressable>
            </Link>

            <Button
              title="Iniciar Sesión"
              onPress={handleLogin}
              isLoading={isLoading}
              fullWidth
              size="lg"
            />

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>o continúa con</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>¿Nuevo aquí? </Text>
              <Link href="/(auth)/register" asChild>
                <Pressable>
                  <Text style={styles.footerLink}>Crea una cuenta</Text>
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
    paddingTop: 16,
    paddingBottom: 24,
    justifyContent: "center", // Center content vertically
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
    gap: 4,
  },
  title: {
    fontSize: typography.fontSize["2xl"],
    fontWeight: typography.fontWeight.bold,
    color: Colors.text,
    marginBottom: 6,
    textAlign: "center",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: typography.fontSize.sm,
    color: Colors.textSecondary,
    textAlign: "center",
    marginBottom: 8,
    lineHeight: 20,
  },
  form: {
    width: "100%",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 32, // Increased spacing
    marginTop: -8,
  },
  forgotPasswordText: {
    fontSize: typography.fontSize.sm,
    color: Colors.primary, // Interactive color
    fontWeight: typography.fontWeight.semibold,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    paddingHorizontal: 16,
    fontSize: typography.fontSize.xs,
    color: Colors.light.textTertiary,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
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
