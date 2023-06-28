## laravel安装需要的扩展

> 环境：ubuntu20.1

```bash
sudo apt-get install php-xml php-gd php-zip
```

```env
SCOUT_QUEUE=true # 使用队列
SCOUT_IDENTIFY=true # 识别用户
SCOUT_DRIVER=meilisearch #meilisearch
 #http://1.14.63.64:7700  http://192.168.3.40:7700
MEILISEARCH_HOST=http://162.14.72.65:7700
MEILISEARCH_KEY=admin666
```

php-fpm 多版本共存 linux主要配置

```nginx
location ~* \.php$ {
        root "/www/wwwroot/nmsc/nmsc-api/public"; // php项目的根目录地址
        fastcgi_buffer_size 64k;
        fastcgi_buffers 4 64k;
        fastcgi_busy_buffers_size 128k;
        fastcgi_temp_file_write_size 256k;
        fastcgi_pass    127.0.0.1:9000; // 指定对应的 php-fpm 端口
        fastcgi_index   index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name; // linux 正确配置
        include fastcgi_params;
}
```

