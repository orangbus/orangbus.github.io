> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 https://www.csdn.net/gather_24/MtTaAgwsMzc2MC1ibG9n.html

Vue 包含一组观察数组的变异方法，所以它们也将会触发视图更新。这些方法如下：

push() 添加元素
-----------

```
<ul id="example-1">
 <li v-for="item in items" :key="item.id">{{ item.message }} </li>
</ul>
<script type="text/javascript">
var example1 = new Vue({
  el: '#example-1',
  data: {
    items: [
      {message: 'Foo' },
      {message: 'Bar' }
    ]
  }
});
example1.$data.items.push({message :  'test'});
</script>


```

pop() 删除最后一个元素
--------------

```
example1.$data.items.pop();


```

shift() 删除第一个元素
---------------

```
example1.$data.items.shift();


```

unshift() 添加一个元素到数组最前面
----------------------

```
example1.$data.items.unshift({message :'hi..'});


```

splice() 方法用于插入、删除或替换数组的元素
--------------------------

| 参数 | 描述 |
| --- | --- |
| index | 必需。规定从何处添加 / 删除元素。该参数是开始插入和（或）删除的数组元素的下标，必须是数字。 |
| howmany | 必需。规定应该删除多少元素。必须是数字，但可以是 “0”。如果未规定此参数，则删除从 index 开始到原数组结尾的所有元素。 |
| item1, …, itemX | 可选。要添加到数组的新元素`example1.$data.items.splice(0,1,{message:'splice'});` |

sort() 排序（升序）
-------------

```
<ul id="example-1">
 <li v-for="item in items" :key="item.id">{{ item }} </li>
</ul>
<script type="text/javascript">
var example1 = new Vue({
  el: '#example-1',
  data: {
    items: [
      2,3,4
    ]
  }
});
example1.$data.items.sort();


```

reverse() 排序（降序）
----------------

```
example1.$data.items.reverse();


```

### 重塑数组

变异方法 (mutation method)，顾名思义，会改变被这些方法调用的原始数组。相比之下，也有非变异(non-mutating method) 方法，例如： filter(), concat() 和 slice() 。这些不会改变原始数组，但总是返回一个新数组。当使用非变异方法时，可以用新数组替换旧数组：

```
example1.items = example1.items.filter(function (item) {

  return item.message.match(/Foo/)

})


```

你可能认为这将导致 Vue 丢弃现有 DOM 并重新渲染整个列表。幸运的是，事实并非如此。 Vue 实现了一些智能启发式方法来最大化 DOM 元素重用，所以用一个含有相同元素的数组去替换原来的数组是非常高效的操作。

filter() 数组元素过滤
---------------

```
<ul id="example-1">
 <li v-for="n in even()">{{ n }}</li>
</ul>
<script type="text/javascript">
var example1 = new Vue({
 el: '#example-1',
 data: {
  numbers: [ 1, 2, 3, 4, 5 ]
 },
 methods : {
  even : function(){
   return this.numbers.filter(function (number) {
         return number % 2 === 0;
      });
  }
 }
});
</script>


```

### 注意事项

由于 JavaScript 的限制， Vue 不能检测以下变动的数组：  
当你利用索引直接设置一个项时，例如： vm.items[indexOfItem] = newValue  
当你修改数组的长度时，例如： vm.items.length = newLength  
为了解决第一类问题，以下两种方式都可以实现和 vm.items[indexOfItem] = newValue 相同的效果， 同时也将触发状态更新：

```
// Vue.set

Vue.set(example1.items, indexOfItem, newValue)
例子:


<ul id="example-1">
 <li v-for="item in items" :key="item.id">{{ item.message }} </li>
</ul>
<script type="text/javascript">
var example1 = new Vue({
  el: '#example-1',
  data: {
    items: [
      {message: 'Foo' },
      {message: 'Bar' },
      {message: 'hcoder'}
    ]
  }
});
//example1.items[3] = {message : 'test...'};
Vue.set(example1.items, 3, {message : 'test...'});
</script>


```

数组转字符串
------

```
var arr = [1,2,3,4,'李明','jerry'];
arr.join()
//"1,2,3,4,李明,jerry"

arr.toString()
//"1,2,3,4,李明,jerry"

arr.join("")
//"1234李明jerry"

arr.join("-")
//"1-2-3-4-李明-jerry"

JSON.stringify(arr)
//"[1,2,3,4,"李明","jerry"]"

var x = JSON.stringify(arr)
JSON.parse(x)
//[1, 2, 3, 4, "李明", "jerry"]


```

字符串转数组
------

```
var x = "1-2-3-4-李明-jerry"
x.split("")
//["1", "-", "2", "-", "3", "-", "4", "-", "李", "明", "-", "j", "e", "r", "r", "y"]
x.split("-")
//["1", "2", "3", "4", "李明", "jerry"]


```

对象转数组
-----

```
var x = {"name":"李明","age":23}


```

对象的键组成数组
--------

```
Object.keys(x)
//["name", "age"]


```

对象的值组成数组
--------

```
Object.values(x)
// ["李明", 23]


```

键值对组成的数组
--------

```
Object.entries(x)
//[["name", "李明"],["age", 23]]


```

数组转对象
-----

```
var arr =[1, 2, 3, 4, "李明", "jerry"]
{...arr}
//{0: 1, 1: 2, 2: 3, 3: 4, 4: "李明", 5: "jerry"}


```