## linux压力测试

> webbench -c 并发数 -t 运行测试时间 URL

```
webbench -c 100 -t 10 http://www.baidu.com/
```



## layui-table

```html
<table 
       id="Event-activity-list" 
       lay-filter="Event-activity-list"
></table>

<script type="text/html" id="table-event-list">
 <a class="layui-btn layui-btn-normal layui-btn-xs" lay-event="edit">编辑</a>
</script>
```

- lay-filter : 过滤字段
- lay-event : 触发事件

加载数据

```js
table.render({
    elem: '#recycle-event-manage'
    ,url: "ApiUrl" //模拟接口
    ,cols: [[
        {type: 'checkbox', fixed: 'left'}
        ,{field: 'id', width: 80, title: 'ID', sort: true}
        ,{title: '操作', width: 150, align: 'center', fixed: 'right', toolbar: '#table-useradmin-admin'}
    ]]
    ,page: true
    ,limit: 15
    ,height: 'full-220' //不加此字段，表单不会显示出来
    ,text: {
       none:'数据为空消息提示！'
    }
});
```

表格内容监听事件

```js
table.on('tool(filter)'),function(obj){
    //当前表单行的所有数据
    var data = obj.data;
    switch(.obj.event){
        case "lay-event": // lay-event="" 表单这个字段的值
            // do something
            layer.open({
                    type: 2
                    ,title: '编辑用户'
                    ,content: "editEvent?id="+data.id
                    ,maxmin: true
                    ,area: ['650px', '800px']
                    ,btn: ['确定', '取消']
                    ,yes: function(index, layero){
                        var iframeWindow = window['layui-layer-iframe'+ index]
                            ,submitID = 'Event-edit-submit' //弹出层提交表单的 lay-filter 值
                            ,submit = layero.find('iframe').contents().find('#'+ submitID);

                        //监听提交
                        iframeWindow.layui.form.on('submit('+ submitID +')', function(data){
                            var field = data.field; //获取提交的字段
                            //提交 Ajax 成功后，静态更新表格中的数据
                            //$.ajax({});
                            axios.post('/admin/event/editEvent',field).then(res =>{
                                console.log(res); //注释
                                if (res.data.code == 0){
                                    layer.msg(res.data.msg);
                                    table.reload('Event-activity-list'); //表单数据刷新
                                    layer.close(index); //关闭弹层
                                }
                            });

                        });
                        submit.trigger('click');
                    }
                    //成功打开弹窗之后的回调
                    ,success: function(layero, index){
                            // console.log(layero)
                    }
                });
            return false;//一定要写 return 不然会接续执行下面的方法
    }
};
```

## 刷新当前表格

```js
table.reload('#bm-table-list'); //选择器是 table节点的 id
```

## 自定义表单验证

```js
/* 自定义验证规则 */
form.verify({
    title: function(value){
        if(value.length < 5){
            return '标题至少得5个字符啊';
        }
    }
    ,pass: [/(.+){6,12}$/, '密码必须6到12位']
    ,content: function(value){
        layedit.sync(editIndex);
    }
});
```



## 按钮事件触发

```html
 <button class="layui-btn" id="refresh-bm-table" lay-filter="refresh-bm-table" data-type="refreshBmTable">我是一个普通的点击按钮</button>
```

- data-type : 触发事件名

```js
var active = {
            refreshBmTable: function () {
                layer.msg("refresh");
                table.reload('#bm-table-list'); //表单数据刷新
            }
        }
//当前页面按钮事件
$('.layui-btn').on('click', function(){
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
});
```

```

```

## 自定义分页

```css
.pages {
    width: 100%;
    text-align: center;
}

.pagination {
    width: 100%;
    margin: 40px 0 20px;
}

.pagination li {
    display: inline-block;
    min-width: 20px;
    padding: 0 5px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #1E9FFF;
    margin: 0 5px;
    cursor: pointer;
    border-radius: 3px;
}

.pagination li a {
    display: block;
    width: 100%;
    height: 100%;
    color: #1E9FFF;
}

.pagination .active {
    background-color: #1E9FFF;
}

.pagination .active span {
    color: #fff;
}

.pagination .disabled {
    background-color: #FBFBFB;
    cursor: not-allowed;
    border: none;
}

.pagination .disabled span {
    color: #C9C9C9;
}

<div class="pages">
    {$list|raw}
</div>
```

## 打开新标签

```
top.layui.index.openTabsPage("/admin/article/articleDetail.html?id="+data.id,data.title)
```



## 时间转化

