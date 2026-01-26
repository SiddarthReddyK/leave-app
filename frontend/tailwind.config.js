/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f4f8",
          100: "#d9e4f0",
          500: "#3A4F6F",
          600: "#2A3F5F",
        },
        secondary: {
          100: "#F0D4E8",
          400: "#D4A5C8",
          600: "#A87BA8",
        },
        accent: "#7ECEE8",
        accentLight: "#A8D8E8",
        blush: "#E8B4C8",
        eggshell: "#FAF8F5",
        background: "#FAF8F5",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "Sora", "sans-serif"],
        display: ["Plus Jakarta Sans", "sans-serif"],
      },
      fontSize: {
        xs: ["12px", "16px"],
        sm: ["14px", "20px"],
        base: ["16px", "24px"],
        lg: ["18px", "28px"],
        xl: ["20px", "28px"],
        "2xl": ["24px", "32px"],
        "3xl": ["32px", "40px"],
        "4xl": ["40px", "48px"],
        "5xl": ["48px", "56px"],
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(58, 79, 111, 0.05)",
        md: "0 4px 6px -1px rgba(58, 79, 111, 0.1), 0 2px 4px -1px rgba(58, 79, 111, 0.06)",
        lg: "0 10px 15px -3px rgba(58, 79, 111, 0.1), 0 4px 6px -2px rgba(58, 79, 111, 0.05)",
        xl: "0 20px 25px -5px rgba(58, 79, 111, 0.1), 0 10px 10px -5px rgba(58, 79, 111, 0.04)",
        "2xl": "0 25px 50px -12px rgba(58, 79, 111, 0.15)",
        "3xl": "0 35px 60px -15px rgba(58, 79, 111, 0.2)",
      },
      borderRadius: {
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        "2xl": "32px",
      },
    },
  },
  plugins: [],
}

