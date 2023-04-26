---
title: 收藏linux实用命令
---

# 打包git commit 文件

```shell
# 在需要打包的 commit 上执行：
$ git archive -o changes.zip HEAD $(git diff-tree --no-commit-id --`

解释一下这个命令：
1 `git diff-tree --no-commit-id --name-only -r HEAD`：查看当前 commit 修改的文件列表，-r 表示递归查看子 commit，--no-commit-id 表示不显示 commit id，--name-only 表示只显示文件名。
2. `$(...)`：把上一步的文件列表作为参数传入下一条命令。
3. `git archive -o changes.zip HEAD`：将 Git 仓库中当前 commit 修改的文件打包为 changes.zip 文件。

这样，就可以将指定 commit 中修改的所有文件打包成一个文件了。注意，需要在需要打包的 commit 上执行命令。
```