```php
 $data['bmstime'] = strtotime($data['bmstime']);
 date('Y-m-d H:i:s',$data['bmstime']);
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

## 弹窗表单

```
 layer.open({
                    type: 2
                    ,title: '编辑活动'
                    ,content: "editEvent?id="+data.id
                    ,maxmin: true
                    ,area: ['900px', '800px']
                    ,btn: ['确定修改', '取消']
                    ,yes: function(index, layero){
                        var iframeWindow = window['layui-layer-iframe'+ index]
                            ,submitID = 'Event-edit-submit'
                            ,submit = layero.find('iframe').contents().find('#'+ submitID);

                        //监听提交
                        iframeWindow.layui.form.on('submit('+ submitID +')', function(data){
                            var field = data.field; //获取提交的字段
                            //提交 Ajax 成功后，静态更新表格中的数据
                            //$.ajax({});
                            $.ajax({
                                type: "post",
                                url: 'editEvent',
                                data: field,
                                dateType: 'JSON',
                                success:function (res) {
                                    if (res.code == 0){
                                        layer.msg(res.msg);
                                        table.reload('Event-activity-list'); //数据刷新
                                        layer.close(index); //关闭弹层
                                    }
                                },
                                error:function () {
                                    layer.alert("修改失败，可咨询技术服务！");
                                }
                            });
                        });
                        submit.trigger('click');
                    }
                    //成功打开弹窗之后的回调
                    ,success: function(layero, index){
                        // console.log(layero,"123456")
                    }
                });
```

## 关闭当前标签

```js
var topLayui = parent === self ? layui : top.layui;
topLayui.admin.events.closeThisTabs();
```

## 关闭当前标签并刷新

```js
Users::where("id",$uid)->inc("money2",(int)$amount)->update();
```

## layui点击事件取值

```html
date-type="add" data-id="value"

var id = $(this).data('id');
```

## Layui图片上传编辑删除

```js
upload.render({
            elem: '#upload-images' //绑定元素
            ,url: 'uploadImage' //上传接口
            ,multiple: true
            ,before(obj) {
                obj.preview(function (index,file,result) {
                    $('#isshow').removeClass("layui-hide");
                    $('#preImages').append("<img src=" + result + " style=\"width: 200px;height: 100px;\" title=\"点击图片可删除\">");
                });
            }
            ,done: function(res){
                console.log(res)
                //上传完毕回调
                $('#preImages').append("<input type=\"hidden\" name=\"{$list.name_field}[]\" value='"+res.imageUrl+"'>");
            }
            ,error: function(res){
                //请求异常回调
                layer.alery("图片上传失败！");
            }

        });
```

```js
function del(url) {
        var imgurl = url.src.split("upload")['1'];
        var list = $('#preImage').children('input');
        for ($i=0;$i<list.length;$i++){
            var inputURL= list[$i].value.split("upload")['1'];
            if (imgurl == inputURL){
                //图片地址相同就删除
                list[$i].remove();
                url.remove();
            }
        }
    }
```

## layui放大图片

```js
function bigImage(url) {
        //图片放大
        layer.open({
            type: 1,
            title: false,
            closeBtn: 0,
            area: ['auto'],
            skin: 'layui-layer-nobg', //没有背景色
            shadeClose: true,
            content: "<img src='"+url+"' style='width:400px ;height:auto'>"
        });
    }
```

## 最后一页批量删除

```js
done: function(res, curr, count) {
    if (res.data.length == 0) {
        if(curr!=1) {
            table.reload('kuaiji-list', {
                page: {
                    curr: curr - 1 //重新从第 1 页开始
                }
            });
        }
    }
}
```

## 按钮时间监听

```javascript
#html
lay-filter="type"

form.on('radio(type)',function (data) {
            switch (data.value) {
                case '1':
                    $("input[name='content']").attr('value',{$data.jifen});
                    break;
                case '2':
                    $("input[name='content']").attr('value',{$data.money});
                    break;
                case '2':
                    $("input[name='content']").attr('value',{$data.gift});
                    break;
            }
        });
```

# **vue前端**

## 微信环境检测

```js
let wx = navigator.userAgent.toLowerCase();
    if (wx.match(/MicroMessenger/i) == "micromessenger") {
        window.location.href = (`${adminApi}/login/oauth?pid=${pid}`);
}
```

## 数值处理

### 保留小数点两位

```vue
{{money.toFixed}}
```



## vue返回上一页

```
onclick="window.history.go(-1)"
```

## vue-axios

```
npm i axios --save
npm i vue-axios --save
```

```
# mian.js
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
```

```
# mian.js
//配置Axios请求头
axios.defaults.headers.common['Authorization'] = Token.get("token");
```

导航登录前端判断

```

```

### 设置请求超时

```
axios.defaults.timeout = 10000;
```

### 路由配置

```javascript
{
    path: "/user",
    name: "User",
    meta: {
      title: "个人中心",
      keepAlive: true,
      footer: true,
      auth: true
    },
    component: User
}
# 页面跳转拦截判断
router.beforeEach((to,form,next) =>{
  const {requireAuth} = to.meta;
  console.log(to.name , form.name,requireAuth);
  //是否需要登录后才能访问
  console.log(Token.get("token"))
  if (requireAuth === true || Token.get("token") !== null){
      console.log(requireAuth);
      next("/Sign");
  }
  next();
});
      
      
```



### 请求拦截

```
//请求拦截
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (Token.get('token') == null){
    console.log("axios:"+Token.get("token"))
    // window.location.href = "/Sign";
  }
  //配置Axios请求头
  axios.defaults.headers.common['Authorization'] = Token.get("token");

  console.log("axios:"+Token.get("token"))
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
```

```
config.headers['Authorization'] = 'Bearer '+ jwtToken.getToken();
```



### 响应的拦截

```

