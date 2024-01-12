module.exports = {
  purge: {
    enabled: true,
    content: [
      "./components/**/*.{js,vue,ts}",
      "./sections/**/*.{js,vue,ts}",
      "./layouts/**/*.vue",
      "./pages/**/*.vue",
      "./plugins/**/*.{js,ts}"
    ],
  },
  important: true,
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      Dark: "#00131F",
      TextColor: "#E3E3E3",
      SubText: "#E7E7E7",
      Blue: "#03B1C7",
      darkBlue: "#00131F",
      FieldGray: "#C2C2C2",
      TextGray: "#828282",
      SmallTextGray: "#BDBDBD",
      BorderGray: "#EEEEEE",
      white: "#FFFFFF",
      darkGray: "#737373",
      error: "#E81C4F",
      grayText: "#7B7B7B",
      purpleInfo: "#61035B",
      inputBorder: "#d2d2d7",
      textGray2: "#212529",
      textGrayMobileMenu: "#868686"
    },
    boxShadow: {
      DEFAULT: '4px 2px 10px rgba(0, 0, 0, 0.1)'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-pixel-dimensions')({
      width: {
        total: 900, // 900 is the default
        // startingSize: 0, // default
      },
      height: {
        total: 900, // 900 is the default
        // startingSize: 0, // default
      },
    }),
  ],
}
