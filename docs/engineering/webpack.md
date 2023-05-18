# webpack

## 1 介绍

Webpack 是一个前端资源加载/打包工具。它将根据模块的依赖关系进行静态分析，然后将这些模块按照指定的规则生成对应的静态资源。

![](/images/webpack/webpack-introduce.jpg)

## 2 主要概念

- entry
  - 入口，webpack 会遍历项目的所有依赖
  - entry 可以是一个或多个

```js
// 单入口
module.exports = {
  entry: './src/index.js',
};

// 多入口
module.exports = {
  entry: {
    home: './home.js',
    about: './about.js',
    contact: './contact.js',
  },
};
```

- output

指示 webpack 如何去输出、以及在哪里输出你的「bundle、asset 和其他你所打包或使用 webpack 载入的任何内容」

```js
const path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
  },
};
```

- mode (webpack 4.0 及以后)

提供 mode 配置选项，告知 webpack 使用相应模式的内置优化

`注意: mode 值为 production，打包时 webpack 会默认压缩文件并且开启 tree shaking(摇树优化)、Scope Hoisting(作用域提升)`

1.在配置中提供 mode 选项

```js
module.exports = {
  mode: 'production', //   'development' | 'production'
};
```

2.从 CLI 参数中传递

```
webpack --mode=production
```

- loader

loader 用于对模块的源代码进行转换，可以在 import 或"加载"模块时预处理文件；
可以将文件从不同的语言（如 TypeScript）转换为 JavaScript，或将内联图像转换为 data URL

```js
module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' }, // 处理css文件
      { test: /\.ts$/, use: 'ts-loader' }, // 处理ts文件
    ],
  },
};
```

- plugins

插件目的在于解决 loader 无法实现的其他事。

```js
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); //访问内置的插件
const path = require('path');

const config = {
  entry: './path/to/my/entry/file.js',
  output: {
    filename: 'my-first-webpack.bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    // 压缩js文件
    new webpack.optimize.UglifyJsPlugin(),
    // HtmlWebpackPlugin 为应用生成一个html文件，并且自动注入所有生成的js bundle，这是loader所做不到的
    new HtmlWebpackPlugin({ template: './src/index.html' }),
  ],
};

module.exports = config;
```

## 3 基本配置

spa config

```js
/*
 * 打包单页
 */

// webpack.config.js

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 自动生成html文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //将css从js中提取为单独的css文件 webpack4.0推荐使用此插件
const webpack = require('webpack');
module.exports = {
  entry: {
    index: './src/index.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /.js$/,
        use: 'babel-loader',
        exclude: /node_modules/, //忽略依赖包,防止配置 plugins:[new HtmlWebpackPlugin()] 后webpack打包失败
      },
      {
        test: /\.css$/,
        use: [
          // 注意顺序
          // 热模块替换不支持抽取出css文件，只能放在style中，所以需要style-loader
          // 生产环境打包的时候将MiniCssExtractPlugin.loader 替换 style-loader
          // MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          // 注意顺序
          // 生产环境打包时将MiniCssExtractPlugin.loader 替换 style-loader
          // MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader',
          'less-loader',
          'postcss-loader',
        ],
      },
      {
        test: /.(jpg|png|gif|jepg)$/,
        use: [
          {
            loader: 'url-loader', // 处理图片
            options: {
              limit: 5 * 1024, // 小于5kb的图片打包成base64图片
              name: 'imgs/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff | woff2 | svg | eot | ttf)$/,
        use: [
          {
            loader: 'file-loader', // 处理字体
            options: {
              limit: 8192,
              name: 'font/[name].[ext]?[hash:8]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'my-webpack', //页面title
      filename: 'webpack.html', //文件名
      favicon: 'webpack.ico', // favicon
    }),
    new webpack.HotModuleReplacementPlugin(), // HMR 热更新插件
    // 抽取css代码
    new MiniCssExtractPlugin({
      filename: '[name].css?v=[contenthash]',
    }),
  ],
  devServer: {
    contentBase: './dist',
    hot: true, // 模块热替换
  },
  //文件监听,默认false
  watch: false,
  //watch启动时watchOptions才有效
  watchOptions: {
    //默认为空，设置不监听的文件或者文件夹，支持正则匹配
    ignored: /node_modules/,
    //监听到变化发生后会等300ms再去执行，默认300ms
    aggregateTimeout: 300,
    //设置轮询文件是否变化时间，默认每秒问1000次
    poll: 1000,
  },
};
```

mpa config

