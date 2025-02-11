/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    // https://typescript-eslint.io/rules/no-unused-vars/
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true
      }
    ],
    // https://zhuanlan.zhihu.com/p/548306020?utm_id=0
    // https://blog.csdn.net/qq_51657072/article/details/124427270
    // 'no-empty-function': 'on', // 是否允许空函数
    'no-var': 'error', // 禁止使用 var
    quotes: [2, 'single'], // 使用单引号
    'vue/multi-word-component-names': 'off', // 组件名称必须为单个单词
    '@typescript-eslint/no-explicit-any': 'off', // 不可使用any "warn"
    // 'vue/multi-word-component-names': ['error', { ignore: ['home', 'main'] }],
    indent: [
      2,
      2,
      {
        SwitchCase: 1
      }
    ], // 强制使用一致的缩进
    'arrow-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ], // 在箭头函数中的箭头前后强制保持一致的间距
    'new-cap': [
      2,
      {
        newIsCap: true,
        capIsNew: false
      }
    ], // 要求构造函数首字母大写
    'no-const-assign': 2, // 禁止修改 const 声明的变量
    'no-dupe-args': 2, // 禁止 function 定义中出现重名参数
    'no-eval': 2, // 禁用 eval()
    'no-label-var': 2, // 不允许标签与变量同名
    'no-multi-spaces': 2, // 禁止使用多个空格
    'no-octal': 2, // 禁用八进制字面量
    'no-redeclare': 2, // 禁止多次声明同一变量
    'no-trailing-spaces': 2, // 禁用行尾空格
    'operator-linebreak': [
      2,
      'after',
      {
        overrides: {
          '?': 'before',
          ':': 'before'
        }
      }
    ] // 强制操作符使用一致的换行符
  }
}
