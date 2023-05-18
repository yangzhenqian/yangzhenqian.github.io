# 介绍

## 1. 什么是 React

用于构建用户界面的 JavaScript 库

## 2. 什么是 jsx

```js
const ele = <h1>hello,world</h1>;
```

这个有趣的标签语法既不是字符串也不是 html,它是 jsx
jsx 仅仅只是 React.createElement(component, props, ...children) 函数的语法糖

- jsx JavaScript,不是模板语言(vue template),但具有 js 的所有功能
- jsx 语法上更接近 JavaScript 而不是 HTML,所以 react dom 使用小驼峰命名来定义属性的名称
  如: class -> className tabindex -> tabIndex
- jsx 防止注入攻击(cross-site-scripting,跨站脚本)
  - React DOM 在渲染所有输入内容之前，默认会进行转义
  - 所有的内容在渲染之前都被转换成了字符串
- jsx 表示对象

  - Babel 会把 jsx 转译成一个名为 React.createElement()函数调用

  ```js
  const element = <h1 className="greeting">Hello, world!</h1>;

  <!-- 等价于: -->

  const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
  );
  ```

  - react 并不强制要求使用 jsx

  ```js
  <!-- 使用jsx编写 -->
  class Hello extends React.Component {
    render() {
      return <div>Hello {this.props.toWhat}</div>;
    }
  }
  ReactDOM.render(<Hello toWhat="World" />,document.getElementById('root'));


  <!-- 不使用jsx编写 -->
  class Hello extends React.Component {
    render() {
      return React.createElement('div', null, `Hello ${this.props.toWhat}`);
    }
  }
  ReactDOM.render(React.createElement(Hello, {toWhat: 'World'}, null), document.getElementById('root'));

  ```

共享组件之间的状态逻辑: render props 和高阶组件

## 3. css in react

1. 行内样式

```jsx
<div style={{ color: red, backGround: yellow }}></div>
```

2. 引入样式表

```jsx
import './index.css'; // index.less   index.scss
```

3. css module

css 文件命名方式增加`module` ,如 `index.module.css`

4. styled-component

```shell
yarn add styled-components
```

```js
// styles.js
import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  width: 100vw;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;
```

使用

```js
import { Wrapper } from './styles.js';

<Wrapper>hello</Wrapper>;
```

5. classnames

- 合并多个类名
- 会过滤掉 falsy 的值

classNames('active', { current: true, hasHead: false }, { isShow: true }); // => 'active current isShow'

```shell
yarn add classnames
```

使用

```js
import cx from 'classNames';

function Home({ current, isShow }) {
  const boxClass = classNames({
    active: true,
    current: current,
    isShow: isShow,
  });
  return <div className={boxClass}></div>;
}

export default Home;
```
