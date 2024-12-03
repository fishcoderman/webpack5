const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const os = require('os');

// 获取最大工作进程数量,每个线程启动有600ms的开销，建议只有项目工程大的情况下开启
const threads = Math.ceil(os.cpus().length / 2);
  

const isLocalDev = process.env.NODE_ENV === 'development';

// 生产环境使用 MiniCssExtractPlugin 从 js 中提取 css 到单独的文件中
const styleLoader = isLocalDev ? { loader: 'style-loader' } : MiniCssExtractPlugin.loader;

const cssLoader = { loader: 'css-loader', options: { sourceMap: false, importLoaders: 2} };

// 必须在 style-loader, css-loader 之后，在其他 loader 之前
const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    sourceMap: false,
  },
};

const lessLoader = {
  loader: 'less-loader', // Compiles Less to CSS.
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
     * 比如： additionalData: `@import '~src/style/variables.less';` 
     */
    additionalData: `@color: orange;`,
  },
};

module.exports = {
  entry: path.resolve(__dirname, '../src/index.tsx'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].js', // 主入口打包的资源地址
    chunkFilename: 'js/[id].[contenthash:8].chunk.js', // 拆分出来的chunk包资源地址
    assetModuleFilename: 'static/images/[hash][ext][query]', // type: asset 类型的资源，比如字体，图片等打包出来的资源地址
    clean: true,
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|jsx|ts|tsx)$/,
            exclude: /node_modules/,
            use: [
              {
                loader: "thread-loader",
                options: {
                  workers: threads,
                },
              },
              {
                loader: 'babel-loader',
                options: {
                  cacheDirectory: true,
                  cacheCompression: false,
                  compact: true,
                  plugins: isLocalDev ? [require.resolve('react-refresh/babel')] : [],
                },
              },
            ],
          },
          /**
           * loader的顺序为从右到左，从下到上
           * css-loader先在转化，style-loader再把他添加到头部
           * postcss-loader 统一配置到 postcss.config
           * less 需要安装 less 和 less-loader
           * less src/css/index.less index.css 该less命令为把src底下的less转为css
           * postcss-loader 统一配置到 postcss.config
           */
          {
            test: /\.module\.(less|css)/, // 处理局部样式
            exclude: /node_modules/,
            use: [
              styleLoader,
              {
                ...cssLoader,
                options: {
                  ...cssLoader.options,
                  modules: { localIdentName: '[name]__[local]--[hash:base64:4]' }, // 启用 CSS 模块规范
                },
              },
              postcssLoader,
              lessLoader,
            ],
          },
          {
            test: /\.(less|css)/, // 处理 node_modules 的样式
            exclude: /node_modules/,
            use: [styleLoader, cssLoader, postcssLoader, lessLoader],
          },
          { test: /\.(eot|TTF|ttf|woff|woff2)$/, type: 'asset/resource' },
          {
            test: /\.(png|jpg|jpeg|gif|bmp|webp)$/,
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: 8192,
              },
            }
          },
          {
            test: /\.svg$/,
            use: ['@svgr/webpack'],
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx','.tsx', '.json', '.less'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  plugins: [
    // html模版
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
      minify: false, // 压缩html
      removeComments: true,
      title: 'development',
    }),
    // 打包进度条
    new ProgressBarPlugin(),
    new webpack.DefinePlugin({
      'BASE_URL': "'./'",
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'public',
          globOptions: { ignore: ['**/index.html'] },
        },
      ],
    }),
  ],
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  optimization: {
    /**
     * runtimeChunk 用于将运行时代码（runtime）从入口文件中提取出来，生成单独的 chunk 文件。
     * 为什么需要提取运行时代码？当入口文件的内容发生变化时，如果运行时代码和业务代码混合在一起，整个文件会失效，浏览器缓存无法有效利用。
     */
    runtimeChunk: true, 
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