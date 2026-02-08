import React, { memo } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import { useTheme } from '../providers/use-theme';
import { Text } from '../primitives/text';
import { Spacer } from '../primitives/spacer';
import { Icon, type IconName } from './icon';
import { Button } from './button';

export interface ErrorStateProps {
  icon?: IconName;
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
  style?: ViewStyle;
}

export const ErrorState = memo(function ErrorState({
  icon = 'alert-circle-outline',
  title = 'Something went wrong',
  description,
  onRetry,
  retryLabel = 'Retry',
  style,
}: ErrorStateProps) {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, style]}>
      <Icon name={icon} size={48} color={colors.danger} />
      <Spacer y="md" />
      <Text variant="bodyStrong" align="center">{title}</Text>
      {description !== undefined && (<><Spacer y="xs" /><Text variant="bodySmall" color="textSecondary" align="center">{description}</Text></>)}
      {onRetry !== undefined && (<><Spacer y="lg" /><Button title={retryLabel} variant="secondary" onPress={onRetry} /></>)}
    </View>
  );
});

const styles = StyleSheet.create({ container: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32, paddingVertical: 48 } });
