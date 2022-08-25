---
title: laravel学习笔记
sidebar: auto
---

## laravel环境部署常见缺少的php扩展

```bash
sudo apt-get install php-dev
sudo apt-get install php-curl
sudo apt-get install php-gd
sudo apt-get install php-xml
```

## 安装前端脚手架

```
omposer create-project --prefer-dist laravel/laravel

laravel new app
```

有时候在window下安装会提示一些插件错误可以跳过插件检查

```bash
composer install --ignore-platform-reqs
```

安装基础脚手架

```bash
composer require laravel/ui --dev

// 生成 登陆/注册 脚手架...
php artisan ui bootstrap --auth
php artisan ui vue --auth
php artisan ui react --auth

npm install --save laravel-echo pusher-js

npm i && npm run watch

// 热加载 webpack.mix.js
mix.browserSync('websocket.test');
```

一键命令

```bash
php artisan ui vue --auth
```

分页配置

```php
// AppServiceProvider

use Illuminate\Pagination\Paginator;

public function boot()
{
    Paginator::useBootstrap();
}
```



## tailwindcss安装

> 中文网站：https://docs.tailwindchina.com/docs/guides/laravel

```bash
npm install -D tailwindcss@npm:@tailwindcss/postcss7-compat @tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9
```

### 创建您的配置文件

接下来，生成您的 `tailwind.config.js` 文件：

```shell
npx tailwindcss init
```

这将会在您的项目根目录创建一个最小化的 `tailwind.config.js` 文件：

```js
// tailwind.config.js
module.exports = {
  purge: [
       './resources/**/*.blade.php',
     './resources/**/*.js',
     './resources/**/*.vue',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```

### 在 Laravel Mix 中配置 Tailwind

在您的 `webpack.mix.js` 中，添加 `tailwindcss` 作为 PostCSS 插件。

```javascript
  // webpack.mix.js
  mix.js("resources/js/app.js", "public/js")
    .postCss("resources/css/app.css", "public/css", [
     require("tailwindcss"),
    ]);
```

### 在您的 CSS 中引入 Tailwind

打开 Laravel 默认为您生成的 ./resources/css/app.css 文件 并使用 `@tailwind` 指令来包含 Tailwind的 `base`、 `components` 和 `utilities` 样式，来替换掉原来的文件内容。

```css
/* ./resources/css/app.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

接下来，在您的主 Blade 布局中导入您的样式表(通常是 `resources/views/layouts/app.php` 或类似的)，如果还没有存在的话， 请添加响应的视口元标签。

```diff-html
  <!doctype html>
  <head>
    <!-- ... --->
+   <meta charset="UTF-8" />
+   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
+   <link href="{{ asset('css/app.css') }}" rel="stylesheet">
  </head>
```

现在，当您运行 `npm run watch`, `npm run dev` 或 `npm run prod`, Tailwind CSS 就可以在您的 Laravel Mix 项目中使用了。

## npm package

```bash
npm i mdui vuex vue-router Axios vue-m-message --save
```

## Laravel IDE Helper

> https://github.com/barryvdh/laravel-ide-helper

```bash
composer require --dev barryvdh/laravel-ide-helper
```

- add the package to the `extra.laravel.dont-discover` key in `composer.json`

  ```
  "extra": {
    "laravel": {
      "dont-discover": [
        "barryvdh/laravel-ide-helper"
      ]
    }
  }
  ```

- Add the following class to the `providers` array in `config/app.php` 

  ```
  Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider::class,
  ```

  If you want to manually load it only in non-production environments, instead you can add this to your `AppServiceProvider ` with the `register()` method:

  ```php
  public function register()
  {
      if ($this->app->isLocal()) {
          $this->app->register(\Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider::class);
      }
     
  }
  ```

- run

  ```bash
  php artisan ide-helper:generate
  ```

  checked`, `email`, `is_admin`, `password`, `phone`, `usernam
  e

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
faker_locale => 'zh-CN'
```

## 配置中国时间

1、`config/app.php`

```php
'timezone' => 'Asia/Shanghai',
'locale' => 'zh-CN',
'faker_locale' => 'zh-CN',
```

2、Model中添加

```php
protected $dateFormat = 'U';
// 时间配置
protected function serializeDate(\DateTimeInterface $date)
{
	return $date->format('Y-m-d H:i:s');
}
```

