---
title: Lnmp 环境配置
---

# 别名

```bash
# vim ~/.zshrc

alias ctl="sudo systemctl "
alias lnmp="ctl start nginx php-fpm mysqld"
alias lnmp-restart="ctl restart nginx php-fpm mysqld"
alias lnmp-stop="ctl stop nginx php-fpm mysqld"
alias lnmp-nginx="ctl restart nginx "
alias lnmp-php="ctl restart php-fpm"
alias lnmp-mysql="ctl restart mysqld"
#reread|update|status
alias lnmp-sup="sudo supervisorctl"
```



# nginx

安装

```bash
sudo pacman -S nginx
```

配置目录： `/etc/nginx` 

```
# /etc/nginx/nginx.conf 

#worker_processes auto;
#worker_rlimit_nofile 65535;
user orangbus; # 这里的用户需要和启动的用户保持一致

events {
	multi_accept on;
	worker_connections 65535;
}

http {
	charset utf-8;
	sendfile on;
	tcp_nopush on;
	tcp_nodelay on;
	server_tokens off;
	log_not_found off;
	types_hash_max_size 2048;
	client_max_body_size 16M;

	# MIME
	include mime.types;
	default_type application/octet-stream;

	# logging
	access_log /var/log/nginx/access.log;
	error_log /var/log/nginx/error.log warn;

	# SSL
	ssl_session_timeout 1d;
	ssl_session_cache shared:SSL:10m;
	ssl_session_tickets off;

	# Diffie-Hellman parameter for DHE ciphersuites
	ssl_dhparam /etc/nginx/dhparam.pem;

	# Mozilla Intermediate configuration
	ssl_protocols TLSv1.2 TLSv1.3;
	ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;

	# OCSP Stapling
	ssl_stapling on;
	ssl_stapling_verify on;
	resolver 1.1.1.1 1.0.0.1 8.8.8.8 8.8.4.4 208.67.222.222 208.67.220.220 valid=60s;
	resolver_timeout 2s;

	# load configs 下面两个文件夹需要自己创建
	include /etc/nginx/conf.d/*.conf;
	include /etc/nginx/sites-enabled/*.conf;
}
```

laravel配置 :`/etc/nginx/sites-enabled/laravel.conf`

```nginx
server {
    listen 80;

    server_name laravel.test;
    root /home/orangbus/Code/Laravel/public;
    index index.php index.html index.htm;

    location / {
         try_files $uri $uri/ /index.php$is_args$args;
    }

    location ~ \.php$ {
        try_files $uri /index.php =404;
        fastcgi_pass unix:/run/php-fpm/php-fpm.sock;
        fastcgi_index index.php;
        fastcgi_buffers 16 16k;
        fastcgi_buffer_size 32k;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        #fixes timeouts
        fastcgi_read_timeout 600;
        include fastcgi_params;
    }

    location ~ /\.ht {
        deny all;
    }

    location /.well-known/acme-challenge/ {
        root /var/www/letsencrypt/;
        log_not_found off;
    }

    error_log /home/orangbus/Code/Server/nginx/error/laravel_error.log;
    access_log /home/orangbus/Code/Server/nginx/error/laravel_access.log;
}

```

查看当前启用的用户

```bash
ps aux | grep "nginx: worker process" | awk '{print $1}'

➜  ~ ps aux | grep "nginx: worker process" | awk '{print $1}'
orangbus
orangbus

```

启动

```bash
sudo systemctl start|restart|stop nginx
```



> could not build optimal types_hash, you should increase either types_hash_max_size: 1024 or types_hash_bucket_size: 64; ignoring types_hash_bucket_size

nginx.conf 配置有问题

> bind() to 0.0.0.0:80 failed (13: Permission denied)

可先使用 `sudo nginx` 查看配置是否正确，如果正确的话那就是用户权限不对



# php

```bash
sudo pacman -S php
```

## php-redis

> https://pecl.php.net/package/redis

```bash
tar -zxvf redis-5.3.7.tgz
cd redis-5.3.7
phpize
./configure
make && sudo make install
```

配置redis扩展

```ini
# sudo vim /etc/php/php.ini
extension=redis
```

查看是否安装成功

```bash
php -m |grep redis
```

# php-fpm

```bash
sudo pacman -S php-fpm
```

配置文件：`/etc/php/php-fpm.d/www.conf`

需要注意地方,这里的配置需要当前启动或者授权的用户，我当前linux的用户是 orangbus ，所以配置成这样，否则提示文件找不到

```config
user = orangbus
group = orangbus

listen.owner = orangbus
listen.group = orangbus
```

查看当前启动的用户

```bash

ps aux | grep "php-fpm: worker process" | awk '{print $1}'

➜  ~ ps aux | grep "php-fpm: worker process" | awk '{print $1}'
orangbus
```

启用

```bash
sudo systemctl start|restart|stop php-fpm
```

# mysql8.0

```bash
sudo pacman -S mysql
```

如果 mysql 命令找不到，安装一下 mysql 的客户端，将`usr/bin/mysql`配置到自己 PATH 环境变量中

```bash
sudo pacman -S mysql-clients
```

mysql配置文件：`/etc/mysql` 

初始化账号

