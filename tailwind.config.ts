import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4A90E2", // Calming blue
        secondary: "#50E3C2", // Soft green
        background: "#F9FAFB", // Light gray
        accent: "#B8D0EB",
      },
      animation: {
        "sound-wave": "soundWave 2s ease-in-out infinite",
      },
      keyframes: {
        soundWave: {
          "0%, 100%": { transform: "scaleY(1)" },
          "50%": { transform: "scaleY(1.5)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
