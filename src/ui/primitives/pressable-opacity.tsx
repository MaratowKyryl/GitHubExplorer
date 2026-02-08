import React, { memo, useCallback, useRef } from 'react';
import { Animated, Pressable, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import { MIN_TOUCH_TARGET } from '../theme/tokens';

export interface PressableOpacityProps extends Omit<PressableProps, 'children' | 'style'> {
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
  const opacity = useRef(new Animated.Value(1)).current;

  const handlePressIn = useCallback(
    (e: Parameters<NonNullable<PressableProps['onPressIn']>>[0]) => {
      Animated.timing(opacity, { toValue: activeOpacity, duration: 80, useNativeDriver: true }).start();
      onPressIn?.(e);
    },
    [opacity, activeOpacity, onPressIn],
  );

  const handlePressOut = useCallback(
    (e: Parameters<NonNullable<PressableProps['onPressOut']>>[0]) => {
      Animated.timing(opacity, { toValue: 1, duration: 180, useNativeDriver: true }).start();
      onPressOut?.(e);
    },
    [opacity, onPressOut],
  );

  return (
    <Pressable disabled={disabled} onPressIn={handlePressIn} onPressOut={handlePressOut} hitSlop={hitSlop} accessibilityRole="button" {...rest}>
      <Animated.View style={[{ opacity: opacity as unknown as number, minHeight: MIN_TOUCH_TARGET }, style]}>
        {children}
      </Animated.View>
    </Pressable>
  );
});
