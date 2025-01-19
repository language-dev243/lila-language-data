import globals from "globals";
import tseslint from "typescript-eslint";
import recommendedTslint from "@typescript-eslint/eslint-plugin";
import prettierPlugin from "eslint-plugin-prettier";

/** @type {import('eslint').Linter.Config[]} */

export default [{

  files: ["**/*.{js,mjs,cjs,ts}"],
  languageOptions: 
    { 
      parser: '@typescript-eslint/parser', 
      globals: globals.node,
      ecmaVersion: "latest",
      sourceType: "module"
    },
  rules: {
      // TypeScript specific rules
      "adjacent-overload-signatures": ["error"],
      "@typescript-eslint/no-explicit-any": ["error"],
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-non-null-assertion": "warn",
      
      
      // General rules
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "warn",
      "no-duplicate-imports": "error",
      
      // Import rules
      "import/prefer-default-export": "off",
      "import/no-default-export": "off",

      "prettier/prettier": "error",

      ...recommendedTslint.rules,
    },
  plugins:
    {
       prettier: prettierPlugin,
       "@typescript-eslint": tseslint.plugin,
    }
}];