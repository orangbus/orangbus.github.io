---
title: Linux有趣的应用
---

# umami - 网站统计 

![image-20230312165458820](App.assets/image-20230312165458820.png) 

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

![image-20230312165238645](App.assets/image-20230312165238645.png) 

删除

```shell
pm2  del 0 # 0 => id
```

