---
title: Vue技巧笔记
---

# vue父子组件互相操作

```vue
<template>
    <div class="container">
        <Row :gutter="24">
            <Col span="24">
                <Card :bordered="false" dis-hover>
                    <div class="ui-flex ui-flex-align-center ui-flex-space-between">
                        <div
                            v-if="archive.id && archive.id !== 0"
                            class="ui-flex ui-flex-align-center text-pointer userName"
                            @click="archiveModal = true">
                            <h2 class="ivu-mr-8">{{ archive.name }}</h2>
                            <Tooltip content="男" v-if="archive.sex == 1">
                                <Icon type="md-male" color="#2d8cf0"/>
                            </Tooltip>
                            <Tooltip content="女" v-if="archive.sex == 2">
                                <Icon type="md-female" color="red"/>
                            </Tooltip>
                            <div class="ivu-ml">
                                <span>手机号：{{ archive.phone }}</span>
                            </div>
                            <div class="ivu-ml">
                                <span>民族：{{ archive.mz ? archive.mz : ' - ' }}</span>
                            </div>
                            <div class="ivu-ml">
                                <span>身份证：{{ archive.id_card ? archive.id_card : ' - ' }}</span>
                            </div>
                        </div>
                    </div>
                </Card>
                <!--                <ArchiveDetail :archive="archive" :col="4"></ArchiveDetail>-->
            </Col>
            <Col span="24" class="ivu-mt">
                <Card dis-hover>
                    <Button type="primary" size="default" @click="create">添加</Button>
                    <Table
                        ref="table"
                        :columns="columns"
                        :data="list"
                        :transfer="true"
                        :border="true"
                        :loading="loading"
                        class="ivu-mt"
                    >
                        <template slot-scope="{ row,index }" slot="title">
                            <Tooltip :content="row.title" :transfer="true">
                                <span> {{ row.title }}</span>
                            </Tooltip>
                        </template>

                        <template slot-scope="{ row,index }" slot="name">
                            {{ row.name }}
                            <Tooltip :transfer="true" content="男" v-if="row.sex == 1">
                                <Icon type="md-male" color="primary"/>
                            </Tooltip>
                            <Tooltip :transfer="true" content="女" v-if="row.sex == 2">
                                <Icon type="md-female" color="red"/>
                            </Tooltip>
                        </template>

                        <template slot-scope="{ row }" slot="sex">
                            <Tag color="cyan" v-if="row.mz != ''">{{ row.mz }}</Tag>
                        </template>

                        <template slot-scope="{ row }" slot="status">
                            <CustomerStatus :status="row.status"></CustomerStatus>
                        </template>

                        <template slot-scope="{ row }" slot="channel">
                            <span v-for="(item,index) in param.channel" :key="index" v-if="row.channel_id == item.id"
                                  :style="'color:'+item.color">{{ item.name }}</span>
                        </template>
                        <template slot-scope="{ row }" slot="yxd">
                            <Tag v-for="(item,index) in param.yxd" :key="index" :color="item.color"
                                 v-if="row.yxd_id == item.id">{{
                                    item.name
                                }}
                            </Tag>
                        </template>
                        <template slot-scope="{ row }" slot="hangye">
                            <Tag v-for="(item,index) in param.hanye" :key="index" :color="item.color"
                                 v-if="row.hangye_id == item.id">{{
                                    item.name
                                }}
                            </Tag>
                        </template>
                        <template slot-scope="{ row, index }" slot="action">
                            <a @click="follow(index)">跟进</a>
                        </template>
                    </Table>
                    <div class="ivu-mt ivu-text-center">
                        <Page
                            :total="total"
                            :current.sync="current"
                            show-total
                            show-sizer
                            :page-size="limit"
                            @on-page-size-change="handleChangePageSize"
                        />
                    </div>
                </Card>
            </Col>
        </Row>
        <!--跟进-->
        <Drawer
            title="客户跟进"
            v-model="followDrawer"
            width="1200"
            placement="right"
            :mask-closable="true"
            :closable="true"
        >
            <!--            <follow :customer="customer" :param="param" @setTypeResult="setTypeResult"></follow>-->
            <follow
                v-if="followDrawer"
                :theCustomer="customer"
                :param="param"
                @setTypeResult="setTypeResult"
                @apply="apply"
            ></follow>
        </Drawer>
        <!--追加线索-->
        <Modal
            title="追加线索"
            v-model="createModal"
            :fullscreen="false"
            :transfer="false"
            :draggable="true"
            :scrollable="true"
            :loading="createCreating"
            width="1000"
            @on-ok="confirmCreate"
        >
            <Form v-if="createModal" :model="form" :rules="formRules" :label-width="labelWidth"
                  :label-position="labelPosition"
                  ref="create">
                <Row :gutter="24" justify="start">
                    <Col v-bind="grid">
                        <FormItem label="咨询人类型" prop="name_type">
                            <Select v-model="form.name_type" placeholder="请选择">
                                <Option value="1" selected>本人</Option>
                                <Option value="2">代咨询</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col v-bind="grid">
                        <FormItem label="来源渠道" prop="channel_id">
                            <Select v-model="form.channel_id" placeholder="请选择">
                                <Option v-for="(item,index) in param.channel" :key="index"
                                        :value="(item.id).toString()">
                                    {{ item.name }}
                                </Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col v-bind="grid">
                        <FormItem label="客户等级" prop="level_id">
                            <Select v-model="form.level_id" placeholder="请选择">
                                <Option v-for="(item,index) in param.level" :key="index" :value="(item.id).toString()">
                                    {{
                                        item.name
                                    }}
                                </Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col v-bind="grid">
                        <FormItem label="意向度" prop="yxd_id">
                            <Select v-model="form.yxd_id" placeholder="请选择">
                                <Option v-for="(item,index) in param.yxd" :key="index" :value="(item.id).toString()">{{
                                        item.name
                                    }}
                                </Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="项目类型" prop="sex">
                            <RadioGroup v-model="form.pro_type">
                                <!--<Radio :label="1">课程</Radio>-->
                                <Radio :label="2">自定义</Radio>
                            </RadioGroup>
                        </FormItem>
                    </Col>
                    <Col span="24" v-if="form.pro_type == 1">
                        <FormItem label="咨询课程" prop="course">
                            <Button type="primary" @click="courseAdd" ghost icon="md-add" class="ivu-mr">添加</Button>
                            <Table :transfer="true" :columns="Coursecolumns" :data="selectCourseData" class="ivu-mt"
                                   size="small"
                                   v-if="selectCourseData.length > 0">
                                <template slot-scope="{ row }" slot="method">
                                    <span v-for="(item,index) in courseParam.methodList"
                                          :key="index"
                                          v-if="item.type == row.method">{{ item.name }}</span>
                                    {{ row.method }}
                                </template>
                                <template slot-scope="{ row }" slot="price">
                                    <strong>{{ row.price }}</strong>/{{ row.undeline_price }}
                                </template>
                                <template slot-scope="{ row }" slot="teacher">
                                    <strong>{{ row.teacher_id }}</strong>
                                </template>
                                <template slot-scope="{ row }" slot="org_school">
                                    <strong>【{{ row.school ? row.school.name : '' }}】</strong>
                                    <span>{{ row.school ? row.school.org ? row.school.org.name : '' : '' }}</span>
                                </template>
                                <template slot-scope="{ row, index }" slot="action">
                                    <Poptip
                                        confirm
                                        :transfer="true"
                                        title="确定删除?"
                                        @on-ok="removeCourse(index)"
                                    >
                                        <Icon type="ios-trash-outline" color="red" size="24"/>
                                    </Poptip>
                                </template>
                            </Table>
                        </FormItem>
                    </Col>
                    <Col span="24" v-if="form.pro_type == 2">
                        <FormItem label="咨询项目" prop="title">
                            <Input v-model="form.title" type="textarea" :autosize="{minRows: 2,maxRows: 6}"
                                   placeholder="请输入咨询内容"></Input>
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="咨询内容" prop="content">
                            <Input v-model="form.content" type="textarea" :autosize="{minRows: 4,maxRows: 8}"
                                   placeholder="请输入咨询内容"></Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </Modal>

        <!--添加课程-->
        <Modal
            title="咨询课程"
            v-model="courseModal"
            :fullscreen="false"
            :transfer="false"
            width="1000"
            @on-ok="confirmCourse"
        >
            <courseList ref="courseList"></courseList>
        </Modal>

        <!--客户资料-->
        <Drawer
            v-if="archive.id && archive.id !== 0"
            v-model="archiveModal"
            title="客户资料"
            width="1000"
            placement="left"
            :mask-closable="true"
            :closable="true"
        >
            <ArchiveDetail v-if="archiveModal" :theCustomer="archive" :param="param"></ArchiveDetail>
        </Drawer>
    </div>
</template>

<script>
import {customerEdit} from '@api/customer';
import ArchiveDetail from '@/components/customer/ArchiveDetail';
// import ArchiveDetail from '../common/ArchiveDetail';
import courseList from '../common/courseList';
import {customerAdd, customerArchive, customerArchiveDetail, customerParam} from '../../../api/customer';
// import follow from "../common/follow";
import follow from '@/pages/customer/follow/index'
import CustomerStatus from '../../../components/field/customer/CustomerStatus';

export default {
    name: 'add',
    watch: {
        formData: function (val) {
            this.form = val;
        }
    },
    components: {
        follow, ArchiveDetail, courseList, CustomerStatus
    },
    data() {
        return {
            archiveModal: false,
            createModal: false,
            createCreating: true,
            Coursecolumns: [
                {
                    title: '课程名称',
                    key: 'name',
                    minWidth: 250,
                    show: true,
                    tooltip: true,
                },
                {
                    title: '课程模式',
                    key: 'method',
                    minWidth: 100,
                    show: true,
                    slot: 'method',
                },
                {
                    title: '机构分校',
                    key: 'org_school',
                    minWidth: 140,
                    slot: 'org_school',
                    show: true
                },
                {
                    title: '售价/划线价',
                    key: 'price',
                    minWidth: 100,
                    align: 'center',
                    slot: 'price',
                    show: true
                }
            ],
            columns: [
                {
                    title: '咨询项目',
                    key: 'title',
                    slot: 'title',
                    minWidth: 250,
                    show: true
                },
                {
                    title: '姓名',
                    key: 'name',
                    minWidth: 140,
                    slot: 'name',
                    show: true
                },
                {
                    title: '手机号',
                    key: 'phone',
                    minWidth: 130,
                    show: true
                },
                {
                    title: '微信号',
                    key: 'wechat',
                    minWidth: 130,
                    show: true
                },
                {
                    title: '状态',
                    key: 'status',
                    slot: 'status',
                    align: 'center',
                    minWidth: 100,
                    show: true,
                },
                {
                    title: '来源',
                    key: 'channel',
                    minWidth: 100,
                    slot: 'channel',
                    show: true
                },
                {
                    title: '意向度',
                    key: 'yxd',
                    minWidth: 100,
                    slot: 'yxd',
                    show: true
                },
                {
                    title: '行业',
                    key: 'hangye',
                    minWidth: 100,
                    slot: 'hangye',
                    show: true
                },
                {
                    title: '创建时间',
                    key: 'created_at',
                    minWidth: 170,
                    show: true
                },
                {
                    title: '操作',
                    slot: 'action',
                    align: 'center',
                    fixed: 'right',
                    minWidth: 120,
                    show: true
                }
            ],
            loading: false,
            current: 1,
            limit: 10,
            total: 0,
            param: {},
            courseParam: {}, //课程参数
            customer: {}, //当前操作线索

            creating: true,
            hasCourseModal: false, //已经存在课程
            hasCourseList: [], //已经存在的课程列表
            archive: {}, //档案信息
            grid: {
                xl: 12,
                lg: 12,
                md: 12,
                sm: 24,
                xs: 24
            },
            index: 1,
            keys: {},// 提取formFiled的字段
            form: {
                id: 0,
                name_type: '1',
                level_id: '',
                tj_phone: '',
                channel_id: '',
                yxd_id: '',
                content: '',
                pro_type: 2, // 项目类型
            },
            formRules: {
                channel_id: [
                    {required: true, message: '必选', trigger: 'change'}
                ],
                level_id: [
                    {required: true, message: '必选', trigger: 'change'}
                ],
                yxd_id: [
                    {required: true, message: '必选', trigger: 'change'}
                ],
                pro_type: [
                    {required: true, message: '必选', trigger: 'change'}
                ]
            },
            isOk: false, //是否允许提交表单
            courseModal: false, //课程弹窗

            archive_id: 0, //档案表
            selectCourseData: [],
            list: [], // 线索列表

            followDrawer: false,

        }
    },
    created() {
        this.archive_id = this.$route.query.archive_id;
        this.getArchive();
        this.getCustomer();
    },
    methods: {
        // 报名
        apply(row, index) {
            this.followDrawer = false;
            this.index = index;
            this.customer = row;
            this.$router.push({
                path: '/student/apply',
                query: {
                    id: row.id,
                    archive_id: row.archive_id
                }
            })
        },
        create() {
            this.form = {
                name_type: '1',
                pro_type: 2, // 项目类型
            };
            this.createModal = true;
        },
        confirmCreate() {
            this.$refs.create.validate(validate => {
                if (this.form.title == '' && this.form.course == '') {
                    return this.$Message.warning('请输入咨询内容');
                }
                if (validate) {
                    this.form.archive_id = this.archive.id;
                    customerAdd(this.form).then(res => {
                        if (res.code === 200) {
                            this.getCustomer();
                            this.createModal = false;
                            this.$Message.success(res.msg);
                        } else {
                            this.$Message.error(res.msg);
                        }
                        this.createCreating = false;
                        this.$nextTick(function () {
                            this.createCreating = true;
                        })
                    });
                } else {
                    this.createCreating = false;
                    this.$nextTick(function () {
                        this.createCreating = true;
                    })
                }
            });
        },
        courseAdd() {
            this.courseModal = true;
            // 获取课程信息
            this.$refs.courseList.getParam();
            this.$refs.courseList.getOrgList();
            this.$refs.courseList.getData();
        },
        // 获取参数信息
        getParam() {
            customerParam().then(res => {
                this.param = res.data;
            });
        },
        // 确定课程
        confirmCourse() {
            this.courseParam = this.$refs.courseList.param;
            let courseList = this.$refs.courseList.selectedData;
            this.selectCourseData = courseList;
            if (courseList == null || courseList == '') {
                return this.$Message.error('请选择课程');
            }
            // 检查课程是否已经存在
            let course = []; //课程列表
            let course_ids = []; // 课程id
            courseList.forEach(item => {
                course_ids.push(item.id);
                let data = {};
                data.id = item.id;
                data.name = item.name;
                data.school_id = item.school_id;
                course.push(data);
            })
            this.isOk = true;
            this.form.course = course;
        },
        removeCourse(index) {
            this.form.course.splice(index, 1);
            this.selectCourseData.splice(index, 1);
        },
        // 提交数据
        submitForm() {
            this.$refs.create.validate((valid) => {
                if (valid) {
                    customerEdit(this.form).then(res => {
                        this.submitResult(res);
                    });
                }
            })
        },
        // 表单提交结果
        submitResult(result) {
            this.$emit('submitResult', result);
        },
        // 获取档案信息
        getArchive() {
            customerArchiveDetail({archive_id: this.archive_id}).then(res => {
                this.archive = res.data;
            });
        },
        // 获取线索
        getCustomer() {
            customerArchive({archive_id: this.archive_id}).then(res => {
                let {data, total} = res;
                this.list = data;
                this.total = total;
            });
        },

        // 跟进
        follow(index) {
            this.index = index;
            this.customer = this.list[index];
            this.followDrawer = true;
        },
        // 标记无效，1、转入公海无效，2、删除当前数据
        setTypeResult() {
            this.followDrawer = false;
            this.list.splice(this.index, 1);
        },

        // 选中一项，将数据添加至已选项中
        handleSelect(selection, row) {
            this.selectedData.push(row);
        },
        // 取消选中一项，将取消的数据从已选项中删除
        handleSelectCancel(selection, row) {
            const index = this.selectedData.findIndex(item => item.name === row.name);
            this.selectedData.splice(index, 1);
        },
        // 当前页全选时，判断已选数据是否存在，不存在则添加
        handleSelectAll(selection) {
            selection.forEach(item => {
                if (this.selectedData.findIndex(i => i.name === item.name) < 0) {
                    this.selectedData.push(item);
                }
            });
        },
        // 取消当前页全选时，将当前页的数据（即 dataWithPage）从已选项中删除
        handleSelectAllCancel() {
            this.selectedData = [];
        },
        // 切换每页条数
        handleChangePageSize(limit) {
            this.limit = limit;
            this.getData();
        }
    },
    mounted() {
        this.getParam();
    },
    computed: {
        labelWidth() {
            return this.isMobile ? undefined : 100;
        },
        labelPosition() {
            return this.isMobile ? 'top' : 'right';
        },
        labelKeys: function () {
            let ids = [];
            this.selectLabelData.forEach(item => {
                ids.push(item.id);
            })
            return ids;
        },
        // 动态设置列
        tableColumns() {
            const columns = [...this.columns];
            return columns.filter(item => item.show);
        }
    }
}
</script>
<style scoped>

</style>


```



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
// data
keys:{},
form: {
  id: "",
  name: "",
},
formRule: {
  name: [
    {required: true, message: '网站名称不能为空', trigger: 'blur'}
  ],
}

