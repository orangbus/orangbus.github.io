---
title: Linux有趣的应用
---

# umami - 网站统计 

![image-20230312165458820](./App.assets/image-20230312165458820.png) 

前提，安装 yarn pm2

这里先跳过了，百度手动安装一下

## 1、下载源码

```shell
git clone https://github.com/umami-software/umami.git
cd umami
yarn install
```

## 2、配置数据库链接

```env
# touch .env
DATABASE_URL=mysql://username:mypassword@localhost:3306/mydb
```

## 3、打包

打包之前需要先配置一下数据库链接，因为会自动创建数据表,如果**换了一个环境**，需要重新build一下 

```shell
yarn start
```

## 4、运行

```shell
yarn global add pm2
cd umami
pm2 start yarn --name umami -- start
pm2 startup
pm2 save
```

查看

```
pm2 list
```

![image-20230312165238645](./App.assets/image-20230312165238645.png) 

删除

```shell
pm2  del 0 # 0 => id
```

## docker方式运行

ghcr.io/umami-software/umami:mysql-v2.0.1

```yml
version: '3'
services:
  umami:
    image: docker.umami.dev/umami-software/umami:mysql-latest
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: mysql://umami:password@ip/umami
      DATABASE_TYPE: mysql
      APP_SECRET: orangbus
    restart: always
```

初始账号：admin 

初始密码：umami

# V2raya

```bash
docker run -d \
  --restart=always \
  --privileged \
  --network=host \
  --name v2raya \
  -e V2RAYA_LOG_FILE=/tmp/v2raya.log \
  -v /lib/modules:/lib/modules:ro \
  -v /etc/resolv.conf:/etc/resolv.conf \
  -v /etc/v2raya:/etc/v2raya \
  mzz2017/v2raya
```

# minio



## mc客户端

```
wget https://dl.min.io/client/mc/release/linux-amd64/mc
chmod +x mc
sudo mv mc /usr/local/bin/mc
```

设置一个minio连接

```
mc alias set local http://127.0.0.1:9000 {MINIO_ROOT_USER} {MINIO_ROOT_PASSWORD}
// mc alias set local http://127.0.0.1:9000 admin admin666
mc admin info local
```

添加节点

```
mc config host add audio-s3 http://127.0.0.1:90
```

# cpolar

配置文件路径

```
/usr/local/etc/cpolar/cpolar.yml
```

