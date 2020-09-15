```php
// 二维码生成
$site_murl=SystemSite::where('id',1)->value('site_murl');
$url='http://'.$site_murl.'/webView/webView?goUrl=%2findex%2fGwgl%2findex';

<a href="{$url}" class="layui-btn" id="qrcode"><i class="layui-icon">&#xe609;</i>去分享</a>
    
git@gitee.com:orangbus/easy-chart.git
    git@gitee.com:orangbus/vue-chart.git
```

## 9-8

- [ ] 打卡用户还没有删除

- [x] 针对对某个活动的【奖励天数】必须唯一

- [ ] ``` 
  share_open_uid -> pid 分享人的id
  ```

- [ ] 打卡活动列表页面统计报名人数



## 8-29

Course/zwList





## 8-28测试

积分兑换礼品 -> 波币兑换了5钱包

直接推荐购买  -> 推广收益显示二级 





# 8-25

更新内容：

1. 大转盘列表接口，每个转盘活动对应一个客服。

2. 新增后台选座可以指定用户表的用户进行课程开通和选座。（新增的选座只是开启当前这个班级关联的课程，新增选座确定后，既完成该班级关联课程开通，又对选择的学员进行指定占座）

3. 新增：KsrlYear数据表，修改 Ksrl表结构。

   

修改内容

1. 考试日历移动端页面整改，新增年份选择。
2. 考试日历的考试时间和报考时间修改为时间戳的格式储存。
3. 座位详情的用户信息来自订单表。
4. 修改面授课程关联班级异常报错，主要问题有：当课程关联班级时，全部取消关联班级报错。



**测试新问题暂未修复：**

1. 考试日历排序 --未修改

2. RoomBj/newSeatDo 

   ```
   where("uid",$user_id)
   ```

3. 考试日历删除： `if (this.month[index].id == this.month_id){return false;}`





# 8-18完成任务清单

1. 国考查询: 前段 + 后端

2. 购买课程占座: 

   后台: 创建教室,班级,课程关联班级,指定选座,取消选座,更换座位;

   前端: 页面渲染

3. 毕业信息查询: 

   主要功能:基本权限管理,导入学生名单, 信息审核

4. 考试日历: 前端 + 后端
5. 课程表,最低分数查询
6. 休息已知问题: 毕业信息审核短信发送, 重构 [成绩查询,录取查询,资料和对,岗位查询,敢为排名,最低分数,国考,考试日历,毕业查询的,课程表] 的微信分享





## 修改

```
course/index -> 备注取消编辑
编辑班级  -> 取消开课时间
RoomBj -> edit -> $data['kk_time'] = date('Y-m-d H:i:s',$data['kk_stime']);

roombj/view/edit -> 
laydate.render({
                elem: '#kk_time' //指定元素
                ,type: 'datetime'
                ,trigger:'click'
            });
            

```

```
room_bj/info -> submitSeat '{$course_id}'

appointSeat
Bj::where("id",$param['bj_id'])->dec("remain",1)->update();
```

---



创建班级添加备注  --- 未添加 ok

关联班级备注 --未添加 ok

