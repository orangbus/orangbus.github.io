---
title: Laravel开发代码规范
---

# 1、路由

不同的端接口使用不同的 `route` 文件，防止接口过多难以管理

web.php: 前端页面显示

api.php : 手机端接口路由地址

admin.php : 后台管理员接口路由地址

示例

```
.
├── api.php
├── channels.php
├── console.php
├── mobile.php
└── web.php
```

每个模块对应一个 `Route::group()` ，每个独立的模块对应一个目录的控制器文件

示例

```
.
├── Api
│   ├── ApplyForm
│   │   └── Index.php
│   ├── Article
│   │   ├── ArticleInclude.php
│   │   ├── Cate.php
│   │   ├── Index.php
│   │   ├── Spider.php
│   │   ├── Sync.php
│   │   └── Tags.php
│   ├── Auth
│   │   ├── NodeAuth.php
│   │   └── RoleAuth.php
│   ├── Banner
│   │   └── Index.php
│   ├── Dictionary
│   │   └── Index.php
│   ├── FriendLink
│   │   └── Index.php
│   ├── Index
│   │   └── Index.php
│   ├── Log
│   │   ├── Index.php
│   │   └── Login.php
│   ├── Login.php
│   ├── NavBar
│   │   └── Index.php
│   ├── School
│   │   ├── Cate.php
│   │   ├── Index.php
│   │   └── Tags.php
│   ├── Setting
│   │   └── Index.php
│   ├── User
│   │   └── Index.php
│   └── Website
│       └── Index.php
├── Auth
│   ├── ConfirmPasswordController.php
│   ├── ForgotPasswordController.php
│   ├── LoginController.php
│   ├── RegisterController.php
│   ├── ResetPasswordController.php
│   └── VerificationController.php
├── Controller.php
├── HomeController.php
├── Minio
│   ├── Cate.php
│   └── Index.php
├── Mobile
│   ├── ApplyForm
│   │   └── Index.php
│   ├── Article
│   │   ├── Index.php
│   │   └── Tag.php
│   ├── Index
│   │   └── Index.php
│   └── School
│       └── Index.php
├── Utils
│   └── Index
│       └── Index.php
└── Web
    ├── ApplyForm
    │   └── Index.php
    ├── Article
    │   ├── Cate.php
    │   ├── Index.php
    │   └── Tag.php
    ├── Demo
    │   └── Index.php
    ├── Index
    │   └── Index.php
    └── School
        └── Index.php

```

# 2、表规范

所有的表创建或者更改都应该对应一个migration文件，在团队协作中，无论任何人执行**相同的操作**，得到的表结构都是**一致**的 

```
├── 2014_10_12_000000_create_users_table.php
├── 2014_10_12_100000_create_password_resets_table.php
├── 2019_08_19_000000_create_failed_jobs_table.php
├── 2019_12_14_000001_create_personal_access_tokens_table.php
├── 2023_01_01_135241_create_articles_table.php
├── 2023_01_02_012408_create_frind_links_table.php
├── 2023_01_02_012719_create_websites_table.php
├── 2023_01_02_013111_create_admins_table.php
├── 2023_01_03_024948_create_schools_table.php
├── 2023_01_03_032723_create_article_cates_table.php
├── 2023_01_03_062732_create_minio_clouds_table.php
```

同业务的相关的表以【主表_副表】的规范命名

```
.
├── Admin.php
├── ApplyForm.php
├── ArticleCate.php
├── ArticleInclude.php
├── Article.php
├── ArticleSync.php
├── ArticleTag.php
├── BaiduIncludeLog.php
├── BaiduIncludeTask.php
├── BaiduPush.php
├── Banner.php
├── BaseModel.php
├── Dictionary.php
├── FrindLink.php
├── LoginLog.php
├── MinioCate.php
├── MinioCloud.php
├── NavBar.php
├── Node.php
├── Role.php
├── SchoolCate.php
├── School.php
├── SchoolTag.php
├── Setting.php
├── SiteLog.php
├── SpiderArticle.php
├── UserArticle.php
├── User.php
└── Website.php
```

参考以上可看出

```
Article.php
ArticleCate.php
ArticleInclude.php
ArticleSync.php
ArticleTag.php
```

