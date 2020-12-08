---
title: Laradock入门
---

# Docker-LNMP

> 
>
> systemOS: debian 8+

校对时间:

```bash
cp  /usr/share/zoneinfo/Asia/ShangHai  /etc/localtime
```

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

```bash
sudo systemctl enable docker 
sudo systemctl start docker

// 重启docker
systemctl daemon-reload
systemctl restart docker
```

有时候pull image 的时候很慢可以添加国内源

```$json
// sudo vim /etc/docker/daemon.json

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

# docker-swarm

```
# master
docker swarm init --advertise-addr 192.168.99.100
rclone mount DriveName:Folder LocalFolder --copy-links --no-gzip-encoding --no-check-certificate --allow-other --allow-non-empty --umask 000
```

# Laradock扩展应用

> 相应文件夹可以到github或者群里获取。

.env

```.env
## httpbin 
HTTPBIN_PORT=8085

## wordPress
WORDPRESS_PORT=8086
WORDPRESS_HTML=./wordpress

## emby 
# bash: mkdir -p emby/config emby/Data emby/Pan
EMBY_IMAGE=emby/embyserver
EMBY_HTTP_PORT=8085
EMBY_HTTPS_PORT=8086
EMBY_CONFIG_PATH=./emby/config
EMBY_SHAREDIR_PATH=./emby/data
EMBY_CLOUD_PATH=/home/orangbus/Pan

## jellyfin
# bash：mkdir -p /home/video && mkdir -p ./jellyfin/config cache
JELLYFIN_IMAGE=jellyfin/jellyfin:latest
JELLYFIN_HTTP_PORT=8096
JELLYFIN_CONFIG=./jellyfin/config
JELLYFIN_CACHE=./jellyfin/cache
JELLYFIN_VIDEO_PATH=/home/video

# nextCloud ############################
# bash: mkdir nextcloud && cd nextcloud && mkdir -p NextCloud Apps Config Data Theme
NEXTCLOUD_PORT=8083
NEXTCLOUD=./nextcloud/NextCloud
NEXTCLOUD_APPS=./nextcloud/Apps
NEXTCLOUD_CONFIG=./nextcloud/Config
NEXTCLOUD_DATA=./nextcloud/Data
NEXTCLOUD_THEME=./nextcloud/Theme

# 百度网盘
BAIDU_PORT=8088
BAIDU_PATH=./baidu/data

# aria2
# bash: mkdir aria2 && mkdir -p Download config
ARIA2_HTTP_PORT=8089
ARIA2_POER1=6800
ARIA2_POER2=16881
ARIA2_SECRET=admin  # 密码
ARIA2_DOWNLOAD_DIR=./aria2/Download
ARIA2_CONFIG=./aria2/config

```

docker-compose

```yaml
# httpin 
    httpbin:
      container_name: httpbin
      image: kennethreitz/httpbin
      ports:
      - 8085:80
      
# wordPress 生产环境请自行修改数据库账号密码
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

# emby
    emby:
      container_name: emby
      image: ${EMBY_IMAGE}
      restart: always
      ports:
      - "${EMBY_HTTP_PORT}:8096"
      - "${EMBY_HTTPS_PORT}:8920"
      environment:
        UID: 1000
        GID: 100
        GIDLIST: 100
        DEVICE: /dev/dri:/dev/dri
        RUNTIME: nvidia
      volumes:
      - ${EMBY_CONFIG_PATH}:/config
      - ${EMBY_SHAREDIR_PATH}:/mnt/shareDir
      - ${EMBY_CLOUD_PATH}:/mnt/CloudDrive

# jellyfin
	jellyfin:
      container_name: jellyfin
      image: jellyfin/jellyfin:${JELLYFIN_IMAGE}
      restart: always
      ports:
      	- "${JELLYFIN_HTTP_PORT}:8096"
      volumes:
      - ${JELLYFIN_CONFIG}:/config
      - ${JELLYFIN_CACHE}:/cache
      - ${JELLYFIN_VIDEO_PATH}:/video

### nextCloud $$$$$$$$$$$$$$$$$$

    nextcloud:
      container_name: nextcloud
      image: nextcloud
      volumes:
        - ${NEXTCLOUD}:/var/www/html
        - ${NEXTCLOUD_APPS}:/var/www/html/custom_apps
        - ${NEXTCLOUD_DATA}:/var/www/html/data
        - ${NEXTCLOUD_CONFIG}:/var/www/html/config
        - ${NEXTCLOUD_THEME}:/var/www/html/themes
      depends_on:
        - nginx
        - php-fpm
        - mysql
      ports:
        - "${NEXTCLOUD_PORT}:80"
      networks:
        - frontend
        - backend

