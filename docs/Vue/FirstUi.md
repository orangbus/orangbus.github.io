---
title: First UI 快捷模板
---

## unf-section

```html
<view class="fui-section__title">输入框</view>
```





# 表单

## unf-form

```html
<view class="fui-wrap">
    <view class="fui-page__bd">
        <fui-form ref="form" top="5">
            <fui-input required label="姓名" borderTop placeholder="请输入姓名" v-model="formData.name"></fui-input>
            <fui-input required label="手机号" placeholder="请输入手机号码" v-model="formData.mobile"></fui-input>
            <fui-input required label="密码" password placeholder="请输入密码" v-model="formData.password">
            </fui-input>
            <fui-textarea isCounter placeholder="请输入内容" v-model="formData.text"></fui-textarea>
            <fui-list-cell :highlight="false">
                <view class="fui-list__cell">
                    <text>标题文字</text>
                    <fui-switch :scaleRatio="0.8" @change="switchChange"></fui-switch>
                </view>
            </fui-list-cell>

            <fui-input required :padding="['20rpx','32rpx']" label="验证码" placeholder="请输入手机验证码"
                       v-model="formData.code">
                <fui-button type="gray" bold width="200rpx" height="64rpx" :size="28" text="获取验证码"></fui-button>
            </fui-input>
            <view class="fui-btn__box">
                <fui-button text="Submit" bold @click="submit"></fui-button>
            </view>
        </fui-form>
    </view>
</view>

enum("left","right")
```

## unf-input

```html
<fui-input required label="$NAME$" borderTop placeholder="请输入$NAME$" v-model="form.$FIELD$"></fui-input>

enum("姓名","手机号","密码","备注")
enum("name","phone","password","remark")
```

## unf-radio

```html
 <fui-list-cell :highlight="false">
     <view class="fui-list__cell">
         <text>标题文字</text>
         <fui-radio 
            isCheckMark 
            checkMarkColor="#465CFF" 
            :scaleRatio="1.3"
            :checked="item.checked" 
            :value="item.value">
		 </fui-radio>
     </view>
</fui-list-cell>
```



## unf-switch

```html
 <fui-list-cell :highlight="false">
     <view class="fui-list__cell">
         <text>标题文字</text>
         <fui-switch :scaleRatio="0.8" checked @change="change"></fui-switch>
     </view>
</fui-list-cell>
```

## unf-f-switch

```html
<fui-form-item label="状态">
     <template v-slot:right>
         <fui-switch></fui-switch>
     </template>
</fui-form-item>
```

## unf-f-switch-js

```javascript
changeStatus(e){
    this.form.checked = e.detail.value;
}
```

unf

```javascript

<fui-checkbox-group v-model="form.sex">
    <fui-label inline>
        <fui-checkbox value="1"></fui-checkbox>
    <fui-text :size="28" text="男" :padding="['0','30rpx','0','16rpx']"></fui-text>
    </fui-label>
    <fui-label inline>
        <fui-checkbox value="2"></fui-checkbox>
    <fui-text :size="28" text="女" :padding="['0','16rpx']"></fui-text>
    </fui-label>
</fui-checkbox-group>
```





## unf-f-input-append

```html
<fui-form-item label="$NAME$">
    <fui-input type="digit" :borderBottom="false" :padding="['0','16rpx']" placeholder="请输入$NAME$" textRight>
    </fui-input>
    <template v-slot:right>
        <fui-text text="$TEXT$"></fui-text>
    </template>
</fui-form-item>

enum("单价","价格","优惠金额","数量")
enum("元","个")
```









## unf-textarea

```html
<fui-textarea 
              required 
              label="$NAME$" 
              placeholder="请输入$NAME$"
              height="40rpx" 
              min-height="40rpx"></fui-textarea>
enum("备注")
```

## unf-code 获取验证码

