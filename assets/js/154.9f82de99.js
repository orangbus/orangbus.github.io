(window.webpackJsonp=window.webpackJsonp||[]).push([[154],{668:function(t,_,r){"use strict";r.r(_);var e=r(11),a=Object(e.a)({},(function(){var t=this,_=t.$createElement,r=t._self._c||_;return r("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[r("h2",{attrs:{id:"前言"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#前言"}},[t._v("#")]),t._v(" "),r("strong",[t._v("前言")])]),t._v(" "),r("p",[t._v("日常开发中，我们经常会使用到order by，亲爱的小伙伴，你是否知道order by 的工作原理呢？order by的优化思路是怎样的呢？使用order by有哪些注意的问题呢？本文将跟大家一起来学习，攻克order by~")]),t._v(" "),r("p",[r("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/ee2e7666ad2b894e8148ed297454b55d.png",alt:"图片"}})]),t._v(" "),r("h2",{attrs:{id:"一个使用order-by-的简单例子"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#一个使用order-by-的简单例子"}},[t._v("#")]),t._v(" "),r("strong",[t._v("一个使用order by 的简单例子")])]),t._v(" "),r("p",[t._v("假设用一张员工表，表结构如下：")]),t._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[t._v("``CREATE TABLE `staff` (\n`id` BIGINT ( 11 ) AUTO_INCREMENT COMMENT '主键id',\n`id_card` VARCHAR ( 20 ) NOT NULL COMMENT '身份证号码',\n`name` VARCHAR ( 64 ) NOT NULL COMMENT '姓名',\n`age` INT ( 4 ) NOT NULL COMMENT '年龄',\n`city` VARCHAR ( 64 ) NOT NULL COMMENT '城市',\nPRIMARY KEY ( `id`),\nINDEX idx_city ( `city` )\n) ENGINE = INNODB COMMENT '员工表';`` \n\n*   1\n*   2\n*   3\n*   4\n*   5\n*   6\n*   7\n*   8\n*   9\n\n\n")])])]),r("p",[t._v("表数据如下：")]),t._v(" "),r("p",[r("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/69bcbc086b3b5d56ac7c693bf4cfabed.png",alt:"图片"}})]),t._v(" "),r("p",[t._v("我们现在有这么一个需求："),r("strong",[t._v("查询前10个，来自深圳员工的姓名、年龄、城市，并且按照年龄小到大排序")]),t._v("。对应的 SQL 语句就可以这么写：")]),t._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[t._v("`select name,age,city from staff where city = '深圳' order by age limit 10;` \n\n*   1\n\n\n")])])]),r("p",[t._v("这条语句的逻辑很清楚，但是它的"),r("strong",[t._v("底层执行流程")]),t._v("是怎样的呢？")]),t._v(" "),r("h2",{attrs:{id:"order-by-工作原理"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#order-by-工作原理"}},[t._v("#")]),t._v(" "),r("strong",[t._v("order by 工作原理")])]),t._v(" "),r("p",[r("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/85e5aeffc8cebc667776cfe1c940445b.png",alt:"图片"}})]),t._v(" "),r("h3",{attrs:{id:"explain-执行计划"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#explain-执行计划"}},[t._v("#")]),t._v(" explain 执行计划")]),t._v(" "),r("p",[t._v("我们先用"),r("strong",[t._v("Explain")]),t._v("关键字查看一下执行计划")]),t._v(" "),r("p",[r("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/bd9d11f22728210ebe853b32904a582b.png",alt:"图片"}})]),t._v(" "),r("ul",[r("li",[t._v("执行计划的"),r("strong",[t._v("key")]),t._v("这个字段，表示使用到索引idx_city")]),t._v(" "),r("li",[t._v("Extra 这个字段的 "),r("strong",[t._v("Using index condition")]),t._v(" 表示索引条件")]),t._v(" "),r("li",[t._v("Extra 这个字段的 "),r("strong",[t._v("Using filesort")]),t._v("表示用到排序")])]),t._v(" "),r("p",[t._v("我们可以发现，这条SQL使用到了索引，并且也用到排序。那么它是"),r("strong",[t._v("怎么排序")]),t._v("的呢？")]),t._v(" "),r("h3",{attrs:{id:"全字段排序"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#全字段排序"}},[t._v("#")]),t._v(" 全字段排序")]),t._v(" "),r("p",[t._v("MySQL 会给每个查询线程分配一块小"),r("strong",[t._v("内存")]),t._v("，用于"),r("strong",[t._v("排序")]),t._v("的，称为 "),r("strong",[t._v("sort_buffer")]),t._v("。什么时候把字段放进去排序呢，其实是通过"),r("code",[t._v("idx_city")]),t._v("索引找到对应的数据，才把数据放进去啦。")]),t._v(" "),r("p",[t._v("我们回顾下索引是怎么找到匹配的数据的，现在先把索引树画出来吧，"),r("strong",[t._v("idx_city")]),t._v("索引树如下：")]),t._v(" "),r("p",[r("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/26aa54a9147f0908621ccd26e28e127c.png",alt:"图片"}})]),t._v(" "),r("p",[t._v("idx_city索引树，叶子节点存储的是"),r("strong",[t._v("主键id")]),t._v("。还有一棵id"),r("a",{attrs:{href:"https://so.csdn.net/so/search?q=%E4%B8%BB%E9%94%AE&spm=1001.2101.3001.7020",target:"_blank",rel:"noopener noreferrer"}},[t._v("主键"),r("OutboundLink")],1),t._v("聚族索引树，我们再画出聚族索引树图吧：")]),t._v(" "),r("p",[r("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/8a52fe14c324bb16ce1ce4bf5e22018a.png",alt:"图片"}})]),t._v(" "),r("p",[r("strong",[t._v("我们的查询语句是怎么找到匹配数据的呢")]),t._v("？先通过"),r("strong",[t._v("idx_city")]),t._v("索引树，找到对应的主键id，然后再通过拿到的主键id，搜索"),r("strong",[t._v("id主键索引树")]),t._v("，找到对应的行数据。")]),t._v(" "),r("p",[t._v("加上"),r("strong",[t._v("order by")]),t._v("之后，整体的执行流程就是：")]),t._v(" "),r("ol",[r("li",[t._v("MySQL 为对应的线程初始化"),r("strong",[t._v("sort_buffer")]),t._v("，放入需要查询的name、age、city字段；")]),t._v(" "),r("li",[t._v("从"),r("strong",[t._v("索引树idx_city")]),t._v("， 找到第一个满足 city='深圳’条件的主键 id，也就是图中的id=9；")]),t._v(" "),r("li",[t._v("到"),r("strong",[t._v("主键 id 索引树")]),t._v("拿到id=9的这一行数据， 取name、age、city三个字段的值，存到sort_buffer；")]),t._v(" "),r("li",[t._v("从"),r("strong",[t._v("索引树idx_city")]),t._v(" 拿到下一个记录的主键 id，即图中的id=13；")]),t._v(" "),r("li",[t._v("重复步骤 3、4 直到"),r("strong",[t._v("city的值不等于深圳")]),t._v("为止；")]),t._v(" "),r("li",[t._v("前面5步已经查找到了所有"),r("strong",[t._v("city为深圳")]),t._v("的数据，在 sort_buffer中，将所有数据根据age进行排序；")]),t._v(" "),r("li",[t._v("按照排序结果取前10行返回给客户端。")])]),t._v(" "),r("p",[t._v("执行示意图如下：")]),t._v(" "),r("p",[r("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/1548d2ef0625f9260c199328216cebaa.png",alt:"图片"}})]),t._v(" "),r("p",[t._v("将查询所需的字段全部读取到sort_buffer中，就是"),r("strong",[t._v("全字段排序")]),t._v("。这里面，有些小伙伴可能会有个疑问,把查询的所有字段都放到sort_buffer，而sort_buffer是一块内存来的，如果数据量太大，sort_buffer放不下怎么办呢？")]),t._v(" "),r("h3",{attrs:{id:"磁盘临时文件辅助排序"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#磁盘临时文件辅助排序"}},[t._v("#")]),t._v(" 磁盘临时文件辅助排序")]),t._v(" "),r("p",[t._v("实际上，sort_buffer的大小是由一个参数控制的："),r("strong",[t._v("sort_buffer_size")]),t._v("。如果要排序的数据小于sort_buffer_size，排序在"),r("strong",[t._v("sort_buffer")]),t._v(" 内存中完成，如果要排序的数据大于sort_buffer_size，则"),r("strong",[t._v("借助磁盘文件来进行排序")])]),t._v(" "),r("p",[t._v("如何确定是否使用了磁盘文件来进行排序呢？可以使用以下这几个命令")]),t._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[t._v("`## 打开optimizer_trace，开启统计\nset optimizer_trace = \"enabled=on\";\n## 执行SQL语句\nselect name,age,city from staff where city = '深圳' order by age limit 10;\n## 查询输出的统计信息\nselect * from information_schema.optimizer_trace` \n\n*   1\n*   2\n*   3\n*   4\n*   5\n*   6\n\n\n")])])]),r("p",[t._v("可以从 "),r("strong",[t._v("number_of_tmp_files")]),t._v(" 中看出，是否使用了临时文件。")]),t._v(" "),r("p",[r("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/90e6852d4422033bc453dc65b7c44134.png",alt:"图片"}})]),t._v(" "),r("p",[r("strong",[t._v("number_of_tmp_files")]),t._v(" 表示使用来排序的磁盘临时文件数。如果number_of_tmp_files>0，则表示使用了磁盘文件来进行排序。")]),t._v(" "),r("p",[t._v("使用了磁盘临时文件，整个排序过程又是怎样的呢？")]),t._v(" "),r("ol",[r("li",[t._v("从"),r("strong",[t._v("主键Id索引树")]),t._v("，拿到需要的数据，并放到"),r("strong",[t._v("sort_buffer内存")]),t._v("块中。当sort_buffer快要满时，就对sort_buffer中的数据排序，排完后，把数据临时放到磁盘一个小文件中。")]),t._v(" "),r("li",[t._v("继续回到主键 id 索引树取数据，继续放到sort_buffer内存中，排序后，也把这些数据写入到磁盘临时小文件中。")]),t._v(" "),r("li",[t._v("继续循环，直到取出所有满足条件的数据。最后把磁盘的临时排好序的小文件，合并成一个有序的大文件。")])]),t._v(" "),r("p",[r("strong",[t._v("TPS:")]),t._v(" 借助磁盘临时小文件排序，实际上使用的是"),r("strong",[t._v("归并排序")]),t._v("算法。")]),t._v(" "),r("p",[t._v("小伙伴们可能会有个疑问，既然"),r("strong",[t._v("sort_buffer")]),t._v("放不下，就需要用到临时磁盘文件，这会影响排序效率。那为什么还要把排序不相关的字段（name，city）放到sort_buffer中呢？只放排序相关的age字段，它"),r("strong",[t._v("不香")]),t._v("吗？可以了解下"),r("strong",[t._v("rowid 排序")]),t._v("。")]),t._v(" "),r("h3",{attrs:{id:"rowid-排序"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#rowid-排序"}},[t._v("#")]),t._v(" rowid 排序")]),t._v(" "),r("p",[t._v("rowid 排序就是，只把查询SQL"),r("strong",[t._v("需要用于排序的字段和主键id")]),t._v("，放到sort_buffer中。那怎么确定走的是全字段排序还是rowid 排序排序呢？")]),t._v(" "),r("p",[t._v("实际上有个参数控制的。这个参数就是"),r("strong",[t._v("max_length_for_sort_data")]),t._v("，它表示MySQL用于排序行数据的长度的一个参数，如果单行的长度超过这个值，MySQL 就认为单行太大，就换rowid 排序。我们可以通过命令看下这个参数取值。")]),t._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[t._v("`show variables like 'max_length_for_sort_data';` \n\n*   1\n\n\n")])])]),r("p",[r("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/9386b229a20172fe40912607a4543766.png",alt:"图片"}})]),t._v(" "),r("p",[r("strong",[t._v("max_length_for_sort_data")]),t._v(" 默认值是1024。因为本文示例中name,age,city长度=64+4+64 =132 < 1024, 所以走的是全字段排序。我们来改下这个参数，改小一点，")]),t._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[t._v("`## 修改排序数据最大单行长度为32\nset max_length_for_sort_data = 32;\n## 执行查询SQL\nselect name,age,city from staff where city = '深圳' order by age limit 10;` \n\n*   1\n*   2\n*   3\n*   4\n\n\n")])])]),r("p",[t._v("使用rowid 排序的话，整个SQL执行流程又是怎样的呢？")]),t._v(" "),r("ol",[r("li",[t._v("MySQL 为对应的线程初始化"),r("strong",[t._v("sort_buffer")]),t._v("，放入需要排序的age字段，以及主键id；")]),t._v(" "),r("li",[t._v("从"),r("strong",[t._v("索引树idx_city")]),t._v("， 找到第一个满足 city='深圳’条件的主键 id，也就是图中的id=9；")]),t._v(" "),r("li",[t._v("到"),r("strong",[t._v("主键 id 索引树")]),t._v("拿到id=9的这一行数据， 取age和主键id的值，存到sort_buffer；")]),t._v(" "),r("li",[t._v("从"),r("strong",[t._v("索引树idx_city")]),t._v(" 拿到下一个记录的主键 id，即图中的id=13；")]),t._v(" "),r("li",[t._v("重复步骤 3、4 直到"),r("strong",[t._v("city的值不等于深圳")]),t._v("为止；")]),t._v(" "),r("li",[t._v("前面5步已经查找到了所有city为深圳的数据，在 "),r("strong",[t._v("sort_buffer")]),t._v("中，将所有数据根据age进行排序；")]),t._v(" "),r("li",[t._v("遍历排序结果，取前10行，并按照 id 的值"),r("strong",[t._v("回到原表")]),t._v("中，取出city、name 和 age 三个字段返回给客户端。")])]),t._v(" "),r("p",[t._v("执行示意图如下：")]),t._v(" "),r("p",[r("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/4e23399e2d89eedd104466c08e421cba.png",alt:"图片"}})]),t._v(" "),r("p",[t._v("对比一下"),r("strong",[t._v("全字段排序")]),t._v("的流程，rowid 排序多了一次"),r("strong",[t._v("回表")]),t._v("。")]),t._v(" "),r("blockquote",[r("p",[t._v("★")]),t._v(" "),r("p",[t._v("什么是回表？拿到主键再回到主键索引查询的过程，就叫做回表")]),t._v(" "),r("p",[t._v("”")])]),t._v(" "),r("p",[t._v("我们通过"),r("strong",[t._v("optimizer_trace")]),t._v("，可以看到是否使用了rowid排序的：")]),t._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[t._v("`## 打开optimizer_trace，开启统计\nset optimizer_trace = \"enabled=on\";\n## 执行SQL语句\nselect name,age,city from staff where city = '深圳' order by age limit 10;\n## 查询输出的统计信息\nselect * from information_schema.optimizer_trace` \n\n*   1\n*   2\n*   3\n*   4\n*   5\n*   6\n\n\n")])])]),r("p",[r("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/2e815979492bca0d4a5282c7c22e5b1e.png",alt:"图片"}})]),t._v(" "),r("h3",{attrs:{id:"全字段排序与rowid排序对比"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#全字段排序与rowid排序对比"}},[t._v("#")]),t._v(" 全字段排序与rowid排序对比")]),t._v(" "),r("ul",[r("li",[t._v("全字段排序：sort_buffer内存不够的话，就需要用到磁盘临时文件，造成"),r("strong",[t._v("磁盘访问")]),t._v("。")]),t._v(" "),r("li",[t._v("rowid排序：sort_buffer可以放更多数据，但是需要再回到原表去取数据，比全字段排序多一次"),r("strong",[t._v("回表")]),t._v("。")])]),t._v(" "),r("p",[t._v("一般情况下，对于InnoDB存储引擎，会优先使"),r("strong",[t._v("用全字段")]),t._v("排序。可以发现 "),r("strong",[t._v("max_length_for_sort_data")]),t._v(" 参数设置为1024，这个数比较大的。一般情况下，排序字段不会超过这个值，也就是都会走"),r("strong",[t._v("全字段")]),t._v("排序。")]),t._v(" "),r("h2",{attrs:{id:"order-by的一些优化思路"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#order-by的一些优化思路"}},[t._v("#")]),t._v(" "),r("strong",[t._v("order by的一些优化思路")])]),t._v(" "),r("p",[t._v("我们如何优化order by语句呢？")]),t._v(" "),r("ul",[r("li",[t._v("因为数据是无序的，所以就需要排序。如果数据本身是有序的，那就不用排了。而索引数据本身是有序的，我们通过建立"),r("strong",[t._v("联合索引")]),t._v("，优化order by 语句。")]),t._v(" "),r("li",[t._v("我们还可以通过调整"),r("strong",[t._v("max_length_for_sort_data")]),t._v("等参数优化；")])]),t._v(" "),r("h3",{attrs:{id:"联合索引优化"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#联合索引优化"}},[t._v("#")]),t._v(" 联合索引优化")]),t._v(" "),r("p",[t._v("再回顾下示例SQL的查询计划")]),t._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[t._v("`explain select name,age,city from staff where city = '深圳' order by age limit 10;` \n\n*   1\n\n\n")])])]),r("p",[r("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/9159ecb9caedb7dca2acf58116bc3a89.png",alt:"图片"}})]),t._v(" "),r("p",[t._v("我们给查询条件"),r("code",[t._v("city")]),t._v("和排序字段"),r("code",[t._v("age")]),t._v("，加个联合索引"),r("strong",[t._v("idx_city_age")]),t._v("。再去查看执行计划")]),t._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[t._v("`alter table staff add  index idx_city_age(city,age);explain select name,age,city from staff where city = '深圳' order by age limit 10;` \n\n*   1\n\n\n")])])]),r("p",[r("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/5a8c759572a7296ed88b6ef011c1e46a.png",alt:"图片"}})]),t._v(" "),r("p",[t._v("可以发现，加上"),r("strong",[t._v("idx_city_age")]),t._v("联合索引，就不需要"),r("strong",[t._v("Using filesort")]),t._v("排序了。为什么呢？因为"),r("strong",[t._v("索引本身是有序的")]),t._v("，我们可以看下"),r("strong",[t._v("idx_city_age")]),t._v("联合索引示意图，如下：")]),t._v(" "),r("p",[r("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/5c33dcb34e4e07c6a6cf261a70d4f018.png",alt:"图片"}})]),t._v(" "),r("p",[t._v("整个SQL执行流程变成酱紫：")]),t._v(" "),r("ol",[r("li",[t._v("从索引idx_city_age找到满足"),r("strong",[t._v("city='深圳’")]),t._v(" 的主键 id")]),t._v(" "),r("li",[t._v("到"),r("strong",[t._v("主键 id索引")]),t._v("取出整行，拿到 name、city、age 三个字段的值，作为结果集的一部分直接返回")]),t._v(" "),r("li",[t._v("从索引"),r("strong",[t._v("idx_city_age")]),t._v("取下一个记录主键id")]),t._v(" "),r("li",[t._v("重复步骤 2、3，直到查到"),r("strong",[t._v("第10条")]),t._v("记录，或者是"),r("strong",[t._v("不满足city='深圳’")]),t._v(" 条件时循环结束。")])]),t._v(" "),r("p",[t._v("流程示意图如下：")]),t._v(" "),r("p",[r("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/408406b91eafab98eacec93383e8b36e.png",alt:"图片"}})]),t._v(" "),r("p",[t._v("从示意图看来，还是有一次"),r("strong",[t._v("回表")]),t._v("操作。针对本次示例，有没有更高效的方案呢？有的，可以使用"),r("strong",[t._v("覆盖索引")]),t._v("：")]),t._v(" "),r("blockquote",[r("p",[t._v("★")]),t._v(" "),r("p",[t._v("覆盖索引：在查询的数据列里面，不需要回表去查，直接从索引列就能取到想要的结果。换句话说，你SQL用到的索引列数据，覆盖了查询结果的列，就算上覆盖索引了。")]),t._v(" "),r("p",[t._v("”")])]),t._v(" "),r("p",[t._v("我们给city，name，age 组成一个联合索引，即可用到了覆盖索引，这时候SQL执行时，连回表操作都可以省去啦。")]),t._v(" "),r("h3",{attrs:{id:"调整参数优化"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#调整参数优化"}},[t._v("#")]),t._v(" 调整参数优化")]),t._v(" "),r("p",[t._v("我们还可以通过调整参数，去优化order by的执行。比如可以调整sort_buffer_size的值。因为sort_buffer值太小，数据量大的话，会借助磁盘临时文件排序。如果MySQL服务器配置高的话，可以使用稍微调整大点。")]),t._v(" "),r("p",[t._v("我们还可以调整max_length_for_sort_data的值，这个值太小的话，order by会走rowid排序，会回表，降低查询性能。所以max_length_for_sort_data可以适当大一点。")]),t._v(" "),r("p",[t._v("当然，很多时候，这些MySQL参数值，我们直接采用默认值就可以了。")]),t._v(" "),r("h2",{attrs:{id:"使用order-by-的一些注意点"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#使用order-by-的一些注意点"}},[t._v("#")]),t._v(" "),r("strong",[t._v("使用order by 的一些注意点")])]),t._v(" "),r("h3",{attrs:{id:"没有where条件，order-by字段需要加索引吗"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#没有where条件，order-by字段需要加索引吗"}},[t._v("#")]),t._v(" 没有where条件，order by字段需要加索引吗")]),t._v(" "),r("p",[t._v("日常开发过程中，我们可能会遇到没有where条件的order by，那么，这时候order by后面的字段是否需要加索引呢。如有这么一个SQL，create_time是否需要加索引：")]),t._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[t._v("`select * from A order by create_time;` \n\n*   1\n\n\n")])])]),r("p",[t._v("无条件查询的话，即使create_time上有索引,也不会使用到。因为MySQL优化器认为走普通二级索引，再去回表成本比全表扫描排序更高。所以选择走全表扫描,然后根据全字段排序或者rowid排序来进行。")]),t._v(" "),r("p",[t._v("如果查询SQL修改一下：")]),t._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[t._v("`select * from A order by create_time limit m;` \n\n*   1\n\n\n")])])]),r("ul",[r("li",[t._v("无条件查询,如果m值较小,是可以走索引的.因为MySQL优化器认为，根据索引有序性去回表查数据,然后得到m条数据,就可以终止循环,那么成本比全表扫描小,则选择走二级索引。")])]),t._v(" "),r("h3",{attrs:{id:"分页limit过大时，会导致大量排序怎么办"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#分页limit过大时，会导致大量排序怎么办"}},[t._v("#")]),t._v(" 分页limit过大时，会导致大量排序怎么办?")]),t._v(" "),r("p",[t._v("假设SQL如下：")]),t._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[t._v("`select * from A order by a limit 100000,10` \n\n*   1\n\n\n")])])]),r("ul",[r("li",[t._v("可以记录上一页最后的id，下一页查询时，查询条件带上id，如：where id > 上一页最后id limit 10。")]),t._v(" "),r("li",[t._v("也可以在业务允许的情况下，限制页数。")])]),t._v(" "),r("h3",{attrs:{id:"索引存储顺序与order-by不一致，如何优化？"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#索引存储顺序与order-by不一致，如何优化？"}},[t._v("#")]),t._v(" 索引存储顺序与order by不一致，如何优化？")]),t._v(" "),r("p",[t._v("假设有联合索引 idx_age_name, 我们需求修改为这样："),r("strong",[t._v("查询前10个员工的姓名、年龄，并且按照年龄小到大排序，如果年龄相同，则按姓名降序排")]),t._v("。对应的 SQL 语句就可以这么写：")]),t._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[t._v("`select name,age from staff  order by age ,name desc limit 10;` \n\n*   1\n\n\n")])])]),r("p",[t._v("我们看下执行计划，发现使用到"),r("strong",[t._v("Using filesort")]),t._v("。")]),t._v(" "),r("p",[r("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/04b9d1679594d2a6abba06b285587c71.png",alt:"图片"}})]),t._v(" "),r("p",[t._v("这是因为，idx_age_name索引树中，age从小到大排序，如果"),r("strong",[t._v("age相同，再按name从小到大排序")]),t._v("。而order by 中，是按age从小到大排序，如果"),r("strong",[t._v("age相同，再按name从大到小排序")]),t._v("。也就是说，索引存储顺序与order by不一致。")]),t._v(" "),r("p",[t._v("我们怎么优化呢？如果MySQL是8.0版本，支持"),r("strong",[t._v("Descending Indexes")]),t._v("，可以这样修改索引：")]),t._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[t._v("``CREATE TABLE `staff` (\n  `id` bigint(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',\n  `id_card` varchar(20) NOT NULL COMMENT '身份证号码',\n  `name` varchar(64) NOT NULL COMMENT '姓名',\n  `age` int(4) NOT NULL COMMENT '年龄',\n  `city` varchar(64) NOT NULL COMMENT '城市',\n  PRIMARY KEY (`id`),\n  KEY `idx_age_name` (`age`,`name` desc) USING BTREE\n) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COMMENT='员工表';`` \n\n*   1\n*   2\n*   3\n*   4\n*   5\n*   6\n*   7\n*   8\n*   9\n\n\n")])])]),r("h3",{attrs:{id:"使用了in条件多个属性时，sql执行是否有排序过程"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#使用了in条件多个属性时，sql执行是否有排序过程"}},[t._v("#")]),t._v(" 使用了in条件多个属性时，SQL执行是否有排序过程")]),t._v(" "),r("p",[t._v("如果我们有"),r("strong",[t._v("联合索引idx_city_name")]),t._v("，执行这个SQL的话，是不会走排序过程的，如下：")]),t._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[t._v("`select * from staff where city in ('深圳') order by age limit 10;` \n\n*   1\n\n\n")])])]),r("p",[r("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/3a00771f3262feb0452eb992e356aff5.png",alt:"图片"}})]),t._v(" "),r("p",[t._v("但是，如果使用in条件，并且有多个条件时，就会有排序过程。")]),t._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[t._v(" `explain select * from staff where city in ('深圳','上海') order by age limit 10;` \n\n*   1\n\n\n")])])]),r("p",[r("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/4e11a406405ac383078f8b3aacab7e6a.png",alt:"图片"}})]),t._v(" "),r("p",[t._v("这是因为:in有两个条件，在满足深圳时，age是排好序的，但是把满足上海的age也加进来，就不能保证满足所有的age都是排好序的。因此需要Using filesort。")])])}),[],!1,null,null,null);_.default=a.exports}}]);