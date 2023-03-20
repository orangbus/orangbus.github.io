---
title: html
---

# css

## 样式排版

https://github.com/sofish/Typo.css

## 获取视频时长

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Title</title>
    <link rel="stylesheet" href="{{ mix("css/app.css") }}">
</head>
<body>
<div class="container">
    <div class="row">
        <div class="col-md-6">
            <form action="@">
                <input type="file" id="video">
                <div id="infos"></div>
{{--                <button type="button" id="submit" class="btn btn-success btn-block">上传</button>--}}
            </form>
        </div>
    </div>
</div>
<script src="{{ mix("/js/app.js") }}"></script>
<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script>
    
    var myVideos = [];

    window.URL = window.URL || window.webkitURL;

    document.getElementById('video').onchange = setFileInfo;

    function setFileInfo() {
        var files = this.files;
        myVideos.push(files[0]);
        var video = document.createElement('video');
        video.preload = 'metadata';

        video.onloadedmetadata = function() {
            window.URL.revokeObjectURL(video.src);
            var duration = video.duration;
            myVideos[myVideos.length - 1].duration = duration;
            updateInfos();
        }

        video.src = URL.createObjectURL(files[0]);
    }

    function updateInfos() {
        var infos = document.getElementById('infos');
        infos.textContent = "";
        for (var i = 0; i < myVideos.length; i++) {
            infos.textContent += myVideos[i].name + " duration: " + (myVideos[i].duration/60).toPrecision(3) + '分\n';
        }
    }
</script>
</body>
</html>
```



# 手机播放m3u8视频

```html
<video class="vjs-tech" width="100%" height="100%"
    controls="controls" autoplay="autoplay"
    x-webkit-airplay="true" x5-video-player-fullscreen="true"
    preload="auto" playsinline="true" webkit-playsinline
    x5-video-player-typ="h5">
    <source type="application/x-mpegURL" src="http://dlhls.cdn.zhanqi.tv/zqlive/22578_yKdJM.m3u8">
</video>
```

```html
<iframe width="100%" height="100%" src="https://streamtape.com/e/LDjWpakZmpHRX9X" frameborder="0" border="0" marginwidth="0" marginheight="0" scrolling="no" allowfullscreen="allowfullscreen" mozallowfullscreen="mozallowfullscreen" msallowfullscreen="msallowfullscreen" oallowfullscreen="oallowfullscreen" webkitallowfullscreen="webkitallowfullscreen" referrerpolicy="no-referrer"></iframe>
```



# 资源采集规则

列表接收参数

| key  | value            | 说明           |
| ---- | ---------------- | -------------- |
| ac   | list / videolist | 视频列表       |
| t    |                  | 类别ID         |
| wd   |                  | 搜索关键字     |
| h    |                  | 几小时内的数据 |
| pg   |                  | 页码           |



# TinyMCE配置基本使用

中文网站：http://tinymce.ax-z.cn/

## 入门案例

```javascript
<script>
    tinymce.init({
        selector: '#mytextarea',
        mobile: {
            menubar: true
        },
        language:'zh_CN',//注意大小写
        language_url : 'tinymce/langs/zh_CN.js',
        // toolbar_mode: "wrap",
        statusbar: false, //编辑器底部隐藏状态栏
        toolbar: "undo redo emoticons| styleselect alignleft aligncenter alignright bold italic code | image media | preview forecolor ",
        plugins: "emoticons image imagetools media code preview autolink",
        preview_styles: false,
        contextmenu: "bold copy autolink", //编辑器里面右键操作
        draggable_modal: true,
        menubar:false,
        // 工具栏1
        // menu: {
        //     file: {title: '文件', items: 'newdocument'},
        //     edit: {title: '编辑', items: 'undo redo | cut copy paste pastetext | selectall'},
        //     insert: {title: '插入', items: 'link media | template hr'},
        //     view: {title: '查看', items: 'visualaid'},
        //     format: {title: '格式', items: 'bold italic underline strikethrough superscript subscript | formats | removeformat'},
        //     table: {title: '表格', items: 'inserttable tableprops deletetable | cell row column'},
        //     tools: {title: '工具', items: 'spellchecker code'}
        // }
    });
