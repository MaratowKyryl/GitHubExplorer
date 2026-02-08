import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import ThemeToggleButton from "@/src/components/ThemeToggleButton";
import { SelectedRepositoryProvider } from "@/src/feature/search/context/SelectedRepositoryContext";
import { useReactQuery } from "@/src/hooks/useReactQuery";
import { UIThemeProvider, useTheme } from "@/src/ui";

import { QueryClientProvider } from "@tanstack/react-query";

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
        <Stack.Screen
          name="repositories/[id]"
          options={{
            title: "Details",
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
        <SelectedRepositoryProvider>
          <NavigationStack />
        </SelectedRepositoryProvider>
      </QueryClientProvider>
    </UIThemeProvider>
  );
}