# 百度网盘
    baidu:
      container_name: baidupcs
      image: auska/docker-baidupcs
      volumes:
        - ${BAIDU_PATH}:/root/Download
      environment:
        - PGID=1001
        - PUID=1001
        - TZ=Asia/Shanghai
        - PORT=1999
      ports:
        - "${BAIDU_PORT}:1999"

# aria2
    aria2:
      container_name: aria2
      image: auska/docker-aria2
      volumes:
        - ${ARIA2_DOWNLOAD_DIR}:/mnt/Download
        - ${ARIA2_CONFIG}:/config
      environment:
        - PUID=0
        - PGID=0
        - RPC=6800
        - TZ=Asia/Shanghai
        - SECRET=${ARIA2_SECRET}
      ports:
        - "${ARIA2_HTTP_PORT}:80"
        - "${ARIA2_POER1}:6800"
        - "${ARIA2_POER2}:16881"

```

## 无法从github下载nvm解决办法

容器里面无法下载，那么我们就先下载好放在`workspace` 目录下

```bash
wget http://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh pathTo/laradck/workspace
```

编辑`workspace` 文件夹下面的`dockerfile` 文件

搜索：`COPY ./aliases.sh /home/laradock/aliases.sh` 在下面添加一行

```bash
COPY ./nvm.sh /home/laradock/nvm.sh
```

在`chown laradock:laradock /home/laradock/aliases.sh && \` 下面添加一行

```bash
chown laradock:laradock /home/laradock/nvm.sh && \
```

替换下载地址 `mkdir -p $NVM_DIR && \` 下面替换（大概在677行左右）

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash \
# 替换为
cat /home/laradock/nvm.sh | bash \
```

重新启动一下`workspace` 就可以啦

```bash
docker-compose up -d workspace
```

如果还是不行，那就过几分钟重新再执行上面的命令，多试几次就好了，根据我安装这么多次经验，一般这样就可以安装好了，如果家里网络不是很好的话，建议蹭一下邻居的wifi，不然这玩意真的太难下载了，只要安装好了后面就好升级啥的了。（其实这玩意难安装是因为`workspace` 这个玩意，但是我一般用的是google云或者国外的服务器很快就安装好了）

# Laradock离线安装

有时候家里的网络慢或者各种原因，我们在启动laradock的时候总是会安装失败，其中95%的原因是下载docker镜像导致的，那么今天教大家如果离线安装（不太推荐，但是万不得已可是尝试一下）

> 本机安装了docker , docker-compsoe
>
> 需要一个云主机，最好是国外的，国内的也可以，（我没有怎么办，腾讯云有免费体验15天活动，可以尝试一下，或者加群找群主帮你处理）

流程：

1. 现在云主机上下载并启动laradock
2. 打包已经下载的镜像
3. 下载打包镜像到本地
4. 从本地导入下载的镜像

马上操练起来（假设你已经会基本使用laradock）

## 导出laradock镜像

列出所有进项，

![](./images/image-20201207103646644.png)

```bash
➜  laradock git:(master) ✗ docker images    
laradock_nginx        latest         b7ba928e59d2        3 days ago           27.2MB

```

挨个导出，然后下载到本地

```bash
docker save -o laradock_nginx.tar laradock_nginx
```

此时会在当前目录下生成一个`laradock_nginx.tar` 的文件，

## 导入laradock镜像

```bash
docker load -i laradock_nginx.tar
```

到此就可以直接启用了。

# 错误汇总

> Service 'mysql' failed to build: error pulling image configuration: Get "https://registry-1.docker.io/v2/library/mysql/blobs/sha256:718a6da099d82183c064a964523c0deca80619cb033aadd15854771fe592a480": dial tcp: lookup registry-1.docker.io: no such host

```
sudo echo "servername 8.8.8.8" >> /etc/resolv.conf
```

> ERROR: Service 'phpmyadmin' failed to build: Get "https://registry-1.docker.io/v2/": dial tcp: lookup registry-1.docker.io: no such host

```bash
//第一步：创建daemon.json文件
sudo vim /etc/docker/daemon.json

//第二步：重启docker
sudo systemctl daemon-reload
sudo systemctl restart docker

//第三步：执行docker-compose的时候需要在文件所在目录执行
```

> docker起不来报错：Failed to start Docker Application Container Engine

```
/etc/docker/daemon.json
这个文件的格式不对，或者因为防火墙原因
```

