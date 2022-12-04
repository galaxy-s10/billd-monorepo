<p align="center">
  <a href="http://project.hsslive.cn/billd-monorepo/">
    <img
      width="200"
      src="https://resource.hsslive.cn/image/1613141138717Billd.webp"
      alt="Billd-Monorepo logo"
    />
  </a>
</p>

<h1 align="center">
  Billd-Monorepo
</h1>

<p align="center">
  基于rollup + pnpm + esbuild搭建的Billd-Monorepo
</p>

<div align="center">
<a href="https://www.npmjs.com/package/@huangshuisheng/hooks"><img src="https://img.shields.io/npm/v/@huangshuisheng/hooks.svg" alt="Version"></a>
<a href="https://www.npmjs.com/package/@huangshuisheng/hooks"><img src="https://img.shields.io/npm/dw/@huangshuisheng/hooks.svg" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/@huangshuisheng/hooks"><img src="https://img.shields.io/npm/l/@huangshuisheng/hooks.svg" alt="License"></a>
</div>

# 简介

目前 Billd-Monorepo 提供了以下包：

| 包名                                                                                                       | 版本                                                                                                                        |
| ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| [@huangshuisheng/components](https://github.com/galaxy-s10/billd-monorepo/tree/master/packages/components) | [![npm](https://img.shields.io/npm/v/@huangshuisheng/components)](https://www.npmjs.com/package/@huangshuisheng/components) |
| [@huangshuisheng/hooks](https://github.com/galaxy-s10/billd-monorepo/tree/master/packages/hooks)           | [![npm](https://img.shields.io/npm/v/@huangshuisheng/hooks)](https://www.npmjs.com/package/@huangshuisheng/hooks)           |

> 线上文档：[http://project.hsslive.cn/billd-monorepo/](http://project.hsslive.cn/billd-monorepo/)

# 安装

```sh
npm install @huangshuisheng/hooks
npm install @huangshuisheng/components
```

# 使用

> 尚未发布 1.0 版本，api 可能会随时发生变化，请勿用于生产环境！

具体用法请查看文档：[http://project.hsslive.cn/billd-monorepo/](http://project.hsslive.cn/billd-monorepo/)

# 本地调试

> 本地调试不会构建 umd

```sh
pnpm run dev
```

# 本地构建

```sh
pnpm run build
```

> 该脚本内部会做以下事情：

1. 根据 meta/packages.ts，删除 packages 里对应的包的 dist
2. 根据 meta/packages.ts，打包 packages 里对应的包，生成 dist
3. 根据 meta/packages.ts，复制 packages 里对应的包的 package.json 和 README.md，以及项目根目录的 LICENSE 文件，复制到对应包的 dist

# 生成文档

> 使用 [typedoc](https://typedoc.org/) 生成，文档会生成在项目根目录的 doc 目录

```sh
pnpm run doc
```

# 如何发版

## 0.确保 git 工作区干净

即确保本地的修改已全部提交（git status 的时候会显示：`nothing to commit, working tree clean` ），否则会导致执行 `release:local` 脚本失败

## 1.执行本地发版脚本

```sh
pnpm run release:local
```

> 该脚本内部会做以下事情：

1. 根据用户选择的版本以及 meta/packages.ts，更新对应 packages 里的包的 package.json 的 version
2. 开始构建 packages 里的包
3. 对比当前版本与上个版本的差异，生成 changelog
4. 提交暂存区到本地仓库：git commit -m 'chore(release): v 当前版本'
5. 生成当前版本 tag：git tag v 当前版本

## 2.执行线上发版脚本

```sh
pnpm run release:online
```

> 该脚本内部会做以下事情：

1. 提交当前版本：git push
2. 提交当前版本 tag：git push origin v 当前版本
3. 根据 meta/packages.ts，发布 packages 里对应的包到 npm

# 如何扩展

假设我要给 monorepo 新增一个 vue3hooks 包：

1. 在项目根目录的 packages 目录新建一个 vue3hooks 文件夹
2. 在 packages/vue3hooks/ 新建一个 index.ts 入口文件
3. 在 packages/vue3hooks/ 新建一个 package.json 文件，name 字段填你要发布到 npm 的包名，如@huangshuisheng/vue3hooks
4. 在 packages/vue3hooks/ 新建一个 README.md 文件
5. 在 meta/packages.ts 文件新增该包的信息
6. 在项目根目录的 typedoc.config.json 文件添加 vue3hooks 的入口文件
7. 发布的话和上面的发版一样，但需要注意的是：新增的包的初始版本号，是跟随当前根目录的 package.json 的版本的。
