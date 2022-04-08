---
title: Handwritten-code
order: 12
nav:
  path: /points
---

# HandwrittenCode

---

## points

### call、apply、bind

```javascript
// apply
Function.prototype.myApply = function (context = window, args) {
  context._fn = this;
  const result = context._fn(args);
  delete context._fn;
  return result;
};

// call
Function.prototype.myCall = function (context = windows, ...args) {
  context._fn = this;
  const result = context._fn(...args);
  delete context._fn;
  return result;
};

Function.prototype._bind = function (objThis, ...params) {
  const thisFn = this; // 存储源函数以及上方的params(函数参数)
  // 对返回的函数 secondParams 二次传参
  let fToBind = function (...secondParams) {
    const isNew = this instanceof fToBind; // this是否是fToBind的实例 也就是返回的fToBind是否通过new调用
    const context = isNew ? this : Object(objThis); // new调用就绑定到this上,否则就绑定到传入的objThis上
    return thisFn.call(context, ...params, ...secondParams); // 用call调用源函数绑定this的指向并传递参数,返回执行结果
  };
  if (thisFn.prototype) {
    // 复制源函数的prototype给fToBind 一些情况下函数没有prototype，比如箭头函数
    fToBind.prototype = Object.create(thisFn.prototype);
  }
  return fToBind; // 返回拷贝的函数
};
```

### new

```javascript
// 创建了一个全新的对象；
// 会被执行 [[Prototype]]（也就是 __proto__ ）链接；
// this 指向新创建的对象；
// 通过 new 创建的每个对象将最终被 [[Prototype]] 链接到这个函数的prototype对象上；
// 如果函数没有返回对象类型 Object(包含 Functoin , Array , Date , RegExg, Error)，那么 new 表达式中的函数调用将返回该对象引用。

const isComplexDataType = (type) =>
  ['object', 'function'].includes(typeof obj) && obj !== null;

const myNew = function () {
  const obj = new Object();
  const Constructor = [].shift.call(arguments);
  obj.__proto__ = Constructor.prototype;

  const ret = Constructor.apply(obj, arguments);
  return isComplexDataType(ret) ? ret : obj;
};

const myNew2 = (fn, ...rest) => {
  const instance = {};
  instance.__proto__ = fn.prototype;

  const res = fn.apply(instance, rest);
  return isComplexDataType(res) ? res : instance;
};

const myNew3 = (fn, ...rest) => {
    const obj = {};
    Object.setPrototypeOf(obj, fn.prototype);
    const res = fn.apply(obj, rest);

    return obj instanceof Object ? res : obj;
}
```

### sleep

```javascript
const sleep = (duration) => {
  const preDate = new Date();
  duration = isNaN(Number(duration)) ? 0 : Number(duration);
  while (true) {
    if (new Date() - preDate >= duration) return false;
  }
};

// promise
const sleepWithPromise = (duration) => {
  return new Promise((resolve, reject) => setTimeout(resolve, duration));
};

// Generator
function* sleepGenerator(time) {
  yield new Promise(function (resolve, reject) {
    setTimeout(resolve, time);
  });
}

console.log('睡眠 2 秒！');
console.time('Generator sleep');
// test()
sleepGenerator(2000)
  .next()
  .value.then(() => {
    console.timeEnd('Generator sleep');
  });
console.log('我在 sleep 之后！');
```

### instanceof

```javascript
const myInstanceOf = (left, right) => {
  left = left.__proto__;
  right = right.prototype;

  while (true) {
    if (left === null) return false;
    if (left === right) return true;
    left = left.__proto__;
  }
};

const instanceOf = (left, right) => {
    let proto = Object.getPrototypeOf(left);
    const prototype = right.prototype;
    
    while (true) {
        if(!proto) return false;
        if(proto === prototype) return true;
        proto = Object.getPrototypeOf(proto);
    }
}
```

### getType

```javascript
const getType = (data) => Object.prototype.toString.call(data).slice(8, -1);
```

### 柯里化

