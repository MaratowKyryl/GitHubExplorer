import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import React, { type ReactElement } from 'react';
import type { ViewStyle } from 'react-native';

export interface ListProps<T> {
  data: ReadonlyArray<T> | null | undefined;
  renderItem: ListRenderItem<T>;
  estimatedItemSize: number;
  keyExtractor?: (item: T, index: number) => string;
  ListHeaderComponent?: React.ComponentType | ReactElement | null;
  ListFooterComponent?: React.ComponentType | ReactElement | null;
  ListEmptyComponent?: React.ComponentType | ReactElement | null;
  ItemSeparatorComponent?: React.ComponentType | null;
  contentContainerStyle?: { paddingTop?: number; paddingBottom?: number; paddingLeft?: number; paddingRight?: number; padding?: number; backgroundColor?: string };
  numColumns?: number;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  onRefresh?: () => void;
  refreshing?: boolean;
  showsVerticalScrollIndicator?: boolean;
  keyboardShouldPersistTaps?: 'always' | 'never' | 'handled';
  keyboardDismissMode?: 'none' | 'on-drag' | 'interactive';
  style?: ViewStyle;
  extraData?: unknown;
}

export function List<T>({
  showsVerticalScrollIndicator = false,
  keyboardShouldPersistTaps = 'handled',
  keyboardDismissMode = 'on-drag',
  onEndReachedThreshold = 0.3,
  ...rest
}: ListProps<T>) {
  return (
    <FlashList<T>
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      keyboardDismissMode={keyboardDismissMode}
      onEndReachedThreshold={onEndReachedThreshold}
      {...rest}
    />
  );
}
