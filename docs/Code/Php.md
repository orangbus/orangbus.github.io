---
title: php常用函数
sidebar: auto
---

# 安装php

**manjaro** 

```bash
sudo pacman -S php
```

**ubuntu | debian**

```bash
sudo apt-get install php
```

**Cnetos**

```bash
sudo yum install php
```

## php扩展安装

**Ubuntu**

```bash
# 使用扩展安装请先安装这两个东西
sudo apt-get install php-pear
sudo apt-get install php-dev
```

**安装php扩展**

```bash
pecl install redis
```

## window安装pecl

**安装步骤**
PECL是 The PHP Extension Community Library 缩写。

- 下载go-pear.phar 到 `d:/tool/go-pear.phar`
- 执行 `php d:/tool/go-pear.phar`
  下载地址：http://pear.php.net/go-pear.phar
  官方文档：https://pear.php.net/manual/en/installation.getting.php

**关键事项**

- 注意事项：第一个一定是选择 local。
- 第一次执行的时候一定要指定 php的路径，输入13弹出对话框选择PHP的目录。
- 之后直接按 Enter 继续。完成！

安装过程：

```bash
D:\pear>php d:/tool/go-pear.phar

Are you installing a system-wide PEAR or a local copy?
(system|local) [system] : local
Please confirm local copy by typing 'yes' : yes

Below is a suggested file layout for your new PEAR installation.  To
change individual locations, type the number in front of the
directory.  Type 'all' to change all of them or simply press Enter to
accept these locations.

 1. Installation base ($prefix)                   : D:\pear
 2. Temporary directory for processing            : D:\pear\tmp
 3. Temporary directory for downloads             : D:\pear\tmp
 4. Binaries directory                            : D:\pear
 5. PHP code directory ($php_dir)                 : D:\pear\pear
 6. Documentation directory                       : D:\pear\docs
 7. Data directory                                : D:\pear\data
 8. User-modifiable configuration files directory : D:\pear\cfg
 9. Public Web Files directory                    : D:\pear\www
10. System manual pages directory                 : D:\pear\man
11. Tests directory                               : D:\pear\tests
12. Name of configuration file                    : D:\pear\pear.ini
13. Path to CLI php.exe                           :

1-13, 'all' or Enter to continue: 13
php.exe (sapi: cli) found.



Below is a suggested file layout for your new PEAR installation.  To
change individual locations, type the number in front of the
directory.  Type 'all' to change all of them or simply press Enter to
accept these locations.

 1. Installation base ($prefix)                   : D:\pear\
 2. Temporary directory for processing            : D:\pear\\tmp
 3. Temporary directory for downloads             : D:\pear\\tmp
 4. Binaries directory                            : D:\pear\
 5. PHP code directory ($php_dir)                 : D:\pear\\pear
 6. Documentation directory                       : D:\pear\\docs
 7. Data directory                                : D:\pear\\data
 8. User-modifiable configuration files directory : D:\pear\\cfg
 9. Public Web Files directory                    : D:\pear\\www
10. System manual pages directory                 : D:\pear\\man
11. Tests directory                               : D:\pear\\tests
12. Name of configuration file                    : D:\pear\\pear.ini
13. Path to CLI php.exe                           : D:\php73\

1-13, 'all' or Enter to continue:
Beginning install...
Configuration written to D:\pear\\pear.ini...
Initialized registry...
Preparing to install...
installing phar://D:/tool/go-pear.phar/PEAR/go-pear-tarballs/Archive_Tar-1.4.7.t
ar...
installing phar://D:/tool/go-pear.phar/PEAR/go-pear-tarballs/Console_Getopt-1.4.
2.tar...
installing phar://D:/tool/go-pear.phar/PEAR/go-pear-tarballs/PEAR-1.10.9.tar...
installing phar://D:/tool/go-pear.phar/PEAR/go-pear-tarballs/Structures_Graph-1.
1.1.tar...
installing phar://D:/tool/go-pear.phar/PEAR/go-pear-tarballs/XML_Util-1.4.3.tar.
..
install ok: channel://pear.php.net/Archive_Tar-1.4.7
install ok: channel://pear.php.net/Console_Getopt-1.4.2
install ok: channel://pear.php.net/Structures_Graph-1.1.1
install ok: channel://pear.php.net/XML_Util-1.4.3
install ok: channel://pear.php.net/PEAR-1.10.9
PEAR: Optional feature webinstaller available (PEAR's web-based installer)
PEAR: Optional feature gtkinstaller available (PEAR's PHP-GTK-based installer)
PEAR: Optional feature gtk2installer available (PEAR's PHP-GTK2-based installer)

PEAR: To install optional features use "pear install pear/PEAR#featurename"

******************************************************************************
WARNING!  The include_path defined in the currently used php.ini does not
contain the PEAR PHP directory you just specified:
<D:\pear\\pear>
If the specified directory is also not in the include_path used by
your scripts, you will have problems getting any PEAR packages working.


Would you like to alter php.ini <D:\PHP73\php.ini>? [Y/n] : Y

php.ini <D:\PHP73\php.ini> include_path updated.

Current include path           : .;C:\php\pear
Configured directory           : D:\pear\\pear
Currently used php.ini (guess) : D:\PHP73\php.ini
Press Enter to continue:

** WARNING! Old version found at C:\Program Files (x86)\Common Files\Oracle\Java
\javapath\pear.bat, please remove it or be sure to use the new d:\pear\\pear.bat
 command

The 'pear' command is now at your service at d:\pear\\pear.bat

** The 'pear' command is not currently in your PATH, so you need to
** use 'd:\pear\\pear.bat' until you have added
** 'D:\pear\' to your PATH environment variable.

Run it without parameters to see the available actions, try 'pear list'
to see what packages are installed, or 'pear help' for help.

For more information about PEAR, see:

  http://pear.php.net/faq.php
  http://pear.php.net/manual/

Thanks for using go-pear!

```



