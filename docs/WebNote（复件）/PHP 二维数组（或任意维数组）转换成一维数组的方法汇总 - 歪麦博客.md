> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 https://www.awaimai.com/2064.html

假设有下面一个二维数组：

```
$user = array(
    '0' => array('id' => 100, 'username' => 'a1'),
    '1' => array('id' => 101, 'username' => 'a2'),
    '2' => array('id' => 102, 'username' => 'a3'),
    '3' => array('id' => 103, 'username' => 'a4'),
    '4' => array('id' => 104, 'username' => 'a5'),
);

```

现在要转换成一维数组，有两种情况：

一种是将**指定列**转换成一维数组，这在另一篇文章有总结：[PHP 提取多维数组指定一列的方法大全](http://www.awaimai.com/885.html)。

现在我们重点讲**第二种情况**，就是**把所有的值都转换成一维数组**，而且**键值相同不会被覆盖**，转换后的一维数组是这样的：

```
$result = array(100, 'a1'， 101, 'a2', 102, 'a3', 103, 'a4', 104, 'a5');

```

主要有下面几个方法。

1 array_reduce 函数法
------------------

用 [array_reduce()](http://php.net/manual/zh/function.array-reduce.php) 函数是较为快捷的方法：

```
$result = array_reduce($user, function ($result, $value) {
    return array_merge($result, array_values($value));
}, array())

```

因为`array_merge`函数会把相同字符串键名的数组覆盖合并，所以必须先用`array_value`取出值后再合并。

如果第二维是数字键名，如：

```
$user = array(
    'a' => array(100, 'a1'),
    'b' => array(101, 'a2'),
    'c' => array(102, 'a3'),
    'd' => array(103, 'a4'),
    'e' => array(104, 'a5'),
);

```

那么直接这样就可以了：

```
$result = array_reduce($user, 'array_merge', array())

```

2 array_walk_recursive 函数法
--------------------------

用 [array_walk_recursive()](http://php.net/manual/zh/function.array-walk-recursive.php) 函数就非常灵活，可以把**任意维度的数组转换成一维数组**。

```
$result = [];
array_walk_recursive($user, function($value) use (&$result) {
    array_push($result, $value);
});

```

例如，下面这个多维数组：

```
$user4 = array(
    'a' => array(100, 'a1'),
    'b' => array(101, 'a2'),
    'c' => array(
        'd' => array(102, 'a3'),
        'e' => array(103, 'a4'),
    ),
);

```

用这个方法后就变成：

```
$result = array(100, 'a1'， 101, 'a2', 102, 'a3', 103, 'a4');

```

3 array_map 函数法
---------------

用`array_map`和`array_reduce`函数的方法类似，如下：

```
$result = [];
array_map(function ($value) use (&$result) {
    $result = array_merge($result, array_values($value));
}, $user);

```

只是需要多声明一个空的`$result`数组。

另外，也可以用`array_walk`的方法，和`foreach`循环的方法，原理和上面一样。

**参考地址：**

1.  [Turning multidimensional array into one-dimensional array](http://stackoverflow.com/questions/8611313/turning-multidimensional-array-into-one-dimensional-array)

« [Javascript 和 PHP base64 加密解密实现（支持中文）](https://www.awaimai.com/2061.html) [PHP 正则表达式获取 SQL 语句中的表名](https://www.awaimai.com/2067.html) »