> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [segmentfault.com](https://segmentfault.com/a/1190000041143413)

[springboot整合knife4j，从此告别手写接口文档](/a/1190000041143413)
=====================================================

[![][img-0]发布于 2021-12-19

关于knife4j
=========

Knife4j的前身是swagger-bootstrap-ui,前身swagger-bootstrap-ui是一个纯swagger-ui的ui皮肤项目

一开始项目初衷是为了写一个增强版本的swagger的前端ui,但是随着项目的发展,面对越来越多的个性化需求,不得不编写后端Java代码以满足新的需求,在swagger-bootstrap-ui的1.8.5~1.9.6版本之间,采用的是后端Java代码和Ui都混合在一个Jar包里面的方式提供给开发者使用.这种方式虽说对于集成swagger来说很方便,只需要引入jar包即可,但是在微服务架构下显得有些臃肿。

因此,项目正式更名为knife4j,取名knife4j是希望她能像一把匕首一样小巧,轻量,并且功能强悍,更名也是希望把她做成一个为Swagger接口文档服务的通用性解决方案,不仅仅只是专注于前端Ui前端.

swagger-bootstrap-ui的所有特性都会集中在knife4j-spring-ui包中,并且后续也会满足开发者更多的个性化需求.

主要的变化是,项目的相关类包路径更换为com.github.xiaoymin.knife4j前缀,开发者使用增强注解时需要替换包路径

后端Java代码和ui包分离为多个模块的jar包,以面对在目前微服务架构下,更加方便的使用增强文档注解(使用SpringCloud微服务项目,只需要在网关层集成UI的jar包即可,因此分离前后端)

knife4j沿用swagger-bootstrap-ui的版本号,第1个版本从1.9.6开始,关于使用方法,请参考文档(摘自 knife4j 官方介绍)。

引入knife4j
=========

knife4j 主要的版本基本如下所示

<table><thead><tr><th>版本</th><th>说明</th></tr></thead><tbody><tr><td>1.9.6</td><td>蓝色皮肤风格,开始更名，增加更多后端模块</td></tr><tr><td>2.0~2.0.5</td><td>Ui重写，底层依赖的springfox框架版本是2.9.2</td></tr><tr><td>2.0.6~</td><td>层springfox框架版本升级知2.10.5,OpenAPI规范是v2</td></tr><tr><td>3.0~</td><td>底层依赖springfox框架版本升级至3.0.3,OpenAPI规范是v3</td></tr></tbody></table>

我们引入的是3.0.3，**由于3.x只发布了一个版本，稳定性可能存在一定的问题，如果你想最求稳定，那么推荐你使用 2.x**，由于我这里只是demo展示，加上我自己喜欢新版本，所以我这里使用了3.0.3，提前帮大家猜猜坑。

```
<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>knife4j-spring-boot-starter</artifactId>
    <version>3.0.3</version>
</dependency>
```

注意

*   knife4j 已经引入了 springfox，所以在使用的时候无需再次引入  
    springfox，否则有可能会导致版本冲突，如果你在网关聚合时，必须禁用 knife4j 的增强功能。
*   使用Knife4j2.0.6及以上的版本，Spring Boot的版本必须大于等于2.2.x

**创建 Swagger 配置依赖**

```
package com.ymy.notes.config.kinfe4j;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class Knife4jConfiguration {

    @Bean(value = "defaultApi2")
    public Docket defaultApi2() {
        String group;
        Docket docket=new Docket(DocumentationType.OAS_30)
                .apiInfo(new ApiInfoBuilder()
                        .title("这是knife4j API ")
                        .description("# 这里记录服务端所有的接口的入参，出参等等信息")
                        .termsOfServiceUrl("http://yaomaoyang.com")
                        .contact(new Contact("逆流星","http://yaomaoyang.com","361426201@qq.com"))
                        .version("3.0")
                        .build())
                //分组名称
                .groupName(groupName)
                .select()
                //这里指定Controller扫描包路径
                .apis(RequestHandlerSelectors.basePackage("com.ymy.notes.controller"))
                .paths(PathSelectors.any())
                .build();
        return docket;
    }

}

```

这里需要注意一点，**如果你使用的是 2.x，那么需要将 @EnableSwagger2 替换成 @EnableSwagger2WebMvc， 因为 @EnableSwagger2 是在 3.x 才引入的注解，并且将@EnableSwagger2WebMvc 设置为不推荐使用**。

配置项目名和端口信息
==========

```
server:
  port: 8818
spring:
  application:
    name: notes
```

创建一个简单的 RESTful 接口
==================

```
package com.ymy.notes.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/test")
@Api(tags = "测试swagger")
public class Knife4jTestController {

    @GetMapping(value = "/hello")
    @ApiImplicitParam(name = "name",value = "姓名",required = true)
    @ApiOperation("测试接口")
    public String test(@RequestParam("name") String name){
        return "hello "+name+", I am  meimei han";
    }

}

```

启动项目
====

如果你在启动项目的时候抛出：**Failed to start bean 'documentationPluginsBootstrapper'; nested exception is java.lang.NullPointerException**  
  
千万不要慌，那是因为你的 springboot 版本太高，应该是 2.6.x，由于Springfox使用的路径匹配是基于AntPathMatcher，而Spring Boot 2.6.X使用的是PathPatternMatcher，所以将MVC的路径匹配规则改成 AntPathMatcher，在配置文件中加入如下参数即可（如果没有报错，可以跳过这个环节）

```
spring:
  mvc:
    pathmatch:
      # Springfox使用的路径匹配是基于AntPathMatcher的，而Spring Boot 2.6.X使用的是PathPatternMatcher
      # 所以需要配置此参数
      matching-strategy: ant_path_matcher
```

启动成功之后，在浏览器中访问：[http://127.0.0.1:8818/doc.html](https://link.segmentfault.com/?enc=iIqQ6nBIMlHuaH8VRqSyiQ%3D%3D.nDGQsvEtM1H%2Bcghov%2BTuJ3EN7vWOr10oZ0aWWs%2FmK2M%3D)(ip+端口+/doc.html)。  
如果看到下面的画面，说明knife4j已经配置成功。  
  
  
  
到此为止，knife4j 已经完美的运行起来了，后端人员在自测的时候再也不需要使用 postman了，也不需要给前端单独写接口文档了，一下子就增加的自己的摸鱼时间，美滋滋。

knife4j增强功能
===========

什么是 knife4j 的增强功能？我们在前面看到的只是 knife4j 最基础的使用方式，knife4j 还有很多强大的功能还没有展示出来，比如：i18n国际化、接口添加作责、自定义文档、访问权限控制、接口排序、到处离线文档、过滤请求参数等等，这些都是 knife4j 的增强功能，那如何开启 knife4j 的增强功能呢？

Knife4j自2.0.6版本开始,将目前在Ui界面中一些个性化配置剥离,开发者可以在后端进行配置，并且提供的knife4j-spring-boot-strater组件自动装载，开发者可以在配置文件中决定需要开启的功能。

springboot 中 knife4j的完整参数如下：

```
knife4j:
  enable: true
  documents:
    -
      group: 2.X版本
      name: 接口签名
      locations: classpath:sign/*
  setting:
    language: zh-CN
    enableSwaggerModels: true
    enableDocumentManage: true
    swaggerModelName: 实体类列表
    enableVersion: false
    enableReloadCacheParameter: false
    enableAfterScript: true
    enableFilterMultipartApiMethodType: POST
    enableFilterMultipartApis: false
    enableRequestCache: true
    enableHost: false
    enableHostText: 192.168.0.193:8000
    enableHomeCustom: true
    homeCustomLocation: classpath:markdown/home.md
    enableSearch: false
    enableFooter: false
    enableFooterCustom: true
    footerCustomContent: Apache License 2.0 | Copyright  2019-[浙江八一菜刀股份有限公司](https://gitee.com/xiaoym/knife4j)
    enableDynamicParameter: false
    enableDebug: true
    enableOpenApi: false
    enableGroup: true
  cors: false
  production: false
  basic:
    enable: false
    username: test
    password: 12313
```

knife4j 的增强功能是需要开启的，默认关闭，开启也是十分的简单，**在以前的版本中,开发者需要在配置文件中手动使用@EnableKnife4j来使用增强，自2.0.6版本后,只需要在配置文件中配置knife4j.enable=true即可不在使用注解**  
**注意：要使用Knife4j提供的增强，knife4j.enable=true必须开启。包括后面所讲解到的所有增强功能，都需要设置这个参数。**

下面我来介绍以下上面的这些属性值所表达的是什么意思

<table><thead><tr><th>属性</th><th>默认值</th><th>说明</th></tr></thead><tbody><tr><td>knife4j.enable</td><td>false</td><td>是否开启Knife4j增强模式</td></tr><tr><td>knife4j.cors</td><td>false</td><td>是否开启一个默认的跨域配置,该功能配合自定义Host使用</td></tr><tr><td>knife4j.production</td><td>false</td><td>是否开启生产环境保护策略,详情参考文档</td></tr><tr><td>knife4j.basic</td><td></td><td>对Knife4j提供的资源提供BasicHttp校验,保护文档</td></tr><tr><td>knife4j.basic.enable</td><td>false</td><td>关闭BasicHttp功能</td></tr><tr><td>knife4j.basic.username</td><td></td><td>basic用户名</td></tr><tr><td>knife4j.basic.password</td><td></td><td>basic密码</td></tr><tr><td>knife4j.documents</td><td></td><td>自定义文档集合，该属性是数组</td></tr><tr><td>knife4j.documents.group</td><td></td><td>所属分组</td></tr><tr><td>knife4j.documents.name</td><td></td><td>类似于接口中的tag,对于自定义文档的分组</td></tr><tr><td>knife4j.documents.locations</td><td></td><td>markdown文件路径,可以是一个文件夹(classpath:markdowns/*)，也可以是单个文件(classpath:md/sign.md)</td></tr><tr><td>knife4j.setting</td><td></td><td>前端Ui的个性化配置属性</td></tr><tr><td>knife4j.setting.enableAfterScript</td><td>true</td><td>调试Tab是否显示AfterScript功能,默认开启</td></tr><tr><td>knife4j.setting.language</td><td>zh-CN</td><td>Ui默认显示语言,目前主要有两种:中文(zh-CN)、英文(en-US)</td></tr><tr><td>knife4j.setting.enableSwaggerModels</td><td>true</td><td>是否显示界面中SwaggerModel功能</td></tr><tr><td>knife4j.setting.swaggerModelName</td><td>Swagger Models</td><td>重命名SwaggerModel名称,默认</td></tr><tr><td>knife4j.setting.enableDocumentManage</td><td>true</td><td>是否显示界面中"文档管理"功能</td></tr><tr><td>knife4j.setting.enableReloadCacheParameter</td><td>false</td><td>是否在每个Debug调试栏后显示刷新变量按钮,默认不显示</td></tr><tr><td>knife4j.setting.enableVersion</td><td>false</td><td>是否开启界面中对某接口的版本控制,如果开启，后端变化后Ui界面会存在小蓝点</td></tr><tr><td>knife4j.setting.enableRequestCache</td><td>true</td><td>是否开启请求参数缓存</td></tr><tr><td>knife4j.setting.enableFilterMultipartApis</td><td>false</td><td>针对RequestMapping的接口请求类型,在不指定参数类型的情况下,如果不过滤,默认会显示7个类型的接口地址参数,如果开启此配置,默认展示一个Post类型的接口地址</td></tr><tr><td>knife4j.setting.enableFilterMultipartApiMethodType</td><td>POST</td><td>具体接口的过滤类型</td></tr><tr><td>knife4j.setting.enableHost</td><td>false</td><td>是否启用Host</td></tr><tr><td>knife4j.setting.enableHomeCustom</td><td>false</td><td>是否开启自定义主页内容</td></tr><tr><td>knife4j.setting.homeCustomLocation</td><td></td><td>主页内容Markdown文件路径</td></tr><tr><td>knife4j.setting.enableSearch</td><td>false</td><td>是否禁用Ui界面中的搜索框</td></tr><tr><td>knife4j.setting.enableFooter</td><td>true</td><td>是否显示Footer</td></tr><tr><td>knife4j.setting.enableFooterCustom</td><td>false</td><td>是否开启自定义Footer</td></tr><tr><td>knife4j.setting.footerCustomContent</td><td>false</td><td>自定义Footer内容</td></tr><tr><td>knife4j.setting.enableDynamicParameter</td><td>false</td><td>是否开启动态参数调试功能</td></tr><tr><td>knife4j.setting.enableDebug</td><td>true</td><td>启用调试</td></tr><tr><td>knife4j.setting.enableOpenApi</td><td>true</td><td>显示OpenAPI规范</td></tr><tr><td>knife4j.setting.enableGroup</td><td>true</td><td>显示服务分组</td></tr></tbody></table>

以下增强功能都需要

接口添加作者
------

前端李雷在对接接口的时候发现接口有问题，但是不知道是谁在负责这个接口，通过层层查找，终于找到了是韩梅梅负责，这样大大的阻碍了开发的效率，所以这个时候在接口上标记对应的开发着，能让找人和背锅都能做到非常精准。

使用方式：添加注解 **@ApiOperationSupport(author = "逆流星007")**

```
@GetMapping(value = "/hello")
    @ApiImplicitParam(name = "name",value = "姓名",required = true)
    @ApiOperation("测试接口")
    @ApiOperationSupport(author = "逆流星007")
    public String test(@RequestParam("name") String name){
        return "hello "+name+", I am  meimei han";
    }
```

  
但是对于后端来说，在每个接口上都加上这个注解，着实有点浪费时间了，所以 knife4j 在收到反馈之后，决定在 Controller 类上增加一个注解，表示当前接口类下的所有接口都是该作者负责开发。  
因此在 2.0.3 版本中新增加了 **@ApiSupport** 注解,该注解目前有两个属性,分别是author(作者)和order(排序)  
**注意：如果在controller 类上添加了@ApiSuppor 注解，并且在某个接口上也添加了 @ApiOperationSupport 注解，那么接口上的作者将会覆盖 controller 类上的作者**

```
@RestController
@RequestMapping(value = "/test")
@ApiSupport(author = "逆流星007-controller")
@Api(tags = "测试swagger")
public class Knife4jTestController
```

```
@RestController
@RequestMapping(value = "/test")
@ApiSupport(author = "逆流星007-controller")
@Api(tags = "测试swagger")
public class Knife4jTestController {

    @GetMapping(value = "/hello")
    @ApiImplicitParam(name = "name",value = "姓名",required = true)
    @ApiOperation("测试接口")
    @ApiOperationSupport(author = "逆流星逆流星007-test")
    public String test(@RequestParam("name") String name){
        return "hello "+name+", I am  meimei han";
    }

}
```

访问权限控制
------

虽然 knife4j给我们提供了很方便的在线接口文档，俗话说的好，凡事都具有两面性，有利自然也有弊，那就是在生茶环境上，也会显示出接口文档，这是非常危险的一件事情，问题如下：

*   系统部署生产环境时,我们想屏蔽Swagger的文档功能,不管是接口或者html文档
*   通常我们有时候需要生产环境部署后,又需要Swagger的文档调试功能,辅助开发者调试,但是存在安全隐患,没有对Swagger的资源接口过滤

Knife4j 基于 Servlet 体系提供了过滤 Filter 功能,如果开发者使用 Spring Boot 开发框架进行开发的话,只需在`application.properties`或者`application.yml`配置文件中配置相关属性即可方便的解决上面的问题,不用删除 Springfox-swagger 的 jar 包或者删除相关代码等复杂的操作,提升开发体验。

### 资源屏蔽

目前`Springfox-Swagger`以及`Knife4j`提供的资源接口包括如下

<table><thead><tr><th>资源</th><th>说明</th></tr></thead><tbody><tr><td>/doc.html</td><td>Knife4j提供的文档访问地址</td></tr><tr><td>/v2/api-docs-ext</td><td>Knife4j提供的增强接口地址,自<code>2.0.6</code>版本后删除</td></tr><tr><td>/swagger-resources</td><td>Springfox-Swagger提供的分组接口</td></tr><tr><td>/v2/api-docs</td><td>Springfox-Swagger提供的分组实例详情接口</td></tr><tr><td>/swagger-ui.html</td><td>Springfox-Swagger提供的文档访问地址</td></tr><tr><td>/swagger-resources/configuration/ui</td><td>Springfox-Swagger提供</td></tr><tr><td>/swagger-resources/configuration/security</td><td>Springfox-Swagger提供</td></tr></tbody></table>

项目发布到生产环境之后，我们需要屏蔽 swagger 相关的资源，由于 Knife4j 基于 Servlet 体系提供了过滤 Filter 功能，所以就不需要我们再去造轮子了，直接使用即可。

springboot 只需要在配置文件中做如下修改即可

```
knife4j:
  # 开启增强配置 
  enable: true
　# 开启生产环境屏蔽
  production: true
```

然后重启项目

![image-20211219121202665.png](/img/bVcWNq8 "image-20211219121202665.png")

如果看到如下信息，说明资源已经屏蔽成功，但是你又不想在生产环境中屏蔽 swagger 资源，只想给一部分人使用，也是可以的，加入权限校验即可。

### 访问页面加权控制

针对Swagger的资源接口,`Knife4j`提供了简单的**Basic认证功能**

简单点说，指定一个用户名和密码，访问 Swagger 文档需要验证登录名和密码，验证通过之后才能正常访问。

knife4 允许开发者在配置文件（application.yml/properties）中增加一组用户名和密码。

```
knife4j:
  # 开启增强配置 
  enable: true
　# 开启Swagger的Basic认证功能,默认是false
  basic:
      enable: true
      # Basic认证用户名
      username: test
      # Basic认证密码
      password: 123
```

如果用户开启了 basic （knife4j.basic.enable = true）认证功能，但是没有指定 username 和password，那么 knife4j 提供了一组默认的用户名密码

```
admin/123321
```

配置好application.yml 文件之后，我们再次重启项目（这个时候需要将之前设置的资源屏蔽需要去掉哦）

接口排序
----

我们在开发中，一个 controller 中往往会存在很多的接口，这样我们在文档查找的时候就会变得很苦恼，所以 knife4j 在 `@ApiOperationSupport`注解中增加了 order 字段,用于接口排序。

**在使用此注解之前需要开启增强功能。**

```
package com.ymy.notes.controller;

import com.github.xiaoymin.knife4j.annotations.ApiOperationSupport;
import com.github.xiaoymin.knife4j.annotations.ApiSupport;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/test")
@ApiSupport(author = "逆流星007-controller")
@Api(tags = "测试swagger")
public class Knife4jTestController {

    @GetMapping(value = "/hello1")
    @ApiImplicitParam(name = "name",value = "姓名",required = true)
    @ApiOperation("测试接口01")
    @ApiOperationSupport(author = "逆流星逆流星007-test",order = 1)
    public String test01(@RequestParam("name") String name){
        return "hello "+name+", I am  meimei han";
    }

    @GetMapping(value = "/hello3")
    @ApiImplicitParam(name = "name",value = "姓名",required = true)
    @ApiOperation("测试接口03")
    @ApiOperationSupport(author = "逆流星逆流星007-test",order = 3)
    public String test03(@RequestParam("name") String name){
        return "hello "+name+", I am  meimei han";
    }

    @GetMapping(value = "/hello2")
    @ApiImplicitParam(name = "name",value = "姓名",required = true)
    @ApiOperation("测试接口02")
    @ApiOperationSupport(author = "逆流星逆流星007-test",order = 2)
    public String test02(@RequestParam("name") String name){
        return "hello "+name+", I am  meimei han";
    }
}



```

分组排序
----

分组，顾名思义，就是多个 controller 之间的排序，开发者可以通过注解实现每个controller 之间的排序，实现这个功能的注解一共有三个，具体如下：

*   @ApiSupport
*   @ApiSort
*   @Api

这三个注解是存在优先级的，也就是说，当同时使用时，只会有一个注解生效，所以在使用的时候需要特别注意。优先级规则如下：

> @ApiSupport `>` @ApiSort `>` @Api

**controller 之间的排序规则为降序，越大的排在越靠前，但是排序的最小值一定需要大于 0 。**

**@ApiSupport**

```
@RestController
@RequestMapping(value = "/test")
@ApiSupport(author = "逆流星007-controller",order = 999)
@Api(tags = "测试swagger")
public class Knife4jTestController 
```

**@ApiSort**

```
@RestController
@RequestMapping(value = "/test")
@ApiSort(value = 999)
@Api(tags = "测试swagger")
public class Knife4jTestController 
```

**@Api**

```
@RestController
@RequestMapping(value = "/test")
@Api(tags = "测试swagger",position = 999)
public class Knife4jTestController
```

虽然 **@Api** 中的position 字段也能实现 controller 之间的排序，但是该字段已经被 knife4j 标记为不推荐使用，所以还是推荐使用第一种排序方式（**@ApiSupport**）。

![image-20211219124214066.png](/img/bVcWNrc "image-20211219124214066.png")

请求参数缓存
------

我们在调试接口的时候，有的接口会有很多参数，当我们好不容易填好了所有的参数，由于我们不小心关闭了页面，下次再调试的时候发现还需要再次将参数输入一遍，心态会爆炸吧，所以 knife4j 在文档管理中增加了一个选项：**开启请求参数缓存**。

![image-20211219124852641.png](/img/bVcWNrd "image-20211219124852641.png")

勾选这个选项之后，你填写的参数将会被 knife4j 缓存，关闭页面也不会丢失，是不是很人性呢？

编写代码，准备数据

```
 @PostMapping(value = "/saveUser")
    @ApiOperation("保存用户信息")
    @ApiOperationSupport(author = "逆流星逆流星007")
    public String saveUser(@RequestBody UserDTO userDTO){
        System.out.println("前端传递的用户信息："+ userDTO);
        return "save success";
    }
```

```
package com.ymy.notes.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ApiModel("用户信息")
@Getter
@Setter
@ToString
public class UserDTO {

    @ApiModelProperty(value = "用户名")
    private String username;

    @ApiModelProperty(value = "性别")
    private String gender;

    @ApiModelProperty(value = "手机号码")
    private String phone;
}

```

不过你不能高兴的太早，缓存也不是一定会生效的，我已知的这两种情况，缓存将会失效，在使用的时候需要注意哦。

*   在字段的 `@ApiModelProperty` 注解中添加 example （属性的示例值）属性，那么， knife4j 将不会使用缓存，使用的是后端指定的 example 。

```
public class UserDTO {

    @ApiModelProperty(value = "用户名",example = "李雷")
    private String username;

    @ApiModelProperty(value = "性别",example = "男")
    private String gender;

    @ApiModelProperty(value = "手机号码",example = "18888888888")
    private String phone;
}
```

*   当域名发生改变时，所有缓存将会失效。

动态请求参数
------

作为开发，不知道大家有没有做过这种操作，接口参数并不是实体对象接收，而是Map，虽然我没这么做过，但是我见过别人这么写过，当后端程序员使用 Map 接收参数的时候，Swagger ui 会怎么展示呢？我们一起来模拟一下。

定义一个以 Map 接收参数的接口

```
@PostMapping(value = "/saveUserForMap")
    @ApiOperation("新增用户信息-map")
    @ApiOperationSupport(author = "逆流星007")
    private String saveUserForMap(Map<String,Object> userDTO ){
        System.out.println("前端传递的用户信息："+ userDTO);
        return "save success";
    }
```

我们来看看 Swagger ui 如何展示这个 Map类型的参数

![image-20211219161052552.png](/img/bVcWNre "image-20211219161052552.png")

这。。。。。要是前端看到这样的接口文档，心里开始问候后端的家人了吧，如何解决这个问题呢？其实很简单，knife4j 早已为我们想到了解决方案，招到文档管理 - 个性化设置 ，勾选开启动态请求参数就能解决这个问题了。

![image-20211219161350278.png](/img/bVcWNrf "image-20211219161350278.png")

我们现在再来看看勾选了 开启动态请求参数之后的效果

![动态参数.gif](/img/bVcWNrg "动态参数.gif")

在输入了一个参数之后，参数列表会自动追加新的一行，但是参数的 key 却需要前端人员自己填写，前端有很大可能是不知道参数的key，所以还是需要找后端开发人员，虽然开启了动态参数可以增加参数的个数，但是还没没有办法解决参数值的问题，那这个怎么解决呢？那这就是另外一个增强功能了：动态请求参数添加文档注释

过滤请求参数
------

我们在开发过程中，经常会遇到这样的一个问题，新增和修改接口，修改接口需要传递修改的记录id，但是新增则不需要，而后端往往会将修改和新增的入参对象设置为一个对象，那么这个对象中必然会存在 id 字段，这就会对新增造成误导，前端可能百思不得其解，新增的 id 我应该怎么传呢？ 总不可能去偷一个吧。

所以，knife4j 支持了请求参数的过滤（忽略），实现方式也是非常的简单，**使用自定义增强注解`ApiOperationSupport`中的`ignoreParameters`属性,可以强制忽略要显示的参数**。

使用字段忽略之前我们得先了解一下字段忽略的规则：

*   1.例如新增接口时,某实体类不需要显示Id,即可使用该属性对参数进行忽略.`ignoreParameters={"id"}`
*   2.如果存在多个层次的参数过滤,则使用**名称.属性**的方式,例如 `ignoreParameters={"uptModel.id","uptModel.uptPo.id"}`,其中uptModel是实体对象参数名称,id为其属性,uptPo为实体类,作为uptModel类的属性名称
*   3。如果参数层级只是一级的情况下,并且参数是实体类的情况下,不需要设置参数名称,直接给定属性值名称即可
*   4.如果实体类属性中是通过List这种数组的方式,那么过滤规则会有所不同,在属性后面需要追加一个下标`[0]`，`ignoreParameters={"uptModel.uptPo[0].id"}`

**实现此功能需要开启增强功能。**

表单提交和 JSON 提交的格式是不一样的，所以这里需要分开讲解一下，我们先来看表单提交怎么忽略字段属性。

前置条件：我们先创建两个 DTO 用来接收前端传递二点参数

```
package com.ymy.notes.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ApiModel("用户信息")
@Getter
@Setter
@ToString
public class UserDTO {

    @ApiModelProperty(value = "用户id")
    private Long id;

    @ApiModelProperty(value = "用户名",example = "李雷")
    private String username;

    @ApiModelProperty(value = "性别",example = "男")
    private String gender;

    @ApiModelProperty(value = "手机号码",example = "18888888888")
    private String phone;

    @ApiModelProperty(value = "用户收货地址信息")
    private UserAddressDTO userAddressDTO;
}

```

```
package com.ymy.notes.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserAddressDTO {

    @ApiModelProperty(value = "收获地址的记录id")
    private Long id;
    
    @ApiModelProperty(value = "省")
    private String province;

    @ApiModelProperty(value = "市")
    private String city;

    @ApiModelProperty(value = "区")
    private String district;

    @ApiModelProperty(value = "详细地址")
    private String addr;
}

```

### 表单提交

创建新增接口和修改接口，并且希望在添加的时候过滤掉 UserDTO 中的 id 字段 与 UserAddressDTO 中的 id 字段，因为新增用户和收获地址的时候是没有 id 信息的，只有新增完成之后才会存在 id字段。

```
  @ApiOperationSupport(author = "逆流星007",ignoreParameters = {"id","userAddressDTO.id"})
```

```
    @PostMapping(value = "/saveUser")
    @ApiOperation("新增用户信息-表单")
    @ApiOperationSupport(author = "逆流星007",ignoreParameters = {"id","userAddressDTO.id"})
    public String saveUser( UserDTO userDTO){
        System.out.println("前端传递的用户信息："+ userDTO);
        return "save success";
    }


    @PostMapping(value = "/updateUser")
    @ApiOperation("编辑用户信息")
    @ApiOperationSupport(author = "逆流星007")
    public String updateUser( UserDTO userDTO){
        System.out.println("前端传递的用户信息："+ userDTO);
        return "edit success";
    }
```

在过滤字段的时候，第一层我们只要填写对象中的属性名即可，但如果需要过滤第二层，根据忽略规则中的第二条，我们在 UserDTO 对象中引入 UserAddressDTO 对象：`private UserAddressDTO userAddressDTO`; 我们还需要忽略 UserAddressDTO 对象中的 id 属性，那么需要填上 userAddressDTO.id ，其中 userAddressDTO 要与 UserDTO 对象中的 UserAddressDTO 属性名一致。

代码写好了，我们一起来看看效果。

添加接口

![image-20211219154901201.png](/img/bVcWNrh "image-20211219154901201.png")

这里我们看不到 UserDTO 中的 id ，同时也看不到 UserAddressDTO 中的 id，忽略成功。

修改接口

![image-20211219155104062.png](/img/bVcWNri "image-20211219155104062.png")

由于我们在修改的时候并没有忽略 这两个字段，所以可以正常显示，这也是没有问题的。

### JSON提交

由于表单提交和 json 提交的格式存在一定的差异，所以他们忽略参数的格式也存在一定的差异，我们将原来的修改和修改接口的参数接收方式改为 json 格式并且保持和表单提交一样的忽略格式（为了看到更明显的效果，我在多忽略一个字段："username"）。

```
@ApiOperationSupport(author = "逆流星007",ignoreParameters = {"id","userAddressDTO.id"})
```

```
 @PostMapping(value = "/saveUser")
    @ApiOperation("新增用户信息")
    @ApiOperationSupport(author = "逆流星007",ignoreParameters = {"id","userAddressDTO.id"})
    public String saveUser(@RequestBody UserDTO userDTO){
        System.out.println("前端传递的用户信息："+ userDTO);
        return "save success";
    }


    @PostMapping(value = "/updateUser")
    @ApiOperation("编辑用户信息")
    @ApiOperationSupport(author = "逆流星007")
    public String updateUser(@RequestBody UserDTO userDTO){
        System.out.println("前端传递的用户信息："+ userDTO);
        return "save success";
    }
```

我们先来看看效果会是什么样子？是否能够成功忽略呢？

新增接口

![image-20211219155022159.png](/img/bVcWNrj "image-20211219155022159.png")

哦吼，居然也忽略成功了，卧槽，这打脸的也太快了，UserDTO 中被忽略一个字段：id，，UserAddressDTO 对象我忽略了 id 字段，我们查看 ui 界面发现确实忽略成功了，这是怎么回事呢？具体为啥，我也不太清楚，可能是 3.x 做了升级，忽略方式和表单一致了，也许是3.x 不太稳定，出现了诡异的bug，导致了 json 格式也能这样忽略，虽然这样同样可以忽略成功，由于我不确定是高版本做了优化没有更新文档还是诡异bug导致，我还是继续介绍一下 json 格式参数的忽略格式，有可能同学们这样使用却是不可以的，我推荐还是按照下面的格式编写。

json 格式如何忽略呢？

**专业说法是：实例名.属性名，以新增用户为例，我们需要过滤用户id，那么写法就是：userDTO.id**，**其中 userDTO 为 saveUser() 的 参数名**。

现在我们来改造一下我们的代码

```
@PostMapping(value = "/saveUser")
    @ApiOperation("新增用户信息")
    @ApiOperationSupport(author = "逆流星逆流星007",ignoreParameters = {"userDTO.id","userDTO.userAddressDTO.id"})
    public String saveUser(@RequestBody UserDTO userDTO){
        System.out.println("前端传递的用户信息："+ userDTO);
        return "save success";
    }
```

我们一起来看看效果

![image-20211219154133854.png](/img/bVcWNrk "image-20211219154133854.png")

这里还有一个情况是需要注意的，如果你忽略的字段在对象的第二层，那么在请求示例中，将会看不到完成的示例代码，会缺斤少两，可能 3.x 的bug吧，所以开头我申明过， 3.x 目前可能还不够稳定，升级或者使用的同学还是需要慎重啊。

搜索API接口
-------

在文档的右上角,`Knife4j`提供了文档检索的功能

![image-20211219160014269.png](/img/bVcWNrl "image-20211219160014269.png")

那这个搜索框都支持哪些关键字搜索呢？

*   接口地址。
*   接口名称。
*   接口描述。

以上三个搜索都是模糊搜索，但是，需要注意的是：**目前检索功能仅对当前分组下的已经加载的接口有效,对于分组中的接口，没有加载的情况下是搜索不到的,这点需要注意,换句话说该检索功能并非是全局检索,只对当前你看到的整体所有接口列表进行检索**。

**版本要求：**`knife4j` 版本>2.0.1 使用此规则。

全局参数
----

Knife4j提供基于UI临时设置全局参数功能,例如后台全局token参数等.提供该功能主要是方便开发者进行调试

目前全局参数功能主要提供两种参数类型：**query(表单)、header(请求头)**

如果后端Swagger有配置全局参数，该功能可以无视

功能目录：**文档管理 -> 全局参数设置**

![image-20211219170752004.png](/img/bVcWNrm "image-20211219170752004.png")

自定义主页内容
-------

不知道大家有没有觉得 swagger 的首页有一种很丑的感觉？是不是很不想看到它呢？那么接下来这条增强功能，决定是你的福利啊，knife4j 支持开发者自己替换首页，不过目前只支持 md 格式。

**需要开启增强功能**。

Knife4j自`2.0.8`版本开始,开发者可以提供一个Markdown文件来自定义显示Home主页的显示内容，通过配置yml来进行开启，配置文件如下

```
knife4j:
  enable: true
  setting:
    enableHomeCustom: true
    homeCustomLocation: classpath:markdown/home.md
```

属性说明：

*   `enableHomeCustom`:该属性为Boolean值,默认`false`，如果开发者要自定义主页内容,该选项设置为`true`
*   `homeCustomLocation`:提供一个主页的Markdown文件位置

我们先在 resources 目录下创建一个 markdown 目录，然后在 markdown 目录下创建 home.md

```
<center><h1>逆流星007</h1></center>

昵称：逆流星007

职业：java开发工程

开源博客地址：http://yaomaoyang.com   https://blog.csdn.net/qq_33220089

联系邮箱：361426201@qq.com
```

上面是home.md 的内容，接下来我们重启项目，一起来看看效果

![d1eb09f2769e47cbb224dfd8f4971c2a.png](/img/bVcWNq7 "d1eb09f2769e47cbb224dfd8f4971c2a.png")

咦，为什么没有发生改变呢？明明已经修改了啊，别急，我们忘记了最核心的一步，所以它没有替换成功，开发者需要在创建`Docket`逻辑分组对象时，通过`Knife4j`提供的工具对象`OpenApiExtensionResolver`将扩展属性进行赋值。

```
package com.ymy.notes.config.kinfe4j;

import com.github.xiaoymin.knife4j.spring.extension.OpenApiExtensionResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class Knife4jConfiguration {

    private final OpenApiExtensionResolver openApiExtensionResolver;

    @Autowired
    public Knife4jConfiguration(OpenApiExtensionResolver openApiExtensionResolver) {
        this.openApiExtensionResolver = openApiExtensionResolver;
    }

    @Bean(value = "defaultApi2")
    public Docket defaultApi2() {
        String group;
        Docket docket=new Docket(DocumentationType.OAS_30)
                .apiInfo(new ApiInfoBuilder()
                        .title("这是knife4j API ")
                        .description("# 这里记录服务端所有的接口的入参，出参等等信息")
                        .termsOfServiceUrl("http://yaomaoyang.com")
                        .contact(new Contact("逆流星","http://yaomaoyang.com","361426201@qq.com"))
                        .version("3.0")
                        .build())
                //分组名称
                .groupName(groupName)
                .select()
                //这里指定Controller扫描包路径
                .apis(RequestHandlerSelectors.basePackage("com.ymy.notes.controller"))
                .paths(PathSelectors.any())
                .build()
                .extensions(openApiExtensionResolver.buildSettingExtensions());
        return docket;
    }

}

```

通过上面示例代码，主要步骤如下：

1、通过`@Autowired`注解引入`Knife4j`向Spring容器注入的Bean对象`OpenApiExtensionResolver`

2、最终在`Dcoket`对象构建后，通过调用`Docket`对象的`extensions`方法进行插件赋值

3、插件赋值需要调用`OpenApiExtensionResolver`提供的`buildSettingExtensions`方法，获取`x-settings`的增强属性

这样，我们就能看到效果了。

![image-20211219173510578.png](/img/bVcWNrn "image-20211219173510578.png")

禁用调试
----

在以前的版本中，开发者如果要禁用调试功能，是通过在服务端创建UiConfiguration的实体Bean对象，配置supportMethod来达到禁用部分接口的调试，自`2.0.8`版本后，该属性被废弃

**此功能需要开启增强模式才能使用**

如果开发者需要禁用调试功能，只需要在配置文件中进行操作即可

```
knife4j:
  enable: true
  setting:
    enableDebug: false
```

属性说明：

*   `enableDebug`:该属性是一个`Boolean`值，代表是否启用调试功能,默认值为`true`(代表开启调试)，如果要禁用调试，该值设为`false`

同样，此操作也需要开发者在创建`Docket`逻辑分组对象时，通过`Knife4j`提供的工具对象`OpenApiExtensionResolver`将扩展属性进行赋值。

```
package com.ymy.notes.config.kinfe4j;

import com.github.xiaoymin.knife4j.spring.extension.OpenApiExtensionResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class Knife4jConfiguration {

    private final OpenApiExtensionResolver openApiExtensionResolver;

    @Autowired
    public Knife4jConfiguration(OpenApiExtensionResolver openApiExtensionResolver) {
        this.openApiExtensionResolver = openApiExtensionResolver;
    }

    @Bean(value = "defaultApi2")
    public Docket defaultApi2() {
        String group;
        Docket docket=new Docket(DocumentationType.OAS_30)
                .apiInfo(new ApiInfoBuilder()
                        .title("这是knife4j API ")
                        .description("# 这里记录服务端所有的接口的入参，出参等等信息")
                        .termsOfServiceUrl("http://yaomaoyang.com")
                        .contact(new Contact("逆流星","http://yaomaoyang.com","361426201@qq.com"))
                        .version("3.0")
                        .build())
                //分组名称
                .groupName(groupName)
                .select()
                //这里指定Controller扫描包路径
                .apis(RequestHandlerSelectors.basePackage("com.ymy.notes.controller"))
                .paths(PathSelectors.any())
                .build()
                .extensions(openApiExtensionResolver.buildSettingExtensions());
        return docket;
    }

}

```

全部操作完成之后，重启项目看效果

![image-20211219174053969.png](/img/bVcWNro "image-20211219174053969.png")

调试和 open 按钮没有了。

禁用搜索框
-----

发者如果想要禁用Ui界面中的搜索功能，需要通过增强属性进行配置，此功能需要开启增强功能。

```
knife4j:
  enable: true
  setting:
    enableSearch: false
```

属性说明：

*   `enableSearch`:该属性是一个`Boolean`值，代表是否启用搜索功能,默认值为`true`(代表开启搜索)，如果要禁用搜索，该值设为`false`

同样，此操作也需要开发者在创建`Docket`逻辑分组对象时，通过`Knife4j`提供的工具对象`OpenApiExtensionResolver`将扩展属性进行赋值。具体的代码实现请参考**禁用调试**和**自定义主页内容**，我这里就不重复了。

重启项目看效果

![image-20211219174628675.png](/img/bVcWNrp "image-20211219174628675.png")

好了，knife4j 的介绍到这里就结束了，还有一些高级的功能，就需要大家自己慢慢的摸索了，本文大部分参考了 knife4j 的官方文档，自己写的 demo，如果觉得对您有帮助，希望留下您宝贵的一赞。

[![][img-1]阅读 1k发布于 2021-12-19 赞收藏[分享](###)本作品系原创，[采用《署名-非商业性使用-禁止演绎 4.0 国际》许可协议](https://creativecommons.org/licenses/by-nc-nd/4.0/)

[img-0]:data:application/json;base64,eyJjb2RlIjo0MDAxMDAzOCwibXNnIjoidW5rbm93biB0aHVtYi1jbWQiLCJpZCI6ImY4OTA4MmNiLTU3NDMtNDc1OS1iYWM1LWRhMThmY2VhYjE4OSJ9

[img-1]:data:application/json;base64,eyJjb2RlIjo0MDAxMDAzOCwibXNnIjoidW5rbm93biB0aHVtYi1jbWQiLCJpZCI6ImMwYjJkZWU0LTI0ZGEtNDY3NS04MmZjLTgxNGUxOGZkMzYyMSJ9