```javascript
// function curry(fn, args = []) {
//   const len = fn.length;
//
//   return function () {
//     args = args.concat([...arguments])
//     if (args.length < len) {
//       return curry(fn, args)
//     } else {
//       return fn(...args)
//     }
//   }
// }

const curry =
  (fn, arr = []) =>
  (...args) =>
    ((arg) => (arg.length === fn.length ? fn(...arg) : curry(fn, arg)))([
      ...arr,
      ...args,
    ]);
```

- 防抖、节流
- EventBus

```javascript
class Events {
  constructor() {
    this.events = new Map();
  }

  addEvent(key, fn, isOnce, ...args) {
    const value = this.events.get(key)
      ? this.events.get(key)
      : this.events.set(key, new Map()).get(key);
    value.set(fn, (...args1) => {
      fn(...args, ...args1);
      isOnce && this.off(key, fn);
    });
  }

  on(key, fn, ...args) {
    if (!fn) {
      console.error(`没有传入回调函数`);
      return;
    }
    this.addEvent(key, fn, false, ...args);
  }

  fire(key, ...args) {
    if (!this.events.get(key)) {
      console.warn(`没有 ${key} 事件`);
      return;
    }
    for (let [, cb] of this.events.get(key).entries()) {
      cb(...args);
    }
  }

  off(key, fn) {
    if (this.events.get(key)) {
      this.events.get(key).delete(fn);
    }
  }

  once(key, fn, ...args) {
    this.addEvent(key, fn, true, ...args);
  }
}
```

### Promise

```JavaScript

enum PROMISE_STATUS {
    PENDING,
    FULFILLED,
    REJECTED
}


class _Promise<T> {
    private status = PROMISE_STATUS.PENDING
    private value: T
    callbacks = []
    constructor(executor: (resolve: (value: T) => void, reject: (reason: any) => void) => void) {
        executor(this._resolve, this._reject)
    }

    then(onfulfilled: (value: T) => any, onrejected: (value: any) => any) {
        // 2.2.1
        onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : null;
        onrejected = typeof onrejected === 'function' ? onrejected : null;

        const nextPromise = new _Promise((nextResolve, nextReject) => {
            const _handle = () => {
                if (this.status === PROMISE_STATUS.FULFILLED) {
                    const x = (onfulfilled && onfulfilled(this.value))
                    this._resolvePromise(nextPromise, x, nextResolve, nextReject)
                }

                if (this.status === PROMISE_STATUS.REJECTED) {
                    if (onrejected) {
                        const x = onrejected(this.value)
                        this._resolvePromise(nextPromise, x, nextResolve, nextReject)
                    } else {
                        nextReject(this.value)
                    }
                }

            }
            const handle = () => {
                queueMicrotask(_handle)
            }
            if (this.status === PROMISE_STATUS.PENDING) {
                this.callbacks.push(handle)
            } else {
                handle()
            }

        });
        return nextPromise

    }

    private _resolve = (value) => {
        if (value === this) {
            throw new TypeError('A promise cannot be resolved with itself.');
        }
        if (this.status !== PROMISE_STATUS.PENDING) return;
        this.status = PROMISE_STATUS.FULFILLED;
        this.value = value;
        this.callbacks.forEach(fn => fn())
    }

    private _reject = (value) => {
        if (this.status !== PROMISE_STATUS.PENDING) return;
        this.status = PROMISE_STATUS.REJECTED;
        this.value = value
        this.callbacks.forEach(fn => fn())
    }

    private _resolvePromise = <T>(nextPromise: _Promise<T>, x: any, resolve, reject) => {

        // 2.3.1
        if (nextPromise === x) {
            return reject(new TypeError('The promise and the return value are the same'));
        }

        // 2.3.2
        if (x instanceof _Promise) {
            x.then(resolve, reject)
        }

        // 2.3.3
        if (typeof x === 'object' || typeof x === 'function') {
            if (x === null) {
                return resolve(x);
            }

            // 2.3.3.1
            let then;
            try {
                then = x.then;
            } catch (error) {
                return reject(error);
            }

            // 2.3.3.3
            if (typeof then === 'function') {
                let called = false;
                try {
                    then.call(x, y => {
                        if (called) return; // 2.3.3.3.4.1
                        called = true;
                        this._resolvePromise(nextPromise, y, resolve, reject)
                    }, r => {
                        if (called) return; // 2.3.3.3.4.1
                        called = true;
                        reject(r)
                    })
                } catch (e) {
                    if (called) return; // 2.3.3.3.4.1
                    // 2.3.3.3.4
                    reject(e)
                }
            } else {
                // 2.3.3.4
                resolve(x)
            }
        } else {
            // 2.3.4
            resolve(x);
        }

    }

    catch(onrejected) {
        return this.then(null, onrejected)
    }

    finally(cb) {
        return this.then(
            value => _Promise.resolve(cb()).then(() => value),
            reason => _Promise.resolve(cb()).then(() => { throw reason })
        );
    }

    abort() {
        this.callbacks = []
    }

    static resolve(value) {
        if (value instanceof _Promise) {
            return value;
        }

        return new _Promise(resolve => {
            resolve(value);
        });
    }

    static reject(reason) {
        return new _Promise((resolve, reject) => {
            reject(reason);
        });
    }

    static race(promises) {
        return new _Promise(function (resolve, reject) {
            if (!Array.isArray(promises)) {
                return reject(new TypeError('Promise.race accepts an array'));
            }
            for (var i = 0, len = promises.length; i < len; i++) {
                _Promise.resolve(promises[i]).then(resolve, reject);
            }
        });

    }

    static all(promises) {
        let result = [];
        let i = 0;

        return new _Promise((resolve, reject) => {
            const processValue = (index, value) => {
                result[index] = value;
                i++;
                if (i == promises.length) {
                    resolve(result);
                };
            };
            for (let index = 0; index < promises.length; index++) {
                promises[index].then(value => {
                    processValue(index, value);
                }, reject);
            };
        });
    }

    static allSettled(promises) {
        let result = []
        let i = 0;
        return new _Promise((resolve, reject) => {
            const processValue = (index, value, status: 'fulfilled' | 'rejected') => {
                result[index] = { status, value }
                i++;
                if (i == promises.length) {
                    resolve(result);
                };
            };


            for (let index = 0; index < promises.length; index++) {
                promises[index].then(value => {
                    processValue(index, value, 'fulfilled')
                }, value => {
                    processValue(index, value, 'rejected')
                });
            };
        })
    }

}

(_Promise as any).deferred = function () {
    let dfd = {} as any;
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
}

module.exports = _Promise;
```

