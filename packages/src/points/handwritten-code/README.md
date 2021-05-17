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
