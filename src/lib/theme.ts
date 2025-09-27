"use client";

import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineRecipe,
} from "@chakra-ui/react";
import { Inter, Manrope } from "next/font/google";

/**
 * Fonts
 */
export const manrope = Manrope({ subsets: ["latin"], display: "swap" });
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

/**
 * Custom theme
 */
export const buttonRecipe = defineRecipe({
  variants: {
    size: {
      sm: { padding: "2", fontSize: "md", fontWeight: "bold" },
      md: { padding: "2", fontSize: "md", fontWeight: "bold" },
      lg: { padding: "4", fontSize: "md", fontWeight: "bold" },
    },
  },
});

export const theme = defineConfig({
  globalCss: {
    h1: { color: "fg" },
    h2: { color: "fg" },
    body: { color: "fg.muted", fontWeight: "normal" },
  },
  theme: {
    recipes: {
      Button: buttonRecipe,
      Heading: {
        base: {
          color: "fg.info",
        },
      },
      Link: {
        base: {
          textDecorationLine: "none",
        },
      },
    },

    tokens: {
      colors: {
        cobalt: {
          50: { value: "#eff6ff" },
          500: { value: "#2563eb" },
          600: { value: "#1d4ed8" },
        },
      },

      fonts: {
        heading: { value: inter.style.fontFamily },
        body: { value: inter.style.fontFamily },
        mono: { value: inter.style.fontFamily },
      },
    },
  },
});

export const system = createSystem(defaultConfig, theme);
