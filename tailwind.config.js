/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    colors: {
      bluishDay: "#0099A8",
      white: "#fff",
      "gray-300": "#d1d5db",
      "gray-400": "#9ca3af",
      "cyan-100": "#cffafe",
    },
    extend: {},
  },
  plugins: [require("daisyui")],
  important: true,
};
