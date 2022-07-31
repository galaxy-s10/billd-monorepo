import { execSync } from 'child_process';
import path from 'path';

import { packages } from '../meta/packages';
import { chalkSUCCESS } from './utils';

execSync('npm run build', { stdio: 'inherit' });
execSync('npm run update', { stdio: 'inherit' });

// 发布私有包需要添加--access public
const command = 'npm publish --access public';

Object.values(packages).forEach(({ name }) => {
  execSync(command, {
    stdio: 'inherit',
    cwd: path.resolve(__dirname, '../packages', name, 'dist'),
  });
  console.log(chalkSUCCESS(`Published @huangshuisheng/${name}`));
});
