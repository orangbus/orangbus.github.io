---
title: mysql学习笔记
---

# mysql导入大文件

**修改该目录下my.ini文件中max_allowed_packet**
因为默认max_allowed_packet为1k，如果导入的文件过大。可能会报错。
我们将该值改大一点，我这里设为1G。

```
[mysqld]

max_allowed_packet = 1024M
```

查看设置是否生效

```
show VARIABLES like '%max_allowed_packet%';
```

本地终端连接数据库导入

```bash
mysql -h 192.168.3.1 -uroot -p

use mydb;

set names utf8;

source /path/to/insertTable.sql

====
# 开启事务
start transaciton;

# 引入SQL文件
source xxx.sql

# 成功后提交事务
commit;
```

## mysql最左原则

```mysql
create index idx_name_phone on user(name,phone);
```

当我们查询数据库的时候，以下查询会走索引，`name` 查询在前，`phone` 在后

```mysql
select * from user where name like 'oranggbus%' and phone like '1830001%'
```

不会走搜索,因为 创建的索引 `name` 在前，`phone` 在后

```mysql
select * from user where phone like '1830001%' and name like 'oranggbus%' 
```



# mysql优化

> 参考网站：https://www.begtut.com/mysql/mysql-index.html

## 添加索引

```mysql
CREATE INDEX idx_name on tablename(filed);
CREATE INDEX idx_name_age on user(name,age);

alert table user add index index_email (email);

# 唯一索引（字段值可以为null）
CREATE UNIQUE INDEX index_phone on user (phone);
alert table user add unique (phone);

# 逐渐索引（字段值不能为null）
CREATE PRIMARY KEY INDEX index_phone ON user (phone);
alert table user add primary key (phone);
```

演示

```mysql
SELECT count(1) from tableName;


select * from tableName where user.phone='123456789'

```

查看索引

```mysql
show index from user;
```

删除索引

```mysql
drop index idx_name on jokes;
```

## 联合索引

索引选择

- 经常使用到的列在最左边
- 选择性高的列优先
- 宽度小的列

## 排序优化

- 要求where子句使用的所有字段，都必须建立索引；
- 不要在`索引列`上面做任何操作（计算、函数），否则会导致索引失效而转向全表扫描
- 索引的列顺序和 `order by` 字句的顺序完全一致
- 索引中多有列的方向（升序，降序）和 `order by` 子句完全一致
- `order by` 中的字段全部在关联表中的第一张表中

```mysql
select * from table where colume > 10 order by u
```



### 注意事项

1. like %keyword    ==索引失效==，使用全表扫描。但可以通过翻转函数+like前模糊查询+建立翻转函数索引=走翻转函数索引，不走全表扫描。
2. like keyword%    ==索引有效==。
3. like %keyword% ==索引失效==，也无法使用反向索引。
4. `not in` 和 `<>` 不能使用索引

可参考：https://www.cnblogs.com/yizhiamumu/p/9055531.html

https://blog.csdn.net/weixin_28973649/article/details/116112874

```mysql
CREATE INDEX idx_id_title on jokes(id,title);

CREATE INDEX idx_id on joke_cates(id);

SELECT count(1) FROM jokes;

SELECT * FROM jokes WHERE id < 1000;

select * from jokes where title like '搞笑%'

EXPLAIN select title from jokes where title like '%搞笑%'
```

## 添加演示数据

> https://downloads.mysql.com/docs/sakila-db.zip

# 优化案例

## order by 查询太慢

- 索引的列顺序和`order by` 子句的顺序完全一致

- 索引中所有的列的方向（升序，降序）和 `order by` 子句完全一致

- `order by` 中的字段全部在关联表的第一张表

  `order by` 的字段是主表（个人理解）

1、配置,当内存比较大的时候可以适当放大这个值

```
sort_buffer_site
```

2、建立索引

加入我们需要需要进行id倒叙查询

```mysql
select * from jokes where cate_id=1 order by id limit 15
```

**索引创建**: 创建一个以 `where` 条件进行查询的联合索引

```mysql
create index idx_cate_id_id on jokes(cate_id,id);
```

3、回表生成结果集

当行小于 `max_length_for_sort_data` 会生成全字段中间结果集

## 用户查询

```mysql
# 用户统计
select count(1) from million_users; # 2 s 823 ms
# 查看寻一个用户
select * from million_users where id=5600; # 89 ms
select * from million_users order by id desc limit 20; # 89 ms
select * from million_users where money > 1000 order by id desc limit 20; # 79 ms
# 下面这两个也是耗时的查询
select * from million_users where name="橙留香" and password="caVLvYBY8HfRjGSOaM99jHSyM8o7Gv"; # 5 s 606 ms
select * from million_users where name like "hlubo%" order by id desc limit 20; # 5 s 827 ms

# 查看所有
show index from million_users;
# 创建索引
create index idx_name_password on million_users(name,password);
# 删除索引
drop index idx_name_password on million_users;

# 有索引的情况下查询
select * from million_users where name="橙留香" and password="caVLvYBY8HfRjGSOaM99jHSyM8o7Gv"; # 74 ms
select * from million_users where name like "hlubo%" order by id desc limit 20; # 107 ms
```

## 关联统计优化

> 通过【文章分类】统计该分类下面的【文章】数

| joke        | joke_cate |
| ----------- | --------- |
| id，cate_id | id        |

优化建议: 在 `joke` 中创建一个 `cate_id` 字段的索引

```mysql
create index idx_cate_id on joke(cate_id);
```



