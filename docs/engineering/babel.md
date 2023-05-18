# babel

## 1 介绍

#### babel 是什么 ？

Babel 是一个 JavaScript 编译器

- 语法转换 将 es6+ 转换为 es5

```js
let a = 1;
// var a = 1;
const sum = (a, b) => a + b;
// var sum = function sum(a, b) {
//   return a + b;
// };
```

- polyfill（在目标环境中添加缺失的特性）

```js
// 保证在老的环境中能使用新api
Promise.resolve(1).then((res) => {
  console.log(res);
});
```

- 源码转换

比如 去除 TypeScript 代码中的类型标识

```shell
npm i @babel/preset-typescript  -D
```

```js
function fn(n: number): number {
  return n + n;
}
// ------transformation------
function fn(n) {
  return n + n;
}
```

#### :strawberry: babel 工作原理 ？

`parsing-transforming-generating（解析-转换-生成）`

- 解析

  将代码解析为 `AST`，babel 通过 `babylon` 实现，解析过程分为`词法分析`和`语法分析`

1. 词法分析 （源代码 -> Token 序列）

`将整个代码字符串分割成最小语法单元数组，也就是一个个的标识Tokens（type 和 value )。`

```js
[
  {
    type: 'Keyword', // 关键词
    value: 'var',
  },
  {
    type: 'Identifier', // 标识符
    value: 'a',
  },
  {
    type: 'Punctuator', // 标点符号
    value: '=',
  },
  {
    type: 'Numeric', // 数字
    value: '1',
  },
  ...
];
```

2. 语法分析 （Token 序列 -> 抽象语法树 AST）

```js
{
  // 表示是一段程序代码
  "type": "Program",
  // 代码的具体内容
  "body": [
    {
      // 表示这个内容块是干什么的
      "type": "VariableDeclaration",
      // 装变量内容的块
      "declarations": [
        {
          // 声明的类型是个变量
          "type": "VariableDeclarator",
          // 表示变量名
          "id": {
            "type": "Identifier",
            "name": "a"
          },
          // 表示为这个变量设置的初值
          "init": {
            "type": "Literal",
            "value": 1,
            "raw": "1"
          }
        }
      ],
      "kind": "var"
    }
  ],
  // 表示语言的种类
  "sourceType": "script"
}
```

- 转换

将 AST 通过 `babel-traverse` 进行深度遍历，在此过程中对节点进行添加、更新及移除

- 生成

将转换后的 AST 通过 `babel-generator` 再转换成 js 代码，过程是深度遍历整个 AST，然后构建可以表示转换后代码的字符串

[AST 在线生成](https://astexplorer.net/)

#### preset / plugin

- preset 预设

可以被看作是一组 Babel 插件，处理相关语法

官方 preset

1. @babel/preset-env for compiling ES2015+ syntax 代指最新的标准
2. @babel/preset-typescript for TypeScript
3. @babel/preset-react for React
4. @babel/preset-flow for Flow

`执行顺序`

1. preset 在 plugin 之后执行
2. preset 之间从后往前依次执行

```js
// 执行顺序 c->b->a，这个设计babel文档中说是历史原因造成的
{
    "preset":[
        "a","b","c"
    ]
}
```

...

- plugin 插件

babel 本身不会对代码做任何操作，所有功能都靠插件实现

1. @bable/plugin-transform-arrow-functions
2. @babel/plugin-transform-for-of
3. @babel/plugin-transform-classes

`执行顺序`

1. plugin 在 preset 之前执行
2. plugin 之间从前往后依次执行

为什么 plugin 在 preset 之前执行？

`因为 preset 配置的是比较成熟的语法，plugin 主要配置一些更新特性，plugin 在 preset 之前执行是保证这些新特性是最先被转换的，保证 preset 只关心比较稳定的语法`

```js
// 执行顺序 c->b->a，这个设计babel文档中说是历史原因造成的
{
    "preset":["a","b","c"]
}
...
```

#### polyfill

babel 只转换语法(如 let,const)不转换新的 api(Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等)，老旧环境需要正确解析 js 新特性(或 api)就需要用到 polyfill

- babel v7.4 之前

安装@babel/polyfill（其实就是对 core-js 和 regenerator-runtime 进行了包装）

`由于polyfill会用于运行时，所以要以dependencies方式安装`

- babel v7.4 之后

```js
import 'core-js/stable'; // core-js用于polyfill大部分的ES新特性
import 'regenerator-runtime/runtime'; // 用于转换generator函数
```

- 按需引入

@babel/polyfill 很大 不建议直接引入，结合 preset-env 进行按需引入
"useBuiltIns": "false", // 此时不对 polyfill 做操作。如果引入 @babel/polyfill，则无视配置的浏览器兼容，引入所有的 polyfill。
"useBuiltIns": "entry", // 会将文件中 import"@babel/polyfill"语句 结合 targets ，转换为一系列引入语句，去掉目标浏览器已支持的 polyfill 模块，不管代码里有没有用到，只要目标浏览器不支持都会引入对应的 polyfill 模块。
"useBuiltIns": "usage" // 按需引入

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          //如果浏览器低于这些版本，会引入对应的polyfill
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1"
        },
        "useBuiltIns": "usage", // false | entry | useage
        "corejs": "3"
      }
    ]
  ]
}
```

配置"useBuiltIns": "usage"后，babel 编译时会按需引入 polyfill，如下

```js
let a = 1;

const sum = (a, b) => a + b;

Promise.resolve(1).then((res) => {
  console.log(res);
});


------ transform ------

"use strict";

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.promise.js");

var a = 1;

var sum = function sum(a, b) {
  return a + b;
};

Promise.resolve(1).then(function (res) {
  console.log(res);
});
```

#### polyfill 和 runtime 的区别

如果你开发的库中引用了 polyfill,而别人使用了你的库，且在他自己的应用中重写了 Promise 对象，此时就造成了全局变量被污染，导致功能异常，在此情境下 runtime 应运而生。

为了满足 npm 组件开发的需要 使用@babel/runtime 来做隔离

1. @babel/runtime 不会污染全局环境
2. 开发第三方 lib 需要使用@babel/runtime

#### transform-runtime 和 babel-runtime

1. 二者缺一不可
2. babel-runtime 就是一个提供了 regenerator core-js helpers 的运行时库，transform-runtime 依赖 babel-runtime

```shell
npm install --save-dev @babel/plugin-transform-runtime
npm install --save @babel/runtime
```

```js
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": "3"
      }
    ]
  ],
  "plugins": [["@babel/plugin-transform-runtime"]]
}

```

#### proxy 为什么不能被 polyfill

Class 可以用 function 模拟， Promise 可以用 callback 模拟

而 es6 的 proxy 无法用 Object.defineProerty 模拟

## 2 使用

- 使用方式

1. 直接 require

```js
const bable = require('@babel/core');
babel.transform(code, options, function (res) {
  console.log(res);
});
```

2. babel-cli

```shell
# 将src/index.js 编译到lib文件夹
npx babel src/index.js  --out-dir lib
```

3. webpack

结合 babel-loader 使用

下面是 demo 演示

- 安装

```shell
yarn add @babel/core @babel/cli @babel/preset-env -D
```

- 测试代码

```js
// index.js
let a = 1;
const sum = (a, b) => a + b;
```

- 配置 .babelrc

```json
{
  "presets": [["@babel/preset-env"]]
}
```

- 编译

```shell
npx babel index.js
```

编译结果

```js
'use strict';

var a = 1;

var sum = function sum(a, b) {
  return a + b;
};
```
