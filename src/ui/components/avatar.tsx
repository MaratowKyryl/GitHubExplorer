import { Image } from 'expo-image';
import React, { memo, useMemo } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import { useTheme } from '../providers/use-theme';
import { Text } from '../primitives/text';

export interface AvatarProps {
  source?: string | null;
  name?: string;
  size?: number;
  style?: ViewStyle;
}

const PALETTE = ['#FF6B6B','#4ECDC4','#45B7D1','#96CEB4','#DDA0DD','#F7DC6F','#98D8C8','#7B68EE'] as const;

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return name.substring(0, 2).toUpperCase();
}

function hashColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return PALETTE[Math.abs(hash) % PALETTE.length];
}

export const Avatar = memo(function Avatar({ source, name, size = 40, style }: AvatarProps) {
  const { colors } = useTheme();
  const containerStyle = useMemo<ViewStyle>(() => ({ width: size, height: size, borderRadius: size / 2, overflow: 'hidden' }), [size]);

  if (source) {
    return (
      <View style={[containerStyle, style]} accessibilityRole="image">
        <Image source={source} style={styles.image} contentFit="cover" transition={200} recyclingKey={source} />
      </View>
    );
  }

  const initials = name ? getInitials(name) : '?';
  const bg = name ? hashColor(name) : colors.surfacePressed;
  const fontSize = Math.round(size * 0.4);

  return (
    <View style={[containerStyle, styles.fallback, { backgroundColor: bg }, style]} accessibilityRole="image" accessibilityLabel={name ?? 'Avatar'}>
      <Text variant="captionStrong" style={{ color: '#FFFFFF', fontSize, lineHeight: fontSize * 1.2 }}>{initials}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  image: { width: '100%', height: '100%' },
  fallback: { alignItems: 'center', justifyContent: 'center' },
});
