---
title: Golang学习笔记
---

# go安装

goroot:  go安装目录

gopath： go代码开发目录

gobin:  gopath下面的bin目录

[https://golang.google.cn/dl/](https://golang.google.cn/dl/) 

将下载的二进制包解压至` /usr/local`目录, go安装目录。

```bash
tar -C /usr/local -xzf go1.4.linux-amd64.tar.gz
```

将 /usr/local/go/bin 目录添加至 PATH 环境变量：

```bash
vim ~/.bash_profile  
// or 
vim ~/.zshrc

export GOROOT="/usr/local/go"
export GOPATH=$HOME/go
export GOBIN=$GOROOT/bin
export PATH=$PATH:$GOBIN
```

重载配置使其生效

```bash
source ~/.bash_profile
// or 
source ~/.zshrc
```

# 环境初始化

1.设置代理，快速下载第三方包

```awk
go env -w GOPROXY=https://goproxy.cn,direct
```

2.开启go modules （设置为auto模式，项目中有.mod文件就代表开启，没有就不开启）

```nginx
go env -w GO111MODULE=auto
```

# 初始化一个项目

```bash
go mod init orangbus.cn/spider/web
```

安装包

```bash
go get github.com/antchfx/htmlquery
```

## 时间

```go
time.Now().Format("2006-01-02 15:04:05") // 当前格式2022-07-05 16:21:50
```

# goto

跳转到指定的行

# 指针

指针是存储另一个变量的**内存地址的变量** 

## 申明指针

```go
var var_name *var_type

var url *string
```

## 举例说明

```go
// 1、定义一个int类型的变量
a := 10
fmt.Println("a的数值是：", a)     // 10
fmt.Printf("%T\n", a)        // int
fmt.Printf("a的地址是：%p\n", &a) // 0xc00001c0f8

// 2、创建一个指针变量，用来存储a的地址
var p1 *int
fmt.Println(p1)                           // nil 空指针
p1 = &a                                   // p1 指向了a的内存地址
fmt.Println("p1的数值是：", p1)                // p1中存储的是a的地址，跟变量a的地址是一样的
fmt.Printf("p1自己的地址：%p\n", &p1)           // 0xc00000e030
fmt.Println("p1的数值是a的地址，改地址存储的数据是：", *p1) // 10 a的值

//3、更改变量数值，并不会改变地址
a = 100
fmt.Println("a修改过后的值：", a)       // 100
fmt.Printf("更改a后,a的地址：%p\n", &a) // 0xc00001c0f8

// 4、通过执行，改变变量的数值
*p1 = 200
fmt.Println("p1修改过后,a的值：", a)       // 200
fmt.Println("p1修改过后的值：", p1)        // 0xc0000b8000
fmt.Println("p1修改之后地址存储的数据是：", *p1) // 200

// 5、指针的指针
var p2 **int
fmt.Println("p2的值：", p2) // nil
p2 = &p1
fmt.Printf("%T,%T,%T\n", a, p1, p2) // int,*int,**int
fmt.Println("p2的数值：", p2)           // p1的地址
fmt.Println("p2中存储的地址，对应的数值，就是p1的地址，对应的数据：", *p2) // 0xc00001c0f8
	fmt.Println("p2中存储的地址，对应的数值，再获得对应的数值：", **p2)     // 200 也就是a的值
```

```
a -> 10
&a -> a的地址

p1 -> a的地址
&p1 -> p1自己的地址
*p1 -> 获取执行存储的地址，对应的数值

p2 -> p1的地址
&p2 -> p2 自己的地址
*p2 -> 获取指针储存的地址，对应的数值。就是p1,实际上p1中存储的数值，就是a的地址
```

## 数组指针

首先是一个指针，一个数组的地址

```
*[2]Type
```

## 指针数组

首先是一个数组，存储的数据类型是指针

```go
[2]*Type
```

案例

```go
// 1、创建一个普通的数组
arr1 := [4]int{1, 2, 3, 4}
fmt.Println("数组的值：", arr1) //  [1 2 3 4]

// 2、创建一个执行，存储该数组的地址 ---> 数组执行
var p1 *[4]int
p1 = &arr1
fmt.Println("p1的值：", p1)      // &[1 2 3 4] 表示一个指针的数组
fmt.Printf("p1的地址:%p\n", &p1) // 数组 arr1 的地址

// 3、根据数组指针，操作数据
(*p1)[0] = 100
fmt.Println("修改过后的p1值", p1) //  &[100 2 3 4]
p1[1] = 200                 // 简化写法
fmt.Println(p1, arr1)       // &[100 200 3 4] [100 200 3 4]

// 4、指针数组
a := 1
b := 2
arr2 := [2]int{a, b}
arr3 := [2]*int{&a, &b}
fmt.Println(arr2) // [1 2]
fmt.Println(arr3) // [0xc00001c178 0xc00001c180]

arr2[0] = 100
fmt.Println(arr2) //[100 2]
fmt.Println(a)    // 1
fmt.Println()

*arr3[0] = 200
fmt.Println(arr3) // [0xc00001c178 0xc00001c180]
fmt.Println(a)    // 200

a = 150
fmt.Println(arr2) // [100,2]
for i := 0; i < len(arr3); i++ {
   fmt.Println(*arr3[i])
} // 150 2
```



指针不能做运算

```go
// 交换两个变量的值
package main

import "testing"

func swap(a, b *int) {
	*b, *a = *a, *b
}

func swap2(a, b int) (int, int) {
	return b, a
}

func TestSwap(t *testing.T) {
	a, b := 3, 4
	swap(&a, &b)
	t.Log(a, b)

	c, d := 5, 6
	c, d = swap2(c, d)
	t.Log(c, d)
}
```

## 值传递： 拷贝一份数据传递

## 引用传递：传递一个地址

案例

```go
package main

import "fmt"

func number01(number int) {
	fmt.Println("number01->number：", number) // 10
}

func number02(number *int) {
	*number = 20
	fmt.Println("number2->number：", *number) // 20
}

func main() {
	a, b := 10, 10
	number01(a)
	fmt.Println("number01:", a) // 10
	number02(&b)
	fmt.Println("number01:", b) // 20

}

```



## 函数指针

一个指针，指向一个函数的指针

## 指针函数

一个函数，该函数的返回值是一个指针

案例

```go
package main

import "fmt"

func fun1() {
	fmt.Println("fun1 函数被调用了")
}

func fun2() *[3]int {
	arr := [3]int{1, 2, 3}
	return &arr
}

func main() {
	var a func()
	a = fun1
	a() // 调用函数

	arr := fun2()
	fmt.Println(arr)
}
```





# 数组-值类型

```go
package main

import "testing"

func TestArray(t *testing.T) {
	var arr = [...]int{1, 2, 3, 4}
	t.Log(arr)

	for i := 0; i < len(arr); i++ {
		t.Log(arr[i])
	}
	t.Log("-----")
	for i, val := range arr {
		t.Log(i, val)
	}

	var grid [4][5]int // 四行五列
	t.Log(grid)
}
```

# slice-切片

```
package main

import "testing"

func TestSlice(t *testing.T) {
	arr := []int{1, 2, 3, 4, 5, 6} // 定义一个数据
	arr2 := arr[3:]                   // 数组转slice
	arr2[0] = 100
	t.Log("arr2", arr2)

	// 添加
	s1 := append(arr2, 7)
	s2 := append(s1, 8)
	t.Log("s1:", s1)
	t.Log("s2:", s2)

	t.Log("arr:", arr)
}

func TestPrint(t *testing.T) {
	arr := [...]int{0, 1, 2, 3, 4, 5, 6, 7}
	s1 := arr[2:6]
	s2 := s1[3:5]
	t.Log(s1) // [2 3 4 5]
	t.Log(s2) // [5 6]
}

func TestCreate(t *testing.T) {
	var s []int
	for i := 0; i < 10; i++ {
		s = append(s, i)
	}
	t.Log("s", s)

	t.Log("=============")
	s1 := make([]int, 16)
	t.Log("s1", s1)

	t.Log("==== copy ====")
	arr2 := [...]int{11, 12, 13, 14, 15}
	copy(s, arr2[:])
	t.Log(s)
	t.Log(arr2)

	// 删除一个中间元素
	var s2 []int
	for i := 0; i < 20; i++ {
		s2 = append(s2, i)
	}
	t.Log("s2", s2, len(s2), cap(s2))
	res1 := append(s2[:9], s2[10:]...)
	t.Log("删除结果（9不见了）：", res1, len(res1), cap(res1))

	// 删除头部
	heaer := s2[1:]
	t.Log("header", heaer, len(heaer), cap(heaer))
	end := s2[0 : len(s2)-1]
	t.Log("end", end, len(end), cap(end))
}

```

# map

```go
package main

import (
	"fmt"
	"testing"
)

func TestMap(t *testing.T) {
	list := map[string]string{
		"name":  "orangbus",
		"age":   "18",
		"wight": "180",
	}
	//创建
	list2 := make(map[string]string)
	list2["name"] = "是我list2新增的"
	t.Log("list2", list2)

	// 获取
	name := list["name"]
	t.Log("获取name：", name)
	t.Log("list", list)
	t.Log(">> 添加")
	list["heght"] = "180"

	t.Log(">> 删除 age")
	delete(list, "age")
	fmt.Println(list)

	// 判断值存不存在
	if val, ok := list["age"]; ok {
		t.Log("存在age：", val)
	} else {
		t.Log("不存在age字段")
	}

	// 遍历
	for index, val := range list {
		t.Log(index, val)
	}
}

```

# 方法

```go
package main

import "fmt"

// 1、 定义一个结构体
type Work struct {
	name string
	age  int
}

// 2、定义行为方法
func (w Work) run() {
	fmt.Println(w)
}

func main() {
	w := Work{
		name: "orangbus",
		age:  18,
	}
	w.run()
}

```

# 继承中的方法

```go
package main

import (
	"fmt"
)

// 1、 定义一个父类
type Person struct {
	name string
	age  int
}

// 2、 定义一个子类
type Student struct {
	Person // 结构体嵌套，模拟继承性
	school string
}

// 3、方法
func (p Person) eat() {
	fmt.Println("父类的方法 -> eat")
}

func (s Student) study() {
	fmt.Println("学生学习了")
}

// 子类重写父类的方法
func (s Student) eat() {
	fmt.Println("子类重写父类的方法")
}

func main() {
	p := Person{
		name: "orangbus",
		age:  18,
	}
	fmt.Println(p)

	p.eat()

	// 创建子类对象
	s := Student{Person{name: "王二狗", age: 18}, "橙子工作室"}
	fmt.Println(s.name)
	fmt.Println(s.school)

	s.eat() // 子类访问父类的方法

	s.study()
}

```

# 接口

```go
package main

import "fmt"

// 1、定义一个usb的接口
type USB interface {
	start()
	end()
}

// 2、实现类
type Mouse struct {
	name string
}

func (m Mouse) start() {
	fmt.Println(m.name, "鼠标准备就绪")
}

func (m Mouse) end() {
	fmt.Println(m.name, "鼠标停止")
}

// 测试方法
func testInterface(usb USB) {
	usb.start()
	usb.end()
}

func main() {
	m := Mouse{name: "鼠标"}
	testInterface(m)

	// 空接口的使用
	map1 := make(map[string]interface{})
	map1["name"] = "orangbus"
	map1["age"] = 25
	map1["user"] = Mouse{name: "鼠标"}
	fmt.Println(map1)

	slice1 := make([]interface{}, 0, 10)
	slice1 = append(slice1, "orangbus", Mouse{name: "鼠标"})
	fmt.Println(slice1)
}
```

# 接口嵌套

```go
package main

import "fmt"

type A interface {
	test1()
}

type B interface {
	test2()
}

type C interface {
	A
	B
	test3()
}

type Cat struct {
}

func (c Cat) test1() {
	fmt.Println("test1")
}
func (c Cat) test2() {
	fmt.Println("test2")
}
func (c Cat) test3() { // 如果想实现接口C,那么需要实现AB接口
	fmt.Println("test3")
}

func main() {
	var cat Cat = Cat{}
	cat.test1()
	cat.test2()
	cat.test3()
	fmt.Println("--------")
	var a1 A = cat
	a1.test1()

	fmt.Println("--------")
	var b1 B = cat
	b1.test2()

	fmt.Println("----------")
	var c1 C = cat
	c1.test1()
	c1.test2()
	c1.test3()

	fmt.Println("----------")

	var c2 A = a1
	c2.test1()

}

```

# goroutine



## 临界资源

```go
package main

import (
	"fmt"
	"math/rand"
	"time"
)

var ticket = 10

func saleTickets(name string) {
	for {
		if ticket > 0 {
			time.Sleep(time.Duration(rand.Intn(1000)) * time.Millisecond)
			fmt.Println(name, "售出：", ticket)
			ticket--
		} else {
			fmt.Println(name, "没有票了")
			break // 结束循环
		}
	}
}

/**
临界资源
*/
func main() {
	go saleTickets("售票口1")
	go saleTickets("售票口2")
	go saleTickets("售票口3")
	go saleTickets("售票口4")
	time.Sleep(time.Second * 3)
}
// 出现了负数的情况
售票口3 售出： 10
售票口1 售出： 9
售票口3 售出： 8
售票口1 售出： 7
售票口3 售出： 6
售票口4 售出： 5
售票口2 售出： 4
售票口1 售出： 3
售票口3 售出： 2
售票口4 售出： 1
售票口4 没有票了
售票口3 售出： 0
售票口3 没有票了
售票口1 售出： -1
售票口1 没有票了
售票口2 售出： -2
售票口2 没有票了
```

## 解决临界资源

### 1、sync.waitGroup 等待同步组

```go
package main

import (
	"fmt"
	"sync"
)

var wg = sync.WaitGroup{} // 创建同步等待组

func saleTickets(name string) {
	for i := 0; i < 10; i++ {
		fmt.Println(name, "->", i)
	}
	// 结束
	wg.Done()
}

/**
临界资源
*/
func main() {
	wg.Add(2) // 添加到等待组
    
	go saleTickets("售票口1")
	go saleTickets("售票口2")
	fmt.Println("main函数进入阻塞，等待 goroutien 结束")
	wg.Wait()
	fmt.Println("main函数结束")
}

```



### 2、sync.Mutex 加锁

```go
package main

import (
	"fmt"
	"math/rand"
	"sync"
	"time"
)

var ticket = 10

var wg = sync.WaitGroup{}
var mutex = sync.Mutex{} // 创建一个锁头

func saleTickets(name string) {
	defer wg.Done()
	for {
		mutex.Lock() // 上锁
		if ticket > 0 {
			time.Sleep(time.Duration(rand.Intn(1000)) * time.Millisecond)
			fmt.Println(name, "售出：", ticket)
			ticket--
		} else {
			fmt.Println(name, "没有票了")
			mutex.Unlock() // 条件不满足也要解锁
			break          // 结束循环
		}
		mutex.Unlock() // 解锁
	}
}

/**
临界资源
*/
func main() {
	wg.Add(4)
	go saleTickets("售票口1")
	go saleTickets("售票口2")
	go saleTickets("售票口3")
	go saleTickets("售票口4")
	wg.Wait()
	fmt.Println("main 结束了")
}
```

## 读写锁

```go
package main

import (
	"fmt"
	"sync"
	"time"
)

var rwMutex sync.RWMutex // 读写锁
var wg sync.WaitGroup    // 同步等待组

func readData(i int) {
	defer wg.Done()
	fmt.Println("开始读取数据", i)
	rwMutex.RLock() // 读操作上锁
	fmt.Println("正在读取数据。。。->", i)
	time.Sleep(time.Second * 1)
	rwMutex.RUnlock()
	fmt.Println(i, "数据读取完毕")
}

func writeData(i int) {
	defer wg.Done()
	fmt.Println("开始写->", i)
	rwMutex.Lock()
	fmt.Println("正在写数据->", i)
	time.Sleep(time.Second * 1)
	rwMutex.Unlock()
	fmt.Println(i, "->写结束")
}

func main() {
	//rwMutex = new(sync.RWMutex)
	//wg = new(sync.WaitGroup)

	//wg.Add(2)
	//go readData(1)
	//go readData(2)

	wg.Add(3)
	go writeData(1)
	go writeData(2)
	go writeData(3)

	wg.Wait()
	fmt.Println("main结束")
}

```

1、可以随便读，多个goroutine 同时读

2、写的时候，啥也不能干，不能读也不能写

# 通道

1、用户goroutine，传递消息的

2、通道，每个都有相关联的数据类型，nil chan 不能使用

3、使用通道传递数据：`<-`

```go
chan <- data // 发送数据到通道，向同道中人写数据
data <- chan //从同道中人获取数据，向通道中读取数据
```

4、阻塞，

发送数据：`chan <- data` 是阻塞的，知道另外一条 goroutine 读取数据来解除阻塞

读取数据：`data <- chan` 也是阻塞的，知道另外一条 goroutine 写入数据解除阻塞。

5、channel本身是同步的，意味着同一时间，只能有一个goroutine来操作。



```go
package main

import "fmt"

func main() {
	var ch1 chan bool
	ch1 = make(chan bool)

	go func() {
		for i := 0; i < 10; i++ {
			fmt.Println("goroutine i:", i)
		}
		// 循环结束后，想通信中写数据,表示要结束了
		ch1 <- true
		fmt.Println("goroutine 循环结束")
	}()

	data := <-ch1
	fmt.Println("data: ", data)
	fmt.Println("main end ...")

}

```

#  关闭通道

```go
close(chanel)
```

```go
package main

import (
	"fmt"
	"time"
)

func seedData(ch chan int) {
	for i := 0; i < 10; i++ {
		ch <- i
	}
	close(ch)
}

func main() {
	ch1 := make(chan int)
	go seedData(ch1)

	// 读取通道的数据
	for {
		time.Sleep(time.Second)
		v, ok := <-ch1
		if !ok {
			fmt.Println("已读取所有数据", ok)
			break
		}
		fmt.Println("读取的数据是：", v, ok)
	}
}

```

```go
package main

import (
	"fmt"
	"time"
)

func seedData(ch chan int) {
	for i := 0; i < 10; i++ {
		time.Sleep(time.Second)
		ch <- i
	}
	close(ch)
}

func main() {
	ch1 := make(chan int)
	go seedData(ch1)

	// 读取通道的数据
	for v := range ch1 {
		fmt.Println("读取的数据是：", v)
	}
	fmt.Println("main end ...")
}

```

# 缓冲通道

非缓冲通道：make(chan T)

​						一次发送，一次接受，都是阻塞的

缓冲通道： make(chann T , capacity)

​					发送：缓冲取的数据满了，才会阻塞

​					接受：缓冲器的的数据空了，才会阻塞





# jwt



# elasticsearch

```bash
```

```go
```







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

## 字符串拼接

```go
next_url := fmt.Sprintf("%s?page=%d", url, i+1)
```

# 方法错误返回处理

```go
package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

func getHtml(url string) (data string, error error) {
	resp, err := http.Get(url)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()
	// 读取内容，resp.Body() 获取到的是字节
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}
	return string(body), nil
}

func main() {
	html, err := getHtml("https://imooc.com")
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(html)
}
```

# Gorm

安装

```bash
go get -u gorm.io/gorm
go get -u gorm.io/driver/mysql
```



案例

```go
package main

import (
	"database/sql"
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"log"
	"os"
	"time"
)

type MovieCate struct {
	Id        uint32    `json:"id"`
	ApiId     int       `json:"api_id"`
	TypeName  string    `json:"name"`
	TypeId    int       `json:"type_id"`
	Status    int       `json:"status"`
	Sort      int       `json:"sort"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

var drive = "mysql"
var database = "golang"
var host = "127.0.0.1"
var port = 3306
var username = "root"
var password = "root"

// 获取当前时间
func getTime() string {
	return time.Now().Format("2006-01-02 15:04:05")
}

// 全局数据库对象
var db = &gorm.DB{}

func init() {

	// 连接数据库
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True&loc=Local", username, password, host, port, database)
	mysqlDb, err := sql.Open(drive, dsn)
	if err != nil {
		panic(err)
	}
	db, err = gorm.Open(mysql.New(mysql.Config{
		Conn: mysqlDb,
	}), &gorm.Config{
		// 日志配置
		Logger: logger.New(
			log.New(os.Stdout, "\r\n", log.LstdFlags), // io writer（日志输出的目标，前缀和日志包含的内容——译者注）
			logger.Config{
				SlowThreshold:             time.Second, // 慢 SQL 阈值
				LogLevel:                  logger.Info, // 日志级别
				IgnoreRecordNotFoundError: true,        // 忽略ErrRecordNotFound（记录未找到）错误
				Colorful:                  false,       // 禁用彩色打印
			}),
	})
	if err != nil {
		panic("数据库连接失败")
	}
	fmt.Println("数据库连接成功！")
}

// 插入数据
func Create() {
	cate := MovieCate{
		ApiId:     1,
		TypeId:    1,
		TypeName:  "demo",
		Status:    1,
		Sort:      10,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}
	result := db.Create(&cate)
	fmt.Println(result)
}

// 批量插入
func BatchInsert() {
	var cateList = []MovieCate{}
	for i := 0; i < 10; i++ {
		cateList = append(cateList, MovieCate{
			ApiId:     i + 1,
			TypeId:    i + 1,
			TypeName:  "demo",
			Status:    1,
			Sort:      i,
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		})
	}
	res := db.Create(&cateList)
	fmt.Println(res)
}

// 查询数据
func getDataById(id int) {
	//cate := new(MovieCate)
	//db.First(cate)
	//fmt.Println(cate)

	cate := db.Find(&MovieCate{}, id)
	fmt.Println(cate)
}

// 条件查询
func getCateByApiId(api_id int) {
	res := db.Where("api_id =?", api_id).Order("id desc").First(&MovieCate{})
	fmt.Println(res)
}

// 更新数据
func update() {
	var cate MovieCate
	//db.First(&cate, 723)
	//cate.TypeName = "我被更新了"
	//db.Save(&cate)

	db.Model(&cate).Where("id = ?", 724).Updates(MovieCate{
		TypeName: "我又被更新了",
		Status:   0,
	})
}

// 删除数据
func delete(id int) {
	db.Delete(&MovieCate{}, id)
}

func main() {
	delete(723)
}

```



# 爬虫案例

```go
package main

import (
	"fmt"
	"github.com/antchfx/htmlquery"
	"time"
)

// 段子结构体
type Jokes struct {
	Id         int
	Cate_id    int
	Content    string
	Image_url  string
	Image_gif  string
	Status     int
	Like_count int
	Form       string
	Created_at string
	Updated_ed string
}

// 获取段子
func getJoke(url string, page int) {
	// 解析html
	doc, err := htmlquery.LoadURL(fmt.Sprintf("%s?page=%d", url, page))
	if err != nil {
		fmt.Println(err)
	}
	list := htmlquery.Find(doc, "//div[@class='one-cont']")

	var jokeList []Jokes
	for _, val := range list {
		a := htmlquery.FindOne(val, "//p/a")
		if a != nil {
			joke := Jokes{
				Content:    htmlquery.InnerText(a),
				Form:       url + htmlquery.SelectAttr(a, "href"),
				Created_at: time.Now().Format("2006-01-02 15:04:05"),
				Updated_ed: time.Now().Format("2006-01-02 15:04:05"),
			}
			jokeList = append(jokeList, joke)
		}
	}

	// 判断最后一页
	if len(list) == 0 {
		fmt.Println("最后一页了：", url)
		return
	}
	page += 1
	next_url := fmt.Sprintf("%s?page=%d", url, page)
	fmt.Println("next_url:", next_url)
	getJoke(url, page)
}

func main() {
	var url = "https://www.xiaohua.com"
	getJoke(url+"/duanzi", 1)
}

```

## 保存到数据库中-协程

```go
package main

import (
	"database/sql"
	"fmt"
	"github.com/antchfx/htmlquery"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"log"
	"os"
	"sync"
	"time"
)

// 全局数据库对象
var db = &gorm.DB{}

// 数据库配置信息
var drive = "mysql"
var database = "golang"
var host = "127.0.0.1"
var port = 3306
var username = "root"
var password = "root"

// 协程
var wg sync.WaitGroup

func init() {

	// 连接数据库
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True&loc=Local", username, password, host, port, database)
	mysqlDb, err := sql.Open(drive, dsn)
	if err != nil {
		panic(err)
	}
	db, err = gorm.Open(mysql.New(mysql.Config{
		Conn: mysqlDb,
	}), &gorm.Config{
		// 日志配置
		Logger: logger.New(
			log.New(os.Stdout, "\r\n", log.LstdFlags), // io writer（日志输出的目标，前缀和日志包含的内容——译者注）
			logger.Config{
				SlowThreshold:             time.Second, // 慢 SQL 阈值
				LogLevel:                  logger.Info, // 日志级别
				IgnoreRecordNotFoundError: true,        // 忽略ErrRecordNotFound（记录未找到）错误
				Colorful:                  false,       // 禁用彩色打印
			}),
	})
	if err != nil {
		panic("数据库连接失败")
	}
	fmt.Println("数据库连接成功！")
}

// 段子结构体
type Jokes struct {
	Id        int       `json:"id"`
	CateId    int       `json:"cate_id"`
	Content   string    `json:"content"`
	ImageUrl  string    `json:"image_url"`
	ImageGif  string    `json:"image_gif"`
	Status    int       `json:"status"`
	LikeCount int       `json:"like_count"`
	Form      string    `json:"form"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAT time.Time `json:"updated_at"`
}

// 获取段子
func getJoke(url string, page int) {
	// 解析html
	doc, err := htmlquery.LoadURL(fmt.Sprintf("%s?page=%d", url, page))
	if err != nil {
		fmt.Println(err)
	}
	list := htmlquery.Find(doc, "//div[@class='one-cont']")

	var jokeList []Jokes
	for _, val := range list {
		a := htmlquery.FindOne(val, "//p/a")
		if a != nil {
			joke := Jokes{
				Content:   htmlquery.InnerText(a),
				Form:      url + htmlquery.SelectAttr(a, "href"),
				CreatedAt: time.Now(),
				UpdatedAT: time.Now(),
			}
			jokeList = append(jokeList, joke)
		}
	}

	// 保存到数据库中
	db.Create(&jokeList)

	// 判断最后一页
	if len(list) == 0 {
		fmt.Println("最后一页了：", url)
		return
	}
	page += 1
	next_url := fmt.Sprintf("%s?page=%d", url, page)
	fmt.Println("next_url:", next_url)
	//getJoke(url, page)
	// 协程结束
	wg.Done()
}

// 获取列表

// 保存数据库

func main() {
	var url = "https://www.xiaohua.com"
	for i := 1; i < 1073; i++ {
		wg.Add(1)
		go getJoke(url+"/duanzi", i)
	}
	wg.Wait() // 等待协程结束
	fmt.Println("爬取完成。。。")
}
```



## 保存到elasticsearch中

```go


```



