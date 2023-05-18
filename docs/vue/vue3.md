# vue3

## 改动

### 底层

全面拥抱 TS

### 生命周期

![](/images/vue/vue3/vue3生命周期.jpg)

### compositions-api(组合式 api)

vue2 options-api 写法碎片化，使得理解和维护复杂组件变得困难。选项的分离掩盖了潜在的逻辑问题。此外，在处理单个逻辑关注点时，我们必须不断地“跳转”相关代码的选项块。

如果能够将同一个逻辑关注点相关代码收集在一起会更好。而这正是组合式 API 使我们能够做到的。

## 不得不提的一些 api

### setup

1. setup 只执行一次
2. 在 setup 中避免使用 this(setup 的调用发生在 data property、computed property 或 methods 被解析之前，所以它们无法在 setup 中被获取。)
3. 接受两个参数 setup(props,context){}

#### props

**setup 函数中的 props 是响应式的，当传入新的 prop 时，它将被更新**

```js
export default {
  props: {
    title: String,
  },
  setup(props) {
    console.log(props.title);
  },
};
```

**不能使用 es6 解构，会消除 prop 的响应性**

```js
export default {
  props: {
    title: String,
  },
  setup(props) {
    // ❌  不要解构，此时title不是响应式变量
    const { title } = props;
  },
};
```

**如确需解构，需要使用 toRefs 函数**

```js
import { toRefs } from 'vue'

setup(props) {
  const { title } = toRefs(props)

  console.log(title.value)
}
```

**如果 title 是可选的 prop，则传入的 props 中可能没有 title 。在这种情况下，toRefs 将不会为 title 创建一个 ref 。你需要使用 toRef 替代它**

```js
import { toRef } from 'vue'
setup(props) {
  const title = toRef(props, 'title')
  console.log(title.value)
}
```

#### context

**context 是一个普通 JavaScript 对象，暴露了其它可能在 setup 中有用的值**

```js
export default {
  setup(props, context) {
    // Attribute (非响应式对象，等同于 $attrs)
    console.log(context.attrs);

    // 插槽 (非响应式对象，等同于 $slots)
    console.log(context.slots);

    // 触发事件 (方法，等同于 $emit)
    console.log(context.emit);

    // 暴露公共 property (函数)
    console.log(context.expose);
  },
};
```

**它不是响应式的，这意味着你可以安全地对 context 使用 ES6 解构。**

```js
export default {
  setup(props, { attrs, slots, emit, expose }) {
    ...
  }
}
```

### 响应性基础 api

#### reactive

- 返回对象的响应式副本
- 将解包所有深层的 refs，同时维持 ref 的响应性。

```js
const count = ref(1);
const obj = reactive({ count });

// ref 会被解包
console.log(obj.count === count.value); // true

// 它会更新 `obj.count`
count.value++;
console.log(count.value); // 2
console.log(obj.count); // 2

// 它也会更新 `count` ref
obj.count++;
console.log(obj.count); // 3
console.log(count.value); // 3
```

#### isProxy

检查对象是否是由 reactive 或 readonly 创建的 proxy。

#### isReactive

检查对象是否是由 reactive 创建的响应式代理。

```js
import { reactive, isReactive } from 'vue';
export default {
  setup() {
    const state = reactive({
      name: 'John',
    });
    console.log(isReactive(state)); // -> true
  },
};
```

### Refs

#### ref

接受一个内部值并返回一个响应式且可变的 ref 对象。ref 对象仅有一个 .value property，指向该内部值。

```js
const count = ref(0);
console.log(count.value); // 0

count.value++;
console.log(count.value); // 1
```

#### toRef

可以用来为源响应式对象上的某个 property 新创建一个 ref。然后，ref 可以被传递，它会保持对其源 property 的响应式连接。

```js
const state = reactive({
  foo: 1,
  bar: 2,
});

const fooRef = toRef(state, 'foo');

fooRef.value++;
console.log(state.foo); // 2

state.foo++;
console.log(fooRef.value); // 3
```

#### toRefs

将响应式对象转换为普通对象，其中结果对象的每个 property 都是指向原始对象相应 property 的 ref。

```js
const state = reactive({
  foo: 1,
  bar: 2,
});

const stateAsRefs = toRefs(state);
/*
stateAsRefs 的类型:

{
  foo: Ref<number>,
  bar: Ref<number>
}
*/

// ref 和原始 property 已经“链接”起来了
state.foo++;
console.log(stateAsRefs.foo.value); // 2

stateAsRefs.foo.value++;
console.log(state.foo); // 3
```

#### isRef

检查值是否为一个 ref 对象。

### computed

接受一个 getter 函数，并根据 getter 的返回值返回一个不可变的响应式 ref 对象。

