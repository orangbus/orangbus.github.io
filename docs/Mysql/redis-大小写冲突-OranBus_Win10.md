# redis集群

## 创建容器

创建网段

```
docker create network redis-net
```

启动容器

```
docker run -it -d --name redis01 -p 6379:6379 --net=redis-net --ip 172.40.0.1 redis bash
```

## 配置Redis集群

配置文件：`/usr/redis/redis.conf` 

```
daemonie yes #后台运行
cluster-enabled yes #开启集群
cluster-config-file nodes.conf #集群配置文件
cluster-node-timeout 15000 #超时
appendonly yes #开启AOF模式
```

启动redis

```
cd /usr/redis/src

./redis-server ../redis.conf
```

