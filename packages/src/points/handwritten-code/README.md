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

const isComplexDataType = () =>
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

- 深拷贝
- 防抖、节流
- Promise
- 发布订阅模式
- 观察者模式
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

- promise

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
