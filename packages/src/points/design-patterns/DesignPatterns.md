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

> 保证一个类有且仅有一个实例，并提供一个访问它的全局访问点

```javascript

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

### 策略模式

> 定义：定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换

#### 优点

- 策略模式可以有效的避免多重条件选择语句
- 对**开闭原则**完美支持，易于切换、理解、扩展
- 增加复用性

#### 实现

**适用于* javascript* 的实现**

```javascript
const strategies = {
  S: function (salary) {
    return salary * 6;
  },
  A: function (salary) {
    return salary * 5;
  },
  B: function (salary) {
    return salary * 4;
  },
};

const calculateSalary = function (level, salary) {
  return strategies[level](salary);
};

console.log(calculateSalary('S', 20000));
console.log(calculateSalary('B', 10000));
```

#### 使用场景

- 表单验证
- 售卖类场景

```html
<html>
  ...
  <body>
    <form action="" id="registerForm" method="post">
      请输入用户名：<input type="text" name="userName"/ > 请输入密码：<input
      type="text" name="password"/ > 请输入手机号码：<input type="text"
      name="phoneNumber"/ >
      <button>提交</button>
    </form>
  </body>
  <script>
    /***************策略对象*****************/
    const strategies = {
      isNonEmpty: function (value, errorMsg) {
        if (value === '') {
          return errorMsg;
        }
      },
      minLength: function (value, length, errorMsg) {
        if (value.length < length) {
          return errorMsg;
        }
      },
      isMobile: function (value, errorMsg) {
        if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
          return errorMsg;
        }
      },
    };
    /***************Validator 类*****************/
    const Validator = function () {
      this.cache = [];
    };
    Validator.prototype.add = function (dom, rules) {
      let self = this;
      for (let i = 0, rule; (rule = rules[i++]); ) {
        (function (rule) {
          let strategyAry = rule.strategy.split(':');
          let errorMsg = rule.errorMsg;
          self.cache.push(function () {
            let strategy = strategyAry.shift();
            strategyAry.unshift(dom.value);
            strategyAry.push(errorMsg);
            return strategies[strategy].apply(dom, strategyAry);
          });
        })(rule);
      }
    };
    Validator.prototype.start = function () {
      for (let i = 0, validatorFunc; (validatorFunc = this.cache[i++]); ) {
        let errorMsg = validatorFunc();
        if (errorMsg) {
          return errorMsg;
        }
      }
    };
    /***************Validator 类*****************/
    const registerForm = document.querySelector('registerForm');
    const validatorFunc = function () {
      const validator = new Validator();
      validator.add(registerForm.userName, [
        {
          strategy: 'isNonEmpty',
          errorMsg: '用户名不能为空',
        },
        {
          strategy: 'minLength:6',
          errorMsg: '用户名长度不能小于6位',
        },
      ]);
      validator.add(registerForm.password, [
        {
          strategy: 'minLength:6',
          errorMsg: '密码长度不能小于6位',
        },
      ]);
      validator.add(registerForm.phoneNumber, [
        {
          strategy: 'isMobile',
          errorMsg: '手机格式不正确',
        },
      ]);
      const errorMsg = validator.start();
      return errorMsg;
    };
    registerForm.onsubmit = function () {
      let errorMsg = validatorFunc();
      if (errorMsg) {
        alert(errorMsg);
        return false;
      }
    };
  </script>
</html>
```

### 代理模式

> 代理模式：_为一个对象提供一个代用品或占位符，以便控制对它的访问_

#### 形式

- 客户 ——> 本体 （不用代理模式）
- 客户 ——> 代理 ——> 本体 （使用代理模式）

### 事件代理

---

事件代理，代理模式里最常见的应用了，也是高频面试题。父元素下有多个子元素，给子元素添加点击事件

```html
// 略
```

#### 虚拟代理

---

虚拟代理：把一些开销很大的对象，延迟到真正需要它的时候创建。
**虚拟代理实现图片预加载**

```javascript
// 出自：js设计模式与开发实践
const myImage = (function () {
  const imgNode = document.createElement('img');
  document.body.appendChild(imgNode);

  return {
    setSrc: function (src) {
      imgNode.src = src;
    },
  };
})();

const proxyImage = (function () {
  const img = new Image();
  img.onload = function () {
    myImage.setSrc(this.src);
  };
  return {
    setSrc: function (src) {
      myImage.setSrc('./loading.gif');
      img.src = src;
    },
  };
})();

