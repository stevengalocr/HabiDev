import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "../ui/Card";
import { Colors } from "@/theme/Colors";
import { Ionicons } from "@expo/vector-icons";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: keyof typeof Ionicons.glyphMap;
  color?: string;
  subtitle?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  color = Colors.primary,
  subtitle,
}) => {
  return (
    <Card style={styles.card}>
      <View style={[styles.iconContainer, { backgroundColor: color + "20" }]}>
        <Ionicons name={icon} size={24} color={color} />
      </View>

      <Text style={styles.value}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    minWidth: 120,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  value: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 12,
    color: Colors.textTertiary,
    marginTop: 2,
  },
});
