module.exports = function (api) {
  api.cache(true);

  const presets = [
    "@babel/typescript",
    ["@babel/preset-env", {
      "useBuiltIns": "entry",
      "targets": {
        "chrome": "41"
      },
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
      "useESModules": true
    }]
  ];

  return {
    presets,
    plugins
  };
}
