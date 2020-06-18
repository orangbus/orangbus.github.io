---
title: layui 笔记
sidebar: auto
---

## layui 笔记

> 

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

### 加载数据

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

### 表格内容监听事件

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
table.reload('#bm-table-list'); //表单数据刷新
```

- 选择器是 table节点的 id

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

## 跳转新tab

```js
top.layui.index.openTabsPage("{:url('StudentYear/index')}?type=5", "年份管理");
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
top.layui.index.openTabsPage("/admin/article/articleDetail.html?id="+id,title)
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

