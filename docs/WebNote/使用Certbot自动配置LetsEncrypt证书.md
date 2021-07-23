---
title: 使用Certbot自动配置LetsEncrypt证书
---
原文地址: [https://www.jianshu.com/p/3ffd27b64847](https://www.jianshu.com/p/3ffd27b64847)

1. HTTPS基本介绍
------------

现在各大厂商都在推行HTTPS，比如谷歌要求多个顶级域名要用HTTPS来加密，苹果要求开发者全部采用HTTPS等等。那什么是HTTPS呢？其实HTTPS只是HTTP的一个拓展，是在HTTP的基础上利用SSL/TLS来加密数据包的。工作流程如下：

  ![](//upload-images.jianshu.io/upload_images/1925988-da4fcfc67e55df9d.gif) An overview of the SSL or TLS handshake

> 图片来自IBM Knowledge Center: [An overview of the SSL or TLS handshake](https://www.ibm.com/support/knowledgecenter/en/SSFKSJ_7.1.0/com.ibm.mq.doc/sy10660_.htm)

注意第(2)步Server给Client发送了一个Server certificates，这个里面包含有Server的一些信息，如域名、公司信息、序列号和签名信息组成等，这个证书可以个人生成，也可以由权威机构签发，当然个人的就不受大众信任，而权威机构签发的证书则会被信任。

> 具体的可以参考：[细说 CA 和证书](https://www.barretlee.com/blog/2016/04/24/detail-about-ca-and-certs/)

2. Let’s Encrypt
----------------

CA的证书提供商有许多个，有收费的有免费的，而[Let’s Encrypt](https://letsencrypt.org/)就是其中之一的免费提供商。

### 2.1 如何获取Let's Encript的证书呢？

要从Let's Encript获取某个域名的证书，需要证明那你对该域名拥有控制权，对于该证明你可以使用某个使用[ACME](https://ietf-wg-acme.github.io/acme/)协议的软件来实现，而Certbot就是官方出的一个ACME客户端。

3. Certbot介绍
------------

先介绍一些Certbot相关概念。

### 3.1 Authenticators和Installers

Certbot支持两种类型的plugin，一种是用来获取证书的，称为**Authenticators**；另外一种是用来安装证书的，称为**Installers**。有的plugin支持一种，有的两种都支持，如nginx。

> 安装证书：自动修改配置文件，如修改nginx的某个`.conf`文件

Authenticators plugin使用`certonly`命令来获取证书，而Installers plugin使用`install`命令来安装证书。

### 3.2 plugin说明

下面列举几个常用的plugin作简要说明：

1.  [Webroot](https://certbot.eff.org/docs/using.html#webroot)：本地有运行webserver并且有能力修改其配置，就可以用该种方式（创建隐藏文件`.well-known`），获取证书时无需暂停webserver的运行。
2.  [Standalone](https://certbot.eff.org/docs/using.html#standalone)：服务器未运行webserver可以使用该方式，要保持80或443端口开放。
3.  [Nginx](https://certbot.eff.org/docs/using.html#nginx)：自动获取和安装证书（自动修改配置文件）。

### 3.3 Certbot使用流程

Certbot的使用包含以下几个部分：

1.  安装Certbot
2.  生成证书
3.  配置Web Server
4.  更新证书

#### 3.3.1 Certbot安装

安装Certbot参考：[Certbot](https://certbot.eff.org/)，直接选择软件和操作系统即可。

#### 3.3.2 获取证书

使用`certbot certonly`命令然后根据提示操作即可。

```
[root@efd140d6210b /]# certbot certonly
Saving debug log to /var/log/letsencrypt/letsencrypt.log

How would you like to authenticate with the ACME CA?
-------------------------------------------------------------------------------
1: Spin up a temporary webserver (standalone)
2: Place files in webroot directory (webroot)
-------------------------------------------------------------------------------
Select the appropriate number [1-2] then [enter] (press 'c' to cancel): 
```

> 对于nginx可以使用`certbot --nginx`来获取和安装证书。

获取完之后可以通过`certbot certificates`命令查看证书：

```
root@node01:~# certbot certificates
Saving debug log to /var/log/letsencrypt/letsencrypt.log

-------------------------------------------------------------------------------
Found the following certs:
  Certificate Name: www.youdomain.com
    Domains: www.youdomain.com
    Expiry Date: 2018-09-03 02:08:54+00:00 (VALID: 89 days)
    Certificate Path: /etc/letsencrypt/live/www.youdomain.com/fullchain.pem
    Private Key Path: /etc/letsencrypt/live/www.youdomain.com/privkey.pem
------------------------------------------------------------------------------- 
```

#### 3.3.3 配置Web Server

不同Web Server的配置方式不同，这里以Nginx为例，在配置文件`youdomain.conf`中添加：

```
server {
    listen [::]:80;

    root /var/www/youdomain;
    index index.html index.htm;

    server_name www.yourdomain.com;

    charset utf-8;
    
    #.................

    listen 443 ssl; 
ssl_certificate /etc/letsencrypt/live/www.yourdomain.com/fullchain.pem; 
ssl_certificate_key /etc/letsencrypt/live/www.yourdomain.com/privkey.pem; 

} 
```

> 需要了解Nginx的使用

配置完之后更新配置即可(`nginx -s reload`)，到这里证书配置就完成了，正常情况下该域名HTTPS就可以访问了。

#### 3.3.4 更新证书

由于Let’s Encrypt颁发的证书的有效期只有90天，这就需要更新证书。

> [Renewing certificates](https://certbot.eff.org/docs/using.html#renewing-certificates)

```
certbot renew 
```

> 如果使用了nginx plugin，则更新时需要使用`certbot renew --quiet --installer node`，否则会自动安装证书导致错误。

### 3.4 Certbot常用命令

```
// perform a test run
certbot certonly --dry-run
certbot renew --dry-run
// 显示证书信息
certbot certificates
// 撤销证书
certbot revoke --cert-path /etc/letsencrypt/live/CERTNAME/cert.pem
// 删除证书（撤销之后使用）
certbot delete --cert-name example.com 
```

> 如果证书是测试的如`--staging`，撤销时也要加上。

### 3.5 Certbort其他功能

#### 3.5.1 泛域名支持

可以使用[DNS Plugins](https://certbot.eff.org/docs/using.html#dns-plugins)来实现。

> [Let's Encrypt泛域名证书](https://blog.csdn.net/shasharoman/article/details/79615023)

Reference
---------

1.  [An overview of the SSL or TLS handshake](https://www.ibm.com/support/knowledgecenter/en/SSFKSJ_7.1.0/com.ibm.mq.doc/sy10660_.htm)
2.  [Let's Encript Getting Started](https://letsencrypt.org/getting-started/)
3.  [Certbot documentation](https://certbot.eff.org/docs/)
4.  [HTTPS 简介及使用官方工具 Certbot 配置 Let’s Encrypt SSL 安全证书详细教程](https://linuxstory.org/deploy-lets-encrypt-ssl-certificate-with-certbot/)

  
  
作者：keith666  
链接：https://www.jianshu.com/p/3ffd27b64847  
来源：简书  
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。