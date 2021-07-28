---
title: Mycat
---

配套仓库地址：[https://gitee.com/orangbus/mysql-cluster](https://gitee.com/orangbus/mysql-cluster) 

##  jdk8安装

```
export JAVA_HOME=/usr/java/jdk1.8.0_291
export CLASSPATH=$JAVA_HOME/lib/tools.jar:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib
export PATH=$JAVA_HOME/bin:$PATH
```

## mycat读写分离

| 主机         | 端口 | 容器名称        | 角色   |
| ------------ | ---- | --------------- | ------ |
| 192.168.3.14 | 3336 | mycat2_master_1 | master |
| 192.168.3.14 | 3337 | mycat2_slave_1  | slave  |

注意点：

- mycat 授权

  ```bash
  sudo chmod -R 777 mycat
  ```

- 基本的链接信息没有错误

- 启动顺序：master -> slave -> mycat (挨个能连接之后再启动下一个，不然会链接出错)

  ![image-20210727170613097](/images/image-20210727170613097.png) 

## mycat切片

基于 mycat2 来做的

集群1

| 主机         | 端口 | 容器名称        | 角色   |
| ------------ | ---- | --------------- | ------ |
| 192.168.3.14 | 3346 | mycat3_master_1 | master |
| 192.168.3.14 | 3347 | mycat3_slave_1  | slave  |

集群2

| 主机         | 端口 | 容器名称        | 角色   |
| ------------ | ---- | --------------- | ------ |
| 192.168.3.14 | 3348 | mycat3_master_1 | master |
| 192.168.3.14 | 3349 | mycat3_slave_1  | slave  |

### 授权文件

```bash
bash:  ls # 当前文件
config  data  docker-compose.yml  mycat  mycat2  readme.md
```

```bash
sudo chmod -R 777 mycat mycat2
```



### 错误处理

**权限不足** 

>mycat2_1   | Unable to locate any of the following operational binaries:
>mycat2_1   |   /usr/local/mycat/bin/./wrapper-linux-x86-64 (Found but not executable.)
>mycat2_1   |   /usr/local/mycat/bin/./wrapper-linux-x86-32 (Found but not executable.)
>mycat2_1   |   /usr/local/mycat/bin/./wrapper

**解决办法：** 授权mycat整个文件权限

```bash
sudo chmod -R 777 mycat2 

# 删除之前错误的容器
docker-compose rm mycat2

# 重新创建
docker-compose build --no-cache mycat2

docker-compose up -d mycat2 && docker-compose logs -f mycat2 
```

