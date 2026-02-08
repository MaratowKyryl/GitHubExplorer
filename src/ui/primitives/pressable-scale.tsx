import React, { memo, useCallback } from "react";
import { Pressable, type PressableProps, type StyleProp, type ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { MIN_TOUCH_TARGET } from "../theme/tokens";

export interface PressableScaleProps extends Omit<PressableProps, "children" | "style"> {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  activeScale?: number;
}

export const PressableScale = memo(function PressableScale({
  children,
  style,
  activeScale = 0.97,
  disabled,
  hitSlop = 8,
  onPressIn,
  onPressOut,
  ...rest
}: PressableScaleProps) {
  const scale = useSharedValue(1);

  const handlePressIn = useCallback(
    (e: Parameters<NonNullable<PressableProps["onPressIn"]>>[0]) => {
      scale.value = withSpring(activeScale, { mass: 1, stiffness: 500, damping: 50 });
      onPressIn?.(e);
    },
    [scale, activeScale, onPressIn],
  );

  const handlePressOut = useCallback(
    (e: Parameters<NonNullable<PressableProps["onPressOut"]>>[0]) => {
      scale.value = withSpring(1, { mass: 1, stiffness: 400, damping: 20 });
      onPressOut?.(e);
    },
    [scale, onPressOut],
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable disabled={disabled} onPressIn={handlePressIn} onPressOut={handlePressOut} hitSlop={hitSlop} accessibilityRole="button" {...rest}>
      <Animated.View style={[{ minHeight: MIN_TOUCH_TARGET }, style, animatedStyle]}>
        {children}
      </Animated.View>
    </Pressable>
  );
});
