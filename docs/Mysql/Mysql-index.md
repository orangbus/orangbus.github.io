---
title: mysql索引优化
---

# phone_numbers

```sql
SHOW index from phone_numbers;
SHOW index from tasks;
SHOW index from call_logs;
SHOW index from user_phones;

# 创建索引
CREATE INDEX idx_task_id_uid_mer_id on phone_numbers(task_id,uid,mer_id);
CREATE INDEX idx_task_id_hascall_mer_id on phone_numbers(task_id,has_call,mer_id);
CREATE INDEX idx_phone_numbers_task_id ON phone_numbers (`task_id`);
CREATE INDEX idx_tasks_mer_id_id ON tasks (`mer_id`, `id`);

CREATE INDEX idx_call_logs ON call_logs (`created_at`, `uid`, `mer_id`);

CREATE INDEX idx_user_phones ON user_phones (`from`, `uid`, `mer_id`);

#删除索引
DROP INDEX idx_task_id_uid_mer_id ON phone_numbers;
DROP INDEX idx_task_id_hascall_mer_id ON phone_numbers;
DROP INDEX idx_phone_numbers_task_id ON phone_numbers;
DROP INDEX idx_tasks_mer_id_id ON phone_numbers;

DROP INDEX idx_call_logs ON call_logs;

DROP INDEX idx_user_phones ON user_phones;
```

```sql
EXPLAIN select count(*) from `phone_numbers`where task_id = 1 and `mer_id` = 2;

EXPLAIN select count(*) from `phone_numbers`where task_id = 1  and uid = 0 and `mer_id` = 2;
# 添加索引
CREATE INDEX idx_task_id_uid_mer_id on phone_numbers(task_id,uid,mer_id);

EXPLAIN select count(*) from `phone_numbers`where task_id = 1  and has_call = 1 and `mer_id` = 2;
# 添加索引
CREATE INDEX idx_task_id_hascall_mer_id on phone_numbers(task_id,has_call,mer_id);

EXPLAIN select
  `tasks`.*,
  (
    select
      count(*)
    from
      `phone_numbers`
    where
      `tasks`.`id` = `phone_numbers`.`task_id`
      and `mer_id` = 124
  ) as `phone_number_count`,
  (
    select
      count(*)
    from
      `phone_numbers`
    where
      `tasks`.`id` = `phone_numbers`.`task_id`
      and `uid` = 0
      and `mer_id` = 124
  ) as `no_user_count`,
  (
    select
      count(*)
    from
      `phone_numbers`
    where
      `tasks`.`id` = `phone_numbers`.`task_id`
      and `has_call` = 1
      and `mer_id` = 124
  ) as `phone_number_call_count`
from
  `tasks`
where
  `mer_id` = 124
order by
  `id` desc
limit
  10 offset 0;
# 索引优化
CREATE INDEX idx_phone_numbers_task_id ON phone_numbers (`task_id`);
CREATE INDEX idx_tasks_mer_id_id ON tasks (`mer_id`, `id`);
```

# tasks

```sql
SHOW index from tasks;
```

```sql
EXPLAIN SELECT * from tasks WHERE mer_id = 2 ORDER BY id DESC;

```

# call_logs

```sql
SHOW index from call_logs;
```

```sql
EXPLAIN select count(*) as aggregate from `call_logs` where date(`created_at`) = '2023-06-05' and `uid` = 196 and `mer_id` = 88;
# 添加索引
CREATE INDEX idx_call_logs ON call_logs (`created_at`, `uid`, `mer_id`);
```

# user_phones

```sql
SHOW index from user_phones;
```

```sql
EXPLAIN select * from `user_phones` where `from` = 1 and `uid` = 386 and `mer_id` = 126;
#索引优化
CREATE INDEX idx_user_phones ON user_phones (`from`, `uid`, `mer_id`);
```

# sql慢查询

## 查询 sql 查询时间 > 300 s

```sql
SELECT *
FROM telescope_entries
WHERE type = 'query' and  CAST(JSON_EXTRACT(content, '$.time') AS DECIMAL(10, 2)) > 300;
```

