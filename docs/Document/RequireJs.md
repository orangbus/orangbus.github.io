---
title: RequireJs案例
sidebar: auto
---
> Gitee: https://gitee.com/orangbus/requirejs

## How to start ?

### 1.clone in you public or static/

```
git clone https://gitee.com/orangbus/requirejs.git --depth 1
```

### 2.include in html head

```
<script src="js/require.js"></script>
<script src="js/main.js"></script>
```

Tips：不能颠倒顺序，否则各种bug

### 3.use in `script` 

## bootstrap4

```javascript
requirejs(['bootstrap4','validate'],function (){
    $.validator.setDefaults({
        submitHandler: function() {
            // 表单数据
            let param = $("#bootstrap_form").serialize();
            console.log(param)
            alert("请打开控制台查看提交信息");
            return false;
        }
    });
});
```

## vue、axios

```javascript
requirejs(["vue","axios"],function (Vue,axios) {
    console.log(Vue);
    new Vue({
        el: "#app",
        data(){
            return {
                msg: 'Hello Vue'
            }
        },
        created(){
            axios.post("http://httpbin.org/post",{name:"orangbus"}).then(res => {
                console.log(res.data);
            });
        },
        methods:{
            demo(){
                alert("I'm form vue method")
            }
        }
    });
});
```

## notyf - 消息弹窗提示

```javascript
requirejs(["jquery","notyf"],function ($) {
       console.log($,"jquery");
       let notyf = new Notyf();
       notyf.confirm("notyf success!!")
   });
```

## layui-ui框架

layui框架

```javascript
requirejs(["layui"],function () {
       layui.use("layer",function () {
           var layer = layui.layer;
           layer.msg("Hello Layer!!");
       });
   });
```

## layer - 弹窗

```javascript
requirejs(["layer"],function () {
       layer.msg("Hello Layer!!");
});
```

## dropzone - 文件上传

```javascript
requirejs(["jquery","dropzone"],function ($) {
    Dropzone.autoDiscover = false;
    $("#dropzone-pic").dropzone({
        paramName: "file", // The name that will be used to transfer the file
        maxFilesize: 2, // MB
        method: 'post',
        chunking: true,
        capture: true,
        url: 'http://httpbin.org/post',
        success:function (res){
            console.log(res);
        }
    })
});

```

## viewer图片放大

```html
<div>
    <ul id="images">
        <li><img src="https://fengyuanchen.github.io/jquery-viewer/images/tibet-1.jpg" alt="Picture 1"></li>
        <li><img src="https://fengyuanchen.github.io/jquery-viewer/images/tibet-1.jpg" alt="Picture 2"></li>
        <li><img src="https://fengyuanchen.github.io/jquery-viewer/images/tibet-1.jpg" alt="Picture 3"></li>
    </ul>
</div>
```

```javascript
requirejs(['viewer'],function (Viewer) {
       new Viewer(document.getElementById('images'));
}
```

可参考：https://mirari.cc/2017/08/27/Vue%E5%9B%BE%E7%89%87%E6%B5%8F%E8%A7%88%E7%BB%84%E4%BB%B6v-viewer%EF%BC%8C%E6%94%AF%E6%8C%81%E6%97%8B%E8%BD%AC%E3%80%81%E7%BC%A9%E6%94%BE%E3%80%81%E7%BF%BB%E8%BD%AC%E7%AD%89%E6%93%8D%E4%BD%9C/

## hsycmsAlert-弹窗

> https://gitee.com/sywlgzs/hsycmsAlert

一个好看的弹窗

```javascript
<script>
    //参数说明 文字,方法

   //普通弹窗 
   function alert(txt){     
      hsycms.alert(txt,()=>{
				console.log("关闭后");
			})
   }

   //提示弹窗
   function tips(txt){
     hsycms.tips(txt,()=>{
       console.log("提示关闭后");
     },2000)
   }

   //询问弹窗
   function confirm(){
      hsycms.confirm('确定要这么做',
         function(res){            
            hsycms.success('点击了确定');
         },
        function(res){
            hsycms.fail('点击了取消');
         },
      )
   }

   //操作成功调用 
   function success(){
     hsycms.success('操作成功',()=>{  console.log('操作成功关闭后');  },1800)
   }

   //操作失败调用
   function error(){
    hsycms.fail('操作失败',()=>{  console.log('操作失败关闭后');  },1800)
   }

   //显示loading
   function loading(){
      hsycms.loading('正在加载');
      //2秒后隐藏
      setTimeout(res=>{
         hsycms.closeAll();
      },2000)
   }

 </script>
```

![](https://images.gitee.com/uploads/images/2020/0901/105308_177844d8_508872.gif) 

## MomentJS时间处理

时间处理插件：https://juejin.cn/post/6844903520450134024

## markdown在线编辑器

> github:https://github.com/siyuan-note/siyuan
>
> doc:https://ld246.com/article/1549638745630

