---
title: 向 GitHub 提交代码时触发 Jenkins 自动构建
---

当我们提交代码到 GitHub 后，可以在 Jenkins 上执行构建，但是每次都要动手去执行略显麻烦，今天我们就来实战 Jenkins 的自动构建功能，每次提交代码到 GitHub 后，Jenkins 会进行自动构建；

原文地址：[http://blog.csdn.net/boling_cavalry/article/details/78943061](http://blog.csdn.net/boling_cavalry/article/details/78943061)

### 前期准备工作

进行本章的实战前，推荐您参照[《docker 下的 Jenkins 安装和体验》](http://blog.csdn.net/boling_cavalry/article/details/78942408)做安装和体验的实战，以便对 Jenkins 服务有初步了解；

### 重要前提

1.  GitHub 收到提交的代码后要主动通知 Jenkins，所以 Jenkins 所在服务器一定要有外网 IP，否则 GitHub 无法访问，我的 Jenkins 服务器是部署在腾讯云的云主机上，带有外网 IP；
2.  本次实战要提交源码到 GitHub，所以您需要有一个 GitHub 号，并在上面创建工程；

### demo 工程源码

本次用来在 Jenkins 上构建的工程是个 springboot 的 web 工程，地址是：git@github.com:zq2599/jenkinsdemo.git，用浏览器访问的地址是：[https://github.com/zq2599/jenkinsdemo.git](https://github.com/zq2599/jenkinsdemo.git)；   
代码很简单，只有一个 controller，接收 http 请求返回一个字符串，如下所示：

[![](http://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

```
@RestController
public class Hello {
    @RequestMapping("/")
    public String sayHello(){
        return "3. Hello jenkins, " + new Date();
    }
}
```

[![](http://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

您需要在自己的 GitHub 创建一个项目，源码可以参照上述 demo 工程的源码；

### 实战步骤梳理

本次整个实战过程依次为如下步骤：   
1. GitHub 上准备一个 spring boot 的 web 工程；   
2. GitHub 上配置 Jenkins 的 webhook 地址；   
3. 在 GitHub 上创建一个 access token，Jenkins 做一些需要权限的操作的时候就用这个 access token 去鉴权；   
4. Jenkins 安装 GitHub Plugin 插件；   
5. Jenkins 配置 GitHub 访问权限；   
6. Jenkins 上创建一个构建项目，对应的源码是步骤 1 中的 web 工程；   
7. 修改 web 工程的源码，并提交到 GitHub 上；   
8. 检查 Jenkins 的构建项目是否被触发自动构建，构建成功后，下载工程运行，看是不是基于最新的代码构建的；

### webhook 地址

webhook 是通知 Jenkins 时的请求地址，用来填写到 GitHub 上，这样 GitHub 就能通过该地址通知到 Jenkins；   
假设 Jenkins 所在服务器的地址是：192.168.0.1，端口为 8080，那么 webhook 地址就是 [http://192.168.0.1:8080/github-webhook](http://192.168.0.1:8080/github-webhook)

再次提醒，上述地址必须是外网也能访问的，否则 GitHub 无法访问到 Jenkins；

### 配置 GitHub

1.  登录 GitHub，进入要本次构建用到的工程；
2.  在工程主页面点击右上角的”Settings”，再点击左侧”Webhooks”，然后点击 “Add webhook”，如下图：   
    ![](http://img.blog.csdn.net/20180120180649159?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYm9saW5nX2NhdmFscnk=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
3.  如下图，在”Payload URL” 位置填入 webhook 地址，再点击底部的”Add webhook 按钮”，这样就完成 webhook 配置了，今后当前工程有代码提交，GitHub 就会向此 webhook 地址发请求，通知 Jenkins 构建：   
    ![](http://img.blog.csdn.net/20180120181141062?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYm9saW5nX2NhdmFscnk=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

### 生成 Personal access tokens

Jenkins 访问 GitHub 工程的时候，有的操作是需要授权的，所以我们要在 GitHub 上生成授权的 token 给 Jenkins 使用，这就是 Personal access tokens，生成步骤如下：   
1. 登录 GitHub，进入”Settings” 页面，点击左下角的”Developer settings”，如下图：   
![](http://img.blog.csdn.net/20180101100023785?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYm9saW5nX2NhdmFscnk=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)   
2. 跳转到”Developer settings” 页面后，点击左下角的 “Personal access tokens”，如下图：   
![](http://img.blog.csdn.net/20180101100149058?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYm9saW5nX2NhdmFscnk=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)   
3. 跳转到”Personal access tokens” 页面后，点击右上角的”Generate new token” 按钮，如下图：   
![](http://img.blog.csdn.net/20180101100555967?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYm9saW5nX2NhdmFscnk=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)   
4. 可能会提示输入 GitHub 密码，输入后跳转到创建 token 的页面，如下图所示，输入 title，再勾选”repo” 和”admin:repo_hook”，再点击底部的”Generate token” 按钮，就能产生一个新的 access token，将此字符串复制下来，后面 jenkins 任务中会用到：   
![](http://img.blog.csdn.net/20180101100900159?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYm9saW5nX2NhdmFscnk=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

### Jenkins 配置

1.  GitHub Plugin 插件，在” 系统管理 -> 管理插件” 位置检查此插件是否已经安装，没有的话请先安装；
2.  配置 GitHub，点击 “系统管理 -> 系统设置”，如下图：   
    ![](http://img.blog.csdn.net/20180121093316581?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYm9saW5nX2NhdmFscnk=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
3.  在系统设置页面找到”GitHub”，配置一个”GitHub Server”，如下图，”API URL” 填写”[https://api.github.com](https://api.github.com/)“，”Credentials” 位置如下图红框所示，选择”Add->Jenkins”：   
    ![](http://img.blog.csdn.net/20180121094004625?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYm9saW5nX2NhdmFscnk=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
4.  弹出的页面中，”Kind” 选择”Secret text”，”Secret” 填入前面在 GitHub 上生成的 Personal access tokens，Description 随便写一些描述信息，如下图：   
    ![](http://img.blog.csdn.net/20180121094137737?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYm9saW5nX2NhdmFscnk=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
5.  填写完毕后，点击右侧的”Test connection” 按钮，如果信息没有填错，显示的内容如下图所示：   
    ![](http://img.blog.csdn.net/20180121094800433?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYm9saW5nX2NhdmFscnk=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
6.  点击页面最底部的” 保存” 按钮；

### GitHub 项目的项目主页和仓库地址

项目主页和仓库地址是不同的，如下图，红框 1 中是项目主页，点击红框 2 的按钮后，红框 3 中是仓库地址（要用 HTTPS 的，不用 SSH 的）：   
![](http://img.blog.csdn.net/20180121103244002?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYm9saW5nX2NhdmFscnk=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

项目主页：[https://github.com/zq2599/jenkinsdemo](https://github.com/zq2599/jenkinsdemo)   
仓库地址：[https://github.com/zq2599/jenkinsdemo.git](https://github.com/zq2599/jenkinsdemo.git)

### 新建构建项目

在 Jenkins 上新建一个 maven 构建项目，名为 test003，如下图：   
![](http://img.blog.csdn.net/20180121100052294?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYm9saW5nX2NhdmFscnk=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

接下来设置 test003 的配置信息，分为” 源码管理设置” 和” 构建环境设置” 两部分；

### 源码管理设置

![](http://img.blog.csdn.net/20180121105320208?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYm9saW5nX2NhdmFscnk=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)   
上图中每个红框的设置如下解释：   
1. 选择”Git”；   
2. “Repository URL” 输入仓库地址：[https://github.com/zq2599/jenkinsdemo.git](https://github.com/zq2599/jenkinsdemo.git)；   
3. “Credentials” 创建一个 Credentials，Kind 选择”Username with password”，Username 输入 GitHub 账号，Password 输入 GitHub 密码；   
4. “源码库浏览器” 选择”githubweb”；   
5. “URL” 输入项目主页：[https://github.com/zq2599/jenkinsdemo](https://github.com/zq2599/jenkinsdemo)；   
6. “构建触发器” 中勾选”GitHub hook trigger for GiTScm polling”；

### 构建环境设置

如下图所示，勾选”Use secret text(s) or file(s)”，下面的”Credentials” 选择我们之前配置过的”Personal access tokens”   
![](http://img.blog.csdn.net/20180121105737723?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYm9saW5nX2NhdmFscnk=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

设置完成后，点击页面底部的” 保存” 按钮；

### 修改 web 工程代码并提交到 GitHub

将 GitHub 仓库的代码 clone 到本地，做一些修改然后提交到 GitHub 上，例如我修改了 Hello.java 中的源码（修改了 sayHello 方法的 return 的字符串的内容），如下所示：

[![](http://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

```
@RestController
public class Hello {

    @RequestMapping("/")
    public String sayHello(){
        //修改返回的字符串的内容
        return "abcdefg. Hello jenkins, " + new Date();
    }
}
```

[![](http://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

提交到 GitHub 的操作如下图所示：   
![](http://img.blog.csdn.net/20180121112944192?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYm9saW5nX2NhdmFscnk=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

### Jenkins 自动构建

回到 Jenkins 的 test003 页面，可以看到已经开始自动构建了，如下图：   
![](http://img.blog.csdn.net/20180121113459123?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYm9saW5nX2NhdmFscnk=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

### 验证自动构建结果

1.  在 test003 的页面，点击” 工作空间”->” 工作区”，如下图：   
    ![](http://img.blog.csdn.net/20180121113926471?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYm9saW5nX2NhdmFscnk=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
2.  点击下图红框中的”mavendockerplugindemo-0.0.1-SNAPSHOT.jar”，浏览器就会下载这个文件：   
    ![](http://img.blog.csdn.net/20180121114046756?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYm9saW5nX2NhdmFscnk=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
3.  下载成功后，在 mavendockerplugindemo-0.0.1-SNAPSHOT.jar 所在目录下执行命令java -jar mavendockerplugindemo-0.0.1-SNAPSHOT.jar，web 应用启动成功，如下图：   
    ![](http://img.blog.csdn.net/20180121114843740?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYm9saW5nX2NhdmFscnk=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
4.  浏览器输入 localhost:8080，可以看到 web 应用返回的内容是我们刚刚提交的最新内容，如下图：   
    ![](http://img.blog.csdn.net/20180121115018898?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYm9saW5nX2NhdmFscnk=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

至此，GitHub 提交触发 Jenkins 自动构建的实战就完成了，希望能对您搭建持续构建环境有所帮助。