- DOM 的体积过大会影响页面性能，假如你想在用户关闭页面时统计（计算并反馈给服务器）

```javascript
    /**
     * 2.DOM 的体积过大会影响页面性能，假如你想在用户关闭页面时统计（计算并反馈给服务器）
     当前页面中元素节点的数量总和、元素节点的最大嵌套深度以及最大子元素个数，请用 JS 配合
     原生 DOM API 实现该需求（不用考虑陈旧浏览器以及在现代浏览器中的兼容性，可以使用任意
     浏览器的最新特性；不用考虑 shadow DOM）。比如在如下页面中运行后：
     */

    <html>
      <head></head>
      <body>
        <div>
          <span>f</span>
          <span>o</span>
          <span>o</span>
        </div>
      </body>
    </html>
    会输出：

    {
      totalElementsCount: 7,
      maxDOMTreeDepth: 4,
      maxChildrenCount: 3
    }

```

- // 请使用原生代码实现一个 Events 模块，可以实现自定义事件的订阅、触发、移除功能

```javascript
/*
    const fn1 = (... args)=>console.log('I want sleep1', ... args)
    const fn2 = (... args)=>console.log('I want sleep2', ... args)
    const event = new Events();
    event.on('sleep', fn1, 1, 2, 3);
    event.on('sleep', fn2, 1, 2, 3);
    event.fire('sleep', 4, 5, 6);
    // I want sleep1 1 2 3 4 5 6
    // I want sleep2 1 2 3 4 5 6
    event.off('sleep', fn1);
    event.once('sleep', ()=>console.log('I want sleep));
    event.fire('sleep');
    */
```

### 手写 Promise.all

