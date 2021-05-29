---
title: layui 笔记
sidebar: auto
---

## layui 笔记

> 只是个人笔记，有需要的小伙伴可以看一下哦！

## 前段扩展包

【xm-select】layui下拉多选: [xm-select](https://maplemei.gitee.io/xm-select/#/) 

## Layui单页面多个时间选择异常

```html
<input type="text" name="addr" value="" class="layui-input" placeholder="输入上课地点" autocomplete="off" lay-verify="required" lay-reqText="时间不能为空" id="sk_time">
```

```javascript
 laydate.render({
     elem: '#sk_time' //指定元素
     ,type: 'datetime'
     ,range: true
     ,trigger:'click'
 });
```

## layui加载扩展方式

```js
layui.extend({'fileManager': 'pathTo/fileManager'});
```

## layui-table操作



### 第二页删除

```js
done: function(res, curr, count) {
    if (res.data.length == 0) {
        if(curr!=1) {
            table.reload('Bargain_list', {
                page: {
                    curr: curr - 1 //重新从第 1 页开始
                }
            });
        }
    }
}
```

### 点击事件

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

### 加载数据+搜索

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
    ,id: 'dataTable' //重载表单的id属性
    ,var $ = layui.$, active = {
    reload: function(){
    var keywords = $('#keywords')
    ,datebt=$('#datebt')
    //执行重载
    table.reload('dataTable', {
        page: {
            curr: 1 //重新从第 1 页开始
        }
        ,where: {
            keywords: keywords.val(),
            datebt:datebt.val(),
        }
    }, 'data');

    //重载后再次加载add事件del事件
    $('#keywords').val(keywords.val());
    $('#datebt').val(datebt.val());
    //日期范围
    laydate.render({
        elem: '#datebt'
        ,range: true
    });

}
};
$('.search-btn').on('click', function(){
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
});
});
```

### 表格内容监听事件

```js
// <table class="layui-hide" id="dataTable" lay-filter="dataTable"></table>
// filter: 监听表格的lay-filter

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

### 刷新当前表格

```js
table.reload('#bm-table-list'); //表单数据刷新
```

- 选择器是 table节点的 id

### 打开弹窗

```js
layer.open({
    type: 2,
    title: '关联表单字段',
    area: ['600px', '570px'],
    content: ['{{url("admin/form/ckbm/add")}}?form_type=1', 'yes'],
    skin: 'layui-layer-molv',
    btn: ['添加', '取消'],
    btnAlign: 'c',
    yes: function(index, layero){
        var submit = layero.find('iframe').contents().find("#submit");// #subBtn为页面层提交按钮ID
        submit.click();// 触发提交监听
        return false;
    },
    btn2:function (index) {
        layer.close(index);
    }
});
```

### 图片弹窗

```js
$("#form-ewm").click(function (){
    layer.open({
        type: 1,
        title: false,
        closeBtn: 0,
        area: ['auto'],
        skin: 'layui-layer-nobg', //没有背景色
        shadeClose: true,
        content: `<img src="orangbus.png"></img>`
    });
});
```

### 重载表单数据

```js
table.reload("dataTable"); //dataTable 是由表单渲染里面的id属性设置的
```

### 关闭弹窗表格重载

```js
parent.layui.table.reload('dataTable',{page:{curr:1}});
var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
parent.layer.close(index);
```

### 跳转新tab

```js
top.layui.index.openTabsPage("{:url('StudentYear/index')}?type=5", "新tab名字");
```

### 表格快捷编辑

```js
table.on('edit(dataTable)', function(obj){ //注：edit是固定事件名，dataTable是table原始容器的属性 lay-filter="对应的值"
    setField(obj.data.id, obj.field, obj.value);
});

// 该方法放在layui初始化之外
function setField(id, dataname, datavalue) {
    // 加载层
    var loading = layer.msg('处理中，请稍后...', {
        icon: 16,
        shade: 0.2
    });
    var $ = layui.jquery;

    $.ajax({
        url: "{{ route('setField') }}",
        type: 'POST',
        dataType: 'json',
        data: {
            id : id,
            dataname : dataname,
            datavalue : datavalue,
            _token: '{{ @csrf_token() }}'
        },
        success: function (data) {
            layer.close(loading);
            if (data.code == 1) {
                layer.msg(data.msg, {
                    time: 1500
                },function(){
                    window.location.reload();
                });
            } else {
                layer.alert(data.msg, {
                    icon: 2
                },function(){
                    window.location.reload();
                });
            }
        }
    });
}
```

