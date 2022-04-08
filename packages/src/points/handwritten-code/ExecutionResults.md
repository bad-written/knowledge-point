---
title: Execution Result
order: 22
nav:
path: /points
---

# Execution Result

## points

### 输出以下代码执行结果

```javascript
function wait() {
  return new Promise(resolve =>
  	setTimeout(resolve, 10 * 1000)
  )
}

async function main() {
  console.time();
  const x = wait();
  const y = wait();
  const z = wait();
  await x;
  await y;
  await z;
  console.timeEnd();
}
main();

// 理解任务队列(消息队列)
// 一种是同步任务（synchronous），另一种是异步任务（asynchronous）

// 请问最后的输出结果是什么？
console.log("A");
while(true){ }
console.log("B");
// 如果你的回答是A,恭喜你答对了，因为这是同步任务，程序由上到下执行，遇到while()死循环，下面语句就没办法执行。

// 请问最后的输出结果是什么？
console.log("A");
setTimeout(function(){
  console.log("B");
},0);
while(true){}
// 如果你的答案是A，恭喜你现在对js运行机制已经有个粗浅的认识了！
// 题目中的setTimeout()就是个异步任务。在所有同步任务执行完之前，任何的异步任务是不会执行的

// new Promise(xx)相当于同步任务, 会立即执行, .then后面的是微任务
console.log('----------------- start -----------------');
setTimeout(() => {
  console.log('setTimeout');
}, 0)
new Promise((resolve, reject) =>{  // new Promise(xx)相当于同步任务, 会立即执行, .then后面的是微任务
  for (var i = 0; i < 5; i++) {
    console.log(i);
  }
  resolve();
}).then(() => {
  console.log('promise实例成功回调执行');
})
console.log('----------------- end -----------------');
//
// > ----------------- start -----------------
// > 0
// > 1
// > 2
// > 3
// > 4
// > ----------------- end -----------------
// > promise实例成功回调执行
// > setTimeout
// new Promise(xx)相当于同步任务, 会立即执行
//
// 所以: x,y,z 三个任务是几乎同时开始的, 最后的时间依然是10*1000ms (比这稍微大一点点, 超出部分在1x1000ms之内)
```
