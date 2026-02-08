import React, { forwardRef, memo, useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, TextInput, View, type TextInputProps, type ViewStyle } from 'react-native';
import { useTheme } from '../providers/use-theme';
import { Text } from '../primitives/text';
import { Icon, type IconName } from './icon';

export interface TextFieldProps extends TextInputProps {
  label?: string;
  leftIcon?: IconName;
  rightSlot?: React.ReactNode;
  clearable?: boolean;
  loading?: boolean;
  error?: string;
  containerStyle?: ViewStyle;
}

export const TextField = memo(
  forwardRef<TextInput, TextFieldProps>(function TextField(
    { label, leftIcon, rightSlot, clearable = false, loading = false, error, containerStyle, value, onChangeText, style, ...rest },
    ref,
  ) {
    const { colors, radii, spacing } = useTheme();
    const [focused, setFocused] = useState(false);

    const handleFocus = useCallback((e: Parameters<NonNullable<TextInputProps['onFocus']>>[0]) => { setFocused(true); rest.onFocus?.(e); }, [rest.onFocus]);
    const handleBlur = useCallback((e: Parameters<NonNullable<TextInputProps['onBlur']>>[0]) => { setFocused(false); rest.onBlur?.(e); }, [rest.onBlur]);
    const handleClear = useCallback(() => { onChangeText?.(''); }, [onChangeText]);

    const borderColor = error ? colors.danger : focused ? colors.primary : colors.border;
    const bw = error || focused ? 2 : 1;
    const off = error || focused ? 1 : 0;

    const inputRowStyle = useMemo<ViewStyle>(
      () => ({ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: bw, borderColor, paddingHorizontal: spacing.md - off, paddingVertical: spacing.sm + 2 - off, gap: spacing.sm }),
      [colors.surface, radii.lg, bw, borderColor, spacing, off],
    );

    const showClear = clearable && !!value && value.length > 0 && !loading;

    return (
      <View style={[styles.container, containerStyle]}>
        {label !== undefined && <Text variant="caption" color="textSecondary" style={styles.label}>{label}</Text>}
        <View style={inputRowStyle}>
          {leftIcon !== undefined && <Icon name={leftIcon} size={20} color={colors.icon} />}
          <TextInput ref={ref} value={value} onChangeText={onChangeText} onFocus={handleFocus} onBlur={handleBlur} placeholderTextColor={colors.textTertiary} style={[styles.input, { color: colors.text }, style]} accessibilityLabel={label} {...rest} />
          {loading && <ActivityIndicator size="small" color={colors.primary} />}
          {showClear && <Pressable onPress={handleClear} hitSlop={12} accessibilityLabel="Clear text" accessibilityRole="button"><Icon name="close-circle" size={20} color={colors.iconMuted} /></Pressable>}
          {rightSlot}
        </View>
        {error !== undefined && <Text variant="caption" color="danger" style={styles.helper}>{error}</Text>}
      </View>
    );
  }),
);

const styles = StyleSheet.create({ container: { gap: 6 }, label: { marginBottom: 2 }, input: { flex: 1, fontSize: 16, lineHeight: 22, padding: 0, margin: 0 }, helper: { marginTop: 2 } });
