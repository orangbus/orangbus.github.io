---
sidebar: auto
---

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

  