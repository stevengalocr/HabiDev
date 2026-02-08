import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import { useHabits } from "@/hooks/useHabits";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { HabitCard } from "@/components/habits/HabitCard";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Colors } from "@/theme/Colors";
import { getGreeting } from "@/utils/dateHelpers";

export default function DashboardScreen() {
  const router = useRouter();
  const {
    habits,
    loading: habitsLoading,
    refetch: refetchHabits,
  } = useHabits();
  const {
    stats,
    loading: statsLoading,
    refetch: refetchStats,
  } = useDashboardStats();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refetchHabits(), refetchStats()]);
    setRefreshing(false);
  };

  const loading = habitsLoading || statsLoading;

  return (
    <View style={styles.container}>
      {/* Header with Gradient */}
      <LinearGradient
        colors={[Colors.primary, Colors.primaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <SafeAreaView edges={["top"]}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>{getGreeting()}</Text>
              <Text style={styles.headerTitle}>HabiDev</Text>
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => router.push("/(tabs)/habits")}
            >
              <Ionicons name="add-circle" size={32} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Stats Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumen de Hoy</Text>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.primary} />
            </View>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.statsContainer}
            >
              <StatsCard
                title="Hábitos Activos"
                value={stats?.active_habits || 0}
                icon="list"
                color={Colors.primary}
              />
              <StatsCard
                title="Completados Hoy"
                value={stats?.completed_today || 0}
                icon="checkmark-circle"
                color={Colors.success}
                subtitle={`${stats?.completion_rate || 0}% del total`}
              />
              <StatsCard
                title="Racha Total"
                value={stats?.current_streaks_sum || 0}
                icon="flame"
                color={Colors.accent}
                subtitle="días acumulados"
              />
              <StatsCard
                title="Mejor Racha"
                value={stats?.longest_streak || 0}
                icon="trophy"
                color="#F59E0B"
                subtitle="récord personal"
              />
            </ScrollView>
          )}
        </View>

        {/* Habits Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Mis Hábitos</Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)/habits")}>
              <Text style={styles.seeAllText}>Ver todos</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.primary} />
            </View>
          ) : habits.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons
                name="checkbox-outline"
                size={64}
                color={Colors.textTertiary}
              />
              <Text style={styles.emptyTitle}>No tienes hábitos aún</Text>
              <Text style={styles.emptySubtitle}>
                Comienza creando tu primer hábito y empieza a construir mejores
                rutinas
              </Text>
              <TouchableOpacity
                style={styles.createButton}
                onPress={() => router.push("/(tabs)/habits")}
              >
                <LinearGradient
                  colors={[Colors.primary, Colors.primaryDark]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.createButtonGradient}
                >
                  <Ionicons name="add" size={20} color="#FFFFFF" />
                  <Text style={styles.createButtonText}>Crear Hábito</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.habitsList}>
              {habits.slice(0, 5).map((habit) => (
                <HabitCard key={habit.id} habit={habit} />
              ))}
            </View>
          )}
        </View>

        {/* Motivational Message */}
        {stats && stats.completion_rate > 0 && (
          <View style={styles.motivationCard}>
            <Text style={styles.motivationText}>
              {stats.completion_rate === 100
                ? "¡Increíble! Completaste todos tus hábitos hoy 🎉"
                : stats.completion_rate >= 75
                  ? "¡Excelente progreso! Sigue así 💪"
                  : stats.completion_rate >= 50
                    ? "¡Buen trabajo! Ya llevas la mitad 👍"
                    : "¡Vamos! Aún tienes tiempo para completar más 🚀"}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingBottom: 24,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  greeting: {
    fontSize: 16,
    color: "#FFFFFF",
    opacity: 0.9,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  addButton: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 32,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text,
  },
  seeAllText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "600",
  },
  statsContainer: {
    paddingVertical: 8,
    gap: 12,
  },
  loadingContainer: {
    paddingVertical: 48,
    alignItems: "center",
  },
  habitsList: {
    gap: 16,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 48,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
  },
  createButton: {
    marginTop: 24,
    borderRadius: 12,
    overflow: "hidden",
  },
  createButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 24,
    gap: 8,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  motivationCard: {
    marginHorizontal: 20,
    marginTop: 24,
    padding: 20,
    backgroundColor: Colors.accent + "20",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.accent + "40",
  },
  motivationText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.accent,
    textAlign: "center",
  },
});
