> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 http://www.phpernote.com/php-function/535.html

有时候我们需要对字符串进行对比的时候会先对字符串使用 strtolower 将字符串转为小写，但是当遇到字符串中包含中文的情况下，这种情况下会出现问题，中文字符串经过 strtolower 转换后会变为乱码，搜索了一番确定了这为 php 系统函数的一个 bug，但问题还是需要解决，下面经过摸索得出两种解决办法。

（1）第一种是检测字符串中是否包含中文，如果包含中文就不进行小写转换比较了。这里总结了一个函数，判断一个字符串是否是由纯英文，纯中文或者中英文混合组成。

```
/*
*function：检测字符串是否由纯英文，纯中文，中英文混合组成
*param string
*return 1:纯英文;2:纯中文;3:中英文混合
*/
function check_str($str=''){
	if(trim($str)==''){
		return '';
	}
	$m=mb_strlen($str,'utf-8');
	$s=strlen($str);
	if($s==$m){
		return 1;
	}
	if($s%$m==0&&$s%3==0){
		return 2;
	}
	return 3;
}

```

（2）使用 urlencode 将字符串进行编码之后，然后再比较，比第一种方法更全面一些。

具体过程为：

```
strtolower(urlencode($str));

```