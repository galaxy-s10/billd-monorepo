import { execSync } from 'child_process';
import path from 'path';

import { copyFileSync } from 'fs-extra';

import { packages } from '../meta/packages';

// 清除packages目录里面的包的dist
const clean = async () => {
  await execSync('pnpm run clean');
};

// rollup打包
const rollupBuild = async () => {
  try {
    execSync('pnpm run build:rollup');
  } catch (error) {
    console.log(error);
  }
};

// 项目的根目录路径
const rootDir = path.resolve(__dirname, '..');

// 项目根目录里要复制的文件
const FILES_COPY_ROOT = ['LICENSE'];

// 项目根目录下的package里的包里要复制的文件
const FILES_COPY_LOCAL = ['README.md', 'package.json'];

// 将packages里面的包的package.json和README.md复制到构建目录
const copyFile = async () => {
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

(async () => {
  await clean();
  await rollupBuild();
  await copyFile();
})();
