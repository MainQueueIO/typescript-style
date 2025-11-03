import { fixupPluginRules } from '@eslint/compat';
import js from '@eslint/js';
import ts from 'typescript-eslint';
import globals from 'globals';
import jsdoc from 'eslint-plugin-jsdoc';
import oxlint from 'eslint-plugin-oxlint';
import prettier from 'eslint-config-prettier';
import jest from 'eslint-plugin-jest';
import sortDestructureKeys from 'eslint-plugin-sort-destructure-keys';
import importRules from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import testingLibrary from 'eslint-plugin-testing-library';
import eslintPluginVue from "eslint-plugin-vue";
import {
    defineConfigWithVueTs,
    vueTsConfigs,
} from "@vue/eslint-config-typescript";


export default defineConfigWithVueTs([
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            }
        }
    },
    js.configs.recommended,
    ...ts.configs.recommended,
    eslintPluginVue.configs["flat/essential"],
    // Recommended TypeScript rules for Vue
    vueTsConfigs.recommended,
    // Optional: Stylistic TypeScript rules
    vueTsConfigs.stylistic,
    jsdoc.configs['flat/recommended'],
    {
        //Base Config
        files: ['**/*.ts', '**/*.vue'],
        plugins: {
            '@typescript-eslint': ts.plugin,
            'sort-destructure-keys': sortDestructureKeys,
            import: fixupPluginRules(importRules),
            'testing-library': fixupPluginRules({ rules: testingLibrary.rules }),
            'jsx-a11y': jsxA11y,
            prettier,
        },
        languageOptions: {
            ecmaVersion: 2020,
            parser: ts.parser,
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        settings: {
            'import/internal-regex': '^@/',
            'import/resolver': {
                node: {},
                typescript: {},
            },
        },
        rules: {
            //Base
            '@typescript-eslint/no-explicit-any': 'off',
            //OxLint
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            'jsx-a11y/label-has-associated-control': 'off',

            //Extra
            'arrow-body-style': 0,
            'consistent-return': 0,
            'import/extensions': 0,
            'import/prefer-default-export': 0,
            'no-param-reassign': [
                'error',
                {
                    ignorePropertyModificationsFor: ['acc', 'req', 'draft'],
                    props: true,
                },
            ],
            'no-shadow': 0,
            'no-underscore-dangle': 0,
            'no-use-before-define': 0,
            'sort-destructure-keys/sort-destructure-keys': 2,
            'import/no-unresolved': 'off',

            //Order in Imports, Objects, and Keys
            'space-infix-ops': ['error', { int32Hint: false }],
            'react/jsx-sort-props': [
                2,
                {
                    callbacksLast: true,
                    shorthandFirst: true,
                    shorthandLast: false,
                    ignoreCase: true,
                    noSortAlphabetically: false,
                },
            ],
            'sort-imports': [
                'error',
                {
                    allowSeparatedGroups: true,
                    ignoreCase: true,
                    ignoreDeclarationSort: false,
                    ignoreMemberSort: false,
                    memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
                },
            ],
            'sort-keys': [
                'error',
                'asc',
                { caseSensitive: true, minKeys: 2, natural: false },
            ],
            'sort-vars': ['error', { ignoreCase: true }],
            //Ox Lint 'import/no-cycle': 'off',
            'import/newline-after-import': 'error',
            'import/order': [
                'error',
                {
                    'newlines-between': 'always',
                    pathGroups: [
                        {
                            pattern: '@/**',
                            group: 'internal',
                        },
                    ],
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        'parent',
                        'sibling',
                        'index',
                    ],
                },
            ],
            'max-len': [
                'error',
                {
                    code: 140,
                    ignoreUrls: true,
                    ignoreStrings: true,
                },
            ],
        },
    },
    {
        //JSDoc Rules
        files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
        plugins: {
            jsdoc,
        },
        rules: {
            'jsdoc/require-returns': 0,
            'jsdoc/require-returns-check': 0,
            'jsdoc/require-returns-description': 0,
            'jsdoc/require-returns-type': 0,
            'jsdoc/require-description': 1,
            'jsdoc/require-param-type': 0,
            'jsdoc/require-jsdoc': [
                1,
                {
                    contexts: [
                        'ArrowFunctionExpression',
                        'ClassDeclaration',
                        'ClassExpression',
                        'FunctionDeclaration',
                        'FunctionExpression',
                        'MethodDefinition',
                    ],
                },
            ],
            'jsdoc/require-param-description': 'error',
            'jsdoc/tag-lines': [
                'error',
                'any',
                {
                    startLines: 0,
                },
            ],
        },
    },
    {
        //Jest/Testing Library Rules
        files: [
            '**/*.spec.ts',
            '**/*.test.ts',
            '**/*.spec.tsx',
            '**/*.test.tsx',
            '**/__tests__/**',
            '**/__mocks__/**',
        ],
        plugins: { jest },
        languageOptions: { globals: jest.environments.globals.globals },
        rules: {
            // Override from other and disable rules
            'jsdoc/require-jsdoc': 'off',
            'import/no-extraneous-dependencies': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/unbound-method': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',

            // jest custom rules
            'jest/no-focused-tests': 'error',
            'jest/prefer-to-have-length': 'error',
            'jest/prefer-lowercase-title': [
                'error',
                {
                    ignore: ['describe'],
                },
            ],
        },
    },
    ...oxlint.configs['flat/recommended'],
    { ignores: ['dist/'] },
]);