## 时间转化

1、如果你需要添加`start_time` ,`end_time`的也需要时间转化，那么可以在Model中添加转化

```php
//model
protected $dates = [
        'start_time',
        'end_time',
    ];
```

2、时间类型的转化

```php
protected $casts = [
    'email_verified_at' => 'datetime',
    'created_at' => 'datetime:Y-m-d H:i:s', //格式化：2021-01:-01 12:00:01
    'updated_at' => 'timestamp', // 时间戳的格式
];
```

3、`timestamp` 类型的时间存储和查询出来的不一致

![image-20210803111115811](/images/image-20210803111115811.png)

```php
/**
     * 为数组 / JSON 序列化准备日期。
     *
     * @param \DateTimeInterface $date
     * @return string
     */
protected function serializeDate(\DateTimeInterface $date)
{
    return Carbon::instance($date)->toDateTimeString();
}
```

参考：https://learnku.com/articles/44212

4、如果需要存储时间戳格式的时间

```php
protected $dateFormat = 'U';
```

5、获取时间戳

如果`created_at` 是日期格式`2021-01-02 10:12:13` 获取到他的时间戳

```php
$user = \App\Models\User::where("id",1)->first();
$user->created_at->getTimestamp();
```

## laravel周期

控制器构造方法 -> 父类构造方法 -> 中间件构造方法

## Laravel查询技巧

### wherein查询

```php
$status = 1;
$ids = [1,2];
User::when($status, function ($query, $status) {
        return $query->where('status', $status);
    })
        ->when($ids, function ($query, $ids) {
            return $query->whereIn('id', $ids);
        })
        ->get();

// 另外写法
$where[] = [function($query){
    $query->whereIn("id","in",[1.2.3]);
}];
```

### 时间查询

```php
 $data = [];

#今天数据
$data['customer_today'] = Customer::where('customer_type', 1)->where('created_at', Carbon::today())->count();
#昨天数据
$data['customer_yesterday'] = Customer::where('customer_type', 1)->where('created_at', Carbon::yesterday())->count();

// 本周数据
$this_week = [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()];
$data['customer_this_week'] = Customer::where('customer_type', 1)->whereBetween('created_at', $this_week)->count();

// 上周数据
$last_week = [Carbon::now()->startOfWeek()->subWeek(), Carbon::now()->endOfWeek()->subWeek()];
$data['customer_last_week'] = Customer::where('customer_type', 1)->whereBetween('created_at', $last_week)->count();

// 本月数据
$data['customer_this_month'] = Customer::where('customer_type', 1)->whereMonth('created_at', Carbon::now()->month)->count();

// 上月数据
$data['customer_last_month'] = Customer::where('customer_type', 1)->whereMonth('created_at', Carbon::now()->subMonth()->month)->count();

// 本年数据
$data['customer_this_year'] = Customer::where('customer_type', 1)->whereYear('created_at', Carbon::now()->year)->count();

```



## 表单验证

方式一：



方式二：





## 观察者



## 事件监听





## 异常处理





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

## 动作授权

场景：假如我们的系统有不同的角色，同一个页面中，展示不同的点击按钮，这个时候就可以用laravel用户授权

1、创建一个授权类（非必须）

```bash
php artisan make:policy UserCheckPolicy --model=User
```

```php
<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;

    public function show(User $user , $path="") //这里的user必填，也就是当前登录用户的信息
    {
        return in_array($path,['user/add','user/delete']);
    }
    
}

```

2、打开 `\app\ProvidersAuthServiceProvider.php` 注册授权

```php
public function boot()
    {
        $this->registerPolicies();

        Gate::define("check",[UserPolicy::class,"checkBtn"]); // 注意引入刚刚创建的类
        // 如果判断比较简单，可以直接写在这里也是可以的
//        Gate::define("check",function (User $user ,$path="") {
//            return in_array($path,["delete","update]);
//        });
    }
```

Ps:在rbac权限中，如果传入的url地址在我们后台授权的列表中，则拥有该权限

3、在页面中进行授权操作（当前页面没有登录时没有效果的）

```php
@can("check","user/delete")
     <button type="button" class="btn btn-primary">delete</button>
@endcan
```

这样的大功告成了。

## 快速生成100w条用户数据

创建一个测试的表 (同时创建factory和migrate文件)

