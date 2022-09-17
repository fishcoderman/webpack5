/**
 * 需要安装 postcss postcss-loader postcss-preset-en 插件
 * 如果需要能直接执行 npx postcss 则需要 postcss-cli
 * npm i postcss postcss-loader postcss-preset-env -D
 * postcss-preset-env 是插件集合 如autoprefixer插件
 */
module.exports = {
  plugins: [require('postcss-preset-env')]
}