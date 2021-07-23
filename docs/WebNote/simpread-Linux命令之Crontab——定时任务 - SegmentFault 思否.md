---
title: Linux命令之Crontab——定时任务
---

**rontab**__命令__**被用来提交和管理用户的需要周期性执行的任务**，与windows下的计划任务类似，当安装完成操作系统后，默认会安装此服务工具，并且会自动启动crond进程，**crond进程**__每分钟__**会定期检查是否有要执行的任务，如果有要执行的任务，则自动执行该任务。**

crontab文件的含义：用户所建立的crontab文件中，每一行都代表一项任务，每行的每个字段代表一项设置，它的格式共分为六个字段，前五段是时间设定段，第六段是要执行的命令段，格式如下：

minute hour day month week command 顺序：分 时 日 月 周

*   **minute**： 表示分钟，可以是从0到59之间的任何整数。
*   **hour**：表示小时，可以是从0到23之间的任何整数。
*   **day**：表示日期，可以是从1到31之间的任何整数。
*   **month**：表示月份，可以是从1到12之间的任何整数。
*   **week**：表示星期几，可以是从0到7之间的任何整数，这里的0或7代表星期日。
*   **command**：要执行的命令，可以是系统命令，也可以是自己编写的脚本文件。

在以上各个字段中，还可以使用以下特殊字符：

*   星号（*****）：代表**所有**可能的值，例如month字段如果是星号，则表示在满足其它字段的制约条件后每月都执行该命令操作。
*   逗号（**,**）：可以用逗号隔开的值指定一个列表**范围**，例如，“1,2,5,7,8,9”
*   中杠（**-**）：可以用整数之间的中杠表示一个**整数范围**，例如“2-6”表示“2,3,4,5,6”
*   正斜线（**/**）：可以用正斜线指定时间的**间隔频率**，例如“0-23/2”表示每两小时执行一次。同时正斜线可以和星号一起使用，例如*/10，如果用在minute字段，表示每十分钟执行一次。

图解[图片来自网络]：

![](/img/remote/1460000021815912)

**常用的Crontab命令：**

**安装**crontab：`yum` `install``crontabs`

**查看**定时任务列表：`crontab`-l 

**编辑**定时任务：`crontab` ``–e【等同于： `vim` `/var/spool/cron/root`】``

```**删除**定时任务：`crontab``–r` ```

``**备份**定时任务：`crontab` `` ` -l > $HOME/backMyCrontab `

crontab服务操作说明：

        service crond start //启动服务 

        service crond stop //关闭服务 

        service crond restart //重启服务 

        service crond reload //重新载入配置

        service crond status//查看crontab服务状态

**推荐一个计算Crontab命令​执行时间的网站：**

