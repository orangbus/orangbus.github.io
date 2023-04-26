---
title: Kibana
---

# 源码安装：8.6.2

[https://www.elastic.co/guide/en/kibana/8.6/rpm.html](https://www.elastic.co/guide/en/kibana/8.6/rpm.html) 

```bash
sudo rpm --import https://artifacts.elastic.co/GPG-KEY-elasticsearch
```

```bash
# vim /etc/yum.repos.d/kibana.repo

[kibana-8.x]
name=Kibana repository for 8.x packages
baseurl=https://artifacts.elastic.co/packages/8.x/yum
gpgcheck=1
gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
enabled=1
autorefresh=1
type=rpm-md
```

```bash
sudo yum install kibana
```

```bash
sudo /bin/systemctl daemon-reload
sudo /bin/systemctl enable kibana.service

sudo systemctl start|stop|status kibana.service
```

配置文件: `kibana.yml` 

```yml
path.data: /var/lib/kibana
path.logs: /var/log/kibana
```

| Type        | Description                                                  | Default Location            | Setting         |
| ----------- | ------------------------------------------------------------ | --------------------------- | --------------- |
| **home**    | Kibana home directory or `$KIBANA_HOME`                      | `/usr/share/kibana`         |                 |
| **bin**     | Binary scripts including `kibana` to start the Kibana server and `kibana-plugin` to install plugins | `/usr/share/kibana/bin`     |                 |
| **config**  | Configuration files including `kibana.yml`                   | `/etc/kibana`               | `KBN_PATH_CONF` |
| **data**    | The location of the data files written to disk by Kibana and its plugins | `/var/lib/kibana`           | `path.data`     |
| **logs**    | Logs files location                                          | `/var/log/kibana`           | `path.logs`     |
| **plugins** | Plugin files location. Each plugin will be contained in a subdirectory. | `/usr/share/kibana/plugins` |                 |