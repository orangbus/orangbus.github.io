> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mgxray.xyz](https://mgxray.xyz/index.php/archives/577/)

> 2021 年12月VPS科学上网搭建教程！安装x-ui可视化面板，部署伪装站点，开启CDN节点一键翻墙！保护个人隐私，高效、安全、私密，隐匿上网流量特征，自建VPN畅游互联网世界！
> ------------------------------------------------------------------------------------------
> 
> * * *
> 
> * * *
> 
> 梦歌自用vps官网：[**点此打开**](https://reurl.cc/WXeq9L)
> 
> 本期视频内用到的域名相关网站  
> cloudflare：`https://dash.cloudflare.com`  
> IPIP.NET地址库：`https://www.ipip.net`
> 
> 科学上网免费获取域名的方法：`https://www.youtube.com/watch?v=HKC8sEE0sWo`
> 
> 零基础教你搭建VPS科学上网教程：`https://www.youtube.com/watch?v=MsKTJaPpi8g` (PS：视频内免费申请域名的方法失效，请参照上方免费获取域名方法)
> 
> 梦歌往期x-ui面板视频教程  
> x-ui面板教程-1：`https://www.youtube.com/watch?v=3FhtowGFxWI`  
> x-ui面板教程-2：`https://www.youtube.com/watch?v=SaXd4Cjy3Sw`
> 
> 梦歌往期vps教程视频播放列表：`https://www.youtube.com/playlist?list=PLpPexpOJZjK84GrTlWbuADQ_rdKS-Loy-`
> 
> * * *
> 
> **##准备工作##**
> 
> VPS一台重置好Centos系统，VPS建议配置最好是1H1G以上的，本期教程梦歌VPS配置1H1G
> 
> 域名一个，做好解析
> 
> * * *
> 
> **##宝塔面板##**  
> **centos**
> 
> ```
> yum install -y wget && wget -O install.sh http://v7.hostcli.com/install/install_6.0.sh && sh install.sh 
> ```
> 
> **##宝塔面板登录地址及账号密码查看命令##**
> 
> ```
> bt default 
> ```
> 
> ![1.png](https://mgxray.xyz/usr/uploads/2021/12/4150866183.png "1.png")
> 
> * * *
> 
> **##解除宝塔面板强制绑定手机号码##**
> 
> ```
> 视频中这步可以省略了，因为我给大家上面提供的是宝塔最新破解版，亲测完美运行！ 
> ```
> 
> PS:再也不用解除强制绑定手机了，而且这个破解版本会随着宝塔官方版升级而升级，一直都是最新破解版！
> 
> * * *
> 
> **##bbrplus加速##**
> 
> ```
> wget -N --no-check-certificate "https://raw.githubusercontent.com/chiakge/Linux-NetSpeed/master/tcp.sh" && chmod +x tcp.sh && ./tcp.sh 
> ```
> 
> **##查看开启状态##**
> 
> ```
> sysctl -p 
> ```
> 
> * * *
> 
> **##重启你的VPS##**
> 
> ```
> reboot 
> ```
> 
> * * *
> 
> ![2.png](https://mgxray.xyz/usr/uploads/2021/12/3161806892.png "2.png")
> 
> **##登录宝塔面板安装套件##**  
> 安装：`Nginx1.18`｜`MySQL5.6`｜`php7.4`
> 
> 操作路径：  
> `套件安装完成后`｜`宝塔面板左边栏点击软件商店`｜`一键部署`｜`安装wordpress`
> 
> **打开我们的网站进行wordpress安装部署**
> 
> * * *
> 
> 宝塔域名证书密钥申请
> ----------
> 
> 操作路径：  
> `宝塔面板左边栏点击网站`｜`找到网站名后面的设置点击打开`｜`点击SSL`｜`点击Let's Encrypt`｜`勾选你的域名点击申请按钮`｜`申请完域名证书及密钥后打开强制HTTPS`
> 
> * * *
> 
> **##安装&升级x-ui面板一键脚本##**
> 
> ```
> bash <(curl -Ls https://raw.githubusercontent.com/vaxilu/x-ui/master/install.sh) 
> ```
> 
> * * *
> 
> **##访问x-ui面板##**  
> 宝塔面板放行x-ui面板的54321端口操作路径如下：  
> 1、`宝塔面板左边栏点击安全`｜`放行端口里面输入端口号`｜`备注说明随意填`｜`点击放行即可`  
> 2、浏览器打开新标签页输入：`VPS公网IP`+`:54321`，打开我们的x-ui面板  
> 3、x-ui初始登录账号密码都是：`admin`  
> 4、首先我们切换x-ui版本为最新版，撰写博文时xray-core更新至V1.5.2版本  
> 5、`点击x-ui面板设置`｜`修改面板监听端口`｜`添加面板url根路径`｜`保存配置`  
> 6、`点击入站列表`｜`点击+号`｜`添加节点详见视频`  
> 7、SSH中输入x-ui重启命令重启面板：`x-ui restart`  
> **PS:以上所有操作还是详见视频对照进行，不建议只看博文进行操作。**
> 
> * * *
> 
> **##修改宝塔面板配置文件##**  
> 操作路径：`点击宝塔面板左边栏网站`｜`点击网站名后边的设置`｜`选择配置文件`｜填入以下配置文件，配置文件中有几处需要修改，详见视频
> 
> ```
> location ^~ 面板url根路径 {
>     proxy_pass http://127.0.0.1:面板监听端口/面板url根路径;
>     proxy_set_header Host $host;
>     proxy_set_header X-Real-IP $remote_addr;
>     proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
> }
> location 节点路径 {
>         proxy_redirect off;
>         proxy_pass http://127.0.0.1:节点端口;
>         proxy_http_version 1.1;
>         proxy_set_header Upgrade $http_upgrade;
>         proxy_set_header Connection "upgrade";
>         proxy_set_header Host $http_host;
>         proxy_read_timeout 300s;
>         # Show realip in v2ray access.log
>         proxy_set_header X-Real-IP $remote_addr;
>         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
>   } 
> ```
> 
> * * *
> 
> **##重启Nginx##**  
> 操作路径：  
> `点击宝塔左边栏软件商店`｜`已安装`｜`点击Nginx后方设置`｜`点击重载配置`｜`完成后再点击重启`
> 
> **PS：Nginx重启完成后可使用：`域名`+`面板url根路径`登录x-ui面板，无需再使用面板监听端口**  
> 例如：`https://xxxx.com/xxx`详见视频操作
> 
> * * *
> 
> **##cloudflare开启域名的CDN隐藏VPS真实IP或拯救被墙的vps##**  
> 检查开启CDN是否生效键盘：`win+r`键，输入：`cmd`输入windows10刷新DNS命令：`ipconfig/flushdns`然后输入：`ping`键盘空格`输入你的域名`回车如果ping出你的域名IP不是你VPS的公网IP，那么恭喜你CDN服务开启成功。反之如若仍是你的VPS公网IP，那就请继续等待CDN服务开启，时间大概需要半小时，慢则一个小时左右，如要测试是否开启成功请继续执行以上操作。  
> **ps：如果实在等不了，可参照视频中另一种方法查看，具体操作参照视频教程**
> 
> * * *
> 
> **##伪装网站后台登录举例##**  
> 浏览器地址栏输入：[https://](https://)`你的域名`+`/wp-admin`  
> 举例：[https://xxxx.com/wp-admin](https://xxxx.com/wp-admin)
> 
> **ps：如有哪一步出现问题无法解决，请重置你的VPS系统，详细对照视频与博客步骤重新操作。不要又有小伙伴来找我说：我完全是按照你的视频操作的就是不行，不行肯定是你哪一步漏了或是没有按照我的视频要求来做！**
> 
> * * *
> 
>   

### 已有 29 条评论

1.  ![xs](https://secure.gravatar.com/avatar/c5ce9c209ca4c6f913f477e5c4986d3d?s=32&r=G&d=) xs [January 1st, 2022 at 03:59 pm](https://mgxray.xyz/index.php/archives/577/#comment-28)
    
    如果添加多个节点，网站的配置文件该怎么填呢，每个节点都要写一段吗，该怎么写呢
    
    [回复](https://mgxray.xyz/index.php/archives/577/?replyTo=28#respond-post-577)
    1.  ![joj42](https://secure.gravatar.com/avatar/c2e1aebebed86cb666caebd2d5b1633a?s=32&r=G&d=) joj42 [March 15th, 2022 at 04:56 pm](https://mgxray.xyz/index.php/archives/577/#comment-66)
        
        同问，求助
        
        [回复](https://mgxray.xyz/index.php/archives/577/?replyTo=66#respond-post-577)
    2.  ![猎人](https://secure.gravatar.com/avatar/e890cdcaa8935977a7d4a653988b5e9b?s=32&r=G&d=) 猎人 [March 27th, 2022 at 03:21 pm](https://mgxray.xyz/index.php/archives/577/#comment-71)
        
        安装宝塔后，一键部署打开没有部署的呢
        
        [回复](https://mgxray.xyz/index.php/archives/577/?replyTo=71#respond-post-577)
        1.  ![雷霆](https://secure.gravatar.com/avatar/8dedb2dcf1495138c45e06ad7d9680ab?s=32&r=G&d=) 雷霆 [March 31st, 2022 at 06:14 pm](https://mgxray.xyz/index.php/archives/577/#comment-74)
            
            同问，求解
            
            [回复](https://mgxray.xyz/index.php/archives/577/?replyTo=74#respond-post-577)
2.  ![马化腾](https://secure.gravatar.com/avatar/9d1ca7fee3406c890154f37d0937744b?s=32&r=G&d=) [马化腾](https://paopaolong.top/) [January 16th, 2022 at 11:22 pm](https://mgxray.xyz/index.php/archives/577/#comment-32)
    
    为什么我一打开CF中专的开关之后延迟极大，WIFI状态无法使用。流量可以但是延迟极大
    
    [回复](https://mgxray.xyz/index.php/archives/577/?replyTo=32#respond-post-577)
3.  ![123](https://secure.gravatar.com/avatar/c6d51356d77e3e0b8d3f7eff0d9bad6f?s=32&r=G&d=) 123 [January 31st, 2022 at 04:59 am](https://mgxray.xyz/index.php/archives/577/#comment-37)
    
    安装了ssl之后无法打开wp管理后台，怎么解决？ 按照视频安装不了ssl， 自己去cloudfare申请的免费ssl证书。能添加上，可是安装完后登录不了wp后台。
    
    [回复](https://mgxray.xyz/index.php/archives/577/?replyTo=37#respond-post-577)
4.  ![Christopher](https://secure.gravatar.com/avatar/c176b38e8f42146707bbc8710fcb173c?s=32&r=G&d=) Christopher [February 3rd, 2022 at 09:07 pm](https://mgxray.xyz/index.php/archives/577/#comment-39)
    
    为什么一通操作下来，IPIP首页和百度搜索IP还是服务器的IP地址？确实PING CloudFlare已经看到是其他地址了，V2RAYN客户端已经开了全局。
    
    [回复](https://mgxray.xyz/index.php/archives/577/?replyTo=39#respond-post-577)
    1.  ![huiyi](https://secure.gravatar.com/avatar/7ea6549adfdf888438bc5e07c67f573a?s=32&r=G&d=) huiyi [March 4th, 2022 at 07:09 pm](https://mgxray.xyz/index.php/archives/577/#comment-61)
        
        我也是这样，不知道为什么
        
        [回复](https://mgxray.xyz/index.php/archives/577/?replyTo=61#respond-post-577)
5.  ![ifakeo](https://secure.gravatar.com/avatar/183e59b7d5eb265fabbf76de07f57866?s=32&r=G&d=) ifakeo [February 7th, 2022 at 03:54 pm](https://mgxray.xyz/index.php/archives/577/#comment-40)
    
    唉，一步一步试了好了几次，每次都是能ping通但真延迟无法连接，麻了
    
    [回复](https://mgxray.xyz/index.php/archives/577/?replyTo=40#respond-post-577)
    1.  ![lk888](https://secure.gravatar.com/avatar/19969c46db4c88df4bc32d73b36a07dc?s=32&r=G&d=) lk888 [February 20th, 2022 at 11:19 am](https://mgxray.xyz/index.php/archives/577/#comment-51)
        
        我的也是啊，显示基础连接关闭 你现在弄好了吗？
        
        [回复](https://mgxray.xyz/index.php/archives/577/?replyTo=51#respond-post-577)
6.  ![123](https://secure.gravatar.com/avatar/487f87505f619bf9ea08f26bb34f8118?s=32&r=G&d=) 123 [February 10th, 2022 at 01:52 pm](https://mgxray.xyz/index.php/archives/577/#comment-42)
    
    宝塔面板安装连接用不了了呢。
    
    [回复](https://mgxray.xyz/index.php/archives/577/?replyTo=42#respond-post-577)
7.  ![安装不了](https://secure.gravatar.com/avatar/487f87505f619bf9ea08f26bb34f8118?s=32&r=G&d=) 安装不了 [February 10th, 2022 at 02:42 pm](https://mgxray.xyz/index.php/archives/577/#comment-43)
    
    Complete!  
    --2022-02-10 01:41:56-- https://download.fenhao.me/install/install_6.0.sh  
    Resolving download.fenhao.me (download.fenhao.me)... 45.94.43.98  
    Connecting to download.fenhao.me (download.fenhao.me)|45.94.43.98|:443...
    
    到这一步卡住了。
    
    [回复](https://mgxray.xyz/index.php/archives/577/?replyTo=43#respond-post-577)
8.  ![2](https://secure.gravatar.com/avatar/ce45af5be5aa51479474bdb901905530?s=32&r=G&d=) 2 [February 19th, 2022 at 02:58 am](https://mgxray.xyz/index.php/archives/577/#comment-50)
    
    弄完过后节点可以但是x-hi登陆页面打不开了
    
    [回复](https://mgxray.xyz/index.php/archives/577/?replyTo=50#respond-post-577)
    1.  ![1](https://secure.gravatar.com/avatar/3ce81a2d00d703b5db89d61f0b740942?s=32&r=G&d=) 1 [February 21st, 2022 at 02:34 am](https://mgxray.xyz/index.php/archives/577/#comment-53)
        
        加速关了，然后再回到xui面板把监听端口改成8443 再开启加速就好了
        
        [回复](https://mgxray.xyz/index.php/archives/577/?replyTo=53#respond-post-577)
9.  ![666](https://secure.gravatar.com/avatar/e6ea671e3861def3ec45e8040d9325b7?s=32&r=G&d=) 666 [March 2nd, 2022 at 03:13 pm](https://mgxray.xyz/index.php/archives/577/#comment-55)
    
    进不去x-ui的可以试试在配置文件添加路径那里，第一行的路径后面多加一个 /
    
    [回复](https://mgxray.xyz/index.php/archives/577/?replyTo=55#respond-post-577)
10.  ![123](https://secure.gravatar.com/avatar/487f87505f619bf9ea08f26bb34f8118?s=32&r=G&d=) 123 [March 3rd, 2022 at 02:38 pm](https://mgxray.xyz/index.php/archives/577/#comment-57)
    
    s
    
    [回复](https://mgxray.xyz/index.php/archives/577/?replyTo=57#respond-post-577)
11.  ![ML](https://secure.gravatar.com/avatar/9f63f219b3a8162848540ebda4119e31?s=32&r=G&d=) ML [March 3rd, 2022 at 07:13 pm](https://mgxray.xyz/index.php/archives/577/#comment-59)
    
    梦老师，我跟着您的视屏做了几次，每次都在宝塔域名证书密钥申请这个环节出问题，提示是成功，但就是看不到ssly证书，不能反复点申请，会被封，提示168小时后再来，后来我试着换一个域名，把vpn关了，就立马成功了，其余所有环节只要跟着视屏做就没问题。另外想问一下梦老师，证书的有效期是88天，到期后可以续吗？怎么操作？
    
    [回复](https://mgxray.xyz/index.php/archives/577/?replyTo=59#respond-post-577)
12.  ![阿光](https://secure.gravatar.com/avatar/ee2cf4c77d028aba2493e662d4de5c20?s=32&r=G&d=) 阿光 [March 4th, 2022 at 05:21 pm](https://mgxray.xyz/index.php/archives/577/#comment-60)
    
    我想用其他协议的话怎么配置？比如trojan
    
    [回复](https://mgxray.xyz/index.php/archives/577/?replyTo=60#respond-post-577)
13.  ![ansen](https://secure.gravatar.com/avatar/f0bee76fbe4253892041a43c641a3ef2?s=32&r=G&d=) ansen [March 5th, 2022 at 02:21 pm](https://mgxray.xyz/index.php/archives/577/#comment-62)
    
    孟老师，按您的教材走，到安装宝塔面板时，卡在办法的证书已过期，求解决办法~
    
    [回复](https://mgxray.xyz/index.php/archives/577/?replyTo=62#respond-post-577)
    1.  ![ansen](https://secure.gravatar.com/avatar/f0bee76fbe4253892041a43c641a3ef2?s=32&r=G&d=) ansen [March 5th, 2022 at 02:23 pm](https://mgxray.xyz/index.php/archives/577/#comment-63)
        
        错误，无法验证download.fenhao.me的由"/c=us/0=Let's Encrypt/CN=R3"颁发的证书：颁发的证书已经过期。  
        要以不安全的方式连接至download.fenhao.me,使用"--no-check-certificate"。
        
        [回复](https://mgxray.xyz/index.php/archives/577/?replyTo=63#respond-post-577)
14.  ![老生常谈](https://secure.gravatar.com/avatar/d3f72259a30320b946f79ce4e9ad8e17?s=32&r=G&d=) 老生常谈 [March 5th, 2022 at 11:34 pm](https://mgxray.xyz/index.php/archives/577/#comment-64)
    
    用这个就没有原生IP了，而且V2RAY 软件可以用，路由器的科学上网用这个却无法上网，不知道什么原因，想要原生IP，是不是需要取消那个黄色的小云朵呀》？
    
    [回复](https://mgxray.xyz/index.php/archives/577/?replyTo=64#respond-post-577)
15.  ![一个小菜鸟](https://secure.gravatar.com/avatar/3ecb6709a082de47f935628ab2426b69?s=32&r=G&d=) 一个小菜鸟 [March 22nd, 2022 at 07:58 pm](https://mgxray.xyz/index.php/archives/577/#comment-68)
    
    请问现在为什么X-UI的面板监听端口和面板URL根路径都修改不了，点击保存一直在那里转圈圈。怎么样都修改不成功。PS：我现在的版本是1.5.4。  
    期待站长的回复。谢谢
    
    [回复](https://mgxray.xyz/index.php/archives/577/?replyTo=68#respond-post-577)
16.  ![中指不涂指甲油](https://secure.gravatar.com/avatar/c3bac2e5a86580bb8dc6b34fc136d764?s=32&r=G&d=) 中指不涂指甲油 [March 28th, 2022 at 11:45 pm](https://mgxray.xyz/index.php/archives/577/#comment-73)
    
    装了你前几天说的7.6的企业版宝塔， 然后到一键部署里去 发现没有任何东西，没法装wordpress 啊
    
    [回复](https://mgxray.xyz/index.php/archives/577/?replyTo=73#respond-post-577)
    1.  ![行者在路上](https://secure.gravatar.com/avatar/ff7770e1ae148b0c6bd37d667f826b07?s=32&r=G&d=) 行者在路上 [April 1st, 2022 at 12:48 pm](https://mgxray.xyz/index.php/archives/577/#comment-76)
        
        是的，我也是安装完成后，一键部署页面什么都没有
        
        [回复](https://mgxray.xyz/index.php/archives/577/?replyTo=76#respond-post-577)
17.  ![UP](https://secure.gravatar.com/avatar/58849f71c53fc3d11a2220bfdbf6cd2d?s=32&r=G&d=) UP [March 31st, 2022 at 11:26 pm](https://mgxray.xyz/index.php/archives/577/#comment-75)
    
    域名网站，wordpress都正常访问，宝塔 x-ui WordPress后台都可以正常访问，入站节点添加，测试超时，无法上网，请问是什么问题？
    
    [回复](https://mgxray.xyz/index.php/archives/577/?replyTo=75#respond-post-577)
18.  ![酒里有毒](https://secure.gravatar.com/avatar/2f27d1428d18845ace2416f4ef91e90e?s=32&r=G&d=) 酒里有毒 [April 15th, 2022 at 10:06 am](https://mgxray.xyz/index.php/archives/577/#comment-79)
    
    教程开始就文不对题，哎，想爱你不容易。。。
    
    [回复](https://mgxray.xyz/index.php/archives/577/?replyTo=79#respond-post-577)
19.  ![得到](https://secure.gravatar.com/avatar/8f5517c835335096a2b3164e4c530b9e?s=32&r=G&d=) 得到 [April 28th, 2022 at 12:41 am](https://mgxray.xyz/index.php/archives/577/#comment-82)
    
    商城 一键部署里面没有wordpress这个安装
    
    [回复](https://mgxray.xyz/index.php/archives/577/?replyTo=82#respond-post-577)
20.  [x-ui面板+宝塔+伪装网站+CDN节点 R11; 乡村驿站](https://0.gtjl.tk/index.php/2022/05/24/x-ui%e9%9d%a2%e6%9d%bf%e5%ae%9d%e5%a1%94%e4%bc%aa%e8%a3%85%e7%bd%91%e7%ab%99cdn%e8%8a%82%e7%82%b9/) [May 24th, 2022 at 11:02 am](https://mgxray.xyz/index.php/archives/577/#pingback-85)
    
    [...]x-ui面板+宝塔+伪装网站+CDN节点 – 梦歌Channel of Dream Song (mgxray.xyz)[...]
    
    [回复](https://mgxray.xyz/index.php/archives/577/?replyTo=85#respond-post-577)
21.  ![sdz](https://secure.gravatar.com/avatar/a67f168c468f98fef7071bdd8026e5f2?s=32&r=G&d=) sdz [June 21st, 2022 at 02:24 pm](https://mgxray.xyz/index.php/archives/577/#comment-87)
    
    这个是每次添加节点都要重新添加一次那个代码吗？
    
    [回复](https://mgxray.xyz/index.php/archives/577/?replyTo=87#respond-post-577)

[取消回复](https://mgxray.xyz/index.php/archives/577/#respond-post-577)

### 添加新评论

*   
*   
*   

提交评论