```php
//course_bj
public function addDo(Request $request)
    {
        $param = $request->param();
        if (empty($param['course_id'])) return json(["code"=>2,"msg"=>"课程ID不能为空!"]);
        $hadSelectedBj = Bj::where("course_id",$param['course_id'])->order("id desc")->value("bj");
        //第一次创建
        if (empty($hadSelectedBj)){
            $data = [
                "course_id" => $param['course_id'],
                "bj" => $param['selectedBj'],
                "remark" => $param['remark'],
            ];
            try {
                Bj::create($data);
                //修改班级不可用
                RoomBj::where("id","in",explode(",",$param['selectedBj']))->update(["status"=>2]);
            }catch (ErrorException $e){
                return json(["code"=>2,"msg"=>$e->getMessage()]);
            }
            return json(["code"=>1,"msg"=>"创建成功!"]);
        }
        // 更新或者删除
        $hadSelectedBjAyy = explode(",",$hadSelectedBj);
        $paramSelectedBjArr = explode(",",$param['selectedBj']);
        //如果全部取消就直接删除
        if(empty($param['selectedBj'])){
            $delBjids = explode(",",$hadSelectedBj);
            try {
                $countBj = Bj::where("course_id",$param['course_id'])->update(["delete_time"=>time()]);
                $countZw = RoomSeat::where("bj_id","in",$delBjids)->update(["delete_time"=>time()]);
                //取消班级不可用状态
                RoomBj::where("id","in",$delBjids)->update(["status"=>1]);
            }catch (ErrorException $e){
                return json(["code"=>2,"msg"=>$e->getMessage()]);
            }
            return json(["code"=>1,"msg"=>"取消关联".$countBj."个班级,累计删除关联座位:".$countZw]);
        }
        if (count($paramSelectedBjArr) < count($hadSelectedBjAyy)) {
            //删除
            $diffIds = array_diff(explode(",",$hadSelectedBj),explode(",",$param['selectedBj']));
            try {
                $seatCount = 0;
                foreach ($diffIds as $item){
                    $roomRaw = RoomBj::where("id",$item)->with("room")->visible(["room"=>["room"]])->field("name,room_id")->find();
                    if (empty($roomRaw)) return json(["code"=>2,"msg"=>$roomRaw['name']."教室不存在!"]);
                    //更新原始座位表结构
                    RoomBj::transaction(function () use ($roomRaw){
                        RoomBj::where("id",$roomRaw['room_id'])->update(["room"=>$roomRaw['room']['room']]);
                    });
                    $seatNum = RoomSeat::where("bj_id",$item)->update(["delete_time"=>time()]);
                    $seatCount = ($seatCount + $seatNum);
                }
                //更新关联班级信息
                Bj::where("course_id",$param['course_id'])->update(["bj"=>$param['selectedBj']]);
                RoomBj::where("id","in",explode(",",$param['selectedBj']))->update(["remark"=>$param['remark']]);
                //班级可用状态
                RoomBj::where("id","in",$diffIds)->update(["status"=>1]);
            }catch (ErrorException $e){
                return json(["code"=>2,"msg"=>$e->getMessage()]);
            }
            return json(["code"=>1,"msg"=>"取消关联".count($diffIds)."个班级,累计删除关联座位".$seatCount."!"]);
        }
        $diffIds = array_diff(explode(",",$param['selectedBj']),explode(",",$hadSelectedBj));
        try {
            Bj::where("course_id",$param['course_id'])->update(["bj"=>$param['selectedBj']]);
            RoomBj::where("id","in",explode(",",$param['selectedBj']))->update(["remark"=>$param['remark']]);
            //更新班级不可用状态
            RoomBj::where("id","in",$diffIds)->update(["status"=>2]);
        }catch (ErrorException $e){
            return json(["code"=>2,"msg"=>$e->getMessage()]);
        }
        return json(["code"=>1,"msg"=>"更新".count($diffIds)."个关联班级!"]);
    }
```

关联班级传课程id,

如果开启关联课程就显示关联班级,是否开启关联班级

- 关联班级单删除又问题

```
// course_bj -> add
if ($mskc['relation'] == 1){
                //关联一门课程的时候:3,1
                $str = strstr($mskc['relation_content'],"|");
                $mskcIds = [];
                if ($str !== false){
                    $toArray = explode("|",$mskc['relation_content']);
                    foreach ($toArray as $item){
                        $temp = explode(",",$item);
                        if ($temp[0] == 3) $mskcIds[] = $temp[1];
                    }
                }else{
                    $tempIds = explode(",",$mskc['relation_content']);
                    if ($tempIds[0] == 3) $mskcIds[] = $tempIds[1];
                }
                $courseList = EduMskc::where("id","in",$mskcIds)->field("id,title")->select()->toArray();
                return view("",["course_id"=>$courseId,"courseList"=>$courseList]);
            }
```



```
// courseBj
if ($item['remark'] !== ""){
	$v['remark'] = $item['remark'];
}
```



---

```
// CourseBj
public function list(Request $request)
    {
        $courseId = $request->param("course_id/d");
        $mskc = EduMskc::where("id",$courseId)->field("id,title,relation,relation_content")->find()->toArray();
        //是否开启关联售卖
        $mskcIds = [];
        if ($mskc['relation'] == 1){
            $toArray = explode("|",$mskc['relation_content']);
            foreach ($toArray as $item){
                $temp = explode(",",$item);
                if ($temp[0] == 3) $mskcIds[] = $temp[1];
            }
        }else{
            $mskcIds[] = $courseId;
        };
        $bjMaster = Bj::where("course_id",$courseId)->field("id as cid,course_id,bj,remark")->with("mskc")->visible(["mskc"=>["title"]])->find()->toArray();
        $bjNode = Bj::where("course_id","in",$mskcIds)->field("id as cid,course_id,bj,remark")->with("mskc")->visible(["mskc"=>["title"]])->select()->toArray();
        //仅仅只是把主课程排到第一位
        $bj = [];
        $bj[] = $bjMaster;
        foreach ($bjNode as $item){
            $arr[] = $item;
        }
        $list = [];
        foreach ($bj as $item){
            $item['bj'] = RoomBj::where("id","in",explode(",",$item['bj']))->withoutField("room,room_id")->select()->toArray();
            $tempArray = [];
            foreach ($item['bj'] as $v){
                $v['cid'] = $item['cid'];
                $v['course_name'] = $item['mskc']['title'];
                if ($item['remark'] !== ""){
                    $v['remark'] = $item['remark'];
                }
                $tempArray[] = $v;
            }
            $list = array_merge($list,$tempArray);
        }
        return json(["code"=>0,"data"=>$list,"count"=>count($list)]);
    }
```

