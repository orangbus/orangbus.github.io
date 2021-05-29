---
title: RequireJs案例
sidebar: auto
---
> Gitee: https://gitee.com/orangbus/requirejs

## How to start ?

1.clone in you public or static

```
git clone https://gitee.com/orangbus/requirejs.git --depth 1
```

2.include in html head

```
<script src="js/require.js"></script>
<script src="js/main.js"></script>
```

3.in `script` use

## bootstrap

```javascript
requirejs(['bootstrap4','validate'],function (){
    $.validator.setDefaults({
        submitHandler: function() {
            alert("提交事件!");
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
            axios.get("http://httpbin.org/get").then(res => {
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

## notyf

```javascript
requirejs(["jquery","notyf"],function ($) {
       console.log($,"jquery");
       let notyf = new Notyf();
       notyf.confirm("notyf success!!")
   });
```

## layui

```javascript
requirejs(["layui"],function () {
       layui.use("layer",function () {
           var layer = layui.layer;
           layer.msg("Hello Layer!!");
       });
   });
```

## dropzone

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
