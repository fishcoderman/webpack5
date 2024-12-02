const path = require('path');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config_base = require('./webpack.config.base');

const config_pro = {
  mode: 'production',
  devtool: 'source-map',
  entry: './src/index.tsx',
  plugins: [
    new MiniCssExtractPlugin({
      filename: "static/css/[name].css"
    }),
    new CssMinimizerPlugin(),
    new BundleAnalyzerPlugin({
      analyzerPort: 8080, // 与charles的端口区分开
    }),
  ],
};



module.exports = merge([config_base, config_pro])