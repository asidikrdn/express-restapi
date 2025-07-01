import globals from "globals";
import pluginJs from "@eslint/js";
import importPlugin from "eslint-plugin-import";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    plugins: { import: importPlugin },
    rules: {
      // Require .js extension for local file imports
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          js: "always",
          mjs: "always",
          jsx: "always"
        }
      ]
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".mjs", ".jsx"]
        }
      }
    }
  }
];