```bash
php artisan make:model MillionUser -fm
```

创建好表和对应的模拟数据，先运行测试一下

```
php artisan php artisan db:seed --class=MillionUserSeeder
```

如果没有错误，表写一个 `stary.sh` 脚本放在laravel项目的根目录

```bash
#!/usr/bin/env bash

faker_user(){
    for ((i=1 ; i<=100; i++)); do
        php artisan db:seed --class=MillionUserSeeder
        echo "已生成" $i "万条数据"
    done
    echo "生成成功！！"
    exit
}
faker_user
```

运行脚本：`sh ./start` 

# Passport使用

安装

```bash
```



## Laravel中使用redis

安装predis

```bash
composer require predis/predis
```

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redis;

class Index extends Controller
{
    public function index()
    {
        Redis::set("name","orangbus");
        $name = Redis::get("name");
        return view("welcome",compact("name"));
    }
}
```

## Laravel中使用MongoDB

> 自行安装php-mongo扩展

安装

```bash
composer require jenssegers/mongodb
```

注册

```php
Jenssegers\Mongodb\MongodbServiceProvider::class,
```

添加门脸

```php
'Mongo'     => Jenssegers\Mongodb\MongodbServiceProvider::class,
```

配置mongo连接

```
'mongodb' => [    
        'driver'   => 'mongodb',    
        'host'     => 'localhost',    
        'port'     => 27017,    
        'database' => 'mydb',    
        'username' => '',    
        'password' => '',
],
```

数据库操作跟跟laravel默认的数据库操作基本是一样的，案例

```php
 $data = DB::connection('mongodb') // 连接mongodb驱动
            ->collection("user") // 数据库集合
     		->paginate(\request("limit",15));
        return $this->resData($data->items(),$data->total());
```

案例：https://learnku.com/articles/2560/using-mongodb-in-laravel

## laravel8广播+pusher

> 使用广播之前自行安装好前端脚手架

第一先注册一个`pusher` 账号：https://pusher.com/

创建应用，获取api信息，填入`.env`文件中，并修改驱动为`pusher` 

```env
PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_APP_CLUSTER=mt1

BROADCAST_DRIVER=pusher
```

### 安装`pusher驱动`

```bash
composer require pusher/pusher-php-server "~4.0"
```

在 resources/js/bootstrap.js 文件中实例化 Echo 对象时 pusher

```js
import Echo from 'laravel-echo';

window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.MIX_PUSHER_APP_KEY, //这里修改为 pusher 的key
    cluster: process.env.MIX_PUSHER_APP_CLUSTER, //pusher的地区
    forceTLS: false
});
```

创建Free事件，检验pusher是否配置ok

```php
php artisan make:event Free
```

编辑Free事件

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

class Free implements ShouldBroadcast //实现广播接口
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    
    public $msg;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($msg)
    {
        $this->msg = $msg;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
//        return new PrivateChannel('channel-name');
        return new Channel('cctv1'); //公有频道名称
    }
}

```

路由出发Free事件

```php
Route::get('/free', function () {
    event(new \App\Events\Free("Hello OrangBus"));
    dd("ok");
});
```

接听消息

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{ mix("css/app.css") }}">
    <title>Document</title>
</head>
<body>
<div id="app">
    <h1>pusher</h1>
</div>

<script src="{{ mix("js/app.js") }}"></script>
<script>
    window.Echo.channel('cctv1')
        .listen('Free', e => {
            console.log(e);
        });
</script>
</body>
</html>
```

如果按照上面的步骤跑完了没有监听到数据：

1、pusher推动延迟了，等一会或者多刷新几次

2、pusher配置哪里出错了

## laravel8广播+websocket

### 安装laravel 和前端脚手架

```bash
laravel new websocket

// laravel8新出的（不会用）
composer require laravel/jetstream

php artisan jetstream:install livewire // blade模板
php artisan jetstream:install inertia //vue模板

// 可以使用脚手架
composer require laravel/ui --dev

// 生成基本脚手架...
php artisan ui bootstrap
php artisan ui vue
php artisan ui react

// 生成 登陆/注册 脚手架...
php artisan ui bootstrap --auth
php artisan ui vue --auth
php artisan ui react --auth

npm i && npm run dev

// 热加载 webpack.mix.js
mix.browserSync('redis.test');
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