# **php常用函数**

## 字符串处理

[explode()](http://www.5idev.com/p-php_explode_str_split.shtml#explode)：使用一个字符串分割另一个字符串

```php
$str= 'one|two|three|four';

print_r(explode('|',$str));
```

str_split() 将字符串分割为一个数组，成功返回一个数组。

```php
arraystr_split( string string [, int length] )
```

## 文字包含判断

```php
if(strpos("云南省","云南") !== false)
```

## 汉字截取

```php
mb_substr("清华大学",0,2); //清华
```

## 一维数组无限极分类后排序

```php
array_multisort(array_column($list,'sort'),SORT_ASC,$list);
```

## 随机验证码

```php
$pattern='1234567890';
for( $i=0; $i<6; $i++ ) {
	$code_number .= $pattern[mt_rand(0, 9)];
}
```

## php数值处理

- 四舍五入

  ```php
  echo(ceil(0.60); 	// 1
  echo(ceil(-5.1); 	// -5
  ```

- 四舍五入保留小数点位数

  ```php
  echo round(3.4);     // 3 
  echo round(3.5);     // 4 
  echo round(3.6);     // 4 
  echo round(1.95583, 2); // 1.96 
  echo round(5.045, 2);  // 5.05 
  echo round(5.055, 2);  // 5.06 
  ```

- 舍去小数点

  ```php
  echo floor(0.1); 	// 0
  echo floor(1.6); 	// 1
  ```

## fiel_get_contents 请求

```php
// 淘宝ip地址
    protected function HttpIp($ip)
    {
        $query_info = ['ip' => $ip, 'accessKey'=>'alibaba-inc'];
        $context = stream_context_create([
            'http' => array(
                'method' => 'POST',
                'header' => 'Content-type:application/x-www-form-urlencoded',
                'content' => http_build_query($query_info),
                'timeout' => 30
            ),
        ]);
        $httpRes = file_get_contents('http://ip.taobao.com/outGetIpInfo', false, $context);
        return json_decode($httpRes,true);
    }
```

## 生成唯一SN

```php
/**
 * 生成sn 
*/
private function createSn()
{
    $str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $number = substr(microtime(),-4);
    return date('Ymd').substr(str_shuffle($str),10,15).$number;
}
```





# php设计模式

## 单例模式