created() {
    // 表单提交值
    this.keys = Object.keys(this.form);
},

// methods
submitForm(name) {
  this.$refs[name].validate((valid) => {
    if (valid) {
      websiteStore(_.pick(this.form,this.keys)).then(res=>{
        this.$Message.success('Success!');
      });
    }
  })
},
resetForm(name) {
  this.$refs[name].resetFields();
}
```

## 表单验证规则

```javascript
string
number
boolean
method
regexp
integer
float
array
object
enum
date
url
hex
email
any




:rules="formRules"

formRules: {
        name: [
            {required: true, message: '请输入机构名称', trigger: 'blur'}
        ],
        phone: [
            {required: true, message: '请输入电话号码', trigger: 'blur'},
            {min:11, message: '手机号码必须为11位', trigger: 'blur'},
            {max:11, message: '手机号码必须为11位', trigger: 'blur'},
        ],
         email: [
             { type:"email", message: '请输入正确的邮箱格式', trigger: 'blur'}
         ]
            },
```

```javascript
const descriptor = {
  role: { type: 'enum', enum: ['admin', 'user', 'guest'] },
};

```

## 下拉框验证

```javascript
{ type: 'number', required: true, message: '请选择案件类型', trigger: 'change' }
```

## 表单提交

```javascript
ui-form-submit

