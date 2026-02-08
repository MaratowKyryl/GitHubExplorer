import { Platform, StyleSheet } from 'react-native';

/** 8pt grid spacing scale */
export const spacing = {
  none: 0,
  '2xs': 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48,
  '4xl': 64,
} satisfies Record<string, number>;

export type SpacingToken = keyof typeof spacing;

/** Border radius scale */
export const radii = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  full: 9999,
} satisfies Record<string, number>;

export type RadiiToken = keyof typeof radii;

/** Z-index layering scale */
export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  overlay: 1300,
  modal: 1400,
  toast: 1500,
} as const;

export type ZIndexToken = keyof typeof zIndex;

/** Platform-accurate hairline (1 physical pixel) */
export const hairlineWidth = StyleSheet.hairlineWidth;

/** Minimum recommended touch target */
export const MIN_TOUCH_TARGET = 44;

/** Type-safe Platform.select with guaranteed return value */
export function platformSelect<T>(config: {
  ios: T;
  android: T;
  default?: T;
}): T {
  return Platform.select(config) ?? config.ios;
}
