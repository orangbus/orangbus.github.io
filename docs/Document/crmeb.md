---
title: laradock 部署crmeb多商户
---



修改配置文件: `.en` 

```
PHP_VERSION=7.3

WORKSPACE_INSTALL_PHPREDIS=true
WORKSPACE_INSTALL_SWOOLE=true
```

修改php版本对应的`php.ini` 文件,我这里已`php7.3为例`

```
extension=php_fileinfo.dll


ARG INSTALL_SWOOLE=true
ARG INSTALL_PHPREDIS=true
```

docker-compose.yaml

```
workspace:
 - port:8324:8324
```





守护进程

```
[program:thinkphp-crmeb-swoole]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/think swoole restart
autostart=true
autorestart=true
numprocs=8
user=laradock
redirect_stderr=true

```

```
[program:thinkphp-crmeb-queue]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/queue:listen --tries=3
autostart=true
autorestart=true
numprocs=8
user=laradock
redirect_stderr=true

```

nginx

```
   location / {
             proxy_pass workspace:8324;
             proxy_http_version 1.1;
             proxy_read_timeout 360s;
             proxy_redirect off;
             proxy_set_header Upgrade $http_upgrade;
             proxy_set_header Connection "upgrade";
             proxy_set_header Host $host;
             proxy_set_header X-Real-IP $remote_addr;
             proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
             proxy_set_header REMOTE-HOST $remote_addr;
             add_header X-Cache $upstream_cache_status;
             #Set Nginx Cache
             add_header Cache-Control no-cache;
             expires 12h;
    }
```

```nginx.conf
     map $http_upgrade $connection_upgrade {
         default upgrade;
         ''      close;
     }
     upstream laravels {
         # Connect IP:Port
         server workspace:1215 weight=5 max_fails=3 fail_timeout=30s;
         keepalive 16;
     }
     server {

         listen 80;
     #    listen [::]:80 ipv6only=on;

         server_name yourdomain.com;
         root /var/www/swoole/public;
         index index.php index.html index.htm;
         error_log /var/www/swoole_error.log;

         location = /index.php {
             # Ensure that there is no such file named "not_exists"
             # in your "public" directory.
             try_files /not_exists @swoole;
         }

         location / {
              try_files $uri $uri/ @swoole;
         }

         location @swoole {
             set $suffix "";

             if ($uri = /index.php) {
                 set $suffix ?$query_string;
             }

             proxy_set_header Host $http_host;
             proxy_set_header Scheme $scheme;
             proxy_set_header SERVER_PORT $server_port;
             proxy_set_header REMOTE_ADDR $remote_addr;
             proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
             proxy_set_header Upgrade $http_upgrade;
             proxy_set_header Connection $connection_upgrade;

             # IF https
             # proxy_set_header HTTPS "on";

             proxy_pass http://laravels$suffix;
         }

         location ~ /\.ht {
             deny all;
         }

         location /.well-known/acme-challenge/ {
             root /var/www/letsencrypt/;
             log_not_found off;
         }
     }
```

```
SWOOLE_HTTP_HOST=workspace SWOOLE_HTTP_DAEMONIZE=true
```

