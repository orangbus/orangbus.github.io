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
      // ...
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
faker_locale = 'zh-CN'
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
```



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

composer require meilisearch/meilisearch-php

php artisan vendor:publish --provider="Laravel\Scout\ScoutServiceProvider"

# 模型中user
use Searchable;
```

`scout.php` 

```
'meilisearch' => [
    'host' => env('MEILISEARCH_HOST', '127.0.0.1:7700'),
]
```

```
# .env

SCOUT_DRIVER=meilisearch
MEILISEARCH_MASTER_KEY=xxx
MEILISEARCH_HOST=http://xxxx:7700
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

