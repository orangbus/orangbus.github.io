### job延迟执行

修改 `.env` 文件

```
QUEUE_CONNECTION=redis
```

要使用 `redis` 作为队列驱动，我们还需要引入 `predis/predis` 这个包

```bash
composer require predis/predis
```

接下来启动队列处理器：

```bash
php artisan queue:work
```

**切记：如果测试中途要修改定时任务执行程序的内容，必须先停止队列，更改完事后重启队列。**

## laravel mix报错

> [webpack-cli]
> /home/{...}/www-teste/node_modules/laravel-mix/src/Mix.js:18
>     static _primary = null;

```bash
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt-get install -y nodejs
npm install & npm run dev
```

## laravel mix 无法watch

> events.js:292
>       throw er; // Unhandled 'error' event
>       ^
>
> Error: listen EACCES: permission denied 0.0.0.0:3000
>
> ************************

```

```











会员点击跳转详情详情。

会员身份变更∶一个会员有多个角色，现阶段每个角色的权限是一样的。

导入名单～会员完善资料～缴费～正常使用  导入名单计费方式∶ 420名之前的会员年底到期，之后按照到期日期进行结算。



页面模块如果没有内容就隐藏。