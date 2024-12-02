const path = require('path');

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { merge } = require('webpack-merge');
const utils = require('./utils');
const config_base = require('./webpack.config.base');

const config_dev = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    hot: true,
    port: 3003,
    open: true,
    static: {
      directory: path.join(__dirname, 'public'),
    },
    client: {
      overlay: false,
      progress: true,
    },
  },
  plugins: [
    new ReactRefreshWebpackPlugin({ overlay: false })
  ]
};


module.exports = () =>
  new Promise((resolve, reject) => {
    utils.choosePort(config_dev.devServer.port).then(
      port => {
        process.env.PORT = port;
        config_dev.devServer.port = port;
        resolve(merge([config_base, config_dev]));
      },
      err => {
        reject(err);
      }
    );
  });