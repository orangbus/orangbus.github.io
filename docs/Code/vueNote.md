---
title: Vue学习笔记
sidebar: auto
---

## Vue 前端笔记

> 推荐扩展包

```bash
npm i --save moment  //时间戳处理
npm i --save vuex
npm i --save axios

npm install --save-dev babel-cli
npm i babel-plugin-transform-es2015-modules-commonjs
```

## 微信环境检测

```js
let wx = navigator.userAgent.toLowerCase();
    if (wx.match(/MicroMessenger/i) == "micromessenger") {
        window.location.href = (`${adminApi}/login/oauth?pid=${pid}`);
}
```

## 数值处理

### 保留小数点两位

```javascript
{{money.toFixed}}
```

## vue返回上一页

```javascript
onclick="window.history.go(-1)"
```

## npm使用国内镜像的方法

一.通过命令配置

1. 命令

```bash
npm config set registry https://registry.npm.taobao.org
```

2. 验证命令

```bash
npm config get registry
```

如果返回https://registry.npm.taobao.org，说明镜像配置成功。

二、通过使用cnpm安装

1. 安装cnpm

```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

2. 使用cnpm

```bash
cnpm install package
```

## vue-axios

```bash
npm i axios --save
npm i vue-axios --save
```

```bash
# mian.js
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
```

```
# mian.js
//配置Axios请求头
axios.defaults.headers.common['Authorization'] = Token.get("token");
```

导航登录前端判断

```

```

### 设置请求超时

```
axios.defaults.timeout = 10000;
```

### 路由配置

```javascript
{
    path: "/user",
    name: "User",
    meta: {
      title: "个人中心",
      keepAlive: true,
      footer: true,
      auth: true
    },
    component: User
}
# 页面跳转拦截判断
router.beforeEach((to,form,next) =>{
  const {requireAuth} = to.meta;
  console.log(to.name , form.name,requireAuth);
  //是否需要登录后才能访问
  console.log(Token.get("token"))
  if (requireAuth === true || Token.get("token") !== null){
      console.log(requireAuth);
      next("/Sign");
  }
  next();
});
      
      
```



### 请求拦截

```
//请求拦截
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (Token.get('token') == null){
    console.log("axios:"+Token.get("token"))
    // window.location.href = "/Sign";
  }
  //配置Axios请求头
  axios.defaults.headers.common['Authorization'] = Token.get("token");

  console.log("axios:"+Token.get("token"))
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
```

```
config.headers['Authorization'] = 'Bearer '+ jwtToken.getToken();
```



### 响应的拦截

```

```

## 微信分享

```js
//微信分享 
let param = {
     url: window.location.href,
     title: `${this.$store.state.User.nickname}正在参加${this.title}活动`,
     desc : `他的宣言是：${data.data.info}`,
     imgUrl: imgUrl+data.data.pic,
     link: window.location.href + "&pid=" +this.$store.state.User.
 }
 wxShare(param)
```

## pid 传值问题

```javascript
let pid = this.pid;
if (!pid){
    pid = this.$store.state.User.id;
}
```





## 图片上传

- 首先获取本地需要上传的文件，格式

  ![image-20200508091612362](/home/orangbus/.config/Typora/typora-user-images/image-20200508091612362.png)

  ```
  let img = file[0];
  let formdata = new FormData();
  formdata.append("file",img)
  image(formdata).then(res =>{
  console.log(res.data);
  });
  ```

- 案例

  ```javascript
  <input type="file" accept="image/gif, image/jpeg, image/png, image/jpg">
  
  
  ```

## 时间选择

```js
laydate.render({
    elem: '#pmtime'
    ,type: 'time'
    ,range: true
    ,trigger:'click',
});
```



## 单选

```html
this.data.sex:1

<input type="radio" name="sex" value="0" title="男" :checked="sex!=1?true:false">
<input type="radio" name="sex" value="1" title="女" :checked="sex==1?true:false">
```

## vue渲染使用JQuery

```js
let Dom = event.currentTarget;
$(Dom).parent().parent().parent().hide();
```

## 滚动监听

```js
//mounted
window.addEventListener('scroll', this.scrollDs)

