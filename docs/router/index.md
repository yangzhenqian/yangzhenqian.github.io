# 前端路由

现如今各种框架都离不开路由，vue 有 vue-router，react 有 react-router，那么这些优秀的前端框架的路由都是怎么实现的呢？接下来我们一起探索一下

两种模式

- hash
  - `window.onhashchange` 监听浏览器 hash 值变化
- history
  - `history.pushstate` 更改路由
  - `window.onpopstate` 监听浏览器的前进、后退
  - 需要服务端配合，将地址访问做映射,否则刷新页面时会出现 404
    - 如果 url 不匹配任何静态资源，它应提供与你的应用程序中的 index.html 相同的页面，即所有的 url 都映射到 index.html

hash demo

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>前端路由hash模式</title>
  </head>
  <body>
    <div id="btn">修改hash</div>
    <script>
      // 监听hash值变化
      window.onhashchange = () => {
        console.log(location.hash);
      };

      document.getElementById('btn').addEventListener('click', () => {
        location.hash = 'login';
      });
    </script>
  </body>
</html>
```

history demo

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>前端路由hash模式</title>
  </head>
  <body>
    <div id="btn">修改history</div>
    <script>
      // 页面初次加载完调用
      document.addEventListener('DOMContentLoaded', () => {
        console.log(location);
      });

      // 点击按钮，触发路由变化
      document.getElementById('btn').addEventListener('click', () => {
        const state = { name: 'page1' };
        const title = ''; // 一般为空
        const url = 'page1';
        // 此方法更改路由
        history.pushState(state, title, url);
      });

      // 监听浏览器的前进 后退
      window.onpopstate = (state) => {
        console.log('state', state);
      };
    </script>
  </body>
</html>
```

### vue-router

[vue-router](https://router.vuejs.org/zh/guide/essentials/history-mode.html)

### react-router

[react-router](http://react-guide.github.io/react-router-cn/)

### 服务器配置 history 模式示例

#### nginx

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

#### 原生 nodejs

```js
const http = require('http');
const fs = require('fs');
const httpPort = 80;

http
  .createServer((req, res) => {
    fs.readFile('index.html', 'utf-8', (err, content) => {
      if (err) {
        console.log('We cannot open "index.html" file.');
      }

      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
      });

      res.end(content);
    });
  })
  .listen(httpPort, () => {
    console.log('Server listening on: http://localhost:%s', httpPort);
  });
```

#### express / koa

对于 Node.js/Express，使用 connect-history-api-fallback 中间件。

对于 Node.js/Koa， 使用 koa2-connect-history-api-fallback 中间件。
