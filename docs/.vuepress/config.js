const nav = require("./nav");

module.exports = {
	title: "OrangBus",
	description: "分享生活高效技能,保持勇敢，坚持有趣，生命不息，折腾不止！",
	themeConfig: {
		title: "OrangBus",
		description: "分享生活高效技能",
		logo: "/orangbus.png", //导航页Logo
		// displayAllHeaders: true, //显示所有页面的标题链接
		activeHeaderLinks: true, // 活动的标题链接
		sidebar: "auto", //自动生成侧边栏 auto
		smoothScroll: true,
		search: true, //开启搜索
		searchMaxSuggestions: 10, //搜索显示结果条数
		lastUpdated: '最后更新时间', // string | boolean
		lang: 'zh-CN',
		// 上 / 下一篇链接
		// 默认值是 true 。设置为 false 来禁用所有页面的 下一篇 链接
		nextLinks: true,
		// 默认值是 true 。设置为 false 来禁用所有页面的 上一篇 链接
		prevLinks: true,
		//Git 仓库和编辑链接
		repo: 'orangbus/vuepress-blog',
		repoLabel: '查看源码',
		docsDir: 'docs',
		// 假如文档放在一个特定的分支下：
		docsBranch: 'master',
		// 默认是 false, 设置为 true 来启用
		editLinks: true,
		// 默认为 "Edit this page"
		editLinkText: '帮助我们改善此页面！',
		// 页面滚动效果
		smoothScroll: true,
		nav,
	},
	//插件
	plugins: [
		['@vuepress/search', {
			searchMaxSuggestions: 10
		}],
		['@vuepress/back-to-top'], //回到顶部
		['@vuepress/last-updated'],
		['@vuepress/pwa'],//浏览器兼容
		['vuepress-plugin-seo'], //优化 SEO
		['vuepress-plugin-reading-progress'], //阅读进度条
		['vuepress-plugin-code-copy', true], //添加一个代码Copy按钮
		['vuepress-plugin-baidu-autopush'], //添加百度推送
		[
			'sitemap', {
			hostname: 'https://doc.orangbus.cn'
		},
		], //生成站点的Sitemap，有助于SEO。
		['@vuepress/medium-zoom'], //图片放大
		["vuepress-plugin-auto-sidebar", {}] // 自送生成侧边栏
	],
	head: [
		['link', {rel: 'shortcut icon', href: "/orangbus.ico", type: 'image/jpg'}],
		["meta", {name: "keywords", content: "html,css,jquery,thinkphp,laravel,docker,linux,manjaro"}],
		["meta", {name: "description", content: "保持勇敢，坚持有趣，生命不息，折腾不止！"}],
		["meta", {name: "auther", content: "OrangBus"}],
		// 百度统计代码
		['script', {}, `<script>
			var _hmt = _hmt || [];
			(function() {
			  var hm = document.createElement("script");
			  hm.src = "https://hm.baidu.com/hm.js?75a195c58b50e00357efe9066f49f8b0";
			  var s = document.getElementsByTagName("script")[0]; 
			  s.parentNode.insertBefore(hm, s);
			})();
			</script>
			`],
		// 以下文件非必须
		// ["script",{src:'/js/cursor.min.js'}]
	],

};



