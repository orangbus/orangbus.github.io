---
title: mysql学习笔记
---



# mysql导入大文件

**修改该目录下my.ini文件中max_allowed_packet**
因为默认max_allowed_packet为1k，如果导入的文件过大。可能会报错。
我们将该值改大一点，我这里设为1G。

```
[mysqld]

max_allowed_packet = 1024M
```

查看设置是否生效

```
show VARIABLES like '%max_allowed_packet%';
```



本地终端连接数据库导入

```bash
mysql -h 192.168.3.1 -uroot -p

use mydb;

set names utf8;

source /path/to/insertTable.sql

====
# 开启事务
start transaciton;

# 引入SQL文件
source xxx.sql

# 成功后提交事务
commit;
```

## mysql优化

### 添加索引

```mysql
CREATE INDEX idx_name on tablename(filed);
CREATE INDEX idx_name_age on user(name,age);

alert table user add index index_email (email);

# 唯一索引（字段值可以为null）
CREATE UNIQUE INDEX index_phone on user (phone);
alert table user add unique (phone);

# 逐渐索引（字段值不能为null）
CREATE PRIMARY KEY INDEX index_phone ON user (phone);
alert table user add primary key (phone);
```

演示

```mysql
SELECT count(1) from tableName;


select * from tableName where user.phone='123456789'

```

查看索引

```mysql
show index from user;
```

删除索引

```mysql
drop index idx_name on jokes;
```

### 注意事项

1. like %keyword    ==索引失效==，使用全表扫描。但可以通过翻转函数+like前模糊查询+建立翻转函数索引=走翻转函数索引，不走全表扫描。
2. like keyword%    ==索引有效==。
3. like %keyword% ==索引失效==，也无法使用反向索引。

可参考：https://www.cnblogs.com/yizhiamumu/p/9055531.html

https://blog.csdn.net/weixin_28973649/article/details/116112874

```mysql
CREATE INDEX idx_id_title on jokes(id,title);

CREATE INDEX idx_id on joke_cates(id);

SELECT count(1) FROM jokes;

SELECT * FROM jokes WHERE id < 1000;

select * from jokes where title like '搞笑%'

EXPLAIN select title from jokes where title like '%搞笑%'
```

# 主从复制

