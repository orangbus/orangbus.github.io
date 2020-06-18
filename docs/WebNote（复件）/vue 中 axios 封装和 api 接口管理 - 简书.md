> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 https://www.jianshu.com/p/cac8e979e437

[![][img-0]

32020.01.06 15:06:55 字数 3,148 阅读 3,095

vue 中 Axios 的封装和 API 接口的管理

我们所要的说的 axios 的封装和 api 接口的统一管理，其实主要目的就是在帮助我们简化代码和利于后期的更新维护。

一、axios 的封装
-----------

在 vue 项目中，和后台交互获取数据这块，我们通常使用的是 axios 库，它是基于 promise 的 http 库，可运行在浏览器端和 node.js 中。他有很多优秀的特性，例如拦截请求和响应、取消请求、转换 json、客户端防御 XSRF 等。所以我们的尤大大也是果断放弃了对其官方库 vue-resource 的维护，直接推荐我们使用 axios 库。如果还对 axios 不了解的，可以移步 axios 文档。

### 安装

### 引入

一般我会在项目的 src 目录中，新建一个 request 文件夹，然后在里面新建一个 http.js 和一个 api.js 文件。http.js 文件用来封装我们的 axios，api.js 用来统一管理我们的接口。

```
import axios from 'axios'; 
import QS from 'qs'; 

import { Toast } from 'vant'; 



```

### 环境的切换

我们的项目环境可能有开发环境、测试环境和生产环境。我们通过 node 的环境变量来匹配我们的默认的接口 url 前缀。axios.defaults.baseURL 可以设置 axios 的默认请求地址就不多说了。

```
if (process.env.NODE_ENV == 'development') {    
    axios.defaults.baseURL = 'https://www.baidu.com';} 
else if (process.env.NODE_ENV == 'debug') {    
    axios.defaults.baseURL = 'https://www.ceshi.com';
} 
else if (process.env.NODE_ENV == 'production') {    
    axios.defaults.baseURL = 'https://www.production.com';
}


```

### 设置请求超时

通过 axios.defaults.timeout 设置默认的请求超时时间。例如超过了 10s，就会告知用户当前请求超时，请刷新等。

```
axios.defaults.timeout = 10000;


```

### post 请求头的设置

post 请求的时候，我们需要加上一个请求头，所以可以在这里进行一个默认的设置，即设置 post 的请求头为 application/x-www-form-urlencoded;charset=UTF-8

```
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';


```

*   请求拦截

我们在发送请求前可以进行一个请求的拦截，为什么要拦截呢，我们拦截请求是用来做什么的呢？比如，有些请求是需要用户登录之后才能访问的，或者 post 请求的时候，我们需要序列化我们提交的数据。这时候，我们可以在请求被发送之前进行一个拦截，从而进行我们想要的操作。

### 请求拦截

```
import store from '@/store/index';


    config => {        
        
        
        
        const token = store.state.token;        
        token && (config.headers.Authorization = token);        
        return config;    
    },    
    error => {        
        return Promise.error(error);    
})



```

这里说一下 token，一般是在登录完成之后，将用户的 token 通过 localStorage 或者 cookie 存在本地，然后用户每次在进入页面的时候（即在 main.js 中），会首先从本地存储中读取 token，如果 token 存在说明用户已经登陆过，则更新 vuex 中的 token 状态。然后，在每次请求接口的时候，都会在请求的 header 中携带 token，后台人员就可以根据你携带的 token 来判断你的登录是否过期，如果没有携带，则说明没有登录过。这时候或许有些小伙伴会有疑问了，就是每个请求都携带 token，那么要是一个页面不需要用户登录就可以访问的怎么办呢？其实，你前端的请求可以携带 token，但是后台可以选择不接收啊！

### 响应的拦截

```
axios.interceptors.response.use(    
    response => {   
        
        
        if (response.status === 200) {            
            return Promise.resolve(response);        
        } else {            
            return Promise.reject(response);        
        }    
    },    
    
    
    
    
    error => {            
        if (error.response.status) {            
            switch (error.response.status) {                
                
                
                
                case 401:                    
                    router.replace({                        
                        path: '/login',                        
                        query: { 
                            redirect: router.currentRoute.fullPath 
                        }
                    });
                    break;

                
                
                
                
                case 403:
                     Toast({
                        message: '登录过期，请重新登录',
                        duration: 1000,
                        forbidClick: true
                    });
                    
                    localStorage.removeItem('token');
                    store.commit('loginSuccess', null);
                    
                    setTimeout(() => {                        
                        router.replace({                            
                            path: '/login',                            
                            query: { 
                                redirect: router.currentRoute.fullPath 
                            }                        
                        });                    
                    }, 1000);                    
                    break; 

                
                case 404:
                    Toast({
                        message: '网络请求不存在',
                        duration: 1500,
                        forbidClick: true
                    });
                    break;
                
                default:
                    Toast({
                        message: error.response.data.message,
                        duration: 1500,
                        forbidClick: true
                    });
            }
            return Promise.reject(error.response);
        }
    }    
});


```

响应拦截器很好理解，就是服务器返回给我们的数据，我们在拿到之前可以对他进行一些处理。例如上面的思想：如果后台返回的状态码是 200，则正常返回数据，否则的根据错误的状态码类型进行一些我们需要的错误，其实这里主要就是进行了错误的统一处理和没登录或登录过期后调整登录页的一个操作。

**要注意的是，上面的 Toast() 方法，是我引入的 vant 库中的 toast 轻提示组件，你根据你的 ui 库，对应使用你的一个提示组件。**

### 封装 get 方法和 post 方法

我们常用的 ajax 请求方法有 get、post、put 等方法，相信小伙伴都不会陌生。axios 对应的也有很多类似的方法，不清楚的可以看下文档。但是为了简化我们的代码，我们还是要对其进行一个简单的封装。下面我们主要封装两个方法：get 和 post。

**get 方法**：我们通过定义一个 get 函数，get 函数有两个参数，第一个参数表示我们要请求的 url 地址，第二个参数是我们要携带的请求参数。get 函数返回一个 promise 对象，当 axios 其请求成功时 resolve 服务器返回 值，请求失败时 reject 错误值。最后通过 export 抛出 get 函数。

```
export function get(url, params){    
    return new Promise((resolve, reject) =>{        
        axios.get(url, {            
            params: params        
        }).then(res => {
            resolve(res.data);
        }).catch(err =>{
            reject(err.data)        
    })    
});}


```

**post 方法：**原理同 get 基本一样，但是要注意的是，post 方法必须要使用对提交从参数对象进行序列化的操作，所以这里我们通过 node 的 qs 模块来序列化我们的参数。这个很重要，如果没有序列化操作，后台是拿不到你提交的数据的。这就是文章开头我们 import QS from 'qs'; 的原因。如果不明白序列化是什么意思的，就百度一下吧，答案一大堆。

```
export function post(url, params) {
    return new Promise((resolve, reject) => {
         axios.post(url, QS.stringify(params))
        .then(res => {
            resolve(res.data);
        })
        .catch(err =>{
            reject(err.data)
        })
    });
}


```

这里有个小细节说下，axios.get() 方法和 axios.post() 在提交数据时参数的书写方式还是有区别的。区别就是，get 的第二个参数是一个 {}，然后这个对象的 params 属性值是一个参数对象的。而 post 的第二个参数就是一个参数对象。两者略微的区别要留意哦！

axios 的封装基本就完成了，下面再简单说下 api 的统一管理。
----------------------------------

整齐的 api 就像电路板一样，即使再复杂也能很清晰整个线路。上面说了，我们会新建一个 api.js, 然后在这个文件中存放我们所有的 api 接口。

*   首先我们在 api.js 中引入我们封装的 get 和 post 方法

```
import { get, post } from './http'


```

现在，例如我们有这样一个接口，是一个 post 请求：

```
http://www.baiodu.com/api/v1/users/my_address/address_edit_before


```

我们可以在 api.js 中这样封装：

```
export const apiAddress = p => post('api/v1/users/my_address/address_edit_before', p);


```

我们定义了一个 apiAddress 方法，这个方法有一个参数 p，p 是我们请求接口时携带的参数对象。而后调用了我们封装的 post 方法，post 方法的第一个参数是我们的接口地址，第二个参数是 apiAddress 的 p 参数，即请求接口时携带的参数对象。最后通过 export 导出 apiAddress。

然后在我们的页面中可以这样调用我们的 api 接口：

```
import { apiAddress } from '@/request/api';
export default {        
    name: 'Address',    
    created () {
        this.onLoad();
    },
    methods: {            
        
        onLoad() {
            
            apiAddress({                    
                type: 0,                    
                sort: 1                
            }).then(res => {
                
                ………………                
            })            
        }        
    }
}


```

其他的 api 接口，就在 pai.js 中继续往下面扩展就可以了。友情提示，为每个接口写好注释哦！！！

api 接口管理的一个好处就是，我们把 api 统一集中起来，如果后期需要修改接口，我们就直接在 api.js 中找到对应的修改就好了，而不用去每一个页面查找我们的接口然后再修改会很麻烦。关键是，万一修改的量比较大，就规格 gg 了。还有就是如果直接在我们的业务代码修改接口，一不小心还容易动到我们的业务代码造成不必要的麻烦。

好了，最后把完成的 axios 封装代码奉上。

```
import axios from 'axios';import QS from 'qs';
import { Toast } from 'vant';
import store from '../store/index'


if (process.env.NODE_ENV == 'development') {    
    axios.defaults.baseURL = '/api';
} else if (process.env.NODE_ENV == 'debug') {    
    axios.defaults.baseURL = '';
} else if (process.env.NODE_ENV == 'production') {    
    axios.defaults.baseURL = 'http://api.123dailu.com/';
}


axios.defaults.timeout = 10000;


axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';


axios.interceptors.request.use(    
    config => {
        
        
        const token = store.state.token;        
        token && (config.headers.Authorization = token);        
        return config;    
    },    
    error => {        
        return Promise.error(error);    
    })


axios.interceptors.response.use(    
    response => {        
        if (response.status === 200) {            
            return Promise.resolve(response);        
        } else {            
            return Promise.reject(response);        
        }    
    },
    
    error => {        
        if (error.response.status) {            
            switch (error.response.status) {                
                
                
                
                case 401:                    
                    router.replace({                        
                        path: '/login',                        
                        query: { redirect: router.currentRoute.fullPath } 
                    });
                    break;
                
                
                
                
                case 403:                     
                    Toast({                        
                        message: '登录过期，请重新登录',                        
                        duration: 1000,                        
                        forbidClick: true                    
                    });                    
                    
                    localStorage.removeItem('token');                    
                    store.commit('loginSuccess', null);                    
                    
                    setTimeout(() => {                        
                        router.replace({                            
                            path: '/login',                            
                            query: { 
                                redirect: router.currentRoute.fullPath 
                            }                        
                        });                    
                    }, 1000);                    
                    break; 
                
                case 404:                    
                    Toast({                        
                        message: '网络请求不存在',                        
                        duration: 1500,                        
                        forbidClick: true                    
                    });                    
                break;                
                
                default:                    
                    Toast({                        
                        message: error.response.data.message,                        
                        duration: 1500,                        
                        forbidClick: true                    
                    });            
            }            
            return Promise.reject(error.response);        
        }       
    }
);

export function get(url, params){    
    return new Promise((resolve, reject) =>{        
        axios.get(url, {            
            params: params        
        })        
        .then(res => {            
            resolve(res.data);        
        })        
        .catch(err => {            
            reject(err.data)        
        })    
    });
}

export function post(url, params) {    
    return new Promise((resolve, reject) => {         
        axios.post(url, QS.stringify(params))        
        .then(res => {            
            resolve(res.data);        
        })        
        .catch(err => {            
            reject(err.data)        
        })    
    });
}


```

### api

axios 的封装根据需求的不同而不同。这里非常感谢评论里一些很中肯的建议，我也对此进行了思考和针对不同需求的改善。主要有以下改变：

1. 优化 axios 封装，去掉之前的 get 和 post

2. 断网情况处理

3. 更加模块化的 api 管理

4. 接口域名有多个的情况

5.api 挂载到 vue.prototype 上省去引入的步骤

http.js 中 axios 封装的优化，先直接贴代码：

```
import axios from 'axios';
import router from '../router';
import store from '../store/index';
import { Toast } from 'vant';


const tip = msg => {    
    Toast({        
        message: msg,        
        duration: 1000,        
        forbidClick: true    
    });
}


const toLogin = () => {
    router.replace({
        path: '/login',        
        query: {
            redirect: router.currentRoute.fullPath
        }
    });
}


const errorHandle = (status, other) => {
    
    switch (status) {
        
        case 401:
            toLogin();
            break;
        
        
        case 403:
            tip('登录过期，请重新登录');
            localStorage.removeItem('token');
            store.commit('loginSuccess', null);
            setTimeout(() => {
                toLogin();
            }, 1000);
            break;
        
        case 404:
            tip('请求的资源不存在'); 
            break;
        default:
            console.log(other);   
        }}


var instance = axios.create({    timeout: 1000 * 12});

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
 
instance.interceptors.request.use(    
    config => {        
        
        
        
        
        const token = store.state.token;        
        token && (config.headers.Authorization = token);        
        return config;    
    },    
    error => Promise.error(error))


instance.interceptors.response.use(    
    
    res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),    
    
    error => {
        const { response } = error;
        if (response) {
            
            errorHandle(response.status, response.data.message);
            return Promise.reject(response);
        } else {
            
            
            
            
            if (!window.navigator.onLine) {
               store.commit('changeNetwork', false);
            } else {
                return Promise.reject(error);
            }
        }
    });

export default instance;


```

这个 axios 和之前的大同小异，做了如下几点改变：
---------------------------

1. 去掉了之前 get 和 post 方法的封装，通过创建一个 axios 实例然后 export default 方法导出，这样使用起来更灵活一些。

2. 去掉了通过环境变量控制 baseUrl 的值。考虑到接口会有多个不同域名的情况，所以准备通过 js 变量来控制接口域名。这点具体在 api 里会介绍。

3. 增加了请求超时，即断网状态的处理。说下思路，当断网时，通过更新 vuex 中 network 的状态来控制断网提示组件的显示隐藏。断网提示一般会有重新加载数据的操作，这步会在后面对应的地方介绍。

4. 公用函数进行抽出，简化代码，尽量保证单一职责原则。

下面说下 api 这块，考虑到一下需求：
--------------------

1. 更加模块化

2. 更方便多人开发，有效减少解决命名冲突

3. 处理接口域名有多个情况

这里这里呢新建了一个 api 文件夹，里面有一个 index.js 和一个 base.js，以及多个根据模块划分的接口 js 文件。index.js 是一个 api 的出口，base.js 管理接口域名，其他 js 则用来管理各个模块的接口。

先放 index.js 代码：

```
import article from '@/api/article';



export default {    
    article,
    
}


```

index.js 是一个 api 接口的出口，这样就可以把 api 接口根据功能划分为多个模块，利于多人协作开发，比如一个人只负责一个模块的开发等，还能方便每个模块中接口的命名哦。

base.js:

```
const base = {    
    sq: 'https://xxxx111111.com/api/v1',    
    bd: 'http://xxxxx22222.com/api'
}
export default base;


```

通过 base.js 来管理我们的接口域名，不管有多少个都可以通过这里进行接口的定义。即使修改起来，也是很方便的。

最后就是接口模块的说明，例如上面的 article.js:

```
import base from './base'; 
import axios from '@/utils/http'; 
import qs from 'qs'; 

const article = {    
    
    articleList () {        
        return axios.get(`${base.sq}/topics`);    
    },    
    
    articleDetail (id, params) {        
        return axios.get(`${base.sq}/topic/${id}`, {            
            params: params        
        });    
    },
    
    login (params) {        
        return axios.post(`${base.sq}/accesstoken`, qs.stringify(params));    
    }
    
}
export default article;


```

1. 通过直接引入我们封装好的 axios 实例，然后定义接口、调用 axios 实例并返回，可以更灵活的使用 axios，比如你可以对 post 请求时提交的数据进行一个 qs 序列化的处理等。

2. 请求的配置更灵活，你可以针对某个需求进行一个不同的配置。关于配置的优先级，axios 文档说的很清楚，这个顺序是：在 lib/defaults.js 找到的库的默认值，然后是实例的 defaults 属性，最后是请求的 config 参数。后者将优先于前者。

3.restful 风格的接口，也可以通过这种方式灵活的设置 api 接口地址。

最后，为了方便 api 的调用，我们需要将其挂载到 vue 的原型上。在 main.js 中：

```
import Vue from 'vue'
import App from './App'
import router from './router' 
import store from './store' 
import api from './api' 

Vue.prototype.$api = api; 


```

然后我们可以在页面中这样调用接口，eg：

```
methods: {    
    onLoad(id) {      
        this.$api.article.articleDetail(id, {        
            api: 123      
        }).then(res=> {
            
        })    
    }  
}


```

再提一下断网的处理，这里只做一个简单的示例：

```
<template>  
    <div>    
        <div v-if="!network">      
            <h3>我没网了</h3>      
            <div @click="onRefresh">刷新</div>      
        </div>    
        <router-view/>      
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    export default {  
        name: 'App',  
        computed: {    
            ...mapState(['network'])  
        },  
        methods: {    
            // 通过跳转一个空页面再返回的方式来实现刷新当前页面数据的目的
            onRefresh () {      
                this.$router.replace('/refresh')    
            }  
        }
    }
</script>


```

这是 app.vue，这里简单演示一下断网。在 http.js 中介绍了，我们会在断网的时候，来更新 vue 中 network 的状态，那么这里我们根据 network 的状态来判断是否需要加载这个断网组件。断网情况下，加载断网组件，不加载对应页面的组件。当点击刷新的时候，我们通过跳转 refesh 页面然后立即返回的方式来实现重新获取数据的操作。因此我们需要新建一个 refresh.vue 页面，并在其 beforeRouteEnter 钩子中再返回当前页面。

```
beforeRouteEnter (to, from, next) {
    next(vm => {            
        vm.$router.replace(from.fullPath)        
    })    
}


```

这是一种全局通用的断网提示，当然了，也可以根据自己的项目需求操作。具体操作就仁者见仁智者见智了。

如果更多的需求，或者说是不一样的需求，可以根据自己的需求进行一个改进。

"小礼物走一走，来简书关注我"

还没有人赞赏，支持一下

[![][img-1]

[chang_遇见缘](https://www.jianshu.com/u/26d547f53a8b "chang_遇见缘")重申一遍，我不是老师，我也是刚入坑不久的前端程序员，喜欢我的作品请抬起您高贵的双手为作者点赞，...

总资产 13 (约 1.15 元) 共写了 6.0W 字获得 459 个赞共 280 个粉丝

### 被以下专题收入，发现更多相似内容

[img-0]:data:application/octet-stream;base64,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

[img-1]:data:application/octet-stream;base64,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