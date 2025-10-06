# AGENTS.md - Guidelines for TypeScript Style

## Commands

- Build: `bun run build`
- Lint: `bun lint` (runs all linting)
- Individual linting:
  - Type check: `bun lint:tsc`
  - Format check: `bun lint:format`
  - ESLint: `bun lint:eslinter`
  - Oxlint: `bun lint:oxlinter`
- Format fix: `bun lint:format:fix`
- ESLint fix: `bun lint:eslinter:fix`
- Oxlint fix: `bun lint:oxlinter:fix`

## Code Style Guidelines

- **Imports:** Sort imports using groups (builtin → external → internal → parent → sibling → index) with newlines between groups
- **Formatting:** 80 char line limit, single quotes, trailing commas, 'always' arrow parens
- **Components:** Use arrow functions for React components
- **Props:** Sort JSX props alphabetically with callbacks last
- **Objects:** Sort object keys alphabetically
- **Types:** TypeScript with explicit types where appropriate, avoid `any`
- **Documentation:** JSDoc comments for functions, classes, methods
- **Error Handling:** Consistent error handling patterns
- **Naming:** Use boolean props with proper naming convention (validateNested)
- **React Hooks:** Follow exhaustive deps rule strictly
- **Tests:** Use lowercase test names except for describe blocks
