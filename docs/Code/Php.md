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

http://pecl.php.net/package/redis

```bash
pecl install redis
```

## linux安装redis扩展

可能缺少的工具

```bash
// phpize
sudo pacman -S php-dev
sudo pacman -S autoconf
```

下载 `phpredis` 源码包，解压，编译安装

```bash
wget https://github.com/phpredis/phpredis/archive/5.3.3.tar.gz
cd  phpredis-5.3.3
phpize
./configure
make && make install //可能需要加 sudo
```

开启扩展

```bash
sudo vim /etc/php/php.ini
```

```
// 添加
extension="redis.so"
```

测试

```bash
php -m
```

## 安装sqlite3扩展

首先编辑或者添加sqlite

```
// sudo vim /etc/php/php.ini
extension=sqlite3
extension=pdo_sqlite
```

安装

```bash
sudo pacman -S php-sqlite
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

# 生成惟一数字字符串

```php
function getUniqNumId(){
	//获取uniqid()生成的字符串的后八位（包含字母）, 而且处理成ASCII 码值数组
	$tmp = array_map('ord', str_split(substr(uniqid(), 7, 13)));

	//将数组处理成数值字符串，并获取前8位（由于长度不定）
	$tmp = substr(implode(null, $tmp), 0, 8);

	//前面添加日期
	$tmp = date('Ymd') . $tmp;

	//返回
	return $tmp;
}
// 2022012050975698
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

## php请求封装

```php
<?php
/**
 * HttpCurl Curl模拟Http工具类
 * @author OrangBus
 * @blog https://doc.orangbus.cn
 */
namespace app\admin\extend;

class HttpCurl {
    private $ch = null; // curl handle
    private $headers = array();// request header
    private $proxy = null; // http proxy
    private $timeout = 5;    // connnect timeout
    private $httpParams = null;

    public function __construct()
    {
        $this->ch = curl_init();
    }

    /**
     * 设置http header
     * @param $header
     * @return $this
     */
    public function setHeader($header) {
        if(is_array($header)) {
            curl_setopt($this->ch, CURLOPT_HTTPHEADER, $header);
        }
        return $this;
    }

    /**
     * 设置http 超时
     * @param int $time
     * @return $this
     */
    public function setTimeout($time) {
        // 不能小于等于0
        if($time <= 0) $time = 5;
        //只需要设置一个秒的数量就可以
        curl_setopt($this->ch, CURLOPT_TIMEOUT, $time);
        return $this;
    }


    /**
     * 设置http 代理
     * @param string $proxy
     * @return $this
     */
    public function setProxy($proxy) {
        if($proxy) curl_setopt ($this->ch, CURLOPT_PROXY, $proxy);
        return $this;
    }

    /**
     * 设置http 代理端口
     * @param int $port
     * @return $this
     */
    public function setProxyPort($port) {
        if(is_int($port)) curl_setopt($this->ch, CURLOPT_PROXYPORT, $port);
        return $this;
    }

    /**
     * 设置来源页面
     * @param string $referer
     * @return $this
     */
    public function setReferer($referer = ""){
        if (!empty($referer)) curl_setopt($this->ch, CURLOPT_REFERER , $referer);
        return $this;
    }

    /**
     * 设置用户代理
     * @param string $agent
     * @return $this
     */
    public function setUserAgent($agent = "") {
        if ($agent) {
            // 模拟用户使用的浏览器
            curl_setopt($this->ch, CURLOPT_USERAGENT, $agent);
        }
        return $this;
    }

    /**
     * http响应中是否显示header，1表示显示
     * @param $show
     * @return $this
     */
    public function showResponseHeader($show) {
        curl_setopt($this->ch, CURLOPT_HEADER, $show);
        return $this;
    }


    /**
     * 设置http请求的参数,get或post
     * @param array $params
     * @return $this
     */
    public function setParams($params) {
        $this->httpParams = $params;
        return $this;
    }

    /**
     * 设置证书路径
     * @param $file
     */
    public function setCainfo($file) {
        curl_setopt($this->ch, CURLOPT_CAINFO, $file);
    }

    /**
     * 模拟GET请求
     * @param string $url
     * @param string $dataType
     * @return bool|mixed
     */
    public function get($url, $dataType = 'text') {
        if(stripos($url, 'https://') !== FALSE) {
            curl_setopt($this->ch, CURLOPT_SSL_VERIFYPEER, FALSE);
            curl_setopt($this->ch, CURLOPT_SSL_VERIFYHOST, FALSE);
            curl_setopt($this->ch, CURLOPT_SSLVERSION, 1);
        }
        // 设置get参数
        if(!empty($this->httpParams) && is_array($this->httpParams)) {
            if(strpos($url, '?') !== false) {
                $url .= http_build_query($this->httpParams);
            } else {
                $url .= '?' . http_build_query($this->httpParams);
            }
        }
        // end 设置get参数
        curl_setopt($this->ch, CURLOPT_URL, $url);
        curl_setopt($this->ch, CURLOPT_RETURNTRANSFER, 1 );
        $content = curl_exec($this->ch);
        $status = curl_getinfo($this->ch);
        curl_close($this->ch);
        if (isset($status['http_code']) && $status['http_code'] == 200) {
            if ($dataType == 'json') {
                $content = json_decode($content, true);
            }
            return $content;
        } else {
            return FALSE;
        }
    }

    /**
     * 模拟POST请求
     *
     * @param string $url
     * @param array $fields
     * @param string $dataType
     * @return mixed
     *
     * HttpCurl::post('http://api.example.com/?a=123', array('abc'=>'123', 'efg'=>'567'), 'json');
     * HttpCurl::post('http://api.example.com/', '这是post原始内容', 'json');
     * 文件post上传
     * HttpCurl::post('http://api.example.com/', array('abc'=>'123', 'file1'=>'@/data/1.jpg'), 'json');
     */
    public function post($url, $dataType='json') {
        if(stripos($url, 'https://') !== FALSE) {
            curl_setopt($this->ch, CURLOPT_SSL_VERIFYPEER, FALSE);
            curl_setopt($this->ch, CURLOPT_SSL_VERIFYHOST, FALSE);
            curl_setopt($this->ch, CURLOPT_SSLVERSION, 1);
        }
        curl_setopt($this->ch, CURLOPT_URL, $url);
        // 设置post body
        if(!empty($this->httpParams)) {
            if(is_array($this->httpParams)) {
                curl_setopt($this->ch, CURLOPT_POSTFIELDS, http_build_query($this->httpParams));
            } else if(is_string($this->httpParams)) {
                curl_setopt($this->ch, CURLOPT_POSTFIELDS, $this->httpParams);
            }
        }
        // end 设置post body
        curl_setopt($this->ch, CURLOPT_RETURNTRANSFER, 1 );
        curl_setopt($this->ch, CURLOPT_POST, true);
        $content = curl_exec($this->ch);
        $status = curl_getinfo($this->ch);
        curl_close($this->ch);
        if (isset($status['http_code']) && $status['http_code'] == 200) {
            if ($dataType == 'json') return json_decode($content, true);
        } else {
            return FALSE;
        }
    }
}
```

