'use client';

import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineRecipe,
} from '@chakra-ui/react';
import { Inter, Space_Grotesk } from 'next/font/google';

/**
 * FONTS
 */
export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  weight: '700',
});
export const inter = Inter({ subsets: ['latin'], display: 'swap' });

/**
 * CUSTOM THEMES = RECIPES
 */
export const buttonRecipe = defineRecipe({
  variants: {
    size: {
      sm: { padding: '2', fontSize: 'md', fontWeight: 'bold' },
      md: { padding: '2', fontSize: 'md', fontWeight: 'bold' },
      lg: { padding: '4', fontSize: 'md', fontWeight: 'bold' },
    },
  },
});

export const theme = defineConfig({
  globalCss: {
    h1: { color: 'fg' },
    h2: { color: 'fg' },
    body: { color: 'fg.muted', fontWeight: 'normal' },
  },
  theme: {
    keyframes: {
      shake: {
        '0%': { transform: 'rotate(0deg) ' },
        '25%': { transform: 'rotate(2deg)' },
        '50%': { transform: 'rotate(0eg) ' },
        '75%': { transform: 'rotate(-2deg)' },
        '100%': { transform: 'rotate(0deg)' },
      },
      scaleUp: {
        '0%': {
          transform: 'scale(0.7)',
          opacity: 0,
        },
        '60%': {
          transform: 'scale(1.08)',
          opacity: 1,
        },
        '80%': {
          transform: 'scale(0.97)',
        },
        '100%': {
          transform: 'scale(1)',
          opacity: 1,
        },
      },
      textShimmer: {
        '0%': { maskPosition: 'right', WebkitMaskPosition: 'right' },
        '30%': { maskPosition: 'left', WebkitMaskPosition: 'left' },
        '100%': { maskPosition: 'left', WebkitMaskPosition: 'left' },
      },
    },
    recipes: {
      Button: buttonRecipe,
      Heading: {
        base: {
          color: 'fg.info',
        },
      },
      Link: {
        base: {
          textDecorationLine: 'none',
        },
      },
    },

    tokens: {
      colors: {
        cobalt: {
          50: { value: '#eff6ff' },
          400: {value: '#5082EF'},
          500: { value: '#2563eb' },
          600: { value: '#1d4ed8' },
        },
      },
      fonts: {
        heading: { value: spaceGrotesk.style.fontFamily },
        body: { value: inter.style.fontFamily },
        mono: { value: inter.style.fontFamily },
      },
    },
  },
});

export const system = createSystem(defaultConfig, theme);
