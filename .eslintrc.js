module.exports = {
  env: {
    commonjs: true,
    es2022: true,
    node: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 13,
  },
  rules: {
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'prettier/prettier': 'error',
  },
  ignorePatterns: ['03-files-in-folder/secret-folder/**/*.js'],
};
{
  "extends": [
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "react-app",
    "react-app/jest",
    "prettier"
  ],
  "plugins": ["@typescript-eslint", "prettier"],
  "parser": "@typescript-eslint/parser",
  "rules": {
    "prettier/prettier": ["warn",  {"endOfLine": "auto"}], 
    "testing-library/prefer-screen-queries": "error",
    "testing-library/no-manual-cleanup": "error",
    "testing-library/prefer-wait-for": "error",
    "testing-library/no-await-sync-events": "error",
  }
}