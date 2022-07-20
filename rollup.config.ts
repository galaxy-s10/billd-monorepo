import path from 'path';

import { DEFAULT_EXTENSIONS } from '@babel/core';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

const output = path.resolve(__dirname, './lib');
export default {
  input: path.resolve(__dirname, './src/main.ts'),
  // output: { file: path.resolve(__dirname, './lib/bundle.js'), format: 'cjs' },
  output: [
    {
      file: path.join(output, 'index.esm.js'),
      // amd/cjs/esm/iife/umd/system
      format: 'esm', // 将软件包保存为 ES 模块文件，在现代浏览器中可以通过 <script type=module> 标签引入
      // name: pkg.name,
      exports: 'auto',
    },
    {
      file: path.join(output, 'index.cjs'),
      format: 'cjs', // CommonJS，适用于 Node 和 Browserify/Webpack
      // name: pkg.name,
      exports: 'auto',
    },
    {
      file: path.join(output, 'index.amd.js'),
      format: 'amd', // 异步模块定义，用于像RequireJS这样的模块加载器
      // name: pkg.name,
      exports: 'auto',
    },
  ],
  plugins: [
    typescript(),
    resolve(),
    babel({
      exclude: 'node_modules/**', // 只编译我们的源代码
      extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
      /**
       * https://github.com/rollup/plugins/tree/master/packages/babel#babelhelpers
       * babelHelpers和babel.config.js里面的@babel/plugin-transform-runtime的helpers相关
       * 'runtime'- 你应该使用它，尤其是在使用 Rollup 构建库时。
       * 它必须结合使用，@babel/plugin-transform-runtime并且您还应该将其指定@babel/runtime为包的依赖项。
       * @babel/runtime在捆绑cjs&es格式时，不要忘记告诉 Rollup 将从模块中导入的帮助程序视为外部依赖项。
       * 这可以通过正则表达式 ( external: [/@babel\/runtime/]) 或函数 ( external: id => id.includes('@babel/runtime')) 来完成。
       * 重要的是不仅要指定external: ['@babel/runtime']，因为帮助程序是从嵌套路径（例如@babel/runtime/helpers/get）导入的，
       * 并且Rollup 只会排除与字符串完全匹配的模块。
       */
      babelHelpers: 'runtime',
    }),
  ],
};
