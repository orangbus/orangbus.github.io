## window修改终端未git

打开配置文件搜索：`terminal.integrated.shell.windows` ,后面修改为你git的路径

```json
"terminal.integrated.shell.windows": "D:\\Programfile\\Git\\bin\\bash.exe",
```

# PowerShell 管理执行策略

输入 get-ExecutionPolicy，返回的是 **Restricted**，表明禁止，我们需要调整执行策略：

```shell
// 检查策略状态
Get-ExecutionPolicy

// 更改执行策略
Set-ExecutionPolicy RemoteSigned

// 恢复默认执行策略
Set-ExecutionPolicy Restricted
```



