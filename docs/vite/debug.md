# debug 源码

## Vite 最初的 demo

尤雨溪三年的代码,仓库地址 [vue-dev-server](https://github.com/vuejs/vue-dev-server/tree/master)

## 准备工作

```bash
git clone https://github.com/vuejs/vue-dev-server.git
cd vue-dev-server
yarn run test
```

## 开始

### 1.1 vscode 调试代码

![](/images/vite/vscode-debugger.png)

### 1.2 源码剖析

可以先注释掉红框部分,打开控制台看看 network 都请求了哪些资源

![](/images/vite/entry.png)