### 案例

```php
<?php

use app\admin\extend\HttpCurl;

class Test
{
	public function(){
		$http = new HttpCurl();
        $header = array("Content-type:application/json;charset=utf-8","Accept:application/json");
        $requestData = ["user" => "orangbus.cn"];
        $response = $http->setHeader($header)->setParams(json_encode($requestData))->post("https://httpbin.org/post");
        return $response;
	}
}
```

## 数值转化技巧

> 场景，当我们从excel导入数据到数据库中时，可能会遇到将同一个类型的名称转换为数值代替，但是查询的时候又希望通过数值转化为名称。

当我有这样一个数组，想要插入到数据库中

```php
$data = [
    ["name":"orangbus","sex": "男"],
    ["name":"orangbus.cn","sex": "女"],
];
```

但是我希望存储的格式是这样的

| id   | name        | sex  |
| ---- | ----------- | ---- |
| 1    | orangbus    | 1    |
| 2    | orangbus.cn | 2    |

但是查询出来还是

```
$data = [
    {"name":"orangbus","sex": "男"},
    {"name":"orangbus.cn","sex": "女"},
];
```

### 方法：

array_search : 返回值

array_flip：数组键值翻转

```php
/**
     *  * 性别转换
     * @param $sex name|code
     * @param int $type
     * @return false|int|string
     */
protected function transformSex($sex,$type=1){
    $list = [
        '1' => "男",
        "2" => "女"
    ];
    if ($type != 1) $list = array_flip($list);
    return array_search($sex,$list);
}
```

## php使用正则：preg_match

提取文件名：530126100000000x_one.jpg

```php
$str = "/var/www/pathTo/public/ticket/card/530126100000000x_one.jpg";

preg_match('/(\d+[a-zA-Z]).*.g/i',$str,$res);
print_r($res[0]);
```

## php数组传给js使用

