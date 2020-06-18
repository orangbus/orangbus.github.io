---
title: Thinkphp学习笔记
sidebar: auto
---

### Thinkphp学习笔记

扩展包推荐

```
composer require thans/tp-jwt-auth

composer require yunpian/yunpian-php-sdk

composer require overtrue/wechat

phpoffice/phpspreadsheet //excel表单处理
```

## 查询技巧

```php
$data = Score::alias('s')
    ->join("gift g",'s.sid=g.id')
    ->field("g.id,g.title,g.pic,s.stime") //需要那个表的字段就假如对应表的字段
    ->where("uid",$request->uid)
    ->limit(($page * $limit) - $limit, (int)$limit)
    ->select()->toArray();
```

## 插入并返回插入id

```php
$resId = Mode::insertGetId();
```

## 别名查询

```php
$data = Articles::where("del",0)
            ->alias('a')
            ->join('wy_comment c','a.id=c.aid')
            ->field("a.id,a.title,,COUNT(c.aid) as comCount")
            ->limit(($page * $limit) - $limit, (int)$limit)
            ->order("id","desc")->select()->toArray();
            
$data = Articles::where("del",0)
            ->field("id,title,keyword,pic,createtime,click")
            ->limit(($page * $limit) - $limit, (int)$limit)
            ->withCount('ArcToCom')
            ->order("id","desc")->select()->toArray();
            
//关联查询
 ->with(['user','parent'])
 ->visible(['user'=>['realname'],'parent'=>['realname']])
 
//关联统计


http://localhost:8082/ArticleDetail?eid=26&puid=100
```

## 去重查询并统计人数

```php
Gw::where("gwssd",$defaultGwssd)
    ->field("id,zldw,SUM(zlrs) as zlrs")
    ->group("zldw")
    ->withCount("zw") //关联方法
    ->select()->toArray();
```



## 多字段统计

```php
->fieldRaw('Sum(prize_value) as totle,SUM(unum) as unum')
```

## 二维数组排序

```php
$dataKey = array_column($data,"team_count");
array_multisort($dataKey,SORT_DESC,$data);

array_multisort(array_column($Account,'px'),SORT_ASC,$Account);
```



## JWT-AUTH使用方发

> https://gitee.com/thans/jwt-auth

中间件形式:

```php
// app/config/middleware

'alias'    => [
        "Auth" => thans\jwt\middleware\JWTAuth::class,
    ],
```

```
// controller
protected $middleware = ['Auth'];
```

```
$user = [
	"name" => "orangbus"
];
```

```
// thans/tp-jwt-auth/src/claim/Expiration 15行修改
return ["code" => 1,"msg" => "token已失效!"];
```

- 获取toke

  ```
  $token = JWTAuth::builder($user);
  echo $token['name']; // orangbus
  ```

- 验证token

  ```
  //登录验证
  JWTAuth::auth();
  
  // token验证
  JWTAuth::validate()
  ```

- 刷新token

  ```php
  JWTAuth::refresh(); //返回 token信息,之前的数据依旧存在
  ```

### ip地址

```
$request->server("REMOTE_ADDR")
$request->server("REMOTE_ADDR")
```

### 跳转

```javascript
this.$router.push({
    path:'/ArticleUser',
    query:{
        eid:this.eid,
        pid: this.pid
    }
})
```

### 请求返回

```javascript
// ld
let data = {
    vid: ID
}
// resd
let data = res.data;
if (data.code == 1){
    console.log(data.data)
    this.info = data.dta;
}else{
	layer.msg(data.msg);
}



```

### 时间处理

> http://momentjs.cn/

```js
npm install moment --save

//时间戳转时间
import moment from "moment";
filters: {
    //时间戳转时间
    formatDate(time) {
    return moment(parseInt(time * 1000)).format('YYYY-MM-DD hh:mm:ss');
    }
},
```

## vue处理时间戳转如期方法

```javascript
yarn add moment --save
# use
{{item.change_time | formatDate}}

import moment from "moment";

filters:{
    //时间戳转时间
    formatDate(time) {
        return moment(parseInt(time*1000)).format('YYYY-MM-DD HH:mm:ss');
    },
},
```

## 如何获取 v-for 的某个值

```js
@click="show(index)"

show:function(){
	this.lists[index].val
}
```

## 别名查询

```php
$data = Articles::where("del",0)
        ->alias('a')
        ->join('wy_comment c','a.id=c.aid')
        ->field("a.id,a.title,,COUNT(c.aid) as comCount")
        ->limit(($page * $limit) - $limit, (int)$limit)
        ->order("id","desc")->select()->toArray();
            
$data = Articles::where("del",0)
        ->field("id,title,keyword,pic,createtime,click")
        ->limit(($page * $limit) - $limit, (int)$limit)
        ->withCount('ArcToCom')
        ->order("id","desc")->select()->toArray();
            
//关联查询
 ->with(['user','parent'])
 ->visible(['user'=>['realname'],'parent'=>['realname']])
 
//关联统计

```

## 多字段统计

```php
->fieldRaw('Sum(prize_value) as totle,SUM(unum) as unum')
```

## 二维数组排序

```php
$dataKey = array_column($data,"team_count");
array_multisort($dataKey,SORT_DESC,$data);

array_multisort(array_column($Account,'px'),SORT_ASC,$Account);
```

## 字段非空

```
if (empty($name)) return json(["code"=>2,'msg'=>"请输入投票人名字或者编号！"]);
```

## 验证器使用

```php
/**
     * 验证数据正确
     * @param array $data
     * @param string $scene
     * @param bool $batch
     * @return array|bool
     */
    private function checkNull($data=[],$scene='',$batch=false)
    {
        $code = 2;
        $msg = '';
        try {
            validate(VoteValidate::class)
                ->batch($batch)
                ->scene($scene)
                ->check($data);
            $code = 1;
        }catch (ValidateException $e){
            $msg = $e->getMessage();
        }
        if ($code == 1){
            return true;
        }else{
            return [
                "code"=>$code,
                'msg'=>$msg
            ];
        }
    }

```

## 搜索

```PHP
$page = empty($request->param('page')) ? 1 : $request->param('page');
$limit = empty($request->param('limit')) ? 15 : $request->param('limit');
$search = $request->param('search_word');
 $where = [];
 $where[]=["vid","=",$vid];
 if (!empty($search)){
 	$where[]=['fullname','like',"%$search%"];
 }
$data = VoteBm::where($where)
            ->limit(($page * $limit) - $limit, (int)$limit)
            ->order("id","desc")->select()->toArray();
        if (!empty($data)){
            $list = [];
            foreach ($data as $v){
                $v['bmtime'] = date("Y-m-d H:i:s",$v['bmtime']);
                $list[] = $v;
            }
        }
        $count = VoteBm::where($where)->count();
        return json([
            "code" => 0,
            "msg" => "数据加载成功！",
            "data" => $list,
            "count" => $count,
            "vid" => $vid
        ]);
```

## 一次性插入大量数据处理

```php
$count = ceil(count($data)/500);
    for ($h=1;$h<$count+1;$h++){
        $offset=($h-1)* 500;
        $ids=array_slice($data,$offset,500);
        Gw::insertAll($ids);
    }
```