```
// CourseBj
public function add(Request $request)
    {
        $courseId = $request->param("course_id");
        //获取课程跟关联课程
        $mskc = EduMskc::where("id",$courseId)->field("id,title,relation,relation_content")->find()->toArray();
        if (!empty($mskc['relation_content'])){
            //是否开启关联售卖
            if ($mskc['relation'] == 1){
                //关联一门课程的时候:3,1
                $str = strstr($mskc['relation_content'],"|");
                $mskcIds = [];
                if ($str !== false){
                    $toArray = explode("|",$mskc['relation_content']);
                    foreach ($toArray as $item){
                        $temp = explode(",",$item);
                        if ($temp[0] == 3) $mskcIds[] = $temp[1];
                    }
                }else{
                    $tempIds = explode(",",$mskc['relation_content']);
                    if ($tempIds[0] == 3) $mskcIds[] = $tempIds[1];
                }
                $courseMaster =  EduMskc::where("id",$courseId)->field("id,title")->find()->toArray();
                $courseNode = EduMskc::where("id","in",$mskcIds)->field("id,title")->select()->toArray();
                $courseList = [];
                $courseList[] = $courseMaster;
                foreach ($courseNode as $item){
                    $courseList[] = $item;
                }
                return view("",["course_id"=>$courseId,"courseList"=>$courseList]);
            }
        }
        $courseList = [];
        $courseList[] = $mskc;
        return view("",["course_id"=>$courseId,"courseList"=>$courseList]);
    }
```





## jinji

```
appname = nps
runmode = dev

bridge_type=tcp

bridge_port=8024
bridge_ip=0.0.0.0

public_vkey=orangbus666

web_host=orangbus.cn
web_username=orangbus
web_password=orangbus666
web_port = 8095
web_ip=0.0.0.0
```



---

eduorder  

- sale_type  = 2 是否是关联课程
- ctype=3 面授
- courseid -> mskc -> relation_content [1类型，courseid]  3,3

edu_mskc

- sold_separately

- relation

- relation_content

## 类型

- 1: 无
- 2:可选
- 3:不可选
- 4: 已选 



## 占座

## container



## model





## 数据表

班级：



---

# 国考

> GwglDq/index



## 开始日历

> Ksrl/index





## 毕业信息核对

> Bycx/index

前段：姓名  身份证  手机号  （验证码）



> 2.29 新增、修改内容

新增：

- 课程表添加微信分享设置+分享二维码按钮。
- 国考专栏。
- 考试日历。
- 毕业查询。
- 最低分数查询



修改：

- 修改微信分享表结构，涉及【成绩查询、录取查询、资料核对、岗位管理、排名查询、最低分数下旬、国考、考试日历、毕业查询】的前端分享设置。(后台修改微信分享设置 setting方法，前端修改 siteInfo 方法)
- 优化国考查询。
- 年份管理的model显示字段，后台数据展示页面。
- 数据库修改【student_year】 的 title 字段（字段长度加大）
- 删除 wy_student_config表，以及模型：StudentConfig



升级影响内容：

- 成绩查询、录取查询、资料核对、岗位管理、排名查询、最低分数下旬、国考、考试日历、毕业查询的全部分享设置。



权限管理添加

- 国考： GwglDq/index
- 考试日历：Ksrl/index
- 最低分数查询：Zdfs/index
- 毕业查询：Bycx/index



需要修改内容：

- 【最低分数下旬、国考、考试日历、毕业查询】的微信分享



> 升级遇到问题：

录取查询分享是 成绩查询

排名验证码错误：倒序查询 

```
// RankTop
result
$getCode = SmsCode::where("phone",$param['phone'])->where("type","phone")->order("id DESC")->find();
```