有时候我们需要传递一个php array给前端的js使用，可以怎么处理呢？

```php
$array = [
    "name" => "orangbus",
    "age" => 18,
    "weight" => 180
];
// 我们在返回的时候将数组转换为字符串
$response_str = implode(",",$array);
```

前端再讲字符串转array使用

```javascript
let str = '<?php echo implode(",",$response_str); ?>';
let str_to_array = str.split(",");
```

##  内容过滤

```php
public function filterScript(string $content="")
    {
     $content =preg_replace('/<script[\s\S]*?<\/script>/i', '', $content);
        return  preg_replace( "@<(.*?)>@is", "", $content );
    
    	// or
        $content = preg_replace( "@<script(.*?)</script>\\n@is", "", $content );
        $content = preg_replace( "@<iframe(.*?)</iframe>\\n@is", "", $content );
        $content = preg_replace( "@<style(.*?)</style>\\n@is", "", $content );
        $content = preg_replace( "@<(.*?)>@is", "", $content );
        //# 代表换行
        $content =str_replace("#","<br>",$content);
        return $content;
    }
```



# 函数工具

## Check

```php
<?php
    
 trait Check{
    /**
     * 检查手机号格式
     * @param string $phone
     * @return bool|string[]
     */
    public function phone(string $phone){
        $check = '/^(1(([35789][0-9])|(47)))\d{8}$/';
        if (preg_match($check, $phone)) return true;
        return ["msg" => "手机号码格式不对！"];
    }
}
```

## 【PHP】代码规范检查工具PHPCS

- PHP代码规范有[PSRs](http://www.php-fig.org/psr/)，为了能做到代码规范的自动化检查和修复，就需要用到PHPCS了。

- 项目官网：https://github.com/squizlabs/PHP_CodeSniffer

- PHPCS安装

- ```bash
  curl -OL https://squizlabs.github.io/PHP_CodeSniffer/phpcs.phar
  php phpcs.phar -h
  curl -OL https://squizlabs.github.io/PHP_CodeSniffer/phpcbf.phar
  php phpcbf.phar -h
  // 也许需要 sudo
  sudo mv phpcs.phar /usr/bin/phpcs
  sudo mv phpcbf.phar /usr/bin/phpcbf
  sudo chmod +x /usr/bin/phpcs
  sudo chmod +x /usr/bin/phpcbf
  ```

- 

- 常用命令

- - 检查单个文件：phpcs /path/to/code
  - 检查目录下的文件：phpcs /path/to/code/
  - 查看已经安装的标准：phpcs -i
  - 设置默认检查标准：phpcs --config-set default_standard /path/to/standard_file
  - 查看配置：phpcs --config-show
  - 指定报告格式：phpcs --report=summary /path/to/code ；可用的报告格式有full, xml, checkstyle, csv, json, emacs, source, summary, diff, svnblame, gitblame, hgblame, notifysend，默认为full
  - 查看帮助：phpcs -h
  - 自动修复：phpcbf /path/to/code
  - 详细的使用说明见[官方wiki](https://github.com/squizlabs/PHP_CodeSniffer/wiki) 

# 进制转换

## 二进制转十六进制

```php
$str = bin2hex('orangbus.cn');
```



# 随机字符串

```php
/**
* 随机字符换
*/
protected function randStr($length=6) {
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
```







# 文件操作

## 复制文件：copy

> copy(源文件，目标文件);

```php
copy("/temp/avatar.png","/home/code/avatar.png");
```

tip: 若是不存在，则写入；目标路径下的文件若是存在，则覆盖写入

# m3u8文件制作

格式

```m3u
#EXTM3U (固定格式)
#EXTINF:-1,频道名称
频道直播地址.m3u8

#EXTINF:-1,频道名称
频道直播地址.m3u8
```





# php设计模式

> https://learnku.com/docs/php-design-patterns/2018

## 单例模式

```php
<?php
/**
 * Created by OrangBus
 * User email: orangbus40400@gmail.com
 * website: orangbus.cn
 * blog: doc.orangbus.cn
 * github: github.com/orangbus
 */

class UserService
{

    private static $instance;

    /**
     * @return UserService
     */
    public static function getInstance()
    {
        if (!self::$instance instanceof self) {
            return new self::$instance;
        }
        return self::$instance;
    }
    private function __construct()
    {
        
    }
    private function __clone() {

    }

    public function getUserById($id)
    {
        return \App\Models\User::find($id);
    }

}

```

```php
$user = UserService::getInstance()->getUserById(1);
```



## 观察者模式



