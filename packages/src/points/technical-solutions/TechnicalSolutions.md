---
title: Technical-solutions
order: 23
nav:
  path: /points
---

# Technical solutions

---

## points

### 离线包设计实践

> 就是在有网络的情况去下载到本地的压缩包，在无网的时候可以进行加载。

[转转离线包设计实践](https://mp.weixin.qq.com/s/b7qsnYVPIJoasIgojX3n2A)
[蚂蚁金服离线包设计实践](https://tech.antfin.com/docs/2/59594)
[生成离线包](https://tech.antfin.com/docs/2/85627#)
[离线包方案](https://www.cnblogs.com/zhangrunhao/p/14582448.html)

### 离线包怎么更新?怎么知道需要打开哪个离线包?

### 预置包

### h5 唤起小程序短链接调研

### 低代码开发平台(可视化)

[Epage](http://epage.didichuxing.com/)
[H5 Dooring](http://h5.dooring.cn/)

### 怎么实现 h5 页面的秒开?

### 有没有做过一些提高工作效率的东西?

### JSBridge 方案、及通信原理?

### Sentry 集中化日志监控与自动化错误追踪

### 性能监控

- 页面访问速度：白屏、首屏时间、可交互时间、总下载时间、DNS解析时间、TCP连接时间、HTTP请求时间、HTTP响应时间
- 页面稳定性：页面出错情况
- 外部服务调用

[性能监控详细解析](http://www.alloyteam.com/2020/01/14184/)

### 组件库

### 基础工具库

### 跨平台

### SSR

### 国际化

### ESBuild

[ESBuild](https://juejin.cn/post/6971606582706569229)

### Babel 的应用

### 持续集成系统的搭建

### 兼容性好的视频播放器

### 直播技术

### CLI

### 数据可视化(base charts 库搭建)

### GraphQL

### 瀑布流

### 懒加载

### request 参数缓存( 基于 Proxy 的缓存库调研)

### 增量发布

### 前端大量数据的处理

### 单点登录

### serverless

### 引入 BFF 层的优势在哪里


BFF 全称 Backend For Frontend，一般指在前端与服务器端搭建一层由前端维护的 Node Server服务，具有以下好处

数据处理。对数据进行校验、清洗及格式化。使得数据更与前端契合
数据聚合。后端无需处理大量的表连接工作，第三方接口聚合工作，业务逻辑简化为各个资源的增删改查，由 BFF 层聚合各个资源的数据，后端可集中处理性能问题、监控问题、消息队列等
权限前移。在 BFF 层统一认证鉴权，后端无需做权限校验，后端可直接部署在集群内网，无需向外网暴露服务，减少了后端的服务度。
但其中也有一些坏处，如以下

引入复杂度，新的 BFF 服务需要一套基础设施的支持，如日志、异常、部署、监控等

### 前端如何进行多分支部署

### UI自动化

### 微前端体系

[详细解析](https://juejin.cn/post/6981638032768106526)

### 首屏加载时间优化

[首屏加载时间优化](https://zhuanlan.zhihu.com/p/88639980)
