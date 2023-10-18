(window.webpackJsonp=window.webpackJsonp||[]).push([[79],{579:function(n,e,s){"use strict";s.r(e);var t=s(11),a=Object(t.a)({},(function(){var n=this,e=n.$createElement,s=n._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[s("h2",{attrs:{id:"系统安装"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#系统安装"}},[n._v("#")]),n._v(" 系统安装")]),n._v(" "),s("p",[n._v("Linux日常")]),n._v(" "),s("p",[n._v("Linux打开当前目录")]),n._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[n._v("nautilus "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[n._v(".")]),n._v("\n\n"),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[n._v("alias")]),n._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[n._v("open")]),s("span",{pre:!0,attrs:{class:"token operator"}},[n._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[n._v('"nautilus"')]),n._v("\n")])])]),s("p",[n._v("laradock多版本共存")]),n._v(" "),s("p",[s("strong",[n._v("前言：")])]),n._v(" "),s("p",[n._v("在实际开发中肯定遇到过项目用不同的laravel版本，服务器也是用不同的php版本")]),n._v(" "),s("p",[n._v("导致本地跑项目的时候会存在php版本不兼容的问题，想着能不能用laradock配置多版本php共存")]),n._v(" "),s("p",[n._v("在网上找了很久没有能直接拿到就用的，不过在其中却得到一些启发")]),n._v(" "),s("p",[s("strong",[n._v("1：进入laradock文件，将php-fpm复制一份为php-fpm56")])]),n._v(" "),s("p",[n._v("PS:这里的php-fpm56是指我要装多一个php5.6版本，后续步骤可根据自己所需进行修改")]),n._v(" "),s("p",[n._v("原本我装的是php7.3的版本，这个是在.evn文件中默认的")]),n._v(" "),s("p",[s("strong",[n._v("2：打开laradock目录下的.docker-composer.yml配置文件")])]),n._v(" "),s("p",[n._v("复制一份原本的PHP-FPM配置信息修改为自己想要的版本")]),n._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[n._v('### PHP-FPM ##############################################\n    php-fpm:\n      build:\n        context: ./php-fpm\n        args:\n          #省略\n      volumes:\n        - ./php-fpm/php${PHP_VERSION}.ini:/usr/local/etc/php/php.ini\n        - ${APP_CODE_PATH_HOST}:${APP_CODE_PATH_CONTAINER}${APP_CODE_CONTAINER_FLAG}\n        - docker-in-docker:/certs/client\n      expose:\n        - "9000"\n      extra_hosts:\n        - "dockerhost:${DOCKER_HOST_IP}"\n      environment:\n        - PHP_IDE_CONFIG=${PHP_IDE_CONFIG}\n        - DOCKER_HOST=tcp://docker-in-docker:2376\n        - DOCKER_TLS_VERIFY=1\n        - DOCKER_TLS_CERTDIR=/certs\n        - DOCKER_CERT_PATH=/certs/client\n        - FAKETIME=${PHP_FPM_FAKETIME}\n      depends_on:\n        - workspace\n      networks:\n        - backend\n      links:\n        - docker-in-docker\n\n\n### PHP-FPM56 ##############################################\n    php-fpm56:\n      build:\n        context: ./php-fpm56  #这里也就是第一部复制的文件\n        args:\n          #省略\n          - LARADOCK_PHP_VERSION=5.6  #这里我们手动指定一个版本,不让build的时候读.env默认的版本\n      volumes:\n        - ./php-fpm/php${PHP_VERSION}.ini:/usr/local/etc/php/php.ini\n        - ${APP_CODE_PATH_HOST}:${APP_CODE_PATH_CONTAINER}${APP_CODE_CONTAINER_FLAG}\n        - docker-in-docker:/certs/client\n      expose:\n        - "9000"\n      extra_hosts:\n        - "dockerhost:${DOCKER_HOST_IP}"\n      environment:\n        - PHP_IDE_CONFIG=${PHP_IDE_CONFIG}\n        - DOCKER_HOST=tcp://docker-in-docker:2376\n        - DOCKER_TLS_VERIFY=1\n        - DOCKER_TLS_CERTDIR=/certs\n        - DOCKER_CERT_PATH=/certs/client\n        - FAKETIME=${PHP_FPM_FAKETIME}\n      depends_on:\n        - workspace\n      networks:\n        - backend\n      links:\n        - docker-in-docker\n')])])]),s("p",[s("strong",[n._v("3：重新启动容器，docker会重新build")])]),n._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[n._v("docker-compose up -d nginx php-fpm56 mysql redis\n")])])]),s("p",[n._v("之前的文章我们知道关联启动的时候会默认帮我们启动php-fpm和workspace容器")]),n._v(" "),s("p",[n._v("这时我们手动再添加一个新增的php-fpm56即可")]),n._v(" "),s("p",[n._v("重新build需要一段时间")]),n._v(" "),s("p",[s("strong",[n._v("4：给不同项目的nginx.conf配置文件指定php版本")])]),n._v(" "),s("p",[n._v("a项目的配置文件")]),n._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[n._v("server {\n\n    listen 80;\n    #listen [::]:80 default_server ipv6only=on;\n\n    # For https\n    # listen 443 ssl default_server;\n    # listen [::]:443 ssl default_server ipv6only=on;\n    # ssl_certificate /etc/nginx/ssl/default.crt;\n    # ssl_certificate_key /etc/nginx/ssl/default.key;\n\n    server_name testa.cc;\n    root /var/www/testa/public;\n    index index.php index.html index.htm;\n\n    location / {\n         try_files $uri $uri/ /index.php$is_args$args;\n    }\n\n    location ~ \\.php$ {\n        try_files $uri /index.php =404;\n        fastcgi_pass php-upstream; #这里是默认的\n        fastcgi_index index.php;\n        fastcgi_buffers 16 16k;\n        fastcgi_buffer_size 32k;\n        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;\n        #fixes timeouts\n        fastcgi_read_timeout 600;\n        include fastcgi_params;\n    }\n\n    location ~ /\\.ht {\n        deny all;\n    }\n\n    location /.well-known/acme-challenge/ {\n        root /var/www/letsencrypt/;\n        log_not_found off;\n    }\n}\n")])])]),s("p",[n._v("b项目的配置文件")]),n._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[n._v("server {\n\n    listen 80;\n    #listen [::]:80 default_server ipv6only=on;\n\n    # For https\n    # listen 443 ssl default_server;\n    # listen [::]:443 ssl default_server ipv6only=on;\n    # ssl_certificate /etc/nginx/ssl/default.crt;\n    # ssl_certificate_key /etc/nginx/ssl/default.key;\n\n    server_name testb.cc;\n    root /var/www/testb/public;\n    index index.php index.html index.htm;\n\n    location / {\n         try_files $uri $uri/ /index.php$is_args$args;\n    }\n\n    location ~ \\.php$ {\n        try_files $uri /index.php =404;\n        fastcgi_pass php-fpm56:9000;  #在这里我们指定使用5.6版本\n        fastcgi_index index.php;\n        fastcgi_buffers 16 16k;\n        fastcgi_buffer_size 32k;\n        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;\n        #fixes timeouts\n        fastcgi_read_timeout 600;\n        include fastcgi_params;\n    }\n\n    location ~ /\\.ht {\n        deny all;\n    }\n\n    location /.well-known/acme-challenge/ {\n        root /var/www/letsencrypt/;\n        log_not_found off;\n    }\n}\n")])])]),s("p",[n._v("配置完成后重启nginx容器即可")]),n._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[n._v("docker-compose restart nginx\n")])])])])}),[],!1,null,null,null);e.default=a.exports}}]);