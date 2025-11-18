import { FlatCompat } from "@eslint/eslintrc";
const compat = new FlatCompat();

export default [
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      "no-unused-vars": "warn", // Your custom rules
    },
  },
];