```javascript
//手写promise.all
Promise.prototype._all = (promiseList) => {
  // 当输入的是一个promise列表
  const len = promiseList.length;
  const result = [];
  let count = 0;
  //
  return new Promise((resolve, reject) => {
    // 循环遍历promise列表中的promise事件
    for (let i = 0; i < len; i++) {
      // 遍历到第i个promise事件，判断其事件是成功还是失败
      promiseList[i].then(
        (data) => {
          result[i] = data;
          count++;
          // 当遍历到最后一个promise时，结果的数组长度和promise列表长度一致，说明成功
          count === len && resolve(result);
        },
        (error) => {
          return reject(error);
        },
      );
    }
  });
};
```

### 手写 Promise.race

```javascript
// 手写promise.race
Promise.prototype._race = (promiseList) => {
  const len = promiseList.length;
  return new Promise((resolve, reject) => {
    // 循环遍历promise列表中的promise事件
    for (let i = 0; i < len; i++) {
      promiseList[i]().then(
        (data) => {
          return resolve(data);
        },
        (error) => {
          return reject(error);
        },
      );
    }
  });
};
```

### Promise.finally

```javascript
Promise.prototype._finally = function (promiseFunc) {
  return this.then(
    (data) => Promise.resolve(promiseFunc()).then((data) => data),
    (error) =>
      Promise.reject(promiseFunc()).then((error) => {
        throw error;
      }),
  );
};
```

### 手写 Aysnc/Await

```javascript
function asyncGenertor(genFunc) {
  return new Promise((resolve, reject) => {
    // 生成一个迭代器
    const gen = genFunc();
    const step = (type, args) => {
      let next;
      try {
        next = gen[type](args);
      } catch (e) {
        return reject(e);
      }
      // 从next中获取done和value的值
      const { done, value } = next;
      // 如果迭代器的状态是true
      if (done) return resolve(value);
      Promise.resolve(value).then(
        (val) => step('next', val),
        (err) => step('throw', err),
      );
    };
    step('next');
  });
}
```

### 简易的 CO 模块(自执行 generator)

### 图片懒加载(getBoundingClientRect/intersectionObserver)

### Object.assign

### new koa2 中间件原理 koa-compose

### 如何把一个字符串的大小写取反（大写变小写小写变大写），例如 ’AbC' 变成 'aBc' 。

### 实现一个字符串匹配算法，从长度为 n 的字符串 S 中，查找是否存在字符串 T，T 的长度是 m，若存在返回所在位置。

### 实现一个 once 函数，记忆返回结果只执行一次

```javascript
function once(f) {
  let result;
  let revoked = false;

  return (...args) => {
    if (revoked) return result;
    const r = f(...args);
    revoked = true;
    result = r;
    return r;
  };
}
```

### 如何找到当前页面出现次数最多的 HTML 标签

```javascript
// 实现一个 maxBy 方便找出出现次数最多的 HTML 标签
const maxBy = (list, keyBy) =>
  list.reduce((x, y) => (keyBy(x) > keyBy(y) ? x : y));

function getFrequentTag() {
  const tags = [...document.querySelectorAll('*')]
    .map((x) => x.tagName)
    .reduce((o, tag) => {
      o[tag] = o[tag] ? o[tag] + 1 : 1;
      return o;
    }, {});
  return maxBy(Object.entries(tags), (tag) => tag[1]);
}
```

### 对以下字符进行压缩编码

- Input: 'aaaabbbccd'
- Output: 'a4b3c2d1'，代表 a 连续出现四次，b 连续出现三次，c 连续出现两次，d 连续出现一次

```javascript
function encode(str) {
  const l = [];
  let i = 0;
  for (const s of str) {
    const len = l.length;
    const lastChar = len > 0 ? l[len - 1][0] : undefined;
    if (lastChar === s) {
      l[len - 1][1]++;
    } else {
      l.push([s, 1]);
    }
  }
  return l.map((x) => x.join('')).join('');
}
```

### 实现一个函数用来对 URL 的 querystring 进行编码

