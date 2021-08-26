---
title: php 生成随机数 生成随机字符串的 5 种方法
---

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [segmentfault.com](https://segmentfault.com/a/1190000022718001)

> 5 种方法，任你选择，当然还有很多方法，例如多个字符串进行拼接，最后做 md5 加密或 SHA1 加密，然后返回字符串，这种比较普遍用于 token 验证或签名验证。

有时候我们的项目需要生成随机数，但是又不想那么麻烦，那么我们可以使用下面这 5 种方法生成。

第一种：mt_rand()
-------------

```
<?php
function GetRandStr($length){
    //字符组合
    $str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    $len = strlen($str)-1;
    $randstr = '';
    for ($i=0;$i<$length;$i++) {
        $num=mt_rand(0,$len);
        $randstr .= $str[$num];
    }
    return $randstr;
}

//传入长度
$number = GetRandStr(6);
echo $number;
?>

```

第二种：array_rand() 数组
-------------------

```
<?php
function make_password($length)
{
    // 密码字符集，可任意添加你需要的字符
    $str = array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 
    'i', 'j', 'k', 'l','m', 'n', 'o', 'p', 'q', 'r', 's', 
    't', 'u', 'v', 'w', 'x', 'y','z', 'A', 'B', 'C', 'D', 
    'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L','M', 'N', 'O', 
    'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y','Z', 
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9');
    // 在 $str 中随机取 $length 个数组元素键名
    $keys = array_rand($str, $length); 
    $password = '';
    for($i = 0; $i < $length; $i++)
    {
        // 将 $length 个数组元素连接成字符串
        $password .= $str[$keys[$i]];
    }
    return $password;
}
echo make_password(6);
?>

```

第三种：把字符串打乱，然后返回其中的一小截
---------------------

```
<?php
function getrandstr($length){
    $str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    $randStr = str_shuffle($str);//打乱字符串
    $rands= substr($randStr,0,$length);//substr(string,start,length);返回字符串的一部分
    return $rands;
}
echo getrandstr(6);
?>

```

第四种：返回任意随机数
-----------

```
<?php
//返回1000-9999其中的一个随机数
echo rand(1000,9999);
?>

```

第五种：对时间戳进行 MD5 加密, 截取其中一部分
--------------------------

```
<?php
function token($length){
    $str = md5(time());
    $token = substr($str,5,$length);
    return $token;
}
echo token(6);
?>

```

5 种方法，任你选择，当然还有很多方法，例如多个字符串进行拼接，最后做 md5 加密或 SHA1 加密，然后返回字符串，这种比较普遍用于 token 验证或签名验证。