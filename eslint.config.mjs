import antfu from "@antfu/eslint-config";
import eslintPluginTailwindcss from "eslint-plugin-tailwindcss";
// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

const tailwind = eslintPluginTailwindcss.configs.recommended;
const tailwindSettings = {
  tailwindcss: {
    cssConfigPath: "./app/assets/css/main.css",
  },
};

export default withNuxt(antfu({
  type: "app",
  vue: true,
  typescript: true,
  formatters: true,
  stylistic: {
    indent: 2,
    semi: true,
    quotes: "double",
  },
}, {
  rules: {
    "ts/no-redeclare": "off",
    "ts/consistent-type-definitions": ["error", "type"],
    "no-console": ["warn"],
    "antfu/no-top-level-await": ["off"],
    "node/prefer-global/process": ["off"],
    "node/no-process-env": ["error"],
    "perfectionist/sort-imports": ["error"],
    "unicorn/filename-case": ["error", {
      case: "kebabCase",
      ignore: ["README.md"],
    }],
  },
}, {
  ...tailwind,
  settings: tailwindSettings,
}, {
  // recommended only targets js/ts files, so wire the same rules up for SFCs
  // (without its languageOptions, which would clobber vue-eslint-parser)
  name: "tailwindcss/vue",
  files: ["**/*.vue"],
  plugins: tailwind.plugins,
  settings: tailwindSettings,
  rules: tailwind.rules,
}));
