---
title: Javascript Note
sidebar: auto
---

# Js获取当前日期时间及其它操作

> https://www.cnblogs.com/carekee/articles/1678041.html

```javascript
var myDate = new Date();
myDate.getYear();    //获取当前年份(2位)
myDate.getFullYear();  //获取完整的年份(4位,1970-????)
myDate.getMonth();    //获取当前月份(0-11,0代表1月)
myDate.getDate();    //获取当前日(1-31)
myDate.getDay();     //获取当前星期X(0-6,0代表星期天)
myDate.getTime();    //获取当前时间(从1970.1.1开始的毫秒数)
myDate.getHours();    //获取当前小时数(0-23)
myDate.getMinutes();   //获取当前分钟数(0-59)
myDate.getSeconds();   //获取当前秒数(0-59)
myDate.getMilliseconds();  //获取当前毫秒数(0-999)
myDate.toLocaleDateString();   //获取当前日期
var mytime=myDate.toLocaleTimeString();   //获取当前时间
myDate.toLocaleString( );    //获取日期与时间
```



# Require.js使用

在入口文件中引入这两个文件

```js
<script src="/js/require.js"></script>
<script src="/js/main.js"></script>
```

## 表单验证

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



## 编辑器-wangEditor

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

## 剪贴板-[clipboard](https://clipboardjs.com/) 

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

## 消息提示-notyf 

```javascript
requirejs(["notyf"],function (){
    var notyf = new Notyf();
    notyf.confirm("notyf is ok!");
});
```

## 图片放大-magnify

```js
<img
    data-magnify="gallery"
    src="http://blockberry.test/storage/uploads/2020-11-04-13-19-15-5fa239d39e094.jpeg"
    data-src="http://blockberry.test/storage/uploads/2020-11-04-13-19-15-5fa239d39e094.jpeg"
    style="width: 100px;height: 100px;"
>
        
```

## 弹窗 - hsycmsAlert

好看的弹窗

```javascript
requirejs(["halert"],function (){
    //普通弹窗
   hsycms.alert('Hello doc.orangbus.cn')
});
```

全部方法

```javascript
<script>
    //普通弹窗
    function palert(txt) {
        hsycms.alert('普通弹窗普通弹窗普通弹窗普通弹窗普通弹窗')
    }

    //提示弹窗
    function tips(txt) {
        hsycms.tips('tips', function () {
            hsycms.tips('普通弹窗普通弹窗普通弹窗普通弹窗普通弹窗')
        }, 2000)
    }

    //询问弹窗
    function confirm() {
        hsycms.confirm('确定删除吗???',
            function (res) {
                hsycms.success('点击了确定');
            },
            function (res) {
                hsycms.fail('点击了取消');
            },
        )
    }

    //显示loading
    function loading() {
        hsycms.loading('loading', '正在加载');
    //2秒后隐藏
        setTimeout(res => {
            hsycms.hideLoading('loading');
        }, 2000)
    }

    //操作成功调用
    function success() {
        hsycms.success('操作成功', function () {

        }, 1800)
    }

    //操作失败调用
    function error() {
        hsycms.fail('fail', '操作失败', function () {
            console.log('操作失败关闭后');
        }, 1800)
    }

</script>
```



http://sywlgzs.gitee.io/hsycmsalert/

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

## 60s倒计时

```javascript
var timer = null;
var count = 5;
$("#get-code").click(function () {
    let phone = $("#phone").val();
    if (phone == ''){
        layer.msg("手机号不能为空!");
        return false;
    }
    var load = layer.load();
    axios.post("{{ route("seedSms") }}",{phone}).then(res=>{
    layer.close(load);
    layer.msg(res.msg);
    if (res.code !== 200){ return false; }
    $("#get-code").text(count + "后获取验证码");
    timer = setInterval(function () {
        count--;
        $("#get-code").text(count + "后获取验证码");
        if (count <= 0) {
            clearInterval(timer);
            $('#get-code').text('重新获取验证码');
        }
    },1000)
});
});
```

vue

