import React, { memo } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import { useTheme } from '../providers/use-theme';
import { Text } from '../primitives/text';

export interface SectionHeaderProps {
  title: string;
  trailing?: React.ReactNode;
  style?: ViewStyle;
}

export const SectionHeader = memo(function SectionHeader({ title, trailing, style }: SectionHeaderProps) {
  const { spacing } = useTheme();
  return (
    <View style={[styles.container, { paddingVertical: spacing.sm }, style]} accessibilityRole="header">
      <Text variant="captionStrong" color="textSecondary" style={styles.title}>{title.toUpperCase()}</Text>
      {trailing}
    </View>
  );
});

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { flex: 1 },
});
