import oxlint from 'eslint-plugin-oxlint';
import eslintPluginVue from "eslint-plugin-vue";
import {
    defineConfigWithVueTs,
    vueTsConfigs,
} from "@vue/eslint-config-typescript";

import baseStyle from './eslint.config.mjs';


export default defineConfigWithVueTs([
    eslintPluginVue.configs["flat/essential"],
    // Recommended TypeScript rules for Vue
    vueTsConfigs.recommended,
    // Optional: Stylistic TypeScript rules
    vueTsConfigs.stylistic,
    ...baseStyle,
    ...oxlint.configs['flat/recommended'],
    { ignores: ['dist/', "public/"] },
]);
