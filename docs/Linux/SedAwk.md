---
title: sed awk 使用技巧
---

# sed -操作行

常用选项：
    -n∶使用安静(silent)模式。在一般 sed 的用法中，所有来自 STDIN的资料一般都会被列出到萤幕上。但如果加上 -n 参数后，则只有经过sed 特殊处理的那一行(或者动作)才会被列出来。
    -e∶直接在指令列模式上进行 sed 的动作编辑；
    -f∶直接将 sed 的动作写在一个档案内， -f filename 则可以执行 filename 内的sed 动作；
    -r∶sed 的动作支援的是延伸型正规表示法的语法。(预设是基础正规表示法语法)
    -i∶直接修改读取的档案内容，而不是由萤幕输出。    

常用命令：
    a  ∶新增， a 的后面可以接字串，而这些字串会在新的一行出现(目前的下一行)～
    c  ∶取代， c 的后面可以接字串，这些字串可以取代 n1,n2 之间的行！
    d  ∶删除，因为是删除啊，所以 d 后面通常不接任何咚咚；
     i  ∶插入， i 的后面可以接字串，而这些字串会在新的一行出现(目前的上一行)；
     p ∶列印，亦即将某个选择的资料印出。通常 p 会与参数 sed -n 一起运作～
     s ∶取代，可以直接进行取代的工作哩！通常这个 s 的动作可以搭配正规表示法！例如 1,20s/old/new/g 就是啦！

示例文本: `demo.txt` 

```text
百炼成神-第18集,https://orangbus.com/20230224/kJhbxXiV/index.m3u8
百炼成神-第17集,https://orangbus.com/20230217/t8y1wVnh/index.m3u8
百炼成神-第16集,https://orangbus.com/20230210/ADdcmiCm/index.m3u8
百炼成神-第15集,https://orangbus.com/20230203/pCQ7efrE/index.m3u8
百炼成神-第14集,https://orangbus.com/20230127/a3ujOsMa/index.m3u8
百炼成神-第13集,https://orangbus.com/20230120/RZLigMF8/index.m3u8
百炼成神-第12集,https://orangbus.com/20230113/4bQ6Wwij/index.m3u8
百炼成神-第11集,https://orangbus.com/20230106/Q4kPm44B/index.m3u8
百炼成神-第10集,https://orangbus.com/20221230/H577oW2z/index.m3u8
百炼成神-第09集,https://orangbus.com/20221223/4CrKwhmh/index.m3u8
百炼成神-第08集,https://orangbus.com/20221216/4tYgrN1H/index.m3u8
百炼成神-第07集,https://orangbus.com/20221209/ZE4EtNMb/index.m3u8
百炼成神-第06集,https://orangbus.com/20221202/HHAjdvU8/index.m3u8
百炼成神-第05集,https://orangbus.com/20221125/KBrDJ8tr/index.m3u8
百炼成神-第04集,https://orangbus.com/20221118/MRfT2NKf/index.m3u8
百炼成神-第03集,https://orangbus.com/20221111/za4M7pbp/index.m3u8
百炼成神-第02集,https://orangbus.com/20221104/2X0La90e/index.m3u8
百炼成神-第01集,https://orangbus.com/20221104/nVUX3FQq/index.m3u8
```

## 显示某行

```shell
sed -n '1p' demo.txt  #显示第一行 
sed -n '$p' demo.txt   #显示最后一行
sed -n '1,2p' demo.txt  #显示第一行到第二行
sed -n '2,$p' demo.txt  #显示第二行到最后一行
```

## 查询

查询包括关键字`第01集`所在所有行

```shell
sed -n '/第01集/p' demo.txt
```

## 替换行

替换第一行为 `百炼成神-第19+1集` 

```shell
sed '1c 百炼成神-第19+1集' demo.txt
```

第一行到第二行代替为: `百炼成神-第19+1集` (第一行+第二行 合并为 一行)

```shell
sed '1,2c 百炼成神-第19+1集' demo.txt
```

## 替换一行中的某一部分

显示已经替换了，但是源文件并没有替换，需要加 `-i` 参数会操作源文件替换

```shell
sed 's/要替换的字符串/新的字符串/g'   （要替换的字符串可以用正则表达式）
```

将`百炼成神`替换为`斗罗大陆`

```shell
cat demo.txt | sed 's/百炼成神/斗罗大陆/g'

sed -n '/百炼成神/p' demo.txt | sed 's/百炼成神/斗罗大陆/g'
```

## 替换匹配的字符串

```shell
sed -i '/匹配字符串/s/替换源字符串/替换目标字符串/g' filename
```

```shell
sed -i '/百炼成神/s/百炼成神/斗罗大陆/g' demo.txt

sed -i 's/斗罗大陆/百炼成神/g' demo.txt
```

## 插入

```shell
sed -i '1c orangbus' demo.txt # 第一样插入 orangbus

sed -i '$a orangbus-end' demo.txt # 最后一行插入orangbus-end
```

## 删除某行

```shell
sed '1d' demo.txt
```

# awk - 操作列

**1.命令行方式**

```shell
awk [-F  field-separator]  'commands'  input-file(s)
```

其中，commands 是真正awk命令，[-F域分隔符]是可选的。 input-file(s) 是待处理的文件。
在awk中，文件的每一行中，由域分隔符分开的每一项称为一个域。通常，在不指名-F域分隔符的情况下，默认的域分隔符是空格。

**2.shell脚本方式**

将所有的awk命令插入一个文件，并使awk程序可执行，然后awk命令解释器作为脚本的首行，一遍通过键入脚本名称来调用。
相当于shell脚本首行的：#!/bin/sh
可以换成：#!/bin/awk

**3.将所有的awk命令插入一个单独文件，然后调用**

```shell
awk -f awk-script-file input-file(s)
```

其中，-f选项加载awk-script-file中的awk脚本，input-file(s)跟上面的是一样的。

## 显示最近的呢牢固的5个账号

```bash
last -n 5 | awk  '{print $1}'
```

```bash
orangbus
orangbus
orangbus
orangbus
orangbus
```

## ddns 自动启动

获取容器的id

```shell
docker container ls | grep linkease/ddnsto | awk '{print $1}'
```

`ddns.sh` 脚本

```bash
#!/bin/bash

echo "1、获取容器id中"
container=`docker container ls | grep linkease/ddnsto | awk '{print $1}'`
echo "containerid:" $container

echo "2、停止容器"
docker container stop $container
echo "3、删除容器"
docker container rm $container
echo "4、创建容器"
docker run -d --name=ddnsto --restart always --network host -e TOKEN=ed59d1ee-0a93-451f-9ff5-81f51d72c6ec -e DEVICE_IDX=0   linkease/ddnsto:3.0.0
echo '5、ddns 重新创建成功'
```

# find - 寻找超过100M的文件

删除大于100M的文件删除

```shell
find ./ -type f -size +100M | xargs rm -rf
```

删除小于100M的文件删除

```shell
find ./ -type f -size -100M | xargs rm -rf
```

删除 `.mp3` 结尾的文件

```shell
find ./ -name “*.mp3” |xargs rm -rf   
```





