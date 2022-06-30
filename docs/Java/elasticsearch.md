---
title: elasticsearch
---

> 当使用`httpclient` 和 `elasticsearch` 的时候，他们两个的版本需要保持一致

index：database

type: table

doc:  一行记录

版本选择：

跨域处理

```yaml
# vim /elasticsearch/config/elasticsearch.yml

http.cors.enabled: true
http.cors.allow-origin: "*"

# https 访问关闭
xpack.security.enabled: false
```

## 单节点docker安装





## 插件安装

```
./bin/elasticsearch-plugin install https://github.91chi.fun/https://github.com//medcl/elasticsearch-analysis-ik/releases/download/v8.1.0/elasticsearch-analysis-ik-8.1.0.zip
```

## mysql-jdbc

> https://mvnrepository.com/artifact/mysql/mysql-connector-java/8.0.17

cerebro



## 集群安装

master

```yaml
cluster.name: orangbus
node.name: master
node.master: true
network.host: 0.0.0.0 # 指定ip
```

node1

```yaml
cluster.name: orangbus # 主节点保持一致
http.port: 8200
discovery.zen.ping.unicast.host: ["127.0.0.1"]
```

node2

```yaml
cluster.name: orangbus # 主节点保持一致
http.port: 8300
discovery.zen.ping.unicast.host: ["127.0.0.1"]
```

## mysql配置文件



```yaml
input {
  jdbc{
    jdbc_driver_library => "D:\\laragon\\www\\Java\\elk\\mysql-connector-java-8.0.16.jar"
    jdbc_driver_class => "com.mysql.cj.jdbc.Driver"
    jdbc_connection_string => "jdbc:mysql://127.0.0.1:3306/laravel_web?characterEncoding=utf8&useSSL=false&serverTimezone=UTC&rewriteBatchedStatements=true"
    jdbc_validate_connection => true
    jdbc_user => "root"
    jdbc_password => "root"
    schedule => "* * * * *"
    clean_run => true
    statement => "SELECT * FROM jokes WHERE updated_at >= :sql_last_value"
    jdbc_paging_enabled => "true"
    jdbc_page_size => "1000"  # 每页1000条数据
    jdbc_default_timezone =>"Asia/Shanghai"
  }
}

output {
  elasticsearch {
    hosts => ["http://162.14.72.65:9200"]
    index => "jokes"
    document_id => "%{id}"
  }
}

```

创建配置文件logstash_mysql.conf

```bash
input{
     jdbc {  # java数据库访问的API接口
         jdbc_driver_library => "/home/python/mysql-connector-java-8.0.13/mysql-connector-java-8.0.13.jar"
         jdbc_driver_class => "com.mysql.jdbc.Driver"
         jdbc_connection_string => "jdbc:mysql://127.0.0.1:3306/toutiao?tinyInt1isBit=false"
         jdbc_user => "root"
         jdbc_password => "mysql"
         jdbc_paging_enabled => "true"  # 数据分页, 一共14W数据
         jdbc_page_size => "1000"  # 每页1000条数据
         jdbc_default_timezone =>"Asia/Shanghai"
         statement => "select a.article_id as article_id,a.user_id as user_id, a.title as title, a.status as status, a.create_time as create_time,  b.content as content from news_article_basic as a inner join news_article_content as b on a.article_id=b.article_id"  # 联表查询, 尽量起别名,否则ES的字段名称会变为a.xx, 这样和mysql的字段名称会出现差异
     }
}

output{
      elasticsearch {
         hosts => "127.0.0.1:9200"
         index => "articles"
         document_id => "%{article_id}"  # 让文档id记录文章id, 方便进行数据库查询
         document_type => "article"
      }
      stdout {  # 导入过程中以json形式显式的输出导入的内容
         codec => json_lines  
     }
}
```

- 增量更新的配置

```
input{
  record_last_run => "true"  	# 记录最后一次运行时的数据点, 默认为最后一次更新的时间
	use_column_value => "true"  # 不再记录最后一次更新的时间, 而是记录最后一次更新时, 数据库某个字段的值(字段的值要求是递增的)
  tracking_column => "article_id"  # 设置记录的字段
last_run_metadata_path => "/xx/data"    # 数据点的存储位置
  clean_run => "false"    # 从存储位置开始继续读取, 如果设置为true, 则清除数据点, 从头开始读取
}
```

## 错误汇总

### 数据库链接失败

把`mysql-connector-java-8.0.16.jar`复制到`logstash-7.1.0\logstash-core\lib\jars` 

### 驱动加载失败



## 基本操作

