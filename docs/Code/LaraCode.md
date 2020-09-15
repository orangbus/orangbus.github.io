---
title: laravel学习笔记
sidebar: auto
---

## laravel学习笔记

## 安装

```bash
composer create-project --prefer-dist laravel/laravel OrangVideo
```

## composer package

```bash
composer require laravel/ui --dev
php artisan ui vue --auth

```



## npm package

```bash
npm i mdui vuex vue-router Axios vue-m-message --save
```





## [laravel 引入中文语言包](https://www.cnblogs.com/clubs/p/12562790.html)

第一步：

```
composer require overtrue/laravel-lang
```

第二步：

安装成功后，在config/app.php文件中将以下这一行：

```
Illuminate\Translation\TranslationServiceProvider::class,
```

替换为：

```
Overtrue\LaravelLang\TranslationServiceProvider::class,
```

第三步：

config/app.php 修改

```
'locale' => 'zh-CN',
```

中文语言包引用结束

表单验证错误信息显示为中文：

```
faker_locale = 'zh-CN'
```