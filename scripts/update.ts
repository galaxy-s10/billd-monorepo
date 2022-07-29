import path from 'path';

import { readJSONSync, writeJSON } from 'fs-extra';

import { packages } from '../meta/packages';

export const DIR_ROOT = path.resolve(__dirname, '..');
export const DIR_PACKAGES = path.resolve(__dirname, '../packages');

/**
 * 1.将项目根目录的package.json的version更新到packages/*里的package.json的version
 * 2.更新packages/*里的package.json，优先使用packages/*里的package.json，缺省的话
 * 使用项目根目录的package.json的字段
 */
const updatePackageJSON = async () => {
  const { version } = readJSONSync('package.json'); // 项目根目录的package.json

  Object.values(packages).forEach(({ name, description, author }) => {
    const packageDir = path.join(DIR_PACKAGES, name);
    const packageJSONPATH = path.join(packageDir, 'package.json'); // 项目根目录的packages/*里面的package.json
    const packageJSON = readJSONSync(packageJSONPATH);

    packageJSON.version = version;
    packageJSON.description = description || packageJSON.description;
    packageJSON.author = author || 'shuisheng <https://github.com/galaxy-s10>';
    packageJSON.bugs = {
      url: 'https://github.com/galaxy-s10/billd-monorepo/issues',
    };
    packageJSON.homepage = 'https://github.com/galaxy-s10/billd-monorepo';
    packageJSON.repository = {
      type: 'git',
      url: 'https://github.com/galaxy-s10/billd-monorepo',
      directory: `packages/${name}`,
    };
    packageJSON.main = './index.cjs';
    packageJSON.module = './index.mjs';
    writeJSON(packageJSONPATH, packageJSON, { spaces: 2 });
  });
};

(async () => {
  updatePackageJSON();
})();
