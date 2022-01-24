---
title: 构建一个简单nginx+php环境
---

目录结构

```
➜  Study tree
.
├── conf
├── docker-compose.yaml
├── nginx
│   ├── conf
│   │   └── laravel.conf
│   └── html
│       └── index.php
└── web
    └── index.php
```

## index.php

```php
<?php
/**
 * Created by OrangBus
 * User email: orangbus40400@gmail.com
 * website: orangbus.cn
 * blog: doc.orangbus.cn
 * github: github.com/orangbus
 */

echo phpinfo();
```

## nginx.conf

```nginx
server {
    listen       80;
    server_name  localhost;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm index.php;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    location ~ \.php$ {
        fastcgi_pass   php8:9000;
        fastcgi_index  index.php;
        fastcgi_param  SCRIPT_FILENAME  /html$fastcgi_script_name;
        include        fastcgi_params;
    }
}
```

**重点说明** 

```
fastcgi_pass   php8:9000;
```

**php8:** php容器的名称，如果你想配置多个php版本，只需要将php的配置复制一份就可以，填写对应的php容器名称

```yaml
  php8: # php的容器名称
    image: php:8.0-fpm
    restart: always
    volumes:
      - ./nginx/html:/html
--------------------------------
  php74: # 对应的nginx配置文件为：fastcgi_pass   php74:9000;
    image: php:8.0-fpm
    restart: always
    volumes:
      - ./nginx/html:/html
```



```
fastcgi_param  SCRIPT_FILENAME  /html$fastcgi_script_name;
```

<span style='color:red'>**/html** ：php项目映射到 【php 容器的目录】</span>

## docker-compose

```yaml
version: '3.5'
services:
  nginx:
    image: nginx:latest
    restart: always
    ports:
      - 8010:80
    volumes:
      - ./nginx/html/:/usr/share/nginx/html # 注意点一
      - ./nginx/conf/:/etc/nginx/conf.d/
    links:
      - php8

  php8:
    image: php:8.0-fpm
    restart: always
    volumes:
      - ./nginx/html:/html #注意点二
```

注意点一：

**./nginx/html** ：本机你的php项目地址

**/usr/share/nginx/html**： nginx默认的访问地址

注意点二：

**./nginx/html** ：本机你的php项目地址

<span style='color:red'>**/html**： 这里地址是将你本地的php代码映射到php的容器当中，一般是和你nginx配置的地址是一致的</span> 

Tip:请留意两处红色的区域的关联，这样一个简单的nginx+php关联的环境就配置成功了。

## 踩坑指南：

当使用`-link` 时，连接容器的自定义端口将失效，举例

```yaml
version: '3.5'
services:
 php8:
    image: php:8.0-fpm
    restart: always
    volumes:
      - ./nginx/html:/html
    links: # 如果使用 links ,当我们在php程序中填写mysql端口的时候应该是 3306 而不是 3307，但是我们外部是需要用3307端口去连接mysql的
      - mysql
  
  mysql:
    image: mysql:latest
    ports:
      - 3307:3306
     
```