修改 `config/broadcasting.php` （记得要配置这里，不然接受不到消息）

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
    key: process.env.MIX_PUSHER_APP_KEY, //把 .env文件的信息复制过来
    cluster: process.env.MIX_PUSHER_APP_CLUSTER, //把 .env文件的信息复制过来
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

## laravel8广播-redis

### 安装redis广播库

```bash
composer require predis/predis
```

### 安装前端依赖

```bash
npm install --save socket.io-client
npm install --save laravel-echo pusher-js
npm install -g laravel-echo-server

npm i && npm run watch

laravel-echo-server init
laravel-echo-server start
```

在入口文件中添加这个 `socket.io` 

```javascript
 <script src="//{{ Request::getHost() }}:6001/socket.io/socket.io.js"></script>
```

修改`.env`

```env
BROADCAST_DRIVER=redis
CACHE_DRIVER=file
QUEUE_CONNECTION=sync
```

### 开启广播

config/app.php 的 providers取消注释

```php
App\Providers\BroadcastServiceProvider::class,
```

### 创建一个公有广播事件

```bash
php artisan make:event Free
```

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

class Free implements ShouldBroadcast //实现广播接口
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    
    public $msg;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($msg) //触发时间传递过来的参数
    {
        $this->msg = $msg;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('cctv'); //频道的名称
    }
}

```

#### 添加一条路由触发事件

```php
Route::any('/free', function () {
    $msg = request()->input("msg");
    event(new \App\Events\Free($msg));
    return $msg;
});
```

#### 监听事件

记得在入口文件处添加header头

```html
<meta name="csrf-token" content="{{ csrf_token() }}">
```

```js
//resources/js/bootstrap.js
import Echo from "laravel-echo";

// window.io = require('socket.io-client'); //按照官网的意思需要加上，可是我加上了却监听不到消息，搞了好多天无意间注释了反而接收到消息了，有没有大佬告知一下为什么？？

window.Echo = new Echo({
    broadcaster: 'socket.io',
    host: window.location.hostname + ':6001' //如果需要单独写其他域名不用加http，
    // host: "redis.test:6001"
    //可选
    auth: {
    headers: {
      Authorization: "Bearer " + Cookies.get('access_token')
    }
  }
});

window.Echo.channel('cctv') //频道的名称
    .listen('Free', (e) => { // 监听的事件
        console.log("这里是接受到的消息")
        console.log(e);
    });
```

### 私有广播事件

先登录一个账号，私有广播需要权限认证

#### 创建一个广播事件

```bash
php artisan make:event LetChat
```

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

class LetChat implements ShouldBroadcast //事件广播接口
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
 
    public $msg; //前端传递过来的数据
    public $user_id; //假如传递一个用户ID

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($msg,$user_id)
    {
        $this->msg = $msg;
        $this->user_id = $user_id;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('cctv.'.$this->user_id); // 这里是一个私有的广播，频道的名称大概是这样的： cctv.1
    }
}

```

#### 添加一个触发路由

```php
Route::any('/free', function () {
    $msg = request()->input("msg");
    $userId = Auth::id();
    event(new \App\Events\Free($msg,$userId));
    return $msg;
})->middleware("auth"); // 用户需要登录
```

#### 权限认证

这个文件跟 `routes/web` 路由是类似的，只有返回 `true` 的时候才会进行广播事件，所以我们可以在这里进行一些逻辑上的判断

```php
// routes/channels
Broadcast::channel('cctv.{id}', function ($id) {
    // 写一些判断逻辑，最终返回true即可
    $list = [1,2,3,4,5,6];
    if(in_array($id,$list)) return true; //当传过来的用户id在 $list 这个才会进行广播
});
```

####  前端监听事件

```js

```

### 广播使用redis

```env
BROADCAST_DRIVER=redis
CACHE_DRIVER=redis
QUEUE_CONNECTION=redis
```

需要运行队列监听

```bash
php artisan queue:listen
```



## 广播使用注意事项

### 前端没有接收到消息

1、检查此文件是否配置正确。

```javascript
import Echo from 'laravel-echo';

// window.io = require('socket.io-client'); // 这个玩意好像没用，但是官网说要引入他

window.Echo = new Echo({
    broadcaster: 'socket.io',
    host: window.location.hostname + ':6001',
    enabledTransports: ['ws','wss'], //如果你的消息发送失败多半是因为这个
});
```

