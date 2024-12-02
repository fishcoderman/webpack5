const path = require('path');
const { merge } = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');

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
    new ReactRefreshWebpackPlugin({ overlay: false }),
    new ESLintPlugin({
      context: path.resolve(__dirname, '../src'),
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      lintDirtyModulesOnly: true,
      cache: true,
    }),
    new HtmlWebpackTagsPlugin({
      tags: [
        'https://unpkg.com/react@17/umd/react.development.js',
        'https://unpkg.com/react-dom@17/umd/react-dom.development.js',
      ],
      append: false,
    }),
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