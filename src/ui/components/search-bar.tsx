import React, { forwardRef, memo, useCallback } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  type TextInputProps,
  View,
  type ViewStyle,
} from "react-native";

import { Icon } from "./icon";
import { useTheme } from "../providers/use-theme";

export interface SearchBarProps extends Omit<TextInputProps, "style"> {
  style?: ViewStyle;
  onClear?: () => void;
  onSubmit?: () => void;
}

export const SearchBar = memo(
  forwardRef<TextInput, SearchBarProps>(function SearchBar(
    {
      value,
      onChangeText,
      onClear,
      onSubmit,
      placeholder = "Search\u2026",
      style,
      ...rest
    },
    ref,
  ) {
    const { colors, radii, spacing } = useTheme();
    const handleClear = useCallback(() => {
      onChangeText?.("");
      onClear?.();
    }, [onChangeText, onClear]);
    const showClear = !!value && value.length > 0;

    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.surface,
            borderRadius: radii.lg,
            paddingHorizontal: spacing.sm + 4,
            paddingVertical: spacing.sm + 2,
            gap: spacing.sm,
          },
          style,
        ]}
      >
        <Icon name="search" size={20} color={colors.icon} />
        <TextInput
          ref={ref}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit ? () => onSubmit() : undefined}
          placeholder={placeholder}
          placeholderTextColor={colors.textTertiary}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
          style={[styles.input, { color: colors.text }]}
          accessibilityRole="search"
          accessibilityLabel={placeholder}
          {...rest}
        />
        {showClear && (
          <Pressable
            onPress={handleClear}
            hitSlop={12}
            style={styles.clearBtn}
            accessibilityLabel="Clear search"
            accessibilityRole="button"
          >
            <Icon name="close-circle" size={20} color={colors.iconMuted} />
          </Pressable>
        )}
      </View>
    );
  }),
);

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center" },
  input: { flex: 1, fontSize: 16, lineHeight: 22, padding: 0, margin: 0 },
  clearBtn: { padding: 2 },
});
