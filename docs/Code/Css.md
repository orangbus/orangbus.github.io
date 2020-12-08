---
title: Css样式收藏
sidebar: auto
---
# 收藏样式

## 手机弹窗预览内容

```css
.form-pop{
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        top: 0;
        left: 0;
        position: fixed;
        z-index: 999;
        display: none;
    }
    .form-pop-con{
        width: 290px;
        height: 590px;
        background-image: url("/static/images/phone.png");
        background-position: center;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .form-pop-con-con{
        width: 255px;
        height: 424px;
        /*background-color: #0a001f;*/
        position: absolute;
        top: 97px;
        left: 50%;
        transform: translateX(-50%);
        overflow: auto;
        overflow-x: hidden;
        overflow-y: scroll;
    }
```

```html
<button type="button" id="open-form-pop" class="layui-btn ">预览</button>
<div class="form-pop">
    <div class="form-pop-con">
        <div class="form-pop-con-con">
            <p>
                这里是手机里里面预览的内容
            </p>
        </div>
    </div>
</div>
```

```js
$('#open-form-pop').on('click',function () {
    $('.form-pop').show();
});
$(document).on('click',function () {
    $(".form-pop").hide();
});
$(".form-pop-con").on('click',function () {
    event.stopPropagation();
});
$("#open-form-pop").on('click',function () {
    event.stopPropagation();
});
```

