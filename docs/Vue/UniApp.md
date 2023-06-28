---
title: Uniapp
---

## uni-refresh

```javascript
onPullDownRefresh() {
    this.resetData(true);
},
```

## uni-reach

```javascript
onReachBottom() {
    if (this.loading) {
        return;
    }
    if (this.isEnd) {
        return;
    }
    this.page += 1;
    this.getData();
},
```

## uni-default-data

```javascript
page: 1,
limit: 20,
list: [],
total: 0,
more: 'more', //more/loading/noMore
loading: true, //是否加载
trigger: true, // 是否下拉了
isEnd: false, // 到底了
```



## uni-getdata

```javascript
getData() {
    this.loading = true;
    this.more = "loading";
    calList({
        page: this.page,
        limit: this.limit,
        phone: this.phone,
        type: this.tab
    }).then(res => {
        this.loading = false;
        this.more = "more";
        if (res.code === 200) {
            this.list.push(...res.data);
            this.backupList.push(...res.data);
            if (res.data.length < 10) {
                this.isEnd = true;
                this.more = "noMore";
            }
        } else {
            this.more = "noMore";
        }
        // 关闭下拉刷新
        uni.stopPullDownRefresh();
    });
},
```

## uni-res-msg

```javascript
let {code,data,msg} = res;
if (code === 200){
    Message.success(msg);
}else{
    Message.error(msg);
}
```

## uni-res-data

```javascript
let {code,data,msg} = res;
if (code === 200){
    this.list.push(...res.data);
    if (this.list.length < 10) {
        this.isEnd = true;
        this.more = "noMore";
    }
}else{
    this.more = "noMore";
    Message.error(msg);
}
```

## uni-popup

```html
```

## uni-tag

```html
<uni-tag text="标签" type="$COLOR$" :inverted="$BACKCOLOR$"  size="$SIZE$" />

enum("primary","success","error","error")
enum("true","false")
enum("normal","small","mini")
```









# vuex

## x-import

```
import {$METHODS$} from "vuex";

enum("mapState","mapState,mapMutations","mapState,mapMutations,mapActions");
```

## x-computed

```javascript
computed: {
    ...mapState(['callType']),
}

enum("user","customer","website");
enum("website","user");
```



# Message.js

```javascript
/**
 * 消息提示
 * @type {{success(string=): void, warning(string=), showToast(string=): void, error(string=), info(string=)}}
 */
const Message = {
	success(msg="成功"){
		uni.showToast({
			title: msg,
			mask: true
		});
	},
	error(msg="错误"){

	},
	info(msg="提示"){

	},
	warning(msg="警告"){

	},
	showToast(msg="提示"){
		uni.showToast({
			title: msg,
			mask: true
		});
	}
}

export default Message;

```

# LocalStorage.js

```javascript
/**
 *
 * @type {{set(*, *): void, get(*): any|{}, remove(*): void}}
 */

const LocalStorage = {
  set(key,value){
    uni.setStorageSync(key, value);
  },
  get(key){
    const data = uni.getStorageSync(key);
    return data ? data : null;
  },
  remove(key){
    uni.removeStorageSync(key);
  }
}

export default LocalStorage;
```

EnumData.js

```javascript
const EnumData = {
    // 本地存储变量
    userLable: "user",
    websiteLabel: "website",
    tokenLabel: "token",
    dictionaryLabel: "dictionary",
    settingLabel: "setting",
    userLocationLabel: "userLocation",
    
    // 随机颜色
    colorList: [
        {name: "default"},
        {name: "primary"},
        {name: "success"},
        {name: "error"},
        {name: "warning"},
        {name: "magenta"},
        {name: "red"},
        {name: "volcano"},
        {name: "orange"},
        {name: "gold"},
        {name: "yellow"},
        {name: "lime"},
        {name: "green"},
        {name: "cyan"},
        {name: "blue"},
        {name: "geekblue"},
        {name: "purple"},
    ],
    randomColor: function () {
        let list = EnumData.colorList;
        let index = Math.floor(Math.random() * list.length);
        return list[index].name;
    },
}
export default EnumData;
```

# 数据返回

## res-code

```javascript
let {code,msg,data} = res;

enum("code,msg,data","code,msg");
```

## uni-res-data

```
let {code,msg,data} = res;
if (code === 200){
    Message.success(msg);
}else{
    Message.error(msg);
}
```

## uni-submit

```javascript
submit() {
    this.$refs.form.validator(this.form, this.rules).then(valid => {
        if (valid.isPassed) {
            $methods$(_.pick(this.form, this.key)).then(res => {
                let {code, msg, data} = res;
                if (code === 200) {
                    Message.success(msg);
                } else {
                    Message.error(msg);
                }
            });
        } else {

        }
    }).catch(err => {
        Message.error(err.errorMsg);
        return false;
    })
},
    
enum("userStore","articleStore")
```