```javascript
const data = {
  a: 3,
  b: 4,
  c: 5,
};

// 对 data 编码后得到 querystring 如下
const qs = 'a=3&b=4&c=5';

// 测试用例
// a=3&b=4
stringify({ a: 3, b: 4 });

// a=3&b=
stringify({ a: 3, b: null });

// a=3&%E5%B1%B1=%E6%9C%88
stringify({ a: 3, 山: '月' });
```

### 前端如何实现文件上传功能

### 给数字添加千位符

```javascript
function toString(number, thousandsSeperator = ',') {
  return String(number).replace(
    /(\d)(?=(\d\d\d)+(?!\d))/g,
    '$1' + thousandsSeperator,
  );
}
```

### 如何实现一个 flatMap 函数

### 如何用一行代码实现 compose 函数

### 如何实现类似 lodash.get 函数

### 如何裁剪图片 (情景：选择头像)

### 使用 js 实现一个 lru cache

### 如何实现 Promise.race

### 实现颜色转换 'rgb(255, 255, 255)' -> '#FFFFFF' 的多种思路

[详细解析](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/475)

### JS 异步笔试题，请写出下面代码的运行结果（哔哩哔哩）

[详细解析](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/471)

### 实现一个批量请求函数 multiRequest(urls, maxNum)

```javascript
function multiRequest(urls, maxNum) {
  const ret = [];
  let i = 0;
  let resolve;
  const promise = new Promise((r) => (resolve = r));
  const addTask = () => {
    if (i >= arr.length) {
      return resolve();
    }

    const task = request(urls[i++]).finally(() => {
      addTask();
    });
    ret.push(task);
  };

  while (i < maxNum) {
    addTask();
  }

  return promise.then(() => Promise.all(ret));
}

// 模拟请求
function request(url) {
  return new Promise((r) => {
    const time = Math.random() * 1000;
    setTimeout(() => r(url), time);
  });
}
```

### 实现一个 normalize 函数，能将输入的特定的字符串转化为特定的结构化数据

```javascript
// 字符串仅由小写字母和 [] 组成，且字符串不会包含多余的空格。
// 示例一: 'abc' --> {value: 'abc'}
// 示例二：'[abc[bcd[def]]]' --> {value: 'abc', children: {value: 'bcd', children: {value: 'def'}}}

const normalize = (str) => {
  var result = {};
  str
    .split(/[\[\]]/g)
    .filter(Boolean)
    .reduce((obj, item, index, a) => {
      obj.value = item;
      if (index !== a.length - 1) {
        return (obj.children = {});
      }
    }, result);
  return result;
};
```

### 如何实现骨架屏，说说你的思路

### 用 setTimeout 实现 setInterval，阐述实现的效果与 setInterval 的差异

```javascript

function mySetInterval() {
    const [handler, duration] = arguments;

    mySetInterval.timer = setTimeout(() => {
        handler();
        arguments.callee(...arguments)
    }, duration);
}

mySetInterval.clearInterval = function() {
  clearTimeout(mySetInterval.timer)
}

```

[详细解析](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/259)

### 考虑到性能问题，如何快速从一个巨大的数组中随机获取部分元素

[详细解析](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/187)

### 手写 getQueryString

```javascript
const url = 'https://www.baidu.com/s?id=123&name=why&phone=13876769797';
const getQueryString = (name) => {
  const index = url.split('?');
  if(index === -1) return undefined;
  const str = url.substring(index+ 1).split('&');
  for(const i = 0; i < str.length, i++) {
    const [key, value] = str[index].split('=');
    if(key === name) return value;
  }
}
```

### 手写事件委托

```javascript
<ul id="list"></ul>;

function loadNode(len) {
  var html = '';
  for (let index = 0; index < 10; index++) {
    html += '<li>' + index + '</li>';
  }
  var list = document.getElementById('list');
  list.onclick = function (event) {
    event = event || window.event;
    var target = event.target || event.srcElement;
    if (target.nodeName.toLowerCase() === 'li') {
      console.log(target.innerText);
    }
  };
  list.innerHTML = html;
}
loadNode();
```

### 实现一个简易的模板引擎

