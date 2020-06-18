> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 https://www.oschina.net/translate/http-partial-content-in-node-js?lang=chs&page=1#

*   [下载 PartialContent.zip - 2 KB](http://www.codeproject.com/KB/Nodejs/813480/PartialContent.zip)
    

内容表
---

*   [介绍](http://www.oschina.net/translate/http-partial-content-in-node-js#Introduction)
    
*   [分部份内容的简要介绍](http://www.oschina.net/translate/http-partial-content-in-node-js#A_brief_of_partial_content)
    
*   [开始用 Node.js 进行实现](http://www.oschina.net/translate/http-partial-content-in-node-js#Get_started_to_implement_in_Node_js)
    
*   对[实现](http://www.oschina.net/translate/http-partial-content-in-node-js#Test_the_implementation)进行测试
    
*   [总结](http://www.oschina.net/translate/http-partial-content-in-node-js#Conclusion)
    

介绍
--

在本文中，我会阐述 HTTP 状态 _**206 分部分内容**_ 的基础概念，并使用 Node.js 一步步地实现它. 我们还将用一个基于它用法最常见场景的示例来测试代码：一个能够在任何时间点开始播放视频文件的 HTML5 页面. 

**Partial Content** 的简要介绍
-------------------------

HTTP 的 206_** Partial Content**_ 状态码和其相关的消息头提供了让浏览器以及其他用户代理从服务器接收部分内容而不是全部内容，这样一种机制. 这一机制被广泛使用在一个被大多数浏览器和诸如 Windows Media Player 和 VLC Player 这样的播放器所支持视频文件的传输上.

[LeoXu](https://my.oschina.net/xuleo) 翻译于 2014/09/09 08:14 顶 1

基础的流程可以用下面这几步描述:

1.  浏览器请求内容.
    
2.  服务器告诉浏览器，该内容可以使用 **Accept-Ranges** 消息头进行分部分请求.
    
3.  浏览器重新发送请求，用 **Range** 消息头告诉服务器需要的内容范围.
    
4.  服务器会分如下两种情况响应浏览器的请求: 
    

*   如果范围是合理的，服务器会返回所请求的部分内容，并带上 **_206_** P**_artial Content 状态码_**. 当前内容的范围会在 **Content-Range** 消息头中申明.
    
*   如果范围是不可用的 (例如，比内容的总字节数大), 服务器会返回 **_416 请求范围不合理 _**R**_equested Range Not Satisfiable 状态码_**. 可用的范围也会在 **Content-Range** 消息头中声明.
    

让我们来看看这几个步骤中的每一个关键消息头.

**Accept-Ranges: 字节（bytes）**

这是会有服务器发送的字节头，展示可以被分部分发送给浏览器的内容. 这个值声明了可被接受的每一个范围请求, 大多数情况下是字节数 **bytes**. 

[LeoXu](https://my.oschina.net/xuleo) 翻译于 2014/09/09 08:24 顶 1

**Range: 字节数（bytes）=(开始)-(结束)**

这是浏览器告知服务器所需分部分内容范围的消息头. 注意开始和结束位置是都包括在内的，而且是从 0 开始的. 这个消息头也可以不发送两个位置，其含义如下: 

*   如果结束位置被去掉了，服务器会返回从声明的开始位置到整个内容的结束位置内容的最后一个可用字节.
    
*   如果开始位置被去掉了，结束位置参数可以被描述成从最后一个可用的字节算起可以被服务器返回的字节数.
    

Content-Range：字节数（bytes）=(开始)-(结束)/(总数)

这个消息头将会跟随 HTTP 状态码 206 一起出现. 开始和结束的值展示了当前内容的范围. 跟 Range 消息头一样, 两个值都是包含在内的，并且也是从零开始的. 总数这个值声明了可用字节的总数.

[LeoXu](https://my.oschina.net/xuleo) 翻译于 2014/09/09 08:40 顶 1

**Content-Range: */(总数)**

这个头信息和上面一个是一样的，不过是用另一种格式，并且仅在返回 HTTP 状态码 416 时被发送。其中总数代表了正文总共可用的字节数。

这里有一对有 2048 个字节文件的例子。注意省略起点和重点的区别。

**请求开****始的 1024 个字节**

浏览器发送：

```
GET /dota2/techies.mp4 HTTP/1.1
Host: localhost:8000
Range: bytes=0-1023

```

服务器返回：

```
HTTP/1.1 206 Partial Content
Date: Mon, 15 Sep 2014 22:19:34 GMT
Content-Type: video/mp4
Content-Range: bytes 0-1023/2048
Content-Length: 1024

(Content...)

```

**没有终点位置的请求**

浏览器发送：

```
GET /dota2/techies.mp4 HTTP/1.1
Host: localhost:8000
Range: bytes=1024-

```

服务器返回：

```
HTTP/1.1 206 Partial Content
Date: Mon, 15 Sep 2014 22:19:34 GMT
Content-Type: video/mp4
Content-Range: bytes 1024-2047/2048
Content-Length: 1024

(Content...)

```

[LeoG0816](https://my.oschina.net/leogao0816) 翻译于 2014/09/09 23:11 顶 2

注意：**服务器并不需要在单个响应中返回所有剩下的字节**，特别是当正文太长或者有其他性能的考虑。所以下面的两个例子在这种情况下也是可接受的：

```
Content-Range: bytes 1024-1535/2048
Content-Length: 512

```

服务器仅返回剩余正文的一半。下一次请求的范围将从第 1536 个字节开始。  

```
Content-Range: bytes 1024-1279/2048
Content-Length: 256

```

服务器仅返回剩余正文的 256 个字节。下一次请求的范围将从第 1280 个字节开始。  

[LeoG0816](https://my.oschina.net/leogao0816) 翻译于 2014/09/09 23:19 顶 1

**请求最后 512 个字节**

浏览器发送：

```
GET /dota2/techies.mp4 HTTP/1.1
Host: localhost:8000
Range: bytes=-512

```

服务器返回：

```
HTTP/1.1 206 Partial Content
Date: Mon, 15 Sep 2014 22:19:34 GMT
Content-Type: video/mp4
Content-Range: bytes 1536-2047/2048
Content-Length: 512

(Content...)

```

**请求不可用的范围：**

浏览器发送：

```
GET /dota2/techies.mp4 HTTP/1.1
Host: localhost:8000
Range: bytes=1024-4096

```

服务器返回：

```
HTTP/1.1 416 Requested Range Not Satisfiable
Date: Mon, 15 Sep 2014 22:19:34 GMT
Content-Range: bytes */2048

```

理解了工作流和头部信息后，现在我们可以用 Node.js 去实现这个机制。

[LeoG0816](https://my.oschina.net/leogao0816) 翻译于 2014/09/09 23:25 顶 2

### 开始用 Node.js 实现

第一步：创建一个简单的 HTTP 服务器

我们将像下面的例子那样，从一个基本的 HTTP 服务器开始。这已经可以基本足够处理大多数的浏览器请求了。首先，我们初始化我们需要用到的对象，并且用 initFolder 来代表文件的位置。为了生成 Content-Type 头部，我们列出文件扩展名和它们相对应的 MIME 名称来构成一个字典。在回调函数 httpListener() 中，我们将仅允许 **GET** 可用。如果出现其他方法，服务器将返回 _**405 **M**ethod Not Allowed**_，在文件不存在于 initFolder，服务器将返回 _**404 Not Found**_。

```
// 初始化需要的对象
var http = require("http");
var fs = require("fs");
var path = require("path");
var url = require("url");

// 初始的目录，随时可以改成你希望的目录
var initFolder = "C:\\Users\\User\\Videos";

// 将我们需要的文件扩展名和MIME名称列出一个字典
var mimeNames = {
    ".css": "text/css",
    ".html": "text/html",
    ".js": "application/javascript",
    ".mp3": "audio/mpeg",
    ".mp4": "video/mp4",
    ".ogg": "application/ogg", 
    ".ogv": "video/ogg", 
    ".oga": "audio/ogg",
    ".txt": "text/plain",
    ".wav": "audio/x-wav",
    ".webm": "video/webm";
};

http.createServer(httpListener).listen(8000);

function httpListener (request, response) {
    // 我们将只接受GET请求，否则返回405 'Method Not Allowed'
    if (request.method != "GET") { 
        sendResponse(response, 405, {"Allow" : "GET"}, null);
        return null;
    }

    var filename = 
        initFolder + url.parse(request.url, true, true).pathname.split('/').join(path.sep);

    var responseHeaders = {};
    var stat = fs.statSync(filename);
    // 检查文件是否存在，不存在就返回404 Not Found
    if (!fs.existsSync(filename)) {
        sendResponse(response, 404, null, null);
        return null;
    }
    responseHeaders["Content-Type"] = getMimeNameFromExt(path.extname(filename));
    responseHeaders["Content-Length"] = stat.size; // 文件大小
        
    sendResponse(response, 200, responseHeaders, fs.createReadStream(filename));
}

function sendResponse(response, responseStatus, responseHeaders, readable) {
    response.writeHead(responseStatus, responseHeaders);

    if (readable == null)
        response.end();
    else
        readable.on("open", function () {
            readable.pipe(response);
        });

    return null;
}

function getMimeNameFromExt(ext) {
    var result = mimeNames[ext.toLowerCase()];
    
    // 最好给一个默认值
    if (result == null)
        result = "application/octet-stream";
    
    return result;
}

```

[LeoG0816](https://my.oschina.net/leogao0816) 翻译于 2014/09/09 23:50 顶 1

### 步骤 2 - 使用正则表达式捕获 Range 消息头  

有了这个 HTTP 服务器做基础，我们现在就可以用如下代码处理 Range 消息头了. 我们使用正则表达式将消息头分割，以获取开始和结束字符串。然后使用 parseInt() 方法将它们转换成整形数. 如果返回值是 NaN (非数字 not a number), 那么这个字符串就是没有在这个消息头中的. 参数 totalLength 展示了当前文件的总字节数. 我们将使用它计算开始和结束位置. 

```
function readRangeHeader(range, totalLength) {
        /*
         * Example of the method 'split' with regular expression.
         * 
         * Input: bytes=100-200
         * Output: [null, 100, 200, null]
         * 
         * Input: bytes=-200
         * Output: [null, null, 200, null]
         */

    if (range == null || range.length == 0)
        return null;

    var array = range.split(/bytes=([0-9]*)-([0-9]*)/);
    var start = parseInt(array[1]);
    var end = parseInt(array[2]);
    var result = {
        Start: isNaN(start) ? 0 : start,
        End: isNaN(end) ? (totalLength - 1) : end
    };
    
    if (!isNaN(start) && isNaN(end)) {
        result.Start = start;
        result.End = totalLength - 1;
    }

    if (isNaN(start) && !isNaN(end)) {
        result.Start = totalLength - end;
        result.End = totalLength - 1;
    }

    return result;
}

```

[LeoXu](https://my.oschina.net/xuleo) 翻译于 2014/09/10 08:26 顶 1

### 步骤 3 - 检查数据范围是否合理

回到函数 httpListener(), 在 HTTP 方法通过之后，现在我们来检查请求的数据范围是否可用. 如果浏览器没有发送 **Range** 消息头过来, 请求就会直接被当做一般的请求对待. 服务器会返回整个文件，HTTP 状态将会是 _**200 OK**_. 另外我们还会看看开始和结束位置是否比文件长度更大或者相等. 只要有一个是这种情况，请求的数据范围就是不能被满足的. 返回的状态就将会是 _**416 Requested Range Not Satisfiable**_ 而 **Content-Range** 也会被发送. 

```
var responseHeaders = {};
    var stat = fs.statSync(filename);
    var rangeRequest = readRangeHeader(request.headers['range'], stat.size);
   
    // If 'Range' header exists, we will parse it with Regular Expression.
    if (rangeRequest == null) {
        responseHeaders['Content-Type'] = getMimeNameFromExt(path.extname(filename));
        responseHeaders['Content-Length'] = stat.size;  // File size.
        responseHeaders['Accept-Ranges'] = 'bytes';
        
        //  If not, will return file directly.
        sendResponse(response, 200, responseHeaders, fs.createReadStream(filename));
        return null;
    }

    var start = rangeRequest.Start;
    var end = rangeRequest.End;

    // If the range can't be fulfilled. 
    if (start >= stat.size || end >= stat.size) {
        // Indicate the acceptable range.
        responseHeaders['Content-Range'] = 'bytes */' + stat.size; // File size.

        // Return the 416 'Requested Range Not Satisfiable'.
        sendResponse(response, 416, responseHeaders, null);
        return null;
    }

```

[LeoXu](https://my.oschina.net/xuleo) 翻译于 2014/09/10 08:37 顶 2

步骤 4 - 满足请求

最后使人迷惑的一块来了。对于状态 _**216 Partial Content**_, 我们有另外一种格式的 **Content-Range** 消息头，包括开始，结束位置以及当前文件的总字节数. 我们也还有 **Content-Length** 消息头，其值就等于开始和结束位置之间的差。在最后一句代码中，我们调用了 createReadStream() 并将开始和结束位置的值给了第二个参数选项的对象, 这意味着返回的流将只包含从开始到结束位置的只读数据.

```
// Indicate the current range. 
    responseHeaders['Content-Range'] = 'bytes ' + start + '-' + end + '/' + stat.size;
    responseHeaders['Content-Length'] = start == end ? 0 : (end - start + 1);
    responseHeaders['Content-Type'] = getMimeNameFromExt(path.extname(filename));
    responseHeaders['Accept-Ranges'] = 'bytes';
    responseHeaders['Cache-Control'] = 'no-cache';

    // Return the 206 'Partial Content'.
    sendResponse(response, 206, 
        responseHeaders, fs.createReadStream(filename, { start: start, end: end }));

```

下面是完整的 httpListener() 回调函数.

```
function httpListener(request, response) {
    // We will only accept 'GET' method. Otherwise will return 405 'Method Not Allowed'.
    if (request.method != 'GET') {
        sendResponse(response, 405, { 'Allow': 'GET' }, null);
        return null;
    }

    var filename =
        initFolder + url.parse(request.url, true, true).pathname.split('/').join(path.sep);

    // Check if file exists. If not, will return the 404 'Not Found'. 
    if (!fs.existsSync(filename)) {
        sendResponse(response, 404, null, null);
        return null;
    }

    var responseHeaders = {};
    var stat = fs.statSync(filename);
    var rangeRequest = readRangeHeader(request.headers['range'], stat.size);

    // If 'Range' header exists, we will parse it with Regular Expression.
    if (rangeRequest == null) {
        responseHeaders['Content-Type'] = getMimeNameFromExt(path.extname(filename));
        responseHeaders['Content-Length'] = stat.size;  // File size.
        responseHeaders['Accept-Ranges'] = 'bytes';

        //  If not, will return file directly.
        sendResponse(response, 200, responseHeaders, fs.createReadStream(filename));
        return null;
    }

    var start = rangeRequest.Start;
    var end = rangeRequest.End;

    // If the range can't be fulfilled. 
    if (start >= stat.size || end >= stat.size) {
        // Indicate the acceptable range.
        responseHeaders['Content-Range'] = 'bytes */' + stat.size; // File size.

        // Return the 416 'Requested Range Not Satisfiable'.
        sendResponse(response, 416, responseHeaders, null);
        return null;
    }

    // Indicate the current range. 
    responseHeaders['Content-Range'] = 'bytes ' + start + '-' + end + '/' + stat.size;
    responseHeaders['Content-Length'] = start == end ? 0 : (end - start + 1);
    responseHeaders['Content-Type'] = getMimeNameFromExt(path.extname(filename));
    responseHeaders['Accept-Ranges'] = 'bytes';
    responseHeaders['Cache-Control'] = 'no-cache';

    // Return the 206 'Partial Content'.
    sendResponse(response, 206, 
        responseHeaders, fs.createReadStream(filename, { start: start, end: end }));
}

```

[LeoXu](https://my.oschina.net/xuleo) 翻译于 2014/09/10 09:20 顶 1 [Ouyang_Hibing](https://my.oschina.net/oyhb1738) 2014/09/13 11:48

#### 引用来自 “同城陌路人” 的评论

文中又是 216 又是 206 的，我数度的少，你不要骗我～～

#### 引用来自 “LeoG0816” 的评论

感谢指正，以将我的部分统一成 206http://www.oschina.net 回复 举报 [断风格男丶](https://my.oschina.net/pentakill) 2014/09/13 10:13 先收藏 好文章 回复 举报 [吾爱](https://my.oschina.net/cxz001) 2014/09/12 15:21 好顶赞 回复 举报 [xiaolongwang](https://my.oschina.net/u/143215) 2014/09/12 14:10 mark 回复 举报 [LeoG0816](https://my.oschina.net/leogao0816) 2014/09/12 11:40

#### 引用来自 “同城陌路人” 的评论

文中又是 216 又是 206 的，我数度的少，你不要骗我～～感谢指正，以将我的部分统一成 206 回复 举报 [dadait](https://my.oschina.net/dadait) 2014/09/12 11:18 收了。 回复 举报 [dadait](https://my.oschina.net/dadait) 2014/09/12 11:18 好文章。 回复 举报 [last](https://my.oschina.net/u/1032714) 2014/09/12 09:43 涨知识了 回复 举报 [亚林瓜子](https://my.oschina.net/fxtxz2) 2014/09/12 09:40 来个 SpringMVC 的文件分块分片 回复 举报 [L3ve](https://my.oschina.net/l3ve) 2014/09/12 09:33 dota2 赞一个... 翻译也顶下 回复 举报

分类 Web/WAP 应用开发 游戏开发 手机软件开发 桌面软件开发 服务器端开发 网页设计 / UI/UED 软件测试 / QA 软件开发管理 系统及网络管理 DBA / 数据库 编程语言技巧 安全相关 其它领域 软件   关联的软件标签 (最多 5 个) Node.js 标签 

段落删除后无法恢复，确定删除此段落吗？

评论删除后，数据将无法恢复