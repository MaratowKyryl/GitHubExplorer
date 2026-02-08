import { Platform, type ViewStyle } from 'react-native';

function createShadow(offsetY: number, radius: number, opacity: number, elevation: number): ViewStyle {
  if (Platform.OS === 'android') return { elevation };
  return {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: offsetY },
    shadowOpacity: opacity,
    shadowRadius: radius,
  };
}

export const shadows = {
  none: createShadow(0, 0, 0, 0),
  sm: createShadow(1, 2, 0.06, 1),
  md: createShadow(2, 6, 0.08, 3),
  lg: createShadow(4, 12, 0.1, 6),
  xl: createShadow(8, 24, 0.14, 10),
} satisfies Record<string, ViewStyle>;

export type ShadowToken = keyof typeof shadows;
