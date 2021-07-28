---
title: k8s入门学习笔记
---

```bash
minikube start --vm-driver=virtualbox --image-mirror-country=cn --registry-mirror=https://reg-mirror.qiniu.com
## or

```

metadata.name = nginx-pod

```bash
kubectl expose pods nginx-pod --type=NodePort 
```

访问： node_ip + expose_port

## labels

- 设置labels

  ```bash
  kubectl label nodes minikube env=orangbus
  ```

- 删除lables

  ```bash
  kubectl label nodes minikube env-
  ```

- 查看lables

  ```bash
  kubectl get nodes --show-labels
  ```

## roles

- 设置

  ```bash
  kubectl label nodes minikube node-role.kubernetes.io/master=
  
  kubectl label nodes minikube node-role.kubernetes.io/worker=
  ```

## pod



### 创建一个Pod

