---
title: Dockerfile
---

Dockerfile

- from 基础镜像
- label 标签
- run 执行命令并创建新的image layer
- workdir 除了设置文件目录
- add 添加并解压
- copy 复制文件
- env
- volume
- network
- cmd 设置容器**启动后**执行的命令
- entrypoint 设置同期**启动时**运行的命令



```dockerfile
FROM centos
LABEL author=orangbus
RUN yum install -y vim
WORKDIR /home/Code
ENV PHP_VERSION 7.4
RUN yum install -y mysql-server="${PHP_VERSION}"
```

**shell:** entrypoint echo $name

**exec:**  entrypoint ["/bin/bash","-c","echo $name"]



删除退出的容器

```
docker rm $(docker ps -qa)
```

```
## emby 
EMBY_IMAGE=emby/embyserver
EMBY_HTTP_PORT=8085
EMBY_HTTPS_PORT=8086
EMBY_CONFIG_PATH=./emby/config
EMBY_SHAREDIR_PATH=./emby/gd

# emby
    emby:
      container_name: emby
      image: ${EMBY_IMAGE}
      restart: always
      ports:
      - "${EMBY_HTTP_PORT}:8096"
      - "${EMBY_HTTPS_PORT}:8920"
      environment:
        UID: 1000
        GID: 100
        GIDLIST: 100
        DEVICE: /dev/dri:/dev/dri
        RUNTIME: nvidia
      volumes:
      - ${EMBY_CONFIG_PATH}:/config
      - ${EMBY_SHAREDIR_PATH}:/mnt/gd
```

# docker网络

## bridge

通过宿主机和docker0网络转换

## host

公用宿主机的网络接口

## 容器互联

```bash
docker run  --name=demo1 -d nginx
```

如果我们在创建一个docker容器，想直接通过容器名称连接可以通过`--link` 

```bash
docker create --name=demo2 --link=demo1
```

当demo2想要跟demo1互通，可以这样

```bash
docker run  --name=demo2 -d nginx

ping 172.17.1.1 # demo1 ip
// or
ping demo1 # 这样可是可ping通的
```

同一个`brige` 可以通过容器名称互通（类似域名）

# docker-compose

> 参数说明参考：https://www.cnblogs.com/wutao666/p/11332186.html

多个nginx做负载均衡，可以使用paproxy做负载均衡即可



## 保持后台运行

当我们运行一个 `container` 没有后台守护进程的时候，可以添加`tty` 参数保持容器处于 `up` 状态

```yml
  busybox:
    image: busybox
    networks:
      - scrapy
    tty: true # 保持后台运行
```

## command

容器启动后执行的命令

```bash
command:bundle exec thin -p 3000
```

该命令也可以是一个列表，方式类似于dockerfile：

```bash
command:["bundle","exec","thin","-p",``"3000"]
```



# harbor搭建个人仓库

> https://www.cnblogs.com/wutao666/p/11301519.html



