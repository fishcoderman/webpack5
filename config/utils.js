const chalk = require('chalk'); // 样式化终端输出
const inquirer = require('inquirer'); // 终端人机交互
const portfinder = require('portfinder'); // 查找端口

exports.choosePort = defaultPort =>
  new Promise((resolve, reject) => {
    portfinder.basePort = defaultPort;
    portfinder.getPort((err, port) => {
      if (err) {
        return reject(err);
      }

      // 如果相同，直接返回
      if (port === defaultPort) {
        return resolve(port);
      }

      const message =
        process.platform !== 'win32' && defaultPort < 1024
          ? `Admin permissions are required to run a server on a port below 1024.`
          : `Something is already running on port ${defaultPort}.`;

      const question = {
        type: 'confirm',
        name: 'shouldChangePort',
        message: `${chalk.yellow(message)}\n\nWould you like to run the app on another port instead?`,
        default: true,
      };

      inquirer.prompt(question).then(answer => {
        if (answer.shouldChangePort) {
          resolve(port);
        } else {
          reject(null);
        }
      });
    });
  });
