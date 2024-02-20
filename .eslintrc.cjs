// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    // "plugin:prettier/recommended",
    // "prettier",
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    '@stylistic',
    // "prettier",
  ],
  rules: {
    'import/prefer-default-export': ['off'],
    'import/no-unresolved': ['off'],
    'import/extensions': ['off'],

    'no-restricted-syntax': ['off'],
    'no-use-before-define': ['off'],
    'no-case-declarations': ['off'],

    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    // '@typescript-eslint/no-floating-promises': 'error',
    // '@typescript-eslint/promise-function-async': 'error',
    // '@typescript-eslint/no-misused-promises': 'error',
    // '@typescript-eslint/require-await': 'error',
    // '@typescript-eslint/no-shadow': 'error',

    // '@stylistic/object-curly-spacing': ['error', 'always'],
    // '@stylistic/object-curly-newline': [
    //   'error',
    //   {
    //     ObjectExpression: { multiline: true, minProperties: 4, consistent: true },
    //     ObjectPattern: { multiline: true, minProperties: 4, consistent: true },
    //   },
    // ],
    // '@stylistic/switch-colon-spacing': ['error', { after: false, before: false }],
    '@stylistic/padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: [
          'block',
          'block-like',
          'cjs-export',
          'class',
          'const',
          'export',
          'import',
          'let',
          'var',
        ],
      },
      {
        blankLine: 'always',
        prev: [
          'block',
          'block-like',
          'cjs-export',
          'class',
          'const',
          'export',
          'import',
          'let',
          'var',
        ],
        next: '*',
      },
      {
        blankLine: 'never',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
      {
        blankLine: 'any',
        prev: ['export', 'import'],
        next: ['export', 'import'],
      },
      { blankLine: 'always', prev: '*', next: 'return' },
    ],
  },
};
