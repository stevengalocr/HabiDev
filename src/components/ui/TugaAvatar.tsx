import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Image,
  Easing,
  ImageSourcePropType,
} from "react-native";
import { Colors } from "../../theme/Colors";
import { Ionicons } from "@expo/vector-icons";

// "Tuga Icon" - The Official Brand Logo
// Clean, Professional, Image-based.

interface TugaAvatarProps {
  size?: number;
  animated?: boolean;
  imageSource: ImageSourcePropType; // Required now
}

export const TugaAvatar: React.FC<TugaAvatarProps> = ({
  size = 280,
  animated = true,
  imageSource,
}) => {
  const floatValue = new Animated.Value(0);

  useEffect(() => {
    if (animated) {
      // Subtle floating animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(floatValue, {
            toValue: -6,
            duration: 3000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(floatValue, {
            toValue: 0,
            duration: 3000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }
  }, [animated]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          transform: [{ translateY: floatValue }],
        },
      ]}
    >
      <Image
        source={imageSource}
        style={[styles.logoImage, { width: size, height: size }]}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    // Pure image, no effects
  },
});