</script>
```



配置工具项
-----

所属插件为核心的项为基本包里自带的功能，直接写在`toolbar`里就可以，  属于插件的项需要引入插件(`plugins: '插件名'`)然后在`toolbar`中配置。

| 字段           | 说明字段                         | 字段          | 说明         |
| -------------- | -------------------------------- | ------------- | ------------ |
| menubar        | 是否显示顶部菜单栏  true / false | bold          | 加粗         |
| newdocument    | 创建新文档                       | italic        | 斜体         |
| alignnone      | 清除                             | alignjustify  | 两端对齐     |
| formatselect   | 段落选择下拉框(段落、标题)       | alignleft     | 居左         |
| fontselect     | 字体选择下拉框                   | aligncenter   | 居中         |
| fontsizeselect | 字号选择下拉框                   | alignright    | 居右         |
| outdent        | 减少缩进                         | strikethrough | 删除线       |
| indent         | 增加缩进                         | underline     | 下划线       |
| undo           | 撤消                             |               |              |
| redo           | 恢复                             | cut           | 剪切         |
| removeformat   | 清除格式                         | copy          | 复制         |
| subscript      | 下标                             | paste         | 粘贴         |
| superscript    | 上标                             | text_color    |              |
| visualaid      | 网格线                           |               |              |
| insert         | 插入的集合按钮                   | quickimage    | 快捷插入图片 |
| styleselect    | 格式选择下拉框(缩进、行高)       |               |              |







一下字段需要插件，可前往官网下载

| 字段                 | 插件           | 说明                     |
| -------------------- | -------------- | ------------------------ |
| hr                   | hr             | 水平线                   |
| bullist              | lists          | 无序列表                 |
| numlist              | lists          | 有序列表                 |
| link                 | link           | 添加和修改链接           |
| unlink               | link           | 去除链接格式             |
| openlink             | link           | 打开选中链接             |
| image                | image          | 添加和修改图片           |
| charmap              | charmap        | 特殊符号                 |
| pastetext            | paste          | 粘贴纯文本               |
| print                | print          | 打印                     |
| preview              | preview        | 预览                     |
| anchor               | anchor         | 作者                     |
| pagebreak            | pagebreak      | 分页符                   |
| spellchecker         | spellchecker   | 拼写检查                 |
| searchreplace        | searchreplace  | 搜索                     |
| visualblocks         | visualblocks   | 隐藏块级区域开关         |
| visualchars          | visualchars    | 隐藏字符串开关.          |
| code                 | code           | 代码                     |
| help                 | help           | 帮助                     |
| fullscreen           | fullscreen     | 全屏                     |
| insertdatetime       | insertdatetime | 插入时间                 |
| media                | media          | 插入/编辑媒体文件        |
| nonbreaking          | nonbreaking    | 不间断空格               |
| save                 | save           | 保存(ajax)               |
| cancel               | save           | 取消保存                 |
| table                | table          | 插入/编辑表格            |
| tabledelete          | table          | 删除表格                 |
| tablecellprops       | table          | 单元格属性               |
| tablemergecells      | table          | 合并单元格               |
| tablesplitcells      | table          | 拆分单元格               |
| tableinsertrowbefore | table          | 在当前行之前插入一个新行 |
| tableinsertrowafter  | table          | 在当前行之后插入一个新行 |
| tabledeleterow       | table          | 删除当前行               |
| tablerowprops        | table          | 行属性                   |
| tablecutrow          | table          | 剪切选定行               |
| tablecopyrow         | table          | 复制选定行               |
| tablepasterowbefore  | table          | 在当前行之前粘贴行       |
| tablepasterowafter   | table          | 在当前行之后粘贴行       |
| tableinsertcolbefore | table          | 在当前列之前插入一个列   |
| tableinsertcolafter  | table          | 在当前列之后插入一个列.  |
| tabledeletecol       | table          | 删除当前列               |
| rotateleft           | imagetools     | 逆时针旋转当前图像       |
| rotateright          | imagetools     | 顺时针旋转当前图像       |
| flipv                | imagetools     | 垂直翻转当前图像         |
| fliph                | imagetools     | 水平翻转当前图像         |
| editimage            | imagetools     | 打开图像编辑对话框       |
| imageoptions         | imagetools     | 打开图像配置对话框       |
| fullpage             | fullpage       | 完整页面的文档属性       |
| ltr                  | directionality | 设置编写方向从左到右     |
| rtl                  | directionality | 设置编写方向从右到左     |
| emoticons            | emoticons      | 表情                     |
| template             | template       | 插入模板                 |
| forecolor            | textcolor      | 文本颜色                 |
| backcolor            | textcolor      | 背景颜色                 |
| restoredraft         | restoredraft   | 恢复到最新的自动保存草稿 |
| insertfile           | moxiemanager   | 引入文件                 |
| a11ycheck            | a11ychecker    | 检查访问性               |
| toc                  | toc            | 插入目录                 |
| quickimage           | inlite         | 插入本地图像             |
| quicktable           | inlite         | 插入2X2的表格            |
| quicklink            | inlite         | 插入连接                 |



# 图片跨域

```html
<meta name="referrer" content="no-referrer" />
```

# 网站优化配置

<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
<title>《Laravel 9 中文文档》 | Laravel China 社区</title>
<meta name="description" content="我们是高品质的 Laravel 开发者社区，致力于为 Laravel 开发者提供一个分享创造、结识伙伴、协同互助的论坛。" />
<meta name="keywords" content="laravel,laravel论坛,laravel社区,laravel教程,laravel视频,laravel开源,laravel新手,laravel5" />
<meta name="author" content="Summer" />


<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="mobile-agent" content="format=html5; url= https://m.chinaz.com/">
<meta name="mobile-agent" content="format=wml;url= https://m.chinaz.com/">
<meta name="mobile-agent" content="format=xhtml;url= https://m.chinaz.com/">
<link rel="alternate" media="only screen and(max-width:640px)" href="https://m.chinaz.com/">

<meta name="applicable-device" content="pc">
<meta name="renderer" content="webkit">
<meta http-equiv="Cache-Control" content="no-siteapp" />
<meta http-equiv="Cache-Control" content="no-transform" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">



