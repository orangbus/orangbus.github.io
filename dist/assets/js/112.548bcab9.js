(window.webpackJsonp=window.webpackJsonp||[]).push([[112],{622:function(n,t,s){"use strict";s.r(t);var a=s(11),e=Object(a.a)({},(function(){var n=this,t=n.$createElement,s=n._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[s("h1",{attrs:{id:"个人常用shell脚本"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#个人常用shell脚本"}},[n._v("#")]),n._v(" 个人常用Shell脚本")]),n._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token shebang important"}},[n._v("#!/bin//bash env")]),n._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[n._v("function")]),n._v(" "),s("span",{pre:!0,attrs:{class:"token function-name function"}},[n._v("install_php")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(")")]),n._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("{")]),n._v("\n    sduo pacman -S php"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(";")]),n._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("}")]),n._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[n._v("function")]),n._v(" "),s("span",{pre:!0,attrs:{class:"token function-name function"}},[n._v("git_init")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(")")]),n._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("{")]),n._v("\n    ssh-keygen"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(";")]),n._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("}")]),n._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[n._v("function")]),n._v(" "),s("span",{pre:!0,attrs:{class:"token function-name function"}},[n._v("install_laravel")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(")")]),n._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("{")]),n._v("\n    composer config -g repo.packagist composer https://packagist.phpcomposer.com\n    composer global require laravel/installer\n    "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[n._v("echo")]),n._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[n._v('"laravel installed ok!"')]),n._v("\n    "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[n._v("echo")]),n._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[n._v('"now you can run bash: laravel new App"')]),n._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("}")]),n._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[n._v("function")]),n._v(" "),s("span",{pre:!0,attrs:{class:"token function-name function"}},[n._v("install_guake")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(")")]),n._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("{")]),n._v("\n    "),s("span",{pre:!0,attrs:{class:"token function"}},[n._v("sudo")]),n._v(" pacman -S guake"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(";")]),n._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("}")]),n._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[n._v("function")]),n._v(" "),s("span",{pre:!0,attrs:{class:"token function-name function"}},[n._v("install_youGet")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(")")]),n._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("{")]),n._v("\n    "),s("span",{pre:!0,attrs:{class:"token function"}},[n._v("curl")]),n._v(" https://bootstrap.pypa.io/get-pip.py -o get-pip.py"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(";")]),n._v("\n    "),s("span",{pre:!0,attrs:{class:"token function"}},[n._v("sudo")]),n._v(" python3 get-pip.py\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("}")]),n._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[n._v("function")]),n._v(" "),s("span",{pre:!0,attrs:{class:"token function-name function"}},[n._v("install_finalShell")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(")")]),n._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("{")]),n._v("\n    "),s("span",{pre:!0,attrs:{class:"token function"}},[n._v("rm")]),n._v(" -f finalshell_install_linux.sh"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(";")]),n._v("\n    "),s("span",{pre:!0,attrs:{class:"token function"}},[n._v("wget")]),n._v(" www.hostbuf.com/downloads/finalshell_install_linux.sh"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(";")]),n._v("\n    "),s("span",{pre:!0,attrs:{class:"token function"}},[n._v("chmod")]),n._v(" +x finalshell_install_linux.sh"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(";")]),n._v("\n    ./finalshell_install_linux.sh"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(";")]),n._v("\n    "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[n._v("echo")]),n._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[n._v('"安装路径:/usr/lib/FinalShell/"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(";")]),n._v("\n    "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[n._v("echo")]),n._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[n._v('"配置文件路径:/home/'),s("span",{pre:!0,attrs:{class:"token environment constant"}},[n._v("$USER")]),n._v('/.finalshell/"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(";")]),n._v("\n    "),s("span",{pre:!0,attrs:{class:"token function"}},[n._v("rm")]),n._v(" -f finalshell_install_linux.sh"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(";")]),n._v("\n    "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[n._v("echo")]),n._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[n._v('"install ok!"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(";")]),n._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("}")]),n._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[n._v("function")]),n._v(" "),s("span",{pre:!0,attrs:{class:"token function-name function"}},[n._v("install_tweak")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(")")]),n._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("{")]),n._v("\n    "),s("span",{pre:!0,attrs:{class:"token function"}},[n._v("sudo")]),n._v(" pacman -S gnome-tweak-tool"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(";")]),n._v("\n    "),s("span",{pre:!0,attrs:{class:"token function"}},[n._v("sudo")]),n._v(" pacman -S chrome-gnome-shell"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(";")]),n._v("\n    "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[n._v("echo")]),n._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[n._v('"extensions_url: https://extensions.gnome.org"')]),n._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("}")]),n._v("\n\n")])])])])}),[],!1,null,null,null);t.default=e.exports}}]);