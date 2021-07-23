---
title: Vue-cli -axios 跨域
---

打开 `babel.config.js` 文件，添加一下代码：

```
module.exports = {
  proxy : {
      '/inc':{
        target:'http://cj.okzy.tv', //请求 api 域名
        changeOrigin: true,
        ws: true,
        pathRewrite:{
          '^/inc': '' //前缀，比如说：https://orangbus.cn/api(这个)/getlist.php
        }
      }
  }
}
```





