import React, { memo, useEffect } from "react";
import { StyleSheet, type ViewStyle } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import { useTheme } from "../providers/use-theme";

export interface SkeletonProps {
  width?: number;
  height?: number;
  radius?: number;
  circle?: boolean;
  style?: ViewStyle;
}

export const Skeleton = memo(function Skeleton({
  width,
  height = 16,
  radius,
  circle = false,
  style,
}: SkeletonProps) {
  const { colors, radii } = useTheme();
  const opacity = useSharedValue(0.35);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.7, { duration: 900, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.35, { duration: 900, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const resolvedWidth = circle ? height : width;
  const resolvedRadius = circle ? height / 2 : (radius ?? radii.md);

  return (
    <Animated.View
      style={[
        styles.base,
        {
          width: resolvedWidth,
          height,
          borderRadius: resolvedRadius,
          backgroundColor: colors.skeleton,
        },
        animatedStyle,
        style,
      ]}
      accessibilityRole="none"
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    />
  );
});

const styles = StyleSheet.create({ base: { overflow: "hidden" } });
