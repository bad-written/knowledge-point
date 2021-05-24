---
title: Webpack
order: 7
nav:
  path: /points
---

# Webpack

---

## points

### loader 与 plugin

Q: 什么是 loader?
A: loader 是文件加载器，能够加载资源文件，并对这些文件进行一些处理，诸如编译、压缩等，最终一起打包到指定的文件中
Q: 什么是 plugin？
A: 在 webpack 运行的生命周期中会广播出许多事件，plugin 可以监听这些事件，在合适的时机通过 webpack 提供的 API 改变输出结果。
区别： 对于 loader，它是一个转换器，将 A 文件进行编译形成 B 文件，这里操作的是文件，比如将 A.scss 转换为 A.css，单纯的文件转换过程
plugin 是一个扩展器，它丰富了 webpack 本身，针对是 loader 结束后，webpack 打包的整个过程，它并不直接操作文件，而是基于事件机制工作，会监听 webpack 打包过程中的某些节点，执行广泛的任务

### tree-shaking 的原理，哪些情况属于副作用，在 rollup 和 webpack 的不同表现

### 聊一聊 webpack 的优化手段，说说你熟系优化手段的原理

### webpack 的打包原理及产物是如何执行的，动态加载呢，如何缓存的，与 rollup 的区别

### 写React/Vue项目时，为什么要在列表组件写key

### webpack 优化的手段

### tree-shaking 怎么配置，如何 避免 tree-shaking？

### webpack 提高构建速度的方式

### webpack import 动态加载原理

### 知道 webpack 中的 devTool 吗？

### 为什么有时候配置了 webpack caching，chunk 还是更新了？

### loader 输入什么产出什么 ？

### webpack 原理

### webpack 热更新

### 如何写一个 webpack plugin

### AST 的应用

### 如何解析一个 html 文本，还是考 AST

### babel 原理，怎么写 babel 插件

### 如何设计一个沙盒 sandbox ？
