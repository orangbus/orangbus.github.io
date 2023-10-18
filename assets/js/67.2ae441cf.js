(window.webpackJsonp=window.webpackJsonp||[]).push([[67],{567:function(e,n,r){"use strict";r.r(n);var t=r(11),a=Object(t.a)({},(function(){var e=this,n=e.$createElement,r=e._self._c||n;return r("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[r("p",[e._v("修改配置文件: "),r("code",[e._v(".en")])]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("PHP_VERSION=7.3\n\nWORKSPACE_INSTALL_PHPREDIS=true\nWORKSPACE_INSTALL_SWOOLE=true\n")])])]),r("p",[e._v("修改php版本对应的"),r("code",[e._v("php.ini")]),e._v(" 文件,我这里已"),r("code",[e._v("php7.3为例")])]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("extension=php_fileinfo.dll\n\n\nARG INSTALL_SWOOLE=true\nARG INSTALL_PHPREDIS=true\n")])])]),r("p",[e._v("docker-compose.yaml")]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("workspace:\n - port:8324:8324\n")])])]),r("p",[e._v("守护进程")]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("[program:thinkphp-crmeb-swoole]\nprocess_name=%(program_name)s_%(process_num)02d\ncommand=php /var/www/think swoole restart\nautostart=true\nautorestart=true\nnumprocs=8\nuser=laradock\nredirect_stderr=true\n\n")])])]),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("[program:thinkphp-crmeb-queue]\nprocess_name=%(program_name)s_%(process_num)02d\ncommand=php /var/www/queue:listen --tries=3\nautostart=true\nautorestart=true\nnumprocs=8\nuser=laradock\nredirect_stderr=true\n\n")])])]),r("p",[e._v("nginx")]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v('   location / {\n             proxy_pass workspace:8324;\n             proxy_http_version 1.1;\n             proxy_read_timeout 360s;\n             proxy_redirect off;\n             proxy_set_header Upgrade $http_upgrade;\n             proxy_set_header Connection "upgrade";\n             proxy_set_header Host $host;\n             proxy_set_header X-Real-IP $remote_addr;\n             proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n             proxy_set_header REMOTE-HOST $remote_addr;\n             add_header X-Cache $upstream_cache_status;\n             #Set Nginx Cache\n             add_header Cache-Control no-cache;\n             expires 12h;\n    }\n')])])]),r("div",{staticClass:"language-nginx.conf extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v('     map $http_upgrade $connection_upgrade {\n         default upgrade;\n         \'\'      close;\n     }\n     upstream laravels {\n         # Connect IP:Port\n         server workspace:1215 weight=5 max_fails=3 fail_timeout=30s;\n         keepalive 16;\n     }\n     server {\n\n         listen 80;\n     #    listen [::]:80 ipv6only=on;\n\n         server_name yourdomain.com;\n         root /var/www/swoole/public;\n         index index.php index.html index.htm;\n         error_log /var/www/swoole_error.log;\n\n         location = /index.php {\n             # Ensure that there is no such file named "not_exists"\n             # in your "public" directory.\n             try_files /not_exists @swoole;\n         }\n\n         location / {\n              try_files $uri $uri/ @swoole;\n         }\n\n         location @swoole {\n             set $suffix "";\n\n             if ($uri = /index.php) {\n                 set $suffix ?$query_string;\n             }\n\n             proxy_set_header Host $http_host;\n             proxy_set_header Scheme $scheme;\n             proxy_set_header SERVER_PORT $server_port;\n             proxy_set_header REMOTE_ADDR $remote_addr;\n             proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n             proxy_set_header Upgrade $http_upgrade;\n             proxy_set_header Connection $connection_upgrade;\n\n             # IF https\n             # proxy_set_header HTTPS "on";\n\n             proxy_pass http://laravels$suffix;\n         }\n\n         location ~ /\\.ht {\n             deny all;\n         }\n\n         location /.well-known/acme-challenge/ {\n             root /var/www/letsencrypt/;\n             log_not_found off;\n         }\n     }\n')])])]),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("SWOOLE_HTTP_HOST=workspace SWOOLE_HTTP_DAEMONIZE=true\n")])])])])}),[],!1,null,null,null);n.default=a.exports}}]);