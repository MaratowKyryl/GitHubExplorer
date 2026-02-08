import React, { memo, useMemo } from 'react';
import { View, type ViewProps, type ViewStyle } from 'react-native';
import type { SpacingToken } from '../theme/tokens';
import { useTheme } from '../providers/use-theme';

interface LayoutProps extends ViewProps {
  gap?: SpacingToken;
  px?: SpacingToken;
  py?: SpacingToken;
  p?: SpacingToken;
  align?: ViewStyle['alignItems'];
  justify?: ViewStyle['justifyContent'];
  flex?: boolean;
  wrap?: boolean;
}

function useLayoutStyle(
  direction: 'row' | 'column',
  { gap, px, py, p, align, justify, flex, wrap, style }: LayoutProps,
): ViewStyle[] {
  const { spacing } = useTheme();
  const computed = useMemo<ViewStyle>(
    () => ({
      flexDirection: direction,
      gap: gap !== undefined ? spacing[gap] : undefined,
      paddingHorizontal: px !== undefined ? spacing[px] : p !== undefined ? spacing[p] : undefined,
      paddingVertical: py !== undefined ? spacing[py] : p !== undefined ? spacing[p] : undefined,
      alignItems: align,
      justifyContent: justify,
      flex: flex ? 1 : undefined,
      flexWrap: wrap ? 'wrap' : undefined,
    }),
    [direction, gap, px, py, p, align, justify, flex, wrap, spacing],
  );
  return style ? [computed, style as ViewStyle] : [computed];
}

export type RowProps = LayoutProps;

export const Row = memo(function Row({ children, ...props }: RowProps) {
  const styles = useLayoutStyle('row', props);
  return <View style={styles}>{children}</View>;
});

export type ColumnProps = LayoutProps;

export const Column = memo(function Column({ children, ...props }: ColumnProps) {
  const styles = useLayoutStyle('column', props);
  return <View style={styles}>{children}</View>;
});
