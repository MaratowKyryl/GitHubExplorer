import React, { memo, useCallback, useRef } from 'react';
import { Animated, Pressable, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import { MIN_TOUCH_TARGET } from '../theme/tokens';

export interface PressableScaleProps extends Omit<PressableProps, 'children' | 'style'> {
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
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = useCallback(
    (e: Parameters<NonNullable<PressableProps['onPressIn']>>[0]) => {
      Animated.spring(scale, { toValue: activeScale, useNativeDriver: true, speed: 50, bounciness: 0 }).start();
      onPressIn?.(e);
    },
    [scale, activeScale, onPressIn],
  );

  const handlePressOut = useCallback(
    (e: Parameters<NonNullable<PressableProps['onPressOut']>>[0]) => {
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 40, bounciness: 4 }).start();
      onPressOut?.(e);
    },
    [scale, onPressOut],
  );

  return (
    <Pressable disabled={disabled} onPressIn={handlePressIn} onPressOut={handlePressOut} hitSlop={hitSlop} accessibilityRole="button" {...rest}>
      <Animated.View style={[{ minHeight: MIN_TOUCH_TARGET, transform: [{ scale }] }, style]}>
        {children}
      </Animated.View>
    </Pressable>
  );
});