```

## 微信分享

```js
//微信分享 
let param = {
     url: window.location.href,
     title: `${this.$store.state.User.nickname}正在参加${this.title}活动`,
     desc : `他的宣言是：${data.data.info}`,
     imgUrl: imgUrl+data.data.pic,
     link: window.location.href + "&pid=" +this.$store.state.User.
 }
 wxShare(param)
```

## pid 传值问题

```javascript
let pid = this.pid;
if (!pid){
    pid = this.$store.state.User.id;
}
```





## 图片上传

- 首先获取本地需要上传的文件，格式

  ![image-20200508091612362](/home/orangbus/.config/Typora/typora-user-images/image-20200508091612362.png) 

  ```
  let img = file[0];
  let formdata = new FormData();
  formdata.append("file",img)
  image(formdata).then(res =>{
  console.log(res.data);
  });
  ```

- 案例

  ```javascript
  <input type="file" accept="image/gif, image/jpeg, image/png, image/jpg">
  
  
  ```

## 单选

```html
this.data.sex:1

<input type="radio" name="sex" value="0" title="男" :checked="sex!=1?true:false">
<input type="radio" name="sex" value="1" title="女" :checked="sex==1?true:false">
```



## vue渲染使用JQuery

```js
let Dom = event.currentTarget;
$(Dom).parent().parent().parent().hide();
```

```
.MyActive-footer{
  height: 1rem;
  box-shadow: 0 0 0.1rem 0.01rem rgba(0,0,0,0.1);
  width: 7.5rem;
  position: fixed;
  bottom: 0;
  line-height: 1rem;
  z-index: 999;
  background-color: #FFFFFF;
  font-size: 0;
  .MyActive-footer-con{
    display: inline-block;
    width: calc(100%/3);
    height: 1rem;
    text-align: center;
    text-align-last: center;
    position: relative;
    >div{
      display: inline-block;
      font-size: 0.3rem;
      width: 2rem;
      height: 0.8rem;
      line-height: 0.8rem;
      color: #666666;
      border-radius: 0.8rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      .iconfont{
        font-size: 0.28rem;
      }
    }
    .first-div{
      width: 1.2rem;
      height: 1.2rem;
      top: 20%;
      line-height: normal;
      font-size: 0.24rem;
      box-shadow: 0 0 0.14rem 0.02rem rgba(0,0,0,0.2);
      border-radius: 50%;
      color: #FFFFFF;
      background-color: #f25650;
      div{
        width: 0.5rem;
        height: 0.5rem;
        margin: 0.2rem auto 0 auto;
        img{
          width: 100%;
        }
      }
    }
  }
}

.footer-bottom{
  height: 1.5rem;
}

```



## 滚动监听

```js
//mounted
window.addEventListener('scroll', this.scrollDs)

scrollDs: function () {
this.scroll = window.pageYOffset;
    if (this.scroll > 300){
    document.title = this.article.title;
    // this.title = this.article.title;
    }

}
```

### vue滚动监听

```js
 v-infinite-scroll="scrollMore"
 
isloading: false,
page: 1,
limit: 15,
isend: false

 
 
 //loading more
  scrollMore(){
      let scrollTop = $('.class')[0].scrollTop;
      let windowHeight = $('.class')[0].clientHeight;
      let scrollHeight = $('.class')[0].scrollHeight;
      if(scrollTop + windowHeight == scrollHeight){
          if (this.isend === true){
              return false;
          }
          if (this.isloading === true) {
              this.isloading = false;
              this.page += 1;
              let data = {
                  page: this.page,
                  limit: this.limit,
              }
              let that = this;
              layui.use("layer",function () {
                  var layer = layui.layer;
                  layer.load()
              })
              myTeam(data).then(res => {
                  let data = res.data;
                  if (data.code == 1) {
                      if (data.data.length !== 0) {
                          data.data.map(val => {
                              that.lists.push(val);
                          })
                          layer.closeAll('loading');
                          this.isloading = true;
                          return false;
                      }else{
                          layer.closeAll('loading');
                          //数据加载完了
                          this.isend = true;
                          return false;
                      }

                  } else {
                      layer.msg(data.msg);
                      return false;
                  }
              })
              return false;
          } 
      }
      this.isloading = true;
  },
```

```
scrollBot() {
                if (this.isloading == true) {
                    this.isloading = false;
                    this.page += 1;
                    this.limit += 15;
                    let data = {
                        page: this.page,
                        limit: this.limit
                    }
                    let that = this;
                    layer.load()
                    article(data).then(res => {
                        let data = res.data;
                        if (data.code == 1) {
                            if (data.data.length !== 0) {
                                console.log("res")
                                console.log(data.data)
                                data.data.map(val => {
                                    that.articleList.push(val);
                                })
                                layer.closeAll('loading');
                                this.isloading = true;
                            }else{
                                layer.closeAll('loading');
                                //数据加载完了
                                this.isend = true;
                                console.log(this.isend)
                            }

                        } else {
                            layer.msg(data.msg);
                        }
                    })
                    return false;
                    // alert('加载数据')
                }
                // alert('到底部了')
                this.isloading = true;
            },
```





## Api接口管理

```javascript
export function login(data){
    return axios.post("/login",data);
}
```

使用

```

