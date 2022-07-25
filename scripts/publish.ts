import { execSync } from 'child_process';
import path from 'path';

import { packages } from '../meta/packages';

execSync('npm run build', { stdio: 'inherit' });

const command = 'npm publish';

for (const { name } of packages) {
  execSync(command, {
    stdio: 'inherit',
    cwd: path.join('packages', name, 'dist'),
  });
  console.log(`Published @huangshuisheng/${name}`);
}