formSubmit() {
    this.$refs.create.validate((valid) => {
        if (valid) {
            $method$(_.pick(this.form, this.keys)).then(res => {
                if (res.code === 200) {
                    this.$Message.success(res.msg);
                    this.showCreate = false;
                    this.creating = false;
                    this.$nextTick(() => {
                        this.creating = true;
                    });
                    if (this.form.id > 0) {
                        const index = this.list.findIndex(item => item.id === this.form.id);
                        this.list[index] = this.form;
                    } else {
                        this.getData();
                    }
                } else {
                    this.$Message.error(res.msg);
                    this.showCreate = true;
                    this.creating = false;
                    this.$nextTick(() => {
                        this.creating = true;
                    });
                }
            });
        } else {
            this.creating = false;
            this.$nextTick(() => {
                this.creating = true;
            });
        }
    });
},
```



## 表格

层级处理：`:transfer=“true”` 

```html
<template slot-scope="{ row, index }" slot="action">
    <Button type="primary" size="small" style="margin-right: 5px" @click="edit(index)">编辑</Button>
    <Button type="error" size="small" @click="delete(index)">删除</Button>
</template>
  <Dropdown @on-click="(name) => action(name, index)" :transfer="true">
                        <a type="text">更多
                            <Icon type="ios-arrow-down"/>
                        </a>
                        <DropdownMenu slot="list" trigger="hover" :transfer="true">
                            <DropdownItem name="detail">线索详情</DropdownItem>
                            <DropdownItem name="editArchive">编辑客户</DropdownItem>
                            <DropdownItem name="transfer">转移线索</DropdownItem>
                            <DropdownItem name="project">新增项目</DropdownItem>
                            <DropdownItem divided name="delete">删除</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>

 <template slot-scope="{ row }" slot="name">
     <strong>{{ row.name }}</strong>
</template>

```

```javascript
 // 更多
action(name, index) {
    this.setCustomerByIndex(index);
    switch (name) {
        case 'editArchive':
            this.archiveEditModal = true;
            break;
        case 'detail':
            // this.detailShow = true;
            this.edit(index, true)
            break;
        case 'delete':
            this.$Modal.confirm({
                title: '删除提示',
                content: `是否删除${this.list[index].title}？`,
                onOk: () => {
                    customerDelete({id: this.list[index].id}).then(res => {
                        this.list.splice(index, 1);
                        this.$Message.success(res.msg);
                    });
                }
            });
            break;
        case 'transfer': // 转移线索
            this.transferModal = true;
            break;
        case 'project':
            this.$router.push({
                path: '/customer/add',
                query: {
                    archive_id: this.customer.archive_id
                }
            });
            break;
    }
},
```



表格查询参数

```
ui-table-form
```



```html
<template>
    <Form ref="form" :model="data" :rules="rules" :label-width="labelWidth" :label-position="labelPosition">
        <Row :gutter="24" type="flex" justify="space-between">
            <Col v-bind="grid">
                <FormItem label="名字：" prop="name" label-for="name">
                    <Input v-model="data.name" placeholder="请输入" element-id="name"/>
                </FormItem>
            </Col>
            <Col v-bind="grid">
                <FormItem label="创建时间：" prop="datebt" label-for="datebt">
                    <DatePicker type="daterange" v-model="data.datebt" format="yyyy-MM-dd HH:mm:ss"
                                placeholder="请选择时间"></DatePicker>
                </FormItem>
            </Col>
            <template v-if="collapse">

            </Col>
            </template>
            <Col v-bind="grid" class="ivu-text-right">
                <FormItem>
                    <Button type="primary" @click="handleSubmit">查询</Button>
                    <Button class="ivu-ml-8" @click="handleReset">重置</Button>
                    <a v-font="14" class="ivu-ml-8" @click="collapse = !collapse">
                        <template v-if="!collapse">
                            展开
                            <Icon type="ios-arrow-down"/>
                        </template>
                        <template v-else>
                            收起
                            <Icon type="ios-arrow-up"/>
                        </template>
                    </a>
                </FormItem>
            </Col>
        </Row>
    </Form>
