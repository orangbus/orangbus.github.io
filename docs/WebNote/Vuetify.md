---
title: Vuetify – 色彩，主题与基础样式
---

Vuetify的自定义色彩和更换色彩主题非常方便。

1.  [1 色彩](#con1)
2.  [1.1 JS代码控制主题颜色](#con11)
3.  [1.2 StylusCSS预处理器自定义颜色](#con12)
4.  [2 主题](#con2)
5.  [2.1 Light and Dark风格](#con21)
6.  [2.2 主题颜色对象](#con22)
7.  [2.3 动态更换主题颜色](#con23)
8.  [3 基础样式](#con3)
9.  [3.1 内容样式](#con31)
10.  [3.2 文字样式](#con32)
11.  [4 辅助样式](#con4)
12.  [4.1 display相关样式](#con41)
13.  [4.2 z轴特效](#con42)
14.  [4.3 外边距和内边距控制](#con43)
15.  [4.4 文字对齐](#con44)
16.  [5 滚动 scroll](#con5)

1 色彩
====

Vuetify使用了[扁平化设计指导色彩](https://material.io/design/color/#color-usage-palettes)中的2014 Material Design color palettes版本的色彩。

按照[官方文档中的Material colors](https://vuetifyjs.com/en/framework/colors#material-colors)，Vuetify中一共可以直接使用的色彩有：

1.  `red lighten-{1 to 5} darken-{1 to 4} accent-{1 to 4}`
2.  `pink lighten-{1 to 5} darken-{1 to 4} accent-{1 to 4}`
3.  `purple lighten-{1 to 5} darken-{1 to 4} accent-{1 to 4}`
4.  `deep-purple lighten-{1 to 5} darken-{1 to 4} accent-{1 to 4}`
5.  `indigo lighten-{1 to 5} darken-{1 to 4} accent-{1 to 4}`
6.  `blue lighten-{1 to 5} darken-{1 to 4} accent-{1 to 4}`
7.  `light-blue lighten-{1 to 5} darken-{1 to 4} accent-{1 to 4}`
8.  `cyan lighten-{1 to 5} darken-{1 to 4} accent-{1 to 4}`
9.  `teal lighten-{1 to 5} darken-{1 to 4} accent-{1 to 4}`
10.  `green lighten-{1 to 5} darken-{1 to 4} accent-{1 to 4}`
11.  `light-green lighten-{1 to 5} darken-{1 to 4} accent-{1 to 4}`
12.  `lime lighten-{1 to 5} darken-{1 to 4} accent-{1 to 4}`
13.  `yellow lighten-{1 to 5} darken-{1 to 4} accent-{1 to 4}`
14.  `amber lighten-{1 to 5} darken-{1 to 4} accent-{1 to 4}`
15.  `orange lighten-{1 to 5} darken-{1 to 4} accent-{1 to 4}`
16.  `deep-orange lighten-{1 to 5} darken-{1 to 4} accent-{1 to 4}`
17.  `brown lighten-{1 to 5} darken-{1 to 4} accent-{1 to 4}`
18.  `blue-grey lighten-{1 to 5} darken-{1 to 4} accent-{1 to 4}`
19.  `grey lighten-{1 to 5} darken-{1 to 4} accent-{1 to 4}`
20.  `shades black white transparent`

一共有19套扁平化风格的色系。每一种颜色有一个主色，然后有浅色调五种颜色，深色调四种颜色和四种额外颜色的扩展，即每一系颜色有14种供选择，非常方便。

最后的`shades`系列是基础的纯黑，纯白和透明颜色三种。

预定义的这些颜色通过同名的CSS类就可以直接使用：

1.  `<div class="red">`，定义背景颜色为主色彩
2.  `<span class="red--text">`，定义文字颜色为主色彩
3.  `<span class="red--lighten-2">`，定义背景颜色为扩展颜色
4.  `<span class="red--text text--accent-2">`，定义文字颜色为扩展颜色

在选择的颜色的时候，每种颜色的主色调对应[扁平化设计指导色彩](https://material.io/design/color/#color-usage-palettes)中的500号颜色，浅色对应50-400号颜色，深色对应600-900号颜色。  
`accent`系列颜色是100，200，400，700号颜色的变体，主要用于一些副标题或者色块区域。在设计网页的时候，基本上还是从50-900号颜色中来挑选主题色彩所需要的颜色。

### 1.1 JS代码控制主题颜色

这里就要稍微接触一下主题色彩了，如果用过其他的前端UI库比如Bootstrap4，里边的色彩通常会写成`xxx-primary`，其中的`primary`就是主题色彩变量。

主题色彩变量的好处是可以到处复用，然后通过更改主题颜色的变量值，可以方便的更换整个应用的颜色风格。

Vuetify能够在加载插件的时候，手工直接指定主题颜色：

```
import Vue from 'vue'
import Vuetify from 'vuetify'

import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: colors.orange.darken2,
    secondary: colors.lightGreen.lighten4,
    accent: colors.indigo.base
  }
})

```

`primary`等基础颜色变量的使用方法和具体颜色一样，比如`class="accent--text text--lighten-2"`

### 1.2 StylusCSS预处理器控制主题颜色

Stylus就和SASS之类都是预处理器。在前边的JS代码中，如果导入colors对象，会让整个JS文件的体积增大30Kb左右。如果只是想使用一些特定的颜色，可以通过修改Vuetify的stylus文件来关闭导入颜色对象。这需要手工关闭，然后在导入主stylus文件。

由于使用stylus预处理器不是重点，而且对于我们不是非常专业的前端，没有必要在颜色方面自定义太多东西，这里就看[官方文档](https://vuetifyjs.com/en/framework/colors#stylus-color-pack)吧。

2 主题色彩
======

上一节已经看过了主题色彩，其实就是一套固定名称的色彩变量。Vuetify提供了如下几个方面可以快速改变应用的主题色彩。

### 2.1 Light and Dark风格

直接在`v-app`上设置`dark`属性可以让大部分应用组件的底色都变成黑色。不设置则默认是亮色主题。

```
<v-app dark>
...
</v-app>

```

### 2.2 主题颜色对象

在上一节中，引入Vuetify插件的时候传入的配置对象中的`theme`对象，就是主题颜色对象。Vuetify提供了一个[主题色彩生成器](https://theme-generator.vuetifyjs.com/)，进去选好需要的七种色彩，就可以生成直接可供导入的对象或者对应color对象的代码：

```
{
    primary: #3f51b5,
    secondary: #673ab7,
    accent: #e91e63,
    error: #f44336,
    warning: #ff5722,
    info: #4caf50,
    success: #607d8b
}

```

或者：

```
import colors from 'vuetify/es5/util/colors'

{
    primary: colors.indigo.base,
    secondary: colors.deep-purple.base,
    accent: colors.pink.base,
    error: colors.red.base,
    warning: colors.deep-orange.base,
    info: colors.green.base,
    success: colors.blue-grey.base
}

```

有了这个对象就可以方便的更换颜色风格。

在传入对象的时候，也可以只传部分颜色名称，没有传入的颜色会使用默认颜色。

### 2.3 动态更换主题颜色

刚才的对象都是在App启动的时候传入的。Vuetify通过`this.$vuetify.theme`对象可以直接访问和设置色彩变量的名称。

比如给之前在学习Grid系统的时候写的导航栏增加一个改变文字颜色的按钮：

```
<button @click="changeColor">改变颜色</button>
<script>
    new Vue({
        el: '#app',
        // ...此处省略...
        methods: {
            changeColor : function () {
                this.$vuetify.theme.primary = '#FF9800'
            }
        }
    })
</script>

```

按了这个按钮，就会把所有文字的颜色变成橙色（A标签的文字默认使用`primary`颜色）。

主题的内容除了上述这些之外，还有一些可以在传入`theme`对象的时候自定义类似`primary.base`或者`primary.darken1`的方法，就是使用嵌套的对象。

此外还有服务端渲染的内容，以及自定义颜色变量等内容，有兴趣的可以看[官方文档](https://vuetifyjs.com/en/framework/theme#options)。

3 基础样式
======

Vuetify对一些HTML标签应用了一些特殊样式，此外还提供了一些CSS类用于控制文字展示。

### 3.1 内容样式

已经定义了预置样式的HTML元素有：

1.  `blockquote`，blockquote元素，其中的内容会自动应用样式，字体大小为18px，带有上下padding
2.  `p`，标准P元素，字体大小为14px，带有下margin
3.  `var`，表示变量，会自动应用斜体，14px
4.  `code`，会自动应用样式，等宽字体，13px
5.  `kbd`，13px，背景为浅黑色，等宽字体

这些样式直接使用对应的标签包围内容即可。无需额外在标签上定义CSS类。

### 3.2 文字样式

Vuetify提供了一系列类，用于将文字规范到扁平化设计的文字规范，主要有是四个方面的内容：字体大小，字体重量，字体转换，字体包裹。

字体大小提供了一系列CSS类用于将指定的文字转换成符合扁平化设计的文字大小，这些字体大小的CSS类可以用于任何文字对象上，但最好还是和语义化的HTML标签一起使用：

1.  `.display-4`，设置文字为112px，通常搭配`h1`元素使用
2.  `.display-3`，设置文字为56px，通常搭配`h2`元素使用
3.  `.display-2`，设置文字为45px，通常搭配`h3`元素使用
4.  `.display-1`，设置文字为34px，通常搭配`h4`元素使用
5.  `.headline`，设置文字为24px，通常搭配`h5`元素使用
6.  `.title`，设置文字为20px，通常搭配`h6`元素使用
7.  `.subheading`，设置文字为16px，通常在标题作为副标题使用
8.  `.body-2`，设置文字为14px，字重500，通常作为正文使用
9.  `.body-1`，设置文字为14px，通常作为正文使用
10.  `.caption`，设置文字为12px，通常作为辅助文字使用

除了`.body-2`，都是普通字重。

Vuetify支持的字重对应关系是：

1.  `.font-weight-thin`，对应100
2.  `.font-weight-light`，对应300
3.  `.font-weight-regular`，对应400
4.  `.font-weight-medium`，对应500
5.  `.font-weight-bold`，对应700
6.  `.font-weight-black`，对应900

字重选择的支持也得益于Vuetify默认的Roboto字体支持的字重种类比较多。

`.font-italic`类用于斜体。

文本转换也有几个类，用于转换大小写：

1.  `.text-capitalize`，设置首字母大写
2.  `.text-lowercase`，设置英文为小写
3.  `.text-none`，不进行转换
4.  `.text-uppercase`，设置大写
5.  `.font-weight-bold`，对应700
6.  `.font-weight-black`，对应900

最后是外边容器是否截断文字的两个类：

1.  `.text-no-wrap`，设置whitespace属性为nowrap
2.  `.text-truncate`，截断超出的文字

4 辅助样式
======

除了基础的预置样式和文字样式之外，Vuetify也提供了很多辅助类用于微调样式。

### 4.1 display相关样式

这里的样式主要是与`display`属性相关，用于控制可见性，溢出和元素的显示框类型。

可见性的写法是：`hidden-{breakpoint}-{condition}`。

其中的`breakpoint`是断点的代码，`{condition}`部分是条件，有三个选项：

1.  `only`，仅在断点对应的屏幕宽度范围内生效
2.  `and-down`，断点和更小的屏幕宽度
3.  `and-up`，断点和更大的屏幕宽度

此外还可以使用媒体类型，控制元素在不同的情况下可见，比如`hidden-screen-only`控制仅在屏幕上不可见，`hidden-print-only`控制仅在打印时不可见。

溢出的处理有三个类：

1.  `overflow-hidden`，不显示所有溢出部分
2.  `overflow-y-hidden`，不显示竖直方向的溢出
3.  `overflow-x-hidden`，不显示水平方向的溢出

最后是控制元素的显示框类型，在Grid部分的几个排版元素的API中已经见过这种类型的CSS样式类。这些类如下：

1.  `d-inline-flex`
2.  `d-flex`
3.  `d-inline-block`
4.  `d-block`
5.  `d-inline`
6.  `d-none`

类名一看就知道效果是什么。利用`display`相关样式，很容易就可以做出一个随着屏幕宽度减少，导航条内容不断减少的效果：

```
<div id="app">
    <v-app>
        <v-container>
            <v-layout wrap :class="classObject" >
                <v-flex xs1 class="hidden-xs-only">
                    <div style="text-align: center;"><a href="#">Home</a></div>
                </v-flex>
                <v-flex xs1 class="hidden-sm-and-down">
                    <div style="text-align: center;"><a href="#">Products</a></div>
                </v-flex>
                <v-flex xs1 class="hidden-md-and-down">
                    <div style="text-align: center;"><a href="#">Contact</a></div>
                </v-flex>
                <v-flex xs1 class="hidden-lg-and-down">
                    <div style="text-align: center;"><a href="#">About</a></div>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</div>

```

### 4.2 z轴特效

Vuetify中对于标准CSS中的`z-index`属性进行重新设计，使用elevation-{n}标识z轴的层级，并且自动设置对应的样式。

层级一共有25种，用0-24表示，所以这个CSS类就是从`elevation-0`到`elevation-24`。

每一个层级都会设置不同的样式，看上去就像是离页面越来越远。可以看官网的[例子](https://vuetifyjs.com/en/framework/elevation#playground)。

### 4.3 外边距和内边距控制

Vuetify的文档还是很细致的，我记得Bootstrap4可能也有类似的类，但是都没在文档里仔细提过。

控制外边距和内边距的CSS类是`{property}{direction}-{size}`。来分别看看其中的三个内容：

1.  `property`，可以设置为`m`和`p`，分别表示外边距`margin`和内边距`padding`。
2.  `direction`设置如下：
    1.  `t`表示`top`
    2.  `b`表示`bottom`
    3.  `l`表示`left`
    4.  `r`表示`right`
    5.  `x`表示同时`right`和`left`
    6.  `y`表示同时`top`和`bottom`
    7.  `a`表示所有方向
3.  `size`设置如下：
    1.  `auto`表示`auto`
    2.  `0`表示`0`
    3.  `1`表示`$spacer`代表的宽度*0.25，默认是4px
    4.  `2`表示`$spacer`代表的宽度*0.5，默认是8px
    5.  `3`表示`$spacer`代表的宽度，默认是16px
    6.  `4`表示`$spacer`代表的宽度*1.5，默认是24px
    7.  `5`表示`$spacer`代表的宽度*3，默认是48px

掌握了原始的CSS样式的话，使用这个类很容易。

### 4.4 文字对齐

控制文字对齐的CSS样式类是`text-{breakpoint}-{position}`。

`{position}`可以选择的是`right`，`left`和`center`。

需要说明的是这个样式类的工作特点和断点是一样的，即如果想让一个元素的文字在所有情况下都居中，需要设置成`text-xs-center`，会自动覆盖掉所有更大宽度的屏幕。

5 滚动 scroll
===========

Vuetify提供了`$vuetify.goto(target, options)`这样一个方法用于控制滚动。

其中`target`可以是一个数字，表示距离页面顶端的像素距离；还可以是一个CSS选择器字符串或者一个元素的引用，用来滚动到指定的元素处。

其中`options`则是一个配置对象，其中的属性有`duration`表示时间，`easing`表示缓和曲线效果，`offset`表示上下偏移量，`container`暂时不知道表示什么。

`$vuetify.goto(target, options)`是在任意Vue组件中都可以访问的，极大的提高了灵活性。

光说不练假把式，官网的[例子](https://vuetifyjs.com/en/framework/scroll#usage)其实很不错，但是没有明确的看到传入的参数。

可以做一个页面来简单的看一下效果：

```
<div id="app">
    <v-app id="inspire">
        <v-container>
            <v-layout>
                <v-btn color="primary" @click="scroll1">滚动到1000像素</v-btn>
                <v-btn color="primary" class="text-none" @click="scroll2">滚动到id="p2"的元素处</v-btn>
                <v-btn color="primary" @click="scroll3" class="text-none">滚动到ref="saner"的元素处</v-btn>
            </v-layout>
            <v-layout row wrap>
                <v-flex xs12>
                    <p style="height: 1500px" id="p1">1st consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
                </v-flex>
                <v-flex  xs12>
                    <p style="height: 1500px" id="p2">1st consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
                </v-flex>
                <v-flex xs12>
                    <p style="height: 1500px" ref="saner" id="p3">1st consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
                </v-flex>
            </v-layout>

        </v-container>
    </v-app>
</div>
<script>
    new Vue({
        el: '#app',
        methods:{
            scroll1:function () {
                this.$vuetify.goTo(1000, {
                    duration: 300,
                    easing: "easeInOutCubic",
                    offset: 700});
            },
            scroll2:function () {
                this.$vuetify.goTo('#p2', {});
            },
            scroll3:function () {
                this.$vuetify.goTo(this.$refs.saner, {});
            },

        }
    })
</script>

```

这个页面里有三个按钮，然后是三个高1500像素的段落。

第一个按钮是滚动到距离页面顶部1000像素的位置，然后加上了配置参数，`duration: 300`我感觉了一下应该是0.3秒左右；`easing`属性直接传入字符串即可。`offset`数值为正数的时候，表示从1000像素的位置，往页面上方偏移700像素，也就是实际上只会移动到距离页面顶部300像素的位置。如果是负数就是往页面下方偏移了。

第二个按钮采用CSS选择器，选中的是`id="p2"`的元素，会直接滚动到对应元素的地方。

第二个按钮采用一个DOM对象的方式，使用了Vue的`ref`属性的特性，通过`this.$refs.saner`选中第三个段落元素，会直接滚动到该元素处。

`easing`属性可以使用的字符串有如下：

```
linear
easeInQuad
easeOutQuad
easeInOutQuad
easeInCubic
easeOutCubic
easeInOutCubic
easeInQuart
easeOutQuart
easeInOutQuart
easeInQuint
easeOutQuint
easeInOutQuint

```

现在VuetifyGrid系统和基础的样式都学习完了，官网文档里[过渡](https://vuetifyjs.com/en/framework/transitions#motion)的部分由于Vue里过渡基本没怎么用过，暂且先放一放。经过一些初步的使用，发现Vuetify相比原来的纯CSS库，在HTML结构方面确实简明了很多。

下边就来看看各个组件的使用了。