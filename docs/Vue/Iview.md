---
title: iview 使用技巧
---

# vuex

获取值

```javascript
import {mapActions} from "vuex";

  methods: {
        ...mapActions("admin/user", ["load"]),

       getData(){
            let data = await this.load();
        this.provider = data.user; 
        }
    }
```

```javascript
load({state, dispatch}) {
    return new Promise(async resolve => {
        // store 赋值
        state.info = await dispatch('admin/db/get', {
            dbName: 'sys',
            path: 'user.info',
            defaultValue: {},
            user: true
        }, {root: true});
        if (state.info) {
            state.authorized = true;
        }
        // end
        resolve(state.info);
    })
}
```

<FormItem label="满意度" prop="manyidu">    <Input v-model="form.manyidu" type="text"           placeholder=""></Input></FormItem>



```
<Col span="24">
    <FormItem label="满意度" prop="manyidu">
        <Select v-model="form.manyidu" placeholder="请选择">
            <Option value="满意">满意</Option>
            <Option value="不满意">不满意</Option>
        </Select>
    </FormItem>
</Col>


递归更改用户所属者：orangbus:用户 www:所属组 文件夹|文件名
 chown -R orangbus:www admin.no1time.com/ 

```

# 抽屉提交模板

```html
# ui-drawer-submit
<Drawer
        title="Create"
        v-model="drawer"
        width="720"
        :mask-closable="false"
        :styles="styles"
        >
    content
    <div class="drawer-footer">
        <Button style="margin-right: 8px" @click="drawer = false">关闭</Button>
        <Button type="primary" @click="drawer = false" :loading="submitting">保存</Button>
    </div>
</Drawer>    
```

```
# ui-drawer-data
drawer: false,
styles: {
    height: 'calc(100% - 55px)',
    overflow: 'auto',
    paddingBottom: '53px',
    position: 'static'
},
```

```css
# ui-drawer-css
<style>
    .demo-drawer-footer{
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        border-top: 1px solid #e8e8e8;
        padding: 10px 16px;
        text-align: right;
        background: #fff;
    }
</style>
```

