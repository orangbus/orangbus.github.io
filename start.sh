#!/usr/bin/env sh

echo "打包文件..."

# 确保脚本抛出遇到的错误
set -e

if [ -d dist ]; then
    echo "存在dist目录，删除dist目录"
    rm -rf dist
fi

# 生成静态文件
yarn run docs:build

# 进入生成的文件夹
mv docs/.vuepress/dist .

echo "打包完成，文件目录："`pwd`"/dist"


