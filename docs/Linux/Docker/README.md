---
title: Docker
date: 2017-09-20 21:22:43
sidebar: auto
---
## Docker-LNMP
- 安装Docker
```$bash
sudo pacman -S docker
```

- 安装Dockercompose
```$bash
curl -L https://github.com/docker/compose/releases/download/1.16.1/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose

chmod +x /usr/local/bin/docker-compose
```
测试安装是否成功：
```
docker -v
docker-compose -version
```
建立 Docker 组加入当前用户：
```$bash
sudo groupadd docker
sudo usermod -aG docker $USER
```
开机启动docker：
```$xslt
sudo systemctl enable docker 
sudo systemctl start docker
```
有时候pull image 的时候很慢可以添加国内源
```$json
{
    "registry-mirrors": [
    "https://kfwkfulq.mirror.aliyuncs.com",
    "https://2lqq34jg.mirror.aliyuncs.com",
    "https://pee6w651.mirror.aliyuncs.com",
    "https://registry.docker-cn.com",
    "http://hub-mirror.c.163.com"
    ]
}
```
- Laradock

Wike: http://laradock.io/

快速开始：克隆Laradock
```$xslt
git clone https://github.com/Laradock/laradock.git
```
自定义配置
```$xslt
cd laradock
cp env-example .env
```
运行容器
```$xslt
docker-compose up -d nginx phpmyadmin workspace 
```
连接数据库
```$xslt
DB_HOST=mysql //记得是：mysql, 不是127.0.0.1
REDIS_HOST=redis
```

Ps: .env 文件是基本的配置文件，大家可以根据自己的需求更改配置，需要注意的是，如果默认安装了mysql:8.0,但是我想安装mysql:5.6怎么办？
```$xslt
vim .env
ESC
:/mysql
```
找到mysql，然后【MYSQL_VERSION=5.6】直接写版本就可以 最后需要build一下，并且删除之前的mysql缓存数据
```$xslt
cd laradock
rm -rf ~/.laradock
docker-compose build mysql
docker-compose up -d nginx mysql phpmyadmin
```

## docker-swarm

```
# master
docker swarm init --advertise-addr 192.168.99.100
rclone mount DriveName:Folder LocalFolder --copy-links --no-gzip-encoding --no-check-certificate --allow-other --allow-non-empty --umask 000
```

# minikube

安装

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

## laradock app

> 相应文件夹可以到github或者群里获取。

目录

```.env
## httpbin 
HTTPBIN_PORT=8085

## wordPress
WORDPRESS_PORT=8086
WORDPRESS_HTML=./wordpress

```

```yaml
### httpin ##########################################################
    httpbin:
      container_name: httpbin
      image: kennethreitz/httpbin
      ports:
      - 8085:80
      
## wordPress 生产环境请自行修改数据库账号密码
    wordpress:
      container_name: wordpress
      image: wordpress
      environment:
        WORDPRESS_DB_HOST: mysql
        WORDPRESS_DB_USER: root
        WORDPRESS_DB_PASSWORD: root
        WORDPRESS_DB_NAME: wordpress
      volumes:
        - ${WORDPRESS_HTML}:/var/www/html
      ports:
      - "${WORDPRESS_PORT}:80"
      depends_on:
        - mysql
        - nginx
        - php-fpm
      networks:
        - frontend
        - backend
```

