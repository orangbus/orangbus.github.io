---
title: mysql学习笔记
---

# mysql 优化

配置文件

```config
[mysqld]
binlog_format=mixed
```

# OPTIMIZE 优化表

```sql
OPTIMIZE TABLE table_name;
```

会重组表数据和索引的物理存储，减少对存储空间使用和提升访问表时io效率。



# 单表优化

ALL, index, **range**, ref, eq_ref, const, system, NULL (从左到右, 性能从差到好)

## and 查询

```sql
select * from `movies` where (`api_id` = 36 and (`type_id` in (1, 6, 7, 8, 9, 20))) order by `updated_at` desc limit 24 offset 24;
```

优化方案

```sql
# 创建索引
CREATE INDEX api_id_tyoe_id on movies(api_id,type_id)

#删除索引
DROP index api_id_type_id on movies;
```

# 基本命令

## 用户操作

```sql
# 创建用户
create user demo@'%' identified by '123456';

# 查看用户信息
select user,host,plugin from mysql.user;

# 修改用户密码
alter user demo@'%' identified by 'new password';


# 修改用户连接方式
update mysql.user set Host='localhost' where user='demo';

# 删除用户
drop user demo@'%';
```

## 权限操作

```sql
# 查看当前用户权限
show grants ;

# 查看制定用户权限
show grants for orangbus@'%';

# 授权
# grant: 关键字
# test.*: 作用域,test库所有表
# 'tom'@'192.168.150.%': 哪个用户
grant select,update,insert on test.* to demo@'%';

# 授予所有权限
grant all privileges on *.* to demo@'%';

# 授予用户授权其他用户权限的权限
grant select,insert,update,delete on test.* to demo@'%' with grant option;

# 删除用户权限
revoke insert on test.* from demo@'%';

# 删除授予权限
revoke grant option on test.* from demo@'%';

# 删除所有权限
# revoke仅删除权限, 不删除用户
# revoke all 后还是会有一个USAGE 权限
revoke all on test.* from demo@'%';
```



## 数据库操作

```sql
# 创建
CREATE DATABASE 数据库名;

# 删除
drop database 数据库名;

------
create database user;
drop database user;
```

## 表操作

```sql
# 创建表
CREATE TABLE table_name (
	id INT UNSIGNED AUTO_INCREMENT,
    name char(11) not null,
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

# 添加表字段
alert table tabme_name add phone char(11) first|after filed_name;

# 修改表字段
 alert table table_name change phone phone varchrt(11);

# 删除表字段
alert table table_name drop phone;

# 删除表
drop table table_name;
```

## 导入sql

```sql
```



## 导出sql

```sql

```

1.导出整个数据库
mysqldump -u 用户名 -p 数据库名 > 导出的文件名
mysqldump -u dbuser -p dbname > dbname.sql

2.导出一个表
mysqldump -u 用户名 -p 数据库名 表名> 导出的文件名
mysqldump -u dbuser -p dbname users> dbname_users.sql

3.导出一个数据库结构
mysqldump -u dbuser -p -d --add-drop-table dbname >d:/dbname_db.sql
-d 没有数据 --add-drop-table 在每个create语句之前增加一个drop table

4.导入数据库
常用source 命令
进入mysql数据库控制台，如
mysql -u root -p
mysql>use 数据库
然后使用source命令，后面参数为脚本文件(如这里用到的.sql)
mysql>source d:/dbname.sql





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

# Mysql占用空间统计

## 「所有库」的容量大小

```sql
SELECT 
table_schema as '数据库',
sum(table_rows) as '记录数',
sum(truncate(data_length/1024/1024, 2)) as '数据容量(MB)',
sum(truncate(index_length/1024/1024, 2)) as '索引容量(MB)',
sum(truncate(DATA_FREE/1024/1024, 2)) as '碎片占用(MB)'
from information_schema.tables
group by table_schema
order by sum(data_length) desc, sum(index_length) desc;
```


## MySQL 数据库中容量排名前 10 的表

```sql
USE information_schema;
SELECT 
  TABLE_SCHEMA as '数据库',
  table_name as '表名',
  table_rows as '记录数',
  ENGINE as '存储引擎',
  truncate(data_length/1024/1024, 2) as '数据容量(MB)',
  truncate(index_length/1024/1024, 2) as '索引容量(MB)',
  truncate(DATA_FREE/1024/1024, 2) as '碎片占用(MB)'
from  tables 
order by table_rows desc limit 10;
```


## 「指定库」中，容量排名前 10 的表

```sql
USE information_schema;
SELECT 
  TABLE_SCHEMA as '数据库',
  table_name as '表名',
  table_rows as '记录数',
  ENGINE as '存储引擎',
  truncate(data_length/1024/1024, 2) as '数据容量(MB)',
  truncate(index_length/1024/1024, 2) as '索引容量(MB)',
  truncate(DATA_FREE/1024/1024, 2) as '碎片占用(MB)'
from  tables 
where 
  table_schema='laravel_web'  # 表名
order by table_rows desc limit 10;
```

## 「指定库」中「指定表」的容量大小

```sql
SELECT
  table_schema as '数据库',
  table_name as '表名',
  table_rows as '记录数',
  truncate(data_length/1024/1024, 2) as '数据容量(MB)',
  truncate(index_length/1024/1024, 2) as '索引容量(MB)',
  truncate(DATA_FREE/1024/1024, 2) as '碎片占用(MB)'
from 
  information_schema.tables
where 
  table_schema='laravel_web'and table_name='movies'
order by 
  data_length desc, index_length desc;
```

# 查询技巧

## 经纬度范围查询

```sql
SELECT qymc,lng,lat,
(st_distance(point(lat,lng),point(116.452404,39.947689))*111195) AS distance
FROM fxxf_tsgs 
HAVING distance<100
ORDER BY distance 
limit 100
```