</template>
<script>
import {mapState} from 'vuex';

export default {
    props: {},
    data() {
        return {
            grid: {
                xl: 6,
                lg: 6,
                md: 6,
                sm: 24,
                xs: 24
            },
            collapse: false,
            data: {
                name: '',
                databt: [],
            },
            rules: {}
        }
    },
    computed: {
        ...mapState('admin/layout', [
            'isMobile'
        ]),
        labelWidth() {
            return this.isMobile ? undefined : 100;
        },
        labelPosition() {
            return this.isMobile ? 'top' : 'right';
        }
    },
    methods: {
        handleSubmit() {
            this.$emit('on-submit', this.data);
        },
        handleReset() {
            this.$refs.form.resetFields();
            this.$emit('on-reset');
        }
    }
}
</script>

```

## 表格辅助方法

```javascript
// 改变表格尺寸
handleChangeTableSize(size) {
    this.tableSize = size;
},
// 表格全屏
handleFullscreen() {
    this.tableFullscreen = !this.tableFullscreen;
    this.$emit('on-fullscreen', this.tableFullscreen);
},
// 刷新表格数据
handleRefresh() {
    this.getData();
},
// 重置表格列设置
handleResetColumn() {
    this.columns = this.columns.map(item => {
        const newItem = item;
        newItem.show = true;
        return newItem;
    });
},
```

## 表格内文字内容过长时

```css
.text-two-line
```



```html
<Ellipsis :text="row.intro" :height="100" tooltip />
<h3>属性</h3>
<h5>text</h5> 							//文本
<h5>height</h5>							//限制高度（指定文字大小）
<h5>lines</h5>							//指定行数，与height连用时会被忽略
<h5>length</h5>							//指定长度
<h5>full-width-recognition</h5>			//是否将全角字符的长度视为2来计算字符串长度，适用于 length	
<h5>disabled</h5>						//是否禁用	
<h5>tooltip	</h5>						//是否开启 tooltip	
<h5>transfer</h5>						//tooltip 的 transfer 属性	
<h5>theme</h5>							//tooltip 的 theme 属性，可选值为 light 或 dark	
<h5>max-width</h5>						//tooltip 的 max-width 属性	
<h5>placement</h5>						//tooltip 的 placement 属性	


<h3>事件</h3>
<h5>on-show</h5>						//文本全部展示的时候触发
<h5>on-hide</h5>						//文本省略的时候触发																					
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

<h1>table选择</h1>

```javascript
@on-sort-change="handleSortChange"
@on-filter-change="handleFilterChange"
@on-select="handleSelect"
@on-select-cancel="handleSelectCancel"
@on-select-all="handleSelectAll"
@on-selection-change="selectChange"
```

<h4>清空</h4>

```javascript

// 清空所有已选项this.selectedData = [];
handleClearSelect() {
    let ids = [];
    this.selectedData.forEach(item=>{
        ids.push(item.id);
    })
    this.$Modal.confirm({
        title: '删除提示',
        content: `是否删除？`,
        onOk: () => {
            deleteCate({ids}).then(res => {
                this.$Message.success(res.msg);
                this.selectedData = [];
                this.getData();
            });
        }
    });
},
```

```javascript
 // 点击排序按钮时触发
        handleSortChange({key, order}) {
            // 将排序保存到数据
            this.sortColumns = key;
            this.sortType = order;
            this.current = 1;
        },
        // 过滤条件改变时触发
        handleFilterChange() {
            // 从第一页开始
            this.current = 1;
        },
        // 选中一项，将数据添加至已选项中
        handleSelect(selection, row) {
            this.selectedData.push(row);
        },
        // 取消选中一项，将取消的数据从已选项中删除
        handleSelectCancel(selection, row) {
            const index = this.selectedData.findIndex(item => item.name === row.name);
            this.selectedData.splice(index, 1);
        },
        // 当前页全选时，判断已选数据是否存在，不存在则添加
        handleSelectAll(selection) {
            selection.forEach(item => {
                if (this.selectedData.findIndex(i => i.name === item.name) < 0) {
                    this.selectedData.push(item);
                }
            });
        },
        // 选项发生改变时
        selectChange(selection){
            this.selectedData = selection;
        },
```

## 时间处理

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

// this.form.expire_time 时间对象
this.$Date(this.form.expire_time).format('YYYY-MM-DD HH:mm:ss');
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

```javascript
// 图片放大
bigPic(url) {
    let list = [];
    list.push(url);
    this.$viewerApi({
        images: list, // 必须是已数组的形式传递 ["image.png","avatar.png",....]
    })
},
```

## 单选

```html
ui-radio
<RadioGroup v-model="menuData.node_type" @on-change="changeNodeType">
     <Radio label="1">永久有效</Radio>
     <Radio label="2">到期时间</Radio>
</RadioGroup>
```



## 布局

```html
<Modal
    v-model="modal"
    :title="title"
       :loading="creating"
       :fullscreen="true"
       :transfer="false"
       @on-ok="confirm"
       @on-cancel="cancel">
    
</Modal>

ui-modal
enum("false","true")
```

```html
<Row type="flex" align=$alias$ justify="$justify$" gutter="$gutter$" wrap="$wrap$">
    
</Row>

ui-row
enum("top","middle","bottom")
enum("start","end","center","space-around","space-between" )
enum(0,8,24)
enum("true","false")
```



```
enum("",span","offset","push","pull")
```

```
 <Col v-bind="grid" $tips$>
   
</Col>
```

## 常规状态

```html
<Tag v-if="row.sex === 0">未知</Tag>
<Tag v-if="row.sex === 1" color="blue">男</Tag>
<Tag v-if="row.sex === 2" color="magenta">女</Tag>
```

## 表格菜单下拉

```html
ui-tb-action-more

<template slot-scope="{ row, index }" slot="action">
    <a @click="handleUpdate(index)">跟进</a>
    <Divider type="vertical" />
    <Dropdown @on-click="(name) => action(name, index)">
        <a type="text">更多<Icon type="ios-arrow-down" /></a>
        <DropdownMenu slot="list" trigger="hover" transfer="true" >
            <DropdownItem name="edit">编辑</DropdownItem>
            <DropdownItem name="detail">详情</DropdownItem>
            <DropdownItem divided name="delete">删除</DropdownItem>
        </DropdownMenu>
    </Dropdown>
</template>
```

