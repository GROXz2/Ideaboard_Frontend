// /src/theme/theme.ts
import React, { createContext, useContext, useMemo, type ReactNode } from 'react';
import { Platform, type ViewStyle } from 'react-native';

/** ===== Types ===== */
export type Mode = 'light' | 'dark';
export type Palette = 'indigo' | 'teal' | 'plum';

type ColorSet = {
  primary: string;
  primaryHover: string;
  accent: string;
  warn: string;
  error: string;
  text: string;
  textDim: string;
  bg: string;
  surface: string;
  border: string;
};

export type Theme = {
  mode: Mode;
  palette: Palette;
  color: ColorSet;
  radius: { sm: number; md: number; lg: number; xl: number };
  spacing: (n: number) => number;
  typography: {
    display: { size: number; lh: number; weight: '600' };
    h1: { size: number; lh: number; weight: '600' };
    h2: { size: number; lh: number; weight: '600' };
    body: { size: number; lh: number; weight: '400' };
    caption: { size: number; lh: number; weight: '400' };
    micro: { size: number; lh: number; weight: '400' };
  };
  sizes: {
    hitbox: number;
    icon: { sm: number; md: number; lg: number };
    node: { S: { w: number; h: number }; M: { w: number; h: number }; L: { w: number; h: number } };
  };
};

/** ===== Base Tokens (agnósticos de color) ===== */
const tokensBase = {
  radius: { sm: 8, md: 12, lg: 16, xl: 20 },
  spacing: (n: number) => n * 8,
  typography: {
    display: { size: 32, lh: 40, weight: '600' as const },
    h1: { size: 24, lh: 30, weight: '600' as const },
    h2: { size: 20, lh: 26, weight: '600' as const },
    body: { size: 16, lh: 22, weight: '400' as const },
    caption: { size: 14, lh: 20, weight: '400' as const },
    micro: { size: 12, lh: 16, weight: '400' as const },
  },
  sizes: {
    hitbox: 48,
    icon: { sm: 20, md: 24, lg: 28 },
    node: {
      S: { w: 152, h: 96 },
      M: { w: 184, h: 120 }, // default sugerido
      L: { w: 216, h: 148 },
    },
  },
};

/** ===== Paletas ===== */
const palettes = {
  light: {
    indigo: {
      primary: '#4F46E5',
      primaryHover: '#6366F1',
      accent: '#10B981',
      warn: '#F59E0B',
      error: '#F43F5E',
      text: '#0F172A',
      textDim: '#475569',
      bg: '#F8FAFC',
      surface: '#FFFFFF',
      border: '#E2E8F0',
    },
    teal: {
      primary: '#0EA5E9',
      primaryHover: '#06B6D4',
      accent: '#22C55E',
      warn: '#F59E0B',
      error: '#F43F5E',
      text: '#0F172A',
      textDim: '#475569',
      bg: '#F8FAFC',
      surface: '#FFFFFF',
      border: '#E2E8F0',
    },
    plum: {
      primary: '#7C3AED',
      primaryHover: '#8B5CF6',
      accent: '#F59E0B',
      warn: '#F59E0B',
      error: '#F43F5E',
      text: '#0F172A',
      textDim: '#475569',
      bg: '#F8FAFC',
      surface: '#FFFFFF',
      border: '#E2E8F0',
    },
  },
  dark: {
    indigo: {
      primary: '#818CF8',
      primaryHover: '#A5B4FC',
      accent: '#34D399',
      warn: '#FBBF24',
      error: '#FB7185',
      text: '#E5E7EB',
      textDim: '#9CA3AF',
      bg: '#0B1220',
      surface: '#111827',
      border: '#1F2937',
    },
    teal: {
      primary: '#67E8F9',
      primaryHover: '#22D3EE',
      accent: '#34D399',
      warn: '#FBBF24',
      error: '#FB7185',
      text: '#E5E7EB',
      textDim: '#9CA3AF',
      bg: '#0B1220',
      surface: '#111827',
      border: '#1F2937',
    },
    plum: {
      primary: '#A78BFA',
      primaryHover: '#C4B5FD',
      accent: '#FBBF24',
      warn: '#FBBF24',
      error: '#FB7185',
      text: '#E5E7EB',
      textDim: '#9CA3AF',
      bg: '#0B1220',
      surface: '#111827',
      border: '#1F2937',
    },
  },
} satisfies Record<Mode, Record<Palette, ColorSet>>;

/** ===== Theme builder ===== */
export type ThemeConfig = { mode?: Mode; palette?: Palette };
export function getTheme(cfg: ThemeConfig = {}): Theme {
  const mode = cfg.mode ?? 'light';
  const palette = cfg.palette ?? 'indigo';
  const color = palettes[mode][palette];
  return {
    mode,
    palette,
    color,
    ...tokensBase,
  };
}

/** ===== Shadows helper (cross-platform) ===== */
export function shadowStyle(level: 'sm' | 'md' | 'lg' = 'md'): ViewStyle {
  const androidElevation = level === 'sm' ? 2 : level === 'lg' ? 8 : 4;
  if (Platform.OS === 'android') return { elevation: androidElevation };
  const i = level === 'sm' ? 0 : level === 'lg' ? 2 : 1;
  const opacity = [0.12, 0.16, 0.2][i];
  const radius = [6, 12, 24][i];
  const offsetY = [2, 4, 8][i];
  return {
    shadowColor: '#000',
    shadowOpacity: opacity,
    shadowRadius: radius,
    shadowOffset: { width: 0, height: offsetY },
  };
}

/** ===== Context / Provider / Hook ===== */
const defaultTheme = getTheme();
const ThemeContext = createContext<Theme>(defaultTheme);

export function ThemeProvider({
  mode = 'light',
  palette = 'indigo',
  children,
}: { mode?: Mode; palette?: Palette; children: ReactNode }) {
  const value = useMemo(() => getTheme({ mode, palette }), [mode, palette]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): Theme {
  return useContext(ThemeContext);
}