```js
const count = ref(1);
const plusOne = computed(() => count.value + 1);

console.log(plusOne.value); // 2

plusOne.value++; // ❌ 错误
```

或者，接受一个具有 get 和 set 函数的对象，用来创建可写的 ref 对象。

```js
const count = ref(1);
const plusOne = computed({
  get: () => count.value + 1,
  set: (val) => {
    count.value = val - 1;
  },
});

plusOne.value = 1;
console.log(count.value); // 0
```

### watchEffect

立即执行传入的一个函数，同时响应式追踪其依赖，并在其依赖变更时重新运行该函数。

```js
const count = ref(0);

watchEffect(() => console.log(count.value));
// -> logs 0

setTimeout(() => {
  count.value++;
  // -> logs 1
}, 100);
```

### watch

侦听数据源的变化

与 watchEffect 的区别

- 惰性地执行副作用；
- 更具体地说明应触发侦听器重新运行的状态；
- 访问被侦听状态的先前值和当前值。

与 watchEffect 的相同点

- 手动清除侦听
- 清除副作用
- 刷新时机
- 调试

#### 侦听单一源

侦听器数据源可以是一个具有返回值的 getter 函数，也可以直接是一个 ref：

```js
// 侦听一个 getter
const state = reactive({ count: 0 });
watch(
  () => state.count,
  (count, prevCount) => {
    /* ... */
  }
);

// 直接侦听一个 ref
const count = ref(0);
watch(count, (count, prevCount) => {
  /* ... */
});
```

#### 侦听多个源

```js
watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
  /* ... */
});
```

## script-setup 语法糖

vue 3.2 的新特性：

- 暴露变量、方法等无需 `return`
- 组件只需引入无需注册，也不用关心组件的 name
- 不用 `export default`，也不用写 `setup` 函数
- 使用宏（defineProps、defineEmits、defineExpose、withDefaults）时无需 import 可以直接使用

### 父组件传递参数

**defineProps 和 withDefaults**

父组件

```vue
<template>
  <div class="home">
    <child-com :msg="msg"></child-com>
  </div>
</template>
<script lang="ts" setup>
// 组件命名采用的是大驼峰，引入后不需要在注册
import ChildCom from '../components/Child.vue';
let msg = '父组件的数据';
</script>
```

子组件

```vue
<template>
  <div>
    <p>信息:{{ msg }}</p>
  </div>
</template>
<script lang="ts" setup>
// 非ts写法
const props = defineProps({
  msg: {
    type: String,
    default: 'hello vue', // 定义默认值
  },
});

// ts写法
const props = withDefaults(
  defineProps<{
    msg: string;
  }>(),
  {
    msg: 'hello vue', // 定义默认值
  }
);
</script>
```

### 子组件抛出事件

**defineEmits**

子组件

```vue
<template>
  <div>
    <button @click="onClick">点击</button>
  </div>
</template>

<script lang="ts" setup>
const $myemit = defineEmits(['myClick']);
let onClick = (): void => {
  $myemit('myClick', '子组件的点击事件');
};
</script>
```

父组件

```vue
<template>
  <div class="home">
    <child-com :msg="msg" @myClick="myClick"></child-com>
  </div>
</template>
<script lang="ts" setup>
// 组件命名采用的是大驼峰，引入后不需要在注册
import ChildCom from '../components/Child.vue';

let myClick = (data): void => {
  console.log('子组件点击事件传来的参数', data);
};
</script>
```

### 获取子组件中的属性值

**defineExpose 结合 ref**

子组件

```vue
<template>
  <div>
    <p>性别:{{ sex }}</p>
    <p>其他信息:{{ info }}</p>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
let gender = ref('man');
let info = reactive({
  hobby: 'basketball',
  age: 28,
});
// 将组件中的属性暴露出去，这样父组件可以获取
defineExpose({
  gender,
  info,
});
</script>
```

父组件

```vue
<template>
  <div class="home">
    <child-com :msg="msg" ref="childcomRef"></child-com>
  </div>
</template>
<script lang="ts" setup>
// 组件命名采用的是大驼峰，引入后不需要在注册
import ChildCom from '../components/Child.vue';
import { ref } from 'vue';
let msg = '父组件的数据';
const childcomRef = ref(); // 通过ref 能获取到子组件中的数据
console.log('获取子组件中的数据', childcomRef.value.sex, childcomRef.value.info);
</script>
```

### style v-bind

```vue
<template>
  <span>hello vue3</span>
</template>
<script setup>
import { reactive } from 'vue';
const state = reactive({
  color: 'red',
});
</script>
<style scoped>
span {
  /* 使用v-bind绑定state中的变量 */
  color: v-bind('state.color');
}
</style>
```

::: tip
tip 用法
:::