```java
// 更多
action(name) {
    switch (name) {
        case "edit":

            break;
        case "detail":

            break;
        case "delete":

            break;
    }
},
```

## 时间轴

```html
ui-timeline

<Timeline>
    <TimelineItem color="$poprs$">
        <p class="time">1976年</p>
        <p class="content">Apple I 问世</p>
    </TimelineItem>
    <TimelineItem>
        <p class="time">1984年</p>
        <p class="content">发布 Macintosh</p>
    </TimelineItem>
    <TimelineItem>
        <p class="time">2007年</p>
        <p class="content">发布 iPhone</p>
    </TimelineItem>
    <TimelineItem>
        <p class="time">2010年</p>
        <p class="content">发布 iPad</p>
    </TimelineItem>
    <TimelineItem>
        <p class="time">2011年10月5日</p>
        <p class="content">史蒂夫·乔布斯去世</p>
    </TimelineItem>
</Timeline>


enum("green",'red','blue')
```



## 图标

```html
ui-icon

<Icon type="$type$" $props$ />


enum("md-add",'md-clipboard')
enum("size",'color','custom')
```
## Driawer
```html
<Drawer
        :title="detail.name"
        v-model="showDrawer"
        width="720"
        placement="right"
        :mask-closable="true"
        :closable="true"
        >

    <div class="drawer-footer">
        <Button style="margin-right: 8px" @click="value3 = false">关闭</Button>
        <Button type="primary" @click="value3 = false">Submit</Button>
    </div>
</Drawer>
```

```javascript
showDrawer:true,
    
    
```

```less
.drawer {
    &-footer {
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        border-top: 1px solid #e8e8e8;
        padding: 10px 16px;
        text-align: right;
        background: #fff;
    }
}
```

## 弹窗表单

```html
<Form :model="form" :rules="formRules" :label-width="labelWidth" :label-position="labelPosition" ref="create">
            <Row :gutter="24" justify="start">
                <Col space="8">
                    <Col v-bind="grid">
                        <FormItem label="姓名：" prop="title" label-for="name">
                            <Input v-model="form.name" placeholder="" @on-blur="checkUser"/>
                        </FormItem>
                    </Col>
                    <Col v-bind="grid">
                        <FormItem label="咨询人类型" prop="name_type">
                            <Select v-model="form.name_type" placeholder="请选择">
                                <Option value="1" selected>本人</Option>
                                <Option value="2">代咨询</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col v-bind="grid">
                        <FormItem label="性别" prop="sex">
                            <RadioGroup v-model="form.sex">
                                <Radio label="1">男</Radio>
                                <Radio label="2">女</Radio>
                            </RadioGroup>
                        </FormItem>
                    </Col>
                    
                <Col span="24">
                    <FormItem label="咨询内容" prop="content">
                        <Input v-model="form.content" type="textarea" :autosize="{minRows: 4,maxRows: 8}"
                               placeholder="请输入咨询内容"></Input>
                    </FormItem>
                </Col>
            </Row>
        </Form>
```

```javascript
 computed: {
        labelWidth() {
            return this.isMobile ? undefined : 100;
        },
        labelPosition() {
            return this.isMobile ? 'top' : 'right';
        },
    }
```

## 性别

```html
 <Tooltip content="男">
     <Icon type="md-male" color="primary"/>
</Tooltip>
<Tooltip content="女">
    <Icon type="md-female" color="red"/>
</Tooltip>
```

## 地址

```html
<Col span="24">
    <FormItem label="地址" prop="addr">
        <i-region v-model="form.addr"/>
    </FormItem>
</Col>
<Col span="24">
    <FormItem label="详细地址" prop="addr_detail">
        <Input v-model="form.addr_detail" type="textarea" :autosize="{minRows: 3,maxRows: 6}"
               placeholder="请输入详细地址"></Input>
    </FormItem>
</Col>
```

<h3>格式化地址</h3>

```html
<template slot-scope="{ row }" slot="addr">
    {{ transformAddr(row.addr)}}
    <p> &nbsp;&nbsp;{{ row.addr_detail }}</p>
</template>
```

```javascript
transformAddr(addr=[]){
    if (addr == null || addr == '' || addr.length == 0){
        return  "";
    }
    let str = "";
    if (addr.length > 0){
        addr.forEach(item=>{
            str += " " +item.name;
        })
    }
    return str;
},
```

## 时间查询

ui-date-search

```html
<FormItem label="创建时间：" prop="date" label-for="btdate">
     <DatePicker v-model="data.btdate" type="daterange" :options="dateOptions" placeholder="请选择时间" />
</FormItem>
```

ui-date-search-dateOptions

```java
date: []

dateOptions: {
    shortcuts: [
        {
            text: '今天',
            value: () => {
                const date = this.$Date(new Date()).format('YYYY-MM-DD');
                return [date, date];
            }
        },
        {
            text: '昨天',
            value: () => {
                let date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                date = this.$Date(date).format('YYYY-MM-DD');
                return [date, date];
            }
        },
        {
            text: '本周',
            value: () => {
                const date = new Date();
                const start = this.$Date(date).day(1).format('YYYY-MM-DD');
                const end = this.$Date(date).day(7).format('YYYY-MM-DD');
                return [start, end];
            }
        },
        {
            text: '本月',
            value: () => {
                const date = new Date();
                const start = this.$Date(date).date(1).format('YYYY-MM-DD');
                const end = this.$Date(date).add(1, 'month').date(1).subtract(1, 'day').format('YYYY-MM-DD');
                return [start, end];
            }
        }
    ]
}
```

## 支付状态

ui-badge

```html
<Badge color="$COLOR$" text="$TEXT$" />

enum("blue","green","red")
enum("支付成功","支付失败","正常","关闭","失败")
```




## 提示

ui-tooltip

```html
<Tooltip max-width="200" content="$content$">
    {{ $content$ }}
</Tooltip>
```

## 消息提示

```javascript
this.$Message.success(res.msg);
this.$Message.error(res.msg);
this.$Message.warning(res.msg);

enum('success','error','warning')
enum('res.msg','666'')

```

## 时间格式化方法

```javascript
ui-date-format

 formatDate(timestamp) {
     return this.$Date.unix(timestamp).format('$type$');
 },
enum('YYYY-MM-DD  HH:mm:ss','YYYY-MM-DD','HH:mm:ss')
```

## 单删除

```javascript
ui-del-one

```



## 批量删除

```javascript
ui-del-batch

clearSelect() {
    let ids = [];
    this.selectedData.forEach(item => {
        ids.push(item.id);
    })
    this.$Modal.confirm({
        title: '删除提示',
        content: `是否删除已选择项？`,
        onOk: () => {
            $method$({ids}).then(res => {
                this.$Message.success(res.msg);
                this.selectedData = [];
                this.getData();
            });
        }
    });
},
```

## 消息提示

```javascript
io-notice

this.$Notice.$type$({
    title: '温馨提示',
    desc: res.msg,
    duration: 5
});

enum("open","success","error","warning","info")
```

## 头像渲染

```html
ui-avatar

<div class="ui-flex">
    <div @click="bigPic(row.$pic$)">
        <avatar shape="square" v-if="row.pic" :src="row.$pic$"></avatar>
        <avatar shape="square" v-else icon="ios-person"></avatar>
    </div>
    <div class="ivu-ml">
        {{ row.name }}
        <Tooltip content="男" v-if="row.sex == 1">
            <Icon type="md-male" color="primary"/>
        </Tooltip>
        <Tooltip content="女" v-if="row.sex == 2">
            <Icon type="md-female" color="red"/>
        </Tooltip>
    </div>
</div>

enum("pic","avatar","img","url")
```





