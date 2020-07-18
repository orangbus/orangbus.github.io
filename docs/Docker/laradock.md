# Laradock扩展应用

.env

```.env
## emby
EMBY_IMAGE=emby/embyserver
EMBY_HTTP_PORT=8085
EMBY_HTTPS_PORT=8086
EMBY_CONFIG_PATH=./emby/config
EMBY_SHAREDIR_PATH=./data
EMBY_CLOUD_PATH=/home/orangbus/Pan:Q
```

docker-compose

```yaml
# emby
    emby:
      container_name: emby
      image: ${EMBY_IMAGE}
      restart: always
      ports:
      - "${EMBY_HTTP_PORT}:8096"
      - "${EMBY_HTTPS_PORT}:8920"
      environment:
        UID: 1000
        GID: 100
        GIDLIST: 100
        DEVICE: /dev/dri:/dev/dri
        RUNTIME: nvidia
      volumes:
      - ${EMBY_CONFIG_PATH}:/config
      - ${EMBY_SHAREDIR_PATH}:/mnt/shareDir
      - ${EMBY_CLOUD_PATH}:/mnt/CloudDrive
```



## rclone 

- 挂载磁盘

  ```
  rclone mount onedrive: /home/orangbus/Code/laradock/emby/data --allow-non-empty & 
  ```

- 取消挂载

  ```bash
  fusermount -qzu /home/orangbus/Code/laradock/emby/data
  ```

  

