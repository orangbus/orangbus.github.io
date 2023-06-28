---
title: window 使用技巧
---

# window下如何给git bash添加别名

**方法一：**

```bash
vim /etc/profile
```

在该文件的最后面添加我们的别名

```shell
alias web='cd /d/laragon/www'
alias cls='clear && ls'

# git
alias ga="git add ."
alias gm='git commit -m'
alias gp="git push $1"

# laravel 快捷别名
alias pa='php artisan '
alias pac='pa make:controller '
alias pae='pa make:event '
alias pahm='pa ide-helper:models'
alias pam='pa make:model '
alias pamm='pa migrate'
alias paqc='pa queue:clear'
alias paqw='pa queue:work'
alias pas='pa serve'
alias pat='pa tinker'
alias pats='pa telescope:clear'
alias pacms="pa make:command "
alias php81="/www/server/php/81/bin/php"

alias llw="ls -l | grep "^-" | wc -l"
```

使其生效即可

```bash
source /etc/profile
```

**方法二：**

```bash
cd // 回到home目录
vim .bashrc

=== 添加你自己的别名==
alias web='cd /d/laragon/www'
alias cls='clear && ls'

# git
alias ga="git add ."
alias gm='git commit -m'
alias gp="git push $1"
```

使其生效

```bash
source /etc/profile
```

# window git bash 添加历史命令提示

**方法一：**

​	先按一下 `ctrl + R` 当你在输入命令的时候，他会匹配历史记录

方法二：

# 清理缓存

```bash
npm cache clean --force
npm config set registry https://registry.npm.taobao.org
# npm install -g node-pre-gyp
```

```bash
composer clear-cache
```

```
pip cache purge
```

# 不走代理的配置

```text
*.test;
192.168.*;
127.0.0.1;
locahost;
home.com;
*.home.com
```

# nvm配置镜像源

https://developer.aliyun.com/article/971101

安装的目录下打开settings.txt文件

```bash
node_mirror: https://npm.taobao.org/mirrors/node/ 
npm_mirror: https://npm.taobao.org/mirrors/npm/
```

设置npm为淘宝源

```bash
npm config set registry https://registry.npm.taobao.org
npm config set disturl https://npm.taobao.org/dist
```

查看

```
npm config get registry
```

