const palette = {
  white: '#FFFFFF',
  black: '#000000',
  gray50: '#F9FAFB',
  gray100: '#F2F4F7',
  gray200: '#EAECF0',
  gray300: '#D0D5DD',
  gray400: '#98A2B3',
  gray500: '#667085',
  gray600: '#475467',
  gray700: '#344054',
  gray800: '#1D2939',
  gray900: '#101828',
  blue50: '#EFF8FF',
  blue500: '#2E90FA',
  blue600: '#1570EF',
  blue700: '#175CD3',
  red50: '#FEF3F2',
  red500: '#F04438',
  red600: '#D92D20',
  green50: '#ECFDF3',
  green500: '#12B76A',
  green600: '#039855',
  amber50: '#FFFAEB',
  amber500: '#F79009',
  amber600: '#DC6803',
} as const;

export type ColorScheme = 'light' | 'dark';

export interface ColorTokens {
  background: string;
  surface: string;
  surfaceRaised: string;
  surfacePressed: string;
  text: string;
  textSecondary: string;
  textTertiary: string;
  textInverse: string;
  border: string;
  borderLight: string;
  primary: string;
  primaryText: string;
  primaryLight: string;
  danger: string;
  dangerText: string;
  dangerLight: string;
  success: string;
  successText: string;
  successLight: string;
  warning: string;
  warningText: string;
  warningLight: string;
  icon: string;
  iconMuted: string;
  skeleton: string;
  skeletonHighlight: string;
}

export const lightColors: ColorTokens = {
  background: palette.white,
  surface: palette.gray50,
  surfaceRaised: palette.white,
  surfacePressed: palette.gray100,
  text: palette.gray900,
  textSecondary: palette.gray500,
  textTertiary: palette.gray400,
  textInverse: palette.white,
  border: palette.gray200,
  borderLight: palette.gray100,
  primary: palette.blue600,
  primaryText: palette.white,
  primaryLight: palette.blue50,
  danger: palette.red600,
  dangerText: palette.white,
  dangerLight: palette.red50,
  success: palette.green600,
  successText: palette.white,
  successLight: palette.green50,
  warning: palette.amber600,
  warningText: palette.white,
  warningLight: palette.amber50,
  icon: palette.gray500,
  iconMuted: palette.gray400,
  skeleton: palette.gray200,
  skeletonHighlight: palette.gray100,
};

export const darkColors: ColorTokens = {
  background: '#000000',
  surface: '#1C1C1E',
  surfaceRaised: '#2C2C2E',
  surfacePressed: '#3A3A3C',
  text: '#F5F5F7',
  textSecondary: '#8E8E93',
  textTertiary: '#636366',
  textInverse: '#000000',
  border: '#38383A',
  borderLight: '#2C2C2E',
  primary: palette.blue500,
  primaryText: palette.white,
  primaryLight: 'rgba(46,144,250,0.15)',
  danger: '#FF453A',
  dangerText: palette.white,
  dangerLight: 'rgba(255,69,58,0.15)',
  success: '#30D158',
  successText: palette.white,
  successLight: 'rgba(48,209,88,0.15)',
  warning: '#FF9F0A',
  warningText: palette.black,
  warningLight: 'rgba(255,159,10,0.15)',
  icon: '#8E8E93',
  iconMuted: '#636366',
  skeleton: '#2C2C2E',
  skeletonHighlight: '#3A3A3C',
};

export const colors = { light: lightColors, dark: darkColors, palette } as const;
