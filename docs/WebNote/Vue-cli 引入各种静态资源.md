---
title: Vue-cli 引入各种静态资源
---

## Bootstrap

```
yarn add bootstrap
```

打开 `main.js`

```
import "bootstrap/dist/css/bootstrap.min.css" //记得添加 .css 后缀
```

## jquery

``` 
yarn add jquery
```

项目根目录下添加 `vue.config.js` 文件

```
const webpack = require('webpack')
module.exports = {
    configureWebpack:{
        plugins:[
            new webpack.ProvidePlugin({
                $:"jquery",
                jQuery: "jquery",
            })
        ]
    }
}
```

打开 `main.js

```
import $ from 'jquery'
```

测试，随便打开一个.vue文件，添加

```
<script>
$(function () {
  alert('234')
})

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>
```

## sweetalert



## 自定义My.js文件

