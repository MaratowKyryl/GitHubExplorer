import React, { memo, useMemo } from 'react';
import { View, type ViewStyle } from 'react-native';
import { useTheme } from '../providers/use-theme';

export interface ListSeparatorProps { indent?: number; style?: ViewStyle }

export const ListSeparator = memo(function ListSeparator({ indent = 16, style }: ListSeparatorProps) {
  const { colors, hairlineWidth } = useTheme();
  const lineStyle = useMemo<ViewStyle>(() => ({ height: hairlineWidth, backgroundColor: colors.borderLight, marginLeft: indent }), [hairlineWidth, colors.borderLight, indent]);
  return <View style={[lineStyle, style]} />;
});
