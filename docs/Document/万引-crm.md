---
title: 万引crm
---

# 环境要求：

php:7.4+



mysql:8.0



nginx: 1.8+



后台地址：crm.wanyin.com

用户后台地址：web.wanyin.com

总控平台地址：admin.wanyin.com



# 后台扩展

## password-oauth+jwt

```bash
setx Path "%PATH%;D:\Program Files\nodejs"
```





## envoy自动部署

```bash
```



## Telescope调试工具

访问地址：域名/telescope



## easywechat 微信扩展





## 文件上传扩展

安装依赖,(记得限制版本，不然安装会出错)，第一个包必要，第二个是官方推荐的缓存器

```bash
composer require league/flysystem-aws-s3-v3 ~1.0
composer require league/flysystem-cached-adapter ~1.0
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

```
# Minio config
MINIO_ENDPOINT="http://127.0.0.1:9005"
AWS_KEY=KBSIYRR36U3A1IO1QARI
AWS_SECRET=Z9BV6YsP7jtRQR1qCJk3PWecs22smNTOl7HC1Yj3
AWS_REGION=us-east-1
AWS_BUCKET=test
```

如果生成的地址无法访问，请检查当前 `Buckets` 的 `Access Policy：public` 即可。

### 钉钉消息

发送钉钉消息（钉钉机器人）：https://github.com/wowiwj/ding-notice





## env配置文件

```.env

# minio 存储
AWS_ACCESS_KEY_ID=admin
AWS_SECRET_ACCESS_KEY=admin666
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=crm
AWS_ENDPOINT=http://43.228.79.21:9000
CDN_HOST=http://43.228.79.21:9000
AWS_USE_PATH_STYLE_ENDPOINT=false
```



前端转化插件

```
"babel-eslint": "^8.2.1",
"eslint-plugin-vue": "^4.4.0"
```



# 缓存变量

| 缓存变量名 | 说明         | 备注               |
| ---------- | ------------ | ------------------ |
| website    | 网站基本信息 | 添加，修改需要删除 |
|            |              |                    |
|            |              |                    |
|            |              |                    |

# 规定字段

| 字段 | 名称 | 说明         |
| ---- | ---- | ------------ |
| sex  | 性别 | 1：男，2：女 |
|      |      |              |
|      |      |              |

# 多租户

```php
use Illuminate\Database\Eloquent\Builder;

trait InSchool
{
    public static function bootInSchool()
    {
        if (session()->has('current_school')) {
            static::addGlobalScope('school_id', function (Builder $builder) {
                $builder->where('school_id', session()->get('current_school')->id);
            });
        }

        static::saving(function ($model) {
            if (!$model->school_id && session()->has('current_school')) {
                $model->crm_id = session()->get('current_school')->id;
            }
        });
    }
}
```

## 事件使用技巧

创建一个事件

```bash
event(new Register($uid));
```

当用户执行完一系列的操作的时候，触发某个事件

```php
    <?php

    namespace App\Providers;

    use Laravel\Lumen\Providers\EventServiceProvider as ServiceProvider;

    class EventServiceProvider extends ServiceProvider
    {
        /**
         * The event listener mappings for the application.
         *
         * @var array
         */
        protected $listen = [
            // 用户注册后的事件
            'App\Events\Register' => [
                // 发送广告邮件
                'App\Listeners\SendAdMail',
                // 发送短信
                'App\Listeners\SendSms',
                // 发送帮助信息
                'App\Listeners\SendHelpInformation',

            ],
        ];
    }
```

如果当前时间包含很多时间，会一次执行

```php
event(new Register($uid));
```



# nginx配置

```nginx
server {

    listen 80;
    listen [::]:80;

    # For https
    # listen 443 ssl;
    # listen [::]:443 ssl ipv6only=on;
    # ssl_certificate /etc/nginx/ssl/default.crt;
    # ssl_certificate_key /etc/nginx/ssl/default.key;

    server_name admin.laravel.com;
    root /var/www/Vue/Laravel-admin/dist/;
    index index.php index.html index.htm;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /admin {
        proxy_pass http://162.14.72.65;
    }


    location ~ \.php$ {
        try_files $uri /index.php =404;
        fastcgi_pass php-upstream;
        fastcgi_index index.php;
        fastcgi_buffers 16 16k;
        fastcgi_buffer_size 32k;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        #fixes timeouts
        fastcgi_read_timeout 600;
        include fastcgi_params;
    }

    location ~ /\.ht {
        deny all;
    }

    location /.well-known/acme-challenge/ {
        root /var/www/letsencrypt/;
        log_not_found off;
    }

    error_log /var/log/nginx/app_error.log;
    access_log /var/log/nginx/app_access.log;
}
```

# 前端

## markdown

> https://textbus.tanboui.com/



## 图片放大

> https://mirari.cc/v-viewer/

main.js中添加

```javascript
// 图片放大
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
Vue.use(VueViewer);
```

使用方法

```html
<img:src="src" @click="show(src)">
```

```javascript
show(url) {
    let list = [];
    list.push(url);
    this.$viewerApi({
        images:list, // 必须是已数组的形式传递 ["image.png","avatar.png",....]
    })
},
```



# 公共组件

## textbus

```javascript
 <textbus theme="" content=""></textbus>


