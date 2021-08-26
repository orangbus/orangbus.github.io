---
title: docker安装Syncthing备份数据
---

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [blog.csdn.net](https://blog.csdn.net/weixin_44395100/article/details/108233403)

### docker安装Syncthing，并配置数据备份

[TOC]

#### 一、Syncthing简介

[官方网址：https://syncthing.net/](https://syncthing.net/)  

Syncthing是一个开源免费的文件夹/文件同步神器，支持Android、Linux、Windows、Mac OS X等系统，可以使我们在2台任何系统任何设备之间，实现文件实时同步，很强大。而且数据很安全，不会存储在你的设备以外的其他地方。所有通信都使用TLS进行保护。所使用的加密包括完美的前向保密，以防止窃听者获得对您的数据的访问权限。很适合我们用来搭建私有同步网盘。

#### 二、docker部署

```
docker run --name syncthing -d -p 8384:8384 -p 22000:22000 -v /users/syncthing:/var/syncthing syncthing/syncthing` 
```

#### 三、访问

1.  直接使用[http://ip:8384](http://ip:8384)进行访问
2.  初次进入会提示需要设置用户名密码,输入用户名和密码进行保存就OK，如下图

![在这里插入图片描说的](https://img-blog.csdnimg.cn/20200826093303738.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDM5NTEwMA==,size_16,color_FFFFFF,t_70#pic_center)

#### 四、配置数据备份

1.  添加文件夹（docker运行的需要填写的是容器内的目录路径，文件可能需要赋予权限，需要递归到子目录和文件，否者有些文件没有权限会同步不了），如下图  
    
    

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200826093653260.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDM5NTEwMA==,size_16,color_FFFFFF,t_70#pic_center)  
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200826093756154.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDM5NTEwMA==,size_16,color_FFFFFF,t_70#pic_center)  


2.  添加远程设备  
    
    ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200826093906908.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDM5NTEwMA==,size_16,color_FFFFFF,t_70#pic_center)  
    
3.  填写设备ID（设备ID在目标设备的操作->显示ID中查看）  
    
    ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200827164824240.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDM5NTEwMA==,size_16,color_FFFFFF,t_70#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200826093951334.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDM5NTEwMA==,size_16,color_FFFFFF,t_70#pic_center)  


4.  添加地址列表（多个地址用半角逗号隔开，输入dynamic自动发现设备，建议填写tcp地址，注意填写的端口是22000）  
    
    ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200826094211600.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDM5NTEwMA==,size_16,color_FFFFFF,t_70#pic_center)  
    
5.  共享文件（选择所要共享的文件共享）  
    
    ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200826094251195.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDM5NTEwMA==,size_16,color_FFFFFF,t_70#pic_center)  
    
6.  此时目标设备会显示是否添加此设备，选择添加设备  
    
    ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200826094320763.png#pic_center)  
    
7.  是否共享选择的文件，选择共享  
    
    ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200826094341434.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDM5NTEwMA==,size_16,color_FFFFFF,t_70#pic_center)  
    **完成以上步骤就可以实现两台机器直接数据同步备份了。** 