```bash
sudo mysqld --initialize --user=mysql --basedir=/usr --datadir=/var/lib/mysql
---------------------
2022-08-21T07:18:25.105334Z 0 [Warning] [MY-010915] [Server] 'NO_ZERO_DATE', 'NO_ZERO_IN_DATE' and 'ERROR_FOR_DIVISION_BY_ZERO' sql modes should be used with strict mode. They will be merged with strict mode in a future release.
2022-08-21T07:18:25.105367Z 0 [System] [MY-013169] [Server] /usr/bin/mysqld (mysqld 8.0.29) initializing of server in progress as process 51263
2022-08-21T07:18:25.109363Z 1 [System] [MY-013576] [InnoDB] InnoDB initialization has started.
2022-08-21T07:18:25.322235Z 1 [System] [MY-013577] [InnoDB] InnoDB initialization has ended.
2022-08-21T07:18:26.097019Z 6 [Note] [MY-010454] [Server] A temporary password is generated for root@localhost: iqbawWj65s)W (这里有初始化的账号密码：iqbawWj65s)W)
```

如果初始化未能成功：可删除这个目录

```bash
sudo rm -rf /var/lib/mysql/*
```

登录数据库，尝试重新修改一下密码

```bash
# 启动数据
sudo systemctl start mysqld

# 登录
mysqld -uroot -p

# 修改密码
alter user root@'localhost' identified by 'root';

# 更改连接方式
update mysql.user set Host='%' where user='root';

# 刷新权限
flush privileges;

# 重启一下mysql
sudo systemctl restart mysqld
```

查看

```bash
ps aux | grep "mysql: worker process" | awk '{print $1}'
```

启动

```bash
sudo systemctl start|restart|stop mysqld
```

配置mysql允许远程连接

修改 `/etc/mysql/my.conf` 
找到bind-address = 127.0.0.1这一行
改为bind-address = 0.0.0.0即可



> ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/tmp/mysql.sock' (2)

```
mysql -uroot -p 

-> 使用mysql
mysql -uroot -p
```

> could not find driver

```bash
# 开启php的 pdo_mysql 扩展

sudo vim /etc/php/php.ini

extension=pdo_mysql

```

重启一下php-fpm

> mysqld: Can not perform keyring migration : Invalid –keyring-migration-source option.

这两天登录本地mysql客户端出了一个问题：**mysqld: Can not perform keyring migration : Invalid –keyring-migration-source option.**

我的登录命令：**mysqld** -u root -p

正确的登录命令是：mysql -u root -p

解释：mysqld是服务，用来mysql安装初始化；mysql是MySQL的命令行工具；



# redis

```bash
sudo pacman -S redis
```

配置文件：`/etc/redis` 

启动

```bash
sudo systemctl start redis
```

## 配置远程连接

关闭保护模式

```bash
sudo vim /etc/redis/redis.conf
```

```
# redis.conf

protected-mode no
requirepass redis-password
```

# Supervisor

Supervisor 是用Python开发的一套通用的进程管理程序，能将一个普通的命令行进程变为后台daemon，并监控进程状态，异常退出时能自动重启

## 安装

```bash
sudo pacman -S supervisor
```

配置文件：`/etc/supervisor` 

## supervisorctl 操作

查看状态

```bash
supervisorctl reread|update|status
```

启动关闭程序

```bash
supervisorctl start|restart|stop program_name
```

查看日志

```bash
supervisorctl tail -f program_name (queue:queue_00)
```

## 开启网页访问

```bash
vim /etc/supervisord.conf
```

```
[inet_http_server]
port=0.0.0.0:9001
username=root 
password=123456
```

重新加载配置

```bash
supervisorctl reload
```

## laravel的任务管理

在主配置文件中添加一个

```bash
# sudo vim /etc/supervisor/supervisord.conf

[include]
files = /etc/supervisor/task/*.ini
```

创建两个目录

```bash
cd /etc/supervisor/

sudo mkdir -p task logs

# 授权
sudo chmod -R 755 task logs
```

配置 针对 laravel 的管理: `/etc/supervisor/task/laravel.ini`

```
touch /etc/supervisor/task/laravel.ini
```

```ini
[program:消息队列]
command=php artisan queue:work
directory=/www/wwwroot/deepin-night-admin # 项目根目录
autorestart=true
startsecs=3
startretries=3
stdout_logfile=/etc/supervisor/logs/消息队列.out.log
stderr_logfile=/etc/supervisor/logs/消息队列.err.log
stdout_logfile_maxbytes=2MB
stderr_logfile_maxbytes=2MB
user=orangbus
priority=999
numprocs=10 # 进程数
process_name=%(program_name)s_%(process_num)02d
```

```ini
[program:任务调度]
command=php artisan schedule:work
directory=/www/wwwroot/deepin-night-admin
autorestart=true
startsecs=3
startretries=3
stdout_logfile=/www/server/panel/plugin/supervisor/log/任务调度.out.log
stderr_logfile=/www/server/panel/plugin/supervisor/log/任务调度.err.log
stdout_logfile_maxbytes=2MB
stderr_logfile_maxbytes=2MB
user=orangbus
priority=999
numprocs=1
process_name=%(program_name)s_%(process_num)02d
```

重启

```bash
sudo systemctl restart  supervisord
```



# navicat16 无限试用

到期后删除这个文件即可

```bash
rm -rf ./.config/navicat/Premium/
```

