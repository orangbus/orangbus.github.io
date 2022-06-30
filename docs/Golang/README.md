---
title: Golang学习笔记
---

# 数据转化

## json转struct

请求第三方接口返回的 json 数据（举个例子）

```json
{
    code: 200
    msg: "ok",
    data:[
        { id:1,title: "golang入门"},
        { id:2,title: "golang入门到放弃"},
    ]
}
```

```go
package main

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"testing"
)

var url = "https://demo.com"

// 定义一个列表结构
type classList struct {
	Type_id   string `json:"type_id"`
	Type_name string `json:"type_name"`
}

// json 字段 （注意：开头大写，否则转化失败）
type respData struct {
	Code      int         `json:"code"`
	Page      int         `json:"page"`
	Pagecount int         `json:"pagecount"`
	Limit     int         `json:"limit"`
	Total     int         `json:"total"`
	ClassList []classList `json:"class"` // 这是一个列表数据
}

func TestFuzz(t *testing.T) {
	resp, error := http.Get(url)
	if error != nil {
		t.Log(error)
	}
	defer resp.Body.Close()

    // 将字节转化为 json字符串
	body, _ := ioutil.ReadAll(resp.Body)
	t.Log(string(body))
    
    // 将json字符串转化为 struct
	item := respData{}
	if jsonErr := json.Unmarshal(body, &item); jsonErr == nil {
		t.Log(item)
	} else {
		t.Log(jsonErr)
	}
	for k, v := range item.ClassList {
		t.Log(k, ":", v)
	}
}

```

## struct 转 json

```
encoding/json
```

```go
package main

import (
	"encoding/json"
	"fmt"
	"testing"
)

type user struct {
	Id   int    `json:"id"`
	Age  int    `json:"age"`
	Name string `json:"name"`
}

func TestStructToJson(t *testing.T) {
	user := user{
		Id:   1,
		Name: "orangbus",
		Age:  18,
	}
	fmt.Println(user) // {1 18 orangbus}

	//转化为json
	data, _ := json.Marshal(user)
	fmt.Println(string(data)) // {"id":1,"age":18,"name":"orangbus"}
}

```





# 字符串操作

## 截取

```go
func TestStrSplice(t *testing.T) {
	var s = "https://v.qq.com/x/cover/mzc00200t1tvb7d/g0   04252hyh1.html"
	res := s[:16]
	t.Log(res) // https://v.qq.com
}
```

## 分隔-split

> strings.split(str,",")





## 去除空格

```go
func TestStrTrim(t *testing.T) {
	var s = "https://v.qq.com/x/cover/mzc00200t1tvb7d/g0   04252hyh1.html"
	res := strings.Replace(s, " ", "", -1)
	t.Log(res)
}
```



