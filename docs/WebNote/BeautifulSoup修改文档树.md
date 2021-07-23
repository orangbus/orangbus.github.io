---
title: BeautifulSoup修改文档树
---
```
from bs4 import BeautifulSoup
```

一、修改 tag 的名称和属性
---------------

```
soup = BeautifulSoup('<b class="boldest">Extremely bold</b>','lxml')
tag = soup.b
tag
```

```
<b class="boldest">Extremely bold</b>

```

**修改 name 和属性**

```
tag.name = "blockquote" # 修改name
tag['class'] = 'verybold' # 修改属性
tag['id'] = 1 # 添加属性
tag
```

```
<blockquote class="verybold" id="1">Extremely bold</blockquote>

```

**删除属性**

```
# 删除属性
del tag['class']
del tag['id']
tag
```

```
<blockquote>Extremely bold</blockquote>

```

二、修改. string：修改文本内容
-------------------

```
markup = '<a href="http://example.com/">I linked to <i>example.com</i></a>'
soup = BeautifulSoup(markup,'lxml')

tag = soup.a
tag.string = "New link text."
tag
```

```
<a href="http://example.com/">New link text.</a>

```

三、为文本 (.string) 追加内容：append()
-----------------------------

```
soup = BeautifulSoup("<a>Foo</a>",'lxml')
soup.a.append("Bar")
print(soup)
print(soup.a.contents)
```

```
<html><body><a>FooBar</a></body></html>
['Foo', 'Bar']

```

四、创建新文本 (string) 和新标签：new_string()和 new_tag()
---------------------------------------------

**插入新文本**

```
soup = BeautifulSoup("<b></b>",'lxml')
tag = soup.b
tag.append("Hello")
print(tag)
new_string = soup.new_string(" there")
tag.append(new_string)
print(tag)
```

```
<b>Hello</b>
<b>Hello there</b>

```

**插入注释**

```
from bs4 import Comment
new_comment = soup.new_string("Nice to see you.", Comment)
tag.append(new_comment)
tag
```

```
<b>Hello there<!--Nice to see you.--></b>

```

**创建新 tag(第一个参数是 name 是必填的，其他参数选填)**

```
soup = BeautifulSoup("<b></b>",'lxml')
original_tag = soup.b

new_tag = soup.new_tag("a", href="http://www.example.com")
original_tag.append(new_tag)
original_tag
```

```
<b><a href="http://www.example.com"></a></b>

```

五、插入：insert()、insert_before() 和 insert_after()
----------------------------------------------

**insert()：插入到指定位置，第一个参数是位置，第二个产生时内容**

```
markup = '<a href="http://example.com/">I linked to <i>example.com</i></a>'
soup = BeautifulSoup(markup,'lxml')
tag = soup.a

tag.insert(1, "but did not endorse ")
print(tag)
print(tag.contents)
```

```
<a href="http://example.com/">I linked to but did not endorse <i>example.com</i></a>
['I linked to ', 'but did not endorse ', <i>example.com</i>]

```

**insert_before(): 当前 tag 前插入内容**

```
soup = BeautifulSoup("<b>stop</b>",'lxml')
tag = soup.new_tag("i")
tag.string = "Don't"
soup.b.string.insert_before(tag)
soup.b
```

```
<b><i>Don't</i>stop</b>

```

**insert_after(): 当前 tag 后插入内容**

```
soup.b.i.insert_after(soup.new_string(" ever "))
soup.b
```

```
<b><i>Don't</i> ever stop</b>

```

六、移除：clear()、extract() 和 decompose()
------------------------------------

**clear()：清除当前节点中的内容**

```
markup = '<a href="http://example.com/">I linked to <i>example.com</i></a>'
soup = BeautifulSoup(markup,'lxml')
tag = soup.a
tag.clear()
tag
```

```
<a href="http://example.com/"></a>

```

**extract()：将当前节点从文档树上移除，并作为方法结果返回**

```
markup = '<a href="http://example.com/">I linked to <i>example.com</i></a>'
soup = BeautifulSoup(markup,'lxml')
a_tag = soup.a
i_tag = soup.i.extract()
print(a_tag)
print(i_tag)
```

```
<a href="http://example.com/">I linked to </a>
<i>example.com</i>

```

**decompose()：将当前节点从文档树中移除并完全销毁**

```
markup = '<a href="http://example.com/">I linked to <i>example.com</i></a>'
soup = BeautifulSoup(markup,'lxml')
a_tag = soup.a
soup.i.decompose()
a_tag
```

```
<a href="http://example.com/">I linked to </a>

```

七、替换与包装：replace_with()、wrap() 和 unwarp()
----------------------------------------

**replace_with()：将当前节点替换为新的节点**

```
markup = '<a href="http://example.com/">I linked to <i>example.com</i></a>'
soup = BeautifulSoup(markup,'lxml')
a_tag = soup.a
new_tag = soup.new_tag("b")
new_tag.string = "example.net"
print(new_tag)
a_tag.i.replace_with(new_tag)
print(a_tag)
```

```
<b>example.net</b>
<a href="http://example.com/">I linked to <b>example.net</b></a>

```

**wrap()：为当前节点的外部包装上新的节点**

```
soup = BeautifulSoup("<p>I wish I was bold.</p>",'lxml')
soup.p.string.wrap(soup.new_tag("b"))
soup.p.wrap(soup.new_tag("div"))
```

```
<div><p><b>I wish I was bold.</b></p></div>

```

**unwarp()：将当前节点中最外部的 tag 去掉**

```
markup = '<a href="http://example.com/">I linked to <i>example.com</i></a>'
soup = BeautifulSoup(markup,'lxml')
a_tag = soup.a
a_tag.i.unwrap()
a_tag
```

```
<a href="http://example.com/">I linked to example.com</a>

```