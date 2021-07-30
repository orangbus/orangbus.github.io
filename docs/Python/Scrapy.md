---
title: Scrapy入门笔记
---

## 字符串去空，去换行

```python
string.strip()
```



## bs4技巧

### 节点找不到判断

`html.h2.a` 这个节点找不到

```python
if item.h2.a != None:
    print(item.h2.a)
```

### 删除某个节点

```python
html = BeautifulSoup(response.text, 'lxml')
content = html.find(class_="entry")
content.find(class_="entry-copyright").decompose()
# 去除不需要的元素
[s.extract() for s in content(['img', 'a'])]
#去除img标签，并且去除class='page'的节点
[s.extract() for s in content(['img', {'class':'page'}])] 
content = content.prettify()
```



