Linux常见错误排查

## [sshd: no hostkeys available — exiting](https://www.cnblogs.com/tianziru/p/5522350.html)

在开启SSHD服务时报错.
==sshd re-exec requires execution with an absolute path==
用绝对路径启动,也报错如下:

==Could not load host key: /etc/ssh/ssh_host_key
Could not load host key: /etc/ssh/ssh_host_rsa_key
Could not load host key: /etc/ssh/ssh_host_dsa_key
Disabling protocol version 1. Could not load host key
Disabling protocol version 2. Could not load host key
sshd: **no****hostkeysavailable** — exiting== 
解决过程:

```bash
ssh-keygen -t dsa -f /etc/ssh/ssh_host_dsa_key
ssh-keygen -t rsa -f /etc/ssh/ssh_host_rsa_key
/usr/sbin/sshd
```

如果上述两个文件存在，仍然出现这个错误，那么试试 chmod 600 上述两个文件。之后应该可以解决。

# linux-webstorm无法打字

在启动脚本中加下面的支持即可,前提是你已经安装了搜过输入法

```bash
# webstorem (根据自己的实际情况找到对的文件，大概路径是这样的)
# vim $HOME/.local/share/JetBrains/Toolbox/apps/WebStorm/ch-0/212.5457.55/bin/webstorm.sh

# start ======>
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export XMODIFIERS=@im=fcitx
# <=======end

```

