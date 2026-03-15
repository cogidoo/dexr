import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#f7f1e3",
        ink: "#1f2937",
        accent: "#cc5500",
        accentDark: "#8a3200",
        pine: "#1f5c4a",
        card: "#fffaf0",
        line: "#d7c7aa",
      },
      boxShadow: {
        panel: "0 20px 40px rgba(31, 41, 55, 0.08)",
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