2、使用redis作为消息驱动

```
BROADCAST_DRIVER=redis
CACHE_DRIVER=redis
QUEUE_CONNECTION=redis
SESSION_DRIVER=redis
SESSION_LIFETIME=1200
```

3、入口文件引入`scoket,io` js文件

```
<script src="//{{ Request::getHost() }}:6001/socket.io/socket.io.js"></script>
```

4、命令行中查看 `Channel` 和 `Event:xxxx` 是否执行正确，默认laravel会给channel加上一个前缀，可以打开 `config/app.php` ,把下面这样注释了。

```php
'prefix' => env('REDIS_PREFIX', Str::slug(env('APP_NAME', 'laravel'), '_').'_database_'),
```

5、以上配置还是不行，检查查看laravel版本，寻找对应版本的文档在走一一边，还是不行就放弃吧，哈哈哈哈。



## laravel广播+redis+laradock

启动`laravel-echo-serve` 

```bash
cd pathTo/laradock
docker-composer up -d redis laravel-echo-serve
```

默认就开始了 6001端口，这样我们就可以连接了



## Laradock+Laravel+redis广播

```bash
laravel new webscoket

composer require predis/predis

composer require laravel/ui --dev
php artisan ui vue --auth

npm install --save socket.io-client |  echo 'websocket 客户端'
npm install --save laravel-echo     |  echo 'websocket 客户端封装'
npm install -g laravel-echo-server  |  echo 'websocket 服务端'
npm install                         |  echo '安装所有其他依赖'
npm run watch                        |  echo '监控文件变化编译前端资源'
laravel-echo-server init             |  echo '初始化 websocket 服务端'
laravel-echo-server start            |  echo '启动 websocket 服务端'

// 热加载 webpack.mix.js
mix.browserSync('redis.test');
cnpm install browser-sync browser-sync-webpack-plugin@2.0.1 --save-dev --production=false

```

.env 文件配置

```env
BROADCAST_DRIVER=redis
CACHE_DRIVER=redis
QUEUE_CONNECTION=redis
```



### 注意事项

1、使用 `php-worker` 的时候，需要开启redis扩展。

2、最好把 `workspace` 的PHP 的 redis 扩展也安装了。

## 广播使用总结

### 1、共有广播

只要监听公有广播，则监听的用户都可以收到广播发送的消息。

### 2、私有广播

- 需要登录才能收到消息

- 可以做一对一聊天，通过channel路由进行授权

  默认有一个 `$user` 表示监听该频道的用户

  ```php
  // 私有消息
  Broadcast::channel('privateChannel.{toId}', function ($user,$toId) {
      // 如果监听的用户是我发送消息的用户，则该用户可以接受消息
      if ($user->id == $toId) return true; 
      return false;
  });
  ```

  ```javascript
  //我自己监听我自己的频道，别人发消息到我的频道，我就可以收到别人给我发的消息了
  window.Echo.channel("private-privateChannel.{{ auth()->id() }}") // 频道名称
      .listen("PrivateMessage",(res)=>{ // 事件名称
      console.log("下面是接收到的消息")
      console.log(res)
      $("#list").append(`<div class="col-md-12">
  <div class="alert alert-success " role="alert">
  <strong>${res.formUser.username}:</strong>${res.msg}
  </div>
  </div>`)
  })
  ```

### 3、presence频道

- 必须登录

- 多人聊天

  ```javascript
  // 监听消息，user:当前进入的用户
  window.Echo.join("room.{{ $room_id }}")
      .here((user) =>{
      console.log("here：已经在聊天室的小伙伴")
      console.log(user)
  })
      .joining((user)=>{
      // orangbus 进入了聊天室
      console.log("joining：某个用户进来会收到什么消息")
      console.log(user)
  })
      .leaving((user)=>{
      // orangbus 离开了聊天室
      console.log("leaving：某个用户离开了")
      console.log(user)
  })
  ```


## 广播遇到的文件

> Unable to join channel. Member data for presence channel missing







## laravel中使用mongodb数据库

github：https://github.com/jenssegers/laravel-mongodb

# laradock使用elasticsearch

```bash
sudo sysctl -w vm.max_map_count = 262144
```

## MeiliSearch搜索

安装Scout

