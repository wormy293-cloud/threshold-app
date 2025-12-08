import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        foreground: "#1E3A8A",   // navy
        primary: "#FBBF24",      // amber yellow
      },
    },
  },
  plugins: [],
};

export default config;