proxyImage.setSrc('http://xxx.com/img.png');
```

#### 缓存代理

---

缓存代理：将一些开销大的运算结果缓存起来，待到下次使用时，直接使用，避免重复运算。（闭包）
**ajax 中的使用**

```javascript
// 请求数据
function requestData(regionName) {
  return new Promise(function (resolve, reject) {
    var rest = ajax({
      type: 'post',
      params: { regionName: regionName },
    });
    resolve(rest);
  });
}
// 初始化数据代理方法
var proxyInit = function () {
  var cache = {};
  return async function (regionName) {
    if (cache[regionName]) {
      return cache[regionName];
    } else {
      return (cache[regionName] = await requestData(regionName));
    }
  };
};
proxyInit('石家庄');
```

#### 保护代理

---

保护代理：用于控制不同权限的对象对目标对象的访问。
**ES6** 中的 **Proxy**

### 迭代器模式

> 迭代器模式是指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部展示。

#### 实现自己的迭代器

```javascript
// 出自：JS设计模式与开发实践
const each = function (ary, callback) {
  for (let i = 0, l = ary.length; i < l; i++) {
    callback.call(ary[i], i, ary[i]); // 把下标和元素当作参数传递给 callback 函数
  }
};

each([1, 2, 3], function (i, n) {
  alert([i, n]);
});
```

**使用 **`**ES6**` **生成器（Generator）完成迭代器**

```javascript
// generator 的使用，编写一个迭代器生产函数
function* iteratorGenerator() {
  yield '1号';
  yield '2号';
  yield '3号';
}

const iterator = iteratorGenerator();

iterator.next(); // {value: '1号'， done: false}
iterator.next(); // {value: '2号'， done: false}
iterator.next(); // {value: '3号'， done: false}
```

```javascript
// 定义生成器函数，入参是任意集合
function iteratorGenerator(list) {
  // idx记录当前访问的索引
  let idx = 0;
  // len记录传入集合的长度
  let len = list.length;
  return {
    // 自定义next方法
    next: function () {
      // 如果索引还没有超出集合长度，done为false
      let done = idx >= len;
      // 如果 done 为 false，则可以继续取值
      let value = !done ? list[idx++] : undefined;
      // 将当前值与遍历是否完毕 （done） 返回
      return {
        done: done,
        value: value,
      };
    },
  };
}
const iterator = iteratorGenerator(['1号', '2号', '3号']);

iterator.next(); // {value: '1号'， done: false}
iterator.next(); // {value: '2号'， done: false}
iterator.next(); // {value: '3号'， done: false}
iterator.next(); // {value: undefined， done: true}
```

#### 小结

几乎所有的框架都实现了迭代器。故而知之甚少

### 发布订阅模式

> 假定，存在一个“信号中心”，某个任务执行完成，就向信息中心“发布”( `public` )一个信号，其他任务可以向信号中心“订阅”( `subscribe` )这个信号，从而知道什么时候自己可以开始执行。

### 发布/订阅模式

- 订阅者
- 发布者
- 信号中心

#### Vue 自定义事件

- 实例

```javascript
let vm = new Vue();

vm.$on('dataChange', () => {
  console.log('dataChange');
});

vm.$on('dataChange', () => {
  console.log('dataChange1');
});

vm.$emit('dataChange');
```

- 兄弟组件通信过程

```javascript
// eventBus.js
// 事件中心
let eventBus = new Vue()

//ComponentA.vue
// 发布者
addTodo: function() {
	// 发布信息（事件）
  eventBus.$emit('add-todo', { text: this.newTodoText})
  this.newTodoText = ''
}

//ComponentB.vue
// 订阅者
created: function() {
	// 订阅消息(事件)
  eventBus.$on('add-todo', this.addTodo)
}
```

#### 模拟 Vue 自定义事件

```javascript
// 事件触发器
class EventEmitter {
  constructor() {
    // { 'eventType': [fn1, fn2] } => {'click': [fn1, fn2], 'change': [fn3]}
    this.subs = Object.create(null); //创建对象，由于没有原型，传值 null 增加性能
  }

  // 注册事件
  $on(eventType, handler) {
    this.subs[eventType] = this.subs[eventType] || [];
    this.subs[eventType].push(handler);
  }

  // 触发事件
  $emit(eventType) {
    if (this.subs[eventType]) {
      this.subs[eventType].forEach((handler) => {
        handler();
      });
    }
  }
}

// 测试
let em = new EventEmitter(); // 创建触发器 事件中心

em.$on('click', () => {
  // 注册事件1
  console.log('click1');
});

em.$on('click', () => {
  // 注册事件2
  console.log('click2');
});

