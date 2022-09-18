import { execSync } from 'child_process';
import path from 'path';

import { packages } from '../meta/packages';
import pkg from '../package.json';
import { chalkERROR, chalkSUCCESS } from './utils';

// 发布私有包需要添加--access public
const command = 'npm publish --access public';

// git push
execSync(`git push origin v${pkg.version}`, { stdio: 'inherit' });
execSync(`git push`, { stdio: 'inherit' });

Object.values(packages).forEach(({ name }) => {
  try {
    execSync(command, {
      stdio: 'inherit',
      cwd: path.resolve(__dirname, '../packages', name, 'dist'),
    });
    console.log(
      chalkSUCCESS(`发布@huangshuisheng/${name}@${pkg.version}成功！`)
    );
  } catch (error) {
    console.log(chalkERROR(`发布@huangshuisheng/${name}@${pkg.version}失败！`));
    console.log(error);
    console.log(chalkERROR(`发布@huangshuisheng/${name}@${pkg.version}失败！`));
  }
});
