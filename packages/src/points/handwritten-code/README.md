---
title: Handwritten-code
order: 12
nav:
  path: /points
---

# HandwrittenCode

---

## points

- call、apply、bind
- new
- sleep
- instanceof
- getType
- 防抖、节流
- 柯里化
- 深拷贝
- 防抖、节流
- Promise
- 发布订阅模式
- 观察者模式
- 信号灯控制器
  <code src="./TrafficLight.tsx"></code>
- 归并排序
- 快速排序
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
- 选择排序
- 快速排序
- 归并排序
- 实现链表
- 计算多个区间的交集
```javascript

    /**
     * 1.计算多个区间的交集
     *   区间用长度为2的数字数组表示，如[2, 5]表示区间2到5（包括2和5）；
     *   区间不限定方向，如[5, 2]等同于[2, 5]；
     *   实现`getIntersection 函数`
     *   可接收多个区间，并返回所有区间的交集（用区间表示），如空集用null表示
     * 示例：
     *   getIntersection([5, 2], [4, 9], [3, 6]); // [4, 5]
     *   getIntersection([1, 7], [8, 9]); // null
     */
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

- // 3.请使用原生代码实现一个Events模块，可以实现自定义事件的订阅、触发、移除功能

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

- 手写 Promise.all
- 实现颜色转换 'rgb(255, 255, 255)' -> '#FFFFFF'
- 简单实现一个 LRU
