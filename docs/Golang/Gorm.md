---
title: Gorm教程
---

## 安装

```go
"gorm.io/driver/mysql"
"gorm.io/gorm"
"gorm.io/gorm/logger"
```

# viper-读取配置文件

[https://github.com/spf13/viper](https://github.com/spf13/viper)

```bash
go get github.com/spf13/viper
```

# 初始化

```go
```

# 表迁移

```go
func MigrateTable() {
	M := db.Migrator()
	if !M.HasTable(&MovieCate{}) {
		M.CreateTable(&MovieCate{})
	}
}

// 或者是
db.AutoMigrate(&MovieCate{})
```



# 表操作

# 查询





# 添加



# 删除





