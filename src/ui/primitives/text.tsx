import React, { memo } from 'react';
import { Text as RNText, type TextProps as RNTextProps, type TextStyle } from 'react-native';
import type { ColorTokens } from '../theme/colors';
import type { TypographyToken } from '../theme/typography';
import { useTheme } from '../providers/use-theme';

export interface TextProps extends RNTextProps {
  variant?: TypographyToken;
  color?: keyof ColorTokens;
  align?: TextStyle['textAlign'];
}

export const Text = memo(function Text({
  variant = 'body',
  color = 'text',
  align,
  style,
  ...rest
}: TextProps) {
  const { colors, typography } = useTheme();
  const variantStyle: TextStyle = typography[variant];

  return (
    <RNText
      style={[variantStyle, { color: colors[color] }, align !== undefined ? { textAlign: align } : undefined, style]}
      {...rest}
    />
  );
});
