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

