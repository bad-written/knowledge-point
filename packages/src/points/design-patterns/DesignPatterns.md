---
title: Design-patterns
order: 13
nav:
  path: /points
---

# Design Patterns

---

## points

### 单例模式

```javascript
// 单例模式：保证一个类有且仅有一个实例，并提供一个访问它的全局访问点

class Singleton {
  constructor(name) {
    this.name = name;
    this.instance = null;
  }
  getName = function () {
    return this.name;
  };
}
Singleton.getInstance = function (name) {
  if (!this.instance) {
    this.instance = new Singleton(name);
  }
  return this.instance;
};

const s1 = Singleton.getInstance('s1');
const s2 = Singleton.getInstance('s1');

// true
s1 === s2;
```

### 观察-订阅者模式 与 观察者模式的区别
