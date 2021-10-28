---
title: Springboot 配置文件
---

# mysql

## 依赖

```xml
```

## 配置

```yaml
```



# redis

```yaml
spring:
  application:
    name: auth-server
  redis:
    database: 2
    host: localhost
    port: 32768
    password: 1qaz@WSX
    jedis:
      pool:
        max-active: 8
        max-idle: 8
        min-idle: 0
    timeout: 100ms
```



# log

```yaml
```

# security

```yaml
spring:
	security:
		name: admin
		password: admin
```





```
```




