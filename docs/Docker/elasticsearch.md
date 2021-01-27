## elasticsearch

> 版本要一致

安装：

```bash
sudo pacman -S elasticsearch
```

## 跨域处理

```bash
sudo -i
cd /etc/elasticsearch
vim elasticsearch.yml
```

添加

```yaml
http.cors.enabled: true
http.cors.allow-origin: "*"
```

启动,默认地址9200

```bash
sudo systemctl start elasticsreach
```

安装可视化工具：elasticsearch-head



安装kibana





## 插件

下载插件放到`elasticsreach` 的`plugin` 文件夹即可

## ik分词器

```json
GET _analyze

{
    "analyzer":"user",
    "text": "orange"
}
```