```js
/*
 * 打包多页
 */

// 前提： src下有pages文件夹（pages/login/index.js  pages/main/index.js）

const glob = require('glob'); // 在nodejs领域使用很广泛，是一个强大的文件查找工具包
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 生产环境使用此插件，开发环境下次此插件容易造成HMR失效
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin'); // 去除console  webpack4下此插件需安装4.x版本,webpack5无需安装此插件可直接使用
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css webpack5 推荐使用optimize-css-assets-webpack-plugin

const setMpa = () => {
  const entry = {};
  const htmlwebpackplugins = [];
  const entryFiles = glob.sync(path.resolve(__dirname, './src/pages/*/index.js'));
  entryFiles.forEach((item) => {
    const entryFile = item;
    // console.log('entryFile', entryFile);
    const match = entryFile.match(/src\/pages\/(.*)\/index\.js$/);
    // console.log('match', match);
    const pageName = match[1]; // pageName 为login/main
    entry[pageName] = entryFile;
    // entry = {
    //   login: '/Users/xuhairui/work/STUDY/program/webpack-demo/src/pages/login/index.js',
    //   main: '/Users/xuhairui/work/STUDY/program/webpack-demo/src/pages/main/index.js'
    // }

    // 使用webpack打包多页时，一个页面对应一个HtmlWebpackPlugin
    htmlwebpackplugins.push(
      new HtmlWebpackPlugin({
        filename: `${pageName}.html`, // 输出login.html  main.html
        chunks: [pageName], // chunks 是指定注入对应的js文件 ，不配置的话，则会在当前html下注入所有js
      })
    );
  });

  return {
    entry,
    htmlwebpackplugins,
  };
};
const { entry, htmlwebpackplugins } = setMpa();
module.exports = {
  entry,
  output: {
    filename: '[name].js', // [name]是个变量，这里的[name]对应entry里的配置
    path: path.resolve(__dirname, './dist'),
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除编译 node_modules
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      // 抽离css
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      // 抽离less -> css
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
            limit: 1024 * 3,
            outputPath: 'images/',
            publicPath: '/images',
          },
        },
      },
    ],
  },
  plugins: [
    // 要结合loader 进行使用
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[hash].css', // 输出路径以及文件名，[name]同样为变量名
    }),
    new CleanWebpackPlugin(),
    ...htmlwebpackplugins,
  ],
  optimization: {
    // 压缩
    minimizer: [
      new TerserJSPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: false,
            pure_funcs: ['console.log'], // 移除console
          },
        },
      }),
      new OptimizeCSSAssetsPlugin(),
    ],
    // 分割代码块
    splitChunks: {
      /**
       * initial 入口chunk，只处理（import xxx from 'xxx'）的文件
       * async[默认值] 异步chunk，只对异步导入（import () 语法）的文件处理
       * all[推荐]  全部chunk都处理
       */
      chunks: 'all',
      // 缓存分组
      cacheGroups: {
        // 第三方模块分割
        vendor: {
          name: 'vendors', // chunk 名称
          priority: 1, // 权重 数值越大，越先抽离
          minChunks: 1, // 最少复用的次数
          test: /node_modules/, // 将此目录下的包提取为chunk
          minSize: 30 * 1024, // 大小限制 最小30kb
        },
        // 公共模块分割
        common: {
          name: 'common', // chunk 名称
          priority: 0, // 权重 数值越大，越先抽离
          minChunks: 2, // 最少复用的次数
          minSize: 3 * 1024, // 大小限制 最小3kb
        },
      },
    },
  },
};
```

懒加载

1. [推荐] webpack 会将 import()语法的文件单独打包成一个 chunk
2. 在没有 import() 语法之前，webpack 提供了 require.ensure 方法来支持异步加载

```js
// utils/index.js

const data = '我是动态引入的数据1';

export { data };

export default {
  data: '我是动态引入的数据2',
};
```

```js
// 用setTimeout模拟异步
// 引入动态数据 懒加载
setTimeout(() => {
  import('../../utils/index').then((res) => {
    console.log(res.data); // 我是动态引入的数据1;
    console.log(res.default.data); // 我是动态引入的数据2,
  });
}, 2000);
```

解析 jsx

- 安装依赖包

```shell
npm install @babel/preset-react -D
```

- 配置 根目录下创建 .babelrc 文件

```json
{
  "presets": ["@babel/preset-react"]
}
```

解析 vue

- 安装 vue-loader

```shell
npm install -D vue-loader vue-template-compiler
```

- 配置

```js
// webpack.config.js

const { VueLoaderPlugin } = require('vue-loader');
module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      // 它会应用到普通的 `.js` 文件
      // 以及 `.vue` 文件中的 `<script>` 块
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      // 它会应用到普通的 `.css` 文件
      // 以及 `.vue` 文件中的 `<style>` 块
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    // 请确保引入这个插件来施展魔法
    new VueLoaderPlugin(),
  ],
};
```

