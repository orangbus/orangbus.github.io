#!/user/bin/env sh

set -e

git add .
git commit -m " update:`date` "
git push https://gitee.com/orangbus/vuePress.git master

echo "备份成功！"
