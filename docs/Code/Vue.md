```
title: vue日常笔记
```

# vu脚手架3.x

官网：https://cli.vuejs.org/guide/installation.html

```bash
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

创建一个新项目

```bash
vue create app
```

运行项目

```bash
cd app
vue ui
npm run dev

```

## package推荐

### vue三剑客

```bash
npm i axios vue-router vuex
```

### mdui

```bash
npm - mdui --save
```

### bootstrap5

```bash

```

### bulma

https://bulma.io/documentation/overview/start/

```bash
npm install bulma
```

### 获取浏览器信息

https://www.npmjs.com/package/ua-parser-js

```
npm i ua-parser-js
```

### 获取en值

```.env
// .env
app_name=orangbus
```

```.env
process.env.app_name
```

## Vue数组操作

```js
let data = [
    {id:1,name: 'orangbus1'},
    {id:2,name: 'orangbus2'},
    {id:3,name: 'orangbus'},
];
// 新增
data.push({id:4,name:'orangbus4'});
// 删除
data.splice(index,1); //index 数组的索引

```



## 父组件给子组件传值

父页面

```
// content: 可以自定义
<content :content="value"></content
```

子页面,接受父组件传过来的值

```vue
props: [
	"content" //这里接受父组件传过来的值，然后就可以直接在页面中直接渲染，不用再data中定义
],
// 使用
{{ content }}
```

## 父组件删除子组件数据

```vue
<template>
    <div>
        <h1>子组件内容</h1>
        <h1 v-for="(item,index) in list" :key="index">
            {{item.name}}
            <button @click="delRemove(index)">删除</button>
        </h1>
    </div>
</template>
<script>
export default {
    name: "Demo",
    data(){
        return {
            list:[
                {id: 1,name:"orangbus1"},
                {id: 2,name:"orangbus2"},
                {id: 3,name:"orangbus3"},
                {id: 4,name:"orangbus4"},
                {id: 5,name:"orangbus5"},
            ],
        }
    },
    methods:{
        delRemove(id){
            let That = this;
            let data = {
              data: That.list,
              key: id
            };
            That.$parent.getChiren(data);
        }
    }
}
</script>
```

```js
getChiren(arr){
    let {key,data} = arr;
    data.splice(key,1);
    this.list = [];
    this.list.push(...data);
}
```

##  Vue 使用axios分片上传 

Vue的界面

```
 <input type="file"/>
```

上传方法

```javascript
fileUpload: function () {
    var num = 1
    var file = document.querySelector('input[type=file]').files[0]
    // var file = $("#file")[0].files[0];
    // this.msg.split('').reverse().join()
    // 声明一个FormData对象
    var formData = new FormData()
    var time = new Date().getTime()
    // 每片文件大小为5M
    var blockSize = 5 * 1024 * 1024
    var blockNum = Math.ceil(file.size / blockSize)
    var nextSize = Math.min(num * blockSize, file.size)
    var fileData = file.slice((num - 1) * blockSize, nextSize)
    formData.append('file', fileData)
    // 文件名
    formData.append('name', file.name)
    // 总片数
    formData.append('chunks', blockNum)
    formData.append('md5', time)
    formData.append('uid', '13570')       let config = {
        headers: {
            'Content-Type': 'multipart/form-data;boundary = ' + new Date().getTime()
        }
    }       axios.post('http://xxx/fileUpload', formData, config)
        .then(response => (
        this.info = response
    ))
        .catch(function (error) { // 请求失败处理
        console.log(error)
    })
}
```

## Vue变量引用值联动

```javascript
let fields = JSON.parse(JSON.stringify(that.fields));

let newFields = fields; //引用的是同一个数组

that.fields = fields; //引用的是不同的数组
```

