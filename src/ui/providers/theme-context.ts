import { createContext } from 'react';
import type { ViewStyle } from 'react-native';
import type { ColorScheme, ColorTokens } from '../theme/colors';
import type { ShadowToken } from '../theme/shadows';
import type { SpacingToken, RadiiToken } from '../theme/tokens';
import type { TypographyToken, TypographyVariant } from '../theme/typography';
import { lightColors } from '../theme/colors';
import { shadows } from '../theme/shadows';
import { spacing, radii, hairlineWidth, platformSelect } from '../theme/tokens';
import { typography } from '../theme/typography';

export type ThemeOverride = 'system' | 'light' | 'dark';

export interface ThemeContextValue {
  colorScheme: ColorScheme;
  themeOverride: ThemeOverride;
  setThemeOverride: (override: ThemeOverride) => void;
  colors: ColorTokens;
  spacing: Record<SpacingToken, number>;
  radii: Record<RadiiToken, number>;
  typography: Record<TypographyToken, TypographyVariant>;
  shadows: Record<ShadowToken, ViewStyle>;
  hairlineWidth: number;
  platformSelect: <T>(config: { ios: T; android: T; default?: T }) => T;
}

export const defaultThemeValue: ThemeContextValue = {
  colorScheme: 'light',
  themeOverride: 'system',
  setThemeOverride: () => {},
  colors: lightColors,
  spacing,
  radii,
  typography,
  shadows,
  hairlineWidth,
  platformSelect,
};

export const ThemeContext = createContext<ThemeContextValue>(defaultThemeValue);
