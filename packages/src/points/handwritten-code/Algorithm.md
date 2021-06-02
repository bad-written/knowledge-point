---
title: Algorithm
order: 12
nav:
path: /points
---

# Algorithm

---

## points

### 时间复杂度、空间复杂度

log：以任意正数为底，
lg：以 10 为底，
ln：以 e 为底。

### 数组

### 散列表

### 字典

### 集合

### 堆

### 树

### 图

### 冒泡排序

### 选择排序

### 插入排序

### 桶排序

### 堆排序

### 快速排序

### 归并排序

### 计算多个区间的交集

### 栈的实现

```javascript
class Stack {
  constructor() {
    this.dataStore = [];
    this.top = 0;
  }

  push(element) {
    this.dataStore[this.top++] = element;
  }

  pop() {
    return this.dataStore[--this.top];
  }

  peek() {
    return this.dataStore[this.top - 1];
  }

  length() {
    return this.top;
  }

  clear() {
    this.top = 0;
  }
}
```

### 队列的实现

```javascript
class Queue {
  constructor() {
    this.dataStore = [];
  }

  // 入队
  enqueue(element) {
    this.dataStore.push(element);
  }

  // 出队
  dequeue() {
    this.dataStore.shift();
  }

  // 获取队首
  front() {
    return this.dataStore[0];
  }

  // 获取队尾
  back() {
    return this.dataStore[this.dataStore.length - 1];
  }

  toString() {
    let reStr = '';
    for (let i = 0; i < this.dataStore.length; i++) {
      const element = this.dataStore[i];
      reStr += element + '/n';
    }
    return reStr;
  }

  empty() {
    if (this.dataStore.length === 0) {
      return true;
    }
    return false;
  }
}
```

### 链表的实现

```javascript
// 单链表的实现
class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = new Node('head');
  }

  // 辅助方法
  find(item) {
    let currNode = this.head;
    while (currNode.element != item) {
      currNode = currNode.next;
    }
    return currNode;
  }

  // insert
  insert(newElement, item) {
    const newNode = new Node(newElement);
    const current = this.find(item);
    newNode.next = current.next;
    current.next = newNode;
  }

  // display
  display() {
    let currNode = this.head;
    while (!(currNode.next == null)) {
      console.log(currNode.next.element);
      currNode = currNode.next;
    }
  }

  // findPrevious
  findPrevious(item) {
    let currNode = this.head;
    while (!(currNode.next == null) && currNode.next.element != item) {
      currNode = currNode.next;
    }
    return currNode;
  }

  // remove
  remove(item) {
    const prevNode = this.findPrevious(item);
    if (!(prevNode.next == null)) {
      prevNode.next = prevNode.next.next;
    }
  }
}
// 双向链表的实现
class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
    this.previous = null;
  }
}

class LList {
  constructor() {
    this.head = new Node('head');
  }

  // 辅助方法
  find(item) {
    let currNode = this.head;
    while (currNode.element != item) {
      currNode = currNode.next;
    }
    return currNode;
  }

  // 辅助方法
  findLast() {
    let currNode = this.head;
    while (currNode.next != null) {
      currNode = currNode.next;
    }
    return currNode;
  }

  // 翻转展示
  dispReverse() {
    let currNode = this.head;
    currNode = this.findLast();
    while (currNode.previous != null) {
      console.log(currNode.element);
      currNode = currNode.previous;
    }
  }

  // 删除
  remove(item) {
    const currNode = this.find(item);
    if (!(currNode.next == null)) {
      currNode.previous.next = currNode.next;
      currNode.next.previous = currNode.previous;
      currNode.next = null;
      currNode.previous = null;
    }
  }

  // 展示
  display() {
    let currNode = this.head;
    while (currNode.next != null) {
      console.log(currNode.element);
      currNode = currNode.next;
    }
  }

  // 插入
  insert(element, item) {
    const newNode = new Node(element);
    const current = this.find(item);
    newNode.next = current.next;
    newNode.previous = currNode;
    currNode.next = newNode;
  }
}
```

### 计算多个区间的交集

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

### 实现颜色转换 'rgb(255, 255, 255)' -> '#FFFFFF'

### 简单实现一个 LRU

### 爬楼梯问题/斐波纳契数列

### 信号灯控制器

```javascript
/** 1. 信号灯控制器
 用 React 实现一个信号灯（交通灯）控制器，要求：
 1. 默认情况下，
 1.1. 红灯亮20秒，并且最后5秒闪烁
 1.2. 绿灯亮20秒，并且最后5秒闪烁
 1.3. 黄灯亮10秒
 1.4. 次序为 红-绿-黄-红-绿-黄
 2. 灯的个数、颜色、持续时间、闪烁时间、灯光次序都可配置，如：
 lights=[{color: '#fff', duration: 10000, twinkleDuration: 5000}, ... ]
 */

import React from 'react';
import ReactDOM from 'react-dom';
const TrafficLightItem = () => {
  return <div>TrafficLightItem</div>;
};
export default TrafficLightItem;
```

### 寻找特定 IP

```javascript
/** 2. 寻找特定 IP
 IPV4 的 IP 地址是32位的二进制数，为增强可读性，通常我们以8位为1组进行分割，
 用十进制来表示每一部分，并用点号连接，譬如 192.168.1.1。显然，存在这样的 IP 地址，
 0到9十个数字各出现一次。具备这样特征的 IP 地址里，表示成二进制数时，二进制数左右对称
 （也就是“回文”，表示成32位二进制不省略0）的情况有几种，分别是哪些？要求性能尽可能高
 */
```
