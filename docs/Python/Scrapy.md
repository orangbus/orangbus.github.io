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

### 清除css样式

```python
for p in soup.find_all('p'):
    if 'style' in p.attrs:
        del p.attrs['style']
```

## 替换图片地址

```python
html = """
<img src='/upload/a/b/aa.png'>
<img src='/upload/a/b/bb.png'>
"""
# 匹配的字符串或者正则表达式，替换的内容，需要被替换的内容
result = result = re.sub(r'/uploads/', 'http://orangbus.cn/uploads/', html)

result = """
<img src='http://orangbus.cn/upload/a/b/aa.png'>
<img src='http://orangbus.cn/upload/a/b/bb.png'>
"""
```



