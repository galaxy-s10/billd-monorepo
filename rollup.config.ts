import path from 'path';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { DEFAULT_EXTENSIONS } from '@babel/core';

const output = path.resolve(__dirname, './lib');
export default {
  input: path.resolve(__dirname, './src/main.ts'),
  // output: { file: path.resolve(__dirname, './lib/bundle.js'), format: 'cjs' },
  output: [
    {
      file: path.join(output, 'index.esm.js'),
      format: 'es',
      // name: pkg.name,
      exports: 'auto',
    },
    {
      file: path.join(output, 'index.js'),
      format: 'cjs',
      // name: pkg.name,
      exports: 'auto',
    },
  ],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**', // 只编译我们的源代码
      extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
    }),
  ],
};