```bash
composer require laravel/scout

composer require meilisearch/meilisearch-php http-interop/http-factory-guzzle

php artisan vendor:publish --provider="Laravel\Scout\ScoutServiceProvider"
```

model 配置

```php
# 模型中user
use Searchable;

/**
     * 获取与模型关联的索引的名称。
     *
     * @return string
     */
public function searchableAs()
{
    return 'users_index';
}
```



`scout.php` 

```
'meilisearch' => [
    'host' => env('MEILISEARCH_HOST', '127.0.0.1:7700'),
]
```

```
# .env

# 搜索配置
SCOUT_QUEUE=true # 使用队列
SCOUT_IDENTIFY=true # 识别用户
SCOUT_DRIVER=meilisearch
MEILISEARCH_HOST=http://192.168.3.5:7700
MEILISEARCH_KEY=
```

导入索引

```
php artisan scout:import "App\Models\Post"

// 删除
php artisan scout:flush "App\Models\Post"
```

搜索

```php
$data = Joke::where("id","<",460)->searchable();
```

## elasticsearch 搜索





# minio文件上传

安装依赖,(记得限制版本，不然安装会出错)

```bash
composer require league/flysystem-aws-s3-v3 ~1.0
composer require league/flysystem-cached-adapter ~1.0

// laravel9
composer require -W league/flysystem-aws-s3-v3 "^3.0"
```

> config/filesystems.php

```
<?php
return [
    // ...
    'cloud' => env('FILESYSTEM_CLOUD', 's3'),
    'disks' => [
        // ...
        'minio' => [
            'driver' => 's3',
            'endpoint' => env('MINIO_ENDPOINT', 'http://127.0.0.1:9005'),
            'use_path_style_endpoint' => true,
            'key' => env('AWS_KEY'),
            'secret' => env('AWS_SECRET'),
            'region' => env('AWS_REGION'),
            'bucket' => env('AWS_BUCKET'),
        ],
    ],
];
```

> .env

```.env
# Minio config

AWS_ACCESS_KEY_ID=orangbus
AWS_SECRET_ACCESS_KEY=orangbus
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=laravel
AWS_ENDPOINT=http://ip:9000
CDN_HOST=http://ip:9000
AWS_USE_PATH_STYLE_ENDPOINT=false
```

如果生成的地址无法访问，请检查当前 `Buckets` 的 `Access Policy：public` 即可。

### laravel文件上传案例

```php
<?php

namespace App\Http\Controllers\common;

use App\Enum\GlobalEnum;
use App\Exceptions\BusinessException;
use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Merchant;
use App\Models\MerchantConfig;
use App\Models\SmsCode;
use App\Service\UtilService;
use Illuminate\Support\Facades\Storage;

/**
 * 一些公共的接口：文件上传，发送验证码等
 */
class Index extends Controller
{
    /**
     * 获取用户存储信息
     * @return string
     */
    public function getDistType($fileType="image"){
        switch ($fileType){
            case "image":
                $disk = "images";
                break;
            case "video":
                $disk = "videos";
                break;
            case "audio":
                $disk = "audios";
                break;
            case "private": //重要文件
                $disk = "private";
                break;
            default:
                $disk = "others";
                break;
        }
        return '/'.$disk;
    }

    /**
     * 文件存储方式
     * @return string
     */
    public function getOssType()
    {
        return 'minio'; // minio
    }

    /**
     * 获取下载链接
     * @param $backet
     * @param $path
     * @return string
     */
    public function getUrl($backet,$path)
    {
        if (empty($backet)) {
            return GlobalEnum::fileCdnHost()."/". $path;
        }
        return GlobalEnum::fileCdnHost()."/".$backet."/". $path;
    }

    public function upload()
    {
        $file = request()->file("file");
        if (empty($file)) {
            return $this->error("请选择文件");
        }
        // 非空判断
        if (!$file->isValid()) return $this->error("无效文件！");
        if (!$file->isFile()) return $this->error($file->getErrorMessage());
        $fileType = explode("/", $file->getClientMimeType())[0];
        //文件类型,【将重要的文件单独存放】
        $ext = $file->getClientOriginalExtension();
        if (in_array($ext,GlobalEnum::importanceFileTypeList())) {
            $fileType = "private";
        }

        // 上传文件大小限制为2m
        $fileSize = round($file->getSize()/1024,2);
        if ($fileSize > 3 * 1024) return $this->error("文件大小不能超过3M");

        // 非登录用户禁止上传文件
        $user = request()->user();
        if (is_null($user)) {
            return $this->error("禁止上传文件");
        }

        $backet = GlobalEnum::backetName(); // 存储卷
        $disk = $this->getDistType($fileType);
        if ($fileType == 'private') {
            $path = Storage::disk($this->getOssType())->putFileAs($disk, $file,$file->getClientOriginalName());
        }else{
            $path = Storage::disk($this->getOssType())->put($disk, $file);
        }
        
        return $this->success("文件上传成功！", [
            "name" =>  $file->getClientOriginalName(),
            "size" => ($file->getSize() / 1024*1024),
            "url" => $this->getUrl($backet,$path),
            "fileType" => $fileType
        ]);
    }

    /**
     * @param filename 绝对路径: /image/orangbus.png
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete()
    {
        $fileName = request()->input("filename");
        if (empty($fileName)) return $this->error("文件名不能为空");
        $explode = explode("/", $fileName);
        $fileName = "/".implode("/",array_splice($explode,4,6));
        Storage::disk($this->getOssType())->delete($fileName);
        return $this->success("删除成功！");
    }
}

```