```

### 模板

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

```
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

## vuex-state

```js
import {mapState} from 'vuex';
computed:{
    ...mapState({
    user: state=>state.User
    })
},
```

```
https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appid}&redirect_uri=${this.redirect_uri}&response_type=code&scope=${this.scope}&state=${this.state}#wechat_redirect
```



## 跨域

```javascript
// ２.0配置
module.exports = {
    dev: {
        proxyTable: {
          '/api': {
            target: "http://localhost/api",
            secure: false,  // 如果是https接口，需要配置这个参数
            changeOrigin: true,　//是否跨域
            ws: true,
            pathRewrite: {
              '^/api': ''
            }
          }
        },
    }
}
// 3.0配置
devServer:{
      proxy : {
        '/api':{
          target: baseUrl,
          changeOrigin: true,
          ws: true,
          pathRewrite:{
            '^/api': ''
          }
        }
      }
    }
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

```
@click="show(index)"

show:function(){
	this.lists[index].val
}
```



## vue无法获取top

```html
class="ExtensionRecord-body"

.ExtensionRecord-body{
        width: 7.5rem ;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        overflow-y: auto;
    }
```





 

## 常用方法

```javascript
# localStorage.js
function localStorage() {
  return window.localStorage;
}

function get(key) {
  return JSON.parse(localStorage().getItem(key));
}

function set(key, data) {
  return localStorage().setItem(key, JSON.stringify(data));
}

function all() {
  const data = {};
  for (var i = localStorage().length - 1; i >= 0; i--) {
    var key = localStorage().key(i);
    data[key] = get(key);
  }

  return data;
}

function remove(key) {
  return localStorage().removeItem(key);
}

function clearAll() {
  return localStorage().clear();
}

function has(key) {
  return localStorage().getItem(key) !== null;
}

export default {
  get,
  set,
  all,
  remove,
  clearAll,
  has
};


------------------------------------------------------------

let TokenSet = (key,value)=>{
    return window.localStorage.setItem(key,value)
}
let TokenGet = (key)=>{
    return window.localStorage.getItem(key)
}
let TokenDel = (key)=>{
    return window.localStorage.removeItem(key);
}
let TokenRemove = ()=>{
    return window.localStorage.clear();
}

export {TokenSet,TokenGet,TokenDel,TokenRemove}
```

# Thinkphp技巧

## 别名查询

```
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

## 多字段统计

```
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



# **php常用函数**

## 字符串处理

[explode()](http://www.5idev.com/p-php_explode_str_split.shtml#explode)：使用一个字符串分割另一个字符串

```php
$str= 'one|two|three|four';

