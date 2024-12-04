const fs = require('fs');
class AddHelloWorldPlugin {
  constructor(options = {}) {
    this.options = options; // 可以接收外部传入的参数
  }

  apply(compiler) {
    // 使用 Webpack 提供的 hooks 来处理插件逻辑
    compiler.hooks.entryOption.tap('AddHelloWorldPlugin', (context, entry) => {
      // 能保留符号链接信息，比纯粹的process.cwd()更精准
      const appDirectory = fs.realpathSync(process.cwd());
      // console.info('pwd', process.cwd(), appDirectory)
      // console.info('entry', entry);
      entry['hello'] = {
        import: [`${appDirectory}/config/plugins/helloWorld.js`]
      };
      console.info('entry', entry);
    });

    //  监听 Webpack 的编译过程，确保生成一个 `helloWorld.js` 文件
    // compiler.hooks.emit.tapAsync('AddHelloWorldPlugin', (compilation, callback) => {
    //   // 创建一个虚拟模块 `helloWorld.js`，并将其内容写入文件
    //   compilation.assets['helloWorld.js'] = {
    //     source: () => 'console.log("Hello World");',
    //     size: () => 23, // 文件大小
    //   };
    //   callback(); // 调用回调，继续构建过程
    // });
  }
}

module.exports = AddHelloWorldPlugin;
