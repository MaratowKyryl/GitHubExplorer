import React, { memo, useCallback } from "react";
import { Pressable, type PressableProps, type StyleProp, type ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { MIN_TOUCH_TARGET } from "../theme/tokens";

export interface PressableOpacityProps extends Omit<PressableProps, "children" | "style"> {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  activeOpacity?: number;
}

export const PressableOpacity = memo(function PressableOpacity({
  children,
  style,
  activeOpacity = 0.65,
  disabled,
  hitSlop = 8,
  onPressIn,
  onPressOut,
  ...rest
}: PressableOpacityProps) {
  const opacity = useSharedValue(1);

  const handlePressIn = useCallback(
    (e: Parameters<NonNullable<PressableProps["onPressIn"]>>[0]) => {
      opacity.value = withTiming(activeOpacity, { duration: 80 });
      onPressIn?.(e);
    },
    [opacity, activeOpacity, onPressIn],
  );

  const handlePressOut = useCallback(
    (e: Parameters<NonNullable<PressableProps["onPressOut"]>>[0]) => {
      opacity.value = withTiming(1, { duration: 180 });
      onPressOut?.(e);
    },
    [opacity, onPressOut],
  );

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Pressable disabled={disabled} onPressIn={handlePressIn} onPressOut={handlePressOut} hitSlop={hitSlop} accessibilityRole="button" {...rest}>
      <Animated.View style={[{ minHeight: MIN_TOUCH_TARGET }, style, animatedStyle]}>
        {children}
      </Animated.View>
    </Pressable>
  );
});
