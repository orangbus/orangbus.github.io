---
title: maven 配置
---

# 后端技术

| 技术                 | 说明                | 官网                                                |
| -------------------- | ------------------- | --------------------------------------------------- |
| SpringBoot           | 容器+MVC框架        | https://spring.io/projects/spring-boot              |
| SpringSecurity       | 认证和授权框架      | https://spring.io/projects/spring-security          |
| MyBatis              | ORM框架             | http://www.mybatis.org/mybatis-3/zh/index.html      |
| MyBatisGenerator     | 数据层代码生成      | http://www.mybatis.org/generator/index.html         |
| Elasticsearch        | 搜索引擎            | https://github.com/elastic/elasticsearch            |
| RabbitMQ             | 消息队列            | https://www.rabbitmq.com/                           |
| Redis                | 分布式缓存          | https://redis.io/                                   |
| MongoDB              | NoSql数据库         | [https://www.mongodb.com](https://www.mongodb.com/) |
| LogStash             | 日志收集工具        | https://github.com/elastic/logstash                 |
| Kibina               | 日志可视化查看工具  | https://github.com/elastic/kibana                   |
| Nginx                | 静态资源服务器      | https://www.nginx.com/                              |
| Docker               | 应用容器引擎        | [https://www.docker.com](https://www.docker.com/)   |
| Jenkins              | 自动化部署工具      | https://github.com/jenkinsci/jenkins                |
| Druid                | 数据库连接池        | https://github.com/alibaba/druid                    |
| OSS                  | 对象存储            | https://github.com/aliyun/aliyun-oss-java-sdk       |
| MinIO                | 对象存储            | https://github.com/minio/minio                      |
| JWT                  | JWT登录支持         | https://github.com/jwtk/jjwt                        |
| Lombok               | 简化对象封装工具    | https://github.com/rzwitserloot/lombok              |
| Hutool               | Java工具类库        | https://github.com/looly/hutool                     |
| PageHelper           | MyBatis物理分页插件 | http://git.oschina.net/free/Mybatis_PageHelper      |
| Swagger-UI           | 文档生成工具        | https://github.com/swagger-api/swagger-ui           |
| Hibernator-Validator | 验证框架            | http://hibernate.org/validator                      |

# 前端技术

| 技术       | 说明                  | 官网                                                  |
| ---------- | --------------------- | ----------------------------------------------------- |
| Vue        | 前端框架              | https://vuejs.org/                                    |
| Vue-router | 路由框架              | https://router.vuejs.org/                             |
| Vuex       | 全局状态管理框架      | https://vuex.vuejs.org/                               |
| Element    | 前端UI框架            | [https://element.eleme.io](https://element.eleme.io/) |
| Axios      | 前端HTTP框架          | https://github.com/axios/axios                        |
| v-charts   | 基于Echarts的图表框架 | https://v-charts.js.org/                              |
| Js-cookie  | cookie管理工具        | https://github.com/js-cookie/js-cookie                |
| nprogress  | 进度条控件            | https://github.com/rstacruz/nprogress                 |





```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>spring</artifactId>
        <groupId>org.example</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>jdbc</artifactId>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-jdbc</artifactId>
            <version>5.3.9</version>
        </dependency>
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.25</version>
        </dependency>

        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13.2</version>
            <scope>test</scope>
        </dependency>

        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-test</artifactId>
            <version>5.2.16.RELEASE</version>
        </dependency>
    </dependencies>

</project>
```

# mysql

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.25</version>
</dependency>
```

## mysql连接

```xml
 <bean id="dataSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
        <property name="driverClassName" value="com.mysql.cj.jdbc.Driver" />
        <property name="url" value="jdbc:mysql://localhost/spring_jdbc?useUnicode=true&amp;characterEncode=UTF-8" />
        <property name="username" value="root" />
        <property name="password" value="root" />
    </bean>
```



# mybatis

```xml
```

# 单元测试

```xml
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.13.2</version>
    <scope>test</scope>
</dependency>
```



# spring

```xml
<!-- https://mvnrepository.com/artifact/org.springframework/spring-context -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>5.2.9.RELEASE</version>
</dependency>
```

## spring-test 单元测试

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-test</artifactId>
    <version>5.2.16.RELEASE</version>
</dependency>
```

## spring-jdbc 数据库交互

```xml
<dependency>
     <groupId>org.springframework</groupId>
     <artifactId>spring-jdbc</artifactId>
     <version>5.3.9</version>
</dependency>
```

# json序列化

```xml
```





# spring-boot

```xml
```



# xml-header

## aplicationContent.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
</beans>
```

# 资源过滤

```xml
 <build>
     <resources>
         <resource>
             <directory>src/main/resources</directory>
             <includes>
                 <include>**/*.properties</include>
                 <include>**/*.xml</include>
             </includes>
             <filtering>true</filtering>
         </resource>
         <resource>
             <directory>src/main/java</directory>
             <includes>
                 <include>**/*.properties</include>
                 <include>**/*.xml</include>
             </includes>
             <filtering>true</filtering>
         </resource>
     </resources>
</build>
```

# 资源加载

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
  PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
  <environments default="development">
    <environment id="development">
      <transactionManager type="JDBC"/>
      <dataSource type="POOLED">
        <property name="driver" value="${driver}"/>
        <property name="url" value="${url}"/>
        <property name="username" value="${username}"/>
        <property name="password" value="${password}"/>
      </dataSource>
    </environment>
  </environments>
    
  <mappers>
    <mapper resource="org/mybatis/example/BlogMapper.xml"/>
  </mappers>
    
</configuration>
```

# db.properties配置文件

外部引入大于当前配置这里相当于是默认配置
注意点 url的地址正常写就可以了，不用 &amp; 转换
resource="db.properties"

```
driver=com.mysql.cj.jdbc.Driver
url=jdbc:mysql://localhost/mybatis?useUnicode=true&characterEncode=UTF-8
#url=jdbc:mysql://localhost/mybatis?useUnicode=true&amp;characterEncode=UTF-8  报错
username=root
password=root
```

mybatis.xml

````xml
 <properties resource="db.properties">
        <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
        <property name="url" value="jdbc:mysql://localhost/mybatis?useUnicode=true&amp;characterEncode=UTF-8"/>
        <property name="username" value="root"/>
        <property name="password" value="root"/>
    </properties>
````

## 别名

mybatis.xml

```xml-dtd
<typeAliases>
	<typeAlias type="com.orangbus.model.User" alias="User"></typeAlias>
</typeAliases>

<typeAliases>
	<typeAlias type="com.orangbus.model"></typeAlias>
</typeAliases>
```

也可以在实体类名前面 ==注解==

```java
@Alias("user")
```

## 

