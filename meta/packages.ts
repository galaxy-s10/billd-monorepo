// 这里的优先级比packages里面的package.json高，会覆盖package.json的值
export const packages = [
  {
    name: 'utils',
    description: "Billd's utils",
    author: 'shuisheng <https://github.com/galaxy-s10>',
    esm: true,
    cjs: true,
    umd: true,
  },
  {
    name: 'components',
    description: "Billd's components",
    author: 'shuisheng <https://github.com/galaxy-s10>',
    esm: true,
    cjs: true,
    umd: true,
  },
  {
    name: 'hooks',
    description: "Billd's hooks",
    author: 'shuisheng <https://github.com/galaxy-s10>',
    esm: true,
    cjs: true,
    umd: true,
  },
];
