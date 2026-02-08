import React, { memo, useMemo } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, type PressableProps, type TextStyle, type ViewStyle } from 'react-native';
import type { ColorTokens } from '../theme/colors';
import { useTheme } from '../providers/use-theme';
import { Text } from '../primitives/text';
import { Row } from '../primitives/layout';
import { MIN_TOUCH_TARGET } from '../theme/tokens';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  style?: ViewStyle;
}

interface SizePreset { paddingHorizontal: number; paddingVertical: number; fontSize: number; lineHeight: number }
const sizes: Record<ButtonSize, SizePreset> = {
  sm: { paddingHorizontal: 12, paddingVertical: 6, fontSize: 13, lineHeight: 18 },
  md: { paddingHorizontal: 16, paddingVertical: 10, fontSize: 15, lineHeight: 20 },
  lg: { paddingHorizontal: 20, paddingVertical: 14, fontSize: 17, lineHeight: 22 },
};

interface VariantStyle { bg: string; bgPressed: string; fg: string; spinnerColor: string }
function resolveVariant(v: ButtonVariant, c: ColorTokens): VariantStyle {
  switch (v) {
    case 'primary': return { bg: c.primary, bgPressed: c.primary + 'CC', fg: c.primaryText, spinnerColor: c.primaryText };
    case 'secondary': return { bg: c.primaryLight, bgPressed: c.surfacePressed, fg: c.primary, spinnerColor: c.primary };
    case 'ghost': return { bg: 'transparent', bgPressed: c.surfacePressed, fg: c.primary, spinnerColor: c.primary };
    case 'danger': return { bg: c.danger, bgPressed: c.danger + 'CC', fg: c.dangerText, spinnerColor: c.dangerText };
  }
}

export const Button = memo(function Button({ title, variant = 'primary', size = 'md', loading = false, disabled, leftIcon, rightIcon, fullWidth, style, ...rest }: ButtonProps) {
  const { colors, radii } = useTheme();
  const sp = sizes[size];
  const vs = useMemo(() => resolveVariant(variant, colors), [variant, colors]);
  const isDisabled = disabled || loading;
  const textStyle = useMemo<TextStyle>(() => ({ color: vs.fg, fontWeight: '600', fontSize: sp.fontSize, lineHeight: sp.lineHeight }), [vs.fg, sp]);

  return (
    <Pressable
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      accessibilityLabel={title}
      hitSlop={8}
      style={({ pressed }) => [
        styles.base,
        { backgroundColor: pressed ? vs.bgPressed : vs.bg, borderRadius: radii.lg, paddingHorizontal: sp.paddingHorizontal, paddingVertical: sp.paddingVertical, opacity: isDisabled && !loading ? 0.5 : 1, alignSelf: fullWidth ? 'stretch' as const : 'auto' as const },
        style,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator size="small" color={vs.spinnerColor} />
      ) : (
        <Row gap="sm" align="center" justify="center">
          {leftIcon}
          <Text style={textStyle}>{title}</Text>
          {rightIcon}
        </Row>
      )}
    </Pressable>
  );
});

const styles = StyleSheet.create({ base: { alignItems: 'center', justifyContent: 'center', minHeight: MIN_TOUCH_TARGET } });
