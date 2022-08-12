import path from 'path';

import { readJSONSync, writeJSONSync } from 'fs-extra';

import { packages } from '../meta/packages';

export const DIR_ROOT = path.resolve(__dirname, '..');
export const DIR_PACKAGES = path.resolve(__dirname, '../packages');

/**
 * 1.将项目根目录的package.json的version更新到packages/*里的package.json的version
 * 2.更新packages/*里的package.json，优先使用packages/*里的package.json字段，缺省的话
 * 使用项目根目录的package.json字段
 */
export const updatePackageJSON = () => {
  const pkg = readJSONSync(path.resolve(__dirname, '../package.json')); // 项目根目录的package.json
  Object.values(packages).forEach(({ name, description, author }) => {
    const packageDir = path.join(DIR_PACKAGES, name);
    const packageJSONPATH = path.join(packageDir, 'package.json'); // 项目packages/*里面的package.json
    const packageJSON = readJSONSync(packageJSONPATH);
    packageJSON.version = pkg.version;
    packageJSON.description = description || packageJSON.description;
    packageJSON.author = author || 'shuisheng <https://github.com/galaxy-s10>';
    packageJSON.bugs = {
      url: 'https://github.com/galaxy-s10/billd-monorepo/issues',
    };
    packageJSON.homepage = 'http://project.hsslive.cn/billd-monorepo';
    packageJSON.repository = {
      type: 'git',
      url: 'https://github.com/galaxy-s10/billd-monorepo',
      directory: `packages/${name}`,
    };
    packageJSON.main = './index.cjs';
    packageJSON.module = './index.mjs';
    writeJSONSync(packageJSONPATH, packageJSON, { spaces: 2 });
  });
};
