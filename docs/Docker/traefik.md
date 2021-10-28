---
title: traefik入门
---

# traefik是什么？

- Træfɪk 是一个为了让部署微服务更加便捷而诞生的现代HTTP反向代理、负载均衡工具。
- 好处：百度一下
- 坏处：百度一下

中文网：[https://docs.traefik.cn/](https://docs.traefik.cn/) 

## 前提

> 首先安装好 docker 以及 docker-compose
>
> 我的服务器ip是：192.168.3.14
>
> 本机的ip地址：192.168.3.35

## 安装

首先任意找到一个`空文件夹`，创建一个`docker-compose-yaml` 文件

```yaml
version: '3.5'
services:
  traefik:
    image: traefik
    command: --api.insecure=true --providers.docker # 启用webUI 并告诉Traefile去监听docker的容器实例
    ports:
      - 80:80 # 宿主机（本机暴露端口）：容器内部的端口，一般是默认的，不要随意改动
      - 8008:8080  # webUI暴露的端口(必须制定--api.insecure=true才可以访问)
    volumes:
      # 指定docker的sock文件来让traefik获取docker的事件，从而实现动态负载均衡
      - /var/run/docker.sock:/var/run/docker.sock

  whoami:
    image: containous/whoami
    labels:
      - "traefik.http.routers.whoami.rule=Host(`whoami.test`)"
```

说明：

`whoami.test `  假如我们访问 `whoami.test` 指向的是 `whoami` 这个服务(留意下面的whoami操作)。

## 启动

```bash
docker-compose up -d
```

## 查看

```bash
docker-compose ps
==========
➜  docker-compose ps
traefik_traefik_1   /entrypoint.sh --api.insec ...   Up      0.0.0.0:80->80/tcp,:::80->80/tcp, 0.0.0.0:8008->8080/tcp,:::8008->8080/tcp
traefik_whoami_1    /whoami                          Up      80/tcp
```

如果两个服务都是 `up` 状态及表示安装成功。

## 查看traefik后台

浏览器访问：ip:8008

![image-20210826170611946](../.vuepress/public/images/traefik-dashbord.png) 

# 如何通过traefik访问whoami

首先在本机的 `hosts` 文件中添加一个解析指向服务器的traefik

```text
192.168.3.14 whoami.test
```

我们直接通过`本机` 浏览器访问：whoami.test , 即可访问到 `whoami` 这个服务了。

# 如何提现出他的负载均衡呢？

在我们的 `docker-compose.yaml` 文件中，我们并没有给`whoami`暴露端口给外界访问，所以不会存在端口冲突问题，此时我们可以将`whoami` 这个服务扩展到3个

```
docker-compose up -d --scale whoami=3
```

![image-20210826171819728](../.vuepress/public/images/traefik-whoami.png) 

多次刷新：`whoami.test` ，你会发现，whoami 的 `Hostname` 名字是动态变化的，也就是说`whoami`现在已经实现了负载均衡。

简单的traefik入门就到这里，欢迎大家加入我们的交流群一起讨论。

# Basic Auth：为traefik设置账号密码

使用 Traefik 为应用添加 Basic Auth 非常简单，只需要定义一个包含 basicAuth 用户名密码的中间件声明，然后在需要使用 Basic Auth 验证的服务路由上引用它即可，像是下面这样：

```
labels:
...
  - "traefik.http.middlewares.test-auth.basicauth.users=test:$$apr1$$H6uskkkW$$IgXLP6ewTrSuBkTrqE8wj/,test2:$$apr1$$d9hr9HBB$$4HxwgUir3HP4EsggP/QNo0"
  - "traefik.http.routers.test-auth-ssl.middlewares=test-auth@docker"
...

```

随便输入账号密码，或者取消输入，会获得 401 Unauthorized 的错误提示，如果我们输入账号和密码为 test 的内容，点击确定，则可以正常看到 Demo 服务的页面内容。

如何生成 Basic Auth 账号密码
如果你是 macOS 用户，系统默认携带了 apache htpasswd 工具，可以直接生成上面配置中的账号密码。

htpasswd -nb test test
test:$apr1$lH3nyBaa$/wCu0V3.1kYdpZPHRbiyv/
1
2
如果你的系统中找不到这个命令行，你也不想安装 apache utils，那么可以使用 Docker 来生成账号密码：

docker run --rm -it --entrypoint /usr/local/apache2/bin/htpasswd httpd:alpine -nb test test
1
<span style='color:red'>但是需要注意的是，在 compose 中使用的话，密码中的 $ 需要使用 $ 来进行替换，解决转义问题。</span>使用文件来定义、管理用户密码，需要声明下面的内容到 labels 字段中：

  - "traefik.http.middlewares.test-auth.basicauth.usersfile=/path/to/my/usersfile"
1
并在一个文件中使用换行来保存我们生成的用户名和密码：

test:$apr1$H6uskkkW$IgXLP6ewTrSuBkTrqE8wj/
test2:$apr1$d9hr9HBB$4HxwgUir3HP4EsggP/QNo0
1
2
如果你希望每个应用有其独立的账号密码，不希望用户账号混在一起存放、管理，那么可以使用环境变量和项目环境配置文件来解决这个问题。

先定义一个读取环境变量的验证中间件：

  - "traefik.http.middlewares.test-auth.basicauth.users=$AUTH_USER_LIST"
1
然后在 compose 同级目录中创建一个 .env 文件，以英文逗号为分隔符，传入生成的用户鉴权信息即可：

test:$apr1$H6uskkkW$IgXLP6ewTrSuBkTrqE8wj/,test2:$apr1$d9hr9HBB$4HxwgUir3HP4EsggP/QNo0
1
手动选择是否要将验证信息透传
默认情况下，当我们登录后，Traefik 会将授权后的验证头发送至后方的服务，我们在 header 中能看到类似下面的信息：

Authorization: Basic dGVzdDp0ZXN0
1
有一些应用支持使用请求头中的数据作为鉴权登录信息，而我们定义的用户信息很可能和系统的鉴权信息是不同的（也不推荐使用这个方案做为多数情况下应用鉴权方案），所以造成应用无法正常登陆，所以此刻我们要将这个鉴权操作的作用范围做一个限制，让它仅仅生效在首次访问应用前，流量到达 Traefik 时：

  - "traefik.http.middlewares.test-auth.basicauth.removeheader=true"
1
在添加了上面内容后，我们可以看到输入账号密码后，Traefik 不会再进行 Authorization 请求头的透传。

用还是不用，这是个问题
虽然相对详细的介绍了 Basic Auth，但是并不推荐大范围或者将其作为唯一鉴权手段。

因为在标准规范中，它使用 Base64 对用户名密码进行编码，然后传递给其他应用。众所周知 Base64 是可逆编码的，所以我们使用 Basic Auth 来保护应用其实并不安全，比如我们将前文中的 Authorization: Basic dGVzdDp0ZXN0 最后一段内容 dGVzdDp0ZXN0 进行解码，能够直接得到明文的 test:test。

但是如果你的系统未公开暴露于网络，并且使用人员有限，或提供开放服务，但是单纯不希望被搜索引擎抓取，可以在应用前端套一层 Basic Auth，相比较用户、爬虫能够直接访问到机器，这样还能够节约大量不必要的计算资源浪费。

不要单纯听从网络人云亦云，一刀切完全不用，克制的使用在适合的场景下，事半功倍。

