---
title: Dockerfile
---

Dockerfile

- from
- label
- run 执行命令并创建新的image layer
- workdir 除了设置文件目录
- add 添加并解压
- copy 复制文件
- env
- volume
- network
- cmd 设置容器**启动后**执行的命令
- entrypoint 设置同期**启动时**运行的命令



```dockerfile
FROM centos
LABEL author=orangbus
RUN yum install -y vim
WORKDIR /home/Code
ENV PHP_VERSION 7.4
RUN yum install -y mysql-server="${PHP_VERSION}"
```

**shell:** entrypoint echo $name

**exec:**  entrypoint ["/bin/bash","-c","echo $name"]



删除退出的容器

```
docker rm $(docker ps -qa)
```

```
## emby 
EMBY_IMAGE=emby/embyserver
EMBY_HTTP_PORT=8085
EMBY_HTTPS_PORT=8086
EMBY_CONFIG_PATH=./emby/config
EMBY_SHAREDIR_PATH=./emby/gd

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
      - ${EMBY_SHAREDIR_PATH}:/mnt/gd
```

