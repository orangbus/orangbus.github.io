#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# git add .
# git commit -m " update:`date` "
# git push https://gitee.com/orangbus/vuePress.git master

# echo "备份成功！"

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
echo 'www.doc.orangbus.cn' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:orangbus/orangbus.github.io.git master
git push https://github.com/orangbus/orangbus.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -