/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        foreground: "rgba(255,255,255,0.92)",
        glass: {
          panel: "rgba(255,255,255,0.06)",
          border: "rgba(255,255,255,0.10)",
        },
        input: {
          bg: "rgba(255,255,255,0.03)",
          border: "rgba(255,255,255,0.12)",
        },
        text: {
          primary: "rgba(255,255,255,0.92)",
          secondary: "rgba(255,255,255,0.55)",
          muted: "rgba(255,255,255,0.35)",
        },
        accent: "#3A7BFF",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        h1: ["28px", { lineHeight: "1.2", fontWeight: "800" }],
        body: ["14px", { lineHeight: "1.5", fontWeight: "400" }],
        label: ["12px", { lineHeight: "1.5", fontWeight: "500", letterSpacing: "0.04em" }],
        input: ["13px", { lineHeight: "1.5", fontWeight: "400" }],
        button: ["13px", { lineHeight: "1.5", fontWeight: "500" }],
      },
      boxShadow: {
        panel: "0px 12px 30px 0px rgba(0,0,0,0.45)",
        none: "none",
      },
      backdropBlur: {
        glass: "6px",
      },
      borderRadius: {
        glass: "12px",
        input: "10px",
        pill: "999px",
      },
      maxWidth: {
        content: "1120px",
      },
    },
  },
  plugins: [],
};