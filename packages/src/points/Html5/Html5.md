---
title: Html5
order: 3
nav:
  path: /points
---

# Html5

---

## points

### 行内元素、块级元素

### data-\*

这个属性是 HTML5 中用于存储自定义属性值，自定义属性值用于方便开发者存储一些简单的数据内容，而不需从服务器端获取。

data- 后边必须至少有一个字符，不要包含大写字符；
JavaScript 可以用 getAttribute 函数获取自定义属性；
HTML5 原生函数支持使用 dataset / setAttribute 来 获取/操作自定义属性。

### draggable

这个属性用来标识元素是否支持被拖动，如果没有被设置则按照浏览器默认的方式来执行，属性可选值有 true/false/auto。
默认情况下， 只有图片、链接是可以拖动的。需要配合定义 ondragstart 事件来实现拖动之后的响应机制。

### hidden

hidden 用来设置元素是否应该被隐藏，当该属性设置为 hidden 或者 true 时，
浏览器将不再渲染该元素。在早期的 HTML4 中，通过设置 css 样式 display:none 可以实现相同的效果。

### 连接(a 标签)

```css
a:link {
  color: #f00;
} /* 链接默认是红色 */
a:hover {
  color: #000;
} /* 鼠标悬停变黑色 */
a:active {
  color: #03f;
} /* 鼠标点击时蓝色 */
a:visited {
  color: #f0f;
} /* 访问过为粉红 */
```

target 属性

- \_blank： 在新窗口打开链接；
- \_self ： 默认方式，在当前窗口载入链接内容；
- \_top： 在包含当前文档的最顶层的窗口载入链接内容。（一般用在有 frame 框架标签的页面中。）
- \_parent： 在当前文档的父窗口载入链接内容。（一般用在有 frame 框架标签的页面中。）

download 属性

href 属性

- 绝对 URL： 例如 http://www.baidu.com；
- 相对 URL： 例如 /index.html；
- 锚点 ： dom 的 id；
- JavaScript 表达式：例如 javascript:void(0) 阻止链接跳转。

### meta 标签的作用

- 优化搜索引擎
- 定义页面使用语言
- 控制页面缓存
- 网页定义评价
- 控制页面显示窗口
- ……

```HTML5

<meta name="keywords" content="HTML,PHP,SQL"> <!-- 定义文档关键词，用于爬虫搜索引擎 -->
<meta http-equiv="charset" content="iso-8859-1"> <!-- 定义文档的字符集 -->
<meta http-equiv="expires" content="31 Dec 2020"> <!-- 定义文档的缓存过期时间 -->
```

meta 的属性

- name 描述网页
- content 方便搜索引擎查找和分类
- http-equiv http 文件头设置