| method | api                 | 案例                | 描述                |
| ------ | ------------------- | ------------------- | ------------------- |
| PUT    | /index/_doc/id      | /joke/_doc/1        | 创建索引（指定id）  |
| POST   | /index/_doc         | /joke/_doc          | 创建索引 （随机id） |
| POST   | /index/_doc/_update | /joke/_doc/\_update | 修改文档            |
| DELETE | /index/_doc/id      | /joke/_doc/1        | 删除文档            |
| GET    | /index/_doc/id      | /joke/_doc/1        | 通过id查询文档      |
| POST   | /index/_doc/_search | /joke/_doc/\_search | 搜索文档            |



## 索引（数据库）

创建索引

```
PUT /indexName
```

编辑

```

```

删除

```
DELETE /indexname
```

分词测试

```
GET /jokes/_analyze
{
  "analyzer": "standard",
  "text": "搞笑"
}
```

查询索引状态

```
GET /jokes/_stats
```



## 文档操作（表）

添加文档

```
PUT /index/_doc/id

PUT /videos/_doc/id
{
	"title":"mysql从select到delete",
	"url":"http://doc.orangbus.cn"
}
```

编辑文档

```
```

删除文档

```
```



docker镜像加速

```
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://0czkbjwu.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```





```
logstash -f mysql.conf
```



## 查询

text: 会使用分词器解析

keyword: 不会使用分词器解析

```json
GET _analyze
{
  "analyzer": "standard",
  "text": "老司机"
}

GET _analyze
{
  "analyzer": "keyword",
  "text": "老司机"
}
```



### 全部匹配

match: 会使用分词器

profile: true  显示查询语句

opearator: and 同时包含查询

match_phrase: 有顺序要求

term : 不对关键词进行分词处理

```json
GET /jokes/_search
{
  "query": {
    "match": {
      "title" :"搞笑"
    }
  }
}


```

### 分页查询

```json
GET /jokes/_search
{
  "query": {
    "match": {
      "title" :"搞笑"
    }
  },
  "form":0,
  "size":10
}
```

### bool查询

msut ( and )

shoud ( or )

```json
GET /jokes/_search
{
  "query": {
    "bool": {
      "must" :[
      	{
      		"match":{
      		"title":"搞笑"
      		}
      	}
      ]
    }
  }
}
```

### 查询 id<10

```json
GET /jokes/_search
{
  "query": {
    "bool": {
      "must" :[
      	{
      		"match":{
      		"title":"搞笑"
      		}
        }
      ],
      "filter": [
        {
          "range": {
            "id": {
              "lte": 10
            }
          }
        }
      ]
    }
  }
}
```

多条件查询

### 空格分页

```json
GET /jokes/_search
{
  "query": {
    "match": {
      "author": "笑话 搞笑"
    }
  },
  "_source": ["title","author"]
}
```

精确查询-term

```json
GET /jokes/_search
{
  "query": {
    "term": {
      "title": "笑话大全 爆笑短笑话,听话"
    }
  },
  "_source": ["title","author"]
}
```

### 排序:没有分值

```json
GET /jokes/_search
{
    "from":0,
    "size":100,
    "query":{
        "match":{
            "title":"搞笑"
        }
    },
    "_source": ["title","author","form_url","created_at","updated_at"],
    "sort": [
      {
        "updated_at": {
          "order": "desc"
        }
      }
    ]
}
```



### 字段限制

```json
GET /jokes/_search
{
  "query": {
    "match": {
      "title" :"搞笑"
    }
  },
  "_source": ["title","author"]
}
```

### 高亮查询

```json
GET /test/_search
{
  "query": {
    "match": {
      "name": "orangbus"
    }
  },
  "highlight": {
    "pre_tags": "<span style='color:red'>", 
    "post_tags": "</p>", 
    "fields":{
      "name": {}
    }
  }
}
```

## ik分词器

ik_smart: 最少切分

ik_max_word: 最细颗粒



## elasticsearch集成

集成的版本要和当前连接的 elasticsearch的版本保持一致







# 错误汇总

> OpenJDK 64-Bit Server VM warning: INFO: os::commit_memory(0x00000005c2800000, 8547991552, 0) failed; error='???????С?????????????' (DOS error/errno=1455)

内存不足：

修改`elasticsearch-8.1.0\config\jvm.options`

```
-Xms1g
-Xmx1g
```

> Elasticsearch无法访问

修改`elasticsearch-8.1.0\config\elasticsearch.yaml` 

```yaml
http.port: 9200
network.host: 0.0.0.0
```



**设计需求** 

超级管理员

普通管理员

调拨人员