# 方法

## 删除

```javascript
// 清空所有已选项
handleClearSelect() {
    let ids = [];
    this.selectedData.forEach(item=>{
        ids.push(item.id);
    })
    this.$Modal.confirm({
        title: "删除提醒!",
        content: "是否确定删除?",
        onOk: () => {
            articleCateDelete({ids}).then(res=>{
                this.getData();
                this.$Message.success(res.msg);
            });
        }
    });
    this.selectedData = [];
},
```

## 遍历二维数组的children添加到Arrary里

~~~javascript
 getCateList(){
     courseCateList().then(res => {
         this.cateList = res.data;
         this.cateList.forEach(item=>{
             if (item.children.length > 0){
                 item.children.forEach(childItem=>{
                     this.cateList.push(childItem)
                 })
             }
         });
     });
 },
~~~





## 通过id查找列表的当前item

```javascript
//根据字段找 item 
getItemById(id) {
     return this.list.find(item => item.id === id);
 },
    
```

```javascript
let list = [
    {id:1,name"orangbus"},
    {id:1,name"orangbus"},
    {id:1,name"orangbus"},
    {id:1,name"orangbus"},
    {id:1,name"orangbus"},
];

ithis.list[index]
```



## 对象复制

```javascript
import {cloneDeep} from 'lodash';

this.form = cloneDeep(item);
```

## 树结构编辑

通过id

```javascript
```

## 递归找子集

```javascript
 ChilderTree(val) {
    //声明一个数组准备接收匹配好的数据
    let arr = [];
    //判断传过来的数组长度
    if (val.length !== 0) {
        //遍历匹配，把满足条件的数据追加到arr数组中，最后返回一个结果
        val.forEach((item) = >{
            let obj = {};
            obj.deptId = item.deptId;
            obj.label = item.deptName;
            obj.value = item.deptId;
            obj.disabled = item.status == 0 ? true: false;;
            if (item.children.length >= 1) {
                obj.children = this.ChilderTree(item.children);
            }
            arr.push(obj);
        });
    }
    return arr;
},
```

## 数组搜索

```javascript
sortLists() {
			let That = this;
			if (!That.keywords) {
				return That.lists;
			} else {
				return this.lists.filter(function(item) {
					return item.name.includes(That.keywords);
				});
			}
		}
```

## 更改当前tab标签

```javascript
this.$store.dispatch('admin/page/currentUpdate', {
    meta: {
        title: '新的标题'
    }
});
```

## 获取vuex信息

```javascript
async function getUserAccess() {
	return await store.dispatch('admin/db/get', {
		dbName: 'sys',
		path: 'user.info',
		defaultValue: '',
		user: true // 是否区分用户
	});
}

getUserAccess().then(res => {
    access = res.access;
    let md5_data = md5(access.toString());
    config.headers.common['crm'] = md5_data;
})
```

## 刷新用户信息

```javascript
import {mapActions} from 'vuex';

 methods: {
     ...mapActions('admin/user', [
            'refreshUserInfo'
        ]),
 }
    
this.refreshUserInfo();
```

## render 函数用法

```javascript
{
    title: 'name',
        key: 'name',
            tree: true,
                render: (h, data) => {
                    let {row} = data;
                    // 标签，属性对象，子元素
                    return h("span", {
                        class: "text-pointer",
                        // 点击事件
                        on: {
                            click: () => {
                                alert(data.row.name)
                            }
                        }
                    }, data.row.name)
                }
},
```









# 时间操作

### 获取当前时间戳

```javascript
this.$Date().unix()
```

### unix时间转换

```javascript
this.$Date(1641180193*1000).format("YYYY-MM-DD HH:mm:ss")
```

### 获取当前年月

```javascript
// 设置当前年月
this.param.year = this.$Date().format('YYYY') * 1;
this.param.month = this.$Date().format('M') * 1;
```



## 日期转unix时间戳

```javascript
this.$Date(2-04-22).unix()
```

## 树结构

```php
$list = collect($data)->map(function ($item) {
    $item->expand = true;
    if (!empty($item->children)) {
        for ($i = 0; $i < $item->children->count(); $i++) {
            $temp = [];
            $temp['value'] = $item->children[$i]['id'];
            $temp['title'] = $item->children[$i]['name'];
            $temp['selected'] = false;
            $temp['checked'] = true;
            $tempItem['expand'] = true; //是否展开直子节点
            $item->school[$i] = $temp;
        }
    }
    $tempItem = [];
    $tempItem["title"] = $item['name'];
    $tempItem["value"] = $item['id'];
    $tempItem['selected'] = false;
    $tempItem['checked'] = true; //是否勾选(如果勾选，子节点也会全部勾选)
    $tempItem['disabled'] = true; // 顶级目录不可选择
    $tempItem['expand'] = true; //是否展开直子节点
    $tempItem['children'] = $item['children'];
    return $tempItem;
});
```



# 封装组件

## （单 ）图片/文件 上传

```html
<FileUpload :url="form.pic" title="请选择图片" @upload="upload" @remove="removeUpload" />
```

```javascript
// 导入组件
import FileUpload from "@/components/upload/FileUpload";

// 注册组件
 components:{
      FileUpload  
    },

// 方法接受文件上传结果
upload(res) {
    this.form.pic = res.data.url
},
// 删除文件,返回 true|false
removeUpload(result){
    if(result){
        this.form.pic = "";
    }
},
```

```html
ui-upload-html // 图片上传

<FileUpload :url="form.pic" title="请选择图片" @upload="upload" @remove="removeUpload" />
```

```javascript
ui-upload-js // 文件上传接受返回值

// 方法接受文件上传结果
upload(res) {
    this.form.pic = res.data.url
},
// 删除文件,返回 true|false
removeUpload(result){
    if(result){
        this.form.pic = "";
    }
},
```

```javascript
ui-upload-components // 文件上传组件

components:{
    FileUpload  
},
```



## 多图上传

```html
<FormItem label="图片" prop="images">
       <ImagesUpload :imagesList="form.images" @uploadImages="uploadImages"></ImagesUpload>
</FormItem>

images:[
	{name:'张三.jpg',url:'https://xxx.xom/张三.jpg'},
    {name:'张三.jpg',url:'https://xxx.xom/张三.jpg'},
    {name:'张三.jpg',url:'https://xxx.xom/张三.jpg'},
]
```

```javascript
import ImagesUpload from "@/components/upload/ImagesUpload";


 components:{
       ImagesUpload
    },
   
 // 多图图片上传
uploadImages(imageList){
   this.form.images = imageList;
},
        
```



## 部门管理

```html
<DepartMent :selected_ids="form.major_id" @getIds="getIds"></DepartMent>
```

```javascript
import DepartMent from "@/components/common/department";

components: {
   DepartMent
},
        
getIds(uid){
   this.form.uid = uid;
},    
```

selected_ids: array | Number | String

## 组织人员

```html
<RoleUserList :value="value" @getSelected="getSelected" ref="roleUserList"></RoleUserList>
```

```javascript
import RoleUserList from "@/components/common/roleUserList"

components:{
    RoleUserList
},

    //获取已经选择的数据id
getSelected(item){
    console.log(item)
}
```

