// References for dep detection

import resolve from 'resolve';

const strict = false;

// Never enable this; it's just here for dependency checking.
const falsy = Math.random() < 0;
if (falsy) {
  // avoid trivial code elimination
  require('@typescript-eslint/eslint-plugin');
  require('@typescript-eslint/parser');
  require('eslint-config-prettier');
  require('eslint-plugin-import');
  require('eslint-plugin-json');
  require('eslint-plugin-lodash');
  require('eslint-plugin-node');
  require('eslint-plugin-prettier');
  require('eslint-plugin-promise');
  require('eslint-plugin-sort-class-members');
  require('eslint-plugin-tree-shaking');
  require('eslint-plugin-you-dont-need-lodash-underscore');
}

const reactEnabled: boolean = isReactEnabled();
function isReactEnabled() {
  try {
    /* eslint-disable node/no-extraneous-require, node/no-missing-require */
    require(resolve.sync('react'));
    require(resolve.sync('eslint-plugin-react'));
    /* eslint-enable node/no-extraneous-require, node/no-missing-require */
    return true;
  } catch (err) {
    return false;
  }
}

const reduxSagaEnabled: boolean = isReduxSagaEnabled();
function isReduxSagaEnabled() {
  try {
    /* eslint-disable node/no-extraneous-require, node/no-missing-require */
    require(resolve.sync('redux-saga'));
    require(resolve.sync('eslint-plugin-redux-saga'));
    /* eslint-enable node/no-extraneous-require, node/no-missing-require */
    return true;
  } catch (err) {
    return false;
  }
}

const eslintRules = {
  'array-callback-return': 'error',
  'comma-dangle': 'off', // managed by Prettier
  'comma-spacing': 'error',
  'comma-style': 'error',
  'guard-for-in': 'warn',
  'no-alert': 'error',
  'no-bitwise': 'warn',
  'no-caller': 'error',
  'no-console': 'error',
  'no-eval': 'error',
  'no-extend-native': 'error',
  'no-redeclare': 'off',
  'no-shadow': 'off',
  'no-throw-literal': 'error',
  'no-undefined': 'off',
  'no-unused-expressions': 'off', // replaced by TS rule
  'no-use-before-define': 'off', // covered by TS rule
  'no-useless-computed-key': 'error',
  'no-var': 'error',
  'prefer-const': 'warn',
  'prefer-template': 'warn',
  'yield-star-spacing': 'error',
  yoda: 'warn',
  camelcase: 'off', // Covered by TS rule
  semi: 'error',
};

// https://github.com/benmosher/eslint-plugin-import
const importRules = {
  // import/export bans multiple default exports...but these are valid if they
  // are overloaded TS declarations.
  'import/export': 'off',
  'import/default': 'off', // Not working well
  'import/named': 'off', // False positives from export *
  'import/order': [
    'warn',
    {
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      alphabetize: {
        order: 'asc',
        caseInsensitive: true,
      },
      pathGroups: [
        { pattern: 'react', group: 'builtin', position: 'before' },
        { pattern: 'fs-extra', group: 'builtin', position: 'after' },
        {
          pattern: '{antd,react-base-table}{,/**}',
          group: 'external',
          position: 'after',
        },
        {
          pattern: '../../{,../{,../{,../{,../}}}}_[a-zA-Z]*{,/**}',
          group: 'internal',
          position: 'after',
        },
        {
          pattern: '../../{,../{,../{,../{,../}}}}AppProvider{,/**}',
          group: 'parent',
        },
        // {
        //   // Kludge until/unless https://github.com/benmosher/eslint-plugin-import/pull/1740 is merged
        //   pattern: '../{,../{,../{,../{,../{,../}}}}}[A-Z]*{,/**}',
        //   group: 'parent',
        //   position: 'after',
        // },
        {
          pattern: './{_[a-zA-Z]*}{,/**}',
          group: 'sibling',
          position: 'before',
        },
        {
          pattern: './attributes/interface',
          group: 'sibling',
          position: 'before',
        },
        // Kludge until/unless https://github.com/benmosher/eslint-plugin-import/pull/1740 is merged
        { pattern: './[A-Z]*{,/**}', group: 'sibling', position: 'after' },
      ],
      pathGroupsExcludedImportTypes: ['builtin'],
    },
  ],
};

const importSettings = {
  'import/internal-regex': '^@owl-\\w+/',
};

const jsonRules = {};

// https://github.com/wix/eslint-plugin-lodash#list-of-provided-rules
const lodashRules = {
  'lodash/import-scope': ['warn', 'member'],
  'lodash/matches-shorthand': ['warn', 'never'],
  'lodash/path-style': 'off',
  'lodash/prefer-constant': 'off',
  'lodash/prefer-includes': 'off',
  'lodash/prefer-is-nil': 'off',
  'lodash/prefer-lodash-method': 'off',
  'lodash/prefer-lodash-typecheck': 'off',
  'you-dont-need-lodash-underscore/throttle': 'off',
  'lodash/prefer-matches': 'off',
  'lodash/prefer-noop': 'warn',
  'lodash/prefer-some': 'off',
  'lodash/prop-shorthand': 'off',
  'lodash/matches-prop-shorthand': 'off',
};

// https://github.com/mysticatea/eslint-plugin-node#-rules
const nodeRules = {
  'node/no-unpublished-import': 'off',
  // 'node/no-unpublished-require':'off',
  'node/no-unsupported-features/es-syntax': ['off'],
};

