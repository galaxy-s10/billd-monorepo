import path from 'path';

import fs from 'fs-extra';

import { commandExec } from './utils';

// 构建目录
const releaseDir = path.resolve(__dirname, '../@huangshuisheng');
console.log(releaseDir);

// 清除构建目录
const clean = async () => {
  console.log('===cwd===', path.resolve(__dirname));
  await commandExec('pnpm run clean', path.resolve(__dirname, '../'));
};

// rollup打包
const rollupBundle = async () => {
  console.log('===cwd===', path.resolve(__dirname));
  await commandExec('pnpm run build:rollup', path.resolve(__dirname, '../'));
};

// 将packages里面的包的package.json和README.md复制到构建目录
const copyFile = async () => {};

(async () => {
  //
  await rollupBundle();
  await copyFile();
})();
