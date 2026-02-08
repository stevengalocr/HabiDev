import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import { Colors } from "@/theme/Colors";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { BrandLogo } from "@/components/ui/BrandIcons";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

  const handleSignOut = async () => {
    Alert.alert("Cerrar Sesión", "¿Estás seguro que deseas salir?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Salir",
        style: "destructive",
        onPress: async () => {
          await supabase.auth.signOut();
          router.replace("/(auth)/login");
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <BrandLogo size={48} />
          <Text style={styles.title}>Mi Perfil</Text>
        </View>

        <Card style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {user?.email?.charAt(0).toUpperCase() || "U"}
            </Text>
          </View>
          <Text style={styles.email}>{user?.email}</Text>
          <Text style={styles.role}>Miembro HabiDev</Text>
        </Card>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configuración</Text>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconInfo}>
              <Ionicons
                name="notifications-outline"
                size={20}
                color={Colors.primary}
              />
            </View>
            <Text style={styles.menuText}>Notificaciones</Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={Colors.textTertiary}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconInfo}>
              <Ionicons
                name="color-palette-outline"
                size={20}
                color={Colors.primary}
              />
            </View>
            <Text style={styles.menuText}>Apariencia</Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={Colors.textTertiary}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Button
            title="Cerrar Sesión"
            onPress={handleSignOut}
            variant="outline"
            style={styles.signOutButton}
          />
          <Text style={styles.version}>HabiDev v2.0.0</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.text,
    marginTop: 16,
  },
  profileCard: {
    alignItems: "center",
    paddingVertical: 24,
    marginHorizontal: 20,
    marginBottom: 32,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary + "20",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "700",
    color: Colors.primary,
  },
  email: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textSecondary,
    marginBottom: 16,
    marginLeft: 4,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  menuIconInfo: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.primary + "10",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    fontWeight: "500",
  },
  footer: {
    marginTop: "auto",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  signOutButton: {
    width: "100%",
    borderColor: Colors.error,
    marginBottom: 16,
  },
  version: {
    fontSize: 12,
    color: Colors.textTertiary,
  },
});
