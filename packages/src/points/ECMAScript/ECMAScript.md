---
title: Ecmascript
order: 2
nav:
  path: /points
---

# ECMAScript

---

## points

### 箭头函数和普通函数的区别

- 箭头函数和普通函数的样式不同，箭头函数语法更加简洁、清晰，箭头函数是=>定义函数,普通函数是 function 定义函数。
- 箭头函数会捕获其所在上下文的 this 值，作为自己的 this 值，定义的时候就确定并固定了。
- 箭头函数不能作为构造函数使用，也不能使用 new 关键字(因为箭头函数没有自己的 this，它的 this 其实是继承了外层执行环境中的 this，且 this 指向永远不会改变,作为构造函数其的 this 要是指向创建的新对象)。
- 箭头函数没有自己的 arguments。在箭头函数中访问 arguments 实际上获得的是外层局部（函数）执行环境中的值。
- call、apply、bind 并不会影响其 this 的指向。
- 箭头函数没有原型 prototype。
- 箭头函数不能当作 Generator 函数，不能使用 yield 关键字。

### var、let 和 const 之间的区别

- 变量提升方面：var 声明的变量存在变量提升，即变量可以在声明之前调用，值为 undefined。
  let 和 const 不存在变量提升问题(注意这个‘问题’后缀，其实是有提升的，只不过是 let 和 const 具有一个暂时性死区的概念，即没有到其赋值时，之前就不能用)，即它们所声明的变量一定要在声明后使用，否则报错。
- 块级作用域方面：var 不存在块级作用域,let 和 const 存在块级作用域
- 声明方面：var 允许重复声明变量,let 和 const 在同一作用域不允许重复声明变量。其中 const 声明一个只读的常量(因为如此，其声明时就一定要赋值，不然报错)。一旦声明，常量的值就不能改变。
  如何使 const 声明的对象内属性不可变，只可读呢？
  如果 const 声明了一个对象，对象里的属性是可以改变的。

```javascript
const obj = { name: 'zhangsan' };
obj.name = 'lisi';
console.log(obj.name); //lisi
```

因为 const 声明的 obj 只是保存着其对象的引用地址，只要地址不变，就不会出错。
使用 Object.freeze(obj) 冻结 obj,就能使其内的属性不可变,但它有局限，就是 obj 对象中要是有属性是对象，该对象内属性还能改变，要全不可变，就需要使用递归等方式一层一层全部冻结。

### Bigint 和 Number 的区别

Number 类型的数字有精度限制，数值的精度只能到 53 个二进制位（相当于 16 个十进制位,正负 9007199254740992），大于这个范围的整数，就无法精确表示了。
PS: 很多同学可能遇到过，服务端给了我一个 long 长整型的一个 id,超出了 Number 类型支持的范围,en...，大多数人会选择让服务端直接甩给你一个 string 类型的 id
Bigint 没有位数的限制，任何位数的整数都可以精确表示。但是其只能用于表示整数，且为了与 Number 进行区分，BigInt 类型的数据必须添加后缀 n。BigInt 可以使用负号（-），但是不能使用正号（+）。
另外 number 类型的数字和 Bigint 类型的数字不能混合计算。

```javascript
12n + 12; //报错
```

### 基本数据类型和引用数据类型的区别

基本数据类型：

- 基本数据类型的值是不可变的,这里你就可以联想到，是不是所有关于字符串和数字的方法都是带有返回值的，而不是改变原字符串或数字。
  例如

```javascript
let a = 'abc';
a.split('');
console.log(a); //abc
```

- 基本数据类型不可以添加属性和方法，虽然不会报错，但也只是一瞬间转为了相应包装对象，操作完又转化回原基本数据类型，不会保存结果。
- 基本数据类型的赋值是简单赋值,基本数据类型的比较是值的比较。
- 基本数据类型是存放在栈区的

引用数据类型：

- 引用类型的值是可以改变的,例如对象就可以通过修改对象属性值更改对象。
- 引用类型可以添加属性和方法。
- 引用类型的赋值是对象引用,即声明的变量标识符，存储的只是对象的指针地址。
- 引用类型的比较是引用(指针地址)的比较。
- 引用类型是同时保存在栈区和堆区中的,栈区保存变量标识符和指向堆内存的地址。

### defer 和 async 的区别

大家应该都知道在 script 标签内有这两个属性 async 和 defer，例如\<script src="./func.js" async defer></script>

- defer：中文意思是延迟。用途是表示脚本会被延迟到整个页面都解析完毕后再运行。因此，在\<script>元素中设置 defer 属性，相当于告诉浏览器立即下载，但延迟执行。HTML5 规范要求脚本按照它们出现的先后顺序执行，因此第一个延迟脚本会先于第二个延迟脚本执行,但执行脚本之间存在依赖，需要有执行的先后顺序时，就可以使用 defer,延迟执行。我觉得把 script 脚本放在 body 底部和 defer 差不多。
- async：中文意思是异步，这个属性与 defer 类似，都用于改变处理脚本的行为。同样与 defer 类似，async 只适用于外部脚本文件，并告诉浏览器立即下载文件。但与 defer 不同的是，标记为 async 的脚本并不保证按照它们的先后顺序执行。
  指定 async 属性的目的是不让页面等待两个脚本下载和执行，从而异步加载页面其他内容,这使用于之间互不依赖的各脚本。

当网页交给浏览器的 HTML 解析器转变成一系列的词语（Token）。解释器根据词语构建节点（Node），形成 DOM 树。因为 JavaScript 代码可能会修改 DOM 树的结构，所以节点是 JavaScript 代码的话，就需要停止当前 DOM 树的创建，直到 JavaScript 的资源加载并被 JavaScript 引擎执行后才继续 DOM 树的创建。
这里就会产生阻塞，出现白屏问题(白屏问题优化有很多方面，这里就脚本阻塞这一小点)，我们就可以使用 async 和 defer 属性来解决 JavaScript 脚本阻塞问题。
当然最稳妥的办法还是把 script 标签放置在 body 的底部，没有兼容性问题，不会因此产生白屏问题，没有执行顺序问题。

