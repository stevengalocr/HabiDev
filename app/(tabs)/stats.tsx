import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Card } from "@/components/ui/Card";
import { Colors } from "@/theme/Colors";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { useHabitLogs } from "@/hooks/useHabitLogs"; // You might need a more generic hook for global logs if available, or just use stats for now
import {
  BrandLogo,
  ChartIcon,
  TrophyIcon,
  FireIcon,
} from "@/components/ui/BrandIcons";

export default function StatsScreen() {
  const { stats, loading } = useDashboardStats();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.primary, Colors.primaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <SafeAreaView edges={["top"]}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Estadísticas</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <View style={styles.content}>
        {/* Main Stats Overview */}
        <View style={styles.overviewContainer}>
          <Card style={styles.overviewCard}>
            <View style={styles.iconContainer}>
              <TrophyIcon size={32} color={Colors.accent} />
            </View>
            <Text style={styles.overviewValue}>
              {stats?.completion_rate || 0}%
            </Text>
            <Text style={styles.overviewLabel}>Tasa de Éxito Hoy</Text>
          </Card>

          <Card style={styles.overviewCard}>
            <View style={styles.iconContainer}>
              <FireIcon size={32} color="#F59E0B" />
            </View>
            <Text style={styles.overviewValue}>
              {stats?.longest_streak || 0}
            </Text>
            <Text style={styles.overviewLabel}>Mejor Racha Histórica</Text>
          </Card>
        </View>

        {/* Detailed Stats */}
        <Card style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <BrandLogo size={24} />
            </View>
            <View style={styles.detailText}>
              <Text style={styles.detailLabel}>Total de Hábitos</Text>
              <Text style={styles.detailValue}>{stats?.total_habits || 0}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <ChartIcon size={24} />
            </View>
            <View style={styles.detailText}>
              <Text style={styles.detailLabel}>Completados Total</Text>
              <Text style={styles.detailValue}>
                {stats?.total_completions || 0}
              </Text>
            </View>
          </View>
        </Card>

        <View style={styles.chartPlaceholder}>
          <Text style={styles.placeholderText}>
            Próximamente: Gráficos detallados de rendimiento mensual
          </Text>
        </View>
      </View>
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
    paddingHorizontal: 20,
    paddingTop: 12,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  content: {
    padding: 20,
  },
  overviewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  overviewCard: {
    flex: 1,
    marginHorizontal: 6,
    alignItems: "center",
    paddingVertical: 24,
  },
  iconContainer: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: Colors.background,
    borderRadius: 50,
  },
  overviewValue: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.text,
  },
  overviewLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
    textAlign: "center",
  },
  detailsCard: {
    padding: 0,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  detailIcon: {
    marginRight: 16,
  },
  detailText: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailLabel: {
    fontSize: 16,
    color: Colors.text,
  },
  detailValue: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginLeft: 56,
  },
  chartPlaceholder: {
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: "dashed",
    borderRadius: 16,
  },
  placeholderText: {
    color: Colors.textTertiary,
    textAlign: "center",
  },
});
