import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import config from '@rocketseat/eslint-config/node.js';

const customConfig = {
    languageOptions: {
        globals: {},
    },
};

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
  customConfig,
  ...tseslint.configs.recommended,
];