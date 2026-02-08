import React, { memo, useMemo } from 'react';
import { View, type ViewStyle } from 'react-native';
import { useTheme } from '../providers/use-theme';

export interface DividerProps {
  direction?: 'horizontal' | 'vertical';
  color?: string;
  indent?: number;
}

export const Divider = memo(function Divider({ direction = 'horizontal', color, indent }: DividerProps) {
  const { colors, hairlineWidth } = useTheme();
  const style = useMemo<ViewStyle>(() => {
    const bg = color ?? colors.border;
    if (direction === 'vertical') return { width: hairlineWidth, alignSelf: 'stretch', backgroundColor: bg };
    return { height: hairlineWidth, alignSelf: 'stretch', backgroundColor: bg, marginLeft: indent };
  }, [direction, color, indent, colors.border, hairlineWidth]);

  return <View style={style} accessibilityRole="none" />;
});
