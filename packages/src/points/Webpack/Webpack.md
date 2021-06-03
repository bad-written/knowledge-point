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

### webpack 优化的手段

### tree-shaking 怎么配置，如何 避免 tree-shaking， CSS 可以 Tree-shaking？？

### webpack 提高构建速度的方式

### webpack import 动态加载原理

### 知道 webpack 中的 devTool 吗？

### 为什么有时候配置了 webpack caching，chunk 还是更新了？

### loader 输入什么产出什么 ？

### webpack 原理、Webpack 打包原理、Webpack 构建过程

### webpack 的热更新是如何做到的？说明其原理？

### 如何写一个 webpack plugin

### AST 的应用

### 如何解析一个 html 文本，还是考 AST

### babel 原理，怎么写 babel 插件

### 如何设计一个沙盒 sandbox ？

### 有哪些常见的 Loader？你用过哪些 Loader？

### 有哪些常见的 Plugin？你用过哪些 Plugin？

### Webpack 构建流程简单说一下文件监听原理呢？

### 使用 webpack 开发时，你用过哪些可以提高效率的插件？

### 模块打包原理知道吗?

### 文件监听原理呢？

### 如何对 bundle 体积进行监控和分析？

### 文件指纹是什么？怎么用？(Hash、ChunkHash、ContentHash)

### 那代码分割的本质是什么？有什么意义呢？

### 是否写过 Loader？简单描述一下编写 loader 的思路？

### 是否写过 Plugin？简单描述一下编写 Plugin 的思路？

### 聊一聊 Babel 原理吧

### 怎么配置单页应用？怎么配置多页应用？

### webpack-dev-server 的原理是什么

### cache-loader 和 hard-source-webpack-plugin的区别?
