---
title: React
order: 5
nav:
  path: /points
---

# React

---

## points

[React 面试题 & 回答](https://github.com/semlinker/reactjs-interview-questions)

### vue 和 react 的区别

react 整体是函数式的思想，把组件设计成纯组件，状态和逻辑通过参数传入，所以在 react 中，是单向数据流；
vue 的思想是响应式的，也就是基于是数据可变的，通过对每一个属性建立 Watcher 来监听，当属性变化的时候，响应式的更新对应的虚拟 dom。
...

### React 中 setState 是异步的?什么情况下是同步的?

在 React 中，如果是由 React 引发的事件处理（比如通过 onClick 引发的事件处理），调用 setState 不会同步更新 this.state，除此之外的 setState 调用会同步执行 this.state 。所谓“除此之外”，指的是绕过 React 通过 addEventListener 直接添加的事件处理函数，还有通过 setTimeout/setInterval 产生的异步调用。

原因： 在 React 的 setState 函数实现中，会根据一个变量 isBatchingUpdates 判断是直接更新 this.state 还是放到队列中回头再说，而 isBatchingUpdates 默认是 false，也就表示 setState 会同步更新 this.state，但是，有一个函数 batchedUpdates，这个函数会把 isBatchingUpdates 修改为 true，而当 React 在调用事件处理函数之前就会调用这个 batchedUpdates，造成的后果，就是由 React 控制的事件处理过程 setState 不会同步更新 this.state。

注意： setState 的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形式了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的 callback 拿到更新后的结果。

[详解](https://github.com/sisterAn/blog/issues/26)

### 写 React/Vue 项目时，为什么要在列表组件写 key

[写 React/Vue 项目时，为什么要在列表组件写 key](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/1)

### id key 真的能使列表比对更高效吗？举个反例？

使用简单的模板，基于这个前提下，可以更有效的复用节点，diff速度来看也是不带key更加快速的，因为带key在增删节点上有耗时

### React 中 context 的实现方式？

内部定义了一个 EventEmitter，在 Provider 中 value 改变时，emit change 事件，而在 Consumer 中则监听 value 的 update 事件，从而实现子组件接收 Context 的值

### Render Props 与 React.PureComponent 混用可能会出现什么问题?

因为浅比较 props 的时候总会得到 false，并且在这种情况下每一个 render 对于 render prop 将会生成一个新的值。

### 什么是虚拟 DOM？

[详细解析](https://segmentfault.com/a/1190000022277663)

### 类组件和函数组件之间的区别是啥？

### React 中 refs 干嘛用的？

### react 中的事件

[详细解析](https://zhuanlan.zhihu.com/p/165089379)

### 什么是 jsx？

### 为什么类方法需要绑定到类实例？

### 受控组件和非受控组件区别是啥？

### stack reconciler

### React Fiber?

### concurrent

### 什么是纯函数？

### HOC

### render props

### 单向数据流、双向数据流的缺点

### 为什么 useState、useEffect 不能写在 if 里

### componentDidMount 执行几次

### 20 个组件异步请求

### react 的 setstate 过程

### 收到新 state 怎么更新，发生了什么事情

### react 类组件 super 关键字的作用是什么? static 关键字呢

### react map 不加 key 会有什么影响，如果加一个随机 key 呢

### 什么是副作用，为什么说函数式组件没有副作用

### react diff 和 fiber 算法的区别是什么

### React Fiber 原理讲一下。schedule 中的任务能中断?

### 如何实现 tooltip 组件，组件式调用和方法调用有何不同,了解 portal 吗

### 为什么两个 will 生命周期要被标记为 danger

### react 性能优化

又是老问题了。scu 生命周期、memo；useMemo & useCallback 记住一些值不用重新计算；虚拟列表；immutable+scu/memo；原生 js；

### class 组件和函数组件 diff、渲染、挂载过程差异

### react 的 useMemo 原理【描述】闭包、缓存、memorize

### hook 缺点，hook 代码难维护怎么解决

### redux 为什么每次 reducer 要返回一个新对象，面对大量节点如何优化

### immuatable 和 shouldupdate 配合、immuatable 数据一些对比问题

### React 的 Provide 和 consume 是因为什么产生的？

### redux 的实现原理

### Redux 使用时的问题，优缺点

### redux 的数据流工作流程

### redux 中间件用过哪些?

### 项目中 redux 最佳实践有哪些

### redux-thunk 源码

### redux-saga

### react-router 实现原理及工作方式是什么?

[react-router 源码分析](https://juejin.cn/post/6950248553549660191)

### lazy、susponse 的原理

### refs 转发是什么？

### 为什么 Strings Refs 被遗弃了？

### Children.map

- 处理不透明的数据结构

### Children.forEach

Children.forEach 和 Children.map 用法类似，Children.map 可以返回新的数组，Children.forEach 仅停留在遍历阶段。

### Children.count

children 中的组件总数量，等同于通过 map 或 forEach 调用回调函数的次数。对于更复杂的结果，Children.count 可以返回同一级别子组件的数量。

### Children.toArray

newChidrenArray ,就是扁平化的数组结构。React.Children.toArray() 在拉平展开子节点列表时，更改 key 值以保留嵌套数组的语义。也就是说，
toArray 会为返回数组中的每个 key 添加前缀，以使得每个元素 key 的范围都限定在此函数入参数组的对象内。

### Children.only

验证 children 是否只有一个子节点（一个 React 元素），如果有则返回它，否则此方法会抛出错误。

### 说说 inmutable.js？

### Render props 和 高阶组件的优缺点?

- 弥补类组件在逻辑复用的不灵活问题
- 嵌套地狱问题

### React 合成事件原理、事件系统的工作流?

### useEffect 与 useLayoutEffect 的区别?

### 高阶组件与渲染劫持

### 谈一谈你对 React 的理解？

### 怎么解决 useState()闭包问题?

### 组件封装有哪些原则?

### 组件数据和 UI 怎么分离?

### 聊聊 Redux 和 Vuex 的设计思想

### 为什么 Vuex 的 mutation 和 Redux 的 reducer 中不能做异步操作？

### useState() 和 setState()的区别

一般的情况下，state 改变时：

- useState 修改 state 时，同一个 useState 声明的值会被 覆盖处理，多个 useState 声明的值会触发 多次渲染
  setState 修改 state 时，多次 setState 的对象会被 合并处理
- useState 修改 state 时，设置相同的值，函数组件不会重新渲染，而继承 Component 的类组件，即便 setState 相同的值，也会触发渲染

### 在 SSR 项目中如何判断当前环境时服务器端还是浏览器端

- SSR 渲染的时候，服务端与客户端走不同的 webpack 打包配置。 那么就可以在打包的时候写入区分环境的环境变量。
- 服务器端是没有 window document 等浏览器宿主环境对象的，可以通过 类型检测 这些对象 来区分。

### React 中，cloneElement 与 createElement 各是什么，有什么区别

### 为什么不能在表达式里面定义 react hooks

### useLayoutEffect 和 useEffect 的区别

[详细解析](https://zhuanlan.zhihu.com/p/348701319)

### hooks 原理

[详细解析](https://juejin.cn/post/6944863057000529933)

### React 中 useState 是如何做数据初始化的？

### React Hook 和闭包有什么关联关系？

### React 的 useEffect 是如何监听数组依赖项的变化的

### React Hook 中 useEffect 有哪些参数，如何检测数组依赖项的变化？

### React 如何发现重渲染、什么原因容易造成重渲染、如何避免重渲染？

### 简要说明 React Hook 中 useState 和 useEffect 的运行原理？

### React 中高阶函数和自定义 Hook 的优缺点？
    
### React Class 组件和 React Hook 的区别有哪些？

### React Class 组件中请求可以在 componentWillMount 中发起吗？为什么？
    
### React Class 组件有哪些周期函数？分别有什么作用？

### 列举你常用的 React 性能优化技巧？

### 在 React 中如何识别一个表单项里的表单做到了最小粒度 / 代价的渲染？
    
### 在 React 的开发的过程中你能想到哪些控制渲染成本的方法？
    
### SSR 技术和 SPA 技术的各自的优缺点是什么？
