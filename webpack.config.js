const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  target: 'web',
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
  },
  devServer: {
    hot: true,
    port: 3030,
    open: true,
    static: {
      directory: path.join(__dirname, 'public'),
    },
    client: {
      overlay: false,
      progress: true,
    },
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  plugins: [require.resolve('react-refresh/babel')].filter(Boolean),
                },
              },
            ],
          },
          /**
           * loader的顺序为从右到左，从下到上
           * css-loader先在转化，style-loader再把他添加到头部
           * postcss-loader 统一配置到 postcss.config
           */
          {
            test: /\.css$/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  /**
                   * 如果发现文件文件中有使用@import引入样式，如果不配置该属性，
                   * 那么postcss-loader等不会解析@import里面的样式，importLoaders属性为1，
                   * 代表向下加载1个loader，属性为2代表向下加载2个loader
                   */
                  importLoaders: 1,
                  /**
                   * css中图片加载默认为require，webpack5中加载图片为es6
                   */
                  esModule: false,
                },
              },
              'postcss-loader',
            ],
          },
          {
            test: /\.module\.(less|css)/, // 处理局部样式
            exclude: /node_modules/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                  esModule: false,
                  modules: { localIdentName: '[name]__[local]--[hash:base64:4]' }, // 启用 CSS 模块规范
                },
              },
              'postcss-loader',
              {
                loader: 'less-loader',
                options: {
                  lessOptions: {
                    javascriptEnabled: true,
                    /**
                     * modifyVars 自动加载到文件尾部，会覆盖其他less的申明变量
                     */
                    modifyVars: {
                      'link-color': '#1DA57A',
                    },
                  },
                  /**
                   * modifyVars 自动加载到文件头部，会被其他less的申明变量覆盖
                   */
                  additionalData: `@color: orange;`,
                },
              },
            ],
          },
          /**
           * less 需要安装 less 和 less-loader
           * less src/css/index.less index.css 该less命令为把src底下的less转为css
           * postcss-loader 统一配置到 postcss.config
           */
          {
            test: /\.less$/,
            use: [
              'style-loader',
              'css-loader',
              'postcss-loader',
              {
                loader: 'less-loader',
                options: {
                  lessOptions: {
                    javascriptEnabled: true,
                    /**
                     * modifyVars 自动加载到文件尾部，会覆盖其他less的申明变量
                     */
                    modifyVars: {
                      'link-color': '#1DA57A',
                    },
                  },
                  /**
                   * modifyVars 自动加载到文件头部，会被其他less的申明变量覆盖
                   */
                  additionalData: `@color: orange;`,
                },
              },
            ],
          },
          /**
           * webpack5内置 asset 资源处理，推荐使用
           * url-loader 是基于 file-loader 封装的，
           * 可以把小文件转换为 base64 格式的 URL，从而减少网络请求次数
           */
          {
            test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
            loader: 'url-loader',
            options: {
              limit: 100000,
              name: '[name].[hash:7].[ext]',
              outputPath: 'images',
              publicPath: './images',
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.less'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    // html模版
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html',
      minify: true, // 压缩html
      removeComments: true,
      title: 'development',
    }),
    // 打包前清除文件
    new CleanWebpackPlugin(),
    // 打包进度条
    new ProgressBarPlugin(),
    new webpack.DefinePlugin({
      BASE_URL: "'./'",
      'process.env.firstName': JSON.stringify('Tao'),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'public',
          globOptions: { ignore: ['**/index.html'] },
        },
      ],
    }),
    new ReactRefreshWebpackPlugin({ overlay: false }),
    // new BundleAnalyzerPlugin({
    //   analyzerPort: 8080, // 与charles的端口区分开
    // }),
  ],
  optimization: {
    splitChunks: {
      // 表示选择哪些 chunks 进行分割，可选值有：async，initial和all
      chunks: 'all',
      // 表示新分离出的chunk必须大于等于minSize，默认为30000，约30kb。
      minSize: 3000,
      // 表示一个模块至少应被minChunks个chunk所包含才能分割。默认为1。
      minChunks: 1,
      // 表示按需加载文件时，并行请求的最大数目。默认为5。
      maxAsyncRequests: 15,
      // 表示加载入口文件时，并行请求的最大数目。默认为3。
      maxInitialRequests: 15,
      // 表示拆分出的chunk的名称连接符。默认为~。如chunk~vendors.js
      automaticNameDelimiter: '~',
      // 设置chunk的文件名。默认为true。当为true时，splitChunks基于chunk和cacheGroups的key自动命名。
      name: false,
      // cacheGroups 下可以可以配置多个组，每个组根据test设置条件，符合test条件的模块，就分配到该组。模块可以被多个组引用，但最终会根据priority来决定打包到哪个组中。默认将所有来自 node_modules目录的模块打包至vendors组，将两个以上的chunk所共享的模块打包至default组。
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
