(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{480:function(a,t,s){a.exports=s.p+"assets/img/image-20230312165458820.70320f64.png"},481:function(a,t,s){a.exports=s.p+"assets/img/image-20230312165238645.f624702f.png"},601:function(a,t,s){"use strict";s.r(t);var e=s(11),n=Object(e.a)({},(function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[e("h1",{attrs:{id:"umami-网站统计"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#umami-网站统计"}},[a._v("#")]),a._v(" umami - 网站统计")]),a._v(" "),e("p",[e("img",{attrs:{src:s(480),alt:"image-20230312165458820"}})]),a._v(" "),e("p",[a._v("前提，安装 yarn pm2")]),a._v(" "),e("p",[a._v("这里先跳过了，百度手动安装一下")]),a._v(" "),e("h2",{attrs:{id:"_1、下载源码"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1、下载源码"}},[a._v("#")]),a._v(" 1、下载源码")]),a._v(" "),e("div",{staticClass:"language-shell extra-class"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[a._v("git")]),a._v(" clone https://github.com/umami-software/umami.git\n"),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("cd")]),a._v(" umami\n"),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("yarn")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v("\n")])])]),e("h2",{attrs:{id:"_2、配置数据库链接"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2、配置数据库链接"}},[a._v("#")]),a._v(" 2、配置数据库链接")]),a._v(" "),e("div",{staticClass:"language-env extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("# touch .env\nDATABASE_URL=mysql://username:mypassword@localhost:3306/mydb\n")])])]),e("h2",{attrs:{id:"_3、打包"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3、打包"}},[a._v("#")]),a._v(" 3、打包")]),a._v(" "),e("p",[a._v("打包之前需要先配置一下数据库链接，因为会自动创建数据表,如果"),e("strong",[a._v("换了一个环境")]),a._v("，需要重新build一下")]),a._v(" "),e("div",{staticClass:"language-shell extra-class"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[a._v("yarn")]),a._v(" start\n")])])]),e("h2",{attrs:{id:"_4、运行"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_4、运行"}},[a._v("#")]),a._v(" 4、运行")]),a._v(" "),e("div",{staticClass:"language-shell extra-class"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[a._v("yarn")]),a._v(" global "),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("add")]),a._v(" pm2\n"),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("cd")]),a._v(" umami\npm2 start "),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("yarn")]),a._v(" --name umami -- start\npm2 startup\npm2 save\n")])])]),e("p",[a._v("查看")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("pm2 list\n")])])]),e("p",[e("img",{attrs:{src:s(481),alt:"image-20230312165238645"}})]),a._v(" "),e("p",[a._v("删除")]),a._v(" "),e("div",{staticClass:"language-shell extra-class"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[a._v("pm2  del "),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("0")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 0 => id")]),a._v("\n")])])]),e("h2",{attrs:{id:"docker方式运行"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#docker方式运行"}},[a._v("#")]),a._v(" docker方式运行")]),a._v(" "),e("p",[a._v("ghcr.io/umami-software/umami:mysql-v2.0.1")]),a._v(" "),e("div",{staticClass:"language-yml extra-class"},[e("pre",{pre:!0,attrs:{class:"language-yml"}},[e("code",[e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("version")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[a._v("'3'")]),a._v("\n"),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("services")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v("\n  "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("umami")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("image")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" docker.umami.dev/umami"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("-")]),a._v("software/umami"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v("mysql"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("-")]),a._v("latest\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("ports")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v("\n      "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("-")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[a._v('"3000:3000"')]),a._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("environment")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v("\n      "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("DATABASE_URL")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" mysql"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v("//umami"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v("password@ip/umami\n      "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("DATABASE_TYPE")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" mysql\n      "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("APP_SECRET")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" orangbus\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("restart")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" always\n")])])]),e("p",[a._v("初始账号：admin")]),a._v(" "),e("p",[a._v("初始密码：umami")]),a._v(" "),e("h1",{attrs:{id:"v2raya"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#v2raya"}},[a._v("#")]),a._v(" V2raya")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("docker run -d "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n  --restart"),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("always "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n  --privileged "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n  --network"),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("host "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n  --name v2raya "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n  -e "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("V2RAYA_LOG_FILE")]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("/tmp/v2raya.log "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n  -v /lib/modules:/lib/modules:ro "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n  -v /etc/resolv.conf:/etc/resolv.conf "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n  -v /etc/v2raya:/etc/v2raya "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n  mzz2017/v2raya\n")])])]),e("h1",{attrs:{id:"minio"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#minio"}},[a._v("#")]),a._v(" minio")]),a._v(" "),e("h2",{attrs:{id:"mc客户端"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#mc客户端"}},[a._v("#")]),a._v(" mc客户端")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("wget https://dl.min.io/client/mc/release/linux-amd64/mc\nchmod +x mc\nsudo mv mc /usr/local/bin/mc\n")])])]),e("p",[a._v("设置一个minio连接")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("mc alias set local http://127.0.0.1:9000 {MINIO_ROOT_USER} {MINIO_ROOT_PASSWORD}\n// mc alias set local http://127.0.0.1:9000 admin admin666\nmc admin info local\n")])])]),e("p",[a._v("添加节点")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("mc config host add audio-s3 http://127.0.0.1:90\n")])])]),e("h1",{attrs:{id:"cpolar"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#cpolar"}},[a._v("#")]),a._v(" cpolar")]),a._v(" "),e("p",[a._v("配置文件路径")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("/usr/local/etc/cpolar/cpolar.yml\n")])])])])}),[],!1,null,null,null);t.default=n.exports}}]);