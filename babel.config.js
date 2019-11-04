const browserListQueries = require('./browserListQueries');

module.exports = function (api) {
  api.cache(true);

  const presets = [
    "@babel/typescript",
    ["@babel/preset-env", {
      "useBuiltIns": "entry",
      "targets": browserListQueries.modern, // Default for dev, gets overridden in webpack prod by BabelMultiTargetPlugin
      "corejs": 3
    }]
  ];

  const plugins = [
    "@babel/proposal-object-rest-spread",
    "@babel/plugin-transform-typescript",
    ["@babel/plugin-proposal-decorators", {"legacy": true}],
    ["@babel/proposal-class-properties", {"loose": true}],
    "@babel/plugin-syntax-dynamic-import",
    ["@babel/plugin-transform-runtime", {
      "regenerator": true,
      "corejs": 3,
      "useESModules": true
    }]
  ];

  return {
    presets,
    plugins,
    sourceType: 'unambiguous'
  };
}
