import React, { useEffect } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

interface ProgressBarProps {
  progress: number; // 0-100
  color?: string;
  height?: number;
  animated?: boolean;
  showGradient?: boolean;
  style?: ViewStyle;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = "#3B82F6",
  height = 8,
  animated = true,
  showGradient = true,
  style,
}) => {
  const animatedWidth = useSharedValue(0);

  useEffect(() => {
    const targetWidth = Math.min(Math.max(progress, 0), 100);
    if (animated) {
      animatedWidth.value = withSpring(targetWidth, {
        damping: 15,
        stiffness: 150,
      });
    } else {
      animatedWidth.value = targetWidth;
    }
  }, [progress, animated]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${animatedWidth.value}%`,
  }));

  const lighterColor = color + "40"; // Add alpha
  const gradientColors: [string, string] = showGradient
    ? [color, lighterColor]
    : [color, color];

  return (
    <View style={[styles.container, { height }, style]}>
      <Animated.View style={[styles.progress, animatedStyle]}>
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#E5E7EB",
    borderRadius: 100,
    overflow: "hidden",
  },
  progress: {
    height: "100%",
    borderRadius: 100,
    overflow: "hidden",
  },
  gradient: {
    flex: 1,
  },
});
