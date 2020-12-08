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

### 表单验证

> 参考：https://www.w3cschool.cn/jquery/kv69gfnm.html
>
> 总的来说效果还不错，其它用着用着就放弃了。

方式一：写在标签里面

```html
// bootstrap4样式
<form id="app-form">
    @csrf
    <div class="form-group">
        <label for="">username</label>
        <input type="text"
               class="form-control" name="username" required minlength="2" maxlength="10">
    </div>
    <div class="form-group">
        <label for="">email</label>
        <input type="email" class="form-control" name="email" email="true" required
               placeholder="">
    </div>
    <div class="form-group">
        <label for="">password</label>
        <input type="text"
               class="form-control" name="password" id="" required minlength="5">
    </div>
    <button type="submit" class="btn btn-primary btn-block">Submit</button>
</form>

```

```js
$.validator.setDefaults({
    submitHandler: function() {
    let param = $("#app-form").serialize();
    console.log(param)
    }
});
```

方式二：写在js里面 (html页面还是像上面一样)

```js
requirejs(["jquery","validate"],function ($){
    $.validator.setDefaults({
        submitHandler: function() {
            let param = $("#app-form").serialize();
            console.log(param)
        }
    });
    $().ready(function() {
        $("#app-form").validate({
            debug:true,
            rules:{
                username: 'required',
                password: {
                    required: true,
                    minlength: 2
                }
            }
        });
    });
});
```



### 编辑器-wangEditor

```javascript
var editor = "";
requirejs(['wangEditor'],function (E) {
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

<p class="layui-icon copy" data-clipboard-text="将要被复制的文字">点击复制</p>
```

```javascript
// 剪贴板
requirejs(["clipboard"],function (clipboard){
    new clipboard('.copy-btn');
});

requirejs(["clipboard","notyf"],function (clipboard){
            var notyf = new Notyf();
            let copy = new clipboard('.copy');
            copy.on('success', function(e) {
                notyf.confirm("已复制:"+e.text);
                e.clearSelection();
            });

            copy.on('error', function() {
                notyf.confirm("复制失败!");
            });
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

## jquery常用方法

### 父级

jQuery.parent(expr) 找父亲节点，可以传入expr进行过滤，比如$("span").parent()或者$("span").parent(".class")

jQuery.parents(expr),类似于jQuery.parents(expr),但是是查找所有祖先元素，不限于父元素

### 子级

jQuery.children(expr).返回所有子节点，这个方法只会返回直接的孩子节点，不会返回所有的子孙节点

jQuery.contents(),返回下面的所有内容，包括节点和文本。这个方法和children()的区别就在于，包括空白文本，也会被作为一个jQuery对象返回，children() 则只会返回节点

###  同级

jQuery.prev()，返回上一个兄弟节点，不是所有的兄弟节点

jQuery.prevAll()，返回所有之前的兄弟节点

jQuery.next(), 返回下一个兄弟节点，不是所有的兄弟节点

jQuery.nextAll()，返回所有之后的兄弟节点

jQuery.siblings(), 返回兄弟姐妹节点，不分前后

### ajax图片上传案例

```html
<div class="form-group">
    <input type="file" accept="image/*" class="form-control-file" id="upload-pic" capture="camera">
    <img id='img' src="">
    <input type="hidden" name="pic" id="pic">
</div>
```

```js
$("#upload-pic").change(function (event) {
    let files = event.target.files[0];
    let param = new FormData();
    param.append("files",files);
    //上传图片
    $.ajax({
        type: "post",
        url: '{{ route("test.upload") }}',
        data: param,
        processData: false,
        contentType: false,
        dateType: 'JSON',
        success:function (res) {
            if (res.code == 0){
                $("#upload-pic").siblings("img").attr("src",res.data).css({"width":'200px',"hieght":'200px'});
                $("#upload-pic").siblings("#pic").attr("value",res.data);
                // layer.msg(res.msg);
                console.log($(this))
            }else{
                // layer.msg(res.msg)
            }
        },
        error:function () {
            // layer.alert("网络错误！");
        }
    });
});
```



## 滚动到底部加载更多

> 加载到底部不一定要相等，小于一个值后就可以触发加载了，毕竟请求数据也需要时间
>
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

## 点击复制

懒得折腾就是用上面的插件吧。

```html
 <input type="text" id="input" value="http://orangbus.cn">
<a href="javascript:;" class="copyDom">复制</a>
```

```js
//复制地址
$('.copyDom').on('click', function () {
    var copyVal = $('#input').val();
    copyToClipboard(copyVal);
    layer.msg('复制成功');
});

function copyToClipboard(s) {
    if (window.clipboardData) {
        window.clipboardData.setData('text', s);
    } else {
        (function (s) {
            document.oncopy = function (e) {
                e.clipboardData.setData('text', s);
                e.preventDefault();
                document.oncopy = null;
            }
        })(s);
        document.execCommand('Copy');
    }
}
```

