import path from 'path';

import { copyFileSync } from 'fs-extra';

import { packages } from '../meta/packages';
import { commandExec } from './utils';

// 清除packages目录里面的包的dist
const clean = async () => {
  await commandExec('pnpm run clean');
};

// rollup打包
const rollupBundle = async () => {
  try {
    commandExec('pnpm run build:rollup');
  } catch (error) {
    console.log(error);
  }
};

// 将packages里面的包的package.json和README.md复制到构建目录
const copyFile = async () => {
  try {
    for (const { name } of packages) {
      const packageRoot = path.resolve(__dirname, '..', 'packages', name);
      const packageDist = path.resolve(packageRoot, 'dist');
      // 复制README.md
      copyFileSync(
        path.join(packageRoot, 'README.md'),
        path.join(packageDist, 'README.md')
      );
      // 复制package.json
      copyFileSync(
        path.join(packageRoot, 'package.json'),
        path.join(packageDist, 'package.json')
      );
    }
  } catch (error) {
    console.log(error);
  }
  // 复制package.json
};

(async () => {
  await clean();
  await rollupBundle();
  await copyFile();
})();
