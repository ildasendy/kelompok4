module.exports = {
  content: ["./*.html", "./js/*.js"],
  theme: {
    extend: {
      colors: {
        primary: "#ff758c",
        secondary: "#ff7eb3",
        accent: "#fad0c4",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        "gradient-to-r": "linear-gradient(135deg, #fbc2eb, #a6c1ee)",
      },
      boxShadow: {
        custom: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      },
      transitionProperty: {
        scale: "transform",
      },
    },
  },
  plugins: [],
};
