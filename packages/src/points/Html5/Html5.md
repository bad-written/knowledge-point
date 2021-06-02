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

### form 表单

enctype 属性：enctype 用于定义表单数据提交到服务器的过程中如何对数据进行编码，可选值有：

- application/x-www-form-urlencoded；默认方式是第一种 application/x-www-form-urlencoded，
  当使用 form 表单提交数据时，需要对数据进行编码，因为 URL 的数据是通过 ?key=value&key=value& 的方式传输给服务器，
  这其中有一些作为功能性质的特殊字符例如 & ? =，如果数据中带有这些字符而且未进行编码的话，可能会导致传输数据发生错误。
- multipart/form-data 浏览器不对字符进行编码，这种编码方式通常适用于上传文件；
- text/plain: 浏览器将请求参数放入 body 作为字符串处理，这种方式用于传输原生的 HTTP 报文，不适用任何格式化处理。

method 属性

使用表单提交数据时，实际上只发送一个 HTTP 协议的数据请求，HTTP 协议有很多种数据请求方式，
这个 method 属性用于设定 HTTP 请求的方式。常用的方式有 post、get，当未设置时默认使用 get 方式。

- options 客户端查看服务器的配置；
- head 用于获取报文头，没有 body 实体；
- delete 请求服务器删除指定页面；
- put 请求替换服务器端文档内容；
- trace 用于诊断服务器；
- connect 将连接设置成管道方式的代理服务器，用于 HTTP1.1

target 属性

这个属性用户设置表单提交之后浏览器的跳转地址，默认是在当前页面打开新地址，可选值有：

- \_blank 新窗口；
- \_self 默认，当前窗口；
- \_parent 父窗口；
- \_top 最顶层窗口；
- \_framename 指定的框架

### iframe

这样做的好处是：

- 代码可复用性，相同的页面无需重复实现，只需要引用即可；
- iframe 是一个封闭的运行环境，环境变量完全独立、隔离，不会污染宿主环境；
- iframe 可以用于创建新的宿主环境，用于隔离或者访问原始接口及对象，提升网站的安全性
  缺点是：

- 被引用的 iframe 如果过多的话，可能会产生过量的 HTTP 请求；
- 跨域问题；
- 样式不容易适配

iframe 通信

```javascript

<iframe src='index.html' id='test' />
<script>
  //父窗口调用 iframe 的window对象
	var obj = document.getElementById("test").contentWindow;
</script>

<script>
  // 在 iframe 中调用父窗口的变量：
  var dom = window.top.document.getElementById("父窗口的元素ID");
</script>


<iframe src='index1.html' id='test1' />
<iframe src='index2.html' id='test2' />
<script>
  // 兄弟 iframe 间相互调用变量：
  var dom2 = window.top.document.getElementById("test2").contentWindow.getElementById("");//这里是在test1调用test2中的某个dom
</script>
```

### localStorage

Cookie 的缺点

- Cookie 会被附加在 HTTP 协议中，每次请求都会被发送到服务器端，增加了不必要的流量损耗
- Cookie 大小限制在 4kb 左右（不同的浏览器有一些区别），对于一些复杂的业务场景可能不够

```javascript
setItem();
getItem();
removeItem();
clear();
if (window.addEventListener) {
  //通过addEventListener方式监听事件，为了兼容IE
  window.addEventListener(
    'storage',
    function (e) {
      //监听storage事件
      //业务处理
    },
    false,
  );
} else {
  window.attachEvent('onstorage', function (e) {
    //通过attachEvent方式监听事件
    //业务处理
  });
}
```

局限性

- 5M 容量依然小，用过数据库的同学应该知道，MySQL 随便一个表加上索引很容易超过 5M
- 不能跨域名访问，同一个网站可能会牵涉到子域名
- 不能存储关系型数据
- 不能搜索

适用场景

