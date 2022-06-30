---
title: elasticsearch
---

> 版本要一致

安装：

```bash
sudo pacman -S elasticsearch
```

## 跨域处理

```bash
sudo -i
cd /etc/elasticsearch
vim elasticsearch.yml
```

添加

```yaml
http.cors.enabled: true
http.cors.allow-origin: "*"
```

启动,默认地址9200

```bash
sudo systemctl start elasticsreach
```

安装可视化工具：elasticsearch-head



安装kibana

## 插件

下载插件放到`elasticsreach` 的`plugin` 文件夹即可

## ik分词器

```json
GET _analyze

{
    "analyzer":"user",
    "text": "orange"
}
```

## 项目升级初探elasticsearch

### 环境准备：

- laradock

- elasticsearch：7.13.2
- ik：7.13.2

修改elasticsearch版本

```bash
vim laradock/.env

ELK_VERSION=7.13.2
```

### 安装ik分词器：

下载ik分词插件到elasticsearch目录：

```bash
cd laradock/elasticsearch/
mkdir plugins
cd plugins && wget https://github.com/medcl/elasticsearch-analysis-ik/archive/refs/tags/v7.13.2.tar.gz
```

修改elasticsearch 的Dockerfile文件

```bash
vim laradock/elasticsearch/Dockerfile
```

```dockerfile
ARG ELK_VERSION=7.13.2
FROM docker.elastic.co/elasticsearch/elasticsearch:${ELK_VERSION}

COPY ./plugins/v7.13.2.tar.gz /usr/share/elasticsearch/plugins

EXPOSE 9200 9300
```

重新buildelasticsearch

```bash
docker-compose build elasticsearch
```

检查是否安装成功

```bash
docker-compose exec elasticsearch /usr/share/elasticsearch/bin/elasticsearch-plugin list
```

### 安装elasticsearch相关的扩展

```bash

```

# curd

## 创建索引（数据库）

```json
```

