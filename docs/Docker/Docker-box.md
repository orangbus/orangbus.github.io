---
title: docker 集合箱
---

# 环境要求

Docker20+

docker-compose

开始前请设置一个别名:`vim .bashrc`

```bash
alias dc="docker-compose"
alias dcd="dc down"
alias dcup="dc up -d"
```

# minio - 9001

对象存储

启动

```bash
dc up -d minio
```

配置文件

```text
MINIO_ROOT_USER=admin
MINIO_ROOT_PASSWORD=admin666

MINIO_ACCESS_KEY=admin
MINIO_SECRET_KEY=admin666
minio_api_port=9000
minio_port=9001
minio_data=./minio/data
minio_config=./minio/config
```



# prometheus - 9090

> 官网: https://prometheus.io/

启动

```bash
dc up -d prometheus
```

配置文件

```text
prometheus_port=9090
prometheus_config=./prometheus/config
```



# syncthing - 8384

数据同步

启动

```bash
dc up -d syncthing
```

配置文件

```text
syncthing_name=syncthing
syncthing_web_port=8384
syncthing_path=./syncthing
```



# aria2 - 6885

下载工具

启动

```bash
dc up -d aria2
```

Tip:打开页面提示认证失败，自行修改 `RPC连接` 配置
AriaNG设置》tab切换到 `RPC` 配置 `Aria2 RPC秘钥：admin666`

Ariang访问端口： 6885

# merlisearch - 7700

> 官网：[https://www.meilisearch.com](https://www.meilisearch.com)

启动

```bash
dc up -d meilisearch
```

配置文件说明

```env
# meilisearch
meilisearch_port=7700 # web访问地址
meilisearch_key=admin666 # 秘钥
meilisearch_data=./meilisearch # 数据存储地址
```

# PanIndex - 5238

> 项目地址：[https://libsgh.github.io/PanIndex](https://libsgh.github.io/PanIndex) 

网盘管理工具

启动

```bash
dc up -d panindex
```

`初始密码：PanIndex`

配置文件

```text
panindex_port=5238 # web访问端口
panindex_data=./panindex/data # 数据库地址
panindex_share_path=/home/orangbus/Videos # docker本地目录地址，网盘不需要设置:/share
```

# httpbin - 8085

```
dc up -d httpbin
```

# traefik - 8012

负载均衡

启动

```bash
dc up -d traefik
```

配置文件

```text
traefik_port=8011
traefik_dashbord_port=8012 #后台面板地址
traefik_https_port=443
```

# filebrowser - 8010

文件管理

启动

```bash
dc up -d filebrowser
```

配置文件

```text
filebrowser_port=8010 # 访问端口
filebrowser_data=./data # 文件存储路径
```

# cloudreve - 5212

文件管理

启动

```bash
dc up -d cloudreve 
```

配置文件

```text
cloudreve_port=5212 # web访问端口
cloudreve_uploads=./data #./cloudreve/uploads
cloudreve_config=./cloudreve/config
cloudreve_db=./cloudreve/db
cloudreve_avatar=./cloudreve/avatar
```

# nextcloud- 5212

文件管理

启动

```bash
dc up -d nextcloud
```

配置文件

```text
nextcloud_port=8090
nextcloud_data=./nextcloud
nextcloud_user=orangbus
nextcloud_password=orangbus666
nextcloud_database=nextcloud
```

# v2raya

```bash
docker run -d \    
  --restart=always \
  --privileged \
  --network=host \
  --name v2raya \
  -e V2RAYA_LOG_FILE=/tmp/v2raya.log \
  -v /lib/modules:/lib/modules:ro \
  -v /etc/resolv.conf:/etc/resolv.conf \
  -v /etc/v2raya:/etc/v2raya \
  mzz2017/v2raya
  
docker run -d --restart=always --privileged --network=host --name v2raya -e V2RAYA_LOG_FILE=/tmp/v2raya.log -v /lib/modules:/lib/modules:ro -v /etc/resolv.conf:/etc/resolv.conf -v /etc/v2raya:/etc/v2raya mzz2017/v2raya
```



















