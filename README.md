# MainQueueIO's typescript-styles repo

Shared configurations for Eslint, Prettier & Oxlint for all TS ecosystem code styles for MainQueue

## Oxlint 

[Docs](https://oxc.rs/docs/guide/usage/linter.html)

```
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": [
    "oxc",
    "typescript",
    "unicorn",
    "react",
    "import",
    "jsx-a11y",
    "jest",
    "jsdoc"
  ],
  "rules": {
    //???
    "import/no-cycle": "off",
    //Pending
    "react/button-has-type": 2,
    //WARNS UNCOMMENT TO ERROR
    //"jest/no-disabled-tests": 2, //IDE sets it to warning but on script you can deny it with --deny-warnings
    //"jest/valid-expect": 2, //IDE sets it to warning but on script you can deny it with --deny-warnings
    //"jest/no-export": 2, //IDE sets it to warning but on script you can deny it with --deny-warnings
    //NEEDED FOR STRICTNESS CUSTOM
    "@typescript-eslint/no-explicit-any": 2,
    "no-console": 2,
    "jest/no-identical-title": 2,
    "jest/no-alias-methods": 2,
    "jsx-a11y/label-has-associated-control": "off"
  }
}
```