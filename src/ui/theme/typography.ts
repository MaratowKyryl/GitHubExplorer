import { Platform, type TextStyle } from 'react-native';

export type TypographyVariant = Pick<
  TextStyle,
  'fontSize' | 'lineHeight' | 'fontWeight' | 'fontFamily' | 'letterSpacing'
>;

const monoFamily = Platform.select({
  ios: 'Menlo',
  android: 'monospace',
  default: 'monospace',
});

export const typography = {
  display: { fontSize: 34, lineHeight: 41, fontWeight: '700' as const, letterSpacing: 0.37 },
  h1: { fontSize: 28, lineHeight: 34, fontWeight: '700' as const, letterSpacing: 0.36 },
  h2: { fontSize: 22, lineHeight: 28, fontWeight: '700' as const, letterSpacing: 0.35 },
  h3: { fontSize: 20, lineHeight: 25, fontWeight: '600' as const, letterSpacing: 0.38 },
  body: { fontSize: 16, lineHeight: 24, fontWeight: '400' as const },
  bodyStrong: { fontSize: 16, lineHeight: 24, fontWeight: '600' as const },
  bodySmall: { fontSize: 14, lineHeight: 20, fontWeight: '400' as const },
  caption: { fontSize: 13, lineHeight: 18, fontWeight: '400' as const, letterSpacing: -0.08 },
  captionStrong: { fontSize: 13, lineHeight: 18, fontWeight: '600' as const, letterSpacing: -0.08 },
  mono: { fontSize: 14, lineHeight: 20, fontWeight: '400' as const, fontFamily: monoFamily },
} satisfies Record<string, TypographyVariant>;

export type TypographyToken = keyof typeof typography;
