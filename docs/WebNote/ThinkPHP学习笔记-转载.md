---
title: ThinkPHP学习笔记-转载
date: 2017-09-30 18:04:40
tags: php
categories:
- php
desc: thinkphp学习笔记
---

 thinkphp命名
文件名采用驼峰法，首字母大写，
类名和文件名一致方法和属性采用驼峰法，首字母小写
函数名采用小写字母加下划线
数据表加字段采用小写字母加下划线
配置参数和常量使用大写字母加下划线以
双下划线打头的是魔术方法<!--more-->

thinkPHP目录结构
  系统目录：
      common目录下放公用函数
     lang目录下放语言包
     lib基类类库目录 lib/org第三方公共类库
     tpl系统模板目录
    mode框架模式扩展目录
    vender第三方类库目录
  项目目录：
     command项目公共文件
     conf项目配置目录
     lib项目类库目录
     tpl项目末班目录
     runtime项目运行缓存和日志目录

thinkphp惯例配置文件
     Thinkphp/common/convention.php
项目配置文件
     Conf/config.php

thinkPHP缓存
    define('RUNTIME_PATH','./MyApp/temp/');   定义缓存存放路径
    define('NO_CACHE_RUNTIME'，True);    不生成核心缓存
    define('STRIP_RUNTIME_SPACE',false);  对于编译缓存的内容是否去掉空白和注释

thinkPHP类库导入，Think，ORG，Com将默认为系统基类库下相关目录
    import("Think[ORG][Com].util.session")  将导入系统基类的lib/Think[ORG][Com]/util/session.class.php
    import("MyApp.Action.UserAction")  将导入MyApp/lib/Action/UserAction.class.php
       等同于 import("@.Action.UserAction");
    Vender('Zend.Filter.Dir')  将导入第三方类库目录vender/zend/fileter/dir.php
    'APP_AUTOLOAD_PATH'     => 'Think.Util.,ORG.Util.', 设置附加文件的自动导入路径，增加了一个ORG目录下
    ，注意需要多加一个点。  

thinkPHP入口文件
      <?php
         define("THINK_PATH","./ThinkPHP");
         define("APP_PATH","./home");
         require(THINK_PATH."/ThinkPHP.php");
         App::run();
thinkPHP常用项目配置，位于项目目录下的conf/config.php           
    <?php
     return array(
     'APP_DEBUG' =>true,
     'DB_TYPE'   =>'mysql',
     'DB_HOST'   =>'localhost',
     'DB_NAME'   =>'think_test',
     'DB_USER'   =>'root',
     'DB_PWD'    =>'usbw',
     'DB_PREFIX' =>'think_'
                  );
     在方法中临时设置某一配置值采用 C('参数名称','新的参数值')；

thinkPHP分组
    配置文件中加入
          'APP_GROUP_LIST'=>'Home,Admin',
            'DEFAULT_GROUP'=>'Home',
    项目目录结构中，每层加上Home，Admin的文件夹分层
    访问效果
       index.php/Home/index，由于Home是默认分组，所以还可以写为 index.php/index
       idnex.php/Admin/index
    model类可以不分组

URL伪静态
  'URL_HTML_SUFFIX'  =>'.shtml',   将所有路径后加上.shtml的伪静态效果
URL重写
apache的http.conf配置文件中加载 mod_rewrite.so模块
AllowOverride None的None改为All
确保URL_MODEL设置为2
将.htaccess文件放到入口文件同级目录下

```
<IfModule mod_rewrite.c>
RewriteEngine on
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^(.*) index.php/1 [QSA,PT,L]
</IfModule>
```


URL访问不再区分大小写
     'URL_CASE_INSENSITIVE' => true
 但如果我们定义一个UserTypeAction模块类，相应的多单词的模块名将变为   
       /index.php/user_type/list
  而不能是
      /index.php/usertype/list

