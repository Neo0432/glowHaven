import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#F7AFA0",
        "primary-hover": "#FF8369",
        "additional-red": "#FFC2C2",
        "item-bg": "#FFE6DB",
        "pink-text": "#FB3F6E",
        "light-gray": "#626262",
        "focus-element": "#D98B6A",
        "green-coin": "#89C151",
        "green-coin-hover": "#70B52B",
        "green-coin-active": "#6CC711",
      },
      borderWidth: {
        "6": "6px",
      },
    },
  },
  plugins: [],
} satisfies Config;
