module.exports = {
  extends: [
    'react-app',  // 使用 CRA 的 ESLint 配置
    'plugin:prettier/recommended', // 启用 Prettier 的规则
  ],
  parserOptions: {
    ecmaVersion: 2020, // 使用最新的 ECMAScript 语法
    sourceType: 'module',  // 使用模块导入语法
  },
  rules: {
    'semi': ['error', 'always'],
    // 例如：禁用 'react/prop-types' 检查
    'react/prop-types': 'off',
    'indent': ['error', 2],  // 强制使用 2 个空格缩进
    // 禁止多余空格
    'no-multi-spaces': ['error'],
    // 禁止行尾多余空格
    'no-trailing-spaces': ['error'],
    'max-len': ['error', { code: 150 }],
  },
};