## 4 loader 和 plugin

- loader 的`洋葱模型`

在 loader 执行的时候 webpack 从左到右依次调用`pitch`方法，然后从右到左调用 loader 本身

所以在处理 css 文件的时候的配置为

```js
/**
 *  postcss-loader 为css添加前缀，解决浏览器兼容性
 *  less-loader 处理less -> css
 *  css-loader  会对 @import 和 url() 进行处理，就像 js 解析 import/require() 一样
 *  style-loader 生成style节点，将css代码放入其中
 */

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader','postcss-loader'],
      },
    ];
  }
}

```

- loader-utils

`loader-utils 是编写 webpack loader 的官方工具库`

- plugin

本质就是由 apply 方法的类，通过 apply 的方法的类我们可以在运行时取得 compiler 和 Compilation 这 2 个实例； Compiler 是编译器的实例（即 Webpack），Compilation 是每一次编译的过程。

```js
module.exports = class DemoPlugin {
  constructor() {
    this.options = options;
  }
  apply(compiler) {
    compiler.plugin('emit', (compilation, cb) => {
      cb();
    });
  }
};
```

## 5 性能分析

### 5.1 数据分析

#### webpack-bundle-analyzer(文件体积分析)

它能分析打包出的文件有哪些，大小占比如何，模块包含关系，依赖项，文件是否重复，压缩后大小

1. 安装

```shell
npm i webpack-bundle-analyzer -D
```

2. package.json

```json
{
  "scripts": {
    "analyzer": "webpack-bundle-analyzer --port 8000 ./dist/stats.json"
  }
}
```

3. webpack 配置

```js
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled', // 不启动展示打包报告的http服务器
      generateStatsFile: true, // 是否生成stats.json文件
    }),
  ],
};
```

#### speed-measure-webpack-plugin（分析打包速度）

1. webpack 配置

```js
// npm i speed-measure-webpack5-plugin -D
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack5-plugin');
const smw = new SpeedMeasureWebpackPlugin();
module.exports = smw.wrap({
  mode: "development",
  devtool: 'source-map',
  ...
});

```

### 5.2 编译时间优化

#### 1. extensions

- 添加 extensions 后 require、import 的时候不用添加文件扩展名
- 编译的时候会依次添加扩展名进行匹配

```js
module.exports = {
  resolve: {
      extensions:[".js"、".jsx"、".json"]
  }
}
```

#### 2. alias

配置文件别名可以加快 webpack 查找模块的速度

```js
const elementUi = path.resolve(__dirname, 'node_modules/element-ui/lib/theme-chalk/index.css');
module.exports = {
  resolve: {
    extensions:[".js"、".jsx"、".json"],
    alias: {'element-ui'}
  }
};
```

#### 3. noParse

- 用于配置哪些模块的文件内容不需要进行解析
- 不需要解析依赖就是没有依赖的第三方大型类库，可以配置这个字段，以提高整体的构建速度
- 使用 noparse 进行忽略的模块文件中不能使用 import、require 等语法

```js
module.exports = {
  module: {
    noParse: /jquery|chartjs/, // 正则表达式
  },
};
```

#### 4. IgnorePlugin

- 内置插件
- 作用： 忽略第三方包指定目录，让这些指定目录不要被打包进去，减少打包体积，加快打包速度

moment 2.18 会将所有本地化内容和核心功能一起打包，可以使用 IgnorePlugin 忽略

```js
// 1. webpack打包时忽略本地化（语言包）
new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/);
// 2. 在项目中使用的时候需要手动引入对应的语言包
// 3. 推荐更小的库  dayjs 或者 spacetime 替代moment
```

#### 5. thread-loader(多进程)

`项目较大、打包缓慢的情况下使用效果更明显，毕竟多进程打包会增加更大的开销`

`还有parallel-webpack、HappyPack等多进程打包插件，v4推荐thread-loader，官方出品`