import textbus from "../../../components/edit/textbus";

 components:{
        textbus
    },
```

props:

- theme: 主题，可选 'dark' | 'mac-os' | 'mac-os-dark'，不传即为默认样式
- content：初始内容



# templet Live模板

## 注意事项

1、单选的值区分`字符串` 还是`整数` 

## 文件上传

```html
 <FormItem label="$filed$" prop="$filed$">
     <Upload action="">
         <Button icon="ios-cloud-upload-outline">Upload files</Button>
     </Upload>
</FormItem>
```

```js
//data
url: ''

//methods

```

```html
<Col v-bind="grid">
    <FormItem label="banner图" prop="url">
        <Upload
                name="file"
                :action="uploadUrl"
                :show-upload-list="showUploadList"
                :headers="uploadHeaders"
                :on-success="uploadSuccess"
                :on-error="uploadFail"
                >
            <Button icon="ios-cloud-upload-outline">上传图片</Button>
        </Upload>
        <img v-if="form.pic" :src="form.pic" alt="" style="width: 150px;height: 150px;">
    </FormItem>
</Col>
```

```javascript
import util from '@/libs/util';

uploadUrl: '/admin/upload',
showUploadList: false,
uploadHeaders:{
    'Authorization': "Bearer " + util.storage.get("token")
},// 文件上传头
             
             
uploadSuccess(result){
    this.form.url = result.url
},
uploadFail(result){
    console.log(result)
},
```



获取网站配置

```js
```

## 表单

```html
 <Form ref="form" :model="form" :rules="formRule" :label-width="80">
     <Row>
         <Col span="12">
             <FormItem label="微信号" prop="name">
                 <Input v-model="form.name" placeholder=""></Input>
             </FormItem>
         </Col>
         <Col span="24">
             <FormItem>
                 <Button type="primary" @click="submitForm('form')">保 存</Button>
                 <Button @click="resetForm('form')" style="margin-left: 8px">重 置</Button>
             </FormItem>
         </Col>
     </Row>
</Form>
```

```javascript
form: {
  id: "",
  name: "",
},
formRule: {
  name: [
    {required: true, message: '网站名称不能为空', trigger: 'blur'}
  ],
}

// methods
submitForm(name) {
  this.$refs[name].validate((valid) => {
    if (valid) {
      websiteStore(this.form).then(res=>{
        this.$Message.success('Success!');
      });
    }
  })
},
resetForm(name) {
  this.$refs[name].resetFields();
}
```



## 表格

```html
<template slot-scope="{ row, index }" slot="action">
    <Button type="primary" size="small" style="margin-right: 5px" @click="edit(index)">编辑</Button>
    <Button type="error" size="small" @click="delete(index)">删除</Button>
</template>

 <template slot-scope="{ row }" slot="name">
     <strong>{{ row.name }}</strong>
</template>
```

## 公共方法

```javascript
return {
    grid: {
        xl: 24,
        lg: 24,
        md: 24,
        sm: 24,
        xs: 24
    },
    list: [], // 数据列表
    loading: false,
    submitting: true, // 表单提交状态
    form: {
        name: '',
        url: "",
    },
    formRule: {
        name: [
            {required: true, message: '名称不能为空', trigger: 'blur'}
        ],
        url: [
            {required: true, message: '地址不能为空', trigger: 'blur'},
            {type: "url", message: '地址格式不正确', trigger: 'blur'}
        ],
    },
}
```

```javascript
mounted () {
    this.getData();
},
    created() {
        // 表单提交值
        this.keys = Object.keys(this.form);
    },
```



```javascript
// 重载表格
reloadTable() {
    this.list = [];
    this.getData();
},
    copyData(index) {
        return cloneDeep(this.list[index]);
    },
        // 切换页面
        changePage(page){
            this.page = page;
            this.getData();
        }
    
