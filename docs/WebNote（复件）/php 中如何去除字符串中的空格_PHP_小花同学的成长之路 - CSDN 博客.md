> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 https://blog.csdn.net/zzh_meng520/article/details/64129405 1. 使用 php 函数 trim():  

```
 trim($str)

```

可去除字符串两侧的普通空格；  
2. 使用 php 函数 :str_replace():  

```
str_replace(' ','',$str)

```

  
3. 使用 php 函数：strtr():  

```
strtr($str,array(' '=>''))

```

  
4. 使用自己写的封装函数：  

```
function trimall($str)//删除空格
		{
		    $limit=array(" ","　","\t","\n","\r");
		    $rep=array("","","","","");
		    return str_replace($limit,$rep,$str); 
		}
```

  
 5. 使用该正则去掉普通空格：  

```
preg_replace('# #', '', $str)

```

  
6. 使用该正则去掉所有空格包括全角空格：  

```
$str =preg_replace("/\s|　/","",$str);

```