# redis学习基本



## 安装redis



## 启动redis



## 远程链接redis

修改Redis配置文件**/etc/redis/redis.conf**，找到**bind**那行配置：

```
# bind 127.0.0.1
# 去掉#注释并改为：
bind 0.0.0.0
```

设置密码

```
requirepass youpassword
```

指定配置文件然后重启Redis服务即可：

```
sudo redis-server /etc/redis/redis.conf
```

配置好Redis服务并重启服务后。就可以使用客户端远程连接Redis服务了。命令格式如下：

```
redis-cli -h {redis_host} -p {redis_port} -a {requirepass}
```

其中{redis_host}就是远程的Redis服务所在服务器地址，{redis_port}就是Redis服务端口（Redis默认端口是6379）。例如：

```
$ redis-cli -h 120.120.10.10 -p 6379
redis>ping
PONG
```

 先登陆后验证：

  ```
  redis-cli -p 6379
  redis 127.0.0.1:6379> auth test123
  OK
  ```

