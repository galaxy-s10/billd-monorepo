import path from 'path';

import { DEFAULT_EXTENSIONS } from '@babel/core';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import { defineConfig } from 'rollup';
import { RollupOptions } from 'rollup';
import { OutputOptions } from 'rollup';
import dtsPlugin from 'rollup-plugin-dts';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

import { packages } from '../meta/packages';
import pkg from '../package.json';
import { toCamel } from '../packages/utils';

const external = [...Object.keys(pkg.dependencies || {})].map((name) =>
  RegExp(`^${name}($|/)`)
);

const configs: RollupOptions[] = [];

const umdConfig: RollupOptions[] = [];
const dtsConfig: RollupOptions[] = [];

Object.values(packages).forEach(({ name, esm, cjs, umd, dts }) => {
  const input = path.resolve(__dirname, `packages/${name}/index.ts`);
  const output: OutputOptions[] = [];
  const plugins = [
    /**
     * @babel/plugin-transform-runtime使用corejs:3（即@babel/runtime-corejs3），
     * 而@babel/runtime-corejs3源码是使用commonjs规范写的，因此需要添加@rollup/plugin-commonjs插件
     * 让rollup支持commonjs 规范，识别 commonjs 规范的依赖。
     */
    commonjs(),
    nodeResolve(), // 配合@rollup/plugin-commonjs解析第三方模块
    // dts(),
    typescript({
      abortOnError: false,
    }),
  ];

  if (esm !== false) {
    output.push({
      file: path.resolve(__dirname, `packages/${name}/dist/index.mjs`),
      format: 'esm',
    });
  }

  if (cjs !== false) {
    output.push({
      file: path.resolve(__dirname, `packages/${name}/dist/index.cjs`),
      format: 'commonjs',
    });
  }

  if (umd !== false) {
    const umdConfigPlugins = [
      ...plugins,
      babel({
        exclude: 'node_modules/**', // 只编译我们的源代码
        extensions: ['.ts'],
        /**
         * 这里设置plugins会覆盖babel.config.js的plugins，
         * 因此不设置这里的plugins，让它读取babel.config.js的plugins
         */
        plugins: [
          [
            '@babel/plugin-transform-runtime',
            {
              corejs: 3,
              helpers: false,
              regenerator: true,
            },
          ],
        ],
        babelHelpers: 'bundled', // "bundled" | "runtime" | "inline" | "external" | undefined
      }),
    ];
    umdConfig.push({
      input,
      output: {
        file: path.resolve(__dirname, `packages/${name}/dist/index.js`),
        format: 'umd',
        name: toCamel(`Billd-${name}`),
      },
      plugins: [...umdConfigPlugins],
    });
    umdConfig.push({
      input,
      output: {
        file: path.resolve(__dirname, `packages/${name}/dist/index.min.js`),
        format: 'umd',
        name: toCamel(`Billd-${name}`),
      },
      plugins: [
        ...umdConfigPlugins,
        terser({
          compress: {
            pure_getters: true,
            unsafe: true,
            unsafe_comps: true,
          },
        }),
      ],
    });
  }

  if (dts !== false) {
    dtsConfig.push({
      input,
      output: {
        file: path.resolve(__dirname, `packages/${name}/dist/index.d.ts`),
        name: toCamel(`Billd-${name}`),
      },
      plugins: [dtsPlugin()],
    });
  }

  configs.push({
    input,
    output,
    external,
    plugins: [
      ...plugins,
      babel({
        exclude: 'node_modules/**', // 只编译我们的源代码
        extensions: ['.ts'],
        /**
         * 这里设置plugins会覆盖babel.config.js的plugins，
         * 因此不设置这里的plugins，让它读取babel.config.js的plugins
         */
        // plugins: [],
        /**
         * babelHelpers和@babel/plugin-transform-runtime的helpers属性相关，
         * 如果babelHelpers设置成runtime，@babel/plugin-transform-runtime的helpers得设置true！
         */
        babelHelpers: 'runtime', // "bundled" | "runtime" | "inline" | "external" | undefined
      }),
    ],
  });
});

export default defineConfig([...configs, ...umdConfig, ...dtsConfig]);
// export default defineConfig([
//   {
//     input: path.resolve(__dirname, `packages/utils/index.ts`),
//     output: { file: path.resolve(__dirname, `packages/utils/dist/index.js`) },
//     external,
//     plugins: [
//       // commonjs(), // 安装完@babel/runtime-corejs3后，build会报错，得安装这个打包commonjs
//       typescript({
//         abortOnError: false,
//       }),
//       babel({
//         exclude: 'node_modules/**', // 只编译我们的源代码
//         extensions: ['.ts'],
//         /**
//          * 这里设置plugins会覆盖babel.config.js的plugins，
//          * 因此不设置这里的plugins，让它读取babel.config.js的plugins
//          */
//         // plugins: [],
//         /**
//          * babelHelpers和@babel/plugin-transform-runtime的helpers属性相关，
//          * 如果babelHelpers设置成runtime，@babel/plugin-transform-runtime的helpers得设置true！
//          */
//         babelHelpers: 'runtime', // "bundled" | "runtime" | "inline" | "external" | undefined
//       }),
//     ],
//   },
// ]);
