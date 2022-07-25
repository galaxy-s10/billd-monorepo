// child_process的exec是对child_process.spawn的封装，spawn更为底层
import { spawn, execSync } from 'child_process';

/**
 * @description: 执行终端命令相关的代码
 * @param {array} args
 * @return {*}
 */
export const commandSpawn = (...args) => {
  return new Promise((resolve) => {
    // @ts-ignore
    const childProcess = spawn(...args);
    // @ts-ignore
    childProcess.stdout.pipe(process.stdout);
    // @ts-ignore
    childProcess.stderr.pipe(process.stderr);
    // @ts-ignore
    childProcess.on('close', () => {
      // @ts-ignore
      resolve();
    });
  });
};

/**
 * @description: 执行终端命令相关的代码
 * @param {*} str
 * @param {*} cwd
 * @return {*}
 */
// export const commandExec = (str: string, cwd: string) => {
//   console.log(str, cwd, 21);
//   return execa(str, {
//     cwd,
//     stdio: [2, 2, 2],
//   });
// };
/**
 * @description: 执行终端命令相关的代码
 * @param {*} str
 * @param {*} cwd
 * @return {*}
 */
export const commandExec = (str: string) => {
  return execSync(str);
};