```html
<fui-form-item label="验证码">
    <input class="fui-page__input" placeholder="请输入验证码" placeholder-style="color:#ccc;" maxlength="6" />
    <template v-slot:right>
        <fui-button type="gray" bold width="200rpx" height="64rpx" :size="28" text="获取验证码"></fui-button>
    </template>
</fui-form-item>
```

## unf-date

```html
<fui-date-picker
    :radius="true"
    title="请选择"
    :show="show"
    type="$TYPE$" @change="change" @cancel="cancel"></fui-date-picker>


enum("5"，"3")
```

## unf-date-js

```javascript
// 选择日期
change(e) {
    this.show = false;
    this.form.date = e.result
},
cancel() {
    this.show = false
}
```







## unf-form-rule 表单规则

```javascript
const rules = [
    {
	name: "name",
	rule: ["required"],
	msg: ["请输入姓名"]
}, {
	name: "mobile",
	rule: ["required", "isMobile"],
	msg: ["请输入手机号", "请输入正确的手机号"]
}];
```

## unf-rule-item

```json
{
    name: "name",
    rule: ["required"],
    msg: ["请输入姓名"]
},
```

## unf-submit

```javascript
submit() {
	console.log(this.form)
	this.$refs.form.validator(this.formData, rules).then(res => {
		console.log(res)
		if (res.isPassed) {
			this.fui.toast('校验通过！')
		}
	}).catch(err => {
		console.log(err)
	})
}
```

unf-upload

```vue
```

## unf-picker-html

```html
<fui-picker :options="options" :show="show" @change="change" @cancel="cancel"></fui-picker>
```

## unf-picker-field

```javascript
show: false,
options: ['7:00-8:30', '8:30-10:00']
```

## unf-picker-methods

```javascript
change(e) {
    this.show = false
    console.log(e)
},
    cancel() {
        this.show = false
    }
```

## unf-search

```html
 <fui-search-bar
                 class="search"
                 :value="keywords"
                 @search="search"
                 @input="getKeywords"
                 @clear="restData"
                 @cancel="restData"
                 ></fui-search-bar>
```

## unf-search-js

```javascript
getKeywords(e){
    this.keywords = e.detail.value;
},
restData(){
    this.keywords = "";
    this.page = 1;
    this.getData();
}
```



## unf-select-html

```html
<fui-select :show="show" :options="items"  title="请选择" @confirm="onConfirm" @close="onClose"></fui-select>
```

## unf-select-js

```javascript
btnClick() {
    this.show = true;
},
        //仅type=select时有效，返回选中的值
        onConfirm(e) {
            console.log(e)
            this.onClose()
        },
	//关闭组件
	onClose() {
		this.show = false
	}
```

## unf-avatar

```html
<fui-avatar size="$SIZE$" text="A" radius="-1" color=""></fui-avatar>

enum("small","middle","large")
```



## unf-msg-html

```html
<fui-message ref="msg" :background="background"></fui-message>
```

## unf-msg-js

```javascript
showMsg(){
    let options = {}
    options.text = 'Hello First UI！'
    this.$refs.msg.show(options)
}
```

## unf-col

```html
<fui-row marginBottom="$BUTTON$px">
	<fui-col :span="$COL$" :offset="$OFFISET$">
		<view class="fui-col__item fui-color__black"></view>
	</fui-col>
</fui-row>

enum("10","15","20");
enum("3","6","12");
enum("3","6");
```



## unf-list

```html
<view class="fui-section__title">带图标的列表</view>
<fui-list-cell arrow>
    <view class="fui-align__center">
    <image class="fui-list__icon" src="/static/images/common/icon_tabbar.png" mode="widthFix">
    </image>
    <text>标题文字</text>
    </view>
</fui-list-cell>
```



## unf-card

```html
<view class="fui-section__title">通栏展示</view>
<fui-card :padding="['20rpx','32rpx']" full :src="src" title="标题文字" tag="额外信息">
    <view class="fui-card__content fui-padding">这是一个基础卡片的示例，此处为自定义内容区域，自行控制内容样式。</view>
</fui-card>
```





## unf-panel-html 面板列表

