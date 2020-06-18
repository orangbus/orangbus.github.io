> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 https://harttle.land/2016/07/04/jquery-file-upload.html

文件上传是 Web 开发中的重要话题，最直接和简单的方式是通过表单直接提交文件。 Harttle 认为，我们引入 jQuery 来进行异步上传可以获得更好的用户体验。 一方面，在 JavaScript 中进行异步操作比表单更加灵活； 另一方面，异步上传也避免了上传大文件时的页面长时间卡死。

一个`type=file`的`<input>`就可以让用户来浏览并选择文件， 一般会把输入控件放到一个`<form>`中，下面的一个简单的表单：

```
<form>
  <input type="file" >
  <button type="button">保存</button>
</form>


```

但为什么我只能选择一个文件？？给`<input>`添加一个`multiple`属性就可以多选了！

```
<input type="file"  multiple>


```

上述的`<input>`将会拥有一个叫`files`的 DOM 属性，包含了所选的文件列表（`Array`）。

```
$('button').click(function(){
  var $input = $('#avatar');
  // 相当于： $input[0].files, $input.get(0).files
  var files = $input.prop('files');
  console.log(files);
});


```

这个`Array`中的每一项都是一个`File`对象，它有下面几个主要属性：

*   `name`: 文件名, 只读字符串, 不包含任何路径信息.
*   `size`: 文件大小, 单位为字节, 只读的 64 位整数.
*   `type`: MIME 类型, 只读字符串, 如果类型未知, 则返回空字符串.

> 见：[https://developer.mozilla.org/zh-CN/docs/Using_files_from_web_applications](https://developer.mozilla.org/zh-CN/docs/Using_files_from_web_applications)

上传文件比较特殊，其内容是二进制数据，而 HTTP 提供的是基于文本的通信协议。 这时需要采用`multipart/form-data`编码的 HTTP 表单。其 HTTP 消息体格式如下所示：

```
------WebKitFormBoundaryrGKCBY7qhFd3TrwA
Content-Disposition: form-data; 

harttle
------WebKitFormBoundaryrGKCBY7qhFd3TrwA
Content-Disposition: form-data; 
Content-Type: image/png

 ... content of harttle.png ...
------WebKitFormBoundaryrGKCBY7qhFd3TrwA--


```

每个字段由一段 boundary string 来分隔，浏览器保证该 boundary string 不与内容重复， 因而`multipart/form-data`能够成功编码二进制数据。

> 更多关于 HTTP 表单编码的细节，请参考：[HTTP 表单编码 enctype](https://harttle.land/2016/04/11/http-form-endoding)。

这是 XMLHttpRequest Level 2 提供的`FormData`对象可以帮助我们进行二进制文件的 `multipart/form-data`编码：

```
$('button').click(function(){
  var files = $('#avatar').prop('files');

  var data = new FormData();
  data.append('avatar', files[0]);

  $.ajax({
      url: '/api/upload',
      type: 'POST',
      data: data,
      cache: false,
      processData: false,
      contentType: false
  });
});


```

`url`, `type`, `data`想必做前端的都很熟悉了，介绍其余三个参数：

`cache`设为`false`可以禁止浏览器对该 URL（以及对应的 HTTP 方法）的缓存。 jQuery 通过为 URL 添加一个冗余参数来实现。

该方法只对 GET 和 HEAD 起作用，然而 IE8 会缓存之前的 GET 结果来响应 POST 请求。 这里设置`cache: false`是为了兼容 IE8。

> 参考：[http://api.jquery.com/jquery.ajax/](http://api.jquery.com/jquery.ajax/)

jQuery 中`content-type`默认值为`application/x-www-form-urlencoded`， 因此传给`data`参数的对象会默认被转换为 query string（见 [HTTP 表单编码 enctype](https://harttle.land/2016/04/11/http-form-endoding)）。

我们不需要 jQuery 做这个转换，否则会破坏掉`multipart/form-data`的编码格式。 因此设置`contentType: false`来禁止 jQuery 的转换操作。

jQuery 会将`data`对象转换为字符串来发送 HTTP 请求，默认情况下会用 `application/x-www-form-urlencoded`编码来进行转换。 我们设置`contentType: false`后该转换会失败，因此设置`processData: false`来禁止该转换过程。

> 我们给的`data`就是已经用`FormData`编码好的数据，不需要 jQuery 进行字符串转换。

本文介绍的 jQuery 文件上传方式依赖于 [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData)对象， 这是 XMLHttpRequest Level 2 接口， 需要 IE 10+, Firefox 4.0+, Chrome 7+, Safari 5+, Opera 12+

这意味着对于低版本浏览器只能使用直接提交文件表单的形式， 但提交大文件表单页面会长时间不响应，如果希望在低版本浏览器中解决该问题， 就只能使用别的方式来实现了，比如很多支持多文件和上传进度的 Flash 插件。

本文采用 [知识共享署名 4.0 国际许可协议](http://creativecommons.org/licenses/by/4.0/)（CC-BY 4.0）进行许可，转载注明来源即可： [https://harttle.land/2016/07/04/jquery-file-upload.html](https://harttle.land/2016/07/04/jquery-file-upload.html)。学识粗浅写作仓促，如有错误辛苦评论或 [邮件](mailto:yangjvn@126.com) 指出。