配套仓库地址：[https://gitee.com/orangbus/mysql-cluster](https://gitee.com/orangbus/mysql-cluster) 

简单说就是：同时有两个mysql数据库服务，主服务（master）,从服务（slave），往master中写入的数据，slave会将master写入的数据同步到slave自己的服务器上，所以可以做读写分离的架构。

我的别名配置

```
# vim ~/.zshrc
# ============= Base =============================
alias cls="clear && ls"
alias RM='rm -rf'
alias ll='ls -alh'
# ============== docker ==========================
alias dc='docker-compose'
alias dca='dc up -d nginx phpmyadmin'
alias dcps='docker-compose ps'
alias dcres='docker-compose restart && dcps'
alias dcn='docker-compose restart nginx && dcps'
alias dcd='dc down'
```

## 启动服务

```bash
dc up -d
```

查看是否启动成功

```
dcps
```

![image-20210716160951393](/images/image-20210716160951393.png) 

## 一、主服务配置-master

### 1、master连接测试

```
# 查看master状态
SHOW MASTER STATUS
```

![image-20210716161418042](/images/image-20210716161418042.png) 



获取到这两个信息，slave需要用到

### 2、创建同步用户，并授权

默认会创建一个用户，配置在当前文件的 `.env` 中

```
#授权用户orangbus使用123456密码登录mysql
grant replication slave on *.* to 'orangbus'@'mysql-master' identified by '123456';

# 如果授权失败可以这样
grant replication slave on *.* to 'orangbus'@'%'

#刷新配置
flush privileges;
```

- 需要注意的是，连接的地址是`容器的名称`，因为是在同一台服务器上运行的，如果是多台服务器填写对应的ip地址。
- slave是当前`master服务`的用户，不是slave从服务器的用户，是`slave从服务`用于同步数据的账号。

其它命令

```
#查看二进制日志相关的配置项
show global variables like 'binlog%';

#查看server相关的配置项
show global variables like 'server%';
```

## 二、从服务配置-slave

连接进入从服务器，设置master的相关信息

### 1、slave连接测试

```
#查看slave状态
show slave status;
```

![image-20210716163127323](/images/image-20210716163127323.png) 

### 2、设置与master的关联信息

```
# 1、先停止
stop slave

# 2、建立关联信息
CHANGE MASTER TO
	master_host='mysql-master', # master的容器名称
	master_user='orangbus', # mster的同步账号
	master_password='123456',
	master_port=3306, # 同一台服务器是3306，如果是多台的话，那就是映射的端口（理论来讲）
	master_log_file='binlog.000002', # master步骤1获取
	master_log_pos=156;# master步骤1获取

# 3、启动同步
start slave
```

有时候启动同步会失败，那么可以执行一下重置

```
# 先停止
stop slave

reset slave;
```

![image-20210716163725181](/images/image-20210716163725181.png) 



### 3、查看是否配置成功

```
show slave status
```





# 问题排查

## 1、slave连接失败

![image-20210716163918107](/images/image-20210716163918107.png) 

连接失败我们就去查看一下slave容器的日志：

```
dc logs mysql-slave
```

![image-20210716164130511](/images/image-20210716164130511.png) 

从日志中我们看出，应该是密码错误了，如果你们也遇到这个错误，那就检查一下 master的`端口` `连接密码`

然后在执行 `2-2` 的步骤



## 2、不知道什么错误

![image-20210716165325357](/images/image-20210716165325357.png) 

可能是更改了配置没有生效。

连接测试 master同步的账号是否能正常连接，是在不行，删除缓存数据，重头再来一遍

```
sudo rm -rf data/mysql/*
```

## 3、同步授权失败

> mysql-slave_1   | 2021-07-16T13:32:32.656444Z 17 [ERROR] [MY-010584] [Repl] Slave I/O for channel '': error connecting to master 'orangbus@mysql-master:3306' - retry-time: 60 retries: 2 message: Authentication plugin 'caching_sha2_password' reported error: Authentication requires secure connection. Error_code: MY-002061

```
set global max_connect_errors=1000;

show global variables like '%max_connect_errors%';
```

参考链接：https://blog.csdn.net/wangbin9536/article/details/104150127

## 4、无法查看master状态信息

当我们去查看 `master` 状态的时候，显示为空，查看mysql日志发现

> Warning: World-writable config file '/etc/mysql/my.cnf' is ignored

**可能产生的原因：** my.cnf 权限过高

```bash
sudo chmod 644 my.cnf
```

## 5、踩坑指北

能复制的参数尽量复制，别手敲



备注

```
show slave status;

stop slave

# 2、建立关联信息
CHANGE MASTER TO
	master_host='mysql-master', 
	master_user='slave', 
	master_password='slave666',
	master_port=3306, 
	master_log_file='binlog.000004',
	master_log_pos=156;

start slave
```



```
global
    log         127.0.0.1 local2
    chroot      /var/lib/haproxy
    pidfile     /var/run/haproxy.pid
    maxconn     4000
    user        haproxy
    group       haproxy
    daemon
    stats socket /var/lib/haproxy/stats
defaults
    mode                    http
    log                     global
    option                  httplog
    option                  dontlognull
    option http-server-close
    option forwardfor       except 127.0.0.0/8
    option                  redispatch
    retries                 3
    timeout http-request    10s
    timeout queue           1m
    timeout connect         10s
    timeout client          1m
    timeout server          1m
    timeout http-keep-alive 10s
    timeout check           10s
    maxconn                 3000

frontend webservs
    bind *:788
    acl static path_beg -i /static /images /javascript /stylesheets
    acl static path_end -i .jpg .gif .png .css .js .html
    acl php path_end -i .php
    use_backend static if static
    use_backend dynamic if php
    default_backend dynamic

backend static
    balance roundrobin
    server sta1 192.168.253.128:6080 check maxconn 3000
    server sta2 192.168.253.128:7080 check maxconn 3000

backend dynamic
    balance source
    server dyn 192.168.253.128:7080 check maxconn 1000

```

