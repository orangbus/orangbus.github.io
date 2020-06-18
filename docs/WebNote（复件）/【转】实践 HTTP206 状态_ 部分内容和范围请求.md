> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 https://www.cnblogs.com/xuan52rock/p/8473942.html

原文:[http://www.cyberciti.biz/cloud-computing/http-status-code-206-commad-line-test/](http://www.cyberciti.biz/cloud-computing/http-status-code-206-commad-line-test/)  

HTTP 2xx 范围内的状态码表明了:"客户端发送的请求已经被服务器接受并且被成功处理了".HTTP/1.1 200 OK 是 HTTP 请求成功后的标准响应, 当你在浏览器中打开 www.cyberciti.biz 后, 你通常会得到一个 200 状态码. HTTP/1.1 206 状态码表示的是:"客户端通过发送范围请求头 Range 抓取到了资源的部分数据". 这种请求通常用来:

1.  学习 http 头和状态.
2.  解决网路问题.
3.  解决大文件下载问题.
4.  解决 CDN 和原始 HTTP 服务器问题.
5.  使用工具例如 lftp,wget,telnet 测试断电续传.
6.  测试将一个大文件分割成多个部分同时下载.

查明远程服务器是否支持 HTTP 206
--------------------

首先你需要知道文件大小以及远程服务器是否支持 HTTP 206 请求. 使用 curl 命令可以查看任意资源的 HTTP 头, 使用下面的 curl 命令可以发送一个 HEAD 请求:

```
$ curl -I http://s0.cyberciti.org/images/misc/static/2012/11/ifdata-welcome-0.png

```

输出结果为:

```
HTTP/1.0 200 OK
Content-Type: image/png
Content-Length: 36907
Connection: keep-alive
Server: nginx
Date: Wed, 07 Nov 2012 00:44:47 GMT
X-Whom: l3-com-cyber
Cache-Control: public, max-age=432000000
Expires: Fri, 17 Jul 2026 00:44:46 GMT
Accept-Ranges: bytes
ETag: "278099835"
Last-Modified: Mon, 05 Nov 2012 23:06:34 GMT
Age: 298127

```

其中有两个我们比较关注的请求头:

**Accept-Ranges: bytes** - 该响应头表明服务器支持 Range 请求, 以及服务器所支持的单位是字节 (这也是唯一可用的单位). 我们还能知道: 服务器支持断点续传, 以及支持同时下载文件的多个部分, 也就是说下载工具可以利用范围请求加速下载该文件.Accept-Ranges: **none** 响应头表示服务器不支持范围请求.

**Content-Length: 36907** -  Content-Length 响应头表明了响应实体的大小, 也就是真实的图片文件的大小是 36907 字节 (37K).

如何发送一个 range 请求头?
-----------------

现在, 你知道了该图片所在的服务器支持范围请求, 你需要发送一个包含 Range 请求头的 GET 请求:

```
Range: bytes=0-1024

```

完整的请求数据应该是这样的. 首先第一行是:

```
GET /images/misc/static/2012/11/ifdata-welcome-0.png HTTP/1.1 

```

然后需要发送 Host 请求头来指定请求资源所在的主机和端口号:

```
Host: s0.cyberciti.org

```

最后是要发送的 Range 请求头, 指定了你想要的字节范围:

```
Range: bytes=0-1024 

```

### 使用 telnet 命令

telnet 命令允许你使用 Telnet 协议来与远程主机 (服务器) 进行通信. 所有的类 Unix 操作系统以及 MS-Windows 都包含有 Telnet 客户端. 启动 Telnet 客户端并进入 Telnet 提示符, 要执行命令:

```
telnet your-server-name-here www
telnet your-server-name-here 80

```

想要通过端口号 80 连接远程服务器 s0.cyberciti.org, 输入:

```
telnet s0.cyberciti.org 80 

```

输出结果为:

```
Trying 54.240.168.194...
Connected to d2m4hyssawyie7.cloudfront.net.
Escape character is '^]'.

```

在本例中, 使用范围请求 (0-1024 字节) 来请求 s0.cyberciti.org 上的 / images/misc/static/2012/11/ifdata-welcome-0.png 文件, 输入:

```
GET /images/misc/static/2012/11/ifdata-welcome-0.png HTTP/1.1
Host: s0.cyberciti.org
Range: bytes=0-1024

```

输出结果为:

![](http://s0.cyberciti.org/uploads/cms/2012/11/telnet-http-206-range-requests-example.png)

上图中,

1.  区域 1 - GET 请求以及请求头.
2.  区域 2 - 206 状态以及响应头.
3.  区域 3 - 二进制数据.

### 使用 curl 命令

curl 命令是一个和远程服务器交换数据的工具. 它支持 HTTP/FTPSFTP/FILE 协议上的范围请求, 在下例中, 使用两段范围来请求远程文件 ifdata-welcome-0.png, 然后使用 cat 命令将两段数据合并成完整文件:

```
curl  --header "Range: bytes=0-20000" http://s0.cyberciti.org/images/misc/static/2012/11/ifdata-welcome-0.png -o part1
curl  --header "Range: bytes=20001-36907" http://s0.cyberciti.org/images/misc/static/2012/11/ifdata-welcome-0.png -o part2
cat part1 part2 >> test1.png
gnome-open test1.png

```

还可以使用 - r 选项 (可以同时添加 - v 选项查看请求头和响应头):

```
curl  -r 0-20000 http://s0.cyberciti.org/images/misc/static/2012/11/ifdata-welcome-0.png -o part1
curl  -r 20001-36907 http://s0.cyberciti.org/images/misc/static/2012/11/ifdata-welcome-0.png -o part2
cat part1 part2 >> test2.png
gnome-open test2.png

```

如何开启 Accept-Ranges 响应头?
-----------------------

大部分 web 服务器都原生支持字节范围请求. Apache 2.x 用户可以在 httpd.conf 中尝试 [mod_headers](http://httpd.apache.org/docs/2.2/mod/mod_headers.html):

```
Header set Accept-Ranges bytes

```

Lighttpd 用户尝试在 lighttpd.conf 中进行下面的配置:

```
## enabled for all file types ##
server.range-requests = "enable"
## But, disable it for pdf files ##
$HTTP["url"] =~ "\.pdf$" {
    server.range-requests = "disable"
}

```

不喜欢命令行?
-------

你可以通过浏览器查看 HTTP 头. 尝试下面的附加组件:

*   下载 [Firefox - live http header](https://addons.mozilla.org/en-US/firefox/addon/live-http-headers/).
*   下载 [Google Chrome - live http header](https://chrome.google.com/webstore/detail/http-headers/hplfkkmefamockhligfdcfgfnbcdddbg).
*   指南: [Apple Safari - developer tools to view HTTP header](http://developer.apple.com/library/safari/documentation/AppleApplications/Conceptual/Safari_Developer_Guide/OptimizingYourWebsite/OptimizingYourWebsite.html).

总结
--

本文讨论了如何查看一个请求的 HTTP 头和响应状态. 你可以利用范围请求来分段下载一个大文件, 如果指定的偏移量是有效的, 则服务器会返回一个 HTTP 206 状态码. 如果偏移量是无效的, 则服务器会返回一个 HTTP 416 状态码 (请求范围无法满足).

from：https://www.cnblogs.com/ziyunfei/archive/2012/11/18/2775499.html