### async await 对比 promise 的优缺点

async/await 优点：

- 它做到了真正的串行的同步写法，代码阅读相对容易
- 对于条件语句和其他流程语句比较友好，可以直接写到判断条件里面

```javascript
function a() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(222);
    }, 2222);
  });
}
async function f() {
  try {
    if ((await a()) === 222) {
      console.log('yes, it is!'); // 会打印
    }
  } catch (err) {
    // ...
  }
}
```

- 处理复杂流程时，在代码清晰度方面有优势
  async/await 缺点：
- 无法处理 promise 返回的 reject 对象，要借助 try...catch...
- 用 await 可能会导致性能问题，因为 await 会阻塞代码，也许之后的异步代码并不依赖于前者，但仍然需要等待前者完成，导致代码失去了并发性。

```javascript
//promise
Promise.all([ajax1(), ajax2()]);
```

- try...catch...内部的变量无法传递给下一个 try...catch...,Promise 和 then/catch 内部定义的变量，能通过 then 链条的参数传递到下一个 then/catch，但是 async/await 的 try 内部的变量，如果用 let 和 const 定义则无法传递到下一个 try...catch...，只能在外层作用域先定义好。
  但 async/await 确确实实是解决了 promise 一些问题的。更加灵活的处理异步
  promise 的一些问题：
- 一旦执行，无法中途取消，链式调用多个 then 中间不能随便跳出来
- 错误无法在外部被捕捉到，只能在内部进行预判处理，如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部
- Promise 内部如何执行，监测起来很难，当处于 pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）

### cookies 和 session 的区别

- 存储位置不同:cookie 的数据信息存放在客户端浏览器上，session 的数据信息存放在服务器上。
- 存储容量不同:单个 cookie 保存的数据<=4KB，一个站点最多保存 20 个 Cookie，而对于 session 来说并没有上限，但出于对服务器端的性能考虑，session 内不要存放过多的东西，并且设置 session 删除机制。
- 存储方式不同:cookie 中只能保管 ASCII 字符串，并需要通过编码方式存储为 Unicode 字符或者二进制数据。session 中能够存储任何类型的数据，包括且不限于 string，integer，list，map 等。
- 隐私策略不同:cookie 对客户端是可见的，别有用心的人可以分析存放在本地的 cookie 并进行 cookie 欺骗，所以它是不安全的，而 session 存储在服务器上，对客户端是透明的，不存在敏感信息泄漏的风险。
- 有效期上不同:开发可以通过设置 cookie 的属性，达到使 cookie 长期有效的效果。session 依赖于名为 JSESSIONID 的 cookie，而 cookie JSESSIONID 的过期时间默认为-1，只需关闭窗口该 session 就会失效，因而 session 不能达到长期有效的效果。
- 服务器压力不同:cookie 保管在客户端，不占用服务器资源。对于并发用户十分多的网站，cookie 是很好的选择。session 是保管在服务器端的，每个用户都会产生一个 session。假如并发访问的用户十分多，会产生十分多的 session，耗费大量的内存。
- 跨域支持上不同:cookie 支持跨域名访问。session 不支持跨域名访问。

### js 中的堆和栈,栈和队列有什么区别

堆(heap)和栈(stack)的区别:
堆：队列优先,先进先出；由操作系统自动分配释放 ，存放函数的参数值，局部变量的值等。其操作方式类似于数据结构中的栈。
栈：先进后出；动态分配的空间 一般由程序员分配释放， 若程序员不释放，程序结束时可能由 OS 回收，分配方式倒是类似于链表。
栈和队列的区别：

- 栈只允许在表尾一端进行插入和删除，队列只允许在表尾一端进行插入，在表头一端进行删除。
- 栈是先进后出，队列是先进先出。

### bind call apply 区别

- 三者都可以改变函数的 this 对象指向。
- 三者第一个参数都是 this 要指向的对象，如果没有这个参数或参数为 undefined 或 null，则默认指向全局 window。
  -. 三者都可以传参，但是 apply 是数组，而 call 是参数列表，且 apply 和 call 是一次性传入参数，而 bind 可以分为多次传入。
- bind 改变 this 指向后不会立即执行，而是返回一个永久改变 this 指向的函数便于稍后调用； apply, call 则是立即调用

### 编译时加载(静态加载)与运行时加载

- 编译时加载
  ES6 模块不是对象，而是通过 export 命令显式指定输出的代码，再通过 import 命令输入。

```javascript
import { stat, exists, readFile } from 'fs';
```

- 运行时加载
  CommonJS 和 AMD 模块，都只能在运行时确定这些东西。比如，CommonJS 模块就是对象，输入时必须查找对象属性。

```Node

    // CommonJS模块
    let { stat, exists, readFile } = require('fs');

    // 等同于
    let _fs = require('fs');
    let stat = _fs.stat;
    let exists = _fs.exists;
    let readfile = _fs.readfile;
```

解析：上面代码的实质是整体加载 fs 模块（即加载 fs 的所有方法），生成一个对象（\_fs），然后再从这个对象上面读取 3 个方法。这种加载称为“运行时加载”，
因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。

### npm install 原理分析

