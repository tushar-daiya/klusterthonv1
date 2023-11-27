/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "sv-red": "rgba(239,0,0,1)",
        'sv-green':"rgba(19,186,0,1)",
        'sv-green-light':"rgba(19,186,0,0.1)",
        "sv-red-light": "rgba(239, 0, 0, 0.1)",
        'sv-amber':"rgba(255,186,0,1)",
        'sv-amber-light':"rgba(255,186,0,0.15)",
        "sv-grey": "rgba(139,139,139,1)",
        "sv-border-1": "rgba(238,238,238,1)",
        "sv-highlight-1": "rgba(255,186,0,0.1)",
        "sv-highlight-2": "rgba(255,186,0,1)",
        greyBg: "#f2f1f1",
      },
      fontSize: {
        "sv-xxl": "2rem",
      },
    },
  },
  plugins: [],
});
