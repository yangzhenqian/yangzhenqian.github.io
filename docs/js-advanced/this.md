# this 的理解

## 不得不提的普通函数和箭头函数

- 参数上的区别

普通函数的参数是 arguments,而箭头函数的是 args

- this 指向的不同

箭头函数的 this 指向上层函数作用域的 this 对象，如果没有上层函数作用域，则指向顶部 this(浏览器中是 window)
普通函数的 this 指向该函数的调用者
call, apply, bind 会改变普通函数的 this，但不会改变箭头函数的 this

- 原型和构造函数的问题

`箭头函数不能使用 new 生成实例，因为箭头函数没有 prototype,而 constructor 在 prototype 里面`

```js
const a = () => {};

var b = new a(); // 报错  TypeError: a is not a constructor
```

- 对 es6 的限制

箭头函数内不能用 yield 且不能用作 Generator 函数，而普通函数可以

## 1. this

关于 this 的指向,始终坚持一个原理: this 永远指向`最后调用`它的那个对象


例 1:

```js
var name = 'tom';
function a() {
  var name = 'jerry';
  console.log('inner', this.name); // tom
  console.log(this); // window
}
a();
console.log('out', this); // window
// 如果使用严格模式,全局对象就是undefined,this.name便会报错
```

例 2:

```js
var name = 'top';
var a = {
  name: 'jerry',
  fn: function () {
    console.log(this.name); // jerry
  },
};
a.fn(); // fn 是对象 a 调用的
```

例 3:

```js
var name = 'tom';
var a = {
  name: 'jerry',
  fn: function () {
    console.log(this.name); // jerry
  },
};
window.a.fn(); // 最后调用fn的仍然是对象a
```

例 4:

```js
var name = 'tom';
var a = {
  fn: function () {
    console.log(this.name); // undefined
    // 最后调用fn的是对象a,那么fn内部的this指向对象a,而a中没有name属性,所以this.name为undefined
  },
};
window.a.fn();
```

例 5:

```js
var name = 'tom';
var a = {
  name: 'jerry',
  fn: function () {
    console.log(this.name); // tom
  },
};
var f = a.fn; // 只是赋值,并没有调用
f(); // 执行f()也就是调用了fn(),相当于最后是window调用了fn,所以this指向的就是window
```

例 6

```js
var name = 'tom';
function fn() {
  var name = 'jerry';
  innerFunction();
  function innerFunction() {
    console.log(this.name); // tom
  }
}
fn(); // 执行fn(),fn内部this指向window,执行innerFunction(),innerFunction内部的this指向fn,所以最后this指向window
```

## 2. 修改 this 的指向

改变 this 的指向有以下几种方法:

- 使用 es6 的箭头函数（注意：这里不是修改箭头函数的 this 指向）
- 在函数内部使用 \_this = this
- 使用 apply、call、bind
- new 实例化一个对象

例 7:

```js
var name = 'tom';
var a = {
  name: 'jerry',
  func1: function () {
    console.log(this.name);
  },
  func2: function () {
    setTimeout(function () {
      this.func1();
    }, 100);
  },
};
a.func2(); // this.func1 is  not a function
// 在不使用箭头函数的情况下，是会报错的，因为最后调用 setTimeout 的对象是 window，但是在 window 中并没有 func1 函数。
```

上面的例子可以用箭头函数解决 this 指向的问题

## 3. 箭头函数

- 箭头函数的 this 始终指向函数定义时的 this,而非执行时
- 箭头函数中没有 this 绑定,必须通过查找作用域链来决定其值
- 如果箭头函数被非箭头函数包含,则 this 绑定的是最近一层非箭头函数的 this,否则 this 为 undefined

例 8

```js
var name = 'tom';
var a = {
  name: 'jerry',
  func1: function () {
    console.log(this.name);
  },
  func2: function () {
    setTimeout(() => {
      this.func1();
    });
  },
};
a.func2(); // jerry
```

## 4. 在函数内部使用 \_this =this

如果不使用 es6 的箭头函数,上面例 7 可以经过如下代码改造
例 9

```js
var name = 'tom';
var a = {
  name: 'jerry',
  func1: function () {
    console.log(this.name);
  },
  func2: function () {
    var _this = this;
    setTimeout(function () {
      _this.func2();
    }, 0);
  },
};
a.func2(); // jerry
```

