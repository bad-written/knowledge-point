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
- 三者第一个参数都是 this 要指向的对象，如果如果没有这个参数或参数为 undefined 或 null，则默认指向全局 window。
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
- `Object.getOwnPropertySymbols()` 返回一个数组，包含对象自身的所有 Symbol 属性的键名。
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

### require 与 import 的区别

### EventLoop

### 从输入 URL 到页面加载完成的过程

### 同源策略

### 跨域

### JSONP

### 自定义事件

### 事件委托

### 事件流

### target 和 currentTarget 区别

- target 返回触发事件的元素
- currentTarget 返回绑定事件的元素

### 闭包

### Garbage Collection

### 柯里化

### new 操作符做了什么

### JavaScript 中的 this

### preload、prefetch

### window.onload 和 DOMContentLoaded 的区别

### source-map 的原理

### 动态表单能够运用在什么场景？

### 实际场景中，哪些地方应用到了堆、链表、多叉树结构

### Promise 并发限制

### weakMap 和 Map 的区别，weakMap 原理，为什么能被 GC？

### 如何干扰 GC ？

### 帧数怎么计算？

### 如何避免数据被 iframe 截获

### 说下状态码、说下 304，什么情况会 304？协商缓存的头部字段？

### 同层渲染?

### Web Components

### Promise.all 如果有一个失败了如何处理

### canvas 与 svg 的区别

### attribute 和 property 的区别 attribute 和 property 的区别

### document.write 只能重绘整个页面。innerHTML 可以重绘页面的一部分

### cookie、session、localStorage、sessionStorage

### 长短轮询 websocket

### forEach 和 map 区别是什么

### 柯里化

### 并发与并行的区别？

### 什么是回调函数？回调函数有什么缺点？如何解决回调地狱问题？

### 什么是执行栈？

### Node 中的 Event Loop 和浏览器中的有什么区别？process.nexttick 执行顺序？

### fetch 和 xhr 有什么区别

### 图片懒加载原理是什么

### null 和 undefined 的区别

### Object 和 maps 的比较

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

### load 事件与 DomContentLoaded 事件的先后顺序

### 如何计算白屏时间和首屏时间

### Object.keys 与 Object.getOwnPropertyNames() 有何区别

### ### 什么是 Data URL

Data URL 是将图片转换为 base64 直接嵌入到了网页中，使用<img src="data:[MIME type];base64"/>这种方式引用图片，不需要再发请求获取图片。 使用 Data URL 也有一些缺点：

- base64 编码后的图片会比原来的体积大三分之一左右。
- Data URL 形式的图片不会缓存下来，每次访问页面都要被下载一次。可以将 Data URL 写入到 CSS 文件中随着 CSS 被缓存下来。

### 如何监听 localStorage 的变动
