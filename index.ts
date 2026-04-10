import eslintConfig from './eslint.config.mjs';
import eslintVueConfig from './eslint-vue.config.mjs';
import oxfmt from './.oxfmtrc.json';
import oxlintConfig from './oxlint-base.json';
import prettierConfig from './prettier.config.mjs';

export { eslintConfig, eslintVueConfig, oxfmt, oxlintConfig, prettierConfig };

export default {
  eslint: eslintConfig,
  eslintVue: eslintVueConfig,
  oxfmt: oxfmt,
  oxlint: oxlintConfig,
  prettier: prettierConfig,
};
