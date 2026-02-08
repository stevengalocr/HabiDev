import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "../ui/Card";
import { ProgressBar } from "../ui/ProgressBar";
import { HabitProgress } from "@/types/database.types";
import { useHabitLogs } from "@/hooks/useHabitLogs";
import { Colors } from "@/theme/Colors";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

interface HabitCardProps {
  habit: HabitProgress;
  onPress?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const HabitCard: React.FC<HabitCardProps> = ({
  habit,
  onPress,
  onEdit,
  onDelete,
}) => {
  const { toggleHabitCompletion, isHabitCompletedToday } = useHabitLogs();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isTogglingLoading, setIsToggling] = useState(false);

  useEffect(() => {
    checkCompletion();
  }, [habit.id]);

  const checkCompletion = async () => {
    const completed = await isHabitCompletedToday(habit.id);
    setIsCompleted(completed);
  };

  const handleToggleCompletion = async () => {
    setIsToggling(true);
    const newState = await toggleHabitCompletion(habit.id);
    setIsCompleted(newState);
    setIsToggling(false);
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card style={[styles.card, isCompleted && styles.completedCard]}>
        <View style={styles.header}>
          <View style={styles.titleRow}>
            {habit.icon && <Text style={styles.icon}>{habit.icon}</Text>}
            <View style={styles.titleContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {habit.name}
              </Text>
              {habit.category_name && (
                <View
                  style={[
                    styles.categoryBadge,
                    { backgroundColor: habit.category_color + "20" },
                  ]}
                >
                  {habit.category_icon && (
                    <Text style={styles.categoryIcon}>
                      {habit.category_icon}
                    </Text>
                  )}
                  <Text
                    style={[
                      styles.categoryName,
                      { color: habit.category_color },
                    ]}
                  >
                    {habit.category_name}
                  </Text>
                </View>
              )}
            </View>
          </View>

          <TouchableOpacity
            onPress={handleToggleCompletion}
            disabled={isTogglingLoading}
            style={[
              styles.checkButton,
              isCompleted && styles.checkButtonCompleted,
            ]}
          >
            {isCompleted && (
              <Ionicons name="checkmark" size={20} color="#FFFFFF" />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.progressSection}>
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>Racha</Text>
              <View style={styles.streakContainer}>
                <Text style={styles.streakNumber}>
                  🔥 {habit.current_streak}
                </Text>
              </View>
            </View>

            <View style={styles.stat}>
              <Text style={styles.statLabel}>Progreso</Text>
              <Text style={styles.statValue}>
                {habit.days_completed} / {habit.goal_days} días
              </Text>
            </View>

            <View style={styles.stat}>
              <Text style={styles.statLabel}>Faltan</Text>
              <Text style={[styles.statValue, styles.daysRemaining]}>
                {habit.days_remaining} días
              </Text>
            </View>
          </View>

          <ProgressBar
            progress={habit.progress_percentage}
            color={habit.color}
            style={styles.progressBar}
          />

          <Text style={styles.percentage}>
            {habit.progress_percentage.toFixed(0)}% completado
          </Text>
        </View>

        {habit.goal_achieved && (
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            style={styles.achievementBanner}
          >
            <Text style={styles.achievementText}>¡Meta alcanzada! 🎉</Text>
          </Animated.View>
        )}
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  completedCard: {
    backgroundColor: Colors.success + "10",
    borderWidth: 1,
    borderColor: Colors.success + "40",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  icon: {
    fontSize: 32,
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 4,
  },
  categoryBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: "600",
  },
  checkButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.surface,
  },
  checkButtonCompleted: {
    backgroundColor: Colors.success,
    borderColor: Colors.success,
  },
  progressSection: {
    gap: 12,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stat: {
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  streakNumber: {
    fontSize: 16,
    fontWeight: "700",
  },
  daysRemaining: {
    color: Colors.primary,
  },
  progressBar: {
    marginTop: 4,
  },
  percentage: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: "right",
  },
  achievementBanner: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.accent + "20",
    borderRadius: 8,
    alignItems: "center",
  },
  achievementText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.accent,
  },
});