// https://github.com/prettier/eslint-plugin-prettier
// Probably don't need anything!
const prettierRules = {
  'prettier/prettier': ['error', {}, { usePrettierRc: true }],
};

// https://github.com/xjamundx/eslint-plugin-promise#rules
const promiseRules = {
  'promise/prefer-await-to-callbacks': 'warn',
  'promise/prefer-await-to-then': 'off',
  'promise/always-return': 'warn',
  'promise/catch-or-return': 'warn',
};

// https://github.com/yannickcr/eslint-plugin-react#list-of-supported-rules
const reactRules = {};

// https://github.com/pke/eslint-plugin-redux-saga#rules
// By default enables all, seems OK.
const reduxRules = {};

// https://github.com/bryanrsmith/eslint-plugin-sort-class-members#usage
const sortClassMembersRules = {
  'sort-class-members/sort-class-members': 'error',
};

// https://github.com/lukastaegert/eslint-plugin-tree-shaking#installation-and-setup
// const treeShakingRules = {
// 	'tree-shaking/no-side-effects-in-initialization': 'error',
// };

// https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#supported-rules
const typescriptRules = {
  '@typescript-eslint/array-type': 'off',
  '@typescript-eslint/no-use-before-define': [
    'error',
    { functions: false, classes: false, variables: true },
  ],
  '@typescript-eslint/camelcase': 'off',
  '@typescript-eslint/naming-convention': [
    'warn',
    {
      selector: 'variable',
      modifiers: ['const'],
      format: ['camelCase', 'UPPER_CASE'],
    },
  ],
  '@typescript-eslint/explicit-module-boundary-types': [
    'warn',
    {
      allowArgumentsExplicitlyTypedAsAny: true,
    },
  ],
  '@typescript-eslint/explicit-function-return-type': strict ? 'warn' : 'off',
  '@typescript-eslint/indent': 'off',
  '@typescript-eslint/interface-name-prefix': 'off',
  '@typescript-eslint/no-explicit-any': strict ? 'warn' : 'off',
  '@typescript-eslint/no-non-null-assertion': 'off',
  '@typescript-eslint/no-object-literal-type-assertion': 'off',
  '@typescript-eslint/no-redeclare': 'warn',
  '@typescript-eslint/no-shadow': 'warn',
  '@typescript-eslint/no-unused-vars': [
    'warn',
    {
      vars: 'all',
      args: 'after-used',
      varsIgnorePattern: '^dummy',
      argsIgnorePattern: '^dummy',
      ignoreRestSiblings: true,
    },
  ],
  '@typescript-eslint/no-unused-expressions': ['error'],
  '@typescript-eslint/no-var-requires': 'warn',
};

// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#readme
// Mostly configured via preset
const youDontNeedLodashRules = {
  'you-dont-need-lodash-underscore/flatten': 'off',
  'you-dont-need-lodash-underscore/omit': 'off',
  'you-dont-need-lodash-underscore/last': 'off',
  'you-dont-need-lodash-underscore/uniq': 'off',
};

// faux-eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2019,
    ecmaFeatures: {
      // jsx: true, // Leave to default!
    },
  },

  plugins: [
    'import',
    'json',
    'lodash',
    'node',
    'prettier',
    'promise',
    ...(reactEnabled ? ['react'] : []),
    ...(reduxSagaEnabled ? ['redux-saga'] : []),
    'sort-class-members',
    // enableTreeShakingPlugin ? 'tree-shaking' : null,
    '@typescript-eslint',
  ],

  extends: [
    'eslint:recommended',

    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',

    'plugin:json/recommended',
    'plugin:lodash/recommended',
    'plugin:node/recommended',
    'plugin:promise/recommended',
    ...(reactEnabled ? ['plugin:react/recommended'] : []),
    ...(reduxSagaEnabled ? ['plugin:redux-saga/recommended'] : []),
    'plugin:you-dont-need-lodash-underscore/compatible-warn',

    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',

    'plugin:prettier/recommended',

    // Must come last!
    'prettier',
  ],

  settings: {
    ...(reactEnabled ? { react: { version: 'detect' } } : {}),
    ...importSettings,
  },

  rules: {
    ...eslintRules,
    ...importRules,
    ...jsonRules,
    ...lodashRules,
    ...nodeRules,
    ...prettierRules,
    ...promiseRules,
    ...(reactEnabled ? reactRules : {}),
    ...(reduxSagaEnabled ? reduxRules : {}),
    ...sortClassMembersRules,
    // ...(enableTreeShakingPlugin ? treeShakingRules : {}),
    ...typescriptRules,
    ...youDontNeedLodashRules,
  },
};

module.exports.overrides = [
  {
    files: [
      '*-test.*',
      '*.spec.*',
      '*.test.*',
      'test-*.*',
      'test.*.*',
      'test/**',
      '__test__/**',
    ],
    rules: {
      'no-console': 'off',
    },
  },
  {
    files: ['**/*.d.ts'],
    rules: Object.fromEntries(
      Object.keys(module.exports.rules)
        .concat(
          // These rules are in presets
          'node/no-extranous-import',
          '@typescript-eslint/no-empty-interface'
        )
        .map((rule) => [rule, 'off'])
    ),
  },
];
