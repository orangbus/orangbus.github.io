---
title: pxc宕机重启场景还原及正确的启动方式
---

关于[docker](https://so.csdn.net/so/search?q=docker&spm=1001.2101.3001.7020)搭建pxc集群，节点宕机启动闪退的问题。要从创建启动容器时的配置参数找原因，以下还原一个比较常规的集群创建及场景还原。

*   [场景还原及梳理](#_10)
*   [初始主节点宕机后正确的启动方式](#_77)

操作目的：创建3个pxc容器的集群，并完成宕机重启

* * *

场景还原及梳理
=======

场景还原  
PS：前置条件为已拉取pxc镜像，并修改镜像名为pxc

### 第一步、创建3个卷，对应pxc容器与宿主机的数据映射。v1、v2、v3

```
docker volume create ‐‐name v1
docker volume create ‐‐name v2
docker volume create ‐‐name v3` 
```

### 第二步、分别启动3个容器，pxc1、pxc2、pxc3。端口分别占用是3306、3307、3308。

```
docker run ‐d ‐p 3306:3306 ‐e MYSQL_ROOT_PASSWORD=ddd123456 ‐e CLUSTER_NAME=PXC ‐e XTRABACKUP_PASSWORD=ddd123456 ‐v v1:/var/lib/mysql  ‐‐privileged ‐‐name=pxc1  pxc

docker run ‐d ‐p 3307:3306 ‐e MYSQL_ROOT_PASSWORD=ddd123456 ‐e CLUSTER_NAME=PXC ‐e XTRABACKUP_PASSWORD=ddd123456 ‐e CLUSTER_JOIN=pxc1 ‐v v2:/var/lib/mysql  ‐‐privileged ‐‐name=pxc2 pxc

docker run ‐d ‐p 3308:3306 ‐e MYSQL_ROOT_PASSWORD=ddd123456 ‐e CLUSTER_NAME=PXC ‐e XTRABACKUP_PASSWORD=ddd123456 ‐e CLUSTER_JOIN=pxc1 ‐v v3:/var/lib/mysql  ‐‐privileged ‐‐name=pxc3 pxc`
```

### 第三步、启动成功后执行DML操作，确认同步成功，集群搭建完毕

* * *

以下根据创建的pxc集群做宕机分析及重启操作。

## **场景1：停掉pxc2(或者pxc3)，stop成功后重启**

```
docker stop pxc2
```

确认容器挂掉后重启，使用start 或者restart，结果是可以启动成功的，并且其他节点的数据会同步成功。

```
docker start pxc2
```

结论：pxc1正常运作的情况下 ，pxc2或者pxc3宕机都是可以通过start命令成功重启，并同步增量数据。

## **场景2：停掉pxc1，保持pxc2及pxc3正常运行。stop成功后重启**

```
docker stop pxc1
```

确认容器挂掉后重启，使用start 或者restart，结果是无法重启成功的，启动后会闪退。

```
docker start pxc1
```

结论：pxc1作为启动时的主节点，如果优先其他宕机，无法通过start类命令启动成功 。这是什么原因？网上有一些成功启动的方法，修改v1卷下文件grastate.dat的参数safe_to_bootstrap=1后，可以重启成功， 但是在实际使用中毫无意义 。在实际项目中，因为在pxc1宕机后，pxc2及pxc3必然会继续工作写入数据等做操作。safe_to_bootstrap是pxc集群安全策略的参数：“是否是安全启动节点”。 如果强制修改文件的参数启动后，会发现pxc2及pxc3在pxc1宕机后产生的数据不会同步到pxc1。因为以这种强制方式启动pxc1会直接分裂成第二个集群，与之前搭建的集群不产生任何关系。正确的启动方式后文补充。

## **场景3：停掉pxc1后，再停掉pxc2，保持pxc3正常运行。stop成功后,重启pxc2重启**

```
docker stop pxc1
 docker stop pxc2
```

确认容器挂掉后重启，使用start 或者restart，结果是无法重启成功的，启动后会闪退。

```
docker start pxc2
```

为什么pxc2节点也启动不了？原因是创建pxc2容器的时候，pxc2加入的是以pxc1为主节点的集群，现在pxc1运行不正常，当然pxc2无法启动。 具体代码如下：

```
`容器pxc2创建并启动时命令如下：
docker run ‐d ‐p 3307:3306 ‐e MYSQL_ROOT_PASSWORD=ddd123456 ‐e CLUSTER_NAME=PXC ‐e XTRABACKUP_PASSWORD=ddd123456 ‐e CLUSTER_JOIN=pxc1 ‐v v2:/var/lib/mysql  ‐‐privileged ‐‐name=pxc2 pxc

其中 ‐e CLUSTER_JOIN=pxc1为加入pxc1的集群` 


```

* * *

初始主节点宕机后正确的启动方式
---------------

说明：pxc1宕机后，集群正常运行，会选举出新的主节点。如果修改参数safe_to_bootstrap=1以最开始pxc1为主节点创建启动pxc1的命令那么会分裂新的集群，毫无意义。

解决方案一：  
1、删除v1卷下的grastate.dat文件  
2、删除pxc1容器。  
3、新建pxc1容器，并**加入其它任何一个正常运行的节点**，如pxc2  
4、因为复用v1数据卷，以此方式创建容器，只需在原pxc1宕机前已有的数据与其它节点做增量同步，效率高。

```
docker rm pxc1

docker run ‐d ‐p 3306:3306 ‐e MYSQL_ROOT_PASSWORD=ddd123456 ‐e CLUSTER_NAME=PXC ‐e XTRABACKUP_PASSWORD=ddd123456 ‐e CLUSTER_JOIN=pxc2 ‐v v1:/var/lib/mysql  ‐‐privileged ‐‐name=pxc1 pxc

重点：‐e CLUSTER_JOIN=pxc2` 
```

解决方案二：  
1、创建全新的pxc4节点，形成一个pxc2、pxc3、pxc4的新集群。  
2、新建pxc4容器，端口3009。并**加入其它任何一个正常运行的节点**，如pxc2，做全量数据同步。

```
#创建v4卷
docker volume create ‐‐name v4

docker run ‐d ‐p 3309:3306 ‐e MYSQL_ROOT_PASSWORD=ddd123456 ‐e CLUSTER_NAME=PXC ‐e XTRABACKUP_PASSWORD=ddd123456 ‐e CLUSTER_JOIN=pxc2 ‐v v4:/var/lib/mysql  ‐‐privileged ‐‐name=pxc4 pxc` 

```
