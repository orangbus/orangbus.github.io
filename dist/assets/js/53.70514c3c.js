(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{548:function(t,s,a){"use strict";a.r(s);var n=a(11),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("p",[t._v("目录结构")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("➜  Study tree\n.\n├── conf\n├── docker-compose.yaml\n├── nginx\n│   ├── conf\n│   │   └── laravel.conf\n│   └── html\n│       └── index.php\n└── web\n    └── index.php\n")])])]),a("h2",{attrs:{id:"index-php"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#index-php"}},[t._v("#")]),t._v(" index.php")]),t._v(" "),a("div",{staticClass:"language-php extra-class"},[a("pre",{pre:!0,attrs:{class:"language-php"}},[a("code",[a("span",{pre:!0,attrs:{class:"token php language-php"}},[a("span",{pre:!0,attrs:{class:"token delimiter important"}},[t._v("<?php")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/**\n * Created by OrangBus\n * User email: orangbus40400@gmail.com\n * website: orangbus.cn\n * blog: doc.orangbus.cn\n * github: github.com/orangbus\n */")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("echo")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("phpinfo")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])]),a("h2",{attrs:{id:"nginx-conf"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#nginx-conf"}},[t._v("#")]),t._v(" nginx.conf")]),t._v(" "),a("div",{staticClass:"language-nginx extra-class"},[a("pre",{pre:!0,attrs:{class:"language-nginx"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("server")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("listen")]),t._v("       "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("80")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("server_name")]),t._v("  localhost"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("location")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("root")]),t._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("usr"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("share"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("nginx"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("html"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("index")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("index")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("html "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("index")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("htm "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("index")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("php"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("error_page")]),t._v("   "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("500")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("502")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("503")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("504")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("50")]),t._v("x"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("html"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("location")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("50")]),t._v("x"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("html "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("root")]),t._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("usr"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("share"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("nginx"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("html"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("location")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("~")]),t._v(" \\"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("php$ "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("fastcgi_pass")]),t._v("   php8"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("9000")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("fastcgi_index")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("index")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("php"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("fastcgi_param")]),t._v("  SCRIPT_FILENAME  "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("html"),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$fastcgi_script_name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("include")]),t._v("        fastcgi_params"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[a("strong",[t._v("重点说明")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("fastcgi_pass   php8:9000;\n")])])]),a("p",[a("strong",[t._v("php8:")]),t._v(" php容器的名称，如果你想配置多个php版本，只需要将php的配置复制一份就可以，填写对应的php容器名称")]),t._v(" "),a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[t._v("  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("php8")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# php的容器名称")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("image")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" php"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("8.0"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("fpm\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("restart")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" always\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("volumes")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" ./nginx/html"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("/html\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("---")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("---")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("---")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("---")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("---")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("---")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("---")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("---")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("---")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("---")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("php74")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 对应的nginx配置文件为：fastcgi_pass   php74:9000;")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("image")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" php"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("8.0"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("fpm\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("restart")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" always\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("volumes")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" ./nginx/html"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("/html\n")])])]),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("fastcgi_param  SCRIPT_FILENAME  /html$fastcgi_script_name;\n")])])]),a("p",[a("span",{staticStyle:{color:"red"}},[a("strong",[t._v("/html")]),t._v(" ：php项目映射到 【php 容器的目录】")])]),t._v(" "),a("h2",{attrs:{id:"docker-compose"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#docker-compose"}},[t._v("#")]),t._v(" docker-compose")]),t._v(" "),a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("version")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'3.5'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("services")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("nginx")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("image")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" nginx"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("latest\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("restart")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" always\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("ports")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" 8010"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("80")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("volumes")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" ./nginx/html/"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("/usr/share/nginx/html "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 注意点一")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" ./nginx/conf/"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("/etc/nginx/conf.d/\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("links")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" php8\n\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("php8")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("image")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" php"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("8.0"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("fpm\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("restart")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" always\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("volumes")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" ./nginx/html"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("/html "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#注意点二")]),t._v("\n")])])]),a("p",[t._v("注意点一：")]),t._v(" "),a("p",[a("strong",[t._v("./nginx/html")]),t._v(" ：本机你的php项目地址")]),t._v(" "),a("p",[a("strong",[t._v("/usr/share/nginx/html")]),t._v("： nginx默认的访问地址")]),t._v(" "),a("p",[t._v("注意点二：")]),t._v(" "),a("p",[a("strong",[t._v("./nginx/html")]),t._v(" ：本机你的php项目地址")]),t._v(" "),a("p",[a("span",{staticStyle:{color:"red"}},[a("strong",[t._v("/html")]),t._v("： 这里地址是将你本地的php代码映射到php的容器当中，一般是和你nginx配置的地址是一致的")])]),t._v(" "),a("p",[t._v("Tip:请留意两处红色的区域的关联，这样一个简单的nginx+php关联的环境就配置成功了。")]),t._v(" "),a("h2",{attrs:{id:"踩坑指南："}},[a("a",{staticClass:"header-anchor",attrs:{href:"#踩坑指南："}},[t._v("#")]),t._v(" 踩坑指南：")]),t._v(" "),a("p",[t._v("当使用"),a("code",[t._v("-link")]),t._v(" 时，连接容器的自定义端口将失效，举例")]),t._v(" "),a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("version")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'3.5'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("services")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("php8")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("image")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" php"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("8.0"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("fpm\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("restart")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" always\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("volumes")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" ./nginx/html"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("/html\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("links")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 如果使用 links ,当我们在php程序中填写mysql端口的时候应该是 3306 而不是 3307，但是我们外部是需要用3307端口去连接mysql的")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" mysql\n  \n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("mysql")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("image")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" mysql"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("latest\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("ports")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" 3307"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3306")]),t._v("\n     \n")])])])])}),[],!1,null,null,null);s.default=e.exports}}]);