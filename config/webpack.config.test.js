const path = require('path');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config_base = require('./webpack.config.base');

const config_pro = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: "static/css/[name].css",
      chunkFilename: "static/css/[name].chunk.css",
    }),
    new HtmlWebpackTagsPlugin({
      tags:
        [
          'https://unpkg.com/react@17/umd/react.development.js',
          'https://unpkg.com/react-dom@17/umd/react-dom.development.js',
        ],
      append: false,
    }),
    new CssMinimizerPlugin(),
    new BundleAnalyzerPlugin({
      analyzerPort: 8080, // 与charles的端口区分开
    }),
  ].filter(Boolean),
};



module.exports = merge([config_base, config_pro])