通过Wsl2打造window下的linux for docker环境

## 安装 wsl

参考大佬Blog：https://baiyue.one/archives/1140.html

大概的步骤是

### 启用“虚拟机平台”可选组件

以管理员身份打开 PowerShell 并运行：

```
Enable-WindowsOptionalFeature -Online -FeatureName VirtualMachinePlatform
```

启用这些更改后，需要`重新启动计算机`。

### 使用命令行设置要由 WSL 2 支持的发行版

在 PowerShell 中运行：

```
wsl --set-version ubuntu 2
```

此外，如果要使 WSL 2 成为你的默认体系结构，可以通过此命令执行该操作：

```
wsl --set-default-version 2
```

这会使你安装的任何新发行版均初始化为 WSL 2 发行版。

==备注：需要注意的是，此次ip地址将不再是127.0.0.1或localhost，而是需要输入ifconfig,查看ech0的ip地址==

## 安装 window for ubuntu

打开window自带的应用商店，搜索 `ubuntu` 下载安装即可。

## 安装docker

```bash
bash <(curl -L -s https://raw.githubusercontent.com/Baiyuetribe/codes/master/docker.sh)
```

如果提示：

```
Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
```

可以手动启动docker服务，输入命令：`service docker start`即可。

## 使用Laradock

参考我laradock的使用教程。

## laragon

window下非常好用的继承环境

> https://laragon.org