```javascript
const template = '嗨, {{ info.name.value }}您好, 今天是星期{{ day.value }}';

const data = {
  info: {
    name: {
      value: '张三',
    },
  },
  day: {
    value: '三',
  },
};

// const reg = new RegExp(/\{\s*\{\s*([\w.]+)\s*\}\s*\}/g);
const reg = new RegExp(/{\s*{\s*([\w.]+)\s*}\s*}/g);

function render(template, data = {}) {
  let newTemplate = template;
  const result = [...template.matchAll(reg)];

  result.forEach((info) => {
    const [replaceValue, strVariable] = info;
    let currentPoint = data;

    strVariable.split('.').forEach((key) => {
      if (!Object.hasOwnProperty.call(currentPoint, key)) {
        return '';
      }

      currentPoint = currentPoint[key];
    });

    newTemplate = newTemplate.replace(replaceValue, currentPoint);
  });

  return newTemplate;
}

render(template, data);
```

### 171、使用 TypeScript 语法将没有层级的扁平数据转换成树形结构的数据

```javascript
// 扁平数据

const data = [
  {
    name: '文本1',
    parent: null,
    id: 1,
  },
  {
    name: '文本2',
    id: 2,
    parent: 1,
  },
  {
    name: '文本3',
    parent: 2,
    id: 3,
  },
][
  // 树状数据
  {
    name: '文本1',
    id: 1,
    children: [
      {
        name: '文本2',
        id: 2,
        children: [
          {
            name: '文本3',
            id: 3,
          },
        ],
      },
    ],
  }
];

function translateDataToTree(data) {
  // 没有父节点的数据
  const parents = data.filter(({ parentId }) => !parentId);
  // 有父节点的数据
  const children = data.filter(({ parentId }) => !!parentId);

  // 定义转换方法的具体实现
  const translator = (parents, children) => {
    // 遍历父节点数据
    parents.forEach((parent) => {
      // 遍历子节点数据
      children.forEach((current, index) => {
        // 此时找到父节点对应的一个子节点
        if (current.parentId === parent.id) {
          // 对子节点数据进行深复制，这里只支持部分类型的数据深复制，对深复制不了解的童靴可以先去了解下深复制
          const temp = JSON.parse(JSON.stringify(children));
          // 让当前子节点从temp中移除，temp作为新的子节点数据，这里是为了让递归时，子节点的遍历次数更少，如果父子关系的层级越多，越有利
          temp.splice(index, 1);
          // 让当前子节点作为唯一的父节点，去递归查找其对应的子节点
          translator([current], temp);
          // 把找到子节点放入父节点的children属性中
          typeof parent.children !== 'undefined'
            ? parent.children.push(current)
            : (parent.children = [current]);
        }
      });
    });
  };

  // 调用转换方法
  translator(parents, children);

  // 返回最终的结果
  return parents;
}

translateDataToTree(data);
```

### promise 怎么实现链式调用跟返回不同的状态

```javascript
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  constructor(executor) {
    executor(this.resolve, this.reject);
  }
}
```

### trim

```javascript
function trim(str) {
  return str.replace(/^\s+|\s+$/gm, '');
}
```

### 常见手写代码集合

