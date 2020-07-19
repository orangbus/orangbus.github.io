---
title: Linux-Config文件
desc: 下载 ，资源 ， 电脑辅助工具 ， 动态桌面 ， 录屏
keyword: linux基本命令,docker,
date: 2019-06-04 14:56:23
sidebar: auto
---

## 个人linux常规配置



## 个人常用别名 

```bash
# bash: vim ~/.zshrc
# author: OrangBus
# Github: https://github.com/orangbus/tool
# ============= Base =============================
alias cls="clear && ls"
alias RM='rm -rf'
alias ll='ls -alh'
# ============= Git ==============================
alias gi="git init"
alias ga="git add ."
alias gc="git commit -m "
alias gpush="git push"
alias gpull="git pull"
# ============== docker ==========================
alias dc='docker-compose'
alias dca='dc up -d nginx phpmyadmin'
alias dcps='docker-compose ps'
alias dcres='docker-compose restart && dcps'
alias dcn='docker-compose restart nginx && dcps'
alias dcd='dc down'
# ============ Docker Code Dir ===================
alias ld="cd $HOME/Code/laradock"
alias ldca="ld && dca && dcps && cd -"
alias ldps="ld && dcps  && cd -"
alias ldn="ld && dcn && cd -"
alias ldd="ld && dcd && cd -"
alias ldres="ld && dcres && cd -"
alias web="cd $HOME/Code/web"
# ============= zsh-autosuggestions ==============
source ~/.zsh/zsh-autosuggestions/zsh-autosuggestions.zsh
```

## 权限管理

三个用户组，三个用户，每个用户对自己的用户组有755权限，其他组或者用户用户查看权限

- 技术部：technology | tom
- 市场部：operation | tony
- 销售部：market |  marketer

添加用户：

```
user add orangbus
userdel orangbus

```

添加用户组

```
groupadd market
groupdel market

groupmod market

newgrp technology
```

文件权限

```
chgrp -R groupName filename

chmod -R 755 filename


```

## Php-ftp账户管理

