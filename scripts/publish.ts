import { execSync } from 'child_process';
import path from 'path';

import { packages } from '../meta/packages';
import pkg from '../package.json';
import { chalkSUCCESS } from './utils';

// 发布私有包需要添加--access public
const command = 'npm publish --access public';

// git push
execSync(`git push origin v${pkg.version}`, { stdio: 'inherit' });
execSync(`git push`, { stdio: 'inherit' });

Object.values(packages).forEach(({ name }) => {
  execSync(command, {
    stdio: 'inherit',
    cwd: path.resolve(__dirname, '../packages', name, 'dist'),
  });
  console.log(chalkSUCCESS(`发布@huangshuisheng/${name}@${pkg.version}成功！`));
});
