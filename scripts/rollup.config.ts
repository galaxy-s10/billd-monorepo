import path from 'path';

import { DEFAULT_EXTENSIONS } from '@babel/core';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import { defineConfig } from 'rollup';
import dtsPlugin from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';

import { packages } from '../meta/packages';
import pkg from '../package.json';

import type { OutputOptions, RollupOptions } from 'rollup';

const watch = process.argv.includes('--watch');

// 这里的external只是根目录的package.json里的依赖，不包括package目录里的package.json
// const external = [];
const allExternal = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.devDependencies || {}),
].map((name) => RegExp(`^${name}($|/)`));

// 全局模块，用于umd/iife包
const globals = {
  // 'element-ui': 'ELEMENT',
};

// my-name转化为MyName
export const toPascalCase = (input: string): string => {
  input.replace(input[0], input[0].toUpperCase());
  return input.replace(/-(\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });
};

// esbuild替代了rollup-plugin-typescript2、@rollup/plugin-typescript、rollup-plugin-terser
const esbuildPlugin = (prod = false) =>
  esbuild({
    minify: prod ? true : false,
    // sourceMap: true, // 默认就是true
  });

const configs: RollupOptions[] = [];
const umdConfig: RollupOptions[] = [];
const dtsConfig: RollupOptions[] = [];
const babelRuntimeVersion = pkg.dependencies['@babel/runtime-corejs3'].replace(
  /^[^0-9]*/,
  ''
);

