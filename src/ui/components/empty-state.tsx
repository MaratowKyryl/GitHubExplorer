import React, { memo } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import { useTheme } from '../providers/use-theme';
import { Text } from '../primitives/text';
import { Spacer } from '../primitives/spacer';
import { Icon, type IconName } from './icon';

export interface EmptyStateProps {
  icon?: IconName;
  title: string;
  description?: string;
  action?: React.ReactNode;
  style?: ViewStyle;
}

export const EmptyState = memo(function EmptyState({ icon, title, description, action, style }: EmptyStateProps) {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, style]}>
      {icon !== undefined && (<><Icon name={icon} size={48} color={colors.iconMuted} /><Spacer y="md" /></>)}
      <Text variant="bodyStrong" align="center">{title}</Text>
      {description !== undefined && (<><Spacer y="xs" /><Text variant="bodySmall" color="textSecondary" align="center">{description}</Text></>)}
      {action !== undefined && (<><Spacer y="lg" />{action}</>)}
    </View>
  );
});

const styles = StyleSheet.create({ container: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32, paddingVertical: 48 } });
