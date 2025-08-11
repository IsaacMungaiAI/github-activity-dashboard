'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  // Ensure theme logic only runs after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return nothing until mounted to avoid mismatch
    return null;
  }
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
