---
title: 农贸市场项目
---



花费时间

| 时间      | 时长/小时 | 备注        |
| --------- | --------- | ----------- |
| 2023-5-3  | 5         |             |
| 2023-4-4  | 8         |             |
| 2023-5-5  | 10        |             |
| 2023-5-6  | 3         | 26          |
| 2023-5-7  | 9         |             |
| 2023-5-8  | 3         |             |
| 2023-5-9  | 5         |             |
| 2023-5-10 | 4         |             |
| 2023-5-11 | 3         |             |
| 2023-5-12 | 2         |             |
| 2023-5-12 | 7         | 33          |
| 2023-5-13 | 11        |             |
| 2023-5-14 | 5         |             |
| 2023-5-15 | 6         |             |
| 2023-5-16 | 4         | 26          |
| 2023-5-17 | 3         |             |
| 2023-5-18 | 8         | 11          |
| 2023-5-19 | 8         |             |
| 2023-5-20 | 8         |             |
| 2023-5-21 | 4         |             |
| 2023-5-22 | 8         |             |
| 2023-5-23 | 2         | 30 = 126    |
| 2023-5-24 | 2         | 128*70=8960 |
| 2023-5-25 | 1         |             |
| 2023-5-26 | 1         |             |
| 2023-5-27 | 8         |             |
|           |           |             |
|           |           |             |
|           |           |             |





俊飞，把如下内容列一下：
1、完成计划

顺着从发布商品，渲染页面，下单，配送，订单查看，其它额外的渲染（修改密码，认证，添加子管理员等）

至于配送相关的计算，先把配送的页面渲染完之后我在想一下

2、可能需要外界协助的内容

暂时没有

3、整体时间费用边界

从5.3号开始做到现在，之前的累计有128小时了，接下来还有配送相关接口订单支付、计费及相关日志农贸市场相关的数据接口其它查缺补扣的接口整个后台的的管理15000-17000左右完成时间前端接口调完就完成（在此之前，大部分也已经完成了）

4、每日共同协作的计划

晚上8点之后都有时间



1、现在的用户结构



# 2023-5-27

后台完成进度及计划：

- [x] 商品列表显示
- [x] 农贸市场列表显示，添加，编辑，删除

2023-5-28

- [x] 档口列表，编辑，删除，档口管理员（列表，添加，编辑，删除）
- [x] 餐饮企业列表，编辑，删除，管理员（列表，添加，编辑，删除）
- [x] 每个角色的编辑
- [ ] 订单列表
- [ ] 入驻缴费明细
- [ ] 配送缴纳金明细
- [ ] 商品列表编辑
- [x] 权限管理


https://modao.cc/app/a9iWROjrq1suskYpWrqFL #农贸市场销售子系统-分享  密码: y55whh

http://120.197.215.77:5432
http://120.197.215.77:1724/ 后台管理
administrator 123456



linux服务器需要的必要软件

php8.0+ 开启ssl模块 （如果你需要7.4版本，你需要安装两个版本共存，默认使用php8.0）

nginx: 最新版本

mysql:5.7|8.0

redis: 最新版本

Supervisor：最新版本

docker:最新版本

fpt:最新

以及对应文件的配置目录

```
IP Address: 192.168.159.166  root/k1k1k1k1
mysql 本地， root/nmsc2023!
redis: 8dce62f00d89573e55b5245c

Nginx_File_Dir="nginx-1.24.0"
Nginx_Prefix="/usr/local/nginx"
Nginx_Dir="/usr/local/nginx/html"

Mysql_File="mysql-5.7.38-linux-glibc2.12-x86_64.tar.gz"
Mysql_File_Dir="mysql-5.7.38-linux-glibc2.12-x86_64"
Mysql_Config_File="/etc/my.cnf"
Mysql_Prefix="/usr/local/mysql57"
Mysql_Dir="/data/mysql"
Mysql_User="mysql"

PHP_Eight_File="php-8.0.26.tar.gz"
PHP_Seven_File="php-7.3.33.tar.gz"
PHP_Eight_File_Dir="php-8.0.26"
PHP_Seven_File_Dir="php-7.3.33"
PHP_Eight_Prefix="/usr/local/php80"
PHP_Seven_Prefix="/usr/local/php73"
PHP_User="nginx"

Oniguruma_File="oniguruma-6.9.7.1.tar.gz"
Oniguruma_File_Dir="onig-6.9.7"

Redis_File="redis-7.0.11.tar.gz"
Redis_File_Dir="redis-7.0.11"
Redis_Prefix="/usr/local/redis"

Elasticsearch_File="elasticsearch-7.17.10-x86_64.rpm"
Elasticsearch_Dir="/data/elasticsearch"

==========================
应用文件，已复制到了 /www/下。
4个主要的数据库已导入，你可以直接使用navicat访问的。

ssl也更新了，是可以直接放到测试环境中的（sd.msadb.cn)，申请了两个证书放在/data/https下。

php 8.0.26 是9000端口。
php 7.3.33 是9001端口。

CREATE DATABASE IF NOT EXISTS nmsc  DEFAULT CHARSET utf8mb4 COLLATE utf8mb4_unicode_ci;
我们一般都用这个CHARSET  和 COLLATE 

你在远程电脑上hosts上改记录就可以对应好sd.msadb.cn与nmsc.msadb.cn。模拟测试环境sd.msadb.cn上的操作。
```

别名

```
alias nginx-res="systemctl restart nginx"
alias nginx-conf="cd /root/code/server/nginx/conf/conf.d"
alias code="cd && cd code"
```

```nginx
location ~* \.php$ {
        root "/www/wwwroot/nmsc/nmsc-api/public";
        fastcgi_buffer_size 64k;
        fastcgi_buffers 4 64k;
        fastcgi_busy_buffers_size 128k;
        fastcgi_temp_file_write_size 256k;
        fastcgi_pass    127.0.0.1:9000;
        fastcgi_index   index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name; // linux 正确配置
        include fastcgi_params;
}
```

Supervisor配置

```
touch nmsc-queue.ini
```

```ini
[program:nmsc-queue]
command=php artisan queue:work
directory=/www/wwwroot/nmsc/nmsc-api
autorestart=true
startsecs=3
startretries=3
stdout_logfile=/root/code/server/supervisord/logs/nmsc-queue.out.log
stderr_logfile=/root/code/server/supervisord/logs/nmsc-queue.err.log
stdout_logfile_maxbytes=2MB
stderr_logfile_maxbytes=2MB
user=root
priority=999
numprocs=3
process_name=%(program_name)s_%(process_num)02d
```

1、更新配置后必须执行更新命令才生效

sudo supervisorctl update
1
2、查看supervisor进程

sudo supervisorctl status
1
3、启动某个supervisor进程

sudo supervisorctl start xxxx
1
4、停止某个supervisor进程

sudo supervisorctl stop xxxx
1
5、停止所有supervisor进程

sudo supervisorctl stop all
1
6、重启某个supervisor进程

sudo supervisorctl restart xxxx



信用积分计算？

















