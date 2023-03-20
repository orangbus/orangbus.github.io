---
title: nginx 黑名单和白名单
---

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [www.yechuchen.cn](http://www.yechuchen.cn/article/20210420203951/)

> 在解决禁止 ip 直接访问网站的问题的时候，受到群友启发，发现还有个可以禁止 ip 直接访问网站的办法，那就是网站黑白名单。

在解决[禁止 ip 直接访问网站](http://www.yechuchen.cn/article/20210420174143/)的问题的时候，受到群友启发，发现还有个可以禁止 ip 直接访问网站的办法，那就是网站黑白名单。

创建黑名单其实很简单，只需要使用 allow 或者 deny 关键字就可以了。

*   其中，allow 关键字用来允许访问某 ip, 其中`allow all`，表示允许所有的 ip
*   其中，deny 关键字用来拒绝访问某 ip，其中`deny all`，表示拒绝所有的 ip 进行访问
    
    ```
    server{
        listen:80;
        server_name localhost;
        deny 192.168.1.10;  #拒绝访问192.168.1.10的ip地址
        allow 192.168.1.9;  #允许访问192.168.1.9的ip地址
    }
    ```
    
    当然如上我所需要的，是禁止通过 IP 访问某个网站，那么只要使用如下代码所示：
    
    ```
    server{
        listen: 80;
        server_name www.yechuchen.cn;
        allow all;#允许访问所有的ip
        deny 12.345.56.678;#但不允许访问域名所绑定的ip
    }
    ```
    
    而要做出网站黑名单，就有可能要屏蔽一堆 ip，但是如果将其放在 nginx.conf 文件夹下，既不美观，也不利于管理，因此需要单独写出一个 blacklist.conf，然后在 nginx.conf 中引用它。
*   **blacklist.conf**
    
    ```
    allow all;
    deny 123.45.678.91;
    deny 12.345.67.8;
    ...
    ```
    
*   **nginx.conf**
    
    ```
    server{
        listen:80;
        server_name www.yechuchen.cn;
        include blacklist.conf; #引用blacklist.conf
    }
    ```
    
    配置白名单和配置黑名单其实差不多，只是把 allow 和 deny 反过来罢了，因此这里不细写了，直接贴一个代码
*   **whitelist.conf**
    
    ```
    deny all; # 禁止访问所有ip
    allow 192.168.1.10; # 允许访问指定ip
    allow 192.168.1.9; # 允许访问指定ip
    ...
    ```
    
*   **nginx.conf**
    
    ```
    server{
        listen:80;
        server_name www.yechuchen.cn;
        include whitelist.conf; #引用whitelistlist.conf
    }
    ```
    

HTTP 范围黑名单
------------------------------------

**总入口黑名单**  

```
http{
    include blacklist.conf;
    ...
    server{
        ...
    }
}
```


如上所示，在 http 里配置的则是 http 范围的黑名单了。

SERVER 范围黑名单
------------------------------------------

**分域名黑名单**  

```
http{
    ...
    server{
        include blacklist.conf;
        ...
    }
}
```


如上所示，在 server 配置的是 server 范围的黑名单。

Location 范围黑名单
------------------------------------------------

**分域名黑名单**  

```
http{
    ...
    server{
        ...
        location /{
            include blacklist.conf;
            ...
        }
    }
}
```


如上，这是 location 范围的黑名单。  
从上面不同范围的黑名单可以看出来，不同的范围对应的效果不一样。在 Http 范围的黑名单中，访问该服务器的所有服务都要被黑名单过滤。在 Server 范围黑名单中，只有访问该 http 服务器的当前 server 服务时，才会被黑名单过滤。而 Location 范围呢，自然便是针对当前转发才会被黑名单过滤了。

版权声明: 本博客所有文章除特别声明外，均采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 许可协议。转载请注明来自 [夜初尘的博客](http://www.yechuchen.cn/)！