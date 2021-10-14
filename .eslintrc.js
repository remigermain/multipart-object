module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 11,
    sourceType: "module",
    parser: "babel-eslint"
  },
  plugins: [
    "prettier",
    "@typescript-eslint"
  ],
  rules: {
    semi: [2, "never"],
    "max-len": ["error", { code: 200 }],
    "no-console": "off",
    "@typescript-eslint/no-explicit-any": ["off"]
  }
}