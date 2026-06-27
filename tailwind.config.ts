import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Spec-driven brand palette (matched to the MobiKonnect logo)
        ink: {
          DEFAULT: "#262626", // site-wide frame color
          deep: "#1d1d1d",
          soft: "#2f2f2f",
        },
        blue: {
          DEFAULT: "#0999D5", // hero curved frame color (bright blue panels)
          deep: "#0a7bac",
          dark: "#06547a",
        },
        coral: {
          DEFAULT: "#D05E62", // red accent color
          deep: "#b84a4e",
        },
        cream: {
          DEFAULT: "#F8EBD3", // light text used on the colored panels
          dim: "rgba(248,235,211,0.66)",
          faint: "rgba(248,235,211,0.4)",
          line: "rgba(248,235,211,0.14)",
        },
        hww: {
          blue: "#36678C",
          amber: "#FFA704",
          rust: "#C95933",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        frame: "43px", // curved section roundness
        card: "30px",
        pill: "999px",
      },
      spacing: {
        margin: "75px", // site margins from each side
      },
      letterSpacing: {
        label: "0.22em",
      },
      fontSize: {
        // fluid display scale
        mega: ["clamp(2.5rem, 9vw, 8.5rem)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        giant: ["clamp(2.5rem, 7vw, 6.5rem)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        huge: ["clamp(2rem, 5vw, 4.25rem)", { lineHeight: "1.02", letterSpacing: "-0.015em" }],
        big: ["clamp(1.5rem, 3vw, 2.5rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        smooth: "cubic-bezier(0.65, 0.05, 0, 1)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        "marquee-reverse": "marquee-reverse 38s linear infinite",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin-slow 28s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