em.$emit('click'); // 触发事件
```

#### 总结

> **发布/订阅模式**由统一调度中心调用，因此发布者和订阅者不需要知道对方的存在。

### 观察者模式

> **观察者模式**是由具体目标调度，比如当事件触发，Dep 就会去调用观察者的方法，所以观察者模式的订阅者与发布者之间是存在依赖的。

- 观察者(订阅者)—— `Watcher`
  - `update()` ：当事件发生时，具体要做的事情
- 目标(发布者)—— `Dep` (Dep 依赖的缩写)
  - `subs`  数组：存储所有的观察者
  - `addSub()` ：添加观察者
  - `notify()` ：当事件发生，调用所有观察者的 `update()`  方法
- 没有事件中心

#### 发布者-目标

```javascript
class Dep {
  constructor() {
    // 记录所有的订阅者
    this.subs = [];
  }
  // 添加订阅者
  addSub(sub) {
    if (sub && sub.update) {
      this.subs.push(sub);
    }
  }
  // 发布通知
  notify() {
    this.subs.forEach((sub) => {
      sub.update();
    });
  }
}
```

#### 订阅者-观察者

```javascript
class Watcher {
  update() {
    console.log('update');
  }
}
```

#### 实例

```javascript
let dep = new Dep();
let watcher = new Watcher();

dep.addSub(watcher);

dep.notify();
```

![观察者模式.png](https://cdn.nlark.com/yuque/0/2020/png/406546/1594131339806-5d73ff4a-9796-4cde-ad78-d3339e06ba26.png#align=left&display=inline&height=341&margin=%5Bobject%20Object%5D&name=%E8%A7%82%E5%AF%9F%E8%80%85%E6%A8%A1%E5%BC%8F.png&originHeight=341&originWidth=128&size=9172&status=done&style=none&width=128)

#### 命令模式

> 命令模式：_把发出命令的责任和执行命令的责任分割开，委派给不同的对象执行。典型的“大家各干各的，把事情干成”_

#### 场景

---

如果去小馆子吃饭，没有服务员，老板厨师都是一个人，你点菜要跑到厨房给厨师说，厨师做好，要给你送来，这种体验很不好。
![命令模式1.png](https://cdn.nlark.com/yuque/0/2020/png/406546/1595516486113-1686d09d-947c-478c-a384-87e4ac931d2c.png#align=left&display=inline&height=348&margin=%5Bobject%20Object%5D&name=%E5%91%BD%E4%BB%A4%E6%A8%A1%E5%BC%8F1.png&originHeight=348&originWidth=740&size=17878&status=done&style=none&width=740)
小馆子干大
![命令模式.png](https://cdn.nlark.com/yuque/0/2020/png/406546/1595516523402-8449cbe6-6c05-4297-aee8-1e7bc37bcf83.png#align=left&display=inline&height=542&margin=%5Bobject%20Object%5D&name=%E5%91%BD%E4%BB%A4%E6%A8%A1%E5%BC%8F.png&originHeight=542&originWidth=801&size=33734&status=done&style=none&width=801)
命令模式就是把请求的发送者 `Client`  和请求的执行者 `Receiver`  解耦开，发送者不关心谁执行，执行者不关心谁发布，事情干成就行。

#### 代码解释

```html
// 给button添加命令事件
<body>
  <button id="button">点击按钮</button>
</body>
<script>
  const btn = document.querySelector('button');
  // 负责给按钮指定命令
  const setCommand = function (btn, command) {
    btn.onclick = function () {
      command.execute();
    };
  };
  // 发送的请求
  const Menu = {
    cook: function () {
      console.log('炒个硬菜');
    },
    drink: function () {
      console.log('来瓶雪花❄️');
    },
  };
  // 封装成命令类
  const CookMenuCommand = function (receiver) {
    this.receiver = receiver;
  };
  CookMenuCommand.prototype.execute = function () {
    this.receiver.cook();
  };
  const DrinkMenuCommand = function (receiver) {
    this.receiver = receiver;
  };
  DrinkMenuCommand.prototype.execute = function () {
    this.receiver.drink();
  };
  // 传人命令接收者，并把command对象安装到button上
  const cookMenuCommand = new CookMenuCommand(Menu);

  setCommand(btn, cookMenuCommand);
</script>
```

### 观察-订阅者模式 与 观察者模式的区别

### 开放封闭原则

一个好的模式，应该尽可能做到对扩展开放，对修改封闭

### 单一职责原则

一个类或者模块应该有且只有一个改变原因
