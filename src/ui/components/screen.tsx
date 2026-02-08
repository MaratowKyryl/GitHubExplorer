import React, { useMemo } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, type ViewStyle } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';
import { useTheme } from '../providers/use-theme';

export interface ScreenProps {
  children: React.ReactNode;
  scroll?: boolean;
  keyboardAvoiding?: boolean;
  edges?: readonly Edge[];
  style?: ViewStyle;
}

export function Screen({ children, scroll = false, keyboardAvoiding = true, edges, style }: ScreenProps) {
  const { colors } = useTheme();
  const containerStyle = useMemo<ViewStyle>(() => ({ flex: 1, backgroundColor: colors.background }), [colors.background]);

  let content: React.ReactNode = children;
  if (scroll) {
    content = (
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag" showsVerticalScrollIndicator={false}>
        {content}
      </ScrollView>
    );
  }
  if (keyboardAvoiding && Platform.OS === 'ios') {
    content = <KeyboardAvoidingView behavior="padding" style={styles.flex}>{content}</KeyboardAvoidingView>;
  }

  return <SafeAreaView edges={edges} style={[containerStyle, style]}>{content}</SafeAreaView>;
}

const styles = StyleSheet.create({ flex: { flex: 1 }, scrollContent: { flexGrow: 1 } });
