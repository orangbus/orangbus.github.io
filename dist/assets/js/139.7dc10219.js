(window.webpackJsonp=window.webpackJsonp||[]).push([[139],{650:function(t,n,e){"use strict";e.r(n);var s=e(11),a=Object(s.a)({},(function(){var t=this.$createElement,n=this._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":this.$parent.slotKey}},[n("p",[this._v("打开 "),n("code",[this._v("babel.config.js")]),this._v(" 文件，添加一下代码：")]),this._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[this._v("module.exports = {\n  proxy : {\n      '/inc':{\n        target:'http://cj.okzy.tv', //请求 api 域名\n        changeOrigin: true,\n        ws: true,\n        pathRewrite:{\n          '^/inc': '' //前缀，比如说：https://orangbus.cn/api(这个)/getlist.php\n        }\n      }\n  }\n}\n")])])])])}),[],!1,null,null,null);n.default=a.exports}}]);