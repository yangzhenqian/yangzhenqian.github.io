# hooks

## 介绍

在不编写 class 的情况下使用 state 以及其他的 React 特性。

**React 16.8.0 是第一个支持 Hook 的版本。升级时，请注意更新所有的 package，包括 React DOM。 React Native 从 0.59 版本开始支持 Hook。**

- 16.8 后新增功能
- 完全可选，100%向后兼容

## Class 迁移至 hooks

- constructor
  - 函数组件不需要构造函数
  - 使用 useState 来初始化 state。如果计算的代价比较昂贵，你可以传一个函数给 useState。
- getDerivedStateFromProps
  - 改为 在渲染时 安排一次更新。
- shouldComponentUpdate
  - 可以使用 React.memo
  ```js
  // 注意 这不是hook，因为与hook写法不同，React.memo 等效于 PureComponent，但它只比较 props。（你也可以通过第二个参数指定一个自定义的比较函数来比较新旧 props。如果函数返回 true，就会跳过更新
  const Button = React.memo((props) => {
    // 你的组件
  });
  ```
  - 或者使用 useMemo 优化每个子节点
- render
  - 这是函数组件体本身。
- componentDidMount, componentDidUpdate, componentWillUnmount
  - 使用 useEffect Hook
- getSnapshotBeforeUpdate，componentDidCatch 以及 getDerivedStateFromError
  - 目前还没有这些方法的 Hook 等价写法，但很快会被添加

## 使用

- 只在最顶层使用 Hook
  - 不要在循环，条件或嵌套函数中调用 Hook
  ```js
  // 🔴 在条件语句中使用 Hook 违反第一条规则
  if (name !== '') {
    useEffect(function persistForm() {
      localStorage.setItem('formData', name);
    });
  }
  ```
- 只在 React 函数中调用 Hook
  - 在 React 的函数组件中调用 Hook
  - 在自定义 Hook 中调用其他 Hook

### useState

```js
import React, { useState } from 'react';

function Temp() {
  // 声明一个叫 "count" 的 state 变量
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

### useEffect

```js
import React, { useState, useEffect } from 'react';

function Temp() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

- 清除 effct

返回一个函数 return ()=>{...}

```js
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    // 清除订阅
    subscription.unsubscribe();
  };
});
```

- 当依赖变化时，重新执行一些操作

```js
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    subscription.unsubscribe();
  };
}, [props.source]);
```

### useContext

接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的 <MyContext.Provider> 的 value prop 决定。

```js
const value = useContext(MyContext);

//错误： const value = useContext(MyContext.Consumer)
//错误： const value = useContext(MyContext.Provider)
```

### useReducer

```js
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </>
  );
}
```

### useCallback

把内联回调函数及依赖项数组作为参数传入 useCallback，返回一个 memoized 回调函数， `该回调函数仅在某个依赖项改变时才会更新`

useCallback(fn, deps) 相当于 useMemo(() => fn, deps)。

```js
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

### useMemo

把“创建”函数和依赖项数组作为参数传入 useMemo，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算。

```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

::: tip

useCallback 和 useMemo 区别
| - | useCallback | useMemo |
| :----- | :---------: | :-----: |
| 返回值 | 一个缓存的回调函数 | 一个缓存的值 |
| 参数 | 需要缓存的函数，依赖项 | 需要缓存的值(也可以是个计算然后再返回值的函数) ，依赖项 |
| 使用场景 | 父组件更新时，通过 props 传递给子组件的函数也会重新创建，然后这个时候使用 useCallBack 就可以缓存函数不使它重新创建 | 组件更新时，一些计算量很大的值也有可能被重新计算，这个时候就可以使用 useMemo 直接使用上一次缓存的值 |

小结

- useCallback 针对可能重新创建的函数进行优化，使得函数被缓存，React.memo 认定两次地址是相同就可以避免子组件冗余的更新。
- useMemo 针对不必要的计算进行优化，避免了当前组件中一些的冗余计算操作。

