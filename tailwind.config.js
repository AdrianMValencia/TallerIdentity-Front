/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
    colors: {
      current: "currentColor",
      transparent: "transparent",

      black: "black",
      white: "white",
      "contrast-black": "black",
      "contrast-white": "white",

      grays: {
        light: "#D6D6D6",
        DEFAULT: "#969CA7",
      },
      gray: {
        light: "rgba(158, 158, 158, 0.1)",
        DEFAULT: "rgb(158, 158, 158)",
      },
      red: {
        light: "rgba(244, 67, 54, 0.1)",
        DEFAULT: "rgb(244, 67, 54)",
      },
      orange: {
        light: "rgba(255, 152, 0, 0.1)",
        DEFAULT: "rgb(255, 152, 0)",
      },
      "deep-orange": {
        light: "rgba(255, 87, 34, 0.1)",
        DEFAULT: "rgb(255, 87, 34)",
      },
      amber: {
        light: "rgba(255, 193, 7, 0.1)",
        DEFAULT: "rgb(255, 193, 7)",
      },
      green: {
        light: "rgba(76, 175, 80, 0.1)",
        DEFAULT: "rgb(76, 175, 80)",
      },
      teal: {
        light: "rgba(0, 150, 136, 0.1)",
        DEFAULT: "rgb(0, 150, 136)",
      },
      cyan: {
        light: "rgba(0, 188, 212, 0.1)",
        DEFAULT: "rgb(0, 188, 212)",
      },
      purple: {
        light: "rgba(156, 39, 176, 0.1)",
        DEFAULT: "rgb(156, 39, 176)",
      },
      "deep-purple": {
        light: "rgba(103, 58, 183, 0.1)",
        DEFAULT: "rgb(103, 58, 183)",
      },
      pink: {
        light: "rgba(233, 30, 99, 0.1)",
        DEFAULT: "rgb(233, 30, 99)",
      },
      primary: {
        light: "rgba(var(--color-primary), .1)",
        DEFAULT: "rgb(var(--color-primary))",
      },
      accent: {
        light: "rgba(var(--color-accent), .1)",
        DEFAULT: "rgb(var(--color-accent))",
      },
      warn: {
        light: "rgba(var(--color-warn), .1)",
        DEFAULT: "rgb(var(--color-warn))",
      },
      "am-base": {
        background: "#F4F6FF",
      },
      "am-main-blue": {
        DEFAULT: "#2271B3",
        light: "#A3D0F6",
        dark: "#004A89",
      },
      "am-main-blue2": {
        DEFAULT: "#9775a2",
        light: "#6c407a",
        dark: "#441752",
      },
      "am-main-custom": {
        DEFAULT: "#ce938b",
        light: "#E9CEFF",
        dark: "#9c667d",
      },
      "am-main-custom2": {
        DEFAULT: "#da6d83",
        light: "#AB4459",
        dark: "#AB4459",
      },
      "am-main-custom3": {
        DEFAULT: "#cd813f",
        light: "#F29F58",
        dark: "#F29F58",
      },
      "am-main-custom4": {
        DEFAULT: "#ffffff",
        light: "#441752",
        dark: "#441752",
      },
      "am-main-custom": {
        DEFAULT: "#ce938b",
        light: "#E9CEFF",
        dark: "#9c667d",
      },
      "am-main-body-custom": {
        DEFAULT: "#edeaf7",
        light: "#edeaf7",
        dark: "#edeaf7",
      },
      "am-gray": {
        DEFAULT: "#9a9a9a",
        light: "#bebebe",
        dark: "#666666",
      },
      "am-new-green": {
        DEFAULT: "#e3e1b1",
        light: "#baeed0",
        dark: "#908B33",
      },
      "am-new-orange": {
        DEFAULT: "#f78842",
        light: "#fbc3a0",
        dark: "#af5f2e",
      },
      "am-coral": {
        DEFAULT: "#ee8f72",
        light: "#f6c7b8",
        dark: "#be6a50",
      },
      "am-teal": {
        DEFAULT: "#81e6e2",
        light: "#b3f0ed",
        dark: "#449D99",
      },
      "am-new-red": {
        DEFAULT: "#de7777",
        light: "#f2b0b0",
        dark: "#ac3d3d",
      },
      "am-new-yellow": {
        DEFAULT: "#ffce00",
        light: "#ffeb99",
        dark: "#a56c00",
      },
      "am-new-pink": {
        DEFAULT: "#d977dd",
        light: "#ecbaee",
        dark: "#97569a",
      },
      "am-new-purple": {
        DEFAULT: "#8f7ee3",
        light: "#baacff",
        dark: "#7164b1",
      },
      "am-purple": {
        transparent: "#757de338",
        relight: "#f0f1ff",
        light: "#dbdcff",
        medium: "#927DEA",
        dark: "#465499",
        DEFAULT: "#7084E3",
      },
      "am-green": {
        light: "#77DEA2",
        brightest: "#77DEA280",
        cyan: "#26b28f",
        dark: "#1f8f4e",
        aqua: "#7DEAB4",
        "brightest-transparent": "#e9f8ee",
        hover: "#F5FCF7",
        DEFAULT: "#54C931",
      },
      "am-red": {
        alive: "#E56262",
        light: "#ffcece",
        dark: "#d93d3d",
        intense: "#f00846",
        DEFAULT: "#DE7777",
      },
      "am-grey": {
        light: "#BFC4FF1F",
        dark: "#2C303E",
        medium: "#bbbbbb",
        transparent: "#BFC4FF4B",
        DEFAULT: "#666666",
      },
      "am-pink": {
        light: "#edcff0",
        dark: "#a941ae",
        brightest: "#d977dd3b",
        rose: "#F8BBD0",
        DEFAULT: "#D977DD",
      },
      "am-orange": {
        light: "#f89103",
        relight: "#fff1e8",
        dark: "#b57c00",
        DEFAULT: "#f78842",
      },
      "am-cyan": {
        light: "#b3edf4",
        dark: "#129aa6",
        blue: "#0061FD60",
        green: "#b9eadf",
        DEFAULT: "#18D9EA",
      },
      "am-blue": {
        light: "#92C9F2",
        DEFAULT: "#0061FD60",
        dark: "#5784a5",
      },
      "am-yellow": {
        resalt: "#FFCE00",
        light: "#f8e9ae",
        dark: "#c18b11",
        DEFAULT: "#FAD073",
      },
      "am-cream": {
        entry: "#81E6AB",
        entry_light: "#81E6AB33",
        entry_text: "#81E6ABB3",

        lunchgo: "#EEBA72",
        lunchgo_light: "#EEBA7233",
        lunchgo_text: "#EEBA72B3",

        lunchback: "#EE8F72",
        lunchback_light: "#EE8F7233",
        lunchback_text: "#EE8F72B3",

        exit: "#81E6E2",
        exit_light: "#81E6E233",
        exit_text: "#81E6E2B3",

        yesterday: "#DE7777",
        yesterday_light: "#DE777733",
        yesterday_text: "#DE7777B3",
      },
      "am-brown": {
        light: "#f1e1d8",
        dark: "#501D0E",
        DEFAULT: "#A23E00",
      },
    },
  },
  plugins: [],
};
