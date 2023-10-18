(window.webpackJsonp=window.webpackJsonp||[]).push([[100],{609:function(s,a,t){"use strict";t.r(a);var n=t(11),e=Object(n.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"sed-操作行"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#sed-操作行"}},[s._v("#")]),s._v(" sed -操作行")]),s._v(" "),t("p",[s._v("常用选项：\n-n∶使用安静(silent)模式。在一般 sed 的用法中，所有来自 STDIN的资料一般都会被列出到萤幕上。但如果加上 -n 参数后，则只有经过sed 特殊处理的那一行(或者动作)才会被列出来。\n-e∶直接在指令列模式上进行 sed 的动作编辑；\n-f∶直接将 sed 的动作写在一个档案内， -f filename 则可以执行 filename 内的sed 动作；\n-r∶sed 的动作支援的是延伸型正规表示法的语法。(预设是基础正规表示法语法)\n-i∶直接修改读取的档案内容，而不是由萤幕输出。")]),s._v(" "),t("p",[s._v("常用命令：\na  ∶新增， a 的后面可以接字串，而这些字串会在新的一行出现(目前的下一行)～\nc  ∶取代， c 的后面可以接字串，这些字串可以取代 n1,n2 之间的行！\nd  ∶删除，因为是删除啊，所以 d 后面通常不接任何咚咚；\ni  ∶插入， i 的后面可以接字串，而这些字串会在新的一行出现(目前的上一行)；\np ∶列印，亦即将某个选择的资料印出。通常 p 会与参数 sed -n 一起运作～\ns ∶取代，可以直接进行取代的工作哩！通常这个 s 的动作可以搭配正规表示法！例如 1,20s/old/new/g 就是啦！")]),s._v(" "),t("p",[s._v("示例文本: "),t("code",[s._v("demo.txt")])]),s._v(" "),t("div",{staticClass:"language-text extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("百炼成神-第18集,https://orangbus.com/20230224/kJhbxXiV/index.m3u8\n百炼成神-第17集,https://orangbus.com/20230217/t8y1wVnh/index.m3u8\n百炼成神-第16集,https://orangbus.com/20230210/ADdcmiCm/index.m3u8\n百炼成神-第15集,https://orangbus.com/20230203/pCQ7efrE/index.m3u8\n百炼成神-第14集,https://orangbus.com/20230127/a3ujOsMa/index.m3u8\n百炼成神-第13集,https://orangbus.com/20230120/RZLigMF8/index.m3u8\n百炼成神-第12集,https://orangbus.com/20230113/4bQ6Wwij/index.m3u8\n百炼成神-第11集,https://orangbus.com/20230106/Q4kPm44B/index.m3u8\n百炼成神-第10集,https://orangbus.com/20221230/H577oW2z/index.m3u8\n百炼成神-第09集,https://orangbus.com/20221223/4CrKwhmh/index.m3u8\n百炼成神-第08集,https://orangbus.com/20221216/4tYgrN1H/index.m3u8\n百炼成神-第07集,https://orangbus.com/20221209/ZE4EtNMb/index.m3u8\n百炼成神-第06集,https://orangbus.com/20221202/HHAjdvU8/index.m3u8\n百炼成神-第05集,https://orangbus.com/20221125/KBrDJ8tr/index.m3u8\n百炼成神-第04集,https://orangbus.com/20221118/MRfT2NKf/index.m3u8\n百炼成神-第03集,https://orangbus.com/20221111/za4M7pbp/index.m3u8\n百炼成神-第02集,https://orangbus.com/20221104/2X0La90e/index.m3u8\n百炼成神-第01集,https://orangbus.com/20221104/nVUX3FQq/index.m3u8\n")])])]),t("h2",{attrs:{id:"显示某行"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#显示某行"}},[s._v("#")]),s._v(" 显示某行")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sed")]),s._v(" -n "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'1p'")]),s._v(" demo.txt  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#显示第一行 ")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sed")]),s._v(" -n "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'"),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$p")]),s._v("'")]),s._v(" demo.txt   "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#显示最后一行")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sed")]),s._v(" -n "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'1,2p'")]),s._v(" demo.txt  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#显示第一行到第二行")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sed")]),s._v(" -n "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'2,"),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$p")]),s._v("'")]),s._v(" demo.txt  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#显示第二行到最后一行")]),s._v("\n")])])]),t("h2",{attrs:{id:"查询"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#查询"}},[s._v("#")]),s._v(" 查询")]),s._v(" "),t("p",[s._v("查询包括关键字"),t("code",[s._v("第01集")]),s._v("所在所有行")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sed")]),s._v(" -n "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'/第01集/p'")]),s._v(" demo.txt\n")])])]),t("h2",{attrs:{id:"替换行"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#替换行"}},[s._v("#")]),s._v(" 替换行")]),s._v(" "),t("p",[s._v("替换第一行为 "),t("code",[s._v("百炼成神-第19+1集")])]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sed")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'1c 百炼成神-第19+1集'")]),s._v(" demo.txt\n")])])]),t("p",[s._v("第一行到第二行代替为: "),t("code",[s._v("百炼成神-第19+1集")]),s._v(" (第一行+第二行 合并为 一行)")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sed")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'1,2c 百炼成神-第19+1集'")]),s._v(" demo.txt\n")])])]),t("h2",{attrs:{id:"替换一行中的某一部分"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#替换一行中的某一部分"}},[s._v("#")]),s._v(" 替换一行中的某一部分")]),s._v(" "),t("p",[s._v("显示已经替换了，但是源文件并没有替换，需要加 "),t("code",[s._v("-i")]),s._v(" 参数会操作源文件替换")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sed")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'s/要替换的字符串/新的字符串/g'")]),s._v("   （要替换的字符串可以用正则表达式）\n")])])]),t("p",[s._v("将"),t("code",[s._v("百炼成神")]),s._v("替换为"),t("code",[s._v("斗罗大陆")])]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("cat")]),s._v(" demo.txt "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sed")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'s/百炼成神/斗罗大陆/g'")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sed")]),s._v(" -n "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'/百炼成神/p'")]),s._v(" demo.txt "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sed")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'s/百炼成神/斗罗大陆/g'")]),s._v("\n")])])]),t("h2",{attrs:{id:"替换匹配的字符串"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#替换匹配的字符串"}},[s._v("#")]),s._v(" 替换匹配的字符串")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sed")]),s._v(" -i "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'/匹配字符串/s/替换源字符串/替换目标字符串/g'")]),s._v(" filename\n")])])]),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sed")]),s._v(" -i "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'/百炼成神/s/百炼成神/斗罗大陆/g'")]),s._v(" demo.txt\n\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sed")]),s._v(" -i "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'s/斗罗大陆/百炼成神/g'")]),s._v(" demo.txt\n")])])]),t("h2",{attrs:{id:"插入"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#插入"}},[s._v("#")]),s._v(" 插入")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sed")]),s._v(" -i "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'1c orangbus'")]),s._v(" demo.txt "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 第一样插入 orangbus")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sed")]),s._v(" -i "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'"),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$a")]),s._v(" orangbus-end'")]),s._v(" demo.txt "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 最后一行插入orangbus-end")]),s._v("\n")])])]),t("h2",{attrs:{id:"删除某行"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#删除某行"}},[s._v("#")]),s._v(" 删除某行")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sed")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'1d'")]),s._v(" demo.txt\n")])])]),t("h1",{attrs:{id:"awk-操作列"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#awk-操作列"}},[s._v("#")]),s._v(" awk - 操作列")]),s._v(" "),t("p",[t("strong",[s._v("1.命令行方式")])]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("awk")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("-F  field-separator"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("  "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'commands'")]),s._v("  input-file"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("s"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])])]),t("p",[s._v("其中，commands 是真正awk命令，[-F域分隔符]是可选的。 input-file(s) 是待处理的文件。\n在awk中，文件的每一行中，由域分隔符分开的每一项称为一个域。通常，在不指名-F域分隔符的情况下，默认的域分隔符是空格。")]),s._v(" "),t("p",[t("strong",[s._v("2.shell脚本方式")])]),s._v(" "),t("p",[s._v("将所有的awk命令插入一个文件，并使awk程序可执行，然后awk命令解释器作为脚本的首行，一遍通过键入脚本名称来调用。\n相当于shell脚本首行的：#!/bin/sh\n可以换成：#!/bin/awk")]),s._v(" "),t("p",[t("strong",[s._v("3.将所有的awk命令插入一个单独文件，然后调用")])]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("awk")]),s._v(" -f awk-script-file input-file"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("s"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])])]),t("p",[s._v("其中，-f选项加载awk-script-file中的awk脚本，input-file(s)跟上面的是一样的。")]),s._v(" "),t("h2",{attrs:{id:"显示最近的呢牢固的5个账号"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#显示最近的呢牢固的5个账号"}},[s._v("#")]),s._v(" 显示最近的呢牢固的5个账号")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("last -n "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("5")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("awk")]),s._v("  "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'{print "),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$1")]),s._v("}'")]),s._v("\n")])])]),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("orangbus\norangbus\norangbus\norangbus\norangbus\n")])])]),t("h2",{attrs:{id:"ddns-自动启动"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#ddns-自动启动"}},[s._v("#")]),s._v(" ddns 自动启动")]),s._v(" "),t("p",[s._v("获取容器的id")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("docker container "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("ls")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("grep")]),s._v(" linkease/ddnsto "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("awk")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'{print "),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$1")]),s._v("}'")]),s._v("\n")])])]),t("p",[t("code",[s._v("ddns.sh")]),s._v(" 脚本")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token shebang important"}},[s._v("#!/bin/bash")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"1、获取容器id中"')]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("container")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token variable"}},[t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")]),s._v("docker container "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("ls")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("grep")]),s._v(" linkease/ddnsto "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("awk")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'{print "),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$1")]),s._v("}'")]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")])]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"containerid:"')]),s._v(" "),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$container")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"2、停止容器"')]),s._v("\ndocker container stop "),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$container")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"3、删除容器"')]),s._v("\ndocker container "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("rm")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$container")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"4、创建容器"')]),s._v("\ndocker run -d --name"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("ddnsto --restart always --network "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("host")]),s._v(" -e "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("TOKEN")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("ed59d1ee-0a93-451f-9ff5-81f51d72c6ec -e "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("DEVICE_IDX")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("   linkease/ddnsto:3.0.0\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'5、ddns 重新创建成功'")]),s._v("\n")])])]),t("h1",{attrs:{id:"find-寻找超过100m的文件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#find-寻找超过100m的文件"}},[s._v("#")]),s._v(" find - 寻找超过100M的文件")]),s._v(" "),t("p",[s._v("删除大于100M的文件删除")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("find")]),s._v(" ./ -type f -size +100M "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("xargs")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("rm")]),s._v(" -rf\n")])])]),t("p",[s._v("删除小于100M的文件删除")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("find")]),s._v(" ./ -type f -size -100M "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("xargs")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("rm")]),s._v(" -rf\n")])])]),t("p",[s._v("删除 "),t("code",[s._v(".mp3")]),s._v(" 结尾的文件")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("find")]),s._v(" ./ -name “*.mp3” "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("xargs")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("rm")]),s._v(" -rf   \n")])])]),t("p",[s._v("示例")]),s._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("# 查询 当前目录大于10M的文件，并打印出来\nfind . -type f -size +10M | xargs ls -ahl\n")])])]),t("h2",{attrs:{id:"搜索匹配某个目录下的文件，并且删除"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#搜索匹配某个目录下的文件，并且删除"}},[s._v("#")]),s._v(" 搜索匹配某个目录下的文件，并且删除")]),s._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v('find ./ -name "my*" -delete\n')])])]),t("h3",{attrs:{id:"过滤进程杀死"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#过滤进程杀死"}},[s._v("#")]),s._v(" 过滤进程杀死")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("ps")]),s._v(" aux "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("grep")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"php artisan queue:work"')]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("awk")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'{print "),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$2")]),s._v("}'")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("xargs")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("kill")]),s._v(" -9\n")])])]),t("h1",{attrs:{id:"文件查询"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#文件查询"}},[s._v("#")]),s._v(" 文件查询")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("grep")]),s._v(" -n "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"查询字符串"')]),s._v(" 文件名.txt\n")])])]),t("h1",{attrs:{id:"文件删除"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#文件删除"}},[s._v("#")]),s._v(" 文件删除")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sed")]),s._v(" -i "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'11,15d'")]),s._v(" 文件名.txt\n")])])]),t("p",[s._v("此命令将直接在example.txt中删除第5行到第10行的数据。请注意，在使用-i选项时，请确保在执行此命令之前备份原始文件。")])])}),[],!1,null,null,null);a.default=e.exports}}]);