- 在耗时的 loader （例如 babel-loader）中使用此 loader
- 把 thread-loader 放置在其他 loader 之前
- include 表示哪些目录中的 .js 文件需要进行 babel-loader
- exclude 表示哪些目录中的 .js 文件不要进行 babel-loader
- exclude 的优先级高于 include ,尽量避免 exclude ，更倾向于使用 include

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除编译 node_modules
        // include: path.resolve("src"),
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: require('os').cpus().length - 1, // 自己电脑的核心数减1
            },
          },
          {
            loader: 'babel-loader',
            options: {
              // babel在转移js非常耗时间，可以将结果缓存起来，下次直接读缓存；默认存放位置是 node_modules/.cache/babel-loader
              cacheDirectory: true,
            },
          },
        ],
      },
    ],
  },
};
```

#### 6. hard-source-webpack-plugin

- 为模块提供了中间缓存,缓存默认的存放路径是 node_modules/.cache/hard-source
- 首次构建时间上不会有太大变化，第二次之后，编译时间大幅缩短
- webpack v5 已内置模块缓存，无需使用此插件

### 5.4 编译体积优化

#### 1. 压缩 js、css、HTML 和图片

- optimize-css-assets-webpack-plugin 是一个优化和压缩 CSS 资源的插件
- terser-webpack-plugin 是一个优化和压缩 JS 资源的插件
- image-webpack-loader 可以帮助我们对图片进行压缩和优化

#### 2. Tree shaking（摇树优化）

`你可以将应用程序想象成一棵树。绿色表示实际用到的源码和 library，是树上活的树叶。灰色表示无用的代码，是秋天树上枯萎的树叶。为了除去死去的树叶，你必须摇动这棵树，使它们落下。`

- 在 mode 为 production 下默认开启
- 在 package.json 中配置:

  - "sideEffects": false 所有的代码都没有副作用(都可以进行 tree shaking)
  - 可能会把 css 和@babel/polyfill 文件干掉可以设置 "sideEffects":["*.css"]

- 以下情况代码（dead code）会被 tree shaking

  - 没有导入和使用

  ```js
  // functions.js
  export const sum = (a, b) => a + b;
  export const multiplication = (a, b) => a * b;
  ```

  ```js
  import { sum } from './functions';
  const res = sum(1, 2);
  console.log(res);
  ```

  - 代码不会被执行

  ```js
  if (false) {
    console.log('false');
  }
  ```

  - 代码执行的结果不会被用到

  ```js
  import { sum } from './functions';
  sum(1, 2);
  ```

  - 代码中只写不读的变量

  ```js
  let a = 1;
  a = 2;
  ```

#### 3. Scope Hoisting （作用域提升）

`在mode为production下默认开启,开发环境要用 webpack.optimizeModuleConcatenationPlugin 插件`

- 可以让 Webpack 打包出来的代码文件更小、运行的更快
- 原理是将所有的模块按照引用顺序放在一个函数作用域里，然后适当地重命名一 些变量以防止命名冲突

### 5.5 运行速度优化

#### 1. 小图片 base6 编码，减少 http 请求

参考 `3 基本配置`

#### 2. 懒加载

使用 import()方式去引入模块，当需要加载的时候再加载

```js
const Login = () => import(/* webpackChunkName: "login" */ '@/components/Login/Login');
```

#### 3. 提取公共代码 splitchunks

参考 `3 基本配置`

#### 4. cdn 加速

- 打包时 publicPath 改为 cdn 域名
- 将打包后的产物放到 cdn 服务器

#### 5. 预拉取 prefetch

提前获取将来可能会用到的资源，`prefetch chunk`会在父`chunk`加载完成之后进行加载。

```js
//  webpackPrefetch: true
import(
  /* webpackChunkName: 'utils', webpackPrefetch: true
   */ './utils/index'
).then((result) => {
  console.log(result.default);
});
```

这样写，webpack 会替我们在 head 内添加一行

```html
<link rel="prefetch" as="script" href="3.js" />
```

## 6 扩展

### 6.1 如何配置热更新？

### 6.2 tree shaking 为什么只能在 esmodule 中使用？

`因为webpack是静态分析，静态分析也就是在编译时执行，当然tree shaking 也是在编译时执行,而只有es6 module 只能静态引入，所以tree-sahking只能在esmodule中使用`

1. es6 module 静态引入，编译时引入

```js
import api1 from 'a.js';
if (isDev) {
  // 编译时报错，只能静态引入
  import api2 from 'b.js';
}
```

2. commonjs 是动态引入，执行时引入

```js
const api1 = require('a.js');
if (isDev) {
  // 执行时引入
  const api2 = require('b.js');
}
```

### 6.3 何时使用 dll（动态链接库）且如何使用?

`webpack v4后不再使用dll,因为v4打包性能足够好（打包第三方库可以使用splitChunks配置）`

1. 将一些比较稳定，且不常升级的第三方库（如 react、react-dom 等）打包到动态链接库中，在不升级这些库的情况下，动态库不需要重新打包，每次构建只重新打包业务代码。

2. 参考 webpack

### 6.4 webpack 中 module、chunk 和 bundle 的区别？

一句话总结：

- module: 在 webpack 中一切皆模块，项目中定义的文件无论是 ESM 还是 commonJS 或是 AMD，他们都是 module
- chunk: webpack 处理源文件时是 chunk
- bundle: 最后生成 bundle 文件，可以在浏览器中直接运行
