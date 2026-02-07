import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Colors } from "../src/theme/Colors";
import { useAuth } from "../src/contexts/AuthContext";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { typography } from "../src/theme/typography";

export default function Index() {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        router.replace("/(tabs)/explore");
      } else {
        router.replace("/(auth)/login");
      }
    }
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar style="dark" />

        {/* Animated Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Ionicons name="leaf" size={48} color={Colors.primary} />
          </View>
        </View>

        <Text style={styles.brandName}>HabiDev</Text>
        <Text style={styles.tagline}>Construye mejores hábitos</Text>

        <ActivityIndicator
          size="small"
          color={Colors.primary}
          style={styles.loader}
        />
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  logoContainer: {
    marginBottom: 24,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 28,
    backgroundColor: "#fff",
    borderWidth: 3,
    borderColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  brandName: {
    fontSize: typography.fontSize["4xl"],
    fontWeight: typography.fontWeight.bold,
    color: Colors.text,
    marginBottom: 8,
    letterSpacing: -1,
  },
  tagline: {
    fontSize: typography.fontSize.base,
    color: Colors.textSecondary,
    marginBottom: 32,
  },
  loader: {
    marginTop: 8,
  },
});
