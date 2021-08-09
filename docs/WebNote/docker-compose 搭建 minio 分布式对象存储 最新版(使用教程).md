---
title: docker-compose 搭建 minio 分布式对象存储
---

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [blog.csdn.net](https://blog.csdn.net/weixin_40461281/article/details/118568289?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_title~default-0.control&spm=1001.2101.3001.4242)

1.简介
====

MinIO 是一个基于Apache License v2.0开源协议的对象存储服务。它兼容亚马逊S3云存储服务接口，非常适合于存储大容量非结构化的数据，例如图片、视频、日志文件、备份数据和容器/虚拟机镜像等，而一个对象文件可以是任意大小，从几kb到最大5T不等。

MinIO是一个非常轻量的服务,可以很简单的和其他应用的结合，类似 NodeJS, Redis 或者 MySQL。

[minio中文文档](http://docs.minio.org.cn/docs/master/minio-monitoring-guide)

2.单机编排
======

```
`version: '3'
services:
  minio:
    image: minio/minio
    hostname: "minio"
    ports:
      - 9000:9000 # api 端口
      - 9001:9001 # 控制台端口
    environment:
      MINIO_ACCESS_KEY: admin    #管理后台用户名
      MINIO_SECRET_KEY: admin123 #管理后台密码，最小8个字符
    volumes:
      - /docker/minio/data:/data               #映射当前目录下的data目录至容器内/data目录
      - /docker/minio/config:/root/.minio/     #映射配置目录
    command: server --console-address ':9001' /data  #指定容器中的目录 /data
    privileged: true
    restart: always` 
```

3.集群编排
======

```
`version: '3'

# starts 4 docker containers running minio server instances.
# using nginx reverse proxy, load balancing, you can access
# it through port 9000.
services:
  minio1:
    image: minio/minio
    hostname: minio1
    volumes:
      - data1-1:/data1
      - data1-2:/data2
    expose:
      - "9000"
      - "9001"
    environment:
      MINIO_ROOT_USER: minio
      MINIO_ROOT_PASSWORD: minio123
    command: server --console-address ":9001" http://minio{1...4}/data{1...2}
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:9000/minio/health/live"]
      interval: 30s
      timeout: 20s
      retries: 3

  minio2:
    image: minio/minio
    hostname: minio2
    volumes:
      - data2-1:/data1
      - data2-2:/data2
    expose:
      - "9000"
      - "9001"
    environment:
      MINIO_ROOT_USER: minio
      MINIO_ROOT_PASSWORD: minio123
    command: server --console-address ":9001" http://minio{1...4}/data{1...2}
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:9000/minio/health/live"]
      interval: 30s
      timeout: 20s
      retries: 3

  minio3:
    image: minio/minio
    hostname: minio3
    volumes:
      - data3-1:/data1
      - data3-2:/data2
    expose:
      - "9000"
      - "9001"
    environment:
      MINIO_ROOT_USER: minio
      MINIO_ROOT_PASSWORD: minio123
    command: server --console-address ":9001" http://minio{1...4}/data{1...2}
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:9000/minio/health/live"]
      interval: 30s
      timeout: 20s
      retries: 3

  minio4:
    image: minio/minio
    hostname: minio4
    volumes:
      - data4-1:/data1
      - data4-2:/data2
    expose:
      - "9000"
      - "9001"
    environment:
      MINIO_ROOT_USER: minio
      MINIO_ROOT_PASSWORD: minio123
    command: server --console-address ":9001" http://minio{1...4}/data{1...2}
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:9000/minio/health/live"]
      interval: 30s
      timeout: 20s
      retries: 3

  nginx:
    image: nginx:1.19.2-alpine
    hostname: nginx
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    ports:
      - "9000:9000"
      - "9001:9001"
    depends_on:
      - minio1
      - minio2
      - minio3
      - minio4

## By default this config uses default local driver,
## For custom volumes replace with volume driver configuration.
volumes:
  data1-1:
  data1-2:
  data2-1:
  data2-2:
  data3-1:
  data3-2:
  data4-1:
  data4-2:` 
```

4.进入控制台
=======

访问 `http://ip:9000` 即可进入登录页面  
账号密码为编排文件内指定的 `MINIO_ROOT_USER` 与 `MINIO_ROOT_PASSWORD`  
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210712172321156.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MDQ2MTI4MQ==,size_16,color_FFFFFF,t_70)

点击 `Object Browser` 进入桶页面 点击 `Create Buckets` 新建桶  
![在这里插入图片描述](https://img-blog.csdnimg.cn/2021071217290981.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MDQ2MTI4MQ==,size_16,color_FFFFFF,t_70)

创建一个名为 `test` 的对象桶  
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210712172930917.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MDQ2MTI4MQ==,size_16,color_FFFFFF,t_70)

点击 `Create Folder` 可以随意创建路径目录  
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210712173104549.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MDQ2MTI4MQ==,size_16,color_FFFFFF,t_70)

我们在 `test/upload/images` 目录下点击 `File` 上传文件按钮

选择需要上传的文件 点击上传即可  
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210712173216513.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MDQ2MTI4MQ==,size_16,color_FFFFFF,t_70)

点击文件后方 `下载` 标志按钮可以下载文件  
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210712173335850.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MDQ2MTI4MQ==,size_16,color_FFFFFF,t_70)  
我们点击下载 将文件下载到桌面  
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210708105054353.png)  
下载成功 接下来我们将文件进行删除  
点击 文件后方 `删除` 标志按钮  
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210712173428618.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MDQ2MTI4MQ==,size_16,color_FFFFFF,t_70)  
提示删除成功 文件消失  
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210712173448145.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MDQ2MTI4MQ==,size_16,color_FFFFFF,t_70)