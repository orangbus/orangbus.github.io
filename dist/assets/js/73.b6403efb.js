(window.webpackJsonp=window.webpackJsonp||[]).push([[73],{570:function(t,e,s){"use strict";s.r(e);var a=s(11),n=Object(a.a)({},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h2",{attrs:{id:"window修改终端未git"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#window修改终端未git"}},[t._v("#")]),t._v(" window修改终端未git")]),t._v(" "),s("p",[t._v("打开配置文件搜索："),s("code",[t._v("terminal.integrated.shell.windows")]),t._v(" ,后面修改为你git的路径")]),t._v(" "),s("div",{staticClass:"language-json extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"terminal.integrated.shell.windows"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"D:\\\\Programfile\\\\Git\\\\bin\\\\bash.exe"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n")])])]),s("h1",{attrs:{id:"powershell-管理执行策略"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#powershell-管理执行策略"}},[t._v("#")]),t._v(" PowerShell 管理执行策略")]),t._v(" "),s("p",[t._v("输入 get-ExecutionPolicy，返回的是 "),s("strong",[t._v("Restricted")]),t._v("，表明禁止，我们需要调整执行策略：")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[t._v("// 检查策略状态\nGet-ExecutionPolicy\n\n// 更改执行策略\nSet-ExecutionPolicy RemoteSigned\n\n// 恢复默认执行策略\nSet-ExecutionPolicy Restricted\n")])])])])}),[],!1,null,null,null);e.default=n.exports}}]);