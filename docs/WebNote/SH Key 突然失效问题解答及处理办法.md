---
title: SSH Key 突然失效问题解答及处理办法
---

2021年09月26日发布的`OpenSSH 8.8`中移除了对RSA-SHA1的支持

> *   最新的`git for windows 2.33.1`版本已使用`OpenSSH 8.8`
> *   arch和manjaro等发行版的滚动升级比较激进，使用`pacman -Syu`就会升级所有软件到最新版本
> *   此时的表现就是之前还可以正常使用，`pacman -Syu`或升级到`git for windows 2.33.1`之后使用`git pull`就出现`fatal: 无法读取远程仓库`的提示

如果您升级到`OpenSSH 8.8`或以上版本，则使用ssh推拉Gitee代码时会出现校验不通过的问题

> ![输入图片说明](https://images.gitee.com/uploads/images/2021/1014/110518_2fa9dedc_4764813.png "屏幕截图.png")  
> ![输入图片说明](https://images.gitee.com/uploads/images/2021/1014/110856_78e3d7d4_4764813.png "屏幕截图.png")

### [](#%E5%8E%9F%E5%9B%A0)原因

我们使用`golang.org/x/crypto/ssh`来从public key中提取出指纹，以此从Gitee主应用兑换用户信息

而这个库目前（2021-10-12）还没有支持`RSA-SHA2`算法，因此会获取不到指纹，导致用户校验失败

### [](#%E4%B8%B4%E6%97%B6%E8%A7%A3%E5%86%B3)临时解决

下述三种方案任选其一即可

1.  配置OpenSSH服务允许使用`RSA-SHA1`key

> ```
> 在 ~/.ssh/config 加上如下配置
> Host gitee.com 
> HostkeyAlgorithms +ssh-rsa 
> PubkeyAcceptedAlgorithms +ssh-rsa
> ```
> 
> PS：这种方式不需要更换ssh key，推荐`Linux`和`windows git bash`用户使用

2.  换用其他算法生成ssh key

> ```
> ssh-keygen -t ed25519 -C "your@example.email"
> 之后到Gitee重新添加公钥即可
> ```
> 
> PS： 这种方式需要更换ssh key，推荐`windows`用户使用

3.  暂时不要使用`OpenSSH 8.8`及以上版本

### [](#%E7%BB%93%E8%AF%AD)结语

目前golang社区已经关注到了这一情况，且已经在推进对`RSA-SHA2`的支持，[详情](https://github.com/golang/go/issues/37278)

我们会时刻关注相关进展，并在golang支持`RSA-SHA2`后第一时间跟进，感谢您对`Gitee`的支持

### [](#%E5%8F%82%E8%80%83%E8%BF%9E%E6%8E%A5)参考连接

[openssh-release-note-8.8](https://www.openssh.com/txt/release-8.8)

原文地址：[https://gitee.com/help/articles/4352#article-header0](https://gitee.com/help/articles/4352#article-header0) 