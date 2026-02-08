import React, { memo, useMemo } from 'react';
import { Pressable, StyleSheet, type PressableProps, type ViewStyle } from 'react-native';
import { useTheme } from '../providers/use-theme';
import { MIN_TOUCH_TARGET } from '../theme/tokens';
import { Icon, type IconName } from './icon';

export type IconButtonVariant = 'default' | 'primary' | 'danger';

export interface IconButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  name: IconName;
  size?: number;
  variant?: IconButtonVariant;
  accessibilityLabel: string;
  style?: ViewStyle;
}

export const IconButton = memo(function IconButton({ name, size = 24, variant = 'default', disabled, style, ...rest }: IconButtonProps) {
  const { colors } = useTheme();
  const iconColor = useMemo(() => {
    if (disabled) return colors.iconMuted;
    switch (variant) {
      case 'primary': return colors.primary;
      case 'danger': return colors.danger;
      default: return colors.icon;
    }
  }, [variant, disabled, colors]);

  return (
    <Pressable
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      hitSlop={8}
      style={({ pressed }) => [styles.base, { opacity: pressed ? 0.6 : disabled ? 0.4 : 1, backgroundColor: pressed ? colors.surfacePressed : 'transparent' }, style]}
      {...rest}
    >
      <Icon name={name} size={size} color={iconColor} />
    </Pressable>
  );
});

const styles = StyleSheet.create({ base: { minWidth: MIN_TOUCH_TARGET, minHeight: MIN_TOUCH_TARGET, alignItems: 'center', justifyContent: 'center', borderRadius: MIN_TOUCH_TARGET / 2 } });