scrollDs: function () {
this.scroll = window.pageYOffset;
    if (this.scroll > 300){
    document.title = this.article.title;
    // this.title = this.article.title;
    }

}
```

```js
 v-infinite-scroll="scrollMore"
 
isloading: false,
page: 1,
limit: 15,
isend: false

 //loading more 只需要到底部一段距离就可以执行加载了
  scrollMore(){
      let scrollTop = $('.class')[0].scrollTop;
      let windowHeight = $('.class')[0].clientHeight;
      let scrollHeight = $('.class')[0].scrollHeight;
      if(scrollTop + windowHeight == scrollHeight){
          if (this.isend === true){
              return false;
          }
          if (this.isloading === true) {
              this.isloading = false;
              this.page += 1;
              let data = {
                  page: this.page,
                  limit: this.limit,
              }
              let that = this;
              layui.use("layer",function () {
                  var layer = layui.layer;
                  layer.load()
              })
              myTeam(data).then(res => {
                  let data = res.data;
                  if (data.code == 1) {
                      if (data.data.length !== 0) {
                          data.data.map(val => {
                              that.lists.push(val);
                          })
                          layer.closeAll('loading');
                          this.isloading = true;
                          return false;
                      }else{
                          layer.closeAll('loading');
                          //数据加载完了
                          this.isend = true;
                          return false;
                      }

                  } else {
                      layer.msg(data.msg);
                      return false;
                  }
              })
              return false;
          } 
      }
      this.isloading = true;
  },
```

```
scrollBot() {
                if (this.isloading == true) {
                    this.isloading = false;
                    this.page += 1;
                    this.limit += 15;
                    let data = {
                        page: this.page,
                        limit: this.limit
                    }
                    let that = this;
                    layer.load()
                    article(data).then(res => {
                        let data = res.data;
                        if (data.code == 1) {
                            if (data.data.length !== 0) {
                                console.log("res")
                                console.log(data.data)
                                data.data.map(val => {
                                    that.articleList.push(val);
                                })
                                layer.closeAll('loading');
                                this.isloading = true;
                            }else{
                                layer.closeAll('loading');
                                //数据加载完了
                                this.isend = true;
                                console.log(this.isend)
                            }

                        } else {
                            layer.msg(data.msg);
                        }
                    })
                    return false;
                    // alert('加载数据')
                }
                // alert('到底部了')
                this.isloading = true;
            },
```

## 到底加载

```javascript
mounted() {
        window.addEventListener('scroll', this.loadMore, true);
    },
```



```javascript
// methods

loadMore(e) {
    const scrollTopHeight = document.documentElement.scrollTop || document.body.scrollTop //滚动高度
    const clientHeight = document.documentElement.clientHeight || window.screen.availHeight //屏幕可用工作区高度
    const offsetHeight = document.documentElement.offsetHeight || document.body.offsetHeight //网页可见区域高(包括边线的宽)

    if ((scrollTopHeight + clientHeight) + 100 >= offsetHeight && this.$route.path="/movie") {
        if (this.busy) {
            return;
        }

        if (this.is_end) {
            return;
        }

        this.busy = true
        this.page += 1;
        this.getData();
    }
},

```

```javascript
destroyed() {
        window.removeEventListener('scroll', this.handleScroll);
    },
```

## 时间处理

> http://momentjs.cn/

```
npm install moment --save

//时间戳转时间
import moment from "moment";
filters: {
    //时间戳转时间
    formatDate(time) {
    return moment(parseInt(time * 1000)).format('YYYY-MM-DD hh:mm:ss');
    }
},
```

## vuex-state

```js
import {mapState} from 'vuex';
computed:{
    ...mapState({
    user: state=>state.User
    })
},
```

```
https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appid}&redirect_uri=${this.redirect_uri}&response_type=code&scope=${this.scope}&state=${this.state}#wechat_redirect
```



## 跨域

```javascript
// ２.0配置
module.exports = {
    dev: {
        proxyTable: {
          '/api': {
            target: "http://localhost/api",
            secure: false,  // 如果是https接口，需要配置这个参数
            changeOrigin: true,　//是否跨域
            ws: true,
            pathRewrite: {
              '^/api': ''
            }
          }
        },
    }
}
// 3.0配置
devServer:{
      proxy : {
        '/api':{
          target: baseUrl,
          changeOrigin: true,
          ws: true,
          pathRewrite:{
            '^/api': ''
          }
        }
      }
    }
