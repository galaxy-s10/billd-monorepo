const chalk = require('chalk');

console.log(
  `${chalk.bgBlueBright.black(' INFO ')} ${chalk.blueBright(
    `读取了: ${__filename.slice(__dirname.length + 1)}`
  )}`
);

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        /**
         * useBuiltIns:
         * false: 默认值就是false,不用任何的polyfill相关的代码
         * usage: 代码中需要哪些polyfill, 就引用相关的api
         * entry: 手动在入口文件中导入 core-js/regenerator-runtime, 根据目标浏览器引入所有对应的polyfill
         */
        // useBuiltIns: 'usage',
        // corejs: '3',
        // modules: false,
        // modules: 'auto', // modules设置成commonjs后，路由懒加载就没了。
        // modules: 'commonjs', // https://github.com/vuejs/vue-cli/blob/HEAD/packages/@vue/babel-preset-app/index.js#L226
      },
    ],
  ],
  plugins: [
    [
      /**
       * useBuiltIns和polyfill选项在 v7 中被删除，只是将其设为默认值。
       */
      '@babel/plugin-transform-runtime',
      {
        absoluteRuntime: false, // boolean或者string，默认为false。
        // corejs: 3, // false, 2,3或{ version: 2 | 3, proposals: boolean }, 默认为false
        helpers: true, // boolean, 默认为true.切换内联的 Babel 助手（classCallCheck,extends等）是否替换为对 的调用moduleName
        regenerator: true, // 切换生成器函数是否转换为使用不污染全局范围的再生器运行时。默认为true
        // version: '7.0.0-beta.0',
      },
    ],
  ],

  // plugins: ['@babel/plugin-syntax-dynamic-import'],
};