### 扩展包推荐

发送钉钉消息（钉钉机器人）：https://github.com/wowiwj/ding-notice

# templet模板

## 路由

增删路由： @curd-router

```php
Route::get("list", [$controller$, "list"]); //列表
Route::post("store", [$controller$, "store"]); // 添加、编辑
Route::post("delete", [$controller$, "delete"]); //删除
```

增删改查分组路由： @curd-router-group

```php
Route::group(["prefix" => "$prefix$"], function () {
    Route::get("list", [$controller$, "list"]); //列表
    Route::post("store", [$controller$, "store"]); // 添加、编辑
    Route::post("delete", [$controller$, "delete"]); //删除
});
```



## 增删改查

增删改查： @curd

```php
public function list($model$ $alias$){
    $data = $cate->getList();
    return $this->resData($data->items(),$data->total());
}

public function store()
{
    $param = $this->request->all();
    $id = 0;
    if (isset($param['id']) && !empty($param['id'])) {
        $id = $param['id'];
    }
    $param['uid'] = $this->request->user()->id;
    $model$::updateOrCreate(["id"=>$id],$param);
    $msg = empty($param['id']) ? '添加成功': '更新成功';
    return $this->success($msg);
}

public function delete()
{
    $ids = $this->request->input("ids",[]);
    if (count($ids) == 0) $ids[] = $this->request->input("id");
    if (count($ids) == 0) return $this->error("请选择删除数据");
    $model$::whereIn("id",$ids)->delete();
    return $this->success("删除成功");
}
```

## 模型方法

获取列表数据： @getList

```php
public function getList($where=[])
{
    return $this->where($where)->paginate($this->getLimit());
}
```

## 返回

数据返回： resdd

```php
return $this->resData($data->items(),$data->total());
```

成功返回： res-success

```php
return $this->success($msg$);

enum("success","删除成功",'添加成功','保存成功','更新成功','修改成功')
```

失败返回： res-error

```php
return $this->error($msg$);

enum("error","删除失败",'添加失败','保存失败','更新失败','修改失败','参数错误')
```

# 远程一对一关系

远程一对一关联通过一个中间关联模型实现。

例如，如果每个供应商都有一个用户，并且每个用户与一个用户历史记录相关联，那么供应商可以通过用户访问用户的历史记录，让我们看看定义这种关系所需的数据库表：

```
users

  id - integer

  supplier_id - integer



suppliers

  id - integer



history

  id - integer

  user_id - integer
```

```php
 * 第一个参数是希望访问的模型名称，

     * 第二个参数是中间模型的名称。

     * 方法传递第三个和第四个参数实现，

     * 第三个参数表示中间模型的外键名，

     * 第四个参数表示最终模型的外键名。

     * 第五个参数表示本地键名，

     * 而第六个参数表示中间模型的本地键名：

     * 'App\History',

* 'App\User',

* 'supplier_id', // 用户表外键

* 'user_id', // 历史记录表外键

* 'id', // 供应商本地键

* 'id' // 用户本地键
public function userHistory()
{
    return $this->hasOneThrough('App\History', 'App\User');
}         
```

## 远程一对多

