module.exports = {
  presets: [
    ['@babel/preset-env', { modules: false, useBuiltIns: 'entry', corejs: { version: 3.19, proposals: true } }],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],

  plugins: [
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": true }]
  ],
};