`value`: array | number

`multiple`: true | false

使用时需要触发获取数据

```javascript
getData(){
	this.$refs.roleUserList.getData();
},
```

## 角色用户

```html
<RoleUser @getSelected="getSelected" :value="1" :multiple="false"></RoleUser>
```

```javascript
import RoleUser from "@/components/common/roleUserList"

components:{
     RoleUser
 },
        
getSelected(ids){
    console.log(ids)
}     
```

todo

## 组织校区

```html
 <OrgSchool :selected_ids="form.school_id" @getSchoolId="getSchoolId" :multiple="false"  ref="orgSchool"></OrgSchool>
```

```javascript
import OrgSchool from "@/components/common/OrgSchool";

components:{
   OrgSchool
},

this.$refs.orgSchool.getData();
    
getSchoolId(id){
    console.log(id)
}
```

## textbus富文本编辑器 -废弃

```html
<TextBus :content="form.content"  ref="edit"></TextBus>
```

```javascript
// 导入组件组件
import TextBus from "@components/edit/TextBus";

// 注册组件
components:{
    TextBus
},


// 提交表单的时候获取结果
this.form.content = this.$refs.edit.data;
```

```vue
<template>
    <div>
        <div id="editor"></div>
        <!--        <p>编辑器使用说明：该编辑器支持<a href="https://www.runoob.com/markdown/md-tutorial.html" target="_blank">markdown</a>语法，截图或本地图片，直接复制粘贴即可.</p>-->
    </div>
</template>

<script>
    import { createEditor } from '@textbus/textbus';
    import '@textbus/textbus/bundles/textbus.min.css';
    import { uploadImage } from '@/api/common';

    let editor = null;

    export default {
        name: 'Textbus',
        props: {
            // 可选 'dark' | 'mac-os' | 'mac-os-dark'，不传即为默认样式
            theme: {
                type: String,
                default: () => 'dark'
            },
            content: {
                type: String,
                default: () => ``
            }
        },
        data () {
            return {
                data: '' // 编辑器最终的内容
            }
        },
        watch: {
            content: function (newVal) {
                this.data = newVal;
                this.setContent();
            }
        },
        mounted () {
            let that = this;
            editor = createEditor('#editor', {
                theme: 'dark', // 可选 'dark' | 'mac-os' | 'mac-os-dark'，不传即为默认样式
                // type: string, prevValue?: string): string | Promise<string> | Observable<string>
                uploader (uploadType, prevValue) {
                    switch (uploadType) {
                    case 'video':
                        alert('不支持视频上传');
                        // console.log('上传视频');
                        break;
                    case 'image':
                        // prevValue 图片的二进制文件
                        const fileInput = document.createElement('input');
                        fileInput.setAttribute('type', 'file');
                        fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
                        fileInput.style.cssText = 'position: absolute; left: -9999px; top: -9999px; opacity: 0';
                        const promise = new Promise(resolve => {
                            fileInput.addEventListener('change', event => {
                                const form = new FormData();
                                for (const file of event.target.files) {
                                    form.append('file', file);
                                    form.append('type', 'image');
                                }
                                document.body.removeChild(fileInput);
                                uploadImage(form).then(res => {
                                    resolve(res.data.url);
                                });
                            })
                        }, false);
                        document.body.appendChild(fileInput);
                        fileInput.click();
                        return promise;
                        // eslint-disable-next-line no-unreachable
                        break;
                    case 'audio':
                        alert('请选择图片上传');
                        // console.log('不支持音频上传');
                        break;
                    default:
                        alert('请选择图片文件');
                        break;
                    }
                },
                contents: that.content
            });
            editor.onChange.subscribe(() => {
                that.data = editor.getContents().content;
            });
        },
        methods: {
            setContent () {
                editor.setContents(this.data);
            }
        }
    }
</script>

```



## wangedit编辑器

```html
<WangEdit v-if="" :content="content" ref="edit"></WangEdit>
```

```javascript
import WangEdit from "@/components/edit/WangEdit";

components: {
        WangEdit
    },

// 提交表单的时候获取结果
this.form.content = this.$refs.edit.data;
```



## 局部打印

```javascript
<template>
    <div>
        <div ref="container">
            <p>打印区域</p>
            <p>打印区域</p>
            <p>打印区域</p>
        </div>
        <Button @click="handlePrint">打印</Button>
    </div>
</template>
<script>
    export default {
        methods: {
            handlePrint () {
                this.$Print(this.$refs.container);
            }
        }
    }
</script>
```

API

$Print(el, options)：

- **el**：`Element` 要打印区域的 DOM 节点

- options：Object

  额外的配置项

  - **beforeStart**：`Function` 打印前的回调
  - **finish**：`Function` 打印完成的回调
  - **backgroundColor**：`String` 设置打印区域背景色
  - `1.1.0` **pageWidth**：页面宽，当打印页面不足以显示时，可以指定 pageWidth，如 100%，让其适应。
  - `1.1.0` **pageHeight**：页面高。

如果需要忽略某个节点，只需要给这个节点设置 class 类名 `i-print-hidden`。

## 二维码生成

> https://www.npmjs.com/package/vue-qr

```html
 <VueQr text="http://baidu.com" logoSrc="https://doc.orangbus.cn/orangbus.png" :size="300" />
```

```javascript
import VueQr from "vue-qr";

 components:{
        VueQr
    },
```



## 表单提交字段处理

```javascript
 created() {
      this.keys = Object.keys(this.form);
    },
        
_.pick(this.form,Object.keys(this.formData))
```

## 格式化时间戳

```javascript
this.$Date.unix(form.expire_time).format('YYYY-MM-DD HH:mm:ss');

 formatDate(timestamp){
     return this.$Date.unix(timestamp).format('YYYY-MM-DD');
 },
     
formatDate(timestamp){
     return this.$Date.unix(timestamp).format('YYYY-MM-DD  HH:mm:ss');
 },
```

## 选择人员

```html
 <DepUserList
              ref="depUserList"
              :userIds="[]"
              @getUserList="getUserList"
              ></DepUserList>
```

```javascript
import DepUserList from '@components/common/DepUserList';

getUserList(userList) {
            this.userList = userList;
            console.log(userList)
        },
```







## 表格

```html
<Table
       ref="table"
       :columns="tableColumns"
       :data="list"
       :loading="loading"
       :size="tableSize"
       class="ivu-mt"
       @on-sort-change="handleSortChange"
       @on-filter-change="handleFilterChange"
       @on-select="handleSelect"
       @on-selection-change="selectChange"
       @on-select-cancel="handleSelectCancel"
       @on-select-all="handleSelectAll"
       @on-select-all-cancel="handleSelectAllCancel"
       >
    <template slot-scope="{ row }" slot="title">
        <div @click="bigPic(row.pic)">
            <Avatar :src="row.pic" shape="square" size="large" slot="avatar"/>
            {{ row.title }}
        </div>
    </template>
    <template slot-scope="{ row }" slot="cate">
        {{ row.cate ? row.cate.name : '' }}
    </template>
    <template slot-scope="{ row }" slot="user">
        {{ row.user ? row.user.name : '' }}
    </template>

    <template slot-scope="{ row }" slot="status">
        <Badge v-if="row.status === 1" status="success" text="开启"/>
        <Badge v-if="row.status === 2" status="error" text="关闭"/>
    </template>

    <template slot-scope="{ row, index }" slot="action">
        <a @click="showDetail(row)">详情</a>
        <Divider type="vertical"/>
        <a @click="handleUpdate(index)">编辑</a>
        <Divider type="vertical"/>
        <a @click="del(index)">删除</a>
    </template>
</Table>
<div class="ivu-mt ivu-text-center">
    <Page
          :total="total"
          :current.sync="current"
          show-total
          show-sizer
          :page-size="size"
          @on-change="changePage"
          @on-page-size-change="handleChangePageSize"
          />
</div>
```