- 数据关系简单明了
- 数据量小
- 数据无需持久化存储且不需要考虑安全性
- 无需跟服务器交互

### URL - 统一资源定位器

- scheme - 定义因特网服务的类型。最常见的类型是 http
- host - 定义域主机（http 的默认主机是 www）
- domain - 定义因特网域名，比如 runoob.com
- :port - 定义主机上的端口号（http 的默认端口号是 80）
- path - 定义服务器上的路径（如果省略，则文档必须位于网站的根目录中）。
- filename - 定义文档/资源的名称

### Canvas

### indexDB

### Web SQL

### web worker

JavaScript 的宿主浏览器只有一个线程运行 JavaScript，除了 JavaScript 的线程，浏览器中单个页面还有一些其他线程，
例如：UI 线程负责处理渲染 DOM 元素；GUI 线程用于处理与用户交互的逻辑；网络线程用于发送接收 HTTP 请求；file 线程用于读取文件；定时器线程处理定时任务等等。

单线程原因
浏览器中 JavaScript 的主要用途是操作 DOM 。这决定了它只能是单线程，否则会带来很复杂的同步问题。
为了避免复杂性，大部分主流浏览器的 JavaScript 运行环境只支持单线程。

JavaScript 的事件驱动

HTML5 推出的 Web Worker 标准，允许 JavaScript 创建多线程，但是子线程受主线程约束，且不得操作 DOM 。所以，这个新标准不会产生多线程同步的问题。

适用场景

- 并行计算；
- ajax 轮询；
- 耗时的函数执行；
- 数据预处理/加载。

```javascript
if (window.Worker) {
  //判断浏览器是否支持web worker
  var worker = new Worker('test.js'); //创建一个线程，参数为需要执行的JavaScript文件
}

// 向线程传递参数
worker.postMessage('test'); //数据类型可以是字符串
worker.postMessage({ method: 'echo', args: ['Work'] }); //数据类型可以是对象

// 主线程接受消息
worker.onmessage = function (event) {
  console.log('接收到消息： ' + event.data);
};

// 线程加载脚本
importScripts('script1.js', 'script2.js');

// 主线程中关闭子线程
worker.terminate();
// 子线程关闭自身
self.close();
```

### MathML 数学标记语言

### SVG

优点
SVG 有很多优点：

- SVG 使用 xml 标记语言实现，具有可移植性；
- SVG 语法区分大小写，出现兼容性问题概率较小；
- SVG 和传统的 JPEG png 相比，尺寸更小；
- SVG 是矢量图，放大或缩小不影响其图像质量；
- 可以通过 img 的 src 属性引用。

缺点

- 其复杂的语法决定了它的入门门槛较高

Canvas 是通过 JavaScript 调用的方式绘制图像，而 SVG 是使用标签的方式绘制图像，所以两种的渲染方式有很大差别。

[snap.svg](https://github.com/adobe-webplatform/Snap.svg)

### Canvas 与 SVG 的比较

| Canvas                                             | SVG                                                     |
| -------------------------------------------------- | ------------------------------------------------------- |
| 依赖分辨率                                         | 不依赖分辨率                                            |
| 不支持事件处理器                                   | 支持事件处理器                                          |
| 弱的文本渲染能力                                   | 最适合带有大型渲染区域的应用程序（比如谷歌地图）        |
| 能够以 .png 或 .jpg 格式保存结果图像               | 复杂度高会减慢渲染速度（任何过度使用 DOM 的应用都不快） |
| 最适合图像密集型的游戏，其中的许多对象会被频繁重绘 | 不适合游戏应用                                          |

### Geolocation(地理位置)

HTML5 Geolocation API 用于获得用户的地理位置。
鉴于该特性可能侵犯用户的隐私，除非用户同意，否则用户位置信息是不可用的。

### websocket

### SSE 浏览器发送事件

相对于 websocket 这种双向协议，SSE 较为轻量，它只支持服务端向客户端推送消息。