```javascript
phone: "18388110000",
code: "",
txt: '获取验证码',
codeStatus: true


getCode(){
    let That = this;
    if (this.phone == ''){
        return this.$message.error("请输入验证码");
    }
    var timer = null;
    let counts = 60;
    if (That.codeStatus){
        That.codeStatus = false;
        seedSms({
            phone: this.phone,
        }).then(res=>{
            if (res.code ==200){
                this.$message.success(res.msg);
                timer = setInterval(function () {
                    counts--;
                    That.txt = counts+"秒";
                    if (counts <= 0){
                        That.txt = "重新获取";
                        That.codeStatus = true;
                        clearInterval(timer);
                    }
                },1000);
            }else{
                this.$message.error(res.msg);
            }
        });
    }else{
        this.$message.info("验证码已发送，请耐心等待！");
    }
}

```

## JS 删除数组的某一项

```javascript
<script>
    Array.prototype.indexOf = function(val){
        for (let i =0;i<this.length;i++){
            if (this[i] ==val) return i;
        }
        return -1;
    }
    Array.prototype.remove = function(val) {
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index, 1);
        }
    };
    var test = ['orangbus','doc.orangbus','github.com/orangbus/tool','other'];
    test.remove('other');//删除other
</script>
```

## js将数组转为字符串

1、`String(arr)` ：输出数组的每个元素值，用逗号分隔；

2、`arr.join("分隔符")` ：输出数组的每个元素之，用指定的分隔符分隔；

## js将字符串转为数组

```javascript
var str = '123,456,789';
var arr = str.split(',');
console.log(arr) //输出["123", "456", "789"]
```

## js for循环

> 循环对象，数组

```
var obj = {
	name: "orangbus",
	url: "orangbus.cn",
	job: 'linux运维'
};

for (item in obj){
	let key = item;
	let value = obj[item];
}
```

**添加、更新**

```javascript
obj['hobby'] = 'watch video'
```

**删除**

```javascript
for (item in obj){
    // 去空值
	if(!obj[item]){
        delete obj[item];
    }
}
```

## js foreach循环

> 循环数组

```javascript
var array = ["orangbus",18,"php","laravel","linux"];
// 添加
array.push("python");

array.forEach((item,index) =>{
	console.log(item,index)
    // 删除
    delete array[index]
})
```

## 文件上传

本地预览

```html
<div class="form-group">
    <label for="exampleInputEmail1">小店Logo</label>
    <input type="file" name="file" id="file" onchange="upload()">
    <div class="text-center mt-1" style="width: 50%;height: 50%;">
        <img src="/static/images/avatar.jpg" id="pic" class="img-thumbnail">
    </div>
</div>
```

```javascript
function upload() {
        let reads = new FileReader();
        let file = document.getElementById("file").files[0];
        reads.readAsDataURL(file);
        reads.onload = function (e) {
            console.log(e)
            document.getElementById("pic").src= this.result;
        }
    }
```

ajax文件上传

```html
<div class="form-group">
    <label>小店Logo</label>
    <input type="file" id="logo">
    <div class="text-center mt-1 flex-center" style="width: 50%;height: 50%;">
        <img id="pic" src="{$data->logo ?? ''}" class="img-thumbnail">
    </div>
    <input type="hidden" name="logo" id="logo-val" value="{$data->logo ?? ''}">
</div>
```

```javascript
$("#logo").change(function () {
    let reads = new FileReader();
    let file = $(this)[0].files[0];

    let formData = new FormData();
    formData.append("file",file)
    $.ajax({
        url:"{:url('upload')}",
        dataType:'json',
        type:'POST',
        async: false,
        data: formData,
        processData : false, // 使数据不做处理
        contentType : false, // 不要设置Content-Type请求头
        success: function(res){
            if (res.code == 200){
                layer.msg(res.msg);
                reads.readAsDataURL(file);
                reads.onload = function (e) {
                    $("#pic").attr("src",this.result).show()
                    $("#logo-val").val(res.data.url)
                }
            }else{
                layer.alert(res.msg);
            }
        },
        error:function(response){
            console.log(response);
        }
    });
});
```

# 返回

```javascript
function goBack() {
        document.referrer === '' ? window.location.href = "{:url('storeArc')}" : window.history.go(-1);
    }
```