```javascript
// 过滤条件改变时触发
        handleFilterChange() {
            // 从第一页开始
            this.current = 1;
        },
        // 选中一项，将数据添加至已选项中
        handleSelect(selection, row) {
            this.selectedData.push(row);
        },
        // 选项发生改变时
        selectChange(selection){
            this.selectedData = selection;
          console.log( this.selectedData)
        },
        // 取消选中一项，将取消的数据从已选项中删除
        handleSelectCancel(selection, row) {
            const index = this.selectedData.findIndex(item => item.name === row.name);
            this.selectedData.splice(index, 1);
        },
        // 当前页全选时，判断已选数据是否存在，不存在则添加
        handleSelectAll(selection) {
            console.log(selection)
            selection.forEach(item => {
                if (this.selectedData.findIndex(i => i.name === item.name) < 0) {
                    this.selectedData.push(item);
                }
            });
        },
        // 取消当前页全选时，将当前页的数据从已选项中删除
        handleSelectAllCancel() {
            const selection = this.list;
            selection.forEach(item => {
                const index = this.selectedData.findIndex(i => i.name === item.name);
                if (index >= 0) {
                    this.selectedData.splice(index, 1);
                }
            });
        },
```

```javascript
computed: {
        labelWidth() {
            return this.isMobile ? undefined : 100;
        },
        labelPosition() {
            return this.isMobile ? 'top' : 'right';
        },
        
        // 动态设置列
        tableColumns() {
            const columns = [...this.columns];
            return columns.filter(item => item.show);
        }
    }
```

<h1>样式</h1>

```html
```html

<span class="list-goods-list-item-price">价格</span>

<span class="list-goods-list-item-title">标题</span>

<span class=“list-goods-list-item-price>价格</span>

<span class="list-goods-list-item-desc">描述</span>

<span v-color="'#EA5455'">温馨提示：本产品为虚拟产品，一经购买……</span>

```

# 暂留方法

线索订单-代付金额

```javascript
 // 待支付金额
        userPayMoney(order) {
            let money = order.money;
            if (order.pay_status === 1 || order.pay_status === 3) {
                money = 0;
            } else {
                if (order.pre_money > 0) {
                    if (order.pre_money_status !== 0) {
                        money = order.money - order.pre_money;
                    } else {
                        money = order.pre_money
                    }
                } else {
                    money = order.pre_money;
                }
            }
            return money;
        },
```



# textbus2.0

```vue
<template>
    <div ref="editorContainer"></div>
</template>
<script>
import {createEditor} from '@textbus/editor';
import '@textbus/editor/bundles/textbus.min.css';
import {uploadImage} from "@api/common";

export default {
    mounted() {
        let uploadConfig = {
            /** 上传类型 */
            uploadType: "image",
            /** 当前值 */
            currentValue: "",
            /** 是否支持返回多个结果 */
            multiple: false,
        };
        let options = {
            theme: 'dark', // 可选 'dark' | 'mac-os' | 'mac-os-dark'，不传即为默认样式
            contents: "that.content",
            placeholder: '请输入内容...',

            uploader(uploadConfig) {
                console.log(uploadConfig)
                switch (uploadConfig.uploadType) {
                    case 'video':
                        alert('不支持视频上传');
                        // console.log('上传视频');
                        break;
                    case 'image':
                        // prevValue 图片的二进制文件
                        const fileInput = document.createElement('input');
                        fileInput.setAttribute('type', 'file');
                        fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
                        fileInput.style.cssText = 'position: absolute; left: -9999px; top: -9999px; opacity: 0';
                        const promise = new Promise(resolve => {
                            fileInput.addEventListener('change', event => {
                                const form = new FormData();
                                for (const file of event.target.files) {
                                    form.append('file', file);
                                    form.append('type', 'image');
                                }
                                document.body.removeChild(fileInput);
                                uploadImage(form).then(res => {
                                    resolve(res.data.url);
                                });
                            })
                        }, false);
                        document.body.appendChild(fileInput);
                        fileInput.click();
                        return promise;
                        // eslint-disable-next-line no-unreachable
                        break;
                    case 'audio':
                        alert('请选择图片上传');
                        // console.log('不支持音频上传');
                        break;
                    default:
                        alert('请选择图片文件');
                        break;
                }
            },
        }
        const editor = createEditor(this.$refs.editorContainer, options);
        editor.onChange.subscribe(() => {
            console.log(editor.getContents());
        });
    }
}
</script>
```



# yarn安装

```bash
npm install --global yarn
```

## 错误处理

> 123

1. If you have `node_modules` folder and `package-lock.json` file in your root directory then remove those:

   ```none
   rm -r node_modules
   rm package-lock.json
   ```

2. Then run commands:

   ```none
   npm install --save --legacy-peer-deps
   npm audit fix --force
   ```

3. Create `.env` file in the root directory and paste below code:

   ```none
   SKIP_PREFLIGHT_CHECK=true
   ```

4. Now, start your project:

   ```none
   npm start
   ```

> npm install -g node-gyp

```bash
# before installing node-gyp on windows
npm install --global --production windows-build-tools

# install node-gyp globally
npm install -g node-gyp
```

```bash
 npm install grpc --save
 npm install node-pre-gyp --save
```

# Vue错误处理

> 总是报Expected indentation of 0 spaces but found 2如何解决

`.eslintrc.js` 文件后 添加一下信息，并且重启

```javascript
"indent": ["off", 2]
```

> error: Unexpected trailing comma (comma-dangle)

解决方法：
在项目根目录下创建.prettierrc文件进行配置
.prettierrc文件:

```javascript
{
  "semi": false,//格式化时不加分号 
  "singleQuote": true,//用单引号替换双引号
  "trailingComma":none//对象后面默认添加逗号
}
```

报错：error: Unexpected trailing comma (comma-dangle) at src\components\Login.vue:99:4:
解决： 配置 “trailingComma”:none



> error: Newline required at end of file but not found (eol-last) 



不需要遵循时间

```php
// 缓存key
    public function getCacheValue()
    {
        $time = time();
        $notice = Notice::find($this->notice_id);
        $this->notice = $notice; // 不需要遵循时间
        $cacheKey = $this->getCacheKey();
        if (!Cache::has($cacheKey)) {
            // Carbon::parse("2021-04-5")->getTimestamp()
            Cache::put($cacheKey, $time, 86400);
        }
        return Cache::get($cacheKey);
    }
```



```php
 $time = $this->getCacheValue();


Cache::put($this->getCacheKey(), $item['updated_at'], 86400);
$this->notice->time = $item['updated_at'];



 Cache::forever($cacheKey, $time);

Cache::put($this->getCacheKey(), $item['updated_at'], 86400);
```



```
        // ...mapActions('admin/user', [
        //   'getUserInfo','setMenuList'
        // ]),
```



















