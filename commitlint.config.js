module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build', // 影响构建过程，和外部依赖的改动，如 webpack,npm 相关文件的变动
        'chore', // 其他不改变src 文件夹的改动，如（.gitignore的改动，或者不好归类的放在这个类型下）
        'ci', // 影响持续集成的配置文件或脚本的改动
        'docs',
        'feat', // 新功能（feature, 如新建功能分支的首次提交，或功能分支的关联需求有新增功能）
        'fix',
        'improvement', // 当前功能分支的优化，或功能分支的关联需求优化
        'perf', // 提升代码运行性能的改动
        'refactor', // 重构（即不是新增功能，也不是修改bug的代码变动）
        'revert', // 重新提交之前的提交（revert命令会产生新的提交，和reset 不会）
        'style',
        'test',
      ],
    ],
  },
};