Object.values(packages).forEach(({ name, esm, cjs, umd, dts }) => {
  const input = path.resolve(__dirname, `packages/${name}/index.ts`);
  const output: OutputOptions[] = [];
  const plugins = [
    /**
     * @rollup/plugin-commonjs插件主要是将commonjs转换为esm
     * @rollup/plugin-commonjs一般和@rollup/plugin-node-resolve一起使用
     * @babel/plugin-transform-runtime使用corejs:3（即@babel/runtime-corejs3），
     * 而@babel/runtime-corejs3源码是使用commonjs规范写的，因此需要添加@rollup/plugin-commonjs插件
     * 让rollup支持commonjs 规范，识别 commonjs 规范的依赖。
     * 当前的billd-monorepo里面的源码基本都并没有依赖第三方的包，而且也没有将polyfill的代码内置，
     * 因此其实不需要用@rollup/plugin-commonjs插件
     */
    commonjs(),
    /**
     * @rollup/plugin-node-resolve插件主要是将node_modules里的东西打包进来
     * @rollup/plugin-node-resolve一般和@rollup/plugin-commonjs一起使用
     * (!) Unresolved dependencies这个报错和@rollup/plugin-node-resolve插件有关
     * 不使用@rollup/plugin-node-resolve插件的话，import { Button } from 'element-ui';就不会
     * 把引入的node_modules包里的element-ui的Button的代码引进来，而是会原封不动的把
     * import { Button } from 'element-ui';这行代码放到打包的代码里面
     * 如果我们不使用@rollup/plugin-node-resolve插件，那么在打包的时候，如果我们代码里
     * 引用到了第三方包的内容（假设就是element-ui），我们需要将这些第三方包加到依赖里面，否则别人在安装使用我们的包的时候，
     * 可能会提示找不到element-ui（只是可能，因为如果当前的依赖是都提升到全局的，可能别的第三方包依赖了element-ui，
     * 就不会报错）
     * 如果我们使用了@rollup/plugin-node-resolve插件，因为这时候会将我们引用的node_modules里的内容都打包进去，所以我们
     * 不把第三方包加到依赖里面，一般也不会报错，但是！这样做也有缺点，那就是可能会造成打包的资源，比如两个文件引入了两次Button，
     * 在打包cjs和esm的时候，会将Button的代码都分包打包到那两个文件里面，但实际上的话，这个Button其实是可以共享的，只打包一次即可，
     * 因此，通常的做法应该是，在打包的时候，不使用@rollup/plugin-node-resolve插件，将第三方包添加到依赖里，由上层的应用去打包
     * 总而言之，将项目用到的第三方包合理的添加到依赖里面，准没错。
     * 当前的billd-monorepo里面的源码基本都并没有依赖第三方的包，因此也不需要用@rollup/plugin-node-resolve插件
     */
    nodeResolve(),
    json(),
  ];

  // WARN 尽量加上dtsPlugin，因为esbuild不会抛出ts类型错误，但是dts插件会抛出ts类型错误
  if (dts !== false) {
    dtsConfig.push({
      input,
      output: {
        file: path.resolve(__dirname, `packages/${name}/dist/index.d.ts`),
        name: toPascalCase(`Billd-${name}`),
      },
      plugins: [dtsPlugin()],
    });
  }

  if (esm !== false) {
    output.push({
      // sourcemap: true, // 开启sourcemap比较耗费性能
      file: path.resolve(__dirname, `packages/${name}/dist/index.mjs`),
      format: 'esm',
    });
  }

  if (cjs !== false) {
    output.push({
      // sourcemap: true, // 开启sourcemap比较耗费性能
      file: path.resolve(__dirname, `packages/${name}/dist/index.cjs`),
      format: 'cjs',
      /**
       * exports默认值是auto，可选：default、none。https://rollupjs.org/guide/zh/#exports
       * 如果我们源代码默认导出和具名导出一起使用，编译的时候会报警告(!) Mixing named and default exports
       * 设置exports: 'named'就不会报警告了（实际上只是不会报警告了，设不设置named对实际打包的结果都没影响）
       * 如果我们源代码没有默认导出和具名导出一起使用，但是设置了exports: 'named'，会生成：exports["default"] = BilldUtils;
       * 别人通过cjs导入的话，就得const BilldUtils = require("billd-utils").default;才能拿到默认导出；如果不使用exports: 'named'，
       * 默认会生成：module.exports = BilldUtils;别人通过cjs导入的话，就正常的const BilldUtils = require("billd-utils");即可
       */
      exports: 'named',
    });
  }

  if (umd !== false && !watch) {
    const config = (prod = false): RollupOptions => {
      return {
        input,
        output: {
          // sourcemap: true, // 开启sourcemap比较耗费性能
          file: path.resolve(
            __dirname,
            prod
              ? `packages/${name}/dist/index.min.js`
              : `packages/${name}/dist/index.js`
          ),
          format: 'umd',
          /**
           * exports默认值是auto，可选：default、none。https://rollupjs.org/guide/zh/#exports
           * 如果我们源代码默认导出和具名导出一起使用，编译的时候会报警告(!) Mixing named and default exports
           * 设置exports: 'named'就不会报警告了（实际上只是不会报警告了，设不设置named对实际打包的结果都没影响）
           * 如果我们源代码没有默认导出和具名导出一起使用，但是设置了exports: 'named'，会生成：exports["default"] = BilldUtils;
           * 别人通过cjs导入的话，就得const BilldUtils = require("billd-utils").default;才能拿到默认导出；如果不使用exports: 'named'，
           * 默认会生成：module.exports = BilldUtils;别人通过cjs导入的话，就正常的const BilldUtils = require("billd-utils");即可
           */
          exports: 'named',
          globals,
          name: toPascalCase(`Billd-${name}`),
        },
        plugins: [
          ...plugins,
          esbuildPlugin(prod),
          babel({
            exclude: 'node_modules/**', // 只编译我们的源代码
            extensions: [...DEFAULT_EXTENSIONS, '.ts'],
            /**
             * 这里设置plugins会覆盖babel.config.js的plugins
             */
            plugins: [
              [
                /**
                 * @babel/plugin-transform-runtime
                 * useBuiltIns和polyfill选项在 v7 中被删除，只是将其设为默认值。
                 */
                '@babel/plugin-transform-runtime',
                {
                  // absoluteRuntime: false, // boolean或者string，默认为false。

                  /**
                   * corejs:false, 2,3或{ version: 2 | 3, proposals: boolean }, 默认为false
                   * 设置对应值需要安装对应的包：
                   * false	npm install --save @babel/runtime
                   * 2	npm install --save @babel/runtime-corejs2
                   * 3	npm install --save @babel/runtime-corejs3
                   */
                  corejs: 3,

                  /**
                   * helpers: boolean, 默认true。在纯babel的情况下：
                   * 如果是true，就会把需要他runtime包给引进来，如：import _defineProperty from "@babel/runtime/helpers/defineProperty"
                   * 如果是false，就会把需要的runtime包里面的代码给嵌进bundle里，如function _defineProperty(){}
                   * 设置false的话，会导致同一个runtime包里面的代码被很多文件设置，产生冗余的代码。而且因为虽然是同一
                   * 份runtime包里面的代码，但是他们在不同的文件（模块）里面，都有自己的作用域，因此在使用类似webpack之类的
                   * 打包工具打包的时候，不会做优化。因此推荐设置true，这样可以通过静态分析的手段进行打包，减少打包后的代码体积。
                   */
                  // helpers: true, // 当helpers设置true的时候，babelHelpers需要设置为runtime
                  helpers: false, // 当helpers设置false的时候，babelHelpers需要设置为bundled
                  version: babelRuntimeVersion,
                },
              ],
            ],
            /**
             * babelHelpers,建议显式配置此选项（即使使用其默认值）
             * runtime: 您应该使用此功能，尤其是在使用汇总构建库时，它结合external使用
             * bundled: 如果您希望生成的捆绑包包含这些帮助程序（每个最多一份），您应该使用它。特别是在捆绑应用程序代码时很有用
             * 如果babelHelpers设置成bundled，@babel/plugin-transform-runtime的helpers得设置false！
             * 如果babelHelpers设置成runtime，@babel/plugin-transform-runtime的helpers得设置true！
             * 在打包esm和cjs时,使用runtime,并且配合external;在打包umd时,使用bundled,并且不要用external,如果打包umd时使
             * 用了runtime但是没有配置external，会导致打包重复的polyfill，虽然打包的时候不报错，但是引入包使用的时候会报错
             */
            babelHelpers: 'bundled', // 默认bundled,可选:"bundled" | "runtime" | "inline" | "external" | undefined
            // babelHelpers: 'runtime', // 默认bundled,可选:"bundled" | "runtime" | "inline" | "external" | undefined
          }),
        ],
      };
    };
    umdConfig.push(config());
    umdConfig.push(config(true));
  }

  configs.push({
    input,
    output,
    external: allExternal,
    plugins: [
      ...plugins,
      esbuildPlugin(false),
      babel({
        exclude: 'node_modules/**', // 只编译我们的源代码，最好加上它，否则打包umd可能会报错
        extensions: [...DEFAULT_EXTENSIONS, '.ts'],
        // 这里面的plugins如果和babel.config.js里的plugins冲突，
        // 会执行这里的plugins，不会执行babel.config.js里的plugins
        plugins: [
          [
            /**
             * @babel/plugin-transform-runtime
             * useBuiltIns和polyfill选项在 v7 中被删除，只是将其设为默认值。
             */
            '@babel/plugin-transform-runtime',
            {
              // absoluteRuntime: false, // boolean或者string，默认为false。
              /**
               * corejs:false, 2,3或{ version: 2 | 3, proposals: boolean }, 默认为false
               * 设置对应值需要安装对应的包：
               * false	npm install --save @babel/runtime
               * 2	npm install --save @babel/runtime-corejs2
               * 3	npm install --save @babel/runtime-corejs3
               */
              corejs: 3,
              /**
               * helpers: boolean, 默认true。在纯babel的情况下：
               * 如果是true，就会把需要他runtime包给引进来，如：import _defineProperty from "@babel/runtime/helpers/defineProperty"
               * 如果是false，就会把需要的runtime包里面的代码给嵌进bundle里，如function _defineProperty(){}
               * 设置false的话，会导致同一个runtime包里面的代码被很多文件设置，产生冗余的代码。而且因为虽然是同一
               * 份runtime包里面的代码，但是他们在不同的文件（模块）里面，都有自己的作用域，因此在使用类似webpack之类的
               * 打包工具打包的时候，不会做优化。因此推荐设置true，这样可以通过静态分析的手段进行打包，减少打包后的代码体积。
               */
              helpers: true, // 当helpers设置true的时候，babelHelpers需要设置为runtime
              // helpers: false, // 当helpers设置false的时候，babelHelpers需要设置为bundled
              // regenerator: true, // 切换生成器函数是否转换为使用不污染全局范围的再生器运行时。默认为true
              version: babelRuntimeVersion,
            },
          ],
        ],
        /**
         * babelHelpers,建议显式配置此选项（即使使用其默认值）
         * runtime: 您应该使用此功能，尤其是在使用汇总构建库时，它结合external使用
         * bundled: 如果您希望生成的捆绑包包含这些帮助程序（每个最多一份），您应该使用它。特别是在捆绑应用程序代码时很有用
         * 如果babelHelpers设置成bundled，@babel/plugin-transform-runtime的helpers得设置false！
         * 如果babelHelpers设置成runtime，@babel/plugin-transform-runtime的helpers得设置true！
         * 在打包esm和cjs时,使用runtime,并且配合external;在打包umd时,使用bundled,并且不要用external,如果打包umd时使
         * 用了runtime但是没有配置external，会导致打包重复的polyfill，虽然打包的时候不报错，但是引入包使用的时候会报错
         */
        // babelHelpers: 'bundled', // 默认bundled,可选:"bundled" | "runtime" | "inline" | "external" | undefined
        babelHelpers: 'runtime', // 默认bundled,可选:"bundled" | "runtime" | "inline" | "external" | undefined
      }),
    ],
  });
});

export default defineConfig([...configs, ...umdConfig, ...dtsConfig]);
