const colors = {
  bg: '#FFFFFF',
  'bg-2': '#F3F4F6',
  fg: '#14171E',
  'fg-2': '#43454B',
  'fg-3': '#7B7D81',
  'fg-inverted': '#FFFFFF',
  stroke: '#F0F0F0',
  'stroke-strong': '#E4E4E7',
  brand: '#2563eb',
} as const;

export const tailwindConfig = {
  theme: {
    extend: {
      colors,
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Arial', 'sans-serif'],
      },
    },
  },
};