[https://tool.lu/crontab/](https://tool.lu/crontab/)

![](/img/remote/1460000021815910)

**实例：**

每隔2分钟输出当前时间到文件

*/2 * * * * echo $(date) >> /test/date.log

每周一的凌晨4点备份Crontab到指定目录的以当前日期命名的文件

0 4 * * 1 crontab -l > /backup/backMyCrontab/backMyCrontab-$(date +%Y-%m-%d).log

在 12 月内, 每天的早上 6 点到 12 点，每隔 3 个小时 0 分钟执行一次 /usr/bin/backup

0 6-12/3 * 12 * /usr/bin/backup

每天3-5,17-20每隔30分钟同步一次互联网时间，并且不输出日志到crontab将结果输出到log

echo "*/30 [3-5],[17-20] * * * /usr/bin/ntpstat time.windows.com >/dev/null 2>&1" >> /var/cron.log

每隔两天的上午8点到11点的第3和第15分钟执行command

3,15 8-11 */2 * * command

每个星期一的上午8点到11点的第3和第15分钟执行command

3,15 8-11 * * 1 command

每周六、周日的1:10重启smb

10 1 * * 6,0 /etc/init.d/smb restart

每周一至周五3点钟，在目录/home中，查找文件名为*.xxx的文件，并删除4天前的文件。

00 03 * * 1-5 find /home "*.xxx" -mtime +4 -exec rm {} \;

每小时执行`/etc/cron.hourly`目录内的脚本

01 * * * * root run-parts /etc/cron.hourly

**Crontab使用小结：**

```
1.环境变量问题，例如crontab不能识别Java的环境变量
```

**知识拓展：**

**查看**crontab的日志记录：

1. linux
--------

看 /var/log/cron.log这个文件就可以，可以用**tail**-f /var/log/cron.log观察。

或者是**less  /var/log/cron**输入G（大写），直接到末尾查看最新的日志信息。

2. mail任务
---------

在 /var/spool/mail/root 文件中，有crontab执行日志的记录，用**tail -f /var/spool/mail/root**即可查看最近的crontab执行情况。

**系统任务调度****：**系统周期性所要执行的工作，比如写缓存数据到硬盘、日志清理等。在`/etc`目录下有一个crontab文件，这个就是系统任务调度的配置文件。

`/etc/crontab`文件包括下面几行：

SHELL=/bin/bash  
PATH=/sbin:/bin:/usr/sbin:/usr/bin  
MAILTO=""  
HOME=/

第一行SHELL变量指定了系统要使用哪个shell，这里是bash，第二行PATH变量指定了系统执行命令的路径，第三行MAILTO变量指定了crond的任务执行信息将通过电子邮件发送给root用户，如果MAILTO变量的值为空，则表示不发送任务执行信息给用户，第四行的HOME变量指定了在执行命令或者脚本时使用的主目录。

**用户任务调度****：**用户定期要执行的工作，比如用户数据备份、定时邮件提醒等。用户可以使用 crontab 工具来定制自己的计划任务。所有用户定义的crontab文件都被保存在`/var/spool/cron`目录中。其文件名与用户名一致，使用者权限文件如下：

/etc/cron.deny 该文件中所列用户不允许使用crontab命令  
/etc/cron.allow 该文件中所列用户允许使用crontab命令  
/var/spool/cron/ 所有用户crontab文件存放的目录,以用户名命名

**使用注意事项：**

注意环境变量问题  
有时我们创建了一个crontab，但是这个任务却无法自动执行，而手动执行这个任务却没有问题，这种情况一般是由于在crontab文件中没有配置环境变量引起的。

在 crontab文件中定义多个调度任务时，需要特别注意的一个问题就是环境变量的设置，因为我们手动执行某个任务时，是在当前shell环境下进行的，程 序当然能找到环境变量，而系统自动执行任务调度时，是不会加载任何环境变量的，因此，就需要在crontab文件中指定任务运行所需的所有环境变量，这 样，系统执行任务调度时就没有问题了。

不要假定cron知道所需要的特殊环境，它其实并不知道。所以你要保证在shelll脚本中提供所有必要的路径和环境变量，除了一些自动设置的全局变量。所以注意如下3点：

1）脚本中涉及文件路径时写全局路径；

2）脚本执行要用到java或其他环境变量时，通过source命令引入环境变量，如：

cat start_cbp.sh

!/bin/sh
========

source /etc/profile

export RUN_CONF=/home/d139/conf/platform/cbp/cbp_jboss.conf

/usr/local/jboss-4.0.5/bin/run.sh -c mev &

3）当手动执行脚本OK，但是crontab死活不执行时。这时必须大胆怀疑是环境变量惹的祸，并可以尝试在crontab中直接引入环境变量解决问题。如：

0 * * * * . /etc/profile;/bin/sh /var/www/java/audit_no_count/bin/restart_audit.sh

**注意清理系统用户的邮件日志（命令：rm -f /val/mail/root ）**  
每条任务调度执行完毕，系统都会将任务输出信息通过电子邮件的形式发送给当前系统用户，这样日积月累，日志信息会非常大，可能会影响系统的正常运行，因此，将每条任务进行重定向处理非常重要。

例如，可以在crontab文件中设置如下形式，忽略日志输出：

0 */3 * * * /usr/local/apache2/apachectl restart >**/dev/null 2>&1**

“/dev/null 2>&1”表示先将标准输出重定向到/dev/null，然后将标准错误重定向到标准输出，由于标准输出已经重定向到了/dev/null，因此标准错误也会重定向到/dev/null，这样日志输出问题就解决了。

系统级任务调度主要完成系统的一些维护操作，用户级任务调度主要完成用户自定义的一些任务，可以将用户级任务调度放到系统级任务调度来完成（不建议这么 做），但是反过来却不行，root用户的任务调度操作可以通过“crontab –uroot –e”来设置，也可以将调度任务直接写入/etc /crontab文件，需要注意的是**，如果要定义一个定时重启系统的任务，就必须将任务放到/etc/crontab文件，即使在root用户下创建一个 定时重启系统的任务也是无效的。**

其他注意事项  
**新创建的cron job，不会马上执行，至少要过2分钟才执行。**__如果重启cron则马上执行__**。**

当crontab突然失效时，可以尝试/etc/init.d/crond restart解决问题。或者查看日志看某个job有没有执行/报错tail -f /var/log/cron。

千万别乱运行crontab -r。它从Crontab目录（/var/spool/cron）中删除用户的Crontab文件。删除了该用户的所有crontab都没了。

**在crontab中%是有特殊含义的，表示换行的意思。如果要用的话必须进行转义\%，如经常用的date ‘+%Y%m%d’在crontab里是不会执行的，****应该换成date ‘+\%Y\%m\%d’。**

参考文章：

[http://man.linuxde.net/Crontab](http://man.linuxde.net/Crontab)

[https://www.cnblogs.com/ftl10...](https://www.cnblogs.com/ftl1012/p/crontab.html)

[https://www.cnblogs.com/intva...](https://www.cnblogs.com/intval/p/5763929.html)

![](/img/remote/1460000021815911)

[linux](/t/linux)[shell](/t/shell)[命令行](/t/%E5%91%BD%E4%BB%A4%E8%A1%8C)阅读 2k发布于 2020-02-23赞1收藏[分享](#)本作品系原创，[采用《署名-非商业性使用-禁止演绎 4.0 国际》许可协议](https://creativecommons.org/licenses/by-nc-nd/4.0/)
