import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import storybook from "eslint-plugin-storybook";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:storybook/recommended"
  ),
  {
    plugins: { storybook },
    rules: {
      "react-hooks/exhaustive-deps": "warn", // Hooks の deps に指定していない場合は Warning を指定する
      "react/no-unescaped-entities": "warn", //(", ', <, > など) を適切にエスケープしないと警告が出る
    },
  },
];

export default eslintConfig;
