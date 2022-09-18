import { execSync } from 'child_process';
import path from 'path';

import { copyFileSync } from 'fs-extra';

import { packages } from '../meta/packages';
import { chalkERROR } from './utils';

// 项目的根目录路径
const rootDir = path.resolve(__dirname, '..');

// 项目根目录里要复制的文件
const FILES_COPY_ROOT = ['LICENSE'];

// 项目根目录下的package里的包里要复制的文件
const FILES_COPY_LOCAL = ['README.md', 'package.json'];

// 清除packages目录里面的包的dist
const clean = () => {
  execSync('pnpm run clean', { stdio: 'inherit' });
};

// rollup打包
const rollupBuild = () => {
  try {
    execSync('pnpm run build:rollup', { stdio: 'inherit' });
  } catch (error) {
    console.log(error);
  }
};

// 将packages里面的包的package.json和README.md复制到构建目录
const copyFile = () => {
  try {
    Object.values(packages).forEach(({ name }) => {
      const packageRoot = path.resolve(__dirname, '..', 'packages', name);
      const packageDist = path.resolve(packageRoot, 'dist');
      Object.values(FILES_COPY_LOCAL).forEach((file) => {
        copyFileSync(
          path.join(packageRoot, file),
          path.join(packageDist, file)
        );
      });
      Object.values(FILES_COPY_ROOT).forEach((file) => {
        copyFileSync(path.join(rootDir, file), path.join(packageDist, file));
      });
    });
  } catch (error) {
    console.log(error);
  }
};

(() => {
  try {
    clean();
    rollupBuild();
    copyFile();
  } catch (error) {
    console.log(chalkERROR(`！！！本地构建失败！！！`));
    console.log(error);
    console.log(chalkERROR(`！！！本地构建失败！！！`));
  }
})();
