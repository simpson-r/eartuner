"use client";

import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { Outfit, Manrope } from "next/font/google";

/**
 * Fonts
 */
export const manrope = Manrope({ subsets: ["latin"], display: "swap" });
export const geistMono = Outfit({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

/**
 * Custom theme
 */
export const theme = defineConfig({
  theme: {
    recipes: {
      Button: {
        defaultVariants: {
          colorPalette: "green", // sets default color palette
        },
      },
    },

    tokens: {
      colors: {
        background: {
          DEFAULT: { value: "#ffedd5" },
        },
      },
      fonts: {
        heading: { value: manrope.style.fontFamily },
        body: { value: geistMono.style.fontFamily },
        mono: { value: manrope.style.fontFamily },
      },
    },
  },
});

export const system = createSystem(defaultConfig, theme);
