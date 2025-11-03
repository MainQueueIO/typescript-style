import { globalIgnores } from "eslint/config";

import globals from "globals";
import jsdoc from "eslint-plugin-jsdoc";
import js from "@eslint/js";
import eslintPluginVue from "eslint-plugin-vue";
import {
    defineConfigWithVueTs,
    vueTsConfigs,
} from "@vue/eslint-config-typescript";

import { FlatCompat } from "@eslint/eslintrc";
const compat = new FlatCompat({
    baseDirectory: import.meta.dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default defineConfigWithVueTs(
    // Essential Vue rules
    eslintPluginVue.configs["flat/essential"],
    // Recommended TypeScript rules for Vue
    vueTsConfigs.recommended,
    // Optional: Stylistic TypeScript rules
    vueTsConfigs.stylistic,
    // If using Prettier, include this last to disable conflicting formatting rules
    // skipFormatting,
    {
        files: ["**/*.ts", "**/*.tsx", "**/*.vue"],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },

            ecmaVersion: 2020,
            parserOptions: {},
        },

        plugins: {
            jsdoc,
        },

        extends: compat.extends(
            "plugin:oxlint/recommended",
            "eslint:recommended",
            "plugin:prettier/recommended"
        ),
        rules: {
            "no-unused-vars": "off",
            "no-debugger": "error",
            "@typescript-eslint/interface-name-prefix": "off",
            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-duplicate-enum-values": "off",
            "vue/no-reserved-component-names": "off",

            "@typescript-eslint/no-unused-expressions": [
                "error",
                {
                    allowShortCircuit: true,
                },
            ],

            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    ignoreRestSiblings: true,
                },
            ],

            "prettier/prettier": [
                "error",
                {
                    endOfLine: "auto",
                    avoidEscape: true,
                },
            ],
        },
    },
    globalIgnores(["src/assets/", "public/", "dist/", ".github/CODEOWNERS"])
);
