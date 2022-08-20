# 简介

[billd's monorepo](https://github.com/galaxy-s10/billd-monorepo)，目前提供了：utils、hooks、components 三个库

# 文档

使用 [typedoc](https://typedoc.org/) 生成的文档：http://project.hsslive.cn/billd-monorepo/

# 安装

```sh
npm install '@huangshuisheng/utils';
npm install '@huangshuisheng/hooks';
npm install '@huangshuisheng/components';
```

# 使用

> 尚未发布 1.0 版本，api 可能会随时发生变化，请勿用于生产环境！具体用法请查看：

1. [@huangshuisheng/utils](https://github.com/galaxy-s10/billd-monorepo/blob/master/packages/utils/README.md)
2. [@huangshuisheng/components](https://github.com/galaxy-s10/billd-monorepo/blob/master/packages/components/README.md)
3. [@huangshuisheng/hooks](https://github.com/galaxy-s10/billd-monorepo/blob/master/packages/hooks/README.md)

# 调试

```sh
pnpm run dev
```

# 构建

```sh
pnpm run build
```

# 更新版本

> 操作的是 github

```sh
pnpm run release
```

# 发布版本

> 操作的是 npm

```sh
pnpm run publish
```

# 生成文档

```sh
pnpm run doc
```

# 扩展

假设我要给 monorepo 新增一个 vue3hooks 包：

1. 在根目录的 packages 目录新建一个 vue3hooks 文件夹
2. 在 vue3hooks 新建一个 index.ts 入口文件
3. 在 vue3hooks 新建一个 package.json 文件，name 字段填你要发布到 npm 的包名，如@huangshuisheng/vue3hooks
4. 在 vue3hooks 新建一个 README.md 文件
5. 在 meta/packages.ts 文件新增该包的信息
6. 在根目录的 typedoc.config.json 文件添加 vue3hooks 的入口文件
7. 执行 pnpm run build && pnpm run release, 最后: pnpm run publish
