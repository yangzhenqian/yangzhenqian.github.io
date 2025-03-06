import { Vuepress } from '@vuepress/client/lib/components/Vuepress'

const routeItems = [
  ["v-8daa1a0e","/","",["/index.html","/index.md"]],
  ["v-5d5c0250","/chrome/chromePlugin.html","好用的chrome插件",["/chrome/chromePlugin","/chrome/chromePlugin.md"]],
  ["v-9c57afac","/chrome/plugin.html","谷歌扩展程序",["/chrome/plugin","/chrome/plugin.md"]],
  ["v-396e1ade","/css/render.html","浏览器渲染原理",["/css/render","/css/render.md"]],
  ["v-089c3103","/electron/electron.html","electron",["/electron/electron","/electron/electron.md"]],
  ["v-1f0bf9e4","/engineering/babel.html","babel",["/engineering/babel","/engineering/babel.md"]],
  ["v-efacb1d8","/engineering/multirepo&monorepo.html","multi-repo & mono-repo",["/engineering/multirepo&monorepo","/engineering/multirepo&monorepo.md"]],
  ["v-5e4a8b01","/engineering/webpack.html","webpack",["/engineering/webpack","/engineering/webpack.md"]],
  ["v-9436601c","/http/eventSource.html","EventSource",["/http/eventSource","/http/eventSource.md"]],
  ["v-dff0487a","/http/http.html","http",["/http/http","/http/http.md"]],
  ["v-8f01db80","/http/websocket.html","websocket",["/http/websocket","/http/websocket.md"]],
  ["v-7e92875d","/git/git.html","git",["/git/git","/git/git.md"]],
  ["v-3ea3b912","/formatCode/husky.html","husky",["/formatCode/husky","/formatCode/husky.md"]],
  ["v-3ba131b2","/httpProxy/chromeProxy.html","前端代理解决方案",["/httpProxy/chromeProxy","/httpProxy/chromeProxy.md"]],
  ["v-685144f9","/js-advanced/this.html","this 的理解",["/js-advanced/this","/js-advanced/this.md"]],
  ["v-4b89369e","/js-advanced/%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF.html","事件循环机制（event loop）",["/js-advanced/事件循环.html","/js-advanced/%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF","/js-advanced/事件循环.md","/js-advanced/%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF.md"]],
  ["v-48cf2880","/js-advanced/%E5%8E%9F%E5%9E%8B%E4%B8%8E%E5%8E%9F%E5%9E%8B%E9%93%BE.html","原型与原型链",["/js-advanced/原型与原型链.html","/js-advanced/%E5%8E%9F%E5%9E%8B%E4%B8%8E%E5%8E%9F%E5%9E%8B%E9%93%BE","/js-advanced/原型与原型链.md","/js-advanced/%E5%8E%9F%E5%9E%8B%E4%B8%8E%E5%8E%9F%E5%9E%8B%E9%93%BE.md"]],
  ["v-dd6e9402","/js-advanced/%E5%9F%BA%E7%A1%80.html","基础",["/js-advanced/基础.html","/js-advanced/%E5%9F%BA%E7%A1%80","/js-advanced/基础.md","/js-advanced/%E5%9F%BA%E7%A1%80.md"]],
  ["v-2620b5b6","/js-advanced/%E5%B8%B8%E8%A7%81%E7%9A%84%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F.html","设计模式",["/js-advanced/常见的设计模式.html","/js-advanced/%E5%B8%B8%E8%A7%81%E7%9A%84%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F","/js-advanced/常见的设计模式.md","/js-advanced/%E5%B8%B8%E8%A7%81%E7%9A%84%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F.md"]],
  ["v-c0115be8","/js-advanced/%E6%89%8B%E5%86%99%E6%BA%90%E7%A0%81.html","手写源码以及实现各种功能",["/js-advanced/手写源码.html","/js-advanced/%E6%89%8B%E5%86%99%E6%BA%90%E7%A0%81","/js-advanced/手写源码.md","/js-advanced/%E6%89%8B%E5%86%99%E6%BA%90%E7%A0%81.md"]],
  ["v-047abd9f","/js-advanced/%E6%B5%8F%E8%A7%88%E5%99%A8%E7%BC%93%E5%AD%98.html","浏览器缓存",["/js-advanced/浏览器缓存.html","/js-advanced/%E6%B5%8F%E8%A7%88%E5%99%A8%E7%BC%93%E5%AD%98","/js-advanced/浏览器缓存.md","/js-advanced/%E6%B5%8F%E8%A7%88%E5%99%A8%E7%BC%93%E5%AD%98.md"]],
  ["v-ad1b6aaa","/js-advanced/%E7%BB%A7%E6%89%BF.html","继承",["/js-advanced/继承.html","/js-advanced/%E7%BB%A7%E6%89%BF","/js-advanced/继承.md","/js-advanced/%E7%BB%A7%E6%89%BF.md"]],
  ["v-2d0aa66a","/my/","关于我",["/my/index.html","/my/index.md"]],
  ["v-62c92783","/node/node.html","前言",["/node/node","/node/node.md"]],
  ["v-47ebb7f2","/openSource/aj-report.html","aj-report",["/openSource/aj-report","/openSource/aj-report.md"]],
  ["v-0f19d394","/openSource/h5-dooring.html","h5-dooring",["/openSource/h5-dooring","/openSource/h5-dooring.md"]],
  ["v-2e4c22b2","/react/hooks.html","hooks",["/react/hooks","/react/hooks.md"]],
  ["v-dc3b2a6e","/react/","介绍",["/react/index.html","/react/index.md"]],
  ["v-ca9e7b7a","/react/react.html","正篇",["/react/react","/react/react.md"]],
  ["v-86c67626","/router/","前端路由",["/router/index.html","/router/index.md"]],
  ["v-bcdedb7a","/rust/rust.html","rust",["/rust/rust","/rust/rust.md"]],
  ["v-4cb3140e","/technicalUrl/url.html","有用的网址",["/technicalUrl/url","/technicalUrl/url.md"]],
  ["v-7b88a748","/threejs/three.html","threejs",["/threejs/three","/threejs/three.md"]],
  ["v-2d4e1e50","/vite/debug.html","debug 源码",["/vite/debug","/vite/debug.md"]],
  ["v-157350f2","/vite/","为什么选 vite",["/vite/index.html","/vite/index.md"]],
  ["v-63106536","/vscode/plugins.html","插件",["/vscode/plugins","/vscode/plugins.md"]],
  ["v-6908e54b","/vue/vue2.html","vue2",["/vue/vue2","/vue/vue2.md"]],
  ["v-6abdbdea","/vue/vue3.html","vue3",["/vue/vue3","/vue/vue3.md"]],
  ["v-60b927dd","/webWorker/webWorker.html","webWorker",["/webWorker/webWorker","/webWorker/webWorker.md"]],
  ["v-2de2c0ea","/zhengze/zhengze.html","正则",["/zhengze/zhengze","/zhengze/zhengze.md"]],
  ["v-3706649a","/404.html","",["/404"]],
]

export const pagesRoutes = routeItems.reduce(
  (result, [name, path, title, redirects]) => {
    result.push(
      {
        name,
        path,
        component: Vuepress,
        meta: { title },
      },
      ...redirects.map((item) => ({
        path: item,
        redirect: path,
      }))
    )
    return result
  },
  [
    {
      name: "404",
      path: "/:catchAll(.*)",
      component: Vuepress,
    }
  ]
)