```

## vue处理时间戳转如期方法

```javascript
yarn add moment --save
# use
{{item.change_time | formatDate}}

import moment from "moment";

filters:{
    //时间戳转时间
    formatDate(time) {
        return moment(parseInt(time*1000)).format('YYYY-MM-DD HH:mm:ss');
    },
},
```

## 如何获取 v-for 的某个值

```
@click="show(index)"

show:function(){
	this.lists[index].val
}
```

## 常用方法

```javascript
# localStorage.js
function localStorage() {
  return window.localStorage;
}

function get(key) {
  return JSON.parse(localStorage().getItem(key));
}

function set(key, data) {
  return localStorage().setItem(key, JSON.stringify(data));
}

function all() {
  const data = {};
  for (var i = localStorage().length - 1; i >= 0; i--) {
    var key = localStorage().key(i);
    data[key] = get(key);
  }

  return data;
}

function remove(key) {
  return localStorage().removeItem(key);
}

function clearAll() {
  return localStorage().clear();
}

function has(key) {
  return localStorage().getItem(key) !== null;
}

export default {
  get,
  set,
  all,
  remove,
  clearAll,
  has
};


------------------------------------------------------------

let TokenSet = (key,value)=>{
    return window.localStorage.setItem(key,value)
}
let TokenGet = (key)=>{
    return window.localStorage.getItem(key)
}
let TokenDel = (key)=>{
    return window.localStorage.removeItem(key);
}
let TokenRemove = ()=>{
    return window.localStorage.clear();
}

export {TokenSet,TokenGet,TokenDel,TokenRemove}
```

## 验证码倒计时

```html
<button v-show="show" @click="getCode">获取验证码</button>
<button v-show="!show" class="count">{{count}} s</button>
```

```js
# data
show: true,
count: '',
timer: null,
    
#methods
getCode(){
    const TIME_COUNT = 60;
    if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
                this.count--;
            } else {
                this.show = true;
                clearInterval(this.timer);
                this.timer = null;
            }
        }, 1000)
    }
},
```

## vue数组元素交换位置

i: 当前移动的元素

1: 移动长度

```javascript
var tempOption = this.resourceLists[i - 1];
this.$set(this.resourceLists, i - 1, this.resourceLists[i]);
this.$set(this.resourceLists, i, tempOption)
```

## 数组插入

```javascript
this.list.splice(i,1)
```



```javascript
// 原来的数组
var array = ["one", "two", "four"];
// splice(position, numberOfItemsToRemove, item)
// 拼接函数(索引位置, 要删除元素的数量, 元素)
array.splice(2, 0, "three");
 
array;  // 现在数组是这个样子 ["one", "two", "three", "four"]
```

```javascript
Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item);
};
---
var nums = ["one", "two", "four"];
nums.insert(2, 'three'); // 注意数组索引, [0,1,2..]
array	// ["one", "two", "three", "four"]
```



## 数组删除

```javascript
```



## 根据值获取到索引值

```javascript
let book_name = ['1984','动物庄园','乌合之众']
let i = book_name.indexOf('动物庄园')
book_name.splice(i,1)
console.log(book_name)  //[ '1984', '乌合之众' ]
```

## set

set对象是值的集合,元素只会出现一次,即Set中的元素是唯一的.

### set对象与数组之间的转换

```javascript
var arr = [1,2,3,4,4];
var set = new Set(arr) //数组转换set对象
set //{1,2,3,4}
//方法一
Array.from(set) //[1,2,3,4]
//方法二
[...set] //[1,2,3,4]
```

### 集合操作

```javascript
let items = new Set(["orangbus","bus","apple"]);
items.add("banana");

items.has("orangbus") // true

items.delete("bus"); // true
// {"orangbus","apple","banana"}


```

## array

```
var a = [1,2,3,4,5,6,7,8,9,0];

// 添加
a.push(10);

// 截取
a.slice(start,end);

// 删除
a.spl

// 转换为字符串
a.toString(); //"1,2,3,4,5,6,7,8,9,0,10"

// 分隔符
a.json("|"); // "1|2|3|4|5|6|7|8|9|0|10"

```



