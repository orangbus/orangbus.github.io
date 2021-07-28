---
title: Minikube入门教程
---
# minikube

## 安装

minikube

```bash
sudo pacman -S nimikube
```

## 启动

**第一次启动**

```
minikube start --driver=virtualbox /
--registry-mirror=https://registry.docker-cn.com

minikube start --vm-driver=virtualbox /
--image-mirror-country=cn /
--image-repository=registry.cn-hangzhou.aliyuncs.com/google_containers /
--iso-url=https://kubernetes.oss-cn-hangzhou.aliyuncs.com/minikube/iso/minikube-v1.7.3.iso --registry-mirror=https://reg-mirror.qiniu.com

```

- `--vm-driver` 如果不写会自动检测，可选值 virtualbox, vmwarefusion, hyperv, vmware
- `--image-mirror-country` 需要使用的镜像镜像的国家/地区代码。留空以使用全球代码。对于中国大陆用户，请将其设置为 cn。
- `--image-repository `用来拉取 Kubernetes 集群所需镜像的仓库
- `--iso-url `下载 minikube 虚机安装所需的 iso 文件
- `--registry-mirror docker registry `的镜像源，集群安装后拉取镜像加速用，可以使用其它加速器地址

这里的虚机配置对应的选项：
--cpu=2
 --memory='2000mb
--disk-size='20000m'

preloaded-images-k8s-v1-v1.17.3-docker-overlay2.tar.lz4: https://storage.googleapis.com/minikube-preloaded-volume-tarballs/preloaded-images-k8s-v1-v1.17.3-docker-overlay2.tar.lz4

---

**之后启动可以这样就可以**

```bash
minikube start --image-mirror-country=cn --registry-mirror=https://registry.docker-cn.com
## or 
minikube start --vm-driver=virtualbox --image-mirror-country=cn --registry-mirror=https://reg-mirror.qiniu.com
```

## 图形化管理界面

```bash
minikube dashboard
```

### 外网访问

```
minikube dashboard --url
-----
* 正在验证 dashboard 运行情况 ...
* Launching proxy ...
* 正在验证 proxy 运行状况 ...
http://127.0.0.1:40593/api/v1/namespaces/kubernetes-dashboard/services/http:kubernetes-dashboard:/proxy/
```

开启端口访问

```
kubectl proxy --port=40593 --address='0.0.0.0' --accept-hosts='^.*' &
```

访问,假如你的远程ip地址是：192.168.3.10

```
http://192.168.3.10:40593/api/v1/namespaces/kubernetes-dashboard/services/http:kubernetes-dashboard:/proxy/
```

## master、node、pod、service、关系

<img src="https://kuboard.cn/assets/img/module_03_nodes.38f0ef71.svg" style="width:50%;height:50%;" /> <img src="https://kuboard.cn/assets/img/module_04_services.11cdc7bc.svg"  />

master管理node

node中存放pod

pod是一组（相似的）容器

service去关联 pod ，也就是pod和pod之间沟通的桥梁

## node



## pod

进入一个pod

```bash
kubectl exec -it busybox-pod sh
```







## service

- 将一个pod暴露到公网IP上

  ```bash
  kubectl expose pods nginx-pod --type=NodePort #metadata.name = nginx-pod
  ```

  访问：node_Ip:expose_Ip  //http://192.168.99.105:30696 

## Deployments

更新服务

> 当前：nginx:1.0

### 创建

```bash
kubectl create -f deployment-nginx.yml
```

### 查看

```bash
kubectl get deployment

kubectl get deployment -o wide
```

> 升级为：nginx:2.0

```bash
kubectl set image deployment nginx-deployment nginx=nginx:2.0
```

`nginx-deployment` 为 `deployment-nginx.yml` 文件定义的，不是文件名

> 回滚：nginx:1.0

```bash
kubectl rollout undo deployment nginx-deployemnt
```

查看历史回滚记录

```bash
kubectl rollout history deployment nginx-deployment
```

### 暴露端口

```
kubectl expose deployment nginx-deplyment --type=NodePort
```



### 删除

```bash
kubectl delete services nginx-deployment
```



## K8s网络

![image-20210723210018898](/home/orangbus/Nutstore Files/docs/public/images/demo.doc)

## service

![image-20210723211038980](/home/orangbus/Nutstore Files/docs/public/images/image-20210723211038980.png)



## 监控

> 

```bash
curl -L git.io/scope -o /usr/local/bin/scope

sudo chmod +x /usr/local/bin/scope

scope launch ip地址
```























