const os = require('os');

// 最大工作进程数量
const threads = os.cpus().length;

console.info('threads', threads);
