---
title: Javascript Note
sidebar: auto
---

## Require.js使用

在入口文件中引入这两个文件

```js
<script src="/js/require.js"></script>
<script src="/js/main.js"></script>
```

### 编辑器-wangEditor

```javascript
var editor = "";
requirejs(['edit'],function (E) {
    // const E = window.wangEditor
    editor = new E('#edit-content')
    editor.config.placeholder = '你可以在这里保存你的跟进记录'
    // base64 保存图片
    editor.config.uploadImgShowBase64 = true
    // 限制文件大小
    editor.config.uploadImgMaxSize = 2 * 1024 * 1024 // 2M
    // 或者 const editor = new E( document.getElementById('div1') )
    // 设置编辑区域高度为 500px
    editor.config.height = 500
    editor.create()
});

// 获取编辑器内容
let data = editor.txt.html();
```

### 剪贴板-[clipboard](https://clipboardjs.com/) 

```html
<input type="text" id="copy-url" value="hello orangbus">
<button class="copy-btn" data-clipboard-target="#copy-url">copy</button>
```

```javascript
// 剪贴板
requirejs(["clipboard"],function (clipboard){
    new clipboard('.copy-btn');
});
```

### 消息提示-notyf 

```javascript
requirejs(["notyf"],function (){
    var notyf = new Notyf();
    notyf.confirm("notyf is ok!");
});
```

### 图片放大-magnify

```js
<img
    data-magnify="gallery"
    src="http://blockberry.test/storage/uploads/2020-11-04-13-19-15-5fa239d39e094.jpeg"
    data-src="http://blockberry.test/storage/uploads/2020-11-04-13-19-15-5fa239d39e094.jpeg"
    style="width: 100px;height: 100px;"
>
        
```







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