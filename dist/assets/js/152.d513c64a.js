(window.webpackJsonp=window.webpackJsonp||[]).push([[152],{662:function(a,t,r){"use strict";r.r(t);var n=r(11),v=Object(n.a)({},(function(){var a=this,t=a.$createElement,r=a._self._c||t;return r("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[r("h1",{attrs:{id:"linux常用打包压缩格式"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#linux常用打包压缩格式"}},[a._v("#")]),a._v(" linux常用打包压缩格式")]),a._v(" "),r("p",[r("code",[a._v(".zip")]),a._v(" "),r("code",[a._v(".gz")]),a._v(" "),r("code",[a._v(".bz2")]),a._v(" "),r("code",[a._v(".tar")]),a._v(" "),r("code",[a._v(".tar.gz")]),a._v(" "),r("code",[a._v(".tar.bz2")])]),a._v(" "),r("p",[a._v("一、"),r("code",[a._v(".zip")]),a._v(" 格式")]),a._v(" "),r("h3",{attrs:{id:"_1-压缩"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_1-压缩"}},[a._v("#")]),a._v(" 1. 压缩")]),a._v(" "),r("h4",{attrs:{id:"压缩文件"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#压缩文件"}},[a._v("#")]),a._v(" 压缩文件")]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("zip 压缩文件名 源文件\n")])])]),r("h4",{attrs:{id:"压缩目录"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#压缩目录"}},[a._v("#")]),a._v(" 压缩目录")]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("zip -r 压缩文件名 源目录\n")])])]),r("ul",[r("li",[a._v("实例")])]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("[vagrant/tmp] ]$zip a.zip a.md\n  adding: a.md (stored 0%)\n[vagrant/tmp] ]$zip -r abc.zip abc\n  adding: abc/ (stored 0%)\n  adding: abc/def/ (stored 0%)\n  adding: abc/def/ghi/ (stored 0%)\n[vagrant/tmp] ]$ll\ndrwxrwxr-x 3 vagrant       vagrant       4.0K Apr 19 00:53 abc/\n-rw-rw-r-- 1 vagrant       vagrant        454 Apr 19 00:55 abc.zip\n-rw-rw-r-- 1 vagrant       vagrant          0 Apr 19 00:53 a.md\n-rw-rw-r-- 1 vagrant       vagrant        158 Apr 19 00:55 a.zip\n")])])]),r("h3",{attrs:{id:"_2-解压缩"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_2-解压缩"}},[a._v("#")]),a._v(" 2. 解压缩")]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("unzip 压缩文件名 [-d <文件解压缩后所要存储的目录>]\n")])])]),r("ul",[r("li",[a._v("实例")])]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("[vagrant/tmp] ]$mkdir zip\n[vagrant/tmp] ]$unzip a.zip -d zip\nArchive:  a.zip\n extracting: zip/a.md\n[vagrant/tmp] ]$unzip abc.zip -d zip\nArchive:  abc.zip\n   creating: zip/abc/\n   creating: zip/abc/def/\n   creating: zip/abc/def/ghi/\n[vagrant/tmp] ]$ll zip\ndrwxrwxr-x 3 vagrant vagrant 4.0K Apr 19 00:53 abc/\n-rw-rw-r-- 1 vagrant vagrant    0 Apr 19 00:53 a.md\n")])])]),r("h2",{attrs:{id:"二、-gz-格式"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#二、-gz-格式"}},[a._v("#")]),a._v(" 二、"),r("code",[a._v(".gz")]),a._v(" 格式")]),a._v(" "),r("h3",{attrs:{id:"_1-压缩-2"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_1-压缩-2"}},[a._v("#")]),a._v(" 1. 压缩")]),a._v(" "),r("h4",{attrs:{id:"压缩文件-2"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#压缩文件-2"}},[a._v("#")]),a._v(" 压缩文件")]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("1. gzip 源文件\n")])])]),r("blockquote",[r("p",[a._v("注意：源文件会消失！")])]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("2. gzip -c 源文件 > 压缩文件\n")])])]),r("blockquote",[r("p",[a._v("压缩文件，源文件保留")])]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("3. gzip -r 目录\n")])])]),r("blockquote",[r("p",[a._v("压缩目录下所有子文件，但是不能压缩目录")])]),a._v(" "),r("h4",{attrs:{id:"压缩目录-2"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#压缩目录-2"}},[a._v("#")]),a._v(" 压缩目录")]),a._v(" "),r("blockquote",[r("p",[a._v("gzip 不能压缩目录")])]),a._v(" "),r("ul",[r("li",[a._v("实例")])]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("[vagrant/tmp] ]$gzip -c a.md > a.md.gz\n[vagrant/tmp] ]$ll\ndrwxrwxr-x 3 vagrant       vagrant       4.0K Apr 19 00:53 abc/\n-rw-rw-r-- 1 vagrant       vagrant          0 Apr 19 00:53 a.md\n-rw-rw-r-- 1 vagrant       vagrant         25 Apr 19 04:11 a.md.gz\n[vagrant/tmp] ]$ll abc\n-rw-rw-r-- 1 vagrant vagrant    0 Apr 19 04:12 a\n-rw-rw-r-- 1 vagrant vagrant    0 Apr 19 04:12 b\n-rw-rw-r-- 1 vagrant vagrant    0 Apr 19 04:12 c\n[vagrant/tmp] ]$gzip -r abc\n[vagrant/tmp] ]$ll abc\n-rw-rw-r-- 1 vagrant vagrant   22 Apr 19 04:12 a.gz\n-rw-rw-r-- 1 vagrant vagrant   22 Apr 19 04:12 b.gz\n-rw-rw-r-- 1 vagrant vagrant   22 Apr 19 04:12 c.gz\n\n")])])]),r("h3",{attrs:{id:"_2-解压缩-2"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_2-解压缩-2"}},[a._v("#")]),a._v(" 2. 解压缩")]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("1. gzip -d 压缩文件\n\n2. gunzip 压缩文件\n")])])]),r("ul",[r("li",[a._v("实例")])]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("[vagrant/tmp/tmp] ]$gzip -d a.md.gz\n[vagrant/tmp/tmp] ]$ll\ndrwxrwxr-x 3 vagrant vagrant 4.0K Apr 19 04:13 abc/\n-rw-rw-r-- 1 vagrant vagrant    0 Apr 19 04:11 a.md\n[vagrant/tmp/tmp] ]$gzip -dr abc/\n[vagrant/tmp/tmp] ]$ll abc\n-rw-rw-r-- 1 vagrant vagrant    0 Apr 19 04:12 a\n-rw-rw-r-- 1 vagrant vagrant    0 Apr 19 04:12 b\n-rw-rw-r-- 1 vagrant vagrant    0 Apr 19 04:12 c\n")])])]),r("h2",{attrs:{id:"三、-bz2-格式"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#三、-bz2-格式"}},[a._v("#")]),a._v(" 三、"),r("code",[a._v(".bz2")]),a._v(" 格式")]),a._v(" "),r("h3",{attrs:{id:"_1-压缩-3"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_1-压缩-3"}},[a._v("#")]),a._v(" 1. 压缩")]),a._v(" "),r("h4",{attrs:{id:"压缩文件-3"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#压缩文件-3"}},[a._v("#")]),a._v(" 压缩文件")]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("1. bzip2 源文件\n")])])]),r("blockquote",[r("p",[a._v("注意：源文件会消失！")])]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("2. bzip2 -k 源文件\n")])])]),r("blockquote",[r("p",[a._v("压缩文件，源文件保留")])]),a._v(" "),r("h4",{attrs:{id:"压缩目录-3"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#压缩目录-3"}},[a._v("#")]),a._v(" 压缩目录")]),a._v(" "),r("blockquote",[r("p",[a._v("bzip2 不能压缩目录")])]),a._v(" "),r("ul",[r("li",[a._v("实例")])]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("[vagrant/tmp/tmp] ]$bzip2 -k a.md\n[vagrant/tmp/tmp] ]$ll\n-rw-rw-r-- 1 vagrant vagrant    0 Apr 19 04:11 a.md\n-rw-rw-r-- 1 vagrant vagrant   14 Apr 19 04:11 a.md.bz2\n[vagrant/tmp/tmp] ]$rm a.md.bz2\n[vagrant/tmp/tmp] ]$bzip2 a.md\n[vagrant/tmp/tmp] ]$ll\n-rw-rw-r-- 1 vagrant vagrant   14 Apr 19 04:11 a.md.bz2\n\n")])])]),r("h3",{attrs:{id:"_2-解压缩-3"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_2-解压缩-3"}},[a._v("#")]),a._v(" 2. 解压缩")]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("1. bzip2 -d 压缩文件\n")])])]),r("blockquote",[r("p",[a._v("解压缩，默认不保留压缩文件。加 "),r("code",[a._v("-k")]),a._v(" 可保留压缩文件")])]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("2. gunzip 压缩文件\n")])])]),r("blockquote",[r("p",[a._v("解压缩，默认不保留压缩文件。加 "),r("code",[a._v("-k")]),a._v(" 可保留压缩文件")])]),a._v(" "),r("ul",[r("li",[a._v("实例")])]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("[vagrant/tmp/tmp] ]$bzip2 -dk a.md.bz2\n[vagrant/tmp/tmp] ]$ll\n-rw-rw-r-- 1 vagrant vagrant    0 Apr 19 04:11 a.md\n-rw-rw-r-- 1 vagrant vagrant   14 Apr 19 04:11 a.md.bz2\n[vagrant/tmp/tmp] ]$rm a.md\n[vagrant/tmp/tmp] ]$bunzip2 -k a.md.bz2\n[vagrant/tmp/tmp] ]$ll\n-rw-rw-r-- 1 vagrant vagrant    0 Apr 19 04:11 a.md\n-rw-rw-r-- 1 vagrant vagrant   14 Apr 19 04:11 a.md.bz2\n[vagrant/tmp/tmp] ]$rm a.md\n[vagrant/tmp/tmp] ]$bzip2 -d a.md.bz2\n[vagrant/tmp/tmp] ]$ll\n-rw-rw-r-- 1 vagrant vagrant    0 Apr 19 04:11 a.md\n\n")])])]),r("h2",{attrs:{id:"四、-tar-格式"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#四、-tar-格式"}},[a._v("#")]),a._v(" 四、"),r("code",[a._v(".tar")]),a._v(" 格式")]),a._v(" "),r("h3",{attrs:{id:"_1-打包"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_1-打包"}},[a._v("#")]),a._v(" 1. 打包")]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("tar -cvf 打包文件名 源文件或目录\n")])])]),r("ul",[r("li",[a._v("选项")])]),a._v(" "),r("blockquote",[r("p",[r("code",[a._v("-c")]),a._v(" : 打包"),r("br"),a._v(" "),r("code",[a._v("-v")]),a._v(" : 显示打包过程"),r("br"),a._v(" "),r("code",[a._v("-f")]),a._v(" : 指定打包后的文件名")])]),a._v(" "),r("ul",[r("li",[a._v("实例")])]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("[vagrant/tmp/tmp] ]$tar -cvf abc.tar abc\nabc/\nabc/def/\nabc/def/ghi/\nabc/a\nabc/b\nabc/c\n[vagrant/tmp/tmp] ]$ll\ndrwxrwxr-x 3 vagrant vagrant 4.0K Apr 19 04:22 abc/\n-rw-rw-r-- 1 vagrant vagrant  10K Apr 19 07:02 abc.tar\n\n")])])]),r("h3",{attrs:{id:"_2-解打包"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_2-解打包"}},[a._v("#")]),a._v(" 2. 解打包")]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("tar -xvf 打包文件名\n")])])]),r("ul",[r("li",[a._v("选项")])]),a._v(" "),r("blockquote",[r("p",[r("code",[a._v("-x")]),a._v(" : 解打包")])]),a._v(" "),r("ul",[r("li",[a._v("实例")])]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("vagrant/tmp/tmp] ]$tar -xvf abc.tar\nabc/\nabc/def/\nabc/def/ghi/\nabc/a\nabc/b\nabc/c\n[vagrant/tmp/tmp] ]$ll\ndrwxrwxr-x 3 vagrant vagrant 4.0K Apr 19 04:22 abc/\n-rw-rw-r-- 1 vagrant vagrant  10K Apr 19 07:02 abc.tar\n\n")])])]),r("h2",{attrs:{id:"五、-tar-gz-格式"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#五、-tar-gz-格式"}},[a._v("#")]),a._v(" 五、"),r("code",[a._v(".tar.gz")]),a._v(" 格式")]),a._v(" "),r("blockquote",[r("p",[a._v("其实，"),r("code",[a._v(".tar.gz")]),a._v(" 格式是先将文件或目录打包文 "),r("code",[a._v(".tar")]),a._v(" 格式，再压缩为 "),r("code",[a._v(".gz")]),a._v(" 格式")])]),a._v(" "),r("h3",{attrs:{id:"_1-压缩-4"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_1-压缩-4"}},[a._v("#")]),a._v(" 1. 压缩")]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("tar -zcvf 压缩包名.tar.gz 源文件\n")])])]),r("ul",[r("li",[a._v("选项")])]),a._v(" "),r("blockquote",[r("p",[r("code",[a._v("-z")]),a._v(" : 压缩为 .tar.gz 格式")])]),a._v(" "),r("h3",{attrs:{id:"_2-解压缩-4"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_2-解压缩-4"}},[a._v("#")]),a._v(" 2. 解压缩")]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("tar -zxvf 压缩包名.tar.gz\n")])])]),r("ul",[r("li",[a._v("选项")])]),a._v(" "),r("blockquote",[r("p",[r("code",[a._v("-x")]),a._v(" : 解压缩"),r("br"),a._v(" "),r("code",[a._v("-t")]),a._v(" : 查看压缩保内文件，但是不解压缩")])]),a._v(" "),r("ul",[r("li",[a._v("实例")])]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("[vagrant/tmp/tmp] ]$tar -zcvf abc.tar.gz abc\nabc/\nabc/def/\nabc/def/ghi/\nabc/a\nabc/b\nabc/c\n[vagrant/tmp/tmp] ]$ll\ntotal 8.0K\ndrwxrwxr-x 3 vagrant vagrant 4.0K Apr 19 04:22 abc/\n-rw-rw-r-- 1 vagrant vagrant  204 Apr 19 07:27 abc.tar.gz\n[vagrant/tmp/tmp] ]$rm -rf abc\n[vagrant/tmp/tmp] ]$tar -ztvf abc.tar.gz\ndrwxrwxr-x vagrant/vagrant   0 2018-04-19 04:22 abc/\ndrwxrwxr-x vagrant/vagrant   0 2018-04-19 00:52 abc/def/\ndrwxrwxr-x vagrant/vagrant   0 2018-04-19 00:52 abc/def/ghi/\n-rw-rw-r-- vagrant/vagrant   0 2018-04-19 04:12 abc/a\n-rw-rw-r-- vagrant/vagrant   0 2018-04-19 04:12 abc/b\n-rw-rw-r-- vagrant/vagrant   0 2018-04-19 04:12 abc/c\n[vagrant/tmp/tmp] ]$ll\ntotal 4.0K\n-rw-rw-r-- 1 vagrant vagrant 204 Apr 19 07:27 abc.tar.gz\n[vagrant/tmp/tmp] ]$tar -zxvf abc.tar.gz\nabc/\nabc/def/\nabc/def/ghi/\nabc/a\nabc/b\nabc/c\n[vagrant/tmp/tmp] ]$ll\ntotal 8.0K\ndrwxrwxr-x 3 vagrant vagrant 4.0K Apr 19 04:22 abc/\n-rw-rw-r-- 1 vagrant vagrant  204 Apr 19 07:27 abc.tar.gz\n\n")])])]),r("h2",{attrs:{id:"六、-tar-bz2-格式"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#六、-tar-bz2-格式"}},[a._v("#")]),a._v(" 六、"),r("code",[a._v(".tar.bz2")]),a._v(" 格式")]),a._v(" "),r("blockquote",[r("p",[a._v("其实，"),r("code",[a._v(".tar.bz2")]),a._v(" 格式是先将文件或目录打包文 "),r("code",[a._v(".tar")]),a._v(" 格式，再压缩为 "),r("code",[a._v(".bz2")]),a._v(" 格式")])]),a._v(" "),r("h3",{attrs:{id:"_1-压缩-5"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_1-压缩-5"}},[a._v("#")]),a._v(" 1. 压缩")]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("tar -jcvf 压缩包名.tar.bz2 源文件\n")])])]),r("ul",[r("li",[a._v("选项")])]),a._v(" "),r("blockquote",[r("p",[r("code",[a._v("-j")]),a._v(" : 压缩为 .tar.bz2 格式")])]),a._v(" "),r("h3",{attrs:{id:"_2-解压缩-5"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_2-解压缩-5"}},[a._v("#")]),a._v(" 2. 解压缩")]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("tar -jxvf 压缩包名.tar.bz2\n")])])]),r("ul",[r("li",[a._v("选项")])]),a._v(" "),r("blockquote",[r("p",[r("code",[a._v("-x")]),a._v(" : 解压"),r("br"),a._v(" "),r("code",[a._v("-t")]),a._v(" : 查看压缩保内文件，但是不解压缩"),r("br"),a._v(" "),r("code",[a._v("-C")]),a._v(" : 指定解压的目录（注意，该选项必须放在后面）")])]),a._v(" "),r("ul",[r("li",[a._v("实例")])]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("[vagrant/tmp/tmp] ]$tar -jcvf abc.tar.bz2 abc\nabc/\nabc/def/\nabc/def/ghi/\nabc/a\nabc/b\nabc/c\n[vagrant/tmp/tmp] ]$ll\ntotal 8.0K\ndrwxrwxr-x 3 vagrant vagrant 4.0K Apr 19 04:22 abc/\n-rw-rw-r-- 1 vagrant vagrant  210 Apr 19 07:33 abc.tar.bz2\n[vagrant/tmp/tmp] ]$tar -jtvf abc.tar.bz2\ndrwxrwxr-x vagrant/vagrant   0 2018-04-19 04:22 abc/\ndrwxrwxr-x vagrant/vagrant   0 2018-04-19 00:52 abc/def/\ndrwxrwxr-x vagrant/vagrant   0 2018-04-19 00:52 abc/def/ghi/\n-rw-rw-r-- vagrant/vagrant   0 2018-04-19 04:12 abc/a\n-rw-rw-r-- vagrant/vagrant   0 2018-04-19 04:12 abc/b\n-rw-rw-r-- vagrant/vagrant   0 2018-04-19 04:12 abc/c\n[vagrant/tmp/tmp] ]$tar -jxvf abc.tar.bz2 -C /tmp\nabc/\nabc/def/\nabc/def/ghi/\nabc/a\nabc/b\nabc/c\n[vagrant/tmp/tmp] ]$ll /tmp/\ndrwxrwxr-x 3 vagrant       vagrant       4.0K Apr 19 04:22 abc/\ndrwxrwxr-x 3 vagrant       vagrant       4.0K Apr 19 07:33 tmp/\n\n")])])])])}),[],!1,null,null,null);t.default=v.exports}}]);