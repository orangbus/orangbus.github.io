```shell
#!/usr/bin/env bash

# 变量输出
#function get_now_date() {
#    echo `date +'%Y-%m-%d %H:%M:%S'`
#}
#function get_yesterday_date() {
#    echo `date -d yesterday +'%Y-%m-%d %H:%M:%S'` # tomorrow
#}
#get_now_date
#get_yesterday_date

# 返回值
function get_return() {
    echo "$@"
}

# 判断某个命令是否存在
#command -v git >/dev/null 2>&1 || { echo >&2 "I require git but it's not installed.  Aborting."; exit 1; }
#type foo >/dev/null 2>&1 || { echo >&2 "I require foo but it's not installed.  Aborting."; exit 1; }
#hash foo 2>/dev/null || { echo >&2 "I require foo but it's not installed.  Aborting."; exit 1; }

#if [ ! `command -v git` ]; then
#    sudo apt-get install git -y
#    echo "git installed"
#  else
#    echo "不存在"
#fi

# 函数传参
#function install_command() {
#    if [ ! `command -v $1` ]; then
#        sudo apt-get install $1
#        echo $1 "安装成功！"
#      else
#          echo $1 "已经安装！"
#    fi
#}
#get_return git wget

# 获取随机字符串
#function get_str() {
#    echo  time | md5sum | cut -c 8-20
#}
#get_str

# 数组
#array=(1 "orangbus" 3 4 5 6)
#echo ${array[@]} # 1 orangbus 3 4 5 6
#echo ${#array[@]} # 6

# 算数运算符
#function sum() {
#    echo `expr $1 + $2`
#}
#sum 10 20

#function get_status() {
#    if [ $1 == $2 ]; then
#        echo "相等"
#      else
#        echo "不相等"
#    fi
#}
#get_status 1 2

# test
#function test_str() {
#    if test $1 == $2
#    then
#        echo "相等"
#        else
#          echo "不相等"
#    fi
#}
#function check_file() {
#    if test -f $1
#    then
#      echo "存在"
#    else
#        echo "不存在"
#    fi
#}
#function check_dir() {
#    if test -d $1
#    then
#      echo "存在"
#    else
#        echo "不存在"
#    fi
#}
#check_dir /etc
#check_file /etc/php.ini

# for
#for item in 1 2 3 4 5 6
#      do
#        echo $1
#    done
#int=1
#while(( $int<=5 ))
#do
#    echo $int
#    let "int++"
#done
clear
echo " "
cat << EOF
1、初始化环境
2、安装软件
Ps：https://doc.orangbus.cn
EOF




```

```
sudo sed -i 's/archive.ubuntu.com/mirrors.aliyun.com/g' /etc/apt/sources.list
```

