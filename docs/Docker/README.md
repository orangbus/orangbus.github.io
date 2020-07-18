## minikube



## 安装

minikube

```bash
sudo pacman -S nimikube
```

## 启动

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

### node



### pod



### service

- 将一个pod暴露到公网IP上

  ```bash
  kubectl expose pods nginx-pod --type=NodePort #metadata.name = nginx-pod
  ```

  访问：node_Ip:expose_Ip  //http://192.168.99.105:30696

