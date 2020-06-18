---
title: Linux-Application
desc: SSh远程链接工具、推荐Uinux发行版、扶墙脚本、google上网
keyword: orangbus.cn
date: 2019-06-04 14:56:23
sidebar: auto
---

<span style="color:red;">更多Linux配置请参考：</span><https://github.com/orangbus/Tool>

## 通过lrzsz与Linux传文件

安装

```bash
sudo yum install lrzsz
```

上传文件

```bash
rz [回车]
```

下载文件

```bash
sz fileName.txt
```

详细：<https://birdteam.net/4479>

## SSh远程链接工具

FinalShell（推荐）：<http://www.hostbuf.com/>

Terminus（推荐）：<https://github.com/Eugeny/terminus>

Git (必备)：<https://git-scm.com/>

babun：<http://babun.github.io/>

## 压力测试

> webbench -c 并发数 -t 运行测试时间 URL 【http://www.baidu.com/】

```bash
webbench -c 100 -t 10 http://www.baidu.com/
```

## ubuntu install brew

> https://docs.brew.sh/Homebrew-on-Linux

```bash
git clone https://github.com/Homebrew/linuxbrew.git ~/.linuxbrew

vim .bash_profile
# ====================
export PATH="$HOME/.linuxbrew/bin:$PATH"
export MANPATH="$HOME/.linuxbrew/share/man:$MANPATH"
export INFOPATH="$HOME/.linuxbrew/share/info:$INFOPATH"
# ====================

brew update ## run twice 
brew doctor

# test
brew install hello
```

## 推荐Uinux发行版-常用Debian

Manjaro：<https://manjaro.org/>

Deepin：<https://www.deepin.org/>

Ubuntu：<https://www.ubuntu.com/index_kylin>

Centos：<https://www.centos.org/>

## 扶墙脚本

233Blog:https://233blog.com

要求：Ubuntu 16+ / Debian 8+ / CentOS 7+ 系统

推荐使用 Debian 9 系统，脚本会自动启用 BBR 优化。

备注：不推荐使用 Debian 8 系统，因为 Caddy 申请证书可能会出现一些莫名其妙的问题
```bash
bash <(curl -s -L https://git.io/v2ray.sh)
```

