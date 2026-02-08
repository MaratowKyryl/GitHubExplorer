import React, { useCallback, useMemo, useState, type PropsWithChildren } from 'react';
import { useColorScheme as useSystemColorScheme } from 'react-native';
import { darkColors, lightColors, type ColorScheme } from '../theme/colors';
import { shadows } from '../theme/shadows';
import { spacing, radii, hairlineWidth, platformSelect } from '../theme/tokens';
import { typography } from '../theme/typography';
import { ThemeContext, type ThemeContextValue, type ThemeOverride } from './theme-context';

interface UIThemeProviderProps extends PropsWithChildren {
  initialOverride?: ThemeOverride;
}

export function UIThemeProvider({ children, initialOverride = 'system' }: UIThemeProviderProps) {
  const systemScheme = useSystemColorScheme();
  const [themeOverride, setOverride] = useState<ThemeOverride>(initialOverride);

  const colorScheme: ColorScheme = useMemo(() => {
    if (themeOverride !== 'system') return themeOverride;
    return systemScheme === 'dark' ? 'dark' : 'light';
  }, [themeOverride, systemScheme]);

  const setThemeOverride = useCallback((next: ThemeOverride) => setOverride(next), []);

  const value: ThemeContextValue = useMemo(
    () => ({
      colorScheme,
      themeOverride,
      setThemeOverride,
      colors: colorScheme === 'dark' ? darkColors : lightColors,
      spacing,
      radii,
      typography,
      shadows,
      hairlineWidth,
      platformSelect,
    }),
    [colorScheme, themeOverride, setThemeOverride],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