print_r(explode('|',$str));
```

str_split() 将字符串分割为一个数组，成功返回一个数组。

```php
arraystr_split( string string [, int length] )
```

## 一维数组无限极分类后排序

```php
array_multisort(array_column($list,'sort'),SORT_ASC,$list);
```

## 随机验证码

```php
$pattern='1234567890';
for( $i=0; $i<6; $i++ ) {
	$code_number .= $pattern[mt_rand(0, 9)];
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


eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MjE0LCJ1c2VybmFtZSI6Im9yYW5nYnVzIiwicGFzc3dvcmQiOiJlMTBhZGMzOTQ5YmE1OWFiYmU1NmUwNTdmMjBmODgzZSIsIm5pY2tuYW1lIjoiXHU2YTU5XHU3NTU5XHU5OTk5IiwicmVhbG5hbWUiOiIiLCJzZXgiOjAsInRlbCI6IjE4Mzg4MTEyNTAwIiwiZW1haWwiOiIiLCJ3eGlkIjoib1FwZnoxQzhGWlpDUUxuN210dmxxZlZRdTJ3cyIsInd4X2JkIjoxLCJwYXJlbnRfaWQiOjI2LCJoZWFkaW1ndXJsIjoiaHR0cDpcL1wvdGhpcmR3eC5xbG9nby5jblwvbW1vcGVuXC92aV8zMlwvUTBqNFR3R1RmVEp2Z3V6M1p5d2oxM0JIM3FNaWJKN3E2N3pJQ0R4cmQ0aWFqQ2hJY0JybngzQ0x0aWNXNjdrWW9jSnJBMXc5RjlzSExzY01IRENBY2t0Y0FcLzEzMiIsInJlZ3RpbWUiOjE1ODI2MTI4NDQsImxvZ2ludGltZSI6MTU4MjYxMjg0NCwiY2hlY2t0aW1lIjowLCJsb2dpbmlwIjoiMTE5LjYyLjIwOS4yMjkiLCJpc2xvY2siOjAsImlzY2hlY2siOjAsInNjb3JlIjowLCJzY29yZTIiOjAsIm1vbmV5IjowLCJtb25leTIiOjAsImV3bSI6IiIsInZpZGVvIjoiIiwiYXVkIjoiIiwiZXhwIjoxNTg3MDkxOTA1LCJpYXQiOjE1ODcwOTE4OTEsImlzcyI6IiIsImp0aSI6IjllZDliNWE1M2MwYWY4NzU1NjI5MjIwMTc1YTQ3ZGI5IiwibmJmIjoxNTg3MDkxODkxLCJzdWIiOiIifQ.ORviUeq7MdOLwCVsGZHpOJfVomwwMfId2PpAEN5rDTk 0.387600s ShowPageTrace

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



- gift: cid => 分类







# Html

## 图片放大

在img标签里面只设置宽，不设置高，图片就会等比例缩放



#　注意事项

- 活动报名的时候需要传递一个　`$uid` : 上级推荐人　ＩＤ
- 海选投票的时候也需要传一个ｉｄ值过去
- 文件上传权限问题
- 报名表审核问题



- 审核失败资金返还

  ```
  account_log: money_in Money_out
  ```

  

- 支付失败资金返还

  ```
  User:
  money: 总资金
  money2: 可用的
  ```

  





# Linux

## ubuntu install brew

> https://docs.brew.sh/Homebrew-on-Linux

```
git clone https://github.com/Homebrew/linuxbrew.git ~/.linuxbrew

vim .bash_profile
# ====================
export PATH="$HOME/.linuxbrew/bin:$PATH"
export MANPATH="$HOME/.linuxbrew/share/man:$MANPATH"
export INFOPATH="$HOME/.linuxbrew/share/info:$INFOPATH"
# ====================

brew update ## run twice 
brew doctor

# test
brew install hello
```

## 权限管理

三个用户组，三个用户，每个用户对自己的用户组有755权限，其他组或者用户用户查看权限

- 技术部：technology | tom
- 市场部：operation | tony
- 销售部：market |  marketer

添加用户：

```
user add orangbus
userdel orangbus

```

添加用户组

```
groupadd market
groupdel market

groupmod market

newgrp technology
```

文件权限

```
chgrp -R groupName filename

chmod -R 755 filename


```







```
setting
1.链接,2.点击事件
wy_config_web //网站配置 
wy_config_mp // 公众号配置
wy_config_mpmenu // 自定义菜单
wy_config_service // 客服
wy_config_market // 营销
wy_config_sms // 短信配置
wy_config_link // 友情链接

万引微信接口：
appid:wxd71c9e50935ecffd
token: heimeiwy
secret:UdpaJLz277y1KjyzfVp9COTdkftRAqaderXDJTEi29I
appsecret: 8c74bc2dffcd398a0d9035fa4be515af

orangeTV：
appid: wx34355307ea431420
token: weixin
secret: n7Zfd3h0fN5URilgdDXvLUTLNnNOhjfFvUHlyxNltFJ
appsecret: 01dfe049abfcdc773baf4536ef86c6c9
```

## docker-swarm

```
# master
docker swarm init --advertise-addr 192.168.99.100
```





# minikube

安装

```
minikube start --driver=virtualbox /
--registry-mirror=https://registry.docker-cn.com

minikube start --vm-driver=virtualbox /
--image-mirror-country=cn /
--image-repository=registry.cn-hangzhou.aliyuncs.com/google_containers /
--iso-url=https://kubernetes.oss-cn-hangzhou.aliyuncs.com/minikube/iso/minikube-v1.7.3.iso --registry-mirror=https://reg-mirror.qiniu.com

```

- `--vm-driver` 如果不写会自动检测，可选值 virtualbox, vmwarefusion, hyperv, vmware
- `--image-mirror-country` 需要使用的镜像镜像的国家/地区代码。留空以使用全球代码。对于中国大陆用户，请将其设置为 cn。
- `--image-repository `用来拉取 Kubernetes 集群所需镜像的仓库
- `--iso-url `下载 minikube 虚机安装所需的 iso 文件
- `--registry-mirror docker registry `的镜像源，集群安装后拉取镜像加速用，可以使用其它加速器地址

这里的虚机配置对应的选项：
--cpu=2
 --memory='2000mb
--disk-size='20000m'

preloaded-images-k8s-v1-v1.17.3-docker-overlay2.tar.lz4: https://storage.googleapis.com/minikube-preloaded-volume-tarballs/preloaded-images-k8s-v1-v1.17.3-docker-overlay2.tar.lz4



# 备注

```
赵德稳:农村信用社
6231900000159338777

李俊飞：中国工商银行
3212262505026763519

赵明祥：招商银行
6214838771092543

肖振宇：中国工商银行
6215582502001280857
```







# 后期bug修复

- 







# API接口

## 账号管理

https://www.bokecc.com/
账号:18687017747 

密码:123456a

### 领学网后台

http://v7.0xue.com/0xueicp53471/Index.aspx

用户名：test888  

密码：123456abc   lx2019

### cc接口说明

> userId:  DE455F6A1E174E3D
>
> 点播ApiKey: zaGqps6upjfs3DpldvAkpnCuIPWdFPRB
>
> 直播ApiKey: 7vRrnFeX6WjVi103q9BVfNVyV08GLEBk

请求扩展包:

```
composer require guzzlehttp/guzzle
```



# 数据库表

## Api操作数据表

### 文章

- article
- cate

### 投票

- my_vote

- vote







## 数据表说明

| 数据表          | 描述               |
| --------------- | ------------------ |
| yw_addr         | 用户地址信息表     |
| yw_account_log  | 账户变动日志记录表 |
| yw_article      | 文章表             |
| yw_cash         | 提现记录表         |
| yw_edu_djs      | 倒计时             |
| yw_comment      | 文章评论           |
| yw_event_prize  | 活动奖励设置       |
| yw_form_cjcx    | 成绩查询报名表     |
| yw_form_crjy    | 成考报名           |
| yw_form_jxjy    | 继续教育表单       |
| yw_form_kuaiji  | 会计报名表单       |
| yw_form_shiting | 试听报名表单       |
| yw_form_wsjnjd  | 卫生技能鉴定表单   |
| yw_gg           | 广告               |
| yw_jfchange     | 积分兑换记录       |
| yw_loveip       | 点赞记录           |
| yw_order        | 订单               |
| yw_prize        | 抽奖活动表         |
| yw_prize_users  | 抽奖记录表         |
| yw_prize_append | 抽奖活动奖品设置   |
| yw_shop         | 礼品表             |
| yw_shopcat      | 礼品分类表         |
| yw_shoucang     | 文章收藏表         |
| yw_sign         | 签到表             |
| yw_score        | 积分兑换商品       |
|                 |                    |
|                 |                    |
|                 |                    |
|                 |                    |

## 说明

> 资金中心



> 短信

www.yunpian.com
账号：18064830917
密码：ab66012369

APiKEY：f260cd129b9612c0f713e44583631d1b

API文档：https://www.yunpian.com/dev-doc



yw_account_log: change_desc

- 阅读文章+推荐朋友阅读: arc
- 邀请好友: tem
- 提现: cash
- 积分兑换: score ( in:88 , out:  )

积分兑换产品表:

- score :用户表的score2 用户可用积分
- score1:是gift表的score1 需要消耗的积分
- score2: score-score1 
- yes: 默认 0 
- change_type:  change_event: 当前模型的名字 
- change_type: 

| change_event      | change_desc                                         | change_type |
| ----------------- | --------------------------------------------------- | ----------- |
| score             | score_out  积分兑换资金, money_in 资金增加          | 61/62       |
| gift              | score_out 积分兑换礼品                              | 63          |
| prize             | score_in 积分抽奖                                   | 98          |
| admin             | 后台增加/减少积分                                   | 78 - 77     |
| team              | (score_in) 邀请好友加入                             | 44          |
| myvote            | score_in / score_out 自建投票                       | 31          |
| money             | money_in / money_out 资金                           | 31 - 31     |
| arc               | score_in 阅读文章+推荐朋友阅读 积分奖励             | 10 -11      |
| cash              | money_in / money_out 提现,支付,提现审核失败资金退回 | 53          |
| sign              | score_in 签到                                       | 88          |
| webcam,online,ftf | 课程                                                | 101-102-103 |
| event             | 一级报名奖励、二级报名奖励（money_in）              | 21 - 22     |
|                   |                                                     |             |
| 备注              | change_uid                                          | user_id     |
|                   | change_id                                           | 当前表的 id |

涉及日志记录的地方

- 后台积分增加
- 自建投票(检查)

用户积分资金变化

```php
try {
            Users::where("id",$this->uid)->dec("score2",$decScore)->update();//减少积分
            Users::where("id",$this->uid)->inc("money",$money)->update();//增加资金
            Users::where("id",$this->uid)->inc("money2",$money)->update();//增加资金
        }catch (ErrorException $e){
            $code = 2;
            $msg = $e->getMessage();
        }
```



日志

```php
try {
            $score = [
                "user_id" => $realMoney['id'],
                "score_out" => $decScore,
                "change_time" => time(),
                "change_desc" => "积分兑换",
                "change_event" => "score",
                "change_id" => $change_id,
                "change_type" => 62,
                "change_uid" => $realMoney['id']
            ];
            AccountLog::create($score);
            $money = [
                "user_id" => $realMoney['id'],
                "money_in" => $money,
                "change_time" => time(),
                "change_desc" => "积分兑换",
                "change_event" => "score",
                "change_id" => $change_id,
                "change_type" => 61,
                "change_uid" => $realMoney['id']
            ];
            AccountLog::create($money);
        }catch (ErrorException $e){
            $code = 2;
            $msg = $e->getMessage();
        }
```

文章

```
$data['user_id']=$fid; 推荐人ID
$data['change_desc']='推荐朋友阅读文章';
$data['change_event']='arc';
$data['change_id']=$id;文章ID
$data['change_type']=11;
$data['change_uid']=$uid;  阅读用户ID
```

id 序号
aid 文章（内容）ID
muid 阅读人UID
fuid 推荐人UID,没有则为0,如果是自己访问自己分享的文章也要记录
type 类型  文章模块值为arc
ctime  首次阅读的时间戳
utime  最后阅读的时间戳

   fptime  本人阅读获得收益的时间戳
   mptime  推荐人获得收益的时间戳
   mpid  本人阅读获得收益，写入（关联）account_log记录中的id，没有为0
   fpid  推荐人获得收益，写入（关联）account_log记录中的id，没有为0

   mprize 阅读人本人获得的奖励（积分）数
fprize  推荐人获得的奖励（积分）数
prizetype 奖励类型 积分为：score

**奖励流程**

1.用户点开文章记录日志和访问记录

2.根据后台配置的奖励规则给对应的用户添加相应的奖励

3.后台配置当天转发收益上限 (x)

4.后台判断时候在规定的时间内提交的获得收益请求

后台-营销配置修改名称后需要吧下面的提示也一起更改了----------------------------------**已修改-user分支里面**



文章转发收益案例

- 自己阅读
- 自己点击自己分享的文章
- 自己阅读已经阅读过的文章
- 别人分享**没有阅读**过的文章
- 别人分享**已经阅读** 的文章
- 二次分享同一篇文章



自己点击自己分享的文章记录

别人分享自己已经阅读的文章也要记录





## thinkphp查询技巧

```
$data = Score::alias('s')
            ->join("gift g",'s.sid=g.id')
            ->field("g.id,g.title,g.pic,s.stime") //需要那个表的字段就假如对应表的字段
            ->where("uid",$request->uid)
            ->limit(($page * $limit) - $limit, (int)$limit)
            ->select()->toArray();
```

## 插入并返回插入id

```
insertGetId
```



## 变更记录

投票日志记录



投票逻辑:

奖励类型: 1->积分, 2->资金, 3->其他(奖品)

- 投票列表

  

- 投票详情

## 短信验证码模板

- 忘记密码

  ```
  
  ```

- 注册

  ```
  
  ```

  

# 积分抽奖-draw prize

- 判断是默认活动还是关联活动，判断该活动是否开启，是否在抽奖活动范围之内
- 判断活动是否开启
- 判断用户积分是否大于抽奖积分
- 今天抽奖次数是否已经用完了
- 计算抽奖比例，得出随机概率
- 将结果写入用户抽奖数据库
- 扣除用户积分，记录日志
- 
- 抽取奖品数
- 剩余奖品数量
- 根据奖品的数量计算概率
- 默认的抽奖活动　ｉｄ　为１
- 每次抽奖积分，每人每天最多可以抽奖次数



## 前端显示说明

- 文章、自建投票有奖励









# 微信公众号开发配置



## 个人微信测试号

```
appID: wxf9d5ff94f09d1ca1
appsecret: dd7273a5882915837be3430cbde703e2
Token: weixin
```

## orangTv

```
appID: wx34355307ea431420
appsecret: 014ed1d37bd2a54f9bdfacb3c9e42e9b
Token: orangbus
```



## 微信模板消息

```
充值到账

你本次充值的{{money.DATA}}已经到账
本地获得积分收益{{score.DATA}}
备注: 当前收益:{{}}
点击详情查看信息信息.
```





### 微信错误处理

- 微信公众号授权登录，提示“redirect_uri 参数错误”

  ![](https://img2018.cnblogs.com/blog/1449188/201905/1449188-20190526110952296-1450592809.jpg) 

  **把这里的 "http://" 去掉就可以了。** 



id uid 



## natapp

```bash
nohup ./natapp -authtoken=2005b202e45ce346 -log=stdout -loglevel=ERROR &
```



## ngrok

```
./ngrok authtoken 4ShUPREAAeEAfXAk3yjyb_2H5VYL8FFG3j2wfbu171q

./ngrok http 80
```



```
HTTP/1.0 302 Found Cache-Control: no-cache, private Date: Thu, 23 Apr 2020 03:22:33 GMT Location: https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf9d5ff94f09d1ca1&redirect_uri=http%3A%2F%2Flocalhost%2F&response_type=code&scope=snsapi_userinfo&state=d3076d447b7b55b1797d1802d476e13a&connect_redirect=1#wechat_redirect Redirecting to https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf9d5ff94f09d1ca1&redirect_uri=http%3A%2F%2Flocalhost%2F&response_type=code&scope=snsapi_userinfo&state=d3076d447b7b55b1797d1802d476e13a&connect_redirect=1#wechat_redirect. 0.012361s ShowPageTrace
```



# Web压力测试

- webbench

  用法：webbench -c 并发数 -t 运行测试时间 URL

  ```
  webbench -c 1000 -t 130 http://www.qixing318.com
  ```



# 收藏

# [npm使用国内镜像的方法](https://www.cnblogs.com/yoyotl/p/7826255.html)

一.通过命令配置

1. 命令

```
npm config set registry https://registry.npm.taobao.org
```

2. 验证命令

```
npm config get registry
```

如果返回https://registry.npm.taobao.org，说明镜像配置成功。

二、通过使用cnpm安装

1. 安装cnpm

```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

2. 使用cnpm

```
cnpm install package
```







# 对接记录

文章：

文章正文： 网站名称 ok

刷新需要重载网站配置：ok





# 测试日志

报名：男1，女：2



## 后台操作

- 添加礼品没有返回提示



## 笔记

```
遇到的问题：
1.invalid signature

　　出现这个问题肯定是获取的签名有问题，如果签名没有问题有别的问题是不会报这个的，签名错误的原因可能是公众号平台配置有问题或者是后台返回签名接口的算法有问题。我在项目中遇到报这个问题，签名获取正确之后又报invalid url domain（因为我是在localhost域名下使用的，localhost不是公众号配置的安全域名所以会报这个）。

2.permission denied

　　这个问题是没有接口权限造成的，我一开始也弄了很久，后来发现自己的微信号没有关注测试公众号成为开发人员导致的，关注了之后就有权限调用接口了。

3.自定义的缩略图不显示

　　这个问题我是因为路径错误导致的，因为我的图片是接口返回的动态图片，再设置为分享缩略图，我直接就给这个参数赋了相对路径；后来发现不能赋相对路径，一定要是绝对路径，因为是分享给别人看的，绝对路径中的http://xxx.com.cn/icon.jpg的http://xxx.com.cn也是要加上的，否则会找不到图片。另外一个原因就是图片尺寸和类型问题，一定要是jpg（png有些手机不太友好）；还有尺寸我看网上很多人说300*300以上，有些人说100*100以上，反正不能太大不能太小，我就采用了100*100以上的jpg图片，最好不超过32k，结果发现真的可以。

4.二次分享导致不能调用自定义的接口

　　这个问题耗费了我很多时间去找原因，我看网上都是说要url进行编码之后传给后台获取的签名才不会计算错，因为微信会在分享后的链接后面加

from=singlemessage&isappinstalled=1这串字符串，我encodeURIComponent(location.href.split('#')[0])发现获取的签名反而非法！和后台联调之后发现是测试网http协议的问题；本来encode编码后传给后台，后台解析之后会将解码的url发到前端，但是不知道为什么测试网总是把编码后的url原封不动传给我，导致计算签名有点问题，后来是后台那里做了处理才解决了。不过encodeURIComponent(location.href.split('#')[0])最好还是加上，因为有一些奇怪的字符比如$&%#之类的后台计算可能会识别错误。还有一个，要等页面加载了之后再分享调用jssdk接口才会生效！别操作这么快了。

5.页面无法分享

　　当时有一个页面调不起微信的分享，这个页面是自定义link链接，不是直接分享当前页面链接。后来发现是分享的link路径的问题，我把路径中？organized=8&最后面这些参数也加上去了，后来去掉就没问题了。

6.正则处理富文本

　　自定义描述的时候发现接口返回的介绍是一段html代码，可能是平台发布文章是用富文本编辑框提交到后台后台再返回前端页面的，那么这时候就要过滤掉标签，只取标签中的内容，我是这么写的：
　　

```

# 交接

## 扩展包后端

```
composer require thans/tp-jwt-auth

composer require yunpian/yunpian-php-sdk

composer require overtrue/wechat

phpoffice/phpspreadsheet //excel表单处理
```



## 扩展包前端

```
npm i --save moment
npm i --save vuex
npm i --save axios

npm install --save-dev babel-cli
npm i babel-plugin-transform-es2015-modules-commonjs
```

## 微信公众号验证地址

```
https://domain.com/api/login/server
```

## 微信 JDK 生成地址

```
https://domain.com/api/login/wxJdk
```





```
assetsPublicPath: '/',

// 添加年份
    $('#yearManage').on('click',function () {
      top.layui.index.openTabsPage("{:url('StudentYear/index')}", "年份管理");
    });
    
    <button class="layui-btn" id="yearManage"><i class="layui-icon">&#xe714;</i>年份管理</button>
    
```





# 数据库

数据库统一地址：43.228.77.139

数据库：wanyin
数据库用户：wanyin
密码：20200510
端口：3307

数据库phpmyadmin管理地址：
http://php.heimeiai.com/phpmyadmin2/

公共地址：http://wanyin.heimeiai.com/



## 活动表明地址

```
http://wanyin.heimeiai.com/index/diy/form/formid/7

http://wanyin.heimeiai.com/index/diy/form/formid/7/fid/34
```



## Bug未修复

- 自建投票只能给一个人投票 (√)
- 活动推荐的二级展示 二级推荐奖励(√)



## template

```html
<div class="layui-form-item">
    <label class="layui-form-label">姓名：</label>
    <div class="layui-input-block" style="position: relative">
        <input type="text" name="title" value="orangbus" required  lay-verify="required" autocomplete="off" class="layui-input">
        <i
           class="layui-icon layui-icon-ok-circle"
           style="font-size: 25px;color: #5FB878;
                  position: absolute;right: 10px;top: 50%;transform: translateY(-50%)">
        </i>
    </div>
</div>

$arc = Arc::where("del",0)
            ->limit(0,15)
            ->whereRaw("headline=3 OR elite=1 or recommend=1")
            ->with("cate")
            ->visible(["cate"=>["name"]])
            ->field("id,title,keyword,pic,createtime,click,cid")
            ->withCount('comment')
            ->order("id","desc")
            ->select()->toArray();
```



```json
录取查询
index
list


成绩查询

信息核对

<div class="layui-form-item">
                <label class="layui-form-label">年份：</label>
                <div class="layui-input-block">
                    <select name="year" lay-verify="required">
                        <option value="0">请选择年份</option>
                        {foreach $year as $v}
                        <option value='{$v.year}' {if($v.year == $info.year)}selected{/if}>{$v.year}</option>
                        {/foreach}
                    </select>
                </div>
            </div>
                                                   
                                                   
top.layui.index.openTabsPage("{:url('searchHistory')}", "成绩查询记录");

```

 网上报名自定义页： 成考表明表单

