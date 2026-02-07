import React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  PressableProps,
  ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../theme/Colors";
import { typography } from "../../theme/typography";

interface ButtonProps extends PressableProps {
  title: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = "primary",
  size = "md",
  isLoading = false,
  fullWidth = false,
  disabled,
  style,
  ...props
}) => {
  const isPrimary = variant === "primary";
  const containerStyle = [
    styles.container,
    styles[`container_${size}`],
    fullWidth && styles.fullWidth,
    style,
  ];

  const textStyle = [
    styles.text,
    styles[`text_${size}`],
    styles[`text_${variant}`],
  ];

  const content = (
    <>
      {isLoading ? (
        <ActivityIndicator
          color={isPrimary ? "#fff" : Colors.primary}
          size="small"
        />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </>
  );

  if (isPrimary) {
    return (
      <Pressable
        style={({ pressed }) => [
          containerStyle,
          { opacity: pressed || disabled || isLoading ? 0.8 : 1 },
        ]}
        disabled={disabled || isLoading}
        {...props}
      >
        <LinearGradient
          colors={[Colors.primary, "#2DD4BF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.gradient, styles[`gradient_${size}`]]}
        >
          {content}
        </LinearGradient>
      </Pressable>
    );
  }

  return (
    <Pressable
      style={({ pressed }) => [
        containerStyle,
        styles[`background_${variant}`],
        { opacity: pressed || disabled || isLoading ? 0.7 : 1 },
      ]}
      disabled={disabled || isLoading}
      {...props}
    >
      {content}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  container_sm: {
    height: 40,
  },
  container_md: {
    height: 52,
  },
  container_lg: {
    height: 60,
  },
  fullWidth: {
    width: "100%",
  },
  gradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  gradient_sm: {
    paddingHorizontal: 16,
  },
  gradient_md: {
    paddingHorizontal: 24,
  },
  gradient_lg: {
    paddingHorizontal: 32,
  },
  background_secondary: {
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  background_outline: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  background_ghost: {
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: typography.fontWeight.semibold,
    letterSpacing: 0.5,
  },
  text_sm: {
    fontSize: typography.fontSize.sm,
  },
  text_md: {
    fontSize: typography.fontSize.base,
  },
  text_lg: {
    fontSize: typography.fontSize.lg,
  },
  text_primary: {
    color: "#fff",
  },
  text_secondary: {
    color: Colors.text,
  },
  text_outline: {
    color: Colors.primary,
  },
  text_ghost: {
    color: Colors.primary,
  },
});
