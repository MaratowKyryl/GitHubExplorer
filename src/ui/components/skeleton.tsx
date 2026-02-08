import React, { memo, useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from '../providers/use-theme';

export interface SkeletonProps {
  width?: number;
  height?: number;
  radius?: number;
  circle?: boolean;
  style?: ViewStyle;
}

export const Skeleton = memo(function Skeleton({ width, height = 16, radius, circle = false, style }: SkeletonProps) {
  const { colors, radii } = useTheme();
  const pulse = useRef(new Animated.Value(0.35)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 0.7, duration: 900, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0.35, duration: 900, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [pulse]);

  const resolvedWidth = circle ? height : width;
  const resolvedRadius = circle ? height / 2 : (radius ?? radii.md);

  return (
    <Animated.View
      style={[styles.base, { width: resolvedWidth, height, borderRadius: resolvedRadius, backgroundColor: colors.skeleton }, { opacity: pulse as unknown as number }, style]}
      accessibilityRole="none"
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    />
  );
});

const styles = StyleSheet.create({ base: { overflow: 'hidden' } });
