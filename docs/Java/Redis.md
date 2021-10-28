---
title: springboot redis
---

## 引入依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
</dependency>
```

## 配置连接

```yaml
server:
  port: 8092

spring:
  redis:
    host: localhost
    username: root
    port: 6379
    client-type: jedis


logging:
  level:
    root: info
```



## 测试

```java
@Autowired
StringRedisTemplate redisTemplate;

@GetMapping("/redis")
public ApiResponse index(){
    ValueOperations<String, String> operations = redisTemplate.opsForValue();
    operations.set("name","this is orangbus name");
    String name = operations.get("name");
    System.out.println(name);
    return ApiResponse.success(name);
}
```

