> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 https://juejin.im/post/5ae433ab518825671a6388d5

前言
--

当一个组件要获取多个 state 的时候，声明计算属性就会变得重复和冗余了。我们可以使用到辅助函数 mapState 来更快更简洁地生成计算属性。

所以我们得清楚，mapState 的作用就是帮我们把一个对象或数组里的值转化成计算属性的写法。同理，其它的辅助函数也是大同小异，只要知道了 mapState 的实现，其它的也基本都明白了。

注：本次阅读的是 vuex 的 2.0.0 版本，源码请戳 [这里](https://github.com/vuejs/vuex/tree/v2.0.0)。

准备
--

解读前，我们需要熟悉一些方法的使用：

*   [Array.isArray()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)
*   [Array.prototype.map()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
*   [Object.keys()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)

解读
--

先来 mapState 的使用方式：

```
import { mapState } from 'vuex'

export default {
  computed: mapState([
    // 映射 this.count 为 store.state.count
    'count'
  ])
}
复制代码

```

mapState 返回一个对象，我们知道以上的代码最后会变成这样：

```
import { mapState } from 'vuex'

export default {
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
复制代码

```

那么我们就来开始看看 mapState 做了什么处理。

还是从 vuex 的 APi 看起，打开 src/index.js 文件，最下面的代码中可以看到 vuex 暴露出的 mapState：

```
export default {
  Store,
  install,
  mapState,
  mapMutations,
  mapGetters,
  mapActions
}
复制代码

```

定位后可以找到最前面的引入：

```
import { mapState, mapMutations, mapGetters, mapActions } from './helpers'
复制代码

```

打开 `src/helpers.js` 文件，里面便有 mapState 的实现。

### normalizeMap

想知道 mapStat 这个方法的实现，还得知道里面的 `normalizeMap` 这个方法的实现。定位找到 `normalizeMap` 方法：

```
function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(key => ({ key, val: key }))
    : Object.keys(map).map(key => ({ key, val: map[key] }))
}
复制代码

```

这个方法主要是**格式化 mapState 传进来的 states 参数**。我们会知道 states 参数会是两种形式，一种是以数组的方式传入，另一种则是以对象的方法传入。

例如以下代码：

```
// 以数组的方式传入
mapState([
  'count',
  'add'
])

// 以对象的方法传入
mapState({
  count: state => state.count,
  countAlias: 'count'
})
复制代码

```

经过 `normalizeMap` 方法处理后会变成这样：

```
// 以数组的方式传入
[
  {
    key: 'count',
    val: 'count'
  },
  {
    key: 'add',
    val: 'add'
  }
]

// 以对象的方法传入
[
  {
    key: count,
    val: state => state.count
  },
  {
    key: countAlias,
    val: 'count'
  }
]
复制代码

```

### mapState

知道了 `normalizeMap` 方法的实现，再回头看 `mapState` 方法的实现：

```
export function mapState (states) {
  const res = {}
  normalizeMap(states).forEach(({ key, val }) => {
    res[key] = function mappedState () {
      return typeof val === 'function'
        ? val.call(this, this.$store.state, this.$store.getters)
        : this.$store.state[val]
    }
  })
  return res
}
复制代码

```

对刚刚 normalizeMap 格式化后返回的数组进行遍历，拼接一个符合 computed 的对象（需有返回值）。

对 normalizeMap 返回数组的对象里的 val 有两个判断。如果不是函数，直接查找 `this.$store.state[val]` 返回 state。如果是函数，则需要使用 call 将 val 这个函数的 this 指向 vue 实例，然后将 state 和 getters 传入，最后执行 val 函数。

### val 函数

如果 val 是函数，可能有点难理解，举个例子，传入的参数可能是这样子的：

```
computed: mapState({
  countPlusLocalState (state) {
    return state.count + this.localCount
  }
})
复制代码

```

经过 `normalizeMap` 方法后返回的对象为：

```
[
  {
    key: 'countPlusLocalState',
    val: function (state) {
      return state.count + this.localCount
    }
  }
]
复制代码

```

再经过 mapState 最后返回的 res 是。这里会将 val 函数执行一遍，将函数的返回值 return 出来。

```
{
  countPlusLocalState: function mappedState () {
    return this.$store.state.count + this.localCount
  }
}
复制代码

```

至此，mapState 的解读已经结束了。另外，mapState 还经常使用到 [es6 的扩展运算符](http://es6.ruanyifeng.com/#docs/object#%E5%AF%B9%E8%B1%A1%E7%9A%84%E6%89%A9%E5%B1%95%E8%BF%90%E7%AE%97%E7%AC%A6)，这个不是 vuex 的实现，而是 es6 的一个新特性：

```
computed: {
  localComputed () { /* ... */ },
  
  // 使用对象展开运算符将此对象混入到外部对象中
  ...mapState({
    // ...
  })
}
复制代码

```

例外需要注意，如果要使用 es6 的扩展运算符，还需要引入一个 babel 包：[babel-plugin-transform-object-rest-spread](https://babeljs.io/docs/plugins/transform-object-rest-spread/)。

总结
--

mapState 的代码不多，主要的功能就是将传入的数组或对象转成 computed 计算属性能够识别的代码。比较难理解的就是对象带有函数的返回值有点绕，多看几遍理解理解。

mapState 里面的代码实现非常的简洁精湛，主要用到了 js 的一些内置函数做处理，如果是我，估计会一直写 for 循环实现吧哈哈，从中收获到不少知识的。至此，vuex 的解读算告一段落。