空操作
   如果系统找不到相应的方法，将定位于_empty方法
       Public function _empty(){
   如果找不到相应的模块，将定位于空模块EmptyAction
          Class EmptyAction extends Action{
调用其他项目的其他模块中的方法
   R("User","importUser","App2")   调用app2项目中的 UserAction模块中的importUser方法 
   R方法的调用格式：
     R('[项目://][分组/]模块/操作','参数','控制器层名称') 
     R('Admin://Tool/User/info') //表示调用Admin项目Tool分组的User模块的info操作方法
    R('User/info',array(15))    表示调用当前项目的User模块的info操作方法，并且id参数传入15

重定向
success可以设置为ajax返回，如：$this->success("新增成功！",true) 
还可以使用重定向    $this->redirect('User/list', array('cate_id'=>2), 5,'页面跳转中~')
停留5秒后跳转刡User模块癿list操作，并且显示页面跳转中字样 

thinkphp中的AJAX
ajaxreturn(数据，'提示信息'，状态) 用于从处理提交数据的页面向提交页面的js或ajax返回数据
使用thinkphp的js库，需要载入 base,js prototype.js mootools.js thinkajax.js,在提交页面载入这些库
在按钮事件中使用 thinkajax.sendform('表单id','提交的url',回调函数，处理完的信息在哪里打开)，毁掉函数需要传入（data,status）两个参数
在status中判断是否成功


thinkphp有四种实例化模型方法

     *    创建一个基础模型,实例化系统自带的数据库操作类
              $user=new Model('User');
              其中表名第一个字母大写,表示其前面有前缀,如果表名为三段字符,
              如think_user_age,可以写为UserAge,
              等价于$user=M('User').,
    
     *    实例化其他类,实例化一个表和另外一个自己写的扩展操作类,
             自己写的model需呀继承model类
             $user=M('user','comonModel')
            
     *    实例化一个用户定义的模型,需要手动创建一个模型,继承model,
             在自定义模型中可以额封装thinkphp提供的高级功能或者自定义方法
             $user=new UserModel('User'),
             使用于更复杂的业务逻辑,但不需要使用公共的业务逻辑,
             等价于$user=D('user')
             大d方法不会重复实例化,并且只支持调用当前项目下的模型,
             如果想实例化其他项目如后台admin的的模型,
             写为$user=D('admin','user'),如果是分组写为 D('admin.user')


     *     实例化一张空模型,并不限定操作那张表
             $user=new Model();
             $list=$user->query('select * from think_user')
             等价于 $user=D();

thinkphp跨库操作
 新建一个model类型，在model里定义
      protected $connection = array(
                     'dbms' => 'mysql',
                     'username' => 'username',
                     'password' => 'password',
                     'hostname' => 'localhost',
                     'hostport' => '3306',
                     'database' => 'dbname'
                     );
  或者使用M方法，在控制器里实例化其他库
      $user=M('user.User','other_');    实例化user库里的other_user表
   或使用db方法
      ￥this->db(1,"mysql://root:12345@localhost:3306/test")->query('select ......')
   或使用 protected $dbname='user';
thinkphp的多表查询
 使用table方法
     $model->table('think_blog blog,think_type type')
        ->where('blog.typeid=type.id')
        ->field('blog.id as id,blog.title,blog.content,type.typename as type')
       ->order('blog.id desc')
       ->limit(5)
       ->select();
  使用join方法
      ￥model->table('user u')
                   ->join(new n on u.id=n.id)
                   ->field(n.*,u.*)
                   ->findall()
  在action中设置 protected $tableName='UserMessage',换一个表前缀 protected $trueTableName='cms_userMessage'

thinkphp的curd操做
连贯操作不分前后，select在最后即可
where方法，查询范围定义
table定义要操作的数据表 ￥model->table('think_user user')->where('id=1')->select();
data方法在新增和保存数据之前对数据对象赋值
field方法定义要查询的字段 $model->field('id,nickname as name')->select();
order方法 对结果进行排序 order('id desc,statue desc')
limit方法对结果限制 limit('offset,length')
distinct对查询结果进行唯一过滤 $model->disctinct(true)->select()
插入数据
    $model=M('User');
    $model->create();
    $model->add();
读取数据
   $model=M('User');
   $list=$model->where('status=1')->order('create_time')->limit(10)->select()/find()/getField('id,name');
     find方法只返回一条记录,getField方法返回指定字段值
更新数据
    $model=M('User');
    $data['name']='Thinkphp';
    $data['email']='Thinkphp@gmail.con';
    $model->where('id=5')->save($data);
    或者：
    $model=M('User');
    $model->where('id=5')->setField('name','Thinkphp');
                                      ->setField(array('name','email'),array('Thinkphp','Thinkphp@gmail.com'));
                                      ->setInc('score','id=5',3); id等于5的用户积分加3
                                      ->setDec('score','id=5',3) id等于5的用户积分减5
删除数据
    $model=M('User');
    $model->where('id=5')->delect();
    $model->where('status=0')->delect();

thinkphp自动验证和自动完成
  令牌验证
     在action中建立接受提交数据的方法，写入create方法  if（ $user->create()）{}  
     在模板中建立<form>,method设置为post方法，将自动加上令牌
     在配置文件中可以使用 'TOKEN_ON'=>false;来关闭令牌
  自动验证
    需要在model中定义$validate属性，格式为：
    array(验证字段，验证规则，错误提示，验证条件，附加规则，验证时间)
       验证字段：需要验证的字段
       验证规则：需要验证的规则，需要结合附加规则
       错误提示：如果出现错误，需要一个什么样的提示
       验证条件：0存在字段就验证（默认） 1必须验证 2值不为控时候验证
       附加规则：配合验证规则，regex 前面是使用正则验证 function前面是使用函数验证 confirm 前面定义的是一个字段名，验证两个字段是否相等 equal验证是否等于某一个值 in验证是否在某个范围内 unique验证是否唯一 callback使用方法验证，前面规则是本类的一个方法
       TP封装：require 字段必须验证；eamil 验证邮箱；url 验证url地址；currency 货币；number 数字
       验证时间：1 新增数据时候验证 2 编辑数据时候验证 3 全部情况下验证（默认）
    
       UserModel.class.php
            class UserModel extends Model{                                  //对应数据库中的表user
      protected $_validate=array(
          array('username','require','用户名必填'),
          array('username','checklen','用户名长度过长或过短',0,'callback'),
          array('password','require','密码必填'),
          array('repassword','require','重复密码必填'),
          array('password','repassword','两次密码不一致',0,'confirm'),
          array('createtime','number','您输入的不是数字'),
          array('createip','email','邮箱格式不正确'),
          array('verify','require','验证码必须！'), //默认情冴下用正则迕行验证
                  array('name','','帐号名称已绊存在！',0,’unique’,1), // 在新增癿旪候验证name字段是否唯一
      ); 
      function checklen($data){
          if(strlen($data)>15 || strlen($data)<5){
              return false;
          }else{
              return true;
          }
      }

  }
UserAction.class.php
   class UserAction extends Action {     
       function reg(){
           $this->display();    
       }
     
       function regadd(){
           $user=D('user');
           if($user->create()){
               if($user->add()){
                   $this->success('注册成功');    
               }else{
                   $this->error('注册失败');    
               }
           }else{
               $this->error($user->getError());    
           }     
       }     
  }
  自动完成
    在model类定义的$_auto属性，可以完成数据自动处理，格式为：
       array(填充字段,填充内容,填充条件,附加规则)
           填充字段：需要处理的字段
           填充条件：1新增时候处理 2更新数据的时候处理 3所有情况都处理
           附加规则：function使用函数 callback回调方法，内容是当前模型的一个方法 field填充内容是一个字段的值 string填充的是一个字符串
     protected $_auto = array (
      array( 'status','1'),   //  新增的时候把 status字段设置为 1
      array('password','md5',1,'function') ,  //  对password 字段在新增的时候使 md5 函数处理
      array('name','getName',1,'callback'), // 对name字段在新增癿旪候回调getName方法
      array('createtime','time',3,'function' ),  //  对create_time 字段在更新的时候写入当前时间戳
    ); 

查询
 查询表达式  $map['字段名']=array('表达式','查询条件')；
    表达式有 eq等于 ,neq不等于,  gt大于, lt小于 ,egt/elt 大于等于/小于等于
           like类似                                        $map['name']=array('like','thinkphp%')
           [not]between [不在]在什么之间     $map['id']=array('between','1,8')
           [not]in [不属于]属于什么集合之一   $map['id']=array('in','1,2,4')
           exp后面支持更复杂的sql表达式       $map['id']=array('exp','in(1,2,4)')
 组合查询表达式,需要设置_logic
          $map['id']=array('eq',1);
          $map['name']='ok';
          $map['_logic']='or';
          $user->where($map)->select()
     还可以使用_string来设置条件
          $map['_string']='status=1 and score>13';
 复合查询，多个数组或对象组合成条件
           $where['name']=array('like','thinkphp%');
           $where['title']=array('like','%thinkphp%');
           $where['_logic']='or';
           $map['_complex']=$where;
           $map['id']=array('gt',1)
 统计查询
    使用thinkphp内置的一些方法
          $usercount=$user->count()   //获取用户数
          $usercount=$user->max('score')   //获取最大积分
          $usercount=$user->where('score>0')->min('score')   //获取大于0的最小积分
          $usercount=$user->avg('score')     //获取用户的平均分
          $usercount=$user->sum('score')   //获取用户总成绩
  定位查询
      需要继承高级模型类才可以使用
        class UserModel extends AdvModel
          $user->where('score>1')->getN(2)  //取的查询结果中的第三条记录
                                                   first();     //获取第一条记录
                                                   last();      //获取最后一条记录
   sql查询
      可以使用query方法执行sql查询语句，返回数据集
      可以使用excute()方法执行插入，更新等sql操作，返回影响记录数
      __TABLE__ 可以使用在sql语句中代替当前模型对应的表名 
高级模型AdvModel支持字段过滤 ，序列化，只读字段，延迟更新

视图模型
  继承ViewModel 在视图中结合多个表形成一个虚拟表，然后实例化这个视图，就可以按普通方式查询
    class BlogViewModel extends ViewModel{
         public $viewFields=array(
                 'Blog'=array('id','name','title'),
                 'Category'=array('title'=>'catagory_name','_on'=>'Blog.catagory_id=category.id),
                 'User'=array('name'=>'username','_on'=>'Blog.user_id=User.id')
         )
   },其中_on定义了连接条件
   等同于：
      selct  Blog.id as id,Blog.name as name, Blog.title as title,Category.title as catagory_name,User.name as username,
               from think_blog as Blog JOIN think_category as Category JOIN think_user as User
               where Blog.catagory_id=Category.id and Blog.user_id=User.id
   还可以使用_type来定义左连接或右连接
       'Blog'=array('id','name','title','_type'=>'LEFT'),
   接着就可以使用模型正常操作
      $Model=D("BlogView")
      $Model->field('id,name,title.category_name,username')->where('id>10')->select();

关联模型
  关联关系包括 一对一关联 HAS_ONE,BELONGS_TO,一对多关联 HAS_MANY,BELONGS_TO,多对多关联 MANY_TO_MANY
  一对一关系模型，建立两张表user，info之间的关联模型，必须继承RelationModel,每一个子数组就是一个关联关系
     class UserModel extends RelationModel {
              protected $_link=array(                  //定义关联模型
                      'Info'=array(
                            'mapping_type'=>HAS_ONE,        //定义关联关系
                            'class_name'=>'Info',                    //需要关联的模型类名称
                            'mapping_name'=>'Info',             //关联的映射名称，默认取class_name值
                            'foreign_key'=>'uid',                    //关联的外键名称
                            'mapping_field'=>'uid,titile,info',  //被关联表要查询的字段
                            'as_field'=>'title,id:usid'                //将被关联表的字段加入到本表字段中，不再显示为三位数组，而是二维数组
                                                                                   并给对应冲突字段起一个别名
                        ),
              );
      }
  在控制器中
    $user=D('User');
    $list=$user->relation(true)->select();
 插入数据时候 
   $data['username']='aaaaaa';
   $data['info']=array(
                 array('info'=>'bbbbbbb'),
                 array('info'=>'ccccccccc')                  //关联表中相关字段插入了两条
   )
  更行数据时候
     $data['info']=array(
                 array('id'=>1,'info'=>'bbbbbbb'),
                 array('id'=>2,'info'=>'ccccccccc')                  //关联表中相关字段更新了两条记录，必须定义相关id
   )
 关联关系中BELONGS_TO关系，是多关联一，在model中需要设置foreign_key，关联其他表的关键字段
 ThinkPHP 关联模型使用图解_知行网

我们可以用getLastsql方法来输出上次执行癿sql询句

thinkphp扩展
  基类库扩展
    将类库放在ThinkPHP\Lib\ORG
Com
下，命名为*.class.php,使用import('com[ORG].目录.类名')
 应用类库扩展
    放在项目类库目录下，使用import('@.目录，类名')来导入
 第三方类库扩展
    放在 ThinkPHP\Vendor下，使用vendor方法来导入 Vendor('vendor下子层目录名.文件名不带后缀')
 模块扩展
    例如在项目目录下Lib\Model\ExtendAction.class.php
     在项目皮配置文件中
       returrn array(
           '模块名'=>array('导入路径'[,'类名'])
     )
 方法扩展
   在项目配置文件中   
            return array(
                 'actionName'=>'调用方法'
                //局部调用
                 'ModelName:Name'=>'调用方法'
            )

验证码
 做一个控制器command，继承Action
 在其中做一个公用方法Verify,导入ORG.Util.Image类库和ORG.Util.String,使用方法 Image::buildImageVerify()
 在要使用验证码的模板中写一个<img src="__APP__/command/verify">
 如果想要点击验证码就换一个话，将模板中的验证码改为 <img src="__APP__/command/verify" onclick="show(this)">
  ,然后在js 中写一个show方法， function show(obj){
                                        obj.src="__APP__/command/verify/random/"+Math.random();
                                }
 在控制器中验证 if($_SESSION['verrify']!=md5($_POST['verify']))
 Image::buildImageVerify()方法可以有很多参数
      buildImageVerify($length,$mode,$type,$width,$height,$verifyNmae)
              length 默认为4字符   mode 0字母 1数字 2大写字母 3小写字母 4中文  type验证码图片类型
              VerifyName验证码的session中的名字
 buildImage不支持中文验证码显示,如果想要使用中文验证码使用GBVerify方法
   需要提前import('ORG.Utile.String'),将字体文件放在image.class.php中统计目录中,然后使用image::GBVerify()方法,

数据分页
  在action中import("ORG.Util.Page")
  $count=$user->count() //查数据总数
  $page=new Page($count,每页分几个);  //实例化一个新的分页类,传入数据总数和每页分几个
  $page->setConfig()                          //设置分页显示的文字和样式
  $show=$page->show();                   //调用分页类的show() 方法显示数据
  $this->assign('page',$show)              //将分页类显示出的数据分配给模板变量page
  在控制器的查询语句中药加入limit($page->firstRow.','.$page->listRows) //分页类算出的其实位置和偏移
  在模板中加上刚分配的page的模板变量

文件上传
 新建一个FileAction,继承action,
 在模板目录新建一个文件上传的页面,做一个表单,提交给FileAction的upload方法
 upload方法判断文件类型,是否为空等,,如果错误返回一个错误信息,如果正确调用up方法进行上传
 在up方法中import('ORG.Net.UploadFile')
 $upload=New UploadFile();
 $upload->maxSize='-1';    //-1为不限制文件大小
  $upload->savePath='./Pulic/';   //上传文件的保存路径
 $upload->saveRule='uniqid'         //上传文件的保存文件名规则 
 $upload->autoCheck=''               //是否自动检测附件
 $upload->uploadReplace=true                      //如果存在同名文件是否进行覆盖
 $upload->allowExts=array('jpg','jpeg')              //准许上传的文件后缀
 $upload->allowTypes=array('image/png','image/jpeg')   //以type检测允许的上传文件类型
 $upload->thumb=true;       //是否开启图片文件缩略图
 $upload->thumbMaxWidh='300,500';
 $upload->thumbMaxHeight='300,400'                //多种缩略图大小
 $upload->thumbFrefix='s_,m_'            //缩略图文件前缀  
 设置完成后 直接调用upload()方法 如果成功返回true,如果失败还可以使用$upload->getErrorMsg()方法来获取失败原因.或者使用$upload->getUploadFileInfo()方法来获取成功后文件的相关信息

模板view
 视图默认的命名规则为：
      模板目录/模板主题/[分组名/]模块名/操作名+模板后缀
         模板目录默认为Tpl,模板主题默认为default,模板文件默认后缀为html
 模板赋值
         统一使用assign 如果多个赋值，可以做成数组，一次性赋值
 模板输出
      使用display方法，可以使用display调用其他模板
          display('分组名:模块名:操作名')
          display('主题@模块名:操作名')
      还可以指定编码和文件格式
          display('模块名:操作名','编码utf-8/gbk','text/xml')
 模板常量替换
      可以在模板中使用定义好的常量
          ../Public         /项目目录/Tpl/default/Public/
          __Public__      当前网站的公共目录 /Public
          __TMPL__       /项目目录/Tpl/default/
          __ROOT__      当前网站根目录地址
          __URL__         当前模块的url地址
          __APP__         当前项目的url地址
          __ACTION__   当前操作的url地址
          __SELF__         当前页面的url地址
         __UPLOAD__    当前网站的上传目录
         __INFO__         当前路径
        ACTION_NAME           当前操作方法名称
 APP_PATH                   代表当前项目目录
        APP_NAME                  代表当前项目名称
        CONFIG_PATH             项目配置文件目录
COMMON_PATH          项目的公共文件目录
DATA_PATH                  项目数据文件目录
LOG_PATH                    日志存放目录
MODEL_NAME              当前模块名称
MEMORY_LIMIT_ON     当前内存限制
TEMPLATE_NAME         当前模版名称
TEMPLATE_PATH           当前模版路径
        WEB_PUBLIC_PATH        网站的公共目录,主入口文件同级目录下的public.
       'TMPL_PARSE_STRING'=>array(),可用于在项目中增加模版替换变量,在config中设置即可
 模板组合
       使用:
         <!--layout::Public:header::60-->
         <!--layout::$content::30-->
         <!--layout::Public:footer::60-->
     所有模板都会调用Public/header.html和Public/footer.html，而中间部分的内容可以动态的赋值
       $this->assign('content','user:list');
       $this->display('Index:default')
 系统模板
     页面Trace模板：默认位亍系统目录癿Tpl/PageTrace.tpl.php 是一个php文件，可更改 TMPL_TRACE_FILE迕行配置。
     异常模板：默认位亍系统目录癿Tpl/ThinkException.tpl.php，可以更改
 使用第三方模板引擎
     下载官方的模板引擎扩展，放在 Lib\Think\Util\Template目录下
     下载模板引擎放在Vendor目录下
     在项目配置文件里设置 'TMPL_ENGINE_TYPE'=>'Smarty'
 模板定界符设定 TMPL_L_DELIM 和 TMPL_R_DELIM 在项目配置文件中设定
 在模板中输出数组使用[],输出对象使用:,.默认为数组输出分割,也可以配置为对象输出分割符
 使用函数的例子:
    {$webTitlle|md5|strtoupper||substr=0,3}  //等于 <?php echo (substr(strtuupper(md5($webTitle)),0,3))>,一般而言,函数的第一个参数就是前面函数的结果,如果前面函数的结果不是位于第一位,可以使用占位符###:
   {$create_time|date="y-m-d",###}
   还可以直接使用函数,而不必使用变量
      输出方法并执行返回值  {:function()}
      执行方法但不输出   {~function()}
  模板注释 {/*aaaaaa*/}
  可以在模板中直接使用的系统变量
       {$Think.get.id}  {$Think.server.变量} {$Think.session.变量}等等
  可以在模板中使用系统定义好的常量
      {$Think.const.__SELF__}
 一些特殊常量
     {$Think.now} {$Think.verson}
  快捷输出,这种方式不支持函数
    {@var}  session
    {^var}    post
     {.var}   get
  默认值输出
     {$变量|defualt='值'}
  包含文件
     {includ file="主题名@模块名:方法名" /} file的值可以是变量,在控制器中给变量赋值来改变包含内容
  加载js和css 
      <load file='' />
  循环输出 volist,还有很多可设置的输出方式,最简单的
      < volist  name='分配的变量名'  id='自己设的循环名'>
           {$自己设的循环名.id}
       </volist> 
   foreach可以循环对象,但是功能较简单
  swith标签和php功能相同,但是case中的value支持条件判断和变量
      <switch name="Think.get.type">
           <case value="gif|png|jpg">图像格式</case>
           <default />其他格式
        </switch> 
       <switch name="User.userId">
           <case value="$adminId">admin</case>
           <case value="$memberId">member</case>
         <default />default
       </switch> 
   比较标签

```
 <eq name="name" value="5" >value</eq>   如果＝5就输出
    <eq name="Think.get.name" value="value">相等<else/>丌相等</eq>
范围标签
     <in name="id" value="1,2,3" >输出内容1<else/>输出内容2</in>
变量赋值
      <assign name="var" value="123" />
if标签.condition后不能使用> <,替代为eq gt
       <if condition="($name eq 1) OR ($name gt 100) "> value1
          <elseif condition="$name eq 2" />value2
          <else /> value3
        </if> 
原样输出
         <literal>
php代码
         可以在模板内直接使用
```

原文地址：http://blog.csdn.net/small_rice_/article/details/24097873

