---
title: laravel-vue3 开发
---

# 前端依赖

## axios

[http://axios-js.com/zh-cn/docs/vue-axios.html](http://axios-js.com/zh-cn/docs/vue-axios.html) 

```bash
npm install --save axios vue-axios
```

## vite

```bash
```

## pain

[https://pinia.web3doc.top/getting-started.html](https://pinia.web3doc.top/getting-started.html)

```bash
npm install pinia
```

```javascript
import {defineStore} from "pinia";

export const useUserStore = defineStore("userStore", {
    state: () => {
        return {
            auth: false,
            user: {
                name: "orangbus",
                phone: "159000041"
            },
        }
    },
    actions: {
        getUserInfo() {

        }
    },
    getters: {
        getUser: (state) => {
            return state.user;
        }
    }
})


export const useWebsiteStore = defineStore("websiteStore", {
    state: () => {
        return {
            website: {
                name: "仿真实验官网",
                url: "http://localhost"
            }
        }

    }
})

```

```javascript
import {storeToRefs} from "pinia"
import {useUserStore} from "@/store/index"
const userStore = useUserStore();
let {auth,user} = storeToRefs(userStore)
console.log(auth.value,user.value);
```



## vue-route

[https://router.vuejs.org/zh/installation.html](https://router.vuejs.org/zh/installation.html)

```bash
npm install vue-router@4
```

基本配置

```javascript
```



# 前端UI组件

## vuetify



图标

```bash
npm install @mdi/font
```







# 后端依赖



# 目录结构

基于laravel的目录结构配置

```bash
cd /resources/js &&
mkdir -p api router plugin store utils
```



```
xuelibm
kZPpM5zFLX2m5iET



```



