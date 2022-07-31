# 简介

billd's monorepo，目前提供了：utils、hooks、components 三个库

# 安装

> 以@huangshuisheng/utils 这个包为例：

```sh
import { isBrowser } from '@huangshuisheng/utils';
```

# 使用

> 尚未发布 1.0 版本，api 可能会随时发生变化，请勿用于生产环境！

```ts
import { isBrowser } from '@huangshuisheng/utils';

console.log(isBrowser());
```

# 更新 ci 版本号

> [https://docs.npmjs.com/cli/v8/commands/npm-version](https://docs.npmjs.com/cli/v8/commands/npm-version)

```sh
npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease | from-git]

alias: verison
```

# 调试 packages 里所有的包

```sh
pnpm run dev
```

# 更新 packages 里所有的包

> 请先更新 ci 版本号，然后再执行该命令

```sh
pnpm run update
```

# 构建 packages 里所有的包

```sh
pnpm run build
```

# 发布 packages 里所有的包

```sh
pnpm run publish
```

# 扩展 packages 里的包

假设我要给 monorepo 新增一个 vue3hooks 包：

1. 在 packages 目录新建一个 vue3hooks 文件夹
2. 在 vue3hooks 新建一个 index.ts 文件
3. 在 vue3hooks 新建一个 package.json 文件，name 字段填你要发布到 npm 的包名，如@huangshuisheng/vue3hooks
4. 在 vue3hooks 新建一个 README.md 文件
5. 在 meta/packages.ts 文件新增该包的信息
6. 执行 pnpm run build && pnpm run update && pnpm run publish