:::

### useRef

返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内持续存在。

```js
const refContainer = useRef(initialValue);

console.log(refContainer.current);
```

### useImperativeHandle

- useImperativeHandle 可以让你在使用 ref 时自定义暴露给父组件的实例值
- useImperativeHandle 应当与 forwardRef 一起使用

```js
// 子组件
function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} ... />;
}
FancyInput = forwardRef(FancyInput);
```

```js
// 父组件
function Home() {
  const inputRef = useRef();
  const [value, setValue] = useState('');

  useEffect(() => {
    // 这里可以直接调用子组件的方法
    inputRef.current.focus();
  }, [value]);

  return (
    <>
      <FancyInput ref={inputRef} />
    </>
  );
}
```

## 从 vue 快速过渡到 react

### 🍉 v-if

```vue
<template>
  <div>
    <span v-if="isShow">hello vue</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: true;
    }
  },
};
</script>
```

```js
import React, { useState } from 'react';

export default function Temp() {
  const [isShow, setIsShow] = useState(true);

  return (
    <div className="v-if">
      {/* 也可以用三目运算符 */}
      {/* { isShow ? <div>ello react</div> : null } */}
      {isShow && <div>hello react</div>}
    </div>
  );
}
```

### 🍉 v-show

实际上就是控制 css

```vue
<template>
  <div>
    <span v-show="isShow">hello vue</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: true;
    }
  },
};
</script>
```

```js
import React, { useState } from 'react';

export default function Temp() {
  const [isShow, setIsShow] = useState(true);

  return <div style={{ display: isShow ? '' : 'none' }}>hello react</div>;
}
```

### 🍉 v-for

```vue
<template>
  <div v-for="item in list" :key="item.id">
    {{ item.name }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          id: 1,
          name: '张三',
        },
        {
          id: 2,
          name: '李四',
        },
        {
          id: 3,
          name: '王五',
        },
      ],
    };
  },
};
</script>
```

```js
import React, { useState } from 'react';

export default function Temp() {
  const [list, setList] = useState([
    {
      id: 1,
      name: '张三',
    },
    {
      id: 2,
      name: '李四',
    },
    {
      id: 3,
      name: '王五',
    },
  ]);

  return (
    <div>
      {list.map((item) => {
        return <div key={item.id}>{item.name}</div>;
      })}
    </div>
  );
}
```

### 🍉 computed

```vue
<template>
  <div>
    <button @click="onAdd">+10</button>
    <div>计算结果：{{ calcNum }}</div>
  </div>
</template>

<script>
export default {
  name: 'computed',
  data() {
    return {
      num: 0,
    };
  },
  computed: {
    calcNum() {
      return this.num;
    },
  },
  methods: {
    onAdd() {
      this.num += 10;
    },
  },
};
</script>
```

```js
import React, { useState } from 'react';
export default function Temp() {
  const [num, setNum] = useState(0);
  const calcNum = useMemo(() => {
    return num + 10;
  }, [num]);

  const onAdd = () => {
    setNum(num + 10);
  };
  return (
    <div>
      <button onClick={onAdd}>+10</button>
      <span>计算结果： {calcNum}</span>
    </div>
  );
}
```

### 🍉 watch

```vue
<template>
  <div>
    <button @click="onAdd">+10</button>
    <div>计算结果：{{ calcNum }}</div>
    <div v-if="isShow">watch : {{ num }}</div>
  </div>
</template>

<script>
export default {
  name: 'computed',
  data() {
    return {
      num: 0,
      isShow: false,
    };
  },
  computed: {
    calcNum() {
      return this.num;
    },
  },
  methods: {
    onAdd() {
      this.num += 10;
    },
  },
  watch: {
    num: function (newVal, oldVal) {
      this.isShow = newVal ! == oldVal
    },
  },
};
</script>
```

