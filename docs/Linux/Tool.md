---
title: Linux-Application
desc: SSh远程链接工具、推荐Uinux发行版、扶墙脚本、google上网
keyword: orangbus.cn
date: 2019-06-04 14:56:23
sidebar: auto
---

> <span style="color:red;">更多Linux配置请参考：</span><https://github.com/orangbus/Tool

## 在线工具

php在线调试：<http://php.jsrun.net>

## Linux快捷键

- `Ctrl + r` 搜索匹配历史执行过的命令。

## Linux 如何开放端口和关闭端口

打开端口号

```bash
iptables -A INPUT -ptcp --dport  端口号-j ACCEPT
```

关闭端口号

```bash
iptables -A OUTPUT -p tcp --dport 端口号-j DROP
```

保存设置

```bash
service iptables save
```

## you-get 使用技巧

首先安装pip，更多安装方法参考[菜鸟](https://www.runoob.com/w3cnote/python-pip-install-usage.html)

```
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py   # 下载安装脚本
sudo python3 get-pip.py    # 运行安装脚本。
```

部分 Linux 发行版可直接用包管理器安装 pip，如 Debian 和 Ubuntu：

```
sudo apt-get install python3-pip
# 测试
pip3 -v
```

安装 You-get

```
pip3 install you-get
```

### 如何下载bilibili视频,并指定清晰度

下载单个视频 (直接跟上视频的地址就可以)

```bash
you-get https://www.bilibili.com/video/BV1xxxxxx
```

批量下载一个专辑，比如一门课程有99+集视频，那么我们可以这样

```bash
you-get -l https://www.bilibili.com/video/BV1xxxxxxx //可能下载不了
```

有的小伙伴可能执行上面的命令并不能下载，这时候我们需要审查网页源码，找到已 <span style="color:red;">avxxxxx</span> 结尾的链接才能下载。

在当前视频播放页面【右键】【查看网页源码】，搜索 【av】 , 在meta头里面有个链接是这样的 **content="https://www.bilibili.com/video/av2002xxxx/"** 的，这时候我们就可以复制这个链接下载了

```bash
you-get -l https://www.bilibili.com/video/av2002xxxx
```

如何指定清晰度

首先我们先查看视频信息

```
you-get -i https://www.bilibili.com/video/BV1xxxxxx
----- 我们会看到一下信息 ------
streams:             # Available quality and codecs
    [ DASH ] ____________________________________
    - format:        dash-flv
      container:     mp4
      quality:       高清 1080P
      size:          214.9 MiB (225387178 bytes)
    # download-with: you-get --format=dash-flv [URL] //-----> 这里也是有下载提示的哦

    - format:        dash-flv720
      container:     mp4
      quality:       高清 720P
      size:          164.1 MiB (172104993 bytes)
    # download-with: you-get --format=dash-flv720 [URL]

    - format:        dash-flv480
      container:     mp4
      quality:       清晰 480P
      size:          116.1 MiB (121745328 bytes)
    # download-with: you-get --format=dash-flv480 [URL]

    - format:        dash-flv360
      container:     mp4
      quality:       流畅 360P
      size:          57.1 MiB (59885060 bytes)
    # download-with: you-get --format=dash-flv360 [URL]

```

其中这个`format` 就是清晰度参数，那么我们就可这这样进行下载指定清晰度的视频了

```bash
you-get -F dash-flv https://www.bilibili.com/video/BV1xxxxxx
// 批量下载
you-get -l -F dash-flv https://www.bilibili.com/video/avxxxxxx
```

### 如何断点下载

假如我们的下载的视频一共有 100 集，但是 you-get 下载到 50集就停止了，那我们应该怎么从 51集开始下载呢？

其实注意观察的小伙伴可能会发现，当我们点击100集当中的其中一集的时候，bilibili的视频地址变成了这样的

```url
https://www.bilibili.com/video/BVxxxxxx?p=57
```

后面多了一个 `?p=57` ,如果我们需要断点下载的话 <span style="color:red;">（注意视频地址是 avxxxx,不是网页的原地址BV1xxxxxx）</span>

```bash
you-get -l -F dash-flv https://www.bilibili.com/video/avxxxxxx?p=51
```

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

## linux开启ssh连接

- debian

  ```
  sudo vim /etc/ssh/sshd_config
  
  # debian9:修改一下文件
  将#PasswordAuthentication no的注释去掉，并且将no修改为yes
  将#PermitRootLogin prohibit-password的注释去掉，将prohibit-password改为yes
  重启ssh： sudo systemctl restartt sshd
  #================================================
  #debain10
  PermitRootLogin yes
  PasswordAuthention yes
  重启ssh： sudo systemctl restartt sshd
  ```

## 压力测试

> webbench -c 并发数 -t 运行测试时间 URL 【http://www.baidu.com/】

```bash
webbench -c 100 -t 10 http://www.baidu.com/
```

## 测速脚本

```bash
bash <(curl -Lso- https://git.io/superspeed)
```

## 如何快速访问Github

### IP解析

作为一个小白，经常需要访问 `github` 来学习，但是呢经常打不开这个网站，或者clone的时候网速很慢，这个时候==怎么解决呢？==

1、打开这个网站：https://www.ipaddress.com ，输入我们**需要访问**的域名，进行搜索，你会得到一个**ip地址**。

2、修改本地`hosts` 文件直接访问，这样就可以了，

**案例：** 访问 `github.com` 和`raw.githubusercontent.com`  

打开 `https://www.ipaddress.com` 搜索 `github.com` 和`raw.githubusercontent.com`  你会看到一个如下IP地址

![image-20201215110741455](../images/image-20201215110741455.png)

打开本机电脑的 `hosts` 文件，我的电脑是linux，所以我的 `hosts`文件在 (window用户自行百度)

```bash
sudo vim /etc/hosts
```

添加如下配置

```host
140.82.114.4 github.com
199.232.96.133 raw.githubusercontent.com
```

现在打开 `https://github.com` 就可以访问了。

其它国外的网站是不是也可以类似的操作？比如 google? youtube? .........

### Github镜像站

假如以上方法还是很慢，或者不可行，你可以尝试采用下面的方法

> Github: https://github.com/fhefh2015/Fast-GitHub
>
> Google App: https://chrome.google.com/webstore/detail/github%E5%8A%A0%E9%80%9F/mfnkflidjnladnkldfonnaicljppahpg （需要体力爬梯子）

安装完之后你的界面是这样的

![image-20201215111505365](../images/image-20201215111505365.png)

先睹为快：https://github.com.cnpmjs.org/orangbus/tool

### SwitchHosts

> https://github.com/oldj/SwitchHosts/releases

具体怎么使用就查看官网文档吧。

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

## Shell笔记

### 颜色

```bash
#!/usr/bin/env bash
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH

# 设置字体颜色函数
function blue(){
    echo -e "\033[34m\033[01m $1 \033[0m"
}
function green(){
    echo -e "\033[32m\033[01m $1 \033[0m"
}
function greenbg(){
    echo -e "\033[43;42m\033[01m $1 \033[0m"
}
function red(){
    echo -e "\033[31m\033[01m $1 \033[0m"
}
function redbg(){
    echo -e "\033[37;41m\033[01m $1 \033[0m"
}
function yellow(){
    echo -e "\033[33m\033[01m $1 \033[0m"
}
function white(){
    echo -e "\033[37m\033[01m $1 \033[0m"
}
```

### 初始化工具安装

```bash
#工具安装
install_pack() {
    pack_name="基础工具"
    echo "===> Start to install curl"    
    if [ -x "$(command -v yum)" ]; then
        command -v curl > /dev/null || yum install -y curl
    elif [ -x "$(command -v apt)" ]; then
        command -v curl > /dev/null || apt install -y curl
    else
        echo "Package manager is not support this OS. Only support to use yum/apt."
        exit -1
    fi    
}
```

### root权限检测

```bash
[ $(id -u) != "0" ] && { echo "${CFAILURE}Error: You must be root to run this script${CEND}"; exit 1; }
```
