import { fixupConfigRules } from '@eslint/compat';
import { fixupPluginRules } from '@eslint/compat';
import js from '@eslint/js';
import ts from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactJsx from 'eslint-plugin-react/configs/jsx-runtime.js';
import react from 'eslint-plugin-react/configs/recommended.js';
import globals from 'globals';
import jsdoc from 'eslint-plugin-jsdoc';
import oxlint from 'eslint-plugin-oxlint';
import prettier from 'eslint-config-prettier';
import jest from 'eslint-plugin-jest';
import sortDestructureKeys from 'eslint-plugin-sort-destructure-keys';
import importRules from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import testingLibrary from 'eslint-plugin-testing-library';

// , parser: tsParser?

export default [
  { languageOptions: { globals: globals.browser } },
  js.configs.recommended,
  ...ts.configs.recommended,
  jsdoc.configs['flat/recommended'],
  ...fixupConfigRules([
    {
      ...react,
      settings: {
        react: { version: 'detect' },
      },
    },
    reactJsx,
  ]),
  {
    //Base Config
    files: ['*.ts', '*.tsx', '**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': ts.plugin,
      'sort-destructure-keys': sortDestructureKeys,
      import: fixupPluginRules(importRules),
      'testing-library': fixupPluginRules({ rules: testingLibrary.rules }),
      'react-hooks': reactHooks,
      'react-native': fixupPluginRules(reactNative),
      'jsx-a11y': jsxA11y,
      prettier,
    },
    languageOptions: {
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
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,

      //Base
      '@typescript-eslint/no-explicit-any': 'off',
      //OxLint
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          ignoreRestSiblings: true,
        },
      ],
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
          shorthandFirst: false,
          shorthandLast: true,
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

      // React Hooks Rules
      'react-hooks/exhaustive-deps': 'error',
      'react-hooks/rules-of-hooks': 'error',

      //React Rules
      'react/forbid-prop-types': 0,
      'react/jsx-closing-tag-location': 0,
      'react/jsx-curly-newline': 0,
      'react/jsx-filename-extension': 0,
      'react/jsx-one-expression-per-line': 0,
      'react/jsx-props-no-spreading': 0,
      'react/jsx-wrap-multilines': 0,
      'react/no-array-index-key': 1,
      'react/prop-types': 0,
      'react/require-default-props': 0,
      'react/state-in-constructor': 0,
      'react/static-property-placement': 0,
      //'class-methods-use-this': ['error', { exceptMethods: ['render'] }],
      // 'react/button-has-type': 'error',
      'react/no-multi-comp': 'error',

      //This give React Version errors
      'prefer-destructuring': ['error', { object: true, array: true }],
      'react/no-unused-prop-types': 'error',
      'react/no-unused-state': 'error',
      'react/jsx-fragments': 'error',
      'react/boolean-prop-naming': [
        'error',
        {
          validateNested: true,
        },
      ],
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
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

      // React Native Rules
      'react-native/no-unused-styles': 2,
      'react-native/split-platform-components': 2,
      'react-native/no-color-literals': 2,
      'react-native/no-single-element-style-arrays': 2,
      //'react-native/no-inline-styles': 2,
      //'react-native/no-raw-text': 2,
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
];
