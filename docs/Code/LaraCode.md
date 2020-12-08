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

## laravel周期

控制器构造方法>父类构造方法>中间件构造方法

## laravel使用factory填充数据

### 设置中文数据

```php
public function definition()
    {
        $faker = \Faker\Factory::create("zh_CN");
        return [
            "title" => $faker->title
        ];
    }

//通过配置文件配置
// config\app.php
faker_locale => 'zh_CN'
```

### 创建迁移文件

```bash
php artisan make:model Demo -m
```

### 创建工厂数据

```bash
php artisan make:factory DemoFactory
```

### 填充数据

```bash
php artisan tinker
namespace App\Models;

Demo::factory()->make(); //测试，不会真的往数据库插入
Demo::factory()->create(); // 直接写入数据库
```

## 获取原始数据

```php
Auth::user()->getAttributes()['identity'] == 3
```

## 时间搜索

```php
// 参数格式：2020-10-01 - 2020-10-31 （- 前后有空格）
if (!empty($datebt)){
    $datearr=explode(" - ",$datebt);
    $datebegin=strtotime($datearr['0']);
    $dateend=strtotime($datearr['1']);
    $map[] = ['created_at','between',[$datebegin,$dateend]];
}
```

## 手动表单验证（api验证）

```php
$param = $this->request->all();
$validate = Validator::make($param,[
    "username" => "required",
    "password" => "required"
],[
    "username.max" => "用户名不能为空！"
]);
if ($validate->fails()) return $this->error($validate->errors()->first()); // 获取验证错误的第一条信息
```

## scope使用

```php
// model:命名规范：scope+驼峰名字（Status）
public function scopeStatus($query)
{
    return $query->where("status",1);
}
```

```php
public function index(){
    //调用方式：直接写 scope后面的名称即可
    return response()->json(User::Status()->get()); // 这样就取出status为1的数据
}
```

看不懂就参考：https://blog.csdn.net/qq175023117/article/details/101032253

## laravel8+websocket

### 安装laravel 和前端脚手架

```bash
laravel new websocket

composer require laravel/jetstream

php artisan jetstream:install livewire // blade模板

php artisan jetstream:install inertia //vue模板

composer require laravel/ui --dev

php artisan ui vue --auth

npm i && npm run dev
```

配置数据库并迁移数据库文件

```bash
php artisan migrate
```

先让项目跑起来看看有没有报错，能否正常注册

```bash
php artisan serve
```



### 安装 `laravel/websocket`

> https://beyondco.de/

用过laravel的朋友因该都熟悉下面的操作吧

```bash
composer require beyondcode/laravel-websockets
```

```bash
php artisan vendor:publish --provider="BeyondCode\LaravelWebSockets\WebSocketsServiceProvider" --tag="migrations"
```

```bash
php artisan vendor:publish --provider="BeyondCode\LaravelWebSockets\WebSocketsServiceProvider" --tag="config"
```

```bash
php artisan migrate
```

### 安装 `pusher`

注册一个pusher账号，获取api信息：https://pusher.com/

```
composer require pusher/pusher-php-server "~3.0"
```

修改 `.env`

```
BROADCAST_DRIVER=pusher
```

修改 `config/broadcasting.php`

```php
'pusher' => [
    'driver' => 'pusher',
    'key' => env('PUSHER_APP_KEY'),
    'secret' => env('PUSHER_APP_SECRET'),
    'app_id' => env('PUSHER_APP_ID'),
    'options' => [
        'cluster' => env('PUSHER_APP_CLUSTER'),
        'encrypted' => true,
        'host' => '127.0.0.1',
        'port' => 6001,
        'scheme' => 'http'
    ],
],
```

修改 `config/websockets.php`

```php
'apps' => [
    [
        'id' => env('PUSHER_APP_ID'),
        'name' => env('APP_NAME'),
        'key' => env('PUSHER_APP_KEY'),
        'secret' => env('PUSHER_APP_SECRET'),
        'enable_client_messages' => false,
        'enable_statistics' => true,
    ],
],
```

启动 laravel-websocket 服务

```
php artisan websockets:serve //默认6001
// or
php artisan websockets:serve --port=3030
```

查看**websocket dashboard**：`ip/laravel-websockets`

你可以配置**websocket dashboard**访问权限：`AuthServiceProvider`

```php
public function boot()
{
    $this->registerPolicies();

    Gate::define('viewWebSocketsDashboard', function ($user = null) {
        return in_array($user->email, [
            //
        ]);
    });
}
```

### 安装前端库

```bash
npm install --save laravel-echo pusher-js
npm install --save socket.io-client

```

### 创建事件

```php
php artisan make:event WeChat
```

在`app/Events/Wechat` 实现广播接口

```php
<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class WeChat implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    
    public $msg;
    public $user;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($msg,$user)
    {
        $this->msg = $msg;
        $this->user = $user;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('cctv1');
    }
}

```

`Wechat`:  事件的名称

`cctv1`:  频道的名称

注册一个事件触发的路由

```php
Route::get("/chat",function (){
    $msg = request()->input("msg","orangbus");
    $user = \Illuminate\Support\Facades\Auth::user();
    event(new \App\Events\Wechat($msg,$user));
    dd($msg);
});
```

监听事件:`bootstrap` （不要忘记了在视图页面加载 `app.css` 和 `app.js`文件）

```js
import Echo from 'laravel-echo';

window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.MIX_PUSHER_APP_KEY,
    cluster: process.env.MIX_PUSHER_APP_CLUSTER,
    forceTLS: false,
    wsHost: '127.0.0.1',
    wsPort: 6001,
    // wsPath: '/ws',
    disableStats: true,
    enabledTransports: ['ws','wss'], //如果你的消息发送失败多半是因为这个
});

//我们就可以接收到如下消息
{
  "msg": "orangbus",
  "user": {
    "id": 1,
    "name": "orangbus",
    "email": "123@qq.com",
    "email_verified_at": null,
    "created_at": "2020-12-04T09:01:47.000000Z",
    "updated_at": "2020-12-04T09:01:47.000000Z"
  }
}
```