这个例子中，在 func2 中，首先设置 var \_this = this;，这里的 this 是调用 func2 的对象 a，为了防止在 func2 中的 setTimeout 被 window 调用而导致的在 setTimeout 中的 this 为 window。我们将 this(指向变量 a) 赋值给一个变量 \_this，这样，在 func2 中我们使用 \_this 就是指向对象 a 了。

## 5. 使用 apply、call、bind

使用 apply、call、bind 函数可以改变 this 指向,先看下面几个例子

例 10

- apply

```js
var name = 'tom';
var a = {
  name: 'jerry',
  func1: function () {
    console.log(this.name);
  },
  func2: function () {
    setTimeout(
      function () {
        this.func1();
      }.apply(a),
      100
    );
  },
};
a.func2(); //jerry
```

例 11

- call

```js
var name = 'tom';
var a = {
  name: 'jerry',
  func1: function () {
    console.log(this.name);
  },
  func2: function () {
    setTimeout(
      function () {
        this.func1();
      }.call(a),
      100
    );
  },
};
a.func2(); // jerry
```

例 12

- bind

```js
var name = 'tom';
var a = {
  name: 'jerry',
  func1: function () {
    console.log(this.name);
  },
  func2: function () {
    setTimeout(
      function () {
        this.func1();
      }.bind(a)(),
      100
    );
  },
};
a.func2(); // jerry
```

apply 与 call 定义

- apply
  定义:apply() 方法调用一个函数, 其具有一个指定的 this 值，以及作为一个数组（或类似数组的对象）提供的参数
  语法: fun.apply(thisArg, [argsArray])
  thisArg：在 fun 函数运行时指定的 this 值。需要注意的是，指定的 this 值并不一定是该函数执行时真正的 this 值，如果这个函数处于非严格模式下，则指定为 null 或 undefined 时会自动指向全局对象（浏览器中就是 window 对象），同时值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的自动包装对象。
  argsArray：一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 fun 函数。如果该参数的值为 null 或 undefined，则表示不需要传入任何参数。
- call:
  定义:与 apply 类似
  语法:fun.call(thisArg[, arg1[, arg2[, ...]]])

apply 与 call 的区别

- apply 和 call 的区别是 call 方法接受的是若干个参数列表，而 apply 接收的是一个包含多个参数的数组。如下

```js
var name = 'tom';
var a = {
  fn: function (a, b) {
    console.log(a + b);
  },
};
var b = a.fn;
b.apply(a, [1, 2]); //3
b.call(a, 1, 2); //3
```

bind

```js
var name = 'tom';
var a = {
  fn: function (a, b) {
    console.log(a + b);
  },
};
var b = a.fn;
b.bind(a, 1, 2); //并没有打印出值
```

上面的例子使用 bind 并没有打印出值,原因如下:
bind()方法创建一个新的函数, 当被调用时，将其 this 关键字设置为提供的值，在调用新函数时，在任何提供之前提供一个给定的参数序列。故上面的例子修改为:

```js
var name = 'tom';
var a = {
  fn: function (a, b) {
    console.log(a + b);
  },
};
var b = a.fn;
b.bind(a, 1, 2)(); //得再立即执行一次
```

## 6. 补充 函数的的调用方式

总共四种

- 作为一个函数调用 例 1
- 函数作为方法调用 例 2
- 使用构造函数调用 例 13
- 作为函数方法调用函数(apply,call)

例 13

```js
function myFn(arg1, arg2) {
  this.firstName = arg1;
  this.lastName = arg2;
}
var a = new myFn('张', '三丰');
console.log(a.lastName); // 三丰
```

上面例子 new 的过程:

```js
伪代码
var a = new myFunction("张","三丰");
new myFunction{
    var obj = {};
    obj.__proto__ = myFunction.prototype;
    var result = myFunction.call(obj,"张","三丰");
    return typeof result === 'object'? result : obj;
}
```

- 1.创建一个空对象;
- 2.将新创建的空对象的隐式原型指向其构造函数的显示原型;
- 3.使用 call 改变 this 的指向;
- 4.如果返回值是一个新对象,直接返回该对象,否则将 obj 作为新对象返回;
