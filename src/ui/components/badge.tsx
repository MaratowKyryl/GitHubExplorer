import React, { memo, useMemo } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import type { ColorTokens } from '../theme/colors';
import { useTheme } from '../providers/use-theme';
import { Text } from '../primitives/text';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger';

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  icon?: React.ReactNode;
  style?: ViewStyle;
}

interface BadgeColors { bg: string; fg: string }

function resolveVariant(v: BadgeVariant, c: ColorTokens): BadgeColors {
  switch (v) {
    case 'primary': return { bg: c.primaryLight, fg: c.primary };
    case 'success': return { bg: c.successLight, fg: c.success };
    case 'warning': return { bg: c.warningLight, fg: c.warning };
    case 'danger': return { bg: c.dangerLight, fg: c.danger };
    default: return { bg: c.surfacePressed, fg: c.textSecondary };
  }
}

export const Badge = memo(function Badge({ label, variant = 'default', icon, style }: BadgeProps) {
  const { colors, radii, spacing } = useTheme();
  const { bg, fg } = useMemo(() => resolveVariant(variant, colors), [variant, colors]);

  return (
    <View
      style={[styles.container, { backgroundColor: bg, borderRadius: radii.full, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, gap: spacing.xs }, style]}
      accessibilityRole="text"
    >
      {icon}
      <Text variant="caption" style={{ color: fg }}>{label}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start' },
});
