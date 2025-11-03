import eslintConfig from './eslint.config.mjs';
import eslintVueConfig from './eslint-vue.config.mjs';
import oxlintConfig from './oxlint-base.json';
import prettierConfig from './prettier.config.mjs';

export { eslintConfig, eslintVueConfig, oxlintConfig, prettierConfig };

export default {
  eslint: eslintConfig,
  eslintVue: eslintVueConfig,
  oxlint: oxlintConfig,
  prettier: prettierConfig,
};
