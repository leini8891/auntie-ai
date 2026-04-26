import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink:    "#0F1A2E",
        navy:   "#0F4C81",
        teal:   "#0E7C7B",
        amber:  "#D9480F",
        cream:  "#F8F4EB",
        paper:  "#FFFCF7",
        mist:   "#E5EEF6",
        stone:  "#6B7280",
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "PingFang SC",
          "Microsoft YaHei",
          "Helvetica Neue",
          "sans-serif",
        ],
      },
      boxShadow: {
        phone: "0 30px 60px -15px rgba(15,26,46,0.25), 0 8px 24px -8px rgba(15,26,46,0.15)",
        card:  "0 4px 20px -8px rgba(15,76,129,0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
