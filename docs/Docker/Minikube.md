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

## master、node、pod、service、关系

<img src="https://kuboard.cn/assets/img/module_03_nodes.38f0ef71.svg" style="width:50%;height:50%;" /> <img src="https://kuboard.cn/assets/img/module_04_services.11cdc7bc.svg"  />

master管理node

node中存放pod

pod是一组（相似的）容器

service去关联 pod ，也就是pod和pod之间沟通的桥梁

## node



## pod



## service

- 将一个pod暴露到公网IP上

  ```bash
  kubectl expose pods nginx-pod --type=NodePort #metadata.name = nginx-pod
  ```

  访问：node_Ip:expose_Ip  //http://192.168.99.105:30696