```js
import React, { useState } from 'react';
export default function Temp() {
  const [num, setNum] = useState(0);
  const [isShow, setIsShow] = useState(0);

  const calcNum = useMemo(() => {
    return num + 10;
  }, [num]);

  const onAdd = () => {
    setNum(num + 10);
  };

  useEffect(() => {
    setIsShow(true);
  }, [num]);
  return (
    <div>
      <button onClick={onAdd}>+10</button>
      <span>计算结果： {calcNum}</span>
      {isShow && <div>watch : {num}</div>}
    </div>
  );
}
```

### 🍉 style

相同点：可以用驼峰式也可以用短横线，但短横线要加引号

不同点：

1. vue 通过数组可以绑定多个样式对象，react 主要是单个对象形式
2. react 会自动添加"px"，而 vue 需要手动添加
3. react 样式不会自动补齐前缀，如支持旧版浏览器需手动补充对应的样式属性，而 vue 会自动添加相应的前缀

```vue
<template>
  <div :style="[style1, style2]"></div>
</template>

<script>
export default {
  data() {
    return {
      style1: {
        width: '500px',
        height: '500px',
      },
      style2: {
        'background-color': 'pink',
        borderRaduis: '50%',
      },
    };
  },
};
</script>
```

```js
import React from 'react';

export default function Temp() {
  const style = {
    width: '500px',
    height: '500px',
  };
  const style2 = {
    'background-color': 'pink',
    borderRaduis: '50%',
  };

  return <div className="style" style={{ ...style, ...style2 }}></div>;
}
```

### 🍉 class

1. vue 中可以通过数组以及对象维护 class
2. react 通过数组来维护，也可以借助第三方包 classnames 起到更加便捷添加 class 的效果

```vue
<template>
  <!-- 方式1 -->
  <!-- <button :class="{ origin: true, active: isActive, top: isTop }"></button> -->
  <!-- 方式2 -->
  <button :class="classArr"></button>
</template>
<script>
export default {
  data() {
    return {
      isActive: false,
      isTop: true,
    };
  },
  computed: {
    classArr() {
      return ['origin', this.isActive ? 'active' : '', this.isTop ? 'top' : ''];
    },
  },
};
</script>
```

```js
import React, { useState } from 'react';

export default function Temp() {
  const [isActive, setIsActive] = useState(true);

  // 注意这里需要手动join，变成"origin active"形式，不然中间会有逗号（class="origin,active"）
  const classArr = ['origin', isActive ? 'active' : ''].join('');

  return <div className={classArr}>hello react</div>;
}
```

### 🍉 provide/inject

全局状态管理 vuex、redux，这里不讨论这两种方式

这里讨论 vue 中的 `provide/inject` 和 react 的 `Context`

**vue**

```vue
<!-- app.vue -->
<template>
  <div id="app">
    <div class="title">hello vue</div>
    <router-view />
  </div>
</template>
<script>
export default {
  // 声明数据
  provide() {
    return {
      msgData: {
        name: '张三',
      },
    };
  },
};
</script>
```

```vue
<!-- 其他组件使用 -->
<template>
  <div>{{ msgData.name }}</div>
</template>

<script>
export default {
  // 使用数据
  inject: ['msgData'],
};
</script>
```

**react**

```js
// context/index.js

import { createContext } from 'react';

export const MsgDataContext = createContext({
  msgData: {
    name: '',
  },
});
```

```js
// app.js
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { MsgDataContext } from './context/index';

function App() {
  return (
    <BrowserRouter>
      // 注意这里
      <MsgDataContext.Provider value={{ msgData:'张三' }}>
        <div className="title">hello react</div>
        <Switch>
          <Route path="/about"></Route>
          ...
        </Switch>
      </MsgDataContext.Provider>
    </BrowserRouter>
  );
}
```

```js
// 其他组件使用

import React, { useContext } from 'react';
import { MsgDataContext } from '../context/index';

export default function Temp() {
  // 通过userContext，使用定义好的msgDataContext
  const { msgData } = useContext(MsgDataContext);

  return <div>{msgData}</div>;
}
```

