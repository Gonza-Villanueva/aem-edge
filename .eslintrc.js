/* eslint-disable quotes */
module.exports = {
  root: true,
  extends: "airbnb-base",
  env: {
    browser: true,
  },
  parser: "@babel/eslint-parser",
  parserOptions: {
    allowImportExportEverywhere: true,
    sourceType: "module",
    requireConfigFile: false,
  },
  rules: {
    "import/extensions": ["error", { js: "always" }], // require js file extensions in imports
    "linebreak-style": ["error", "unix"], // enforce unix linebreaks
    "no-param-reassign": [2, { props: false }], // allow modifying properties of param
    "no-use-before-define": [2, { functions: false }],
    /* "no-console": [
      "error",
      {
        allow: ["warn", "error", "info", "debug"],
      },
    ], */
    "no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],

    // Ignorar la regla 'import/named' en todo el proyecto
    "import/named": "off",
    "import/no-unresolved": "off",
    "xwalk/max-cells": "off", // disable max-cells rule
    "no-console": "off", // allow console.log
  },
};
