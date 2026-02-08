import React, { memo, useMemo } from 'react';
import { View, type ViewStyle } from 'react-native';
import type { SpacingToken } from '../theme/tokens';
import { useTheme } from '../providers/use-theme';

export interface SpacerProps {
  x?: SpacingToken;
  y?: SpacingToken;
  flex?: boolean;
}

export const Spacer = memo(function Spacer({ x, y, flex }: SpacerProps) {
  const { spacing } = useTheme();
  const style = useMemo<ViewStyle>(
    () => ({
      width: x !== undefined ? spacing[x] : undefined,
      height: y !== undefined ? spacing[y] : undefined,
      flex: flex ? 1 : undefined,
    }),
    [x, y, flex, spacing],
  );
  return <View style={style} />;
});
