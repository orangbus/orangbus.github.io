> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 https://segmentfault.com/a/1190000020938061

前言
--

开发微信小程序时，基本上都要接入微信的 SDK，而微信也提供了非常多的接口供我们去完成我们想要的功能。微信分享功能常常是我们在开发中常见的需求之一，本文将围绕微信分享接口使用展开，给自己以后碰到需求是查阅的同时，也希望对需要的朋友提供帮组。

封装微信分享接口
--------

> 开始之前大家可以先读一读官方微信公众号的[接入文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#111)，毕竟官方的才是最权威的。

### 安装

```
 npm install weixin-js-sdk 

```

### 引入

一般我会在`src/common/js`目录下新建`weixinSDK.js`(可凭个人习惯自行创建到相应位置)。`weixinSDK.js`用来封装我们的分享接口。

```
import {httpGet} from 'api/api' 
import address from '../../api/apiAdd.js' 
import wx from 'weixin-js-sdk' 
import {commFunc} from "./util";引入工具函数

```

### 权限验证

接入微信接口的最主要也是最重要一步步就是填写下面这些信息，填完这些信息之后，基本就好了。

```
function initAPIs(data,param) {
  wx.config({
    debug: false, 
    appId: data.appId, 
    timestamp: data.timestamp, 
    nonceStr: data.nonceStr, 
    signature: data.signature,
    jsApiList: param.APIs 
  })
  ...
}

```

上面这些信息通常是通过后端接口来获取的，向后端请求数据的方法如下。

`注意address.weChatSignCheck是封装在apiAdd.js中的url, httpGet是api.js中的axios封装。`

```
function sign(param) {
  var pageUrl = window.location.href
  httpGet(address.weChatSignCheck + '?pageUrl=' +pageUrl).then((res) => {
  param.downloadUrl = res.data.downloadUrl
  initAPIs(res.data,param)
  })
}

```

这里要注意的就是`url`的问题，如果`url`没有正确传递，后端也会返回信息，但是签名信息会是错误的。完整`url`指的是：'`http(s)://`'部分，以及'`？`'后面的`GET`参数部分, 但不包括'`#`'`hash`后面的部分。可以通过`location.href`来获取。

**注意**： 如果你的`vue`项目，路由没有开启`history`模式, 也就是你的 url 上面包含 “#”，这个时候要从后端正确获取签名，就需要去掉`url`上`#`后面的字符。（`url`去掉'`#`'`hash`部分，可用`location.href.split('#')[0]`）

### 处理验证结果

这里通过`ready`接口处理成功验证。当然`error`接口是处理失败验证，这里可以不做处理，因为我在配置时候将`debug`设为`false`。

```
function initAPIs(data,param) {
... 
 wx.ready(function () {
   if (commFunc.isNotEmpty(param.callback)) {
    share(param.callback)
   }
  })
}

```

上面代码中`commFunc.isNotEmpty()`方法主要用来判断前台页面参数`param.callback`是否为空，如果部位空，则将参数传进使用`share()`方法封装的分享模板中。

### 判断指定 JS 接口

`checkJsApi`接口是客户端 6.0.2 新引入的一个预留接口，主要同来判断当前客户端版本是否支持指定`JS`接口。

```
function initAPIs(data,param) {
... 
wx.checkJsApi({
    jsApiList:param.APIs,
    success: function (res) {
      return res
    }
  })
}

```

### 分享内容封装

将要分享的内容分装成`tempParam`对象，然后传入分享方法里。

```
export function share(param) {
  var title = param.title
  var imgUrl = param.imgUrl
  var description =param.description
  var url=param.url
  var successMethod = param.successMethod
  var tempParam = {
    'title': title, 
    'desc': description, 
    'link': url, 
    'imgUrl': imgUrl, 
    success: successMethod 
  };

```

### 分享方法调用

根据要分享到具体哪里，调用不同的方法。

```
wx.onMenuShareAppMessage(tempParam);

wx.onMenuShareTimeline(tempParam);

```

需要注意的是，原有的 `wx.onMenuShareTimeline`、`wx.onMenuShareAppMessage`接口，即将废弃。请尽快迁移使用客户端`6.7.2`及`JSSDK 1.4.0`以上版本支持的 `wx.updateAppMessageShareData`、`wx.updateTimelineShareData`接口。

```
wx.updateAppMessageShareData(tempParam);

wx.updateTimelineShareData(tempParam);

```

### 具体使用方法

```
export function init(param) {
  if (!param) {
    return
  }
  sign(param)
}

```

这里使用`init`方法给页面调用分享功能。

### 页面调用方法

```
<template>
    ...
</template>
<script>
import { init } from 'common/js/weiXinSDK'
import wx from 'weixin-js-sdk'
let origin = window.location.origin
export default {
    mode: 'history',
    data() {
      return {
        imgUrl: '../../common/image/axa-logo.png'
      }
    },
    created() {
      init({
        APIs: ['hideOptionMenu', 'hideAllNonBaseMenuItem', 'showMenuItems', 'hideMenuItems', 'onMenuShareTimeline', 'onMenuShareAppMessage'],
        callback: {
          'title': '微信分享',
          'imgUrl': this.imgUrl,
          'description': '分享',
          'url': origin + '/#/produtList?isShare=1&openId=' + this.$store.state.openId,
          successMethod: ''
        }
      })
<script>

```

上面代码`APIs`根据自己的实际场景自行配置。

分享接口基本完成，分享接口的完整代码
------------------

**weixinSDK.js 完整代码奉上：**

```
import {httpGet} from 'api/api'
import address from '../../api/apiAdd.js'
import wx from 'weixin-js-sdk'
import {commFunc} from "./util";


export function share(param) {
  var title = param.title
  var imgUrl = param.imgUrl
  var description =param.description
  var url=param.url
  var successMethod = param.successMethod
  var tempParam = {
    'title': title,
    'desc': description,
    'link': url,
    'imgUrl': imgUrl,
    success: successMethod
  };
  
  wx.onMenuShareAppMessage(tempParam);
  
  wx.onMenuShareTimeline(tempParam);
}


export function init(param) {
  if (!param) {
    return
  }
  sign(param)
}


function sign(param) {
  var pageUrl = window.location.href
  httpGet(address.weChatSignCheck + '?pageUrl=' +pageUrl).then((res) => {
  param.downloadUrl = res.data.downloadUrl
  initAPIs(res.data,param)
  })
}

function initAPIs(data,param) {
  wx.config({
    debug: false, 
    appId: data.appId,
    timestamp: data.timestamp,
    nonceStr: data.nonceStr,
    signature: data.signature,
    jsApiList: param.APIs
  })
  
  wx.ready(function () {
   if (commFunc.isNotEmpty(param.callback)) {
     console.log(param.callback)
    share(param.callback)
   }
  })
  
  wx.checkJsApi({
    jsApiList:param.APIs,
    success: function (res) {
      return res
    }
  })
}


```

结语
--

希望这篇文章可以让你少踩点坑，码字不易，如果喜欢，就给个❤❤吧。感谢你的支持。