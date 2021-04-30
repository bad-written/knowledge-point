# CSS

---

## points

1. px,em,rem,vw,vh区别

- px: px就是pixel的缩写，意为像素。px就是一张图片最小的一个点，一张位图就是千千万万的这样的点构成的。
- em: 参考物是父元素的font-size，具有继承的特点。如果自身定义了font-size按自身来计算（浏览器默认字体是16px），整个页面内1em不是一个固定的值。
- rem: css3新单位，相对于根元素html（网页）的font-size，不会像em那样，依赖于父元素的字体大小，而造成混乱。
- vw: css3新单位，viewpoint width的缩写，视窗宽度，1vw等于视窗宽度的1%。
举个例子：浏览器宽度1200px, 1 vw = 1200px/100 = 12 px。
- vh: css3新单位，viewpoint height的缩写，视窗高度，1vh等于视窗高度的1%。
举个例子：浏览器高度900px, 1 vh = 900px/100 = 9 px。

