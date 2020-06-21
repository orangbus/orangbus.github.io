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

### join

```php
$data = Score::alias('s')
    ->join("gift g",'s.sid=g.id')
    ->field("g.id,g.title,g.pic,s.stime") //需要那个表的字段就假如对应表的字段
    ->where("uid",$request->uid)
    ->limit(($page * $limit) - $limit, (int)$limit)
    ->select()->toArray();
```

### 别名查询

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

### 关联查询

```php
 ->with(['user','parent']) //模型关联方法，不是模型的名字
 ->visible(['user'=>['realname'],'parent'=>['realname']])
```



## 插入并返回插入id

```php
$resId = Mode::insertGetId();
```

## 去重查询并统计人数

```php
Gw::where("gwssd",$defaultGwssd)
    ->field("id,zldw,SUM(zlrs) as zlrs")
    ->group("zldw")
    ->withCount("zw") //关联方法
    ->select()->toArray();
```

## 时间转化

```php
 $data['bmstime'] = strtotime($data['bmstime']);
 date('Y-m-d H:i:s',$data['bmstime']);
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

## Php处理Excel

> https://phpspreadsheet.readthedocs.io/en/latest/#getting-started

```php
public function importDo(Request $request)
    {
        $excelFile = $request->file("file");
        $check = new ValidateCheck();
        $checkRes = $check->checkNull(["uploadExcel"=>$excelFile],'excel');
        if ($checkRes !== true) return json($checkRes);
        $year = $request->param("year");

        $objRead = IOFactory::createReader('Xlsx');
        if (!$objRead->canRead($excelFile)) {
            $objRead = IOFactory::createReader('Xls');
            if (!$objRead->canRead($excelFile)) {
                return resMsg(0, '只支持导入Excel文件！', 'reserve' );
            }
        }
        $objPHPExcel = $objRead->load($excelFile);  //$file可以是上传的表格，或者是指定的表格
        $sheet = $objPHPExcel->getSheet(0);   //excel中的第一张sheet
        $highestRow = $sheet->getHighestRow();       // 取得总行数
        $i = 0; //无效数据
        $k=0; //有效数据
        $rem='';
        for ($j = 2; $j <= $highestRow; $j++) { //从第几行开始导入
            $data[$k] = [
                'id' => $objPHPExcel->getActiveSheet()->getCell("A" . $j)->getValue(),
                'name' => $objPHPExcel->getActiveSheet()->getCell("B" . $j)->getValue(),
                'content' => $objPHPExcel->getActiveSheet()->getCell("C" . $j)->getFormattedValue(),
                'year' => $year,
                'create_time' => time(),
            ];
            $k++;
        }
        //排除空值
        foreach ($data as $j => $v){
            if ($v['code'] == null){
                unset($data[$j]);
                $i +=1;
            }
        }
        try {
            Bm::insertAll($data);
        }catch (\ErrorException $e){
            return resMsg(2, $e->getMessage(),'index' );
        }
        if($i !== 0){
            return resMsg(1, '导入成功！总计导入'.$k.'条数据！,本次Excel存在无效数据'.$i.'条，岗位代码为空！','index' );
        }else {
            return resMsg(1, '导入成功！本次导入数据总计'.$k.'条','index' );
        }
    }
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

### 