---
title: Javascript Note
---

## 字符串JSON 与 json字符串 互转

```js
let json= {
    name: "orangbus",
    age: 18
};

let jsonToString = JSON.stringify(json);
let strToJson = JSON.parse(string);
```

## 滚动到底部加载更多

> 如果scroll事件不触发的话，很可能是scorll事件绑错div了！

```javascript
let dom = document.querySelector('textarea');
// div滚动事件
dom.onscroll = () => {
    
  // 意思就是内容总体的高度 - 滚动条的偏移值  === 元素的高度(包含内边)但不包含外边距，边框，以及滚动条
  if (dom.scrollHeight - dom.scrollTop === dom.clientHeight) {
    console.log('到达底部 do something');
  }

  // div滚到时：离底部不到30px时触发
  if (dom.scrollHeight - dom.scrollTop - dom.clientHeight <= 30) {
    console.log('离底部不到30px 提前发送请求');
  }
};
```

组件推荐：[vue-infinite-scroll](https://github.com/ElemeFE/vue-infinite-scroll) 