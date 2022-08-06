---
title: Python
---

# Python源码安装

## 下载python



```
yum install libffi-devel zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gcc make
```

解压

```
tar -zxvf python.tar
```

编译

```
./configure --prefix=/usr/local/python

make -j 2


```

环境变量配置