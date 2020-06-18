```
title : 微信开发笔记
sidebar: auto
```

### 微信错误处理

- 微信公众号授权登录，提示“redirect_uri 参数错误”

  ![](https://img2018.cnblogs.com/blog/1449188/201905/1449188-20190526110952296-1450592809.jpg)

  **把这里的 "http://" 去掉就可以了。**



id uid



## natapp

```bash
nohup ./natapp -authtoken=2005b202e45ce346 -log=stdout -loglevel=ERROR &
```



## ngrok

```
./ngrok authtoken 4ShUPREAAeEAfXAk3yjyb_2H5VYL8FFG3j2wfbu171q

./ngrok http 80
```

