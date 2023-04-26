---
title: window 使用技巧
---

## window下如何给git bash添加别名

**方法一：**

```bash
vim /etc/profile
```

在该文件的最后面添加我们的别名

```
alias web='cd /d/laragon/www'
alias cls='clear && ls'

# git
alias ga="git add ."
alias gm='git commit -m'
alias gp="git push $1"
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

## window git bash 添加历史命令提示

**方法一：**

​	先按一下 `ctrl + R` 当你在输入命令的时候，他会匹配历史记录

方法二：