这些表都是跟文章相关的，以文章【articles】为主表，文章相关的分类表【article_cates】,文章标签【article_tags】,以此类推，可快速看出表关系。

如果是文章关联用户，则【article_user】,【主表_副表】的形式表现，如果是用户关联其它的表统计，则【user_order】【user_login_log】形式。

# 3、代码更新升级

程序升级主要分为三部分

## 1、代码同步更新

使用git管理，跟新代码时只需要 `git pull` 即可

## 2、表同步更新

每个表对应一个migration文件，最终只需要执行：`php artisan migration` 即可完成表更新，如果是一些正在使用的表，不能只用 migration的形式升级，可创建一个seed，更新的时候指定seed即可。

## 3、配置文件更新

在实际开发中，我们可能需要多个服务配合使用，如

1、文件上传：使用独立的对象存储oss

2、搜索：使用elasticsearch

3、缓存：redis

4、消息队列：Redis ，mq等

...............................

每个第三方的独立程序因该有对应的安装及部署的说明，每个人安装文档执行同样的操作可搭建一个相同的环境出来。

# 4、代码规范

在laravel中，建议根据 【服务端/功能/实现方法】建立对应的控制器

```
├── Api # 手机接口服务端
│   ├── ApplyForm # 表单功能
│   │   └── Index.php 
│   ├── Article # 文章功能
│   │   ├── ArticleInclude.php
│   │   ├── Cate.php # 文章分类相关的实现方法
│   │   ├── Index.php
│   │   ├── Spider.php
│   │   ├── Sync.php
│   │   └── Tags.php # 文章标签相关的实现方法
└── Web # 网页端
    ├── ApplyForm
    │   └── Index.php
    ├── Article
    │   ├── Cate.php
    │   ├── Index.php
    │   └── Tag.php
    ├── Demo
    │   └── Index.php
    ├── Index
    │   └── Index.php
    └── School
        └── Index.php
```

这样可对每个功能模块进行快速的定位以及升级迭代。

对不同的状态返回，统一使用枚举的方式

```php
<?php
/**
 * Created by OrangBus
 * User email: orangbus40400@gmail.com
 * website: orangbus.cn
 * blog: doc.orangbus.cn
 * github: github.com/orangbus
 */

namespace App\Enum;

/**
 * 自定义响应 成功|失败 错误状态码
 */

class HttpResponseEnum
{
    // 返回成功状态码
    public const SuccessCode=200;

    // 返回失败错误状态码
    public const ErrorCode=202;

    // 默认返回成功消息提示
    public const SuccessMessage="ok";

    //默认失败返回消息提示
    public const ErrorMessage="error";

    // 保存成功提示
    public const SaveMessage="保存成功！";

    // 删除成功提示
    public const DeleteMessage="删除成功！";
}
```

不同的错误使用相应的异常去处理

```php
// 表单验证异常
if ($e instanceof ValidationException && $request->wantsJson()) {
    return $this->error($e->getMessage(), 202);
}
// 业务异常
if ($e instanceof BusinessException && $request->wantsJson()) {
    return $this->error($e->getMessage(), $e->getCode());
}
// 必要参数为空异常
if ($e instanceof ArgumentEmptyException && $request->wantsJson()) {
    return $this->error($e->getMessage(), $e->getCode());
}
if ($e instanceof \ErrorException && $request->wantsJson()) {
    return $this->error($e->getMessage());
}
// 未登录,未授权
if ($e instanceof AuthenticationException && $request->wantsJson()) {
    return $this->error($e->getMessage(), 419);
}
```

当后台想收集不同类型的错误时，只需要找到最后的异常处理的时候记录数据库即可。

# 5、服务部署

为了应对现在多变的客户需求，我们可能将前后端进行分离管理，每个端尽量使用不同的域名或者端口，并且每个项目中给定一个实例模板

比如：

laravel作为后端：admin_nginx.conf

后台管理端使用vue开发：web_nginx.conf

最后部署项目的时候，只需要根据业务结构图，将对应的模块正常启动即可。

# 6、数据备份

使用定时任务每天备份以此数据库，保留最新的3份即可。

# 7、开发环境

window建议使用：laragon

Linux、mac： lnmp

在实际开发中应该规定好版本信息，比如

php:8.x

mysql: 5.7

redis:7.x