### 🍉 插槽

- 默认插槽 slot
- 具名插槽 name-slot
- 作用域插槽 scope-slot

1. **默认插槽**

**vue**

```vue
<!-- 父组件  parent.vue-->
<template>
  <div>
    <Child>
      <span>hello vue</span>
    </Child>
  </div>
</template>

<script>
import Child from './child.vue';
export default {
  components: {
    Child,
  },
  data() {
    return {};
  },
};
</script>
```

```vue
<!-- 子组件  child.vue -->
<template>
  <div>
    <!-- 这里就会被渲染为  <span>hello vue</span> -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
```

**react**

react 没有插槽，但可以通过 `props.children` 获取到组件内部的子元素来实现插槽功能

```js
import React from 'react';
import Child from './components/child.js';
export default function Parent() {
  return (
    <div>
      <Child>
        <span>hello react</span>
      </Child>
    </div>
  );
}
```

```js
// 子组件  ./components/child.js
import React from 'react';

const Child = (props) => {
  const { children } = props;
  // 这里被替换成了 <span>hello react</span>
  return <div>{children}</div>;
};

export default Child;
```

2. **具名插槽**

vue 是用过 `<slot name='main'></slot>` 来声明 ，再通过 `v-slot:main` 进行使用

**vue**

```vue
<!-- 父组件  parent.vue-->
<template>
  <div>
    <Child>
      <template v-slot:main>
        <span>hello vue</span>
      </template>
      <template v-slot:other>
        <span>vue hello</span>
      </template>
    </Child>
  </div>
</template>

<script>
import Child from './child.vue';
export default {
  components: {
    Child,
  },
  data() {
    return {};
  },
};
</script>
```

```vue
<!-- 子组件  child.vue -->
<template>
  <div>
    <!-- 这里就会被渲染为  <span>hello vue</span> -->
    <slot name="main"></slot>
    <!-- 这里就会被渲染为  <span>vue hello</span> -->
    <slot name="other"></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
```

**react**

具名插槽这里就不能使用 props.children 了，得在父组件中传入具体的`dom`

```js
import React from 'react';
import Child from './components/child.js';
export default function Parent() {
  return (
    <div>
      <Child main={<span>hello react</span>} other={<span>react hello</span>}></Child>
    </div>
  );
}
```

```js
// 子组件  ./components/child.js
import React from 'react';

const Child = (props) => {
  const { main, other } = props;

  return (
    <div>
      {/* 这里被替换成了 <span>hello react</span> */}
      {main}
      {/* 这里被替换成了 <span>react hello</span> */}
      {other}
    </div>
  );
};

export default Child;
```

3. **作用域插槽**

就是子组件中定义的数据可以在父组件中获取到

**vue**

```vue
<!-- 父组件  parent.vue-->
<template>
  <div>
    <Child>
      <!-- 注意这里的写法 -->
      <template v-slot:main="{ msg }">
        <span>hello vue，我是{{ msg.name }}</span>
      </template>
    </Child>
  </div>
</template>

<script>
import Child from './child.vue';
export default {
  components: {
    Child,
  },
  data() {
    return {
      msg: {
        name: '张三',
      },
    };
  },
};
</script>
```

```vue
<!-- 子组件  child.vue -->
<template>
  <div>
    <!-- 这里需要绑定msg变量，父组件便可以使用该变量 -->
    <slot name="main" :msg="msg"></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
```

**react**

```js
import React from 'react';
import Child from './components/child.js';
export default function Parent() {
  return (
    <div>
      <Child
        main={(msg) => {
          return <span>hello react，我是{msg.name}</span>;
        }}
      ></Child>
    </div>
  );
}
```

```js
// 子组件  ./components/child.js
import React from 'react';

const Child = (props) => {
  const [msg] = useState({
    name: '张三',
  });
  const { main } = props;
  return <div>{main(msg)}</div>;
};
export default Child;
```
