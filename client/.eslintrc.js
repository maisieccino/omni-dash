const path = require("path");

const resolveDir = relativePath => path.resolve(__dirname, relativePath);

module.exports = {
  extends: ["airbnb", "prettier", "prettier/flowtype", "prettier/react"],
  env: {
    browser: true,
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 8,
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react", "jsx-a11y", "import"],
  globals: {},
  settings: {
    "import/resolver": {
      webpack: {
        config: resolveDir("webpack.config.js"),
        alias: {
          libs: path.resolve("app/libs"),
        },
      },
    },
  },
};
