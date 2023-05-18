# 正篇

## 事件处理

```jsx
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'ray',
    };
  }
  getData() {
    // ...
  }
  handleClick(e) {
    console.log(e);
    this.getData(); // 报错 this is undefined
  }

  render() {
    return (
      <div className="app" onClick={this.handleClick}>
        {this.state.name}
      </div>
    );
  }
}
```

### this 的处理

- 使用 bind 方法

`不建议，因为组件渲染的时候都会重新执行bind方法，造成额外的性能开销`

```js
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getData() {
    // ...
  }
  handleClick(e) {
    console.log(e);
    this.getData();
  }

  render() {
    return (
      // 方式1
      <div className="app" onClick={this.handleClick.bind(this)}>
        点击
      </div>
    );
  }
}
```

- 在构造函数中使用 bind 方法

```js
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    // 方式2 只会执行一次bind，比方式1要好
    this.handleClick = this.handleClick.bind(this); //
  }
  getData() {
    // ...
  }
  handleClick(e) {
    console.log(e);
    this.getData();
  }

  render() {
    return (
      <div className="app" onClick={this.handleClick}>
        点击
      </div>
    );
  }
}
```

- 使用箭头函数

```js
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getData() {
    // ...
  }

  // 方式3 使用箭头函数
  handleClick = (e) => {
    console.log(e);
    this.getData();
  };

  render() {
    return (
      <div className="app" onClick={this.handleClick}>
        点击
      </div>
    );
  }
}
```

### 向事件处理程序传参

```js
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getData() {
    // ...
    console.log('getData');
  }
  handleClick(data, e) {
    console.log(data, e);
    this.getData();
  }

  render() {
    return (
      // 这中方式会默认追加event参数
      <div className="app" onClick={this.handleClick.bind(this, 'hello')}>
        点击
      </div>
    );
  }
}
```

```js
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getData() {
    console.log('getData');
  }
  handleClick(data, e) {
    console.log(data, e);
    this.getData();
  }

  render() {
    return (
      <>
        {/* 方式1 会默认追加event参数 */}
        <div className="app" onClick={this.handleClick.bind(this, 'hello')}>
          点击
        </div>
        {/* 方式2 */}
        <div
          className="app"
          onClick={() => {
            this.handleClick('hello');
          }}
        >
          点击
        </div>
        {/* 传递event */}
        <div
          className="app"
          onClick={(e) => {
            this.handleClick('hello', e);
          }}
        >
          点击
        </div>
      </>
    );
  }
}
```

### 向父组件传递参数

```js
// 父组件

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onChange = (data) => {
    console.log(data);
  };

  render() {
    return <Child onChange={this.onChange}></Child>;
  }
}

// 子组件

class Child extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '我是子组件的值',
    };
  }
  render() {
    return (
      <div
        onClick={() => {
          this.props.onChange(this.state.data);
        }}
      ></div>
    );
  }
}
```

### react 事件机制

1. dom 事件

在 js 的事件触发经过 3 个阶段，`事件的捕获->目标对象事件的处理->事件冒泡`，假设在 text 中触发了事件，会经过一个捕获的阶段，父级元素将事件一直传递到本身发生的元素上，在经过本身的事件处理之后，会经历冒泡饿阶段，事件从子元素向父元素冒泡；就因为这样，事件委托成为了可能，就是将子元素的事件处理委托给父元素。

2. react 事件

- react 事件（event 对象是 react 合成的）是合成事件，不是 DOM 原生事件
- 在 document 监听所有支持的事件
- 使用统一的分发函数 dispatchEvent

## State

### 定义 state

```js
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: 'hello react',
    };
  }

  render() {
    return <div className="app">{this.state.msg}</div>;
  }
}
```

### 修改 state

- 使用 setState
- setState 是异步的
- state 的更新是一个浅合并（shalllow merge）的过程

