---
title: pxc集群
---

配套仓库地址：[https://gitee.com/orangbus/mysql-cluster](https://gitee.com/orangbus/mysql-cluster) 

# pxc集群

> https://hub.docker.com/r/perconalab/percona-xtradb-cluster

```
docker pull perconalab/percona-xtradb-cluster
```

重命名

```
docker tag docker.io/perconalab/percona-xtradb-cluster pxc

docker rmi docker.io/perconalab/percona-xtradb-cluster
```

## 3节点的集群

### 创建网段

```bash
docker network create pxc1

docker network inspect pxc1

docker network rm pxc1

//or

docker network create --subnet=127.18.0.0.0/24 pxc
```

## docker卷

```bash
docker volume create --name v1

docker inspect v1

docker volume rm v1
```

### 创建一个容器

```bash
docker run -d -p 3306:3306
-v v1:/var/lib/mysql
-e MYSQL_ROOT_PASSWORD=admin666
-e CLUSTER_NAME=PXC
-e XTRABACKUP_PASSWORD=slave666 # 同步的密码
- privileged
--name=node1
--net=net1
--ip=172.18.0.2 pxc
```



## 创建3节点pxc集群

### 网络

```bash
docker network create pxc
```

### 持久存储卷

```bash
docker volume create --name=v1
docker volume create --name=v2
docker volume create --name=v3
```

### 节点

```bash
docker run -d -p 3306:3306
-v v1:/var/lib/mysql
-e MYSQL_ROOT_PASSWORD=123456
-e CLUSTER_NAME=PXC
-e XTRABACKUP_PASSWORD=123456
- privileged
--name=node1
--net=pxc
--ip=172.18.0.2 pxc

docker run -d -p 3307:3306
-v v2:/var/lib/mysql
-e MYSQL_ROOT_PASSWORD=123456
-e CLUSTER_NAME=PXC
-e XTRABACKUP_PASSWORD=123456
-e CLUSTER_JOIN=node1
- privileged
--name=node2
--net=pxc
--ip=172.18.0.3 pxc


docker run -d -p 3308:3306
-v v3:/var/lib/mysql
-e MYSQL_ROOT_PASSWORD=123456
-e CLUSTER_NAME=PXC
-e XTRABACKUP_PASSWORD=123456
-e CLUSTER_JOIN=node1
- privileged
--name=node3
--net=pxc
--ip=172.18.0.4 pxc

----
docker run -d -p 3306:3306 -v v1:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 -e CLUSTER_NAME=PXC -e XTRABACKUP_PASSWORD=123456 - privileged --name=node1 --net=pxc --ip=172.18.0.2 pxc

------ 实际执行

docker network create --subnet=172.30.0.0/24 pxc

docker run -d -p 3316:3306 -v v1:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 -e CLUSTER_NAME=PXC -e XTRABACKUP_PASSWORD=123456 --privileged --name=node1 --net=pxc --ip=172.30.0.2 pxc

docker run -d -p 3317:3306 -v v2:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 -e CLUSTER_NAME=PXC -e XTRABACKUP_PASSWORD=123456 -e CLUSTER_JOIN=node1 --privileged --name=node2 --net=pxc --ip=172.30.0.3 pxc

docker run -d -p 3318:3306 -v v3:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 -e CLUSTER_NAME=PXC -e XTRABACKUP_PASSWORD=123456 -e CLUSTER_JOIN=node1 --privileged --name=node3 --net=pxc --ip=172.30.0.4 pxc


```

















