const { exec } = require('child_process'); // 执行进程
const util = require('util');

const execAsync = util.promisify(exec); // 执行结果转promise

/**
 * git文件提交校验
 * 规则：package.json文件没有改动，禁止提交package-lock.json
 */
const fileLint = async () => {
  try {
    const { stdout } = await execAsync('git diff HEAD --cached --name-only');
    if (stdout && stdout.includes('pnpm-lock.yaml') && !stdout.includes('package.json')) {
      console.error('\x1B[41;37mpackage.json文件没有改动，禁止提交pnpm-lock.yaml \x1B[0m');
      process.exit(1);
    }
    process.exit(0);
  } catch (e) {
    // 没有commit记录的时候执行会报错，忽略
    console.error(e);
  }
};

fileLint();