### 表格状态快捷修改

```js
<script type="text/html" id="userStatus">
    <input type="checkbox" lay-filter="ckState" value="@{{d.id}}" lay-skin="switch"
lay-text="启用|禁止" @{{d.status==0?'checked':''}}/>
</script>

// 监听状态开关切换事件
form.on('switch(ckState)', function (data) {
    var checked = data.elem.checked ? 0 : 1;
    var id = data.value;
    setStatus(id, checked);
});

// 该方法放在layui初始化之外
// 设置显示状态
function setStatus(id, status) {
    // 加载层
    var loading = layer.msg('处理中，请稍后...', {
        icon: 16,
        shade: 0.2
    });
    var $ = layui.jquery;
    $.ajax({
        url: "{:url('admin/form/data/setStatus')}",
        type: 'POST',
        dataType: 'json',
        data: {
            id : id,
            status : status,
            _token: '{{ @csrf_token() }}'
        },
        success: function (data) {
            layer.close(loading);
            if (data.code == 1) {
                layer.msg(data.msg, {
                    time: 1500
                },function(){
                    window.location.reload();
                });
            } else {
                layer.alert(data.msg, {
                    icon: 2
                },function(){
                    window.location.reload();
                });
            }
        }
    });
}
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

## 打开新标签

```javascript
top.layui.index.openTabsPage('{:url(add)}?id='+id,title)
```

## 弹窗表单

```js
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
// =================
layer.open({
    type: 2,
    title: '编辑-' + data.name,
    area: ['600px', '700px'],
    content: ['{:url("edit")}?id=' + data.id, data.name],
    skin: 'layui-layer-molv',
    btn: ['确认', '取消'],
    btnAlign: 'c',
    yes: function (index, layero) {
        var submit = layero.find('iframe').contents().find("#submit");// #subBtn为页面层提交按钮ID
        submit.click();// 触发提交监听
        return false;
    },
    btn2: function (index, layero) {
        layer.close(index);
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

```js
date-type="add" data-id="value"

var id = $(this).data('id');
```

## Layui图片上传

```html
<div class="layui-form-item">
                    <label class="layui-form-label">专题图片：</label>
                    <div class="layui-input-block">
                        <button type="button" class="layui-btn layui-btn-sm" id="pic-upload"><i class="layui-icon">&#xe681;</i>上传图片</button>
                        <a class="layui-btn  layui-btn-sm layui-btn-danger layui-icon layui-hide" id="pic-clear">&#x1006;清除</a>
                        <div class="layui-upload-list">
                            <img class="layui-upload layui-hide" id="uploadView" src="" style="width: 200px;height: 200px;">
                            <input type="hidden" name="pic" id="pic" value="">
                            <button class="layui-btn layui-btn-sm layui-btn-danger layui-hide" id="pic-reload-upload">重新上传</button>
                        </div>
                    </div>
                </div>

<div class="layui-form-item">
                    <label class="layui-form-label">成功图片：</label>
                    <div class="layui-input-block">
                        <button type="button" class="layui-btn layui-btn-sm" id="pic-upload-success"><i class="layui-icon">&#xe681;</i>上传图片</button>
                        <a class="layui-btn  layui-btn-sm layui-btn-danger layui-icon layui-hide" id="pic-clear-success">&#x1006;清除</a>
                        <div class="layui-upload-list">
                            <img class="layui-upload layui-hide" id="uploadView-success" src="" style="width: 200px;height: 200px;">
                            <input type="hidden" name="success_pic" id="pic-success" value="">
                            <button class="layui-btn layui-btn-sm layui-btn-danger layui-hide" id="pic-reload-upload-success">重新上传</button>
                        </div>
                    </div>
                </div>
```

```js
var uploadInst = upload.render({
            elem: '#pic-upload'
            ,url: '{{ route("upload") }}' //改成您自己的上传接口
            ,headers: {}
            ,accept: 'images' //images（图片）、file（所有文件）、video（视频）、audio（音频）
            ,size: 0 //设置文件最大可允许上传的大小，单位 KB。不支持ie8/9
            ,done: function(res){
                if (res.code !== 200) return layer.msg(res.msg ? res.msg : '上传失败');
                layer.msg(res.msg ? res.msg : '上传成功');
                //添加图片地址
                let pic = $("#pic");//图片地址
                let picView= $("#uploadView"); //显示图片
                let picClear = $("#pic-clear"); //显示清除按钮
                pic.attr("value",res.imageUrl);
                picView.removeClass('layui-hide').attr('src', res.imageUrl);
                //显示清除按钮
                picClear.removeClass("layui-hide");
                picView.css("display",'block')
            }
            ,error: function(){
                $(".pic-reload-upload").show();
            }
        });
        //重新上传
        $(".pic-reload-upload").click(function (){
            uploadInst.upload();
            $(".pic-reload-upload").hide();
            return false;
        });
		// 清除已上传图片
        $("#pic-clear").click(function () {
            $(this).hide();
            $("#uploadView").attr("src","").hide();
            $("#pic").attr("value","");
        });
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

## layui - select二级联动

```html
<div class="layui-form-item">
    <label class="layui-form-label">二级联动：</label>
    <div class="layui-input-inline">
        <select name="level1" lay-filter="level1" id="level1" lay-search>
            <option value="">一级</option>
        </select>
    </div>
    <div class="layui-input-inline">
        <select name="level2" lay-filter="level2" id="level2" lay-search>
            <option value="">二级</option>
        </select>
    </div>
</div>
```

```js
form.on('select(level1)',function (data) {
            console.log(data.value)
            let selectData = {
                type: 1,
                val: data.value
            };
            console.log(selectData);
            $.ajax({
                type: "post",
                url: '{:url("query")}',
                data: selectData,
                dateType: 'JSON',
                success:function (res) {
                    if (res.status == 0){
                        let optionVal = "";
                        $.each(res.data,function (i,item) {
                            optionVal += `<option value="${item.name}">${item.name}</option>`
                            $("#level2").html(optionVal);
                            form.render('select');
                        });
                    }
                },
                error:function () {
                    layer.alert("false");
                }
            });
        });
```

## Layui 默认时间戳

首先把戳转化为日期格式在进行赋值就可以

```php
 $data["kk_time"] = date('Y-m-d H:i:s', (int)$data['kk_time']); // 2020-06-19 11:28:40
```

```javascript
laydate.render({
    elem: '#kk-time'
    ,type: 'datetime'
    ,trigger:'click'
    ,value: new Date('{:isset($data.kk_time)?$data.kk_time:""}')
});
```

## 快捷修改

```php
/**
 * 名单快捷修改
 */
public function setField(Request $request)
{
    // 获取用户提交的数据
    $data = $request->param();
    // 取出数据
    $id = $data['id'];
    $fieldname = $data['dataname'];
    $fieldvalue = $data['datavalue'];
    try {
        Cate::where('id', $id)
            ->data([$fieldname=>$fieldvalue])
            ->update();
    } catch (\Exception $e) {
        return error($e->getMessage());
    }
    return success('修改成功');
}
```

```javascript
table.on('edit(dataTable)', function (obj) { //注：edit是固定事件名，dataTable是table原始容器的属性 lay-filter="对应的值"
    setField(obj.data.id, obj.field, obj.value);
});


function setField(id, dataname, datavalue) {
        // 加载层
        var loading = layer.msg('处理中，请稍后...', {
            icon: 16,
            shade: 0.2
        });
        var $ = layui.jquery;

        $.ajax({
            url: "{:url('setField')}",
            type: 'POST',
            dataType: 'json',
            data: {
                id : id,
                dataname : dataname,
                datavalue : datavalue
            },
            success: function (res) {
                layer.close(loading);
                let {code,msg} = res;
                if (code == 1) {
                    layer.msg(msg, {
                        time: 1500
                    },function(){
                        // window.location.reload();
                    });
                } else {
                    layer.alert(msg, {
                        icon: 2
                    },function(){
                        window.location.reload();
                    });
                }
            }
        });
    }
```

### layui获取select下面的option自定义值

```html
<select name="cate_id" id="cate_id" lay-filter="cate_id">
    <option value="">请选择文章分类</option>
    <option value="" article-type="1">111</option>
    <option value="" article-type="2">222</option>
</select>
```

```javascript
// 获取：article-type的值
form.on('select(cate_id)', function (obj) {
    let type = $(obj.elem).find("option:selected").attr("article-type");
	console.log(type);
})
```



## layui表格模板

```html
{extend name="Layout/Base"}
{block name="content"}
<div class="layui-fluid">
    <div class="layui-row layui-col-space15">
        <div class="layui-col-md12">
            <div class="layui-card">
                <div class="layui-card-body">
                    <!--表格-->
                    <table class="layui-hide" id="dataTable" lay-filter="dataTable"></table>
                    <!--表头-->
                    <script type="text/html" id="tableHeader" lay-filter="tableHeader">
                        <div class="layui-row layui-col-space10">
                            <div class="layui-col-lg2 layui-col-md2">
                                <div class="layui-block">
                                    <input class="layui-input" name="keywords" id="keywords" value="" autocomplete="on" placeholder="请输入关键字">
                                </div>
                            </div>
                            <div class="layui-col-lg2 layui-col-md2">
                                <div class="layui-block">
                                    <select name="cate" lay-search>
                                        <option value="">分类不限</option>
                                        <option value="0">普通</option>
                                        <option value="1">vip</option>
                                    </select>
                                </div>
                            </div>
                            <div class="layui-col-lg2 layui-col-md2">
                                <lable class="layui-lable">表格标签:</lable>
                                <div class="layui-inline">
                                    <input type="text" name="other" id="other" class="layui-input">
                                </div>
                            </div>
                            <div class="layui-col-lg2 layui-col-md2">
                                <div class="layui-block">
                                    <input type="text" class="layui-input" id="datebt" placeholder="请选择一个时间范围">
                                </div>
                            </div>
                            <div class="layui-col-lg4 layui-col-md4">
                                <div class="layui-btn-container">
                                    <button class="layui-btn search-btn" id="search-btn" data-type="reload"><i class="layui-icon">&#xe615;</i></button>
                                    <button class="layui-btn layui-btn-normal" lay-event="add">添加</button>
                                    <button class="layui-btn layui-btn-danger" lay-event="batchDel">删除</button>
                                </div>
                            </div>
                        </div>
                    </script>
                    <!--行内元素操作-->
                    <script type="text/html" id="toolBar" lay-filter="toolBar">
                        <button class="layui-btn layui-btn-normal layui-btn-xs" lay-event="edit">编辑</button>
                        <button class="layui-btn layui-btn-xs" lay-event="detail">详情</button>
                        <button class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</button>
                    </script>
                    <!--行内事件-->
                    <script type="text/html" id="status" lay-filter="status">
                        <input type="checkbox" lay-filter="ckState" value="@{{d.status}}" lay-skin="switch"
                               lay-text="启用|禁止" @{{d.sex==0 ? 'checked':''}}/>
                    </script>
                </div>
            </div>
        </div>
    </div>
</div>
{/block}

{block name="js"}
<script>
    layui.use(['form','table','laydate',"jquery"], function () {
        var form = layui.form
            ,$ = layui.jquery
            ,laydate = layui.laydate
            , table = layui.table;

        //表格渲染
        table.render({
            elem: '#dataTable'
            , url: '/index/index/list'
            , toolbar: '#tableHeader' //指定表头
            , title: '用户数据表'
            , limit: 15 // 美业显示条数
            , page: true
            , text: {  // 指定无数据或数据异常时的提示文本
                none: '暂无相关数据' //默认：无数据。
            }
            , id: 'dataTable' //重载表格的时候需要用到
            , cols: [[
                {type: 'checkbox', fixed: 'left'}
                , {field: 'id', title: 'ID', width: 80, fixed: 'left', sort: true,}
                , {field: 'username', title: '用户名', edit: 'text'}
                , {field: 'experience', title: '积分', sort: true}
                , {field: 'status', title: '状态', toolbar: '#status'}
                , {field: 'logins', title: '登入次数',}
                , {field: '#',align:'center', title: '操作',width: 160,toolbar: '#toolBar'}
            ]],done() {
                var $ = layui.$, active = {
                    reload: function () {
                        var keywords = $('#keywords')
                            , datebt = $('#datebt')
                        //执行重载
                        table.reload('dataTable', {
                            page: {
                                curr: 1 //重新从第 1 页开始
                            }
                            , where: {
                                keywords: keywords.val(),
                                datebt: datebt.val(),
                            }
                        }, 'data');

                        //重载后再次加载add事件del事件
                        $('#keywords').val(keywords.val());
                        $('#datebt').val(datebt.val());
                    }
                };
                $('.search-btn').on('click', function () {
                    var type = $(this).data('type');
                    active[type] ? active[type].call(this) : '';
                });
            }
        });

        //头工具栏事件
        table.on('toolbar(dataTable)', function (obj) {
            let data = obj.data;
            switch (obj.event) {
                case "add":
                    console.log(obj)
                    break;
                case 'batchDel':
                    let  checkData = table.checkStatus(obj.config.id).data;
                    if (checkData.length === 0) return layer.msg('请先选择数据');
                    let ids = [];
                    checkData.map(item =>{ ids.push(item.id)}) //循环得到id数组
                    $.ajax({
                        url: "{:url('batchDel')}",
                        type: 'POST',
                        dataType: 'json',
                        data: {ids},
                        success: function (res) {
                            layer.close(loading);
                            if (res.code == 200) {
                                layer.msg(res.msg, {time: 1500});
                            } else {
                                layer.alert(res.msg, {icon: 2});
                            }
                            window.location.reload();
                        }
                    });
                    break;
            };
        });
        // 行内事件监听
        table.on('tool(dataTable)', function (obj) {
            let data = obj.data;
            switch (obj.event) {
                case "edit":
                    console.log(obj)
                    layer.open({
                        type: 2,
                        title: '分享配置',
                        area: ['700px', '600px'],
                        content: ['{:url("setting")}', 'yes'],
                        skin: 'layui-layer-molv',
                        btn: ['确定', '取消'],
                        btnAlign: 'c',
                        yes: function (index, layero) {
                            var submit = layero.find('iframe').contents().find("#submit");// #subBtn为页面层提交按钮ID
                            submit.click();// 触发提交监听
                            return false;
                        },
                        btn2: function (index, layero) {
                            layer.close(index);
                        }
                    });
                    break;
                case "detail":
                    top.layui.index.openTabsPage("http://doc.orange.cn", "OrangBus");
                    break;
                case 'del':
                    // obj.del();
                    let id = data.id;
                    alert(id);
                    break;
            };
        });

        //时间选择
        laydate.render({
            elem: '#datebt'
            ,range: true
            ,type: "date"
            ,target: true
        });
        //快捷编辑
        table.on('edit(dataTable)', function(obj){ //注：edit是固定事件名，dataTable是table原始容器的属性 lay-filter="对应的值"
            console.log(obj.data.id, obj.field, obj.value,obj);
            // setField(obj.data.id, obj.field, obj.value);
        });
        // 监听状态开关切换事件
        form.on('switch(ckState)', function (data) {
            let checked = data.elem.checked ? 0 : 1;
            let id = data.value;
            setStatus(id, checked);
        });
        function setStatus(id,status) {
            // 加载层
            let loading = layer.msg('处理中，请稍后...', {icon: 16, shade: 0.2});
            $.ajax({
                url: "{:url('admin/form/data/setStatus')}",
                type: 'POST',
                dataType: 'json',
                data: {
                    id : id,
                    status : status,
                    _token: '{{ @csrf_token() }}'
                },
                success: function (data) {
                    layer.close(loading);
                    if (data.code == 200) {
                        layer.msg(data.msg, {time: 1500});
                    } else {
                        layer.alert(data.msg, {icon: 2},function(){
                            window.location.reload();
                        });
                    }
                }
            });
        }
    });
</script>
{/block}
```

## 图片放大

```html
<a href="javascript:void(0);" onclick=viewImage("/static/images/default.png")><image style="max-width:30px;max-height:30px;" src="/static/images/default.png"/></a>
```

## 搜索

```

```

```javascript
layui.form.on('submit(user-search)', function (data) {
    layui.table.reload('userTable', {
        where: data.field
        , page: {
            curr: 1 //重新从第 1 页开始
        },
        method:'POST'
    });
    return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
});
```

## layui表单换行显示

```css
<style>
    .layui-form-label{
        text-align: left;
        float: none;
        width: 100%;
    }
    .layui-input-block{
        margin-left: 14px;
    }
    .layui-input-inline{
        margin-left: 10px;
    }
</style>
```

## 页面弹窗接受数据

接受弹窗回传参数

```javascript
window.callback=function (data,type){
    console.log(data,type);
}
```

​	传递参数给父级页面

```javascript
var  getCourse = window.iframeWindow || parent;
    getCourse.callback(newData,type);//回调方法:传递给页面的参数
    var index1 = parent.layer.getFrameIndex(window.name);
    parent.layer.close(index1);//关闭当前页
});
```

## ayui中table表格内容过多自动换行

```

<style>
.layui-table-cell {
    font-size:14px;
    padding:0 5px;
    height:auto;
    overflow:visible;
    text-overflow:inherit;
    white-space:normal;
    word-break: break-all;
}
```



