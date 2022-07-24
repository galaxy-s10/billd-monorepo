import path from 'path';

import { DEFAULT_EXTENSIONS } from '@babel/core';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { defineConfig } from 'rollup';
import typescript from 'rollup-plugin-typescript2';

import pkg from '../package.json';

const babelRuntimeVersion = pkg.dependencies['@babel/runtime'].replace(
  /^[^0-9]*/,
  ''
);

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
].map((name) => RegExp(`^${name}($|/)`));

const outputDir = path.resolve(__dirname, '@huangshuisheng');
console.log(external);
console.log(outputDir);
console.log(path.resolve(__dirname, 'packages/utils/index.ts'));
export default defineConfig([
  {
    input: path.resolve(__dirname, 'packages/utils/index.ts'),
    output: {
      file: path.resolve(__dirname, 'packages/utils/dist/index.mjs'),
      format: 'es',
    },
    external, // 外部依赖，不会与你的库打包在一起。
    plugins: [
      // commonjs(), // 安装完@babel/runtime-corejs3后，build会报错，得安装这个打包commonjs
      typescript({
        abortOnError: false,
      }),
      // resolve({
      //   extensions: ['.ts'],
      // }),
      babel({
        exclude: 'node_modules/**', // 只编译我们的源代码
        extensions: ['.ts'],
        plugins: [
          [
            '@babel/plugin-transform-runtime',
            // { version: babelRuntimeVersion, useESModules: true },
            {
              absoluteRuntime: false, // boolean或者string，默认为false。
              // corejs: 3, // false, 2,3或{ version: 2 | 3, proposals: boolean }, 默认为false
              helpers: true, // boolean, 默认为true.切换内联的 Babel 助手（classCallCheck,extends等）是否替换为对 的调用moduleName
              regenerator: true, // 切换生成器函数是否转换为使用不污染全局范围的再生器运行时。默认为true
              version: babelRuntimeVersion,
            },
          ],
        ],
        babelHelpers: 'runtime', // "bundled" | "runtime" | "inline" | "external" | undefined
      }),
    ],
    // output: [
    //   {
    //     file: path.join(output, 'index.esm.js'),
    //     // amd/cjs/esm/iife/umd/system
    //     format: 'esm', // 将软件包保存为 ES 模块文件，在现代浏览器中可以通过 <script type=module> 标签引入
    //     // name: pkg.name,
    //     // exports: 'auto',
    //   },
    //   // {
    //   //   file: path.join(output, 'index.cjs'),
    //   //   format: 'cjs', // CommonJS，适用于 Node 和 Browserify/Webpack
    //   //   // name: pkg.name,
    //   //   exports: 'auto',
    //   // },
    //   // {
    //   //   file: path.join(output, 'index.amd.js'),
    //   //   format: 'amd', // 异步模块定义，用于像RequireJS这样的模块加载器
    //   //   // name: pkg.name,
    //   //   exports: 'auto',
    //   // },
    // ],
  },
]);
