# multi-repo & mono-repo

两种代码风格仓库的管理风格

- multi-repo：把每个项目都分别用 git 托管
- mono-repo： 统一用一个 git 仓库管理所有的项目

## multi-repo

```js
// multi-repo
root
|── project-a
|   ├── ...
|   └── .git
├── project-b
|   ├── ...
|   └── git
├── project-c
|   ├── ...
|   └── .git
├── project-d
|   ├── ...
|   └── .git
...

```

从上面可以看出多个项目对应多个仓库，大多数工程，其实都是以 multi-repo 方式管理的

- 优势

  可以让各项目团队根据需要定制更适合自己的 workflow

- 不足

  - 难以对所有项目统一进行操作（git checkout / npm publish / npm run build）
  - 难以追踪依赖关系（a->b->c

## mono-repo

```js
// multi-repo

├── .git
├── lerna.json
├── package.json
├── packages
    ├── project-a
    |    ├── README.md
    |    ├── __tests__
    |    ├── lib
    |    └── package.json
    ├── project-b
    |    ├── README.md
    |    ├── __tests__
    |    ├── lib
    |    └── package.json
    ├── project-c
        ├── README.md
        ├── __tests__
        ├── lib
        └── package.json
```

从上面可以看出一个仓库管理多个项目

- 优势

  - 方便统一的操作各个项目
  - 利用工具，可以方便的追踪项目间的依赖关系

- 不足
  - 代码库随着业务发展会非常巨大
  - 失去部分的灵活性（workflow 必须统一）
  - 强依赖于 monorepo 的管理工具

## mono-repo 的管理-lerna

为 js 生态下的 mono-repo 管理提供一站式的解决方案

### 目录结构

- 整体作为一个 Git 仓库，也是个 npm 包（私有）
- lerna.json 是整个 mmono-repo 的配置文件
- 每个真正的项目，平铺在 packages/中
- 整个项目可以统一管理所有依赖（也可以分别管理）

```js
// lerna
├── .git
├── lerna.json
├── package.json
├── packages
    ├── project-a
    |    ├── README.md
    |    ├── __tests__
    |    ├── lib
    |    └── package.json
    ├── project-b
    |    ├── README.md
    |    ├── __tests__
    |    ├── lib
    |    └── package.json
    ├── project-c
        ├── README.md
        ├── __tests__
        ├── lib
        └── package.json
```

### 用 lerna 管理项目的相关

1. 安装 lerna

```sh
# 全局安装lerna
npm i lerna -g
# 用lerna初始化一个项目
lerna init
```

初始化的目录结构

```json
- packages
  - lerna.json
  - package.json
```

lerna.json 文件中都有什么配置

```json
{
  // 配置$schema可以在vscode中，鼠标滑倒每个配置项时候，可以看每个配置项的介绍
  // 可以在https://www.schemastore.org/json/中网站查看知名项目的描述文件
  "$schema": "http://json.schemastore.org/lerna",
  "packages": ["packages/*"],
  "version": "independent" // 可以给各个项目发不同的版本
}
```

2. 添加项目依赖

我们为 pac-1、 pac-2、pac-3 添加依赖关系，我们制造这样一种依赖，pac-1 模块被 pac-2 依赖；pac-2 模块被 pac-3 模块依赖， 这时候就形成了 pac-1、 pac-2、pac-3 间接依赖关系。

```sh
# 制造依赖关系，对于内部项目的依赖，lerna会以软连接的形式，给它们相互软链接起来
lerna add pac-1 packages/pac-2
lerna add pac-2 packages/pac-3
```

如果我们给项目添加外部依赖，可能需要给每个项目 node_moudles 都添加，同一个依赖会安装很多次，这显然不合理，为了解决这个问题，leran 可以把依赖添加到项目根目录；`lerna clean`去清除每个项目中 node_modules 相同的依赖;用 `lerna bootstrap --hoist`重新安装依赖，

3. 发版

需要注意是的 lerna.json 配置为"version": "independent"时可以为每个包独立发不同的版本，如果"version":'0.0.0'是发同样的版本

```sh
lerna publish
```

4. 其他

可以用 lerna -h 查看全部指令

```sh
lerna  exec [cmd] [args...] # 执行每一个package.json你想指行的命令
lerna run <script> # 执行package.josn 中script配置的命令
lerna diff [pkgName] # 对比 文件变化
lerna changed # 查看文件变化

```

## mono-repo 的管理-pnpm

速度快、节省磁盘空间的软件包管理器

### 目录结构

![](/images/engineering/pnpm.jpg)

### 命令

pnpm 的指令跟 yarn 类似

```shell
# 初始化monorepo
pnpm init
# 安装所有依赖
pnpm install
# 添加某个依赖
pnpm add <pkg>
# 相关命令的执行
pnpm <cmd>

```

### workspace

在根目录下新建 `pnpm-workspace.yaml` 文件

```yaml
packages:
  # all packages in subdirs of packages/ and components/
  - 'packages/**'
```

建议去除每个子项目的共同依赖，比如 react ，lodash 等，然后统一放入顶层的 package.json 内

在顶层安装全局依赖 -w

```shell
	pnpm add -w lodash
	pnpm add -D -w typescript
```

默认情况下，为了节省时间和空间，pnpm 会默认不在子项目中软链接顶层安装的全局依赖，如需关闭这一行为（不推荐），可以在项目根目录的 .npmrc 配置：

```shell
shared-workspace-lockfile=false
```

### 过滤

--filter

```shell
pnpm --filter <package_selector> <command>
```

```shell
# 将 ui-vite-ray 安装到 docs-vite 中
# -r 表示只安装到子 package 中
# 这里的 ui-vite-ray docs-vite 都是package.json 中的name

pnpm i  ui-vite-ray -r --filter docs-vite
```

在安装后， docs-vite 中 ui-vite-ray 的位置会指向到 workspace ，这也是 monorepo 的精髓所在

![](/images/engineering/workspace.jpg)

::: tip
pnpm 支持 workspace 协议 workspace: 当使用此协议时，pnpm 将拒绝解析除本地 workspace 包含的 package 之外的任何内容。 因此，如果您设置为 "foo": "workspace:2.0.0" 时，安装将会失败，因为 "foo@2.0.0" 不存在于此 workspace 中
:::