```html
<fui-panel :panelData="panelData5" :marginTop="24" :size="32" @click="itemClick">
```

## unf-panel-html-more

```html
<fui-panel :panelData="panelData3" :marginTop="24" :size="34" :descSize="26">
    <fui-list-cell arrow :bottomBorder="false" topBorder topLeft="32">
        <text class="fui-text__link">查看更多</text>
    </fui-list-cell>
</fui-panel>
```

# unf-panel-js

```javascript
panelData5: {
    head: '附加信息',
        list: [{
            title: 'First UI组件库',
            desc: 'First UI组件库，是基于uni-app开发的一款轻量、全面可靠的跨平台移动端组件库。',
            source: '开源中国',
            time: '2021-08-09'
        }, {
            title: 'First UI跨平台UI组件库',
            desc: 'First UI组件库，是基于uni-app开发的一款轻量、全面可靠的跨平台移动端组件库。',
            source: 'GitHub',
            time: '2021-08-09',
            extra: 'Apache License 2.0'
        }]
}
```

# unf-panel-js-title 面板js带标题

```javascript
panelData3: {
    head: 'First UI介绍',
        list: [{
            src: '/static/images/common/logo.png',
            title: 'First UI组件库',
            desc: 'First UI 是一套基于uni-app开发的组件化、可复用、易扩展、低耦合的跨平台移动端UI 组件库。'
        }, {
            src: '/static/images/common/logo.png',
            title: 'First UI跨平台UI组件库',
            desc: 'First UI组件库，是基于uni-app开发的一款轻量、全面可靠的跨平台移动端组件库。'
        }]
},
```

## unf-action 底部弹窗操作

```javascript
<fui-actionsheet :v-bind="acionOption" @click="open" @cancel="acionOption.show = false"></fui-actionsheet>
```

## unf-action-field

```javascript
acionOption:{
    show: false,
    tips: '温馨提示',
    itemList: ['男', '女', '未知'], // {text: '退出登录',color: '#FF2B2B'}
    isCancel: true, // false
    theme: 'light' // dark
}

```

## unf-dialog

```html
<fui-dialog :show="show" content="弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内" maskClosable @click="onClick" @close="onClose"></fui-dialog>
```

## unf-dialog

```javascript
```











## unf-toptab

顶部选项卡，左右切换

```html
```









# 文字

## unf-text

```javascript
<fui-text text="$TEXT$" type="$$"></fui-text>

enum("primary","success","warning","danger","purple","gray","black")
```

## unf-text-section

```javascript
<view class="fui-section__title">$TITLE$</view>

enum("名称")
```

# 按钮

## unf-btn

```
<fui-button text="$TEXT$" type="$TYPE$" @click="$METHOND$"></fui-button>

enum("保存","确定","提交","登录")
enum("primary","success", "warning","danger","link","purple","gray")
enum("create","edit", "submit","submitForm","save","show","open")

enum("res.data","res", "data","666","item")
```



## unf-copy

```javascript
<fui-copy-text text="长按文本复制" value="firstui.cn"></fui-copy-text>
```

## unf-top

```html
<fui-backtop :scrollTop="scrollTop" :name="name" :background="background" :color="color"></fui-backtop>
```

## unf-top-js

```javascript
onPageScroll(e) {
	this.scrollTop = e.scrollTop
}
```



# 通用方法

## @getData

```javascript
getData(){
    this.loading = true;
    this.more = "loading";
    $METHODS$.then(res=>{
        let {code,data,msg} = res;
        if (code === 200){
            this.list.push(data);
        }else{
            Message.error(msg);
        }
        this.more = "noMore";
        this.isEnd = false;
        this.loading = false;
        // 关闭下拉刷新
        uni.stopPullDownRefresh();
    });
},
```

## @store

```javascript
```

## @delete

```javascript
```

## @submitForm

```javascript
```





# 时间格式化

## @date-format

```javascript
moment().format("$format$");

enum("YYYY-MM-DD HH:mm:ss","YYYY-MM-DD");
```









