(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{531:function(t,e,v){"use strict";v.r(e);var _=v(11),c=Object(_.a)({},(function(){var t=this,e=t.$createElement,v=t._self._c||e;return v("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[v("h2",{attrs:{id:"表达式全集"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#表达式全集"}},[t._v("#")]),t._v(" 表达式全集")]),t._v(" "),v("table",[v("thead",[v("tr",[v("th",{staticStyle:{"text-align":"center"}},[t._v("字符")]),t._v(" "),v("th",{staticStyle:{"text-align":"left"}},[t._v("描述")])])]),t._v(" "),v("tbody",[v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("\\")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("将下一个字符标记为一个特殊字符、或一个原义字符、或一个向后引用、或一个八进制转义符。例如，“"),v("code",[t._v("n")]),t._v("”匹配字符“"),v("code",[t._v("n")]),t._v("”。“"),v("code",[t._v("\\n")]),t._v("”匹配一个换行符。串行“"),v("code",[t._v("\\\\")]),t._v("”匹配“"),v("code",[t._v("\\")]),t._v("”而“"),v("code",[t._v("\\(")]),t._v("”则匹配“"),v("code",[t._v("(")]),t._v("”。")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("^")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("匹配输入字符串的开始位置。如果设置了RegExp对象的Multiline属性，^也匹配“"),v("code",[t._v("\\n")]),t._v("”或“"),v("code",[t._v("\\r")]),t._v("”之后的位置。")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("$")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("匹配输入字符串的结束位置。如果设置了RegExp对象的Multiline属性，$也匹配“"),v("code",[t._v("\\n")]),t._v("”或“"),v("code",[t._v("\\r")]),t._v("”之前的位置。")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("*")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("匹配前面的子表达式零次或多次。例如，zo*能匹配“"),v("code",[t._v("z")]),t._v("”以及“"),v("code",[t._v("zoo")]),t._v("”。*等价于{0,}。")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("+")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("匹配前面的子表达式一次或多次。例如，“"),v("code",[t._v("zo+")]),t._v("”能匹配“"),v("code",[t._v("zo")]),t._v("”以及“"),v("code",[t._v("zoo")]),t._v("”，但不能匹配“"),v("code",[t._v("z")]),t._v("”。+等价于{1,}。")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("?")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("匹配前面的子表达式零次或一次。例如，“"),v("code",[t._v("do(es)?")]),t._v("”可以匹配“"),v("code",[t._v("does")]),t._v("”或“"),v("code",[t._v("does")]),t._v("”中的“"),v("code",[t._v("do")]),t._v("”。?等价于{0,1}。")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("{"),v("em",[t._v("n")]),t._v("}")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[v("em",[t._v("n")]),t._v("是一个非负整数。匹配确定的"),v("em",[t._v("n")]),t._v("次。例如，“"),v("code",[t._v("o{2}")]),t._v("”不能匹配“"),v("code",[t._v("Bob")]),t._v("”中的“"),v("code",[t._v("o")]),t._v("”，但是能匹配“"),v("code",[t._v("food")]),t._v("”中的两个o。")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("{"),v("em",[t._v("n")]),t._v(",}")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[v("em",[t._v("n")]),t._v("是一个非负整数。至少匹配"),v("em",[t._v("n")]),t._v("次。例如，“"),v("code",[t._v("o{2,}")]),t._v("”不能匹配“"),v("code",[t._v("Bob")]),t._v("”中的“"),v("code",[t._v("o")]),t._v("”，但能匹配“"),v("code",[t._v("foooood")]),t._v("”中的所有o。“"),v("code",[t._v("o{1,}")]),t._v("”等价于“"),v("code",[t._v("o+")]),t._v("”。“"),v("code",[t._v("o{0,}")]),t._v("”则等价于“"),v("code",[t._v("o*")]),t._v("”。")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("{"),v("em",[t._v("n")]),t._v(","),v("em",[t._v("m")]),t._v("}")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[v("em",[t._v("m")]),t._v("和"),v("em",[t._v("n")]),t._v("均为非负整数，其中"),v("em",[t._v("n")]),t._v("<="),v("em",[t._v("m")]),t._v("。最少匹配"),v("em",[t._v("n")]),t._v("次且最多匹配"),v("em",[t._v("m")]),t._v("次。例如，“"),v("code",[t._v("o{1,3}")]),t._v("”将匹配“"),v("code",[t._v("fooooood")]),t._v("”中的前三个o。“"),v("code",[t._v("o{0,1}")]),t._v("”等价于“"),v("code",[t._v("o?")]),t._v("”。请注意在逗号和两个数之间不能有空格。")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("?")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("当该字符紧跟在任何一个其他限制符（*,+,?，{"),v("em",[t._v("n")]),t._v("}，{"),v("em",[t._v("n")]),t._v(",}，{"),v("em",[t._v("n")]),t._v(","),v("em",[t._v("m")]),t._v("}）后面时，匹配模式是非贪婪的。非贪婪模式尽可能少的匹配所搜索的字符串，而默认的贪婪模式则尽可能多的匹配所搜索的字符串。例如，对于字符串“"),v("code",[t._v("oooo")]),t._v("”，“"),v("code",[t._v("o+?")]),t._v("”将匹配单个“"),v("code",[t._v("o")]),t._v("”，而“"),v("code",[t._v("o+")]),t._v("”将匹配所有“"),v("code",[t._v("o")]),t._v("”。")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v(".")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("匹配除“"),v("code",[t._v("\\")]),v("em",[v("code",[t._v("n")])]),t._v("”之外的任何单个字符。要匹配包括“"),v("code",[t._v("\\")]),v("em",[v("code",[t._v("n")])]),t._v("”在内的任何字符，请使用像“"),v("code",[t._v("(.|\\n)")]),t._v("”的模式。")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("(pattern)")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("匹配pattern并获取这一匹配。所获取的匹配可以从产生的Matches集合得到，在VBScript中使用SubMatches集合，在JScript中则使用$0…$9属性。要匹配圆括号字符，请使用“"),v("code",[t._v("\\(")]),t._v("”或“"),v("code",[t._v("\\)")]),t._v("”。")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("(?:pattern)")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("匹配pattern但不获取匹配结果，也就是说这是一个非获取匹配，不进行存储供以后使用。这在使用或字符“"),v("code",[t._v("(|)")]),t._v("”来组合一个模式的各个部分是很有用。例如“"),v("code",[t._v("industr(?:y|ies)")]),t._v("”就是一个比“"),v("code",[t._v("industry|industries")]),t._v("”更简略的表达式。")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("(?=pattern)")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("正向肯定预查，在任何匹配pattern的字符串开始处匹配查找字符串。这是一个非获取匹配，也就是说，该匹配不需要获取供以后使用。例如，“"),v("code",[t._v("Windows(?=95|98|NT|2000)")]),t._v("”能匹配“"),v("code",[t._v("Windows2000")]),t._v("”中的“"),v("code",[t._v("Windows")]),t._v("”，但不能匹配“"),v("code",[t._v("Windows3.1")]),t._v("”中的“"),v("code",[t._v("Windows")]),t._v("”。预查不消耗字符，也就是说，在一个匹配发生后，在最后一次匹配之后立即开始下一次匹配的搜索，而不是从包含预查的字符之后开始。")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("(?!pattern)")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("正向否定预查，在任何不匹配pattern的字符串开始处匹配查找字符串。这是一个非获取匹配，也就是说，该匹配不需要获取供以后使用。例如“"),v("code",[t._v("Windows(?!95|98|NT|2000)")]),t._v("”能匹配“"),v("code",[t._v("Windows3.1")]),t._v("”中的“"),v("code",[t._v("Windows")]),t._v("”，但不能匹配“"),v("code",[t._v("Windows2000")]),t._v("”中的“"),v("code",[t._v("Windows")]),t._v("”。预查不消耗字符，也就是说，在一个匹配发生后，在最后一次匹配之后立即开始下一次匹配的搜索，而不是从包含预查的字符之后开始")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("(?<=pattern)")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("反向肯定预查，与正向肯定预查类拟，只是方向相反。例如，“"),v("code",[t._v("(?<=95|98|NT|2000)Windows")]),t._v("”能匹配“"),v("code",[t._v("2000Windows")]),t._v("”中的“"),v("code",[t._v("Windows")]),t._v("”，但不能匹配“"),v("code",[t._v("3.1Windows")]),t._v("”中的“"),v("code",[t._v("Windows")]),t._v("”。")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("(?<!pattern)")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("反向否定预查，与正向否定预查类拟，只是方向相反。例如“"),v("code",[t._v("(?<!95|98|NT|2000)Windows")]),t._v("”能匹配“"),v("code",[t._v("3.1Windows")]),t._v("”中的“"),v("code",[t._v("Windows")]),t._v("”，但不能匹配“"),v("code",[t._v("2000Windows")]),t._v("”中的“"),v("code",[t._v("Windows")]),t._v("”。")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("x|y")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("匹配x或y。例如，“"),v("code",[t._v("z|food")]),t._v("”能匹配“"),v("code",[t._v("z")]),t._v("”或“"),v("code",[t._v("food")]),t._v("”。“"),v("code",[t._v("(z|f)ood")]),t._v("”则匹配“"),v("code",[t._v("zood")]),t._v("”或“"),v("code",[t._v("food")]),t._v("”。")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("[xyz]")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("字符集合。匹配所包含的任意一个字符。例如，“"),v("code",[t._v("[abc]")]),t._v("”可以匹配“"),v("code",[t._v("plain")]),t._v("”中的“"),v("code",[t._v("a")]),t._v("”。")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("[^xyz]")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("负值字符集合。匹配未包含的任意字符。例如，“"),v("code",[t._v("[^abc]")]),t._v("”可以匹配“"),v("code",[t._v("plain")]),t._v("”中的“"),v("code",[t._v("p")]),t._v("”。")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("[a-z]")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("字符范围。匹配指定范围内的任意字符。例如，“"),v("code",[t._v("[a-z]")]),t._v("”可以匹配“"),v("code",[t._v("a")]),t._v("”到“"),v("code",[t._v("z")]),t._v("”范围内的任意小写字母字符。")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("[^a-z]")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("负值字符范围。匹配任何不在指定范围内的任意字符。例如，“"),v("code",[t._v("[^a-z]")]),t._v("”可以匹配任何不在“"),v("code",[t._v("a")]),t._v("”到“"),v("code",[t._v("z")]),t._v("”范围内的任意字符。")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("\\b")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("匹配一个单词边界，也就是指单词和空格间的位置。例如，“"),v("code",[t._v("er\\b")]),t._v("”可以匹配“"),v("code",[t._v("never")]),t._v("”中的“"),v("code",[t._v("er")]),t._v("”，但不能匹配“"),v("code",[t._v("verb")]),t._v("”中的“"),v("code",[t._v("er")]),t._v("”。")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("\\B")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("匹配非单词边界。“"),v("code",[t._v("er\\B")]),t._v("”能匹配“"),v("code",[t._v("verb")]),t._v("”中的“"),v("code",[t._v("er")]),t._v("”，但不能匹配“"),v("code",[t._v("never")]),t._v("”中的“"),v("code",[t._v("er")]),t._v("”。")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("\\cx")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("匹配由x指明的控制字符。例如，\\cM匹配一个Control-M或回车符。x的值必须为A-Z或a-z之一。否则，将c视为一个原义的“"),v("code",[t._v("c")]),t._v("”字符。")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("\\d")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("匹配一个数字字符。等价于[0-9]。")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("\\D")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("匹配一个非数字字符。等价于[^0-9]。")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("\\f")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("匹配一个换页符。等价于\\x0c和\\cL。")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("\\n")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("匹配一个换行符。等价于\\x0a和\\cJ。")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("\\r")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("匹配一个回车符。等价于\\x0d和\\cM。")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("\\s")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("匹配任何空白字符，包括空格、制表符、换页符等等。等价于[ \\f\\n\\r\\t\\v]。")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("\\S")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("匹配任何非空白字符。等价于[^ \\f\\n\\r\\t\\v]。")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("\\t")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("匹配一个制表符。等价于\\x09和\\cI。")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("\\v")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("匹配一个垂直制表符。等价于\\x0b和\\cK。")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("\\w")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("匹配包括下划线的任何单词字符。等价于“"),v("code",[t._v("[A-Za-z0-9_]")]),t._v("”。")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("\\W")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("匹配任何非单词字符。等价于“"),v("code",[t._v("[^A-Za-z0-9_]")]),t._v("”。")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("\\x"),v("em",[t._v("n")])]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("匹配"),v("em",[t._v("n")]),t._v("，其中"),v("em",[t._v("n")]),t._v("为十六进制转义值。十六进制转义值必须为确定的两个数字长。例如，“"),v("code",[t._v("\\x41")]),t._v("”匹配“"),v("code",[t._v("A")]),t._v("”。“"),v("code",[t._v("\\x041")]),t._v("”则等价于“"),v("code",[t._v("\\x04&1")]),t._v("”。正则表达式中可以使用ASCII编码。.")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("*num*")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("匹配"),v("em",[t._v("num")]),t._v("，其中"),v("em",[t._v("num")]),t._v("是一个正整数。对所获取的匹配的引用。例如，“"),v("code",[t._v("(.)\\1")]),t._v("”匹配两个连续的相同字符。")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("*n*")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("标识一个八进制转义值或一个向后引用。如果*n"),v("em",[t._v("之前至少")]),t._v("n"),v("em",[t._v("个获取的子表达式，则")]),t._v("n"),v("em",[t._v("为向后引用。否则，如果")]),t._v("n"),v("em",[t._v("为八进制数字（0-7），则")]),t._v("n*为一个八进制转义值。")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("*nm*")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("标识一个八进制转义值或一个向后引用。如果*nm"),v("em",[t._v("之前至少有")]),t._v("nm"),v("em",[t._v("个获得子表达式，则")]),t._v("nm"),v("em",[t._v("为向后引用。如果*nm")]),t._v("之前至少有"),v("em",[t._v("n")]),t._v("个获取，则"),v("em",[t._v("n")]),t._v("为一个后跟文字"),v("em",[t._v("m")]),t._v("的向后引用。如果前面的条件都不满足，若"),v("em",[t._v("n")]),t._v("和"),v("em",[t._v("m")]),t._v("均为八进制数字（0-7），则*nm"),v("em",[t._v("将匹配八进制转义值")]),t._v("nm*。")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("*nml*")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("如果"),v("em",[t._v("n")]),t._v("为八进制数字（0-3），且"),v("em",[t._v("m和l")]),t._v("均为八进制数字（0-7），则匹配八进制转义值"),v("em",[t._v("nm")]),t._v("l。")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("\\u"),v("em",[t._v("n")])]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("匹配"),v("em",[t._v("n")]),t._v("，其中"),v("em",[t._v("n")]),t._v("是一个用四个十六进制数字表示的Unicode字符。例如，\\u00A9匹配版权符号（©）。")])])])]),t._v(" "),v("h2",{attrs:{id:"常用正则表达式"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#常用正则表达式"}},[t._v("#")]),t._v(" 常用正则表达式")]),t._v(" "),v("table",[v("thead",[v("tr",[v("th",{staticStyle:{"text-align":"center"}},[t._v("用户名")]),t._v(" "),v("th",[t._v("/^[a-z0-9_-]{3,16}$/")])])]),t._v(" "),v("tbody",[v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("密码")]),t._v(" "),v("td",[t._v("/^[a-z0-9_-]{6,18}$/")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("十六进制值")]),t._v(" "),v("td",[t._v("/^#?([a-f0-9]{6}|[a-f0-9]{3})$/")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("电子邮箱")]),t._v(" "),v("td",[t._v("/^([a-z0-9_.-]+)@([\\da-z.-]+).([a-z.]{2,6})$/ /^[a-z\\d]+(.[a-z\\d]+)*@("),v("a",{attrs:{href:"-%5B%5Cda-z%5D"}},[t._v("\\da-z")]),t._v("?)+(.{1,2}[a-z]+)+$/")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("URL")]),t._v(" "),v("td",[t._v("/^(https?😕/)?([\\da-z.-]+).([a-z.]{2,6})([/\\w .-]"),v("em",[t._v(")")]),t._v("/?$/")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("IP 地址")]),t._v(" "),v("td",[t._v("/((2[0-4]\\d|25[0-5]|[01]?\\d\\d?).){3}(2[0-4]\\d|25[0-5]|[01]?\\d\\d?)/ /^(?😦?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("HTML 标签")]),t._v(" "),v("td",[t._v("/^<([a-z]+)([^<]+)"),v("em",[t._v("(?:>(.")]),t._v(")</\\1>|\\s+/>)$/")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("删除代码\\注释")]),t._v(" "),v("td",[t._v("(?<!http:|\\S)//.*$")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("Unicode编码中的汉字范围")]),t._v(" "),v("td",[t._v("/^[\\u2E80-\\u9FFF]+$/")])])])])])}),[],!1,null,null,null);e.default=c.exports}}]);