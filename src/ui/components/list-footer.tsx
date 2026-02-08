import React, { memo } from 'react';
import { ActivityIndicator, StyleSheet, View, type ViewStyle } from 'react-native';
import { useTheme } from '../providers/use-theme';
import { Text } from '../primitives/text';

export interface ListFooterLoadingProps { style?: ViewStyle }
export const ListFooterLoading = memo(function ListFooterLoading({ style }: ListFooterLoadingProps) {
  const { colors, spacing } = useTheme();
  return <View style={[styles.center, { paddingVertical: spacing.lg }, style]}><ActivityIndicator size="small" color={colors.primary} /></View>;
});

export interface ListFooterEndProps { message?: string; style?: ViewStyle }
export const ListFooterEnd = memo(function ListFooterEnd({ message = "You\u2019ve reached the end", style }: ListFooterEndProps) {
  const { spacing } = useTheme();
  return <View style={[styles.center, { paddingVertical: spacing.lg }, style]}><Text variant="caption" color="textTertiary">{message}</Text></View>;
});

const styles = StyleSheet.create({ center: { alignItems: 'center', justifyContent: 'center' } });
