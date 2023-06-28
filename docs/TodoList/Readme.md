---
title: 任务清单
---



```
APP_NAME=高职大专网
APP_ENV=local
APP_KEY=base64:dGeDwIpjIkWir35vpPyIqHo/IgnqsXbEVX5qqfNNAgU=
APP_DEBUG=true
APP_URL=https://www.gaozhidazhuan.com
#APP_URL=http://cms.test

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_PORT=3306
DB_HOST=home.com
DB_DATABASE=xuekatu_cms
DB_USERNAME=xuekatu_cms
DB_PASSWORD=xuekatu_cms

BROADCAST_DRIVER=redis
CACHE_DRIVER=redis
FILESYSTEM_DISK=local
QUEUE_CONNECTION=redis
SESSION_DRIVER=redis
SESSION_LIFETIME=1200

MEMCACHED_HOST=127.0.0.1

REDIS_HOST=home.com
REDIS_PASSWORD=redis666
REDIS_PORT=6379
REDIS_PREFIX=gaozhi


MAIL_MAILER=smtp
MAIL_HOST=mailhog
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=admin
AWS_SECRET_ACCESS_KEY=admin666
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=web
AWS_USE_PATH_STYLE_ENDPOINT=false
AWS_ENDPOINT=http://192.168.110.137:9000
AWS_URL=//home.com:9000
#AWS_URL=http://cdn.home.com


PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_HOST=
PUSHER_PORT=443
PUSHER_SCHEME=https
PUSHER_APP_CLUSTER=mt1

VITE_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
VITE_PUSHER_HOST="${PUSHER_HOST}"
VITE_PUSHER_PORT="${PUSHER_PORT}"
VITE_PUSHER_SCHEME="${PUSHER_SCHEME}"
VITE_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"

# meilisearch | database http://192.168.110.137:7700 admin666
SCOUT_DRIVER=database
MEILISEARCH_HOST=
MEILISEARCH_KEY=

LARAVEL_PAGE_SPEED_ENABLE=false
TELESCOPE_ENABLED=true

DINDING_ENABLE=true
DINGDING_TOKEN=28cbc003c9716acdb505ec0b390179e8e8f5adb79f9810bdf68f083117d51bcd
```





# 会议系统

- [x] 子管理员：内件编辑时间格式不对

- [x] 内件处置： 处置方式 +【立案】 行政处分未显示

   印证材料无法下载 

  职务->职级筛选不对 

   删除 【违纪行为】

- [x] 外件：转办列表显示错误 | 导出反映人地址 无

- [x] 控制台：90天未处理数值不对

- [x] 统计->违纪统计：**未处理显**示不对

# 首页标识

3.4.3 简单构造模型 实验 视频





# 学咖兔服务器扩容

```
type growpart || yum install -y cloud-utils-growpart
```

执行

```
LC_ALL=en_US.UTF-8 growpart /dev/sdb 1
```

输出CHANGED字样时，表示分区扩容成功

然后再挂载到www下
xfs_growfs /www



# 日志生成统计

# 高职大专访问统计

```
goaccess -a -d -f /www/wwwlogs/gaozhidazhuan.com.log -o /www/wwwroot/nginx_log/html/gaozhi/index.html 
o /www/wwwroot/nginx_log/html/ynyixuepx/index.html
```



```
docker run 
--net elastic 
-p 9200:9200 
-it -d 
docker.elastic.co/elasticsearch/elasticsearch:8.7.0
```



# 聚合影视

追更电影今日提示，展开后可以查看更多的电影

分类批量下载

后台：

失效的接口测试无效可以删除电影





```
#检测elasticsearch
ESPID=`ps -ef | grep elasticsearch | grep -w 'elasticsearch' | grep -v 'grep' | awk '{print $2}' | head -n 1` &>/dev/null
if [[ $ESPID ]] ; then
    echo "$curtime 系统检测到Elasticsearch运行正常" >> $MonitorLog
else
    echo "$curtime 系统检测到Elasticsearch已挂掉,启动中...." >> $MonitorLog
   
    /home/$user/elasticsearch-6.3.1/bin/elasticsearch -d
    if [ $? -eq 0 ]; then
        echo "$curtime Elasticsearch启动完成" >> $MonitorLog;
    else
        echo "$curtime Elasticsearch启动失败" >> $MonitorLog;
    fi
fi
```

```
ps -ef | grep elasticsearch | grep -w 'elasticsearch' | grep -v 'grep' | awk '{print $2}'
```



文件路径： `/etc/systemd/system/elasticsearch.service.d` 

````
[Unit]
Description=elasticsearch
Documentation=http://www.elastic.co
Wants=network-online.target
After=network-online.target
StartLimitIntervalSec=0

[Service]
LimitMEMLOCK=infinity
User=es
Group=es
LimitNOFILE=65536
LimitNPROC=4096
LimitAS=infinity
StandardOutput=journal
StandardError=inherit
ExecStart=/www/wwwroot/Docker/Elk/elasticsearch-8.6.2/bin/elasticsearch
Restart=always

[Install]
WantedBy=multi-user.target
````



```


tar -czvf tongyong.tar.gz --exclude=tongyong/public/uploads --exclude=tongyong/storage  --exclude=tongyong/public/company_uploads --exclude=vendor tongyong
```



测试

后台：http://121.4.55.159:8083

黑名单客户过滤：http://121.4.55.159:8084

运营账号：13187424292 admin



- [x] 修改价格 字段不正确
- [ ] 导入处理延迟
- [x] 导出的记录
- [x] 客户修改密码
- [x] 代理直接充值次数
- [x] 客户黑名单对接接口接口