课程表  -> 中间表 -> 老师表

```php
public function teacher()
{
    return $this->hasManyThrough(
        Teacher::class, // 远程表
        CourseRoleTeacher::class, // 中间表
        "course_id", // 【中间表】对主表的关联字段
        "id", // 【远程表】对中间表的关联字段
        "id", // 【主表】对中间表的关联字段
        "teacher_id" // 【中间表】对远程表的关联字段
    );
}
```



# 全局作用于

方式一(匿名函数)：

```php
$user = \Auth::user();
        if (!empty($user->provider) && GlobalEnum::inNeedQuarantine($user->provider)) {
            static::addGlobalScope("mer_id", function (Builder $builder) use ($user) {
                $builder->where("mer_id", $user->mer_id);
            });
            // 触发保存的时候自动添加上 mer_id,数据已经整理完毕，但是还没有写入数据库触发
            static::saving(function ($model) use ($user) {
                $model->mer_id = $user->mer_id;
            });
        }
```

方式二

```php
<?php
/**
 * Created by OrangBus
 * User email: orangbus40400@gmail.com
 * website: orangbus.cn
 * blog: doc.orangbus.cn
 * github: github.com/orangbus
 */

namespace App\Scopes;

use App\Enum\GlobalEnum;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;

class MerScope implements Scope
{
    /**
     * 商户的数据隔离
     * @param Builder $builder
     * @param Model $model
     * @return void
     */
    public function apply(Builder $builder, Model $model)
    {
        $user = request()->user();
        if (!empty($user->provider) && GlobalEnum::inNeedQuarantine($user->provider)) {
            $builder->where("mer_id", $user->mer_id);
            // 触发保存的时候自动添加上 mer_id,数据已经整理完毕，但是还没有写入数据库触发
            $model->mer_id = $user->mer_id;
        }
    }

}

```

```php
<?php

namespace App\Models;

use App\Enum\GlobalEnum;
use App\Scopes\MerScope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BaseModel extends Model
{
    use HasFactory;

    /**
     * 全局查询作用域
     * 主要作用：当用户保存数据或者查询数据的时候，自动的添加一个 mer_id 字段限制
     * @var array
     */
    protected static function booted()
    {
        parent::booted();
        static::addGlobalScope(new MerScope());
    }
```

# Horizon 队列管理工具

```bash
composer require laravel/horizon

php artisan horizon:install
```

启动

```bash
php artisan horizon
 $this->notice->next_time = (time() + $this->notice->minute * 60); // 下次更新时间
  $this->notice->notice_count += 1;
```



访问：http:// ip/horizon



> laravel/horizon[v5.9.0, ..., 5.x-dev] require ext-pcntl * -> it is missing from your system. Install or enable PHP's pcntl extension.
>
>     - Root composer.json requires laravel/horizon ^5.9 -> satisfiable by laravel/horizon[v5.9.0, ..., 5.x-dev]

```
// composer.json

"config": {
        "platform": {
            "ext-pcntl": "8.0",
            "ext-posix": "8.0"
        }
    },
```

# laravel9-时区不对

在模型中添加

```php
use DateTimeInterface;

/**
     * 为数组 / JSON 序列化准备日期。
     *
     * @param \DateTimeInterface $date
     * @return string
     */
    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format($this->dateFormat ?: 'Y-m-d H:i:s');
    }
```

`config/app.php`时区设置

```php
 'timezone' => 'PRC', // 中国的时间
 'locale' => 'zh_CN',
```

# laravel按日期时间分组并统计

## 统计七天内注册用户数量按天进行分组

```php
$user = DB::table('users')->whereBetween('created_at',['2018-01-01','2018-01-07'])
        ->selectRaw('DATE(created_at) as date,COUNT(*) as value')
        ->groupBy('date')->get();
```

## 统计一年内注册用户数量按月份进行分组

```php
$user = DB::table('users')->whereBetween('created_at',['2018-01-01','2018-12-31'])
        ->selectRaw('DATE_FORMAT(created_at,"%Y-%m") as date,COUNT(*) as value')
        ->groupBy('date')->get();
```

# laravel9运行webpack出错

> [webpack-cli] Error: Cannot find module 'webpack/lib/rules/DescriptionDataMatcherRulePlugin'

```bash
npm update vue-loader

npm i vue-loader --save

```







