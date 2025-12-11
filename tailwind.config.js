/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
content: [
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",   // optional
],

  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        "basic-blue": "#007bff",
        "basic-cyan": "#17a2b8",
        "basic-dark": "#343a40",
        "basic-gray": "#6c757d",
        "basic-light": "#f8f9fa",
        "basic-success": "#28a745",
        "basic-warning": "#ffc107",
        "basic-danger": "#dc3545",
        "basic-white": "#ffffff",
        "basic-black": "#000000",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: { sans: ["Arial", "sans-serif"] },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
