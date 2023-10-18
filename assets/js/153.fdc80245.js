(window.webpackJsonp=window.webpackJsonp||[]).push([[153],{665:function(t,s,a){"use strict";a.r(s);var r=a(11),e=Object(r.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("blockquote",[a("p",[t._v("本文由 "),a("a",{attrs:{href:"http://ksria.com/simpread/",target:"_blank",rel:"noopener noreferrer"}},[t._v("简悦 SimpRead"),a("OutboundLink")],1),t._v(" 转码， 原文地址 "),a("a",{attrs:{href:"https://blog.csdn.net/weixin_44395100/article/details/108233403",target:"_blank",rel:"noopener noreferrer"}},[t._v("blog.csdn.net"),a("OutboundLink")],1)])]),t._v(" "),a("h3",{attrs:{id:"docker安装syncthing，并配置数据备份"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#docker安装syncthing，并配置数据备份"}},[t._v("#")]),t._v(" docker安装Syncthing，并配置数据备份")]),t._v(" "),a("p",[t._v("[TOC]")]),t._v(" "),a("h4",{attrs:{id:"一、syncthing简介"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#一、syncthing简介"}},[t._v("#")]),t._v(" 一、Syncthing简介")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://syncthing.net/",target:"_blank",rel:"noopener noreferrer"}},[t._v("官方网址：https://syncthing.net/"),a("OutboundLink")],1)]),t._v(" "),a("p",[t._v("Syncthing是一个开源免费的文件夹/文件同步神器，支持Android、Linux、Windows、Mac OS X等系统，可以使我们在2台任何系统任何设备之间，实现文件实时同步，很强大。而且数据很安全，不会存储在你的设备以外的其他地方。所有通信都使用TLS进行保护。所使用的加密包括完美的前向保密，以防止窃听者获得对您的数据的访问权限。很适合我们用来搭建私有同步网盘。")]),t._v(" "),a("h4",{attrs:{id:"二、docker部署"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#二、docker部署"}},[t._v("#")]),t._v(" 二、docker部署")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("docker run --name syncthing -d -p 8384:8384 -p 22000:22000 -v /users/syncthing:/var/syncthing syncthing/syncthing` \n")])])]),a("h4",{attrs:{id:"三、访问"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#三、访问"}},[t._v("#")]),t._v(" 三、访问")]),t._v(" "),a("ol",[a("li",[t._v("直接使用"),a("a",{attrs:{href:"http://ip:8384",target:"_blank",rel:"noopener noreferrer"}},[t._v("http://ip:8384"),a("OutboundLink")],1),t._v("进行访问")]),t._v(" "),a("li",[t._v("初次进入会提示需要设置用户名密码,输入用户名和密码进行保存就OK，如下图")])]),t._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/20200826093303738.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDM5NTEwMA==,size_16,color_FFFFFF,t_70#pic_center",alt:"在这里插入图片描说的"}})]),t._v(" "),a("h4",{attrs:{id:"四、配置数据备份"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#四、配置数据备份"}},[t._v("#")]),t._v(" 四、配置数据备份")]),t._v(" "),a("ol",[a("li",[t._v("添加文件夹（docker运行的需要填写的是容器内的目录路径，文件可能需要赋予权限，需要递归到子目录和文件，否者有些文件没有权限会同步不了），如下图")])]),t._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/20200826093653260.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDM5NTEwMA==,size_16,color_FFFFFF,t_70#pic_center",alt:"在这里插入图片描述"}}),a("br"),t._v(" "),a("img",{attrs:{src:"https://img-blog.csdnimg.cn/20200826093756154.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDM5NTEwMA==,size_16,color_FFFFFF,t_70#pic_center",alt:"在这里插入图片描述"}})]),t._v(" "),a("ol",{attrs:{start:"2"}},[a("li",[a("p",[t._v("添加远程设备")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/20200826093906908.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDM5NTEwMA==,size_16,color_FFFFFF,t_70#pic_center",alt:"在这里插入图片描述"}})])]),t._v(" "),a("li",[a("p",[t._v("填写设备ID（设备ID在目标设备的操作->显示ID中查看）")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/20200827164824240.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDM5NTEwMA==,size_16,color_FFFFFF,t_70#pic_center",alt:"在这里插入图片描述"}})])])]),t._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/20200826093951334.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDM5NTEwMA==,size_16,color_FFFFFF,t_70#pic_center",alt:"在这里插入图片描述"}})]),t._v(" "),a("ol",{attrs:{start:"4"}},[a("li",[a("p",[t._v("添加地址列表（多个地址用半角逗号隔开，输入dynamic自动发现设备，建议填写tcp地址，注意填写的端口是22000）")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/20200826094211600.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDM5NTEwMA==,size_16,color_FFFFFF,t_70#pic_center",alt:"在这里插入图片描述"}})])]),t._v(" "),a("li",[a("p",[t._v("共享文件（选择所要共享的文件共享）")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/20200826094251195.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDM5NTEwMA==,size_16,color_FFFFFF,t_70#pic_center",alt:"在这里插入图片描述"}})])]),t._v(" "),a("li",[a("p",[t._v("此时目标设备会显示是否添加此设备，选择添加设备")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/20200826094320763.png#pic_center",alt:"在这里插入图片描述"}})])]),t._v(" "),a("li",[a("p",[t._v("是否共享选择的文件，选择共享")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/20200826094341434.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDM5NTEwMA==,size_16,color_FFFFFF,t_70#pic_center",alt:"在这里插入图片描述"}}),a("br"),t._v(" "),a("strong",[t._v("完成以上步骤就可以实现两台机器直接数据同步备份了。")])])])])])}),[],!1,null,null,null);s.default=e.exports}}]);