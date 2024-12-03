const path = require('path');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config_base = require('./webpack.config.base');
const isReport = process.env.REPORT === 'true';
const isLocalDev = process.env.NODE_ENV === 'development';

const config_pro = {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: "static/css/[name].css",
      chunkFilename: "static/css/[name].chunk.css",
    }),
    new HtmlWebpackTagsPlugin({
      tags:
        [
          'https://unpkg.com/react@17/umd/react.production.min.js',
          'https://unpkg.com/react-dom@17/umd/react-dom.production.min.js',
        ],
      append: false,
    }),
    new CssMinimizerPlugin(),
    isReport && new BundleAnalyzerPlugin({
      analyzerPort: 8080, // 与charles的端口区分开
    }),
  ].filter(Boolean),
};



module.exports = merge([config_base, config_pro])