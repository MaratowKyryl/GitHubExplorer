import React, { memo, useMemo } from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";

import { PressableScale } from "../primitives/pressable-scale";
import { useTheme } from "../providers/use-theme";

export type CardPadding = "none" | "sm" | "md" | "lg";

export interface CardProps {
  children: React.ReactNode;
  padding?: CardPadding;
  onPress?: () => void;
  accessibilityLabel?: string;
  style?: ViewStyle;
}

const paddingMap: Record<CardPadding, number> = {
  none: 0,
  sm: 8,
  md: 16,
  lg: 24,
};

export const Card = memo(function Card({
  children,
  padding = "md",
  onPress,
  accessibilityLabel,
  style,
}: CardProps) {
  const { colors, radii, shadows } = useTheme();

  const surfaceStyle = useMemo<ViewStyle>(
    () => ({
      backgroundColor: colors.surfaceRaised,
      borderRadius: radii.xl,
      padding: paddingMap[padding],
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.borderLight,
      ...shadows.sm,
    }),
    [colors, radii, padding, shadows],
  );

  if (onPress) {
    return (
      <PressableScale
        onPress={onPress}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        style={[surfaceStyle, style]}
      >
        {children}
      </PressableScale>
    );
  }

  return <View style={[surfaceStyle, style]}>{children}</View>;
});
