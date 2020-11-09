```

```

## vue前端笔记

## 父组件给子组件传值

父页面

```
// content: 可以自定义
<content :content="value"></content
```

子页面,接受父组件传过来的值

```vue
props: [
	"content" //这里接受父组件传过来的值，然后就可以直接在页面中直接渲染，不用再data中定义
],
// 使用
{{ content }}
```

