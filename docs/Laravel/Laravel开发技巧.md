## 插入多条数据 (insert)

多条数据插入不会自动写入时间戳，需要自己添加上

```php
$array = [
    ["name"=>"orangbus","age"=18],
    ["name"=>"orangbus","age"=18],
    ["name"=>"orangbus","age"=18,"created_at"=>time(),"updated_at"=>time()],
];

User::insert($array);
```

## 随机查询（inRandomOrder）

```php
User::inRandomOrder()->get();
```



## 设置faker中文

打开 `app\Providers\AppServiceProvider.php`

```php
<?php

namespace App\Providers;

use Faker\Factory;
use Faker\Generator;
use Illuminate\Support\ServiceProvider;
use Illuminate\Pagination\Paginator;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // faker中文
        $this->app->singleton(Generator::class,function () {
            return Factory::create('zh_CN');
        });
        // 使用bootstrap分页样式
         Paginator::useBootstrap();
    }
}

```

## laravel多对多关联

> 我们现在有三张关联表，users表通过user_roles去查询roles里面的数据
>
> 场景：一个用户有多个角色，一篇文章有多个标签属性，但是角色和属性是公共的

联的表结构：

```
users
    id - integer
    name - string

roles
    id - integer
    name - string

user_roles
    id - integer
    user_id - integer
    role_id - stringCopy
```

模型结构

| 参数位置 | 参数名           | 定义                       |
| :------: | ---------------- | -------------------------- |
|    1     | $related         | 关联模型的类名             |
|    2     | $table           | 中间表名                   |
|    3     | $foreignPivotKey | 当前模型在中间表里的字段名 |
|    4     | $relatedPivotKey | 关联模型在中间表里的字段名 |

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    //获取用户的权限
    public function role(){
            return $this->morphToMany('App\Models\Role', '中间表明（user_roles）,'user_id','role_id');
        }
    }
}
```