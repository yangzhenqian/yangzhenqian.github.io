const path = require('path');
module.exports = {
  lang: 'zh-CN',
  title: `yangzhenqian`,
  description: 'hello',
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'public', 'assets'),
      },
    },
  },
  plugins: [['@vuepress/plugin-search']],
  themeConfig: {
    docsDir: 'docs',
    logo: '',
    lastUpdated: '最新更新时间',
    darkmode: false,
    navbar: [
      { text: '首页', link: '/' },
      // { text: '关于我', link: '/my/' },
      // { text: 'GitHub', link: 'https://github.com/Ray0401' },
    ],
    sidebar: [
      {
        text: '关于我',
        children: ['/my/index.md'],
      },
      {
        text: 'css高级',
        children: [
          '/css/render.md',
        ],
      },
      {
        text: 'js高级',
        children: [
          '/js-advanced/基础.md',
          '/js-advanced/this.md',
          '/js-advanced/事件循环.md',
          '/js-advanced/浏览器缓存.md',
          '/js-advanced/原型与原型链.md',
          '/js-advanced/继承.md',
          '/js-advanced/常见的设计模式.md',
          '/js-advanced/手写源码.md',
        ],
      },
      {
        text: '路由',
        children: ['/router/index.md'],
      },

      {
        text: 'vue',
        children: ['/vue/vue2.md', '/vue/vue3.md'],
      },
      {
        text: 'react',
        children: ['/react/index.md', '/react/react.md', '/react/hooks.md'],
      },
      {
        text: 'vite',
        children: ['/vite/index.md', '/vite/debug.md'],
      },
      {
        text: 'node',
        children: ['/node/node.md'],
      },
      {
        text: '工程化',
        children: ['/engineering/webpack.md', '/engineering/babel.md', '/engineering/multirepo&monorepo.md'],
      },
      {
        text: 'electron',
        children: ['/electron/electron.md'],
      },
      {
        text: 'threejs',
        children: ['/threejs/three.md'],
      },
      {
        text: 'git',
        children: ['/git/git.md'],
      },
      {
        text: '技术网址',
        children: ['/technicalUrl/url.md'],
      },
      {
        text: 'chrome',
        children: ['/chrome/plugin.md', '/chrome/chromePlugin.md'],
      },
      {
        text: 'webWorker',
        children: ['/webWorker/webWorker.md'],
      },
      {
        text: '通信',
        children: ['/http/http.md', '/http/websocket.md', '/http/eventSource.md'],
      },
      {
        text: '正则',
        children: ['/zhengze/zhengze.md'],
      },
      {
        text: '前端代理',
        children: ['/httpProxy/chromeProxy.md'],
      },
      {
        text: '格式化代码',
        children: ['/formatCode/husky.md'],
      },
      {
        text: 'rust',
        children: ['/rust/rust.md'],
      },
      {
        text: '开源组态库',
        children: ['/openSource/aj-report.md', '/openSource/h5-dooring.md'],
      },
      {
        text: 'vscode',
        children: ['/vscode/plugins.md'],
      },
    ],
  },
};
