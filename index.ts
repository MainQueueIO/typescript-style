import eslintConfig from './eslint.config.mjs';
import oxlintConfig from './oxlint-base.json';
import prettierConfig from './prettier.config.mjs';

export { eslintConfig, oxlintConfig, prettierConfig };

export default {
  eslint: eslintConfig,
  oxlint: oxlintConfig,
  prettier: prettierConfig,
};