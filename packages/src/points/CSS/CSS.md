---
title: Css
order: 4
nav:
  path: /points
---

# CSS

---

## points

### px,em,rem,vw,vh 区别

- px: px 就是 pixel 的缩写，意为像素。px 就是一张图片最小的一个点，一张位图就是千千万万的这样的点构成的。
- em: 参考物是父元素的 font-size，具有继承的特点。如果自身定义了 font-size 按自身来计算（浏览器默认字体是 16px），整个页面内 1em 不是一个固定的值。
- rem: css3 新单位，相对于根元素 html（网页）的 font-size，不会像 em 那样，依赖于父元素的字体大小，而造成混乱。
- vw: css3 新单位，viewpoint width 的缩写，视窗宽度，1vw 等于视窗宽度的 1%。
  举个例子：浏览器宽度 1200px, 1 vw = 1200px/100 = 12 px。
- vh: css3 新单位，viewpoint height 的缩写，视窗高度，1vh 等于视窗高度的 1%。
  举个例子：浏览器高度 900px, 1 vh = 900px/100 = 9 px。

### BFC(块级格式化上下文)

[详细解析](https://zhuanlan.zhihu.com/p/25321647)

### visibility、hidden

### flex

### 盒模型

[详细解析](https://segmentfault.com/a/1190000013069516)

### 伪类、伪元素

### transition、animation 的区别

### margin 塌陷

### object-fit

### CSS 的权重和优先级

### box-sizing

### 清除浮动

.clearfix:after {
content : '';
display : table;
clear : both;
}
/_兼容 IE 低版本_/
.clearfix {
\*zoom : 1;
}

### 什么是媒体查询，JS 可以监听媒体查询吗

### z-index: 999 元素一定会置于 z-index: 0 元素之上吗

### svg 实现 loading 效果

### 有没有使用过 css variable，它解决了哪些问题

### position 属性有哪些值，各有什么特点？

[详细解析](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/509)

### opacity: 0、visibility: hidden、display: none 优劣和适用场景

- 结构

display:none: 会让元素完全从渲染树中消失，渲染的时候不占据任何空间, 不能点击，
visibility: hidden:不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，不能点击
opacity: 0: 不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，可以点击

- 继承：

display: none 和 opacity: 0：是非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示。
visibility: hidden：是继承属性，子孙节点消失由于继承了 hidden，通过设置 visibility: visible;可以让子孙节点显式。

- 性能:

displaynone : 修改元素会造成文档回流,读屏器不会读取 display: none 元素内容，性能消耗较大
visibility:hidden: 修改元素只会造成本元素的重绘,性能消耗较少读屏器读取 visibility: hidden 元素内容
opacity: 0 ：修改元素会造成重绘，性能消耗较少

### link 与@import 的区别

link 是 HTML 方式， @import 是 CSS 方式
link 最大限度支持并行下载，@import 过多嵌套导致串行下载，出现 FOUC
link 可以通过 rel="alternate stylesheet"指定候选样式
浏览器对 link 支持早于@import，可以使用@import 对老浏览器隐藏样式
@import 必须在样式规则之前，可以在 css 文件中引用其他文件
总体来说：link 优于@import

### PNG,GIF,JPG 的区别及如何选

- GIF:

8 位像素，256 色
无损压缩
支持简单动画
支持 boolean 透明
适合简单动画

- JPEG：

颜色限于 256
有损压缩
可控制压缩质量
不支持透明
适合照片

- PNG：

有 PNG8 和 truecolor PNG
PNG8 类似 GIF 颜色上限为 256，文件小，支持 alpha 透明度，无动画
适合图标、背景、按钮
