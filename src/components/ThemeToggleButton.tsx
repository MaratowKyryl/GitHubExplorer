import { IconButton, useTheme } from "@/src/ui";

export default function ThemeToggleButton() {
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
