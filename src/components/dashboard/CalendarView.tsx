import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/theme/Colors";

interface CalendarViewProps {
  logs: string[]; // Array of date strings 'YYYY-MM-DD'
}

export const CalendarView: React.FC<CalendarViewProps> = ({ logs }) => {
  const today = new Date();
  const daysInMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0,
  ).getDate();
  const firstDayOfMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    1,
  ).getDay();

  // Adjust for Monday start (0 = Sunday, but we want 0 = Monday usually, or just stick to Sunday start)
  // Let's stick to standard Sunday start for simplicity in rendering grid

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const isCompleted = (day: number) => {
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return logs.includes(dateStr);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.monthTitle}>
        {today.toLocaleDateString("es-ES", { month: "long", year: "numeric" })}
      </Text>

      <View style={styles.daysHeader}>
        {["D", "L", "M", "M", "J", "V", "S"].map((day, index) => (
          <Text key={index} style={styles.dayLabel}>
            {day}
          </Text>
        ))}
      </View>

      <View style={styles.grid}>
        {days.map((day, index) => (
          <View key={index} style={styles.dayCell}>
            {day && (
              <View
                style={[
                  styles.dayBubble,
                  isCompleted(day) && styles.completedBubble,
                ]}
              >
                <Text
                  style={[
                    styles.dayText,
                    isCompleted(day) && styles.completedDayText,
                  ]}
                >
                  {day}
                </Text>
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.surface,
    borderRadius: 16,
  },
  monthTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 12,
    textTransform: "capitalize",
  },
  daysHeader: {
    flexDirection: "row",
    marginBottom: 8,
  },
  dayLabel: {
    flex: 1,
    textAlign: "center",
    fontSize: 12,
    color: Colors.textTertiary,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayCell: {
    width: "14.28%", // 100% / 7
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  dayBubble: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  completedBubble: {
    backgroundColor: Colors.success,
  },
  dayText: {
    fontSize: 12,
    color: Colors.text,
  },
  completedDayText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
