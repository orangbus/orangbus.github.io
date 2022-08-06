```
title: "elasticsearch"
```

## laradock-elasticsearch启动失败

```
sudo sysctl -w vm.max_map_count=524288
```



## laradock安装ik分词器

1、进入 `laradock/elasticsearch` 修改 `Dockerfile` 

```
ARG ELK_VERSION
FROM elasticsearch:${ELK_VERSION}

# 添加下面一行安装命令
RUN /usr/share/elasticsearch/bin/elasticsearch-plugin install https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.9.1/elasticsearch-analysis-ik-7.9.1.zip

EXPOSE 9200 9300
```

注意：ik分词器的版本要和elasticsearch的版本是一致的，不然会报错.

可以先通过 `docker images | grep elassticsearch` 查看一下search的版本

---

考虑到在我天朝下载github的东西会比较慢，可以先下载ik再copy进去

```
mkdir -p pathto/laradock/elasticsearch/plugins

|-- Dockerfile
`-- plugins
    `-- elasticsearch-analysis-ik-7.9.1.zip

```

修改 `elasticsearch/Dockerfile` 

```
COPY ./plugins/elasticsearch-analysis-ik-7.9.1.zip /usr/share/elasticsearch/plugins
```

2、重新 build

```
docker-compose build elasticsearch
```

3、最后，查看是否安装成功：

```bash
docker-compose exec elasticsearch /usr/share/elasticsearch/bin/elasticsearch-plugin list
```

ik分词器Github：https://github.com/medcl/elasticsearch-analysis-ik/tree/v7.9.1

## 跨域

修改 `elasticsearch/Dockerfile`

```
RUN cat <<<
http.cors.enabled: true
http.cors.allow-origin: "*"
>>> >> /usr/share/elasticsearch/config/elasticsearch.yml
```

## 分布式部署

server1

```
http.port: 8300
cluster.name: search //标识集群
node.name: master
node.master: true
```

node1

```
http.port: 8301
cluster.name: search //标识集群
node.name: node1
node.master: false
discovery.zen.ping.unicast.hosts: ["127.0.0.1"] // 自动发现主节点
```





# 字段类型

`keyword` 类型的字段不会被分词

`match` 会使用分词器

## 精确匹配

```
GET arc/_search
{
  "query": {
    "term": {
      "name": "张三 王五"
    }
  }
}
```

## 模糊查询

 多个条件使用空格分开

```
GET arc/_search
{
  "query": {
    "match": {
      "name": "张三 王五"
    }
  }
}
```

## 字段限制

> "_source": ["name","age"]

```
GET arc/_search
{
  "query": {
    "match": {
      "name": "王三"
    }
  },
  "_source": ["name","age"]
}
```

## 排序

```
GET arc/_search
{
  "query": {
    "match": {
      "name": "王三"
    }
  },
  "sort": [
    {
      "age": {
        "order": "desc"
      }
    }
  ]
}
```

## 分页

> form: 起始值
>
> size: limit

```
GET arc/_search
{
  "query": {
    "match": {
      "name": "王三"
    }
  },
  "from": 0,
  "size": 2
}
```

