---
title: log4j配置详解
---

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [it9527.blog.csdn.net](https://it9527.blog.csdn.net/article/details/99982965) 

**版权声明**
--------

*   本文原创作者：[谷哥的小弟](http://blog.csdn.net/lfdfhl)
*   作者博客地址：[http://blog.csdn.net/lfdfhl](http://blog.csdn.net/lfdfhl)


**log4j概述**
-----------

log4j是Apache提供的的开源的日志组件，提供强大而且方便的日志记录功能。开发者可在其[官方网站](https://logging.apache.org/)免费下载Log4j最新版本的软件包。

在log4j中，定义了多种日志级别；但是，Log4j建议只使用其中四个级别，它们的优先级从低到高分别是DEBUG、INFO、WARN、ERROR 。假若设定日志输入的级别为INFO，则只处理等于或高于该级别的日志。

**log4j.properties配置文件**
------------------------

在log4j.properties配置文件中主要配置三大组件：

**Logger**  
指定日志类别和级别

**appender**  
指定日志输出的位置

**layout**  
指定日志以何种形式输出

现对其分别介绍，详情如下。

### **logger**

Logger中，最常用的为rootLogger，其语法如下：

```
`log4j.rootLogger = level,appenderName1,appenderName2, .....` 
```

level用于设定日志的优先级；appenderName为appender的名字，用于设定日志的输出位置，log4j中可设置多个appenderName。

### **appender**

在Log4j中提供以下5种appender用于对日志信息进行不同的处理：

```
`org.apache.log4j.ConsoleAppender  
表示将信息输出到控制台

org.apache.log4j.FileAppender
表示将信息输出到文件

org.apache.log4j.DailyRollingFileAppender
表示每天产生一个日志文件

org.apache.log4j.RollingFileAppender
表示当日志文件到达指定大小时产生一个新的文件

org.apache.log4j.WriterAppender
表示将日志信息以流格式发送到任意指定的地方` 
```

每种appender的配置格式如下：

```
`log4j.appender.appenderName = Log4j提供的appender类
log4j.appender.appenderName.属性名 = 属性值
.....
log4j.appender.appenderName.属性名 = 属性值` 
```

各appender常见配置示例如下：

**ConsoleAppender**

Threshold = DEBUG  
指定日志消息的输出最低层次  
ImmediateFlush = TRUE  
默认值是true,所有的消息都会被立即输出  
Target = System.err  
默认值System.out,输出到控制台(err为红色,out为黑色)

**FileAppender**

Threshold = INFO  
指定日志消息的输出最低层次  
ImmediateFlush = TRUE  
默认值是true,所有的消息都会被立即输出  
File = C:\log4j.log  
指定消息输出到C:\log4j.log文件  
Append = FALSE  
将消息追加到指定文件中，false指将消息覆盖指定的文件内容 ；默认值true  
Encoding = UTF-8  
可以指定文件编码格式

**DailyRollingFileAppender**

Threshold = WARN  
指定日志消息的输出最低层次  
ImmediateFlush = TRUE  
默认值是true,所有的消息都会被立即输出  
File =C:\log4j.log  
指定消息输出到C:\log4j.log文件  
Append= FALSE  
默认值true,将消息追加到指定文件中，false指将消息覆盖指定的文件内容  
DatePattern=’.'yyyy-ww  
每周滚动一次文件,即每周产生一个新的文件。  
还可以按用以下参数:  
'.'yyyy-MM:每月  
'.'yyyy-ww:每周  
'.'yyyy-MM-dd:每天  
'.'yyyy-MM-dd-a:每天两次  
'.'yyyy-MM-dd-HH:每小时  
'.'yyyy-MM-dd-HH-mm:每分钟  
Encoding = UTF-8:可以指定文件编码格式

**RollingFileAppender**

Threshold = ERROR  
指定日志消息的输出最低层次  
ImmediateFlush = TRUE  
默认值是true,所有的消息都会被立即输出  
File =C:/log4j.log  
指定消息输出到C:/log4j.log文件  
Append= FALSE  
默认值true,将消息追加到指定文件中，false指将消息覆盖指定的文件内容  
MaxFileSize = 100KB  
后缀可以是KB,MB,GB.在日志文件到达该大小时,将会自动滚动.如:log4j.log.1  
MaxBackupIndex = 2  
指定可以产生的滚动文件的最大数  
Encoding = UTF-8  
可以指定文件编码格式

### **layout**

Log4j常用layout如下：

```
`org.apache.log4j.HTMLLayout
以HTML表格形式布局

org.apache.log4j.PatternLayout
可以灵活地指定布局模式

org.apache.log4j.SimpleLayout
包含日志信息的级别和信息字符串

org.apache.log4j.TTCCLayout
包含日志产生的时间、线程、类别等等信息` 
```

**log4j使用示例**
-------------

**第一步**

在其官网下载jar包并导入项目

**第二步**

在项目src文件夹下建立log4j.properties文件并对log4j进行配置，代码如下：

```
`log4j.rootLogger=DEBUG,console,dailyFile,im
log4j.additivity.org.apache=true
# 控制台(console)
log4j.appender.console=org.apache.log4j.ConsoleAppender
log4j.appender.console.Threshold=DEBUG
log4j.appender.console.ImmediateFlush=true
log4j.appender.console.Target=System.err
log4j.appender.console.layout=org.apache.log4j.PatternLayout
log4j.appender.console.layout.ConversionPattern=[%-5p] %d(%r) --> [%t] %l: %m %x %n
# 日志文件(logFile)
log4j.appender.logFile=org.apache.log4j.FileAppender
log4j.appender.logFile.Threshold=DEBUG
log4j.appender.logFile.ImmediateFlush=true
log4j.appender.logFile.Append=true
log4j.appender.logFile.File=D:/logs/log.log4j
log4j.appender.logFile.layout=org.apache.log4j.PatternLayout
log4j.appender.logFile.layout.ConversionPattern=[%-5p] %d(%r) --> [%t] %l: %m %x %n
# 回滚文件(rollingFile)
log4j.appender.rollingFile=org.apache.log4j.RollingFileAppender
log4j.appender.rollingFile.Threshold=DEBUG
log4j.appender.rollingFile.ImmediateFlush=true
log4j.appender.rollingFile.Append=true
log4j.appender.rollingFile.File=D:/logs/log.log4j
log4j.appender.rollingFile.MaxFileSize=200KB
log4j.appender.rollingFile.MaxBackupIndex=50
log4j.appender.rollingFile.layout=org.apache.log4j.PatternLayout
log4j.appender.rollingFile.layout.ConversionPattern=[%-5p] %d(%r) --> [%t] %l: %m %x %n
# 定期回滚日志文件(dailyFile)
log4j.appender.dailyFile=org.apache.log4j.DailyRollingFileAppender
log4j.appender.dailyFile.Threshold=DEBUG
log4j.appender.dailyFile.ImmediateFlush=true
log4j.appender.dailyFile.Append=true
log4j.appender.dailyFile.File=D:/logs/log.log4j
log4j.appender.dailyFile.DatePattern='.'yyyy-MM-dd
log4j.appender.dailyFile.layout=org.apache.log4j.PatternLayout
log4j.appender.dailyFile.layout.ConversionPattern=[%-5p] %d(%r) --> [%t] %l: %m %x %n
# 应用于socket
log4j.appender.socket=org.apache.log4j.RollingFileAppender
log4j.appender.socket.RemoteHost=localhost
log4j.appender.socket.Port=5001
log4j.appender.socket.LocationInfo=true
# Set up for Log Factor 5
log4j.appender.socket.layout=org.apache.log4j.PatternLayout
log4j.appender.socket.layout.ConversionPattern=[%-5p] %d(%r) --> [%t] %l: %m %x %n
# Log Factor 5 Appender
log4j.appender.LF5_APPENDER=org.apache.log4j.lf5.LF5Appender
log4j.appender.LF5_APPENDER.MaxNumberOfRecords=2000
# 发送日志到指定邮件
log4j.appender.mail=org.apache.log4j.net.SMTPAppender
log4j.appender.mail.Threshold=FATAL
log4j.appender.mail.BufferSize=10
log4j.appender.mail.From = xxx@mail.com
log4j.appender.mail.SMTPHost=mail.com
log4j.appender.mail.Subject=Log4J Message
log4j.appender.mail.To= xxx@mail.com
log4j.appender.mail.layout=org.apache.log4j.PatternLayout
log4j.appender.mail.layout.ConversionPattern=[%-5p] %d(%r) --> [%t] %l: %m %x %n
# 应用于数据库
log4j.appender.database=org.apache.log4j.jdbc.JDBCAppender
log4j.appender.database.URL=jdbc:mysql://localhost:3306/test
log4j.appender.database.driver=com.mysql.jdbc.Driver
log4j.appender.database.user=root
log4j.appender.database.password=
log4j.appender.database.sql=INSERT INTO LOG4J (Message) VALUES('=[%-5p] %d(%r) --> [%t] %l: %m %x %n')
log4j.appender.database.layout=org.apache.log4j.PatternLayout
log4j.appender.database.layout.ConversionPattern=[%-5p] %d(%r) --> [%t] %l: %m %x %n

# 自定义Appender
log4j.appender.im = net.cybercorlin.util.logger.appender.IMAppender
log4j.appender.im.host = mail.cybercorlin.net
log4j.appender.im.username = username
log4j.appender.im.password = password
log4j.appender.im.recipient = corlin@cybercorlin.net
log4j.appender.im.layout=org.apache.log4j.PatternLayout
log4j.appender.im.layout.ConversionPattern=[%-5p] %d(%r) --> [%t] %l: %m %x %n` 
```

项目结构如下：  
![在这里插入图片描述](https://img-blog.csdnimg.cn/201908212022514.png)

**第三步**

在Java代码中使用log4j记录项目日志，示例如下：

```
import org.apache.log4j.Logger;
/*
 * 本文作者：谷哥的小弟
 * 博客地址：https://blog.csdn.net/lfdfhl
 */
public class TestLog4j {

	public static void main(String[] args) {
		Logger logger=Logger.getLogger(TestLog4j.class);
		try {
			logger.info("程序开始执行");
			int a=5;
			int b=3;
			int c=a+b;
			System.out.println("c="+c);
			int d=a/0;
			System.out.println("d="+d);
		} catch (Exception e) {
			logger.error(e.toString());
		}
	}

}
```

**第四步**

在指定目录查看日志，图示如下：  
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190821202838583.jpg)