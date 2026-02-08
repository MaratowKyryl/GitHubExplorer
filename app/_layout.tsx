import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useReactQuery } from "@/src/hooks/useReactQuery";
import { IconButton, UIThemeProvider, useTheme } from "@/src/ui";

import { QueryClientProvider } from "@tanstack/react-query";

function ThemeToggleButton() {
  const { colorScheme, setThemeOverride } = useTheme();

  return (
    <IconButton
      name={colorScheme === "dark" ? "sunny" : "moon"}
      accessibilityLabel="Toggle theme"
      onPress={() =>
        setThemeOverride(colorScheme === "dark" ? "light" : "dark")
      }
    />
  );
}

function NavigationStack() {
  const { colors, colorScheme } = useTheme();

  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerShadowVisible: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Repositories",
            headerRight: () => <ThemeToggleButton />,
          }}
        />
      </Stack>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </>
  );
}

export default function RootLayout() {
  const queryClient = useReactQuery();

  return (
    <UIThemeProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationStack />
      </QueryClientProvider>
    </UIThemeProvider>
  );
}
