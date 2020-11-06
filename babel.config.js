module.exports = function (api) {
  api.cache(true);

  const presets = [
    "@babel/typescript"
  ];

  const plugins = [
    "@babel/proposal-object-rest-spread",
    "@babel/plugin-transform-typescript",
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
