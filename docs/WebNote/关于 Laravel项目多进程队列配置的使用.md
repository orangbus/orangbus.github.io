> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [segmentfault.com](https://segmentfault.com/a/1190000021165798)

[关于 Laravel项目多进程队列配置的使用](/a/1190000021165798)
=============================================

[![][img-0]发布于 2019-12-02

前言:
---

近期随着队列在项目中的使用越来越多,单个队列的时间出来越来越长,单进程队列处理,会导致后面的队列被阻塞住,无法及时响应处理，便会造成不良好的用户体验和功能偏差。

问题分析
----

目前在我们使用的Laravel项目中,使用的广播服务是redis,每次向客户端广播一次,都会生成一条Queue,假设每个Queue的执行时间是1秒,假设用户执行以下操作:

```
//推送即时点赞提醒 1s
dispatch(new NewLike($like));
//推送即时评论提醒 1s
dispatch(new NewComment($comment));
//推送即时回复提醒 1s
dispatch(new NewReply($reply));
//推送即时通知提醒 1s
dispatch(new NewNotite($notice));
//推送即时消息提醒 1s
dispatch(new NewMessage($message));
```

以上每个推送都将会耗时1秒以上,5个通知执行完成则需要5秒,假设系统每天产生10000次推送,则处理推送的时间10000 / 60 / 60 = 2.8(小时),则系统则需要花费2.8个小时才能将消息全部推送完成,可能会导致部分用户无法及时推送,从而对APP体验产生反感。

随着系统推送越来越多,单进程队列以及无法满足我们的需求,此时便需要开启多个队列消费者来进行处理。

解决方案
----

开启多个队列消费者,就需要使用到多线程,每个一个`queue:work`都是一个单独的进程,运行多个`queue:work`进程就可以达到同时处理多个任务的效果。

说了那么多,上个代码测试一下。

### 1.新建一个JOB

通过artisan命令创建

```
art make:job TestJob
```

完善一下Job的主要逻辑:延迟1秒将传入的ID写入到日志到中。

```
<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class TestJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $id;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($id)
    {
        $this->id = $id;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        sleep(1);
        info($this->id);
    }
}

```

### 2.填充测试数据

我本地环境使用的job是基于mysql database,目前先填充10000个job进去。

```
for ($i = 0; $i < 10000; $i++) {
    dispatch(new TestJob($i));
}

dd('done');
```

### 3.运行 && 测试

针对这10000个job,我本地运行了两个`queue:work`进程来进行同时处理。

由于本地运行测试,为了方便,便把sleep移除了，下面来看看效果。

10000个job很快就被两个`queue:work`处理完成了。

![image](/img/remote/1460000021165802 "image")

运行完成后,最担心的问题莫过于,队列任务是否会被另一个消费者进行重复执行?

答案就是:不会,除非是其中一个任务处理超时(timeout)才会有可能被其他队列进程重复执行到,关于为什么不会,下次将会通过写一篇源码解析来为大家揭晓。

### 4.优化到Supervisor中

通常在服务端我们使用的队列进程管理工具一半都是Supervisor,知道上面需要开启多个进程处理后,部分同学便认为只需要添加多个conf配置文件,就完成啦。

但是当我们需要添加的队列进程从2个变成8个、10个、20个、32个、64个。。。随着需要处理的越来越多,岂不是需要添加n个配置文件来保持多进程队列运行。

其实不是这样的,Supervisor早就做到了这一点,可以通过**numprocs**来控制进程数量进行处理,你可以根据服务端负载情况,来动态调整进程数量,配置如下:

```
[program:laravel-queue-work]
process_name=%(program_name)s_%(process_num)02d
directory=/data/yoursite
command=php artisan queue:work
autostart=true
autorestart=true
user=www
numprocs=32
redirect_stderr=true
```

上面的案例中就开启了32个进程进行同时处理了job。

结论
--

以上就完成laravel项目多进程队列的配置使用,同时从`queue:work`输出和日志的写入来看,多个进程同时运行,也并不会造成队列重复执行的问题,可以放心使用😁😁

[laravel](/t/laravel)[php](/t/php)[队列](/t/%E9%98%9F%E5%88%97)[supervisor](/t/supervisor)[多进程](/t/%E5%A4%9A%E8%BF%9B%E7%A8%8B)阅读 6.1k发布于 2019-12-02 赞5收藏3[分享](###)本作品系原创，[采用《署名-非商业性使用-禁止演绎 4.0 国际》许可协议](https://creativecommons.org/licenses/by-nc-nd/4.0/)

[img-0]:data:application/json;base64,eyJjb2RlIjo0MDAxMDAzOCwibXNnIjoidW5rbm93biB0aHVtYi1jbWQiLCJpZCI6IjI5MTg5MzdiLTQzMmUtNDMzNi04OTNlLTI3NzY2MWJjNWFhMSJ9