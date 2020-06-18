> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 https://learnku.com/articles/36744

1.1 客户端上传设置[#](#f85071)
-----------------------

​ 在 B/S 程序中文件上传已经成为一个常用功能。其目的是客户可以通过浏览器 (Browser) 将文件上传到服务器（Server）上的指定目录。

​ 网络上常见的支持文件上传的网站：

​ 各种网盘

​ 头像

​ 网络相册

​ 实名认证

​ 邮件附件

​ 简单来说就是，Web 开发需要用户传递给服务器文件的都属于 PHP 的上传范畴。而服务器端只能接受的份，除非不做这个功能。就像 10086 客服，你只要打过去，它就要接受，不接受只能是服务器繁忙。

**PHP 中文件上传的基础知识：**

​ **1）客户端 form 表单设置**

​ **2） 服务器对上传文件进行操作处理**

**必须设置的 form 表单项：**

```
<html>
    <head><title>文件上传</title></head>
    <body>
        <form action="./upload.php"  method="post" enctype="multipart/form-data"><!--必须要写-->
            <!--typle写file类型，name必须要写，名字随便-->
            选择文件：<input type="file" >
            <input type="submit" value="上传文件">
        </form>
    </body>
</html>


```

**注意几个特征属性：**

​ **1. 一定是 post 方式上传文件，不可用 get 方式。**

​ **2. form 表单中一定要写 `enctype="multipart/form-data"。`**

​ **3. input 表单一定要写 `name` 名。**

1.2 在服务器端通过 PHP 处理上传[#](#7bf718)
--------------------------------

上传文件的接收和处理是通过 PHP 脚本来处理的，具体需要通过以下三个方面信息：

​ **1）设置 PH 配置文件中的指令：用于精细地调节 PHP 的文件上传功能。**

​ **2）$FILES 多维数组：用于存储各种与上传文件有关的信息，其他数据还是使用 $_POST 获取。**

​ **3）PHP 的文件上传处理函数：用于上传文件的后续处理。**

**1）PHP 配置文件中与文件上传有关的选项。**

| 指令名 | 默认值 | 功能描述 |
| --- | --- | --- |
| file_uploads | ON | 是否开启文件上传 |
| upload_max_filesize | 2M | 限制 PHP 处理上传文件大小的最大值，此值必须小于 post_max_size |
| post_max_size | 8M | 限制通过 POST 方法可以接受信息的最大值，也就是整个 POST 请求的提交值。此值必须大于 upload_max_filesize |
| upload_tmp_dir | NULL | 上传文件存放的临时路径，可以是绝对路径。默认 NULL 则使用系统的临时目录。 |
| max_file_uploads | 20 | 文件允许同时上传的个数 |

**2）$_FILES 多维数组。**

**超级全局数组 $_FILES**

```
    1、$_FILES["myfile"]["name"]中的值是:客户端文件系统的文件的名称。 

    2、$FILES["myfile"]["type"]中的值是:客户端传递的文件的类型。

    3、$_FILES["myfile"]["size"]中的值是:文件的字节的大小。

    4、$_FILES["myfile"]["tmp_name"]中的值是：文件被上传后在服务器存储的临时全路径。 

    5、$_FILES["myfile"]["error"]中的值是:文件上传的错误代码－php 4.2以后增加的功能。


```

**关于 error 文件上传的错误代码：**

```
UPLOAD_ERR_OK
其值为 0，没有错误发生，文件上传成功。

UPLOAD_ERR_INI_SIZE
其值为 1，上传的文件超过了 php.ini 中 upload_max_filesize 选项限制的值。

UPLOAD_ERR_FORM_SIZE
其值为 2，上传文件的大小超过了 HTML 表单中 MAX_FILE_SIZE 选项指定的值。

UPLOAD_ERR_PARTIAL
其值为 3，文件只有部分被上传。

UPLOAD_ERR_NO_FILE
其值为 4，没有文件被上传。

UPLOAD_ERR_NO_TMP_DIR
其值为 6，找不到临时文件夹。PHP 4.3.10 和 PHP 5.0.3 引进。

UPLOAD_ERR_CANT_WRITE
其值为 7，文件写入失败。PHP 5.1.0 引进。

注意: 以上值在 PHP 4.3.0 之后变成了 PHP 常量。


```

**常见数据格式（MIME）**

| 文件类型 | MIME 类型 |
| --- | --- |
| 图片文件 | image/gif，image/jpg，image/jpeg，image/png，image/x-png |
| 纯文本和 HTML | text/txt，text/plain，text/html |
| 二进制文件 | application/octet-stream |
| 音频格式 | audio/basic |
| 视频格式 | video/mpeg |

**3) PHP 的文件上传处理函数**

上传成功的文件会被放置到服务器端临时目录下，文件名是随机生成的临时文件名。

注：该文件在程序执行完后将自动被删除掉。在删除前可以像本地文件一样操作。

**文件上传处理函数：**

**is_uploaded_file — 判断文件是否是通过 HTTP POST 上传的。**

​ 格式：bool is_uploaded_file (string $filename)

**move_uploaded_file — 将上传的文件移动到新位置。**

​ 格式：bool move_uploaded_file (string $filename , string $destination)

​ 注意：如果目标文件已经存在，将会被覆盖。

​ 参数说明：文件临时目录，要移动到的位置目录

**案例：**

1） 设置前端上传界面

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <form action="doup.php" method="post" enctype="multipart/form-data">
        <input type="file" >
        <input type="submit" value="上传">
    </form>
</body>
</html>

```

2） doup.php 处理上传到临时目录的文件

```
    //专业搬运工具
    //move_uploaded_file()
    //参数1： 文件临时目录  参数2: 要移动到的位置

    //is_uploaded_file() 判断文件是否是http post提交过来的
    //参数1： 文件临时目录

    //1.我们保存的路径按照时间来创建
    //var_dump($_GET);

    //1.1保存的路径
    $dir='./biran/'.date('Y/m/d/');
    //echo $dir;exit;

    //1.2 判断文件上传的路径是否存在 如果不存在就创建
    if(!file_exists($dir)){
        mkdir($dir,777,true);
    }

    //2.要有个好的文件名 唯一的文件名
    //2.1获取文件的后缀名
    //2.jpg  jpg 
    $suffix = pathinfo($_FILES['pic']['name'],PATHINFO_EXTENSION);
    //echo $suffix;

    //2.2重新起名
    $filename = date('Ymd').uniqid().mt_rand(0,9999).'.'.$suffix;
    //echo $filename;

    //开始搬运
    //判断是否是http post 传递的文件
    if(!is_uploaded_file($_FILES['pic']['tmp_name'])){
        //不是http post上传文件
        echo '别整没用的！！';exit;
    }

    //开始真正的搬运
    if(move_uploaded_file($_FILES['pic']['tmp_name'],$dir.$filename)){
        echo '11111111111';
    }else{
        echo '22222222222';
    }

```

**封装成函数：**

思路：

```
    function upload(){
        //1.判断文件上传错误

        //2.判断你文件上传的类型是否是你想要的类型

        //3.起名字

        //4.判断保存路径是否存在

        //5.判断是否是http post方式上传

        //6.移动图片

        //7.返回移动成功的图片名
    }

```

**开始封装函数：新建 function.php**

```
<?php
    /*
        文件上传函数
        @param  string  $name  文件上传文件域的name值
        @param  string  $dir   文件保存路径
        @param  array   $allow 文件允许上传的类型
        return  string  $filename 文件名  如果失败 返回false
     */

    function upload($name,$dir='./upload/',$allow=array('jpg','gif','jpeg','png')){
        //echo $name;exit;
        //var_dump($_FILES);exit;
        //1.判断文件上传错误
        if($_FILES[$name]['error']>0){
            //echo '上传错误';
            switch($_FILES[$name]['error']){
                case 1:
                    echo '上传的文件超过了 php.ini 中upload_max_filesize 选项限制的值.';
                    break;
                case 2:
                    echo '上传文件的大小超过了 HTML 表单中 MAX_FILE_SIZE 选项指定的值';
                    break;
                case 3:
                    echo '文件只有部分被上传.';
                    break;
                case 4:
                    echo '没有文件被上传.';
                    break;
                case 6:
                    echo '找不到临时文件夹.';
                    break;
                case 7:
                    echo '文件写入失败.';
                    break;
            }
            return false;
        }

        //2.判断你文件上传的类型是否是你想要的类型
        //2.1允许上传的类型

        //2.2 获取后缀名
        $suffix = pathinfo($_FILES[$name]['name'],PATHINFO_EXTENSION);
        //echo $suffix;exit;
        //2.3 判断是否是我们允许上传的类型
        //var_dump(in_array($suffix,$allow));exit;
        if(!in_array($suffix,$allow)){
            //不允许上传的类型
            echo  '大哥你的上传类型不符合';
            return false;
        }
        //3.起名字
        $filename = date('Ymd').uniqid().mt_rand(0,9999).'.'.$suffix;
        //echo $filename;exit;

        //4.判断保存路径是否存在
        //4.1 得到保存路径

        //4.2 处理保存路径和后面的斜杠
        $save_path = rtrim($dir,'/');
        $save_path .='/';

        //4.3 保存路径中的时间文件夹处理
        $save_path .=date('Y/m/d/');

        //4.4 判断保存的路径是否存在
        if(!file_exists($save_path)){
            mkdir($save_path,777,true);
        }

        //4.5 拼接一个完整的保存路径
        $path = $save_path.$filename;
        //echo $path;exit;

        //5.判断是否是httppost方式上传
        if(!is_uploaded_file($_FILES[$name]['tmp_name'])){
            echo '滚蛋！';
            return false;
        }

        //6.移动图片
        if(!move_uploaded_file($_FILES[$name]['tmp_name'],$path)){
            echo '移动失败';
            return false;
        }

        //7.返回移动成功的图片名
        return $filename;

    }

```

**调用函数开始上传：**

```
<?php
    include './function.php';
    //var_dump($_FILES);exit;

    echo upload('file','./leiding',array('jpg','png'));

```

2.1 不同 name 名称多文件上传[#](#5d3a7f)
-------------------------------

**当需要上传多个文件的情况，有两种实现的解决方法：**

1） 使用不同的表单元素。

```
<input type="file" >
<input type="file" >
<input type="file" >

```

2) 使用数组格式的表单元素。

```
<input type="file" name="file[]">
<input type="file" name="file[]">
<input type="file" name="file[]">

```

1) 对于浏览器不识别的文件，可以直接利用 a 连接下载。

```
    <!-- 因为他们三个浏览器不认识这样的类型 -->
    <a href="./downlist/1.rar">1.rar</a>
    <a href="./downlist/1.exe">1.exe</a>
    <a href="./downlist/1.avi">1.avi</a>


```

2) 对于浏览器不识别的，可以利用 readfile 函数。

```
    <!-- 浏览器认识这样的类型,就会被解析 -->
    <a href="./action.php?>1.html</a>
    <a href="./action.php?>1.php</a>
    <a href="./action.php?>1.txt</a>
    <a href="./action.php?>1.jpg</a>

```

```
//接收一下name值.
$name = $_GET['name'];

//实现下载功能
//强制浏览器弹出另存为对话框
header('content-Disposition:attachment;file');

//此时只是下载了一个空文件,需要利用readfile读一遍所有的内容.便可下载.
$path = './downlist/'.$name;
readfile($path);

```

> 本作品采用[《CC 协议》](https://learnku.com/docs/guide/cc4.0/6589)，转载必须注明作者和本文链接