---
title: 任务清单
---

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



/www/server/data/wugou





```


tar -czvf tongyong.tar.gz --exclude=tongyong/public/uploads --exclude=tongyong/storage  --exclude=tongyong/public/company_uploads --exclude=vendor tongyong
```



测试

后台：http://121.4.55.159:8083

黑名单客户过滤：http://121.4.55.159:8084

运营账号：13187424292 admin





AI的“Ada”、“Babbage”、“Curie”或“Davinci”模型都是人工智能语言模型，其主要区别在于它们使用的训练数据的类型和大小，以及它们表现出的语言生成能力的- 



“Ada”模型是基于文本，音频和视频全方位信息进行训练的模型。

- “Babbage”模型使用大量的结构化数据集进行训练，例如数字，图表等。
- “Curie”模型使用处理速度更快的Transformer架构和更大的预训练数据集进行训练，以提高自然语言生成的质量和速度。
- “Davinci”模型使用了最大规模的预训练数据集，可以生成更加逼真和精确的自然语言内容。



如果您只需要总结或生成一些基础的文字介绍，建议使用更简单的“Ada”或“Babbage”模型，如果您需要生成更复杂或更高质量的自然语言内容，则建议使用更高级的“Curie”或“Davinci”模型。 但需要注意的是，这些高级使用大的硬件。