[一篇搞定前端高频手撕算法题](https://segmentfault.com/a/1190000025147080)
[66 道前端算法面试题附思路分析助你查漏补缺](https://segmentfault.com/a/1190000022425896)

### Promise 并发限制

[详细解析](https://www.jianshu.com/p/1010432be422)

### 实现模糊搜索结果的关键词高亮显示

### 设计并实现 Promise.race()

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

## get-element-by-id  => getElementById

``` javascript

const toUpperCase = (str) => {
  return str.replace(/-\w/g, function (c) { 
    return c.slice(1).toUpperCase();
  })
}
```

## 快排

```javascript
const quickSort = (array) => {
    if(array.length <= 1) return array;
    
    
    const mid = array[Math.floor(array.length / 2)];
    let leftArray, rightArray = [];
    for (let i = 0; i < array.length; i++) {
        if(array[i] < mid) {
          leftArray.push(array[i]);
        } else {
            rightArray.push(array[i]);
        }
    }
    
    return [...quickSort(leftArray), mid, quickSort(rightArray)];
}
```

### 合法的url

```javascript
const isValidUrl = (url) => {
    const reg = /^http(s)?:\/\/\w+/g;
    return reg.test(url);
}
```


### 实现Object.freeze


```javascript

const _objectFreeze = object => {
    // 补全代码
    let props = Object.getOwnPropertyNames(object)
    for (let prop of props) {
        const des = Object.getOwnPropertyDescriptor(object, prop)
        if (des.get || des.set) {
            Object.defineProperty(object, prop, {
                configurable: false,
                get: des.get,
                set: des.set
            })
        } else {
            Object.defineProperty(object, prop, {
                writable: false,
                configurable: false
            })
        }
    }
    return Object.preventExtensions(object)
    // return Object.seal(object)
}
```

### 深克隆

```javascript

const _completeDeepClone = (target, map = new Map()) => {
    // 补全代码
    //参数如果为空
    if(target===null) return target;
    //参数如果不是对象类型，而是基本数据类型
    if(typeof target!=='object') return target;
    //参数为其他数据类型
    const cons = target.constructor;
    if(/^(Function|RegExp|Date|Map|Set)$/i.test(cons)) return new cons(target);
    const cloneTarget = Array.isArray(target)? []:{};
    //如果存在循环引用,直接返回当前循环引用的值，否则，将其加入map,
    if(map.get(target)) return map.get(target);
    map.set(target,cloneTarget);
    for(let key in target){
        cloneTarget[key] = _completeDeepClone(target[key],map)
    }
    return cloneTarget;
}
```

### 实现flatten

### Promise 实现一个请求超时功能?

### 顺序发送4个请求a、b、c、d, 要求顺序输出?

### 实现一个 normalize 函数，能将输入的特定的字符串转化为特定的结构化数据

字符串仅由小写字母和 [] 组成，且字符串不会包含多余的空格。
示例一: 'abc' --> {value: 'abc'}
示例二：'[abc[bcd[def]]]' --> {value: 'abc', children: {value: 'bcd', children: {value: 'def'}}}

```javascript
const normalize = (str = '') => {
    const result = {};
    const array = str.split(/[\[\]]/g).filter(Boolean);
    const { length } = array;

    array.reduce((previousValue, currentValue, currentIndex) => {
      previousValue.value = currentValue;
      if(currentIndex !== length - 1) return (previousValue.children = {})
    }, result);
    
    return result;
}
```

### 实现indexOf

```javascript
// 数组、字符串
const NOT_INCLUDE = -1;

String.prototype.indexOf = function(string, start = 0) {
    if(typeof this !== 'string') throw new SyntaxError('SyntaxError, needs a string');
    const reg = new RegExp(`${string}`, 'ig');
    reg.lastIndex = start;
    const result = reg.exec(this);
    return result?.index ?? NOT_INCLUDE; 
}

Array.prototype.indexOf = function(item, start = 0) {
    if(!item) return NOT_INCLUDE;
    if(Array.isArray(this)) throw new SyntaxError('syntax error， needs an array!');
    for (let i = start; i < this.length; i++)
        
    return NOT_INCLUDE;
}

```

### 千位分隔符

```javascript

// 寻找字符空隙加 .
'10000000000'.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

// 寻找数字并在其后面加 . 
'10000000000'.replace(/(\d)(?=(\d{3})+\b)/g, '$1,')


function thousandSeparator(str, separator = ',') {
    return str.replace(/(\d)(?=(\d{3})+\b)/g, '$1,');
}
```

### 逆波兰表达式

```javascript

const SYMBOLS = ['+', '-', '*', '/'];

const evalRPN = function(tokens) {
    const stack = [];
    tokens.forEach((token) => {
        if(SYMBOLS.includes(token)) {
            let right = stack.pop();
            let left = stack.pop();
            switch(token) {
                case '+':
                    stack.push(left + right);
                    break;
                case '-':
                    stack.push(left - right);
                    break;
                case '*':
                    stack.push(left * right);
                    break;
                case '/':
                    stack.push(left / right | 0);
                    break;
            }
        } else {
            stack.push(Number(token));
        }
    });
    
    return stack[0];
}

const tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"];

console.log(evalRPN(tokens));
```