```js
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: 'hello react',
    };
  }
  handleClick = () => {
    console.log(1, this.state.msg); // hello react

    // 多个setState，会进行合并，最后设置为 hello reactttt !
    this.setState({
      msg: 'hello reactt !',
    });
    this.setState({
      msg: 'hello reacttt !',
    });
    this.setState({
      msg: 'hello reactttt !',
    });

    console.log(2, this.state.msg); //  hello react
  };

  render() {
    return (
      <div className="app" onClick={this.handleClick}>
        {this.state.msg}
      </div>
    );
  }
}
```

1. 上面 1,2 打印的值都是 hello react 验证了 setState `异步`的
2. 执行多个 setState,react 会替我们进行`合并`并执行
3. 如果非要在 state 值变化后做一些操作，`setState接受第二个参数`

```js
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: 'hello react',
    };
  }
  handleClick = () => {
    console.log(1, this.state.msg); // hello react
    this.setState(
      {
        msg: 'hello reactttt !',
      },
      () => {
        console.log(3, this.state.msg); // hello reactttt ! 可以同步拿到修改后的值
      }
    );
    console.log(2, this.state.msg); // hello react
  };

  render() {
    return (
      <div className="app" onClick={this.handleClick}>
        {this.state.msg}
      </div>
    );
  }
}
```

### 修改 state 的注意事项

修改 state 我们都要遵循状态都应该是不可变数据

状态类型

- 值类型：string、number、boolean、null、undefined
- 数组类型
- 对象

1. 值类型

```js
this.setState({
  msg: 'hello',
  isShow: true,
  name: 'ray',
});
```

2. 数组

```js
const _lists = this.state.lists.concat('hello');
// 或
const _lists = [...this.state._lists, 'hello'];
this.setState({
  lists: _lists,
});
```

3. 对象

```js
const _item = Object.assign({}, this.state.item, { id: 1, ame: 'zs' });
// 或
const _item = { ...this.state.item, id: 1, ame: 'zs' };
this.setState({
  item: _item,
});
```

## 生命周期

- 红框部分为不常用生命周期
- **16.3 以后移除了 componentWillmount、componentWillReceiveProps、componentWillUpdate**

`16.4 之前`

![](/images/react/lifecycle-1.jpg)

`16.4 及之后`

![](/images/react/lifecycle-2.jpg)

### componentDidUpdate

componentDidUpdate(prevProps, prevState)

componentDidUpdate() 会在更新后会被立即调用。首次渲染不会执行此方法

**如果 shouldComponentUpdate() 返回值为 false，则不会调用 componentDidUpdate()**

```js
componentDidUpdate(prevProps) {
  // 典型用法（不要忘记比较 props） 否则会引起死循环
  if (this.props.userID !== prevProps.userID) {
    this.fetchData(this.props.userID);
  }
}
```

### componentWillUnmount

componentWillUnmount() 会在组件卸载及销毁之前直接调用。例如清除 timer，取消网络请求或清除一些监听事件

### shouldComponentUpdate

shouldComponentUpdate(nextProps, nextState)

当 props 或 state 发生变化时，shouldComponentUpdate() 会在渲染执行之前被调用。此方法仅作为`性能优化`的方式而存在

- 可以用 `PureComponent` 代替此生命周期
- shouldComponentUpdate() 返回 false 则组件不会重新渲染

### static getDerivedStateFromProps

static getDerivedStateFromProps(props, state)

**返回一个对象来更新 state，如果返回 null 则不更新任何内容**

## 状态管理 Redux

1. 核心概念

- state 应用全局数据的来源，数据驱动视图的核心
- action 数据发生改变的动作描述
- reducer 结合 state 和 action，并返回一个新的 state

2. 三大原则

- 单一数据源
- state 只读
- 使用纯函数来执行修改 State

3. 相关 api

- createStore 创建一个 Redux store 来以存放应用中所有的 state。
- combineReducers 将多个不同 reducer 函数作为 value 的 object，合并成一个最终的 reducer 函数。
- applyMiddleware 接受自定义功能的 middleware 来扩展 Redux。
- compose 函数式编程中的方法，右到左来组合执行参数。
