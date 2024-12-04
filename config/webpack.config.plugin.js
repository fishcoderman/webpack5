const path = require('path');
const AddHelloWorldPlugin = require('./plugins/AddHelloWorldPlugin');

module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, './plugins/demo.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../build'),
  },
  plugins: [
    new AddHelloWorldPlugin(), // 使用自定义插件
  ],
};