module.exports =  {
    parser: 'vue-eslint-parser',
    parserOptions: {
       parser: '@typescript-eslint/parser',
    },
    extends:  [
        'prettier',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
        'plugin:vue/recommended',
        'plugin:vue/base',
        '@vue/prettier',
        '@vue/typescript'
    ],
    parserOptions: {
        ecmaVersion:  2018,
        sourceType:  'module'
    },
    rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        'semi': 'off',
        '@typescript-eslint/semi': 'off'
    }
};
  