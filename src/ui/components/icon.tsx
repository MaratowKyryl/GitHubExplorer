import React, { type ComponentProps, memo } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";

import { useTheme } from "../providers/use-theme";

export type IconName = ComponentProps<typeof Ionicons>["name"];

export interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  accessibilityLabel?: string;
}

export const Icon = memo(function Icon({
  name,
  size = 24,
  color,
  accessibilityLabel,
}: IconProps) {
  const { colors } = useTheme();
  return (
    <Ionicons
      name={name}
      size={size}
      color={color ?? colors.icon}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="image"
    />
  );
});