[npm install 原理分析](https://mp.weixin.qq.com/s?__biz=Mzg2NDAzMjE5NQ==&mid=2247485074&idx=1&sn=a4b39ef1fcad427e79a8714c41b8eb0b&scene=21#wechat_redirect)

### new 运算符的运算机制

- 创建一个空对象
- 将函数的 this 指向这个空对象
- 执行函数
- 如果函数没有指定返回值，则直接返回 this（一开始创建的空对象），否则返回指定返回值

### 变量提升

函数声明的方式声明的函数存在函数提升
在执行上下文生成的阶段，函数会比变量更早的进行提升，也就是说函数相比变量，更加靠前。

### let、const

- 块级作用域
- 不能变量提升
- 暂时性死区(在变量声明前使用这个变量，就会报错。)
- 重复声明报错
- const 声明不可变的变量

```
    // ES5 模拟实现 const
    function setConst(key, value, obj) {
      Object.defineProperty(window, key, {
        get: function(){
          return value;
        },
        set: function(){
          console.error('Uncaught TypeError: Assignment to constant variable');
        },
      });
    }
```

### 扩展运算符、剩余参数

```javascript
// ...
```

### Array.of()

```javascript
if (!Array.of) {
  Array.of = function () {
    return Array.prototype.slice.call(arguments);
  };
}
```

### ?. 可选链操作符

```javascript
// ?.
```

### Object.is()

- 判断两个值相等

```javascript
Object.is('imooc', 'imooc'); // true
Object.is('imooc', 'mooc'); // false

Object.is(window, window); // true
Object.is([], []); // false

var foo = { a: 1 };
var bar = { a: 1 };
var obj = foo;
Object.is(foo, foo); // true
Object.is(foo, bar); // false
Object.is(foo, obj); // true

Object.is(null, null); // true

// 特例
Object.is(0, -0); // false
Object.is(0, +0); // true
Object.is(-0, -0); // true
Object.is(NaN, 0 / 0); // true
```

### 属性的遍历

ES6 一共有 5 种方法可以遍历对象的属性。

- `for in` 循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。
- `Object.keys()` 返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。
- `Object.getOwnPropertyNames()` 返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。
- `Object.getOwnPropertySymbols()` 返回一个数组，包含对象自身的所有 Symbol 属性的键名。
- `Reflect.ownKeys()` 返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。

以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则。

- 首先遍历所有数值键，按照数值升序排列。
- 其次遍历所有字符串键，按照加入时间升序排列。
- 最后遍历所有 Symbol 键，按照加入时间升序排列。

### Null 判断运算符

`??` 但是只有运算符左侧的值为 null 或 undefined 时，才会返回右侧的值。

### 重排(回流)、重绘

- 当更新了元素的几何属性，那么浏览器需要重新计算元素的几何属性，将其安放在界面中的正确位置，这个过程叫做重排，也称为“回流”。
- 更新了元素的绘制属性，但没有改变布局，重新把元素外观绘制出来的过程叫做重绘。例如更改某些元素的背景颜色。
  重排一定会伴随重绘，重绘却不一定伴随重排。

[重排、重绘](https://juejin.cn/post/6963425623297998878)

### XSS、CSRF

[XSS、CSRF](https://github.com/dwqs/blog/issues/68)

### require 与 import 的区别

[require 与 import 的区别](https://segmentfault.com/a/1190000021911869)

### 从输入 URL 到页面加载完成的过程

[详细解析](https://zhuanlan.zhihu.com/p/34288735)

### 浏览器的同源策略

[浏览器的同源策略](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)

### 跨域

[跨域](https://segmentfault.com/a/1190000015597029)

### JSONP

[JSONP](https://www.runoob.com/json/json-jsonp.html)

### 自定义事件

[自定义事件](https://zh.javascript.info/dispatch-events)

### 事件委托

[事件委托](https://zh.javascript.info/event-delegation)

### 事件流

[事件流](https://segmentfault.com/a/1190000013265547)

### target 和 currentTarget 区别

- target 返回触发事件的元素
- currentTarget 返回绑定事件的元素

### Garbage Collection

### 柯里化

[柯里化](https://zh.javascript.info/currying-partials)

### new 操作符做了什么

[new 操作符做了什么](https://zhuanlan.zhihu.com/p/158640941)

### JavaScript 中的 this

JavaScript 中的 this 有如下几种情况，并按他们的优先级从低到高划分如下：

- 独立函数调用，例如 getUserInfo()，此时 this 指向全局对象 window
- 对象调用，例如 stu.getStudentName()，此时 this 指向调用的对象 stu
- call()、apply()和 bind()改变上下文的方法，this 指向取决于这些方法的第一个参数，当第一个参数为 null 时，this 指向全局对象 window
- 箭头函数没有 this，箭头函数里面的 this 只取决于包裹箭头函数的第一个普通函数的 this
- new 构造函数调用，this 永远指向构造函数返回的实例上，优先级最高。

[JavaScript 中的 this](https://zhuanlan.zhihu.com/p/42145138)

### preload、prefetch

[preload、prefetch](https://zhuanlan.zhihu.com/p/48521680)

### window.onload 和 DOMContentLoaded 的区别

[window.onload 和 DOMContentLoaded 的区别](https://www.jianshu.com/p/1a8a7e698447)

### 动态表单能够运用在什么场景？

### 实际场景中，哪些地方应用到了堆、链表、多叉树结构

### Promise 并发限制

[详细解析](https://www.jianshu.com/p/1010432be422)

### weakMap 和 Map 的区别，weakMap 原理，为什么能被 GC？

[详细解析](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/464)

### 如何干扰 GC ？

### 帧数怎么计算？

### 如何避免数据被 iframe 截获

### 说下状态码、说下 304，什么情况会 304？协商缓存的头部字段？

### 微信小程序同层渲染?

[详细解析](https://developers.weixin.qq.com/community/develop/article/doc/000c4e433707c072c1793e56f5c813)

### Web Components

[入门介绍](http://www.ruanyifeng.com/blog/2019/08/web_components.html)

### Promise.all 如果有一个失败了如何处理

### canvas 与 svg 的区别

### attribute 和 property 的区别

### document.write 只能重绘整个页面。innerHTML 可以重绘页面的一部分

### cookie、session、localStorage、sessionStorage

(![详细解析](https://cdn.jsdelivr.net/gh/TheFirstSunday/gallery@main/images/cookie.png))

### 长短轮询 websocket

### forEach 和 map 区别是什么

### 并发与并行的区别？

并发和并行: 并行(parallelism)：是微观概念，假设 CPU 有两个核心，则我们就可以同时完成任务 A 和任务 B，同时完成多个任务的情况就可以称之为并行。
并发(concurrency)：是宏观概念，现在有任务 A 和任务 B，在一段时间内，通过任务之间的切换完成这两个任务，这种情况称之为并发。

### 什么是回调函数？回调函数有什么缺点？如何解决回调地狱问题？

[详细解析](https://segmentfault.com/a/1190000018550118)

### Node 中的 Event Loop 和浏览器中的有什么区别？process.nextTick 执行顺序？

### fetch 和 xhr 有什么区别

### 图片懒加载原理是什么

### null 和 undefined 的区别

### Object 和 map 的比较

### Object.freeze

### import() 的实现方式

### Pre-rendering

### 面向切面编程(AOP)

### IOC

### 函数式编程

### APM、ASM

### 性能测试监控 TP50、TP99、TP999 含义

### 贝赛尔曲线

### 调用栈

### 单线程原因

浏览器中 JavaScript 的主要用途是操作 DOM 。这决定了它只能是单线程，否则会带来很复杂的同步问题。

### JavaScript 只支持单线程，那么为什么浏览器中的 JavaScript 可以同时发送多个网络请求或者执行多个事件回调函数呢？

这是因为 JavaScript 是基于事件驱动，当需要进行网络请求时，JavaScript 线程会把请求发送给 network 线程执行，
并等待执行结果；当进行文件读取时则调用 file 线程，然后等待结果。 然后 JavaScript 会一直轮询队列 event loop，
直到有事件完成， 这时浏览器会驱动 JavaScript 去执行事件的回调函数。这就是 JavaScript 的事件驱动模型。

### a.b.c.d 和 a['b']['c']['d']，哪个性能更高?

应该是 a.b.c.d 比 a['b']['c']['d'] 性能高点，后者还要考虑 [ ] 中是变量的情况， 再者，从两种形式的结构来看，显然编译器解析前者要比后者容易些，自然也 就快一点

### 为什么普通 for 循环的性能远远高于 forEach 的 性能，请解释其中的原因。

for 循环没有任何额外的函数调用栈和上下文;
forEach 函数签名实际上是

```javascript

array.forEach(function(currentValue, index, arr), thisValue)
```

它不是普通的 for 循环的语法糖，还有诸多参数和上下文需要在执行的时候考
虑进来，这里可能拖慢性能;

### JS 中 forEach 能不能跳出循环

### 高级/资深的前端是如何回答 JavaScript 面试题的

[面试技巧](https://juejin.cn/post/6971727286856843295)

### AMD,CommonJS,CMD,UMD,ES6

[AMD,CommonJS,CMD,UMD,ES6](https://zhuanlan.zhihu.com/p/108217164)

### Promise 为什么比 setTimeout 快？

### Async/Await 如何通过同步的方式实现异步

### 请写出下面代码的运行结果

```javascript
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}
async function async2() {
  console.log('async2');
}
console.log('script start');
setTimeout(function () {
  console.log('setTimeout');
}, 0);
async1();
new Promise(function (resolve) {
  console.log('promise1');
  resolve();
}).then(function () {
  console.log('promise2');
});
console.log('script end');
```

### 说说浏览器和 Node 事件循环的区别

### 介绍下如何实现 token 加密

### 二维码的原理

### ES6 代码转成 ES5 代码的实现思路是什么

### 数组里面有 10 万个数据，取第一个元素和第 10 万个元素的时间相差多少

### 实现模糊搜索结果的关键词高亮显示

### 设计并实现 Promise.race()

### 在输入框中如何判断输入的是一个正确的网址。

### requestIdleCallback

```javascript
// requestIdleCallback 维护一个队列，将在浏览器空闲时间内执行。它属于 Background Tasks API，你可以使用 setTimeout 来模拟实现

window.requestIdleCallback =
  window.requestIdleCallback ||
  function (handler) {
    let startTime = Date.now();

    return setTimeout(function () {
      handler({
        didTimeout: false,
        timeRemaining: function () {
          return Math.max(0, 50.0 - (Date.now() - startTime));
        },
      });
    }, 1);
  };
```

以上实现过于复杂以及细节化，也可以像 swr 一样做一个简单的模拟实现，以下代码见 https://github.com/vercel/swr/blob/8670be8072b0c223bc1c040deccd2e69e8978aad/src/use-swr.ts#L33

const rIC = window['requestIdleCallback'] || (f => setTimeout(f, 1))
在 rIC 中执行任务时需要注意以下几点：

执行重计算而非紧急任务
空闲回调执行时间应该小于 50ms，最好更少
空闲回调中不要操作 DOM，因为它本来就是利用的重排重绘后的间隙空闲时间，重新操作 DOM 又会造成重排重绘
React 的时间分片便是基于类似 rIC 而实现，然而因为 rIC 的兼容性及 50ms 流畅问题，React 自制了一个实现: scheduler

use-swr 中进行资源的 revalidate 时，也是通过 rIC 来提高性能

### v8 是如何执行一段 JS 代码的

### 如何实现页面文本不可复制

```css
user-select: none;
```

或

```javascript
document.body.onselectstart = (e) => {
  e.preventDefault();
};

document.body.oncopy = (e) => {
  e.preventDefault();
};
```

### typeof 与 instanceof 的区别

### 如何计算白屏时间和首屏时间

### Object.keys 与 Object.getOwnPropertyNames() 有何区别

### ### 什么是 Data URL

Data URL 是将图片转换为 base64 直接嵌入到了网页中，使用`<img src="data:[MIME type];base64"/>`这种方式引用图片，不需要再发请求获取图片。 使用 Data URL 也有一些缺点：

- base64 编码后的图片会比原来的体积大三分之一左右。
- Data URL 形式的图片不会缓存下来，每次访问页面都要被下载一次。可以将 Data URL 写入到 CSS 文件中随着 CSS 被缓存下来。

### 如何监听 localStorage 的变动

### 浏览器中如何实现剪切板复制内容的功能

### 在前端开发中，如何获取浏览器的唯一标识

### 代码压缩的原理是什么

### 在 js 中如何把类数组转化为数组

### 简述你们前端项目中资源的缓存配置策略

### 当 cookie 没有设置 maxage 时，cookie 会存在多久

### 图片防盗链原理是什么

### CSS 会阻塞 DOM 解析吗？

css 加载不会阻塞 DOM 树的解析
css 加载会阻塞 DOM 树的渲染
css 加载会阻塞后面 js 语句的执行

[详细解析](https://cloud.tencent.com/developer/article/1370715)

### Promise.prototype.finally 的作用，如何自己实现 Promise.prototype.finally

```javascript
// Promise.prototype.finally() 是 ES2018 新增的特性，它回一个 Promise ，在 promise 结束时，无论 Promise 运行成功还是失败，都会运行 finally ，类似于我们常用的  try {...} catch {...} finally {...}

// Promise.prototype.finally() 避免了同样的语句需要在 then() 和 catch() 中各写一次的情况

new Promise((resolve, reject) => {
  setTimeout(() => resolve('result'), 2000);
})
  .then((result) => console.log(result))
  .finally(() => console.log('Promise end'));

// result
// Promise end

new Promise((resolve, reject) => {
  throw new Error('error');
})
  .catch((err) => console.log(err))
  .finally(() => console.log('Promise end'));

// Error: error
// Promise end

// 注意：

// - finally 没有参数
// - finally 会将结果和 error 传递

new Promise((resolve, reject) => {
  setTimeout(() => resolve('result'), 2000);
})
  .finally(() => console.log('Promise ready'))
  .then((result) => console.log(result));

// Promise ready
// result

// 手写一个 Promise.prototype.finally(), 不管 Promise 对象最后状态如何，都会执行的操作

MyPromise.prototype.finally = function (cb) {
  return this.then(
    function (value) {
      return MyPromise.resolve(cb()).then(function () {
        return value;
      });
    },
    function (err) {
      return MyPromise.resolve(cb()).then(function () {
        throw err;
      });
    },
  );
};
```

### Promise.any 的作用，如何自己实现 Promise.any

- Promise.any 的作用
- Promise.any 应用场景
- Promise.any vs Promise.all
- Promise.any vs Promise.race
- 手写 Promise.any 实现

Promise.any() 是 ES2021 新增的特性，它接收一个 Promise 可迭代对象（例如数组），

```javascript
const promises = [
  Promise.reject('ERROR A'),
  Promise.reject('ERROR B'),
  Promise.resolve('result'),
];

Promise.any(promises)
  .then((value) => {
    console.log('value: ', value);
  })
  .catch((err) => {
    console.log('err: ', err);
  });

// value:  result
```

如果所有传入的 promises 都失败：

```javascript
const promises = [
  Promise.reject('ERROR A'),
  Promise.reject('ERROR B'),
  Promise.reject('ERROR C'),
];

Promise.any(promises)
  .then((value) => {
    console.log('value：', value);
  })
  .catch((err) => {
    console.log('err：', err);
    console.log(err.message);
    console.log(err.name);
    console.log(err.errors);
  });

// err： AggregateError: All promises were rejected
// All promises were rejected
// AggregateError
// ["ERROR A", "ERROR B", "ERROR C"]
```

Promise.any 实现

Promise.any 只要传入的 promise 有一个是 fullfilled 则立即 resolve 出去，否则将所有 reject 结果收集起来并返回 AggregateError

```javascript
MyPromise.any = function (promises) {
  return new Promise((resolve, reject) => {
    promises = Array.isArray(promises) ? promises : [];
    let len = promises.length;
    // 用于收集所有 reject
    let errs = [];
    // 如果传入的是一个空数组，那么就直接返回 AggregateError
    if (len === 0)
      return reject(new AggregateError('All promises were rejected'));
    promises.forEach((promise) => {
      promise.then(
        (value) => {
          resolve(value);
        },
        (err) => {
          len--;
          errs.push(err);
          if (len === 0) {
            reject(new AggregateError(errs));
          }
        },
      );
    });
  });
};
```

### 如何监听网页崩溃

### 讲下 V8 sort 的大概思路，并手写一个 sort 的实现

[详细解析](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/472)

### 闭包的使用场景，使用闭包需要注意什么？

[详细解析](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/453)

### typeof 可以判断哪些类型？instanceof 做了什么？null 为什么被 typeof 错误的判断为了'object'

[详细解析](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/452)

### babel 怎么把字符串解析成 AST，是怎么进行词法/语法分析的？

大致分为下面四步：

- input => tokenizer => tokens，先对输入代码进行分词，根据最小有效语法单元，对字符串进行切割。
- tokens => parser => AST，然后进行语法分析，会涉及到读取、暂存、回溯、暂存点销毁等操作。
- AST => transformer => newAST，然后转换生成新的 AST。
- newAST => codeGenerator => output，最后根据新生成的 AST 输出目标代码。

[具体见下方链接文件的代码：](https://github.com/caiyongmin/awesome-coding-javascript/tree/master/src/bundler/babel)
[详细解析](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/315)

### 何在 H5 和小程序项目中计算白屏时间和首屏时间，说说你的思路

[详细解析](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/272)

### 闭包

[闭包详细解析](https://segmentfault.com/a/1190000021725949)

### 浅拷贝、深拷贝

```javascript
// 浅克隆
// Object.assign()

// ...

// 深克隆

function isObject(o) {
  return o !== null && (typeof o === 'object' || typeof o === 'function');
}

function deepClone(obj) {
  if (!isObject(obj)) {
    throw new TypeError('Parameter is not a reference type!');
  }
  const isArray = Array.isArray(obj);
  const newObj = isArray ? [...obj] : { ...obj };
  Reflect.ownKeys(newObj).forEach((key) => {
    newObj[key] = isObject(newObj[key]) ? deepClone(newObj[key]) : newObj[key];
  });

  return newObj;
}
```

### 继承

继承的几种方式

- 原型链实现继承

```javascript
// 通过重写子类的原型，并将它指向父类的手段实现。这种方式实现的继承，创建出来的实例既是子类的实例，又是父类的实例。它有如下几种缺陷：
//
// 1、不能向父类构造函数传参
// 2、父类上的引用类型属性会被所有实例共享，其中一个实例改变时，会影响其他实例

function Animal() {
  this.colors = ['red', 'blue'];
}
function Dog(name) {
  this.name = name;
}
Dog.prototype = new Animal();

var dog1 = new Dog('旺财');
var dog2 = new Dog('钢镚');
dog2.colors.push('yellow');
console.log(dog1.colors); // ["red", "blue", "yellow"]
console.log(dog2.colors); // ["red", "blue", "yellow"]

console.log(dog1 instanceof Dog); // true
console.log(dog1 instanceof Animal); // true
```

- 借用构造函数实现继承

```javascript
// 借用构造函数实现继承，通过在子类中使用call()方法，实现借用父类构造函数并向父类构造函数传参的目的。但这种方法，无法继承父类原型对象上的属性和方法。

function Animal(name) {
  this.name = name;
  this.colors = ['red', 'blue'];
}
Animal.prototype.eat = function () {
  console.log(this.name + ' is eating!');
};
function Dog(name) {
  Animal.call(this, name);
}

var dog1 = new Dog('旺财');
var dog2 = new Dog('钢镚');
dog2.colors.push('yellow');

console.log(dog1.colors); // ["red", "blue"]
console.log(dog2.colors); // ["red", "blue", "yellow"]

console.log(dog1 instanceof Dog); // true
console.log(dog2 instanceof Animal); // false

console.log(dog1.eat()); // 报错
```

- 组合函数实现继承

```javascript
// 组合继承是组合了原型链继承和借用构造函数继承这两种方法，它保留了两种继承方式的优点，但它并不是百分百完美的：
// 1、父类构造函数被调用多次。

function Animal(name) {
  this.name = name;
  this.colors = ['red', 'blue'];
  console.log('执行几次');
}
Animal.prototype.eat = function () {
  console.log(this.name + ' is eatting');
};
function Dog(name) {
  Animal.call(this, name);
}
Dog.prototype = new Animal(); // 第一次调用
var dog1 = new Dog('dog1'); // 第二次调用
var dog2 = new Dog('dog2'); // 第三次调用
dog1.colors.push('yellow');
console.log(dog1.name); // 输出dog1
console.log(dog2.colors); // 输出['red','blue']
console.log(dog2.eat()); // 输出dog2 is eatting
```

- 寄生组合继承

```javascript
// 寄生组合继承是在组合继承的基础上，采用Object.create()方法来改造实现

function Animal(name) {
  this.name = name;
  this.colors = ['red', 'blue'];
}
Animal.prototype.eat = function () {
  console.log(this.name + ' is eatting');
};
function Dog(name) {
  Animal.call(this, name);
}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
var dog1 = new Dog('dog1');
var dog2 = new Dog('dog2');
dog1.colors.push('yellow');
console.log(dog1.name); // 输出dog1
console.log(dog2.colors); // 输出['red','blue']
console.log(dog2.eat()); // 输出dog2 is eatting
```

- 类继承

```javascript
// 运用ES6 class新特性来实现继承

class Animal {
  constructor(name) {
    this.name = name;
    this.colors = ['red', 'blue'];
  }
  eat() {
    console.log(this.name + ' is eatting');
  }
}
class Dog extends Animal {
  constructor(name) {
    super(name);
  }
}
var dog1 = new Dog('dog1');
var dog2 = new Dog('dog2');
dog1.colors.push('yellow');
console.log(dog1.name); // 输出dog1
console.log(dog2.colors); // 输出['red','blue']
console.log(dog2.eat()); // 输出dog2 is eatting
```

### Map

> Map 结构： 对象是创建无序键值对数据结构映射的主要机制，在 ES6 之前，对象的属性只能是字符串，在 ES6 之后，Map 结构允许使用对象、数组等作为键。Map 结构的方法或者属性如下：

- set()：新增一个 map 结构的数据
- get(key)：根据键获取值
- size：获取 map 结构的长度
- delete(key)：根据指定的键删除
- has(key)：判断指定的键是否存在于 map 结构中
- keys()遍历，values()遍历，entries()键值对遍历
- clear()清空 map 结构

```javascript
// Map结构
const map = new Map();
const x = { id: 1 },
  y = { id: 2 };

// 设置map数据
map.set(x, 'bar');
map.set(y, 'foo');

// 获取map数据
console.log(map.get(x)); // 输出bar
console.log(map.get(y)); // 输出foo

// 获取map结构的长度
console.log(map.size); // 输出2

// 根据指定键删除map数据
map.delete(x);

// 根据指定的键判断是否存在于map结构中
console.log(map.has(x)); // 输出false

// 遍历map键
for (const key of map.keys()) {
  console.log(key); // 输出{id:2}
}

// 遍历map值
for (const value of map.values()) {
  console.log(value); // 输出foo
}

// 遍历map键值对
for (const item of map.entries()) {
  console.log(item[0]); // 输出y
  console.log(item[1]); // 输出{id:2}
}
```

### Set

> Set 是一个集合，它里面的值是唯一的，重复添加会被忽略(Set 结构不允许强制类型转换，1 和"1"被认为是两个不同的值)。Set 结构的方法和属性如下：

- add()：添加新值
- size：获取 Set 结构的长度
- delete()：根据指定的键删除
- has()：判断指定的键是否存在 Set 集合中
- keys()遍历、values()遍历、entries()遍历
- clear()：清空 Set 结构

```javascript
// Set结构
const set = new Set();
const x = { id: 1 };
const y = { id: 2 };
const a = 1;
const b = '1';
const c = true;

// 添加Set数据
set.add(x);
set.add(y);
set.add(a);
set.add(b);
set.add(c);

// 获取Set数据的长度
console.log(set.size); // 输出5

// 删除Set数据
set.delete(c);

// 判断某个值是否存在Set结构中
console.log(set.has(c)); // 输出false

// 遍历Set的键
for (const key of set.keys()) {
  console.log(key); // 输出{id：1} {id:2} 1 "1"
}

// 遍历Set的值
for (const value of set.values()) {
  console.log(value); // 输出{id:1} {id:2} 1 "1"
}

// 遍历Set的键值对
for (const item of set.entries()) {
  console.log(item[0]); // 输出 {id:1} {id:2} 1 "1"
  console.log(item[1]); // 输出 {id:1} {id:2} 1 "1"
}

// Set集合的运用：数组的去重、并集、交集、差集
const arr1 = [1, 2, 1, 3, 4, 5];
const arr2 = [4, 5, 6, 7];

// 去重：输出1,2,3,4,5
console.log(Array.from(new Set(arr1)));

// 并集：输出1,2,3,4,5,6,7
const union = Array.from(new Set([...set1, ...set2]));
console.log(union);

// 交集：输出4,5
const intec = Array.from(new Set(arr.filter((x) => arr1.includes(x))));
console.log(intec);

// 差集
const diff1 = Array.from(new Set(arr1.filter((x) => !arr2.includes(x))));
const diff2 = Array.from(new Set(arr2.filter((x) => !arr1.includes(x))));
console.log(diff1); // 输出：1,2,3
console.log(diff2); // 输出：6,7
```

### Proxy

在 Vue2.0+的版本中，Vue 使用 Object.definedProperty()方法来实现数据的响应式，在 Vue3.0 的开发计划中，作者计划使用 ES6 新增加的 Proxy 代理来实现数据的响应式，它相比于 Object.definedProperty()有如下几个特点：

- Proxy 可以一次性为所有属性实现代理，无需遍历，性能更佳
- Proxy 能监听到以前使用 Object.definedProperty()监听不到的数据变动。
- 由于是 ES6 新增加的特性，所以浏览器兼容性方面比 Object.definedProperty()差

```javascript
const onWatch = function (obj, setBind, getLogger) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      getLogger(target, property);
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      setBind(value, property);
      return Reflect.set(target, property, value);
    },
  });
};

let obj = { a: 1 };
let p = onWatch(
  obj,
  (value, property) => {
    console.log(`监听到${property}属性的改变，其值为${value}`);
  },
  (target, property) => {
    console.log(`监听到获取属性${property},其值为${target[property]}`);
  },
);
p.a = 2; // 监听到a属性的改变，其值为2
console.log(a); // 监听到获取属性a,其值为2
```

### 数组的 map、filter 和 reduce 的区别

map： map 方法的作用是生成一个新数组(把原数组中的所有元素做一些变动，放进新数组中)

```javascript
const newArr = [1, 2, 3].map((v) => v * 2);
console.log(newArr); // 输出[2,4,6];
```

filter： filter 方法的作用是从原数组中过滤出符合条件的元素，并生成一个新数组

```javascript
const newArr = [1, 2, 3, 4, 5, 6].filter((item) => item % 2 == 0);
console.log(newArr); // 输出[2,4,6];
```

reduce： reduce 方法的作用是通过回调函数的形式，把原数组中的元素最终转换成一个值，第一个参数是回调函数，第二个参数是初始值

```javascript
const arr = [1, 2, 3, 4, 5, 6];
const sum = arr.reduce((account, current) => {
  return account + current;
}, 0);
console.log(sum); // 21
```

### JavaScript 异步

- 回调函数

- Generator

在 ES6 之前，一个函数一旦执行将不会被中断，一直到函数执行完毕，在 ES6 之后，由于 Generator 的存在，函数可以暂停自身，待到合适的机会再次执行。用 Generator 可以解决回调地狱。

```javascript
function* fetch() {
  yield ajax(url, () => {
    console.log('这里是首次回调函数');
  });
  yield ajax(url, () => {
    console.log('这里是第二次回调函数');
  });
  yield ajax(url, () => {
    console.log('这里是第三次回调函数');
  });
}
var it = fetch();
var result1 = it.next();
var result2 = it.next();
var result3 = it.next();
```

- Promise

Promise 翻译过来就是承诺的意思，Promise 一共有三种状态：pending(等待中)、resolve(完成)和 reject(拒绝)，这个承诺意味着在将来一定会有一个表决，并且只能表决一次，表决的状态一定是 resolve(完成)或者 reject(拒绝)，一个 Promise 可能会是如下的形式：

```javascript
// 普通的Promise
function foo() {
  return new Promise((resolve, reject) => {
    // 第一次表决有效，其后无论是resolve()还是reject()都无效
    resolve(true);
    resolve(false);
  });
}

// Promise解决回调地狱
ajax(url)
  .then((res) => {
    console.log('这里是首次回调函数');
  })
  .then((res) => {
    console.log('这里是第二次回调函数');
  })
  .then((res) => {
    console.log('这里是第三次回调函数');
  });
```

Promise.all()

Promise.all()方法是把一个或者几个 Promise 组合在一个数组里，只有当数组中的所有 Promise 全部表决完成，才返回。

```javascript
var p1 = Promise.resolve(1);
var p2 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(2);
  }, 100);
});
var p3 = 3;
Promise.all([p1, p2, p3]).then((res) => {
  console.log(res); // 输出[1,2,3]
});
```

Promise.race()

Promise.race()方法把一个或者几个 Promise 组合在一个数组里，只要数组中有一个表决了，就返回。

```javascript
var p1 = Promise.resolve(1);
var p2 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(2);
  }, 100);
});
var p3 = 3;
Promise.race([p2, p1, p3]).then((res) => {
  console.log(res); // 输出1
});
```

### 进程和线程

JavaScript 是单线程执行的，在 JavaScript 运行期间，有可能会阻塞 UI 渲染，这在一方面说明 JavaScript 引擎线程和 UI 渲染线程是互斥的。JavaScript 被设计成单线程的原因在于，JavaScript 可以修改 DOM，如果在 JavaScript 工作期间，UI 还在渲染的话，则可能不会正确渲染 DOM。单线程也有一些好处，如下：

- 节省内存空间
- 节省上下文切换时间
- 没有锁的问题存在

进程： CPU 在运行指令及加载和保存上下文所需的时间，放在应用上一个程序就是一个进程，一个浏览器 tab 选项卡就是一个进程
线程： 线程是进程中更小的单位，描述了执行一段指令所需的时间。

### 什么是执行栈？

可以把执行栈看成是一个存储函数调用的栈结构，遵循先进后出的原则，一个执行栈可能表现如下：

### EventLoop

上面讲到函数会在执行栈中执行，那么当遇到异步代码后，该如何处理呢？其实当遇到异步代码的时候，会被挂起在 Task 队列中，一旦执行栈为空，就会从 Task 中拿出需要执行的代码执行，所以本质上讲 JS 中的异步还是同步行为。

![EventLoop](https://cdn.jsdelivr.net/gh/TheFirstSunday/gallery@main/images/event-loop.png)

如上图，可以看到，不同的异步任务是有区别的，异步任务又可以划分如下：

- 宏任务(script、setTimeout、setInterval、setImmidiate、I/O、UI Rendering)可以有多个队列
- 微任务(process.nextTick、Promise.then、Object.observe、mutataionObserver)只能有一个队列

执行顺序： 当执行栈执行完毕后，会首先执行微任务队列，当微任务队列执行完毕再从宏任务中读取并执行，当再次遇到微任务时，放入微任务队列。

```javascript
setTimeout(() => {
  console.log(1);
  Promise.resolve().then(() => {
    console.log(2);
  });
}, 0);
setTimeout(() => {
  console.log(3);
}, 0);
Promise.resolve().then(() => {
  console.log(4);
});
console.log(5);
// 输出结果：5 4 1 2 3

// 代码分析：
//
// 1.console.log(5)是唯一的同步任务，首先执行，输出5
// 2.将所有异步任务放在Task队列中，挂起
// 3.同步任务执行完毕，开始执行微任务队列，即Promise.then，输出4
// 4.微任务队列执行完毕，执行宏任务队列setTimeout
// 5.宏任务队列中首先执行同步任务，再次遇到微任务，放入微任务队列中，输出1
// 6.同步任务执行完毕，执行微任务队列，输出2
// 7.微任务队列执行完毕，执行宏任务队列setTimeout，输出3
```

[EventLoop](https://juejin.cn/post/6979876135182008357)
[EventLoop 详细解析](https://zhuanlan.zhihu.com/p/72507900)

### 浏览器渲染原理

### 异步加载 js 脚本的方法有哪些?

```javascript
// defer 属性& anync

// 指定 async 属性的目的是不让页面等待两个脚本下载和执行，从而异步加载页面其他内容。 为此，建议异步脚本不要在加载期间修改 DOM。
// 执行顺序：让脚本在加载完可用时立即执行,异步脚本一定会在页面的 load 事件前执行，但可能会在 DOMContentLoaded 事件触发之前或之后执行。

// defer
// 执行顺序：在dom加载完毕后执行，defer脚本的执行会在window.onload之前，其他没有添加defer属性的script标签之后

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>defer</title>
    <script>
        window.onload = function() {
            console.log("window.onload");
        }
    </script>
    <script src="./defer.js" defer></script>
   <script src="./defer.js" async></script>
</head>
<body>
    
</body>
</html>
```

```javascript
// 动态的创建js

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>defer</title>
    <script>
        window.onload = function() {
            console.log("window.onload");
        }
    </script>
    <script src="./defer.js" defer></script>
   <script src="./defer.js" async></script>
</head>
<body>
    
</body>
</html>
```

```javascript
// 动态的创建js

(function(){
   var dom = document.createElement('script');
   dom.type ='text/javascript';
   dom.async = true;
   dom.src= 'file.js';
   head = document.getElementsByTagName('head')[0];
   head.insertBefore(dom,head.firstChild)
})()
```

```javascript
// XHR

let xhr  =  new XMLHttpRequest();
xhr.open('get','index.js',true)
xhr.send();
xhr.onreadystatechange = function() {
   if(xhr.readyState == 4 && xhr.status == 200){
         console.log(xhr.responseText);
   }
}
```

### for in 与 for of 的区别?

- for in只能遍历可枚举属性(包括原型链上的属性)
- for of 遍历可迭代对象(Array，Map，Set，String，TypedArray，arguments 对象等等)

for of不可以遍历普通对象，想要遍历对象的属性，可以用for in循环, 或内建的Object.keys()方法


### document.ready和window.onload的区别

- 文档就绪函数: 表示文档结构已经加载完成（不包含图片等非文字媒体文件)
- onload的区别: 在页面所有资源加载完后执行

### 12种数组遍历方法

[详细解析](https://segmentfault.com/a/1190000038350134)