```

## 分页

```html
 <div class="ivu-mt ivu-text-right">
     <Page :total="total" show-sizer show-elevator
           :page-size="limit" show-total
           :page-size-opts="[15,30,50,100]"
           :simple="isMobile"
           @on-change="changePage"
           @on-page-size-change="changeLimit"
           @on-prev="prevPage"
           @on-next="nectPage"
           />
</div>
```

```javascript
// 切换页码
changePage(page){
    this.page = page;
    this.getData();
},
    // 切换条数
    changeLimit(limit){
        this.limit=limit;
    },
        // 上一页
        prevPage(page){
            this.page = page;
            this.getData();
        },

            // 下一页
            nectPage(page){
                this.page = page;
                this.getData();
            }
```

## 日志处理

```html
<Col v-bind="grid">
    <Col v-bind="grid">
        <FormItem label="到期时间" prop="etime">
            <DatePicker
                        v-model="form.etime"
                        type="date"
                        format="yyyy-MM-dd HH:mm:ss"
                        @on-change="changeTime"
                        placeholder="请选择时间" style="width: 200px"></DatePicker>
        </FormItem>
    </Col>
</Col>
```

```javascript
etime:'2021-11-26 00:00:00',

// 选择时间
changeTime(selectedDate){
    this.form.etime = selectedDate;
},
```

## 图片放大

```javascript
// 图片放大
import "viewerjs/dist/viewer.css"
import VueViewer from 'v-viewer'
Vue.use(VueViewer);

// 查看大图
bigPic(image) {
    this.$viewerApi({images:[image]})
},
```

```json
{
    name:" orangbus",
    access:["node",'role','admin_list','admin']
}
```

## 按钮

```
enum("primary","dashed","","","")

enum("default","primary","success","info","dashed","error","text")
enum("default","small","large")

enum("删除提示")
enum("是否删除？")
```





# vue父子组件互相操作

## 组件传值

父组件

```vue
<template>
  <div>
    <child :list="list" ref="child"></child>
  </div>
</template>
<script>
  import child from '@/components/child';
  export default {
      data(){
        return {
         	list: []   
        }  
      },
    components: {
      child
    },
    methods: {
      fatherMethod() {
        console.log('father组件');
      },
        // 调用子组件的方法
        handChildMethods(){
            this.$refs.child.childMethods()
        }
    }
  }
</script>

```

子组件

```vue
<template>
  <div @click="activeBtn"> </div>
</template>
<script>
  export default {
    // 接受父组件的值,使用：this.list
      props:{
          list:{
              type: Array,
              default: []
          }
      },
    methods: {
      activeBtn() {
          // 调用父组件的方法
        this.$parent.fatherMethod()
          this.$emit('fatherMethod')
      },
        // 子组件自己的方法
        childMethods(){
            console.log("子组件自己的方法");
        }
    }
  }
</script>

```





# 错误汇总

> Uncaught (in promise) Error: undefined: /admin/service/app/cate/list
>     at errorCreate (index.js:10)

接口返回错误，有可能是状态码不对



> npm ERR! code 1
> npm ERR! path D:\laragon\www\Vue\wanyin-platform\node_modules\deasync
> npm ERR! command failed
> npm ERR! command C:\Windows\system32\cmd.exe /d /s /c node ./build.js
> npm ERR! 'node' is not recognized as an internal or external command,
> npm ERR! operable program or batch file.
>
> npm ERR! A complete log of this run can be found in:
> npm ERR!     C:\Users\OrangBus\AppData\Local\npm-cache\_logs\2021-12-07T06_48_00_340Z-debug.log

1、没有设置nodejs的环境变量

```bash
setx Path "%PATH%;D:\Program Files\nodejs"
```

2、nodejs的安装路径中有空格，重新安装。

3、**使用 cmd 命令行窗口安装。** 



```
简易的命令行入门教程:
Git 全局设置:

git config --global user.name "OrangBus"
git config --global user.email "1353727504@qq.com"
创建 git 仓库:

mkdir wanyin-web
cd wanyin-web
git init
touch README.md
git add README.md
git commit -m "first commit"
git remote add origin git@gitee.com:heimeiai/wanyin-web.git
git push -u origin master
已有仓库?

cd existing_git_repo
git remote add origin git@gitee.com:heimeiai/wanyin-web.git
git push -u origin master
```



# 方法案例

```php
$list =collect($data)->map(function ($item) {
            $item->expand = true;
            if (!empty($item->children)) {
                for ($i = 0; $i < $item->children->count(); $i++) {
                    $item->children[$i]['expand'] = true;
                }
            }
            return  $item;
        });
```











