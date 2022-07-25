import path from 'path';

import { readJSONSync, writeJSON } from 'fs-extra';

import { packages } from '../meta/packages';
import { commandExec } from './utils';

export const DIR_ROOT = path.resolve(__dirname, '..');
export const DIR_PACKAGES = path.resolve(__dirname, '../packages');

// 将packages里面的包的package.json的version
const updatePackageJSON = async () => {
  const { version, description, author } = readJSONSync('package.json');
  console.log(version, 22);
  for (const { name, description, author } of packages) {
    const packageDir = path.join(DIR_PACKAGES, name);
    const packageJSONPATH = path.join(packageDir, 'package.json');
    const packageJSON = readJSONSync(packageJSONPATH);

    packageJSON.version = version;
    packageJSON.description = description || packageJSON.description;
    packageJSON.author = author || 'galaxy-s10 <https://github.com/galaxy-s10>';
    packageJSON.bugs = {
      url: 'https://github.com/galaxy-s10/billd-use/issues',
    };
    packageJSON.homepage = 'http://project.hsslive.cn/billd-use';
    packageJSON.repository = {
      type: 'git',
      url: 'https://github.com/galaxy-s10/billd-use',
      directory: `packages/${name}`,
    };
    packageJSON.main = './index.cjs';
    packageJSON.types = './index.d.ts';
    packageJSON.module = './index.mjs';
    writeJSON(packageJSONPATH, packageJSON, { spaces: 2 });
  }
  console.log(version);
};

(async () => {
  updatePackageJSON();
})();
