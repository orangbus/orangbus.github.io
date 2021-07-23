module.exports = [
	{text: 'Home', link: '/'},
	{
		text: 'Window',
		items: [
			{text: '高效工具', link: '/Window/'},
			{text: '软件中心', link: 'https://pc.qq.com'},
		]
	},
	{
		text: 'Linux',
		items: [
			{text: "配置文件", link: '/Linux/Config'},
			{text: "生产工具", link: '/Linux/Tool'},
            {text: "Linux-Web", link: "/Linux/WebNote/"},
			{text: 'Manjaro入门到生产', link: 'https://github.com/orangbus/tool'},
			{
				text: '开发环境', items: [
					{text: 'Laradock', link: 'http://laradock.io'},
					{text: '宝塔Linux面板', link: 'https://www.bt.cn/'},
					{text: 'laragon-window', link: 'https://laragon.org/'},
				]
			},
			{
				text: 'Linux发行版', items: [
					{text: 'Deepin', link: 'https://www.deepin.org/zh/'},
					{text: 'Manjaro', link: 'https://manjaro.org/'},
					{text: 'Ubuntu', link: 'https://cn.ubuntu.com/'},
					{text: 'centos', link: 'https://www.centos.org/'},
				]
			},
			{
				text: 'Laradock实战', items: [
					{
						text: 'Docker入门到实战',
						link: 'https://yeasy.gitbooks.io/docker_practice/install/mirror.html'
					},
					{text: 'Laradock官网', link: 'http://laradock.io'},
					{text: 'Docker在线学习调试', link: 'https://labs.play-with-docker.com/'},
					{
						text: 'Kubernetes互动教程',
						link: 'https://k8smeetup.github.io/docs/tutorials/kubernetes-basics/deploy-interactive/'
					},
				]
			}
		]
	},
	{text: "Docker", link: "/Docker/"},
	{
		text: "Code",
		items: [
			{
				text: "Html",
				items: [
					{text: 'RequireJs', link: '/Code/RequireJs'},
					{text: 'Layui笔记', link: '/Code/Layui'},
					{text: 'Javascript手册', link: '/Code/Javascript'},
					{text: 'Css样式收藏', link: '/Code/Css'},
					{text: '在线手册', link: '/Code/Menu'},
				]
			},
			{
				text: "Vue",
				link: "/Code/VueNote",
			},
			{
				text: "Php",
				items: [
					{text: 'Php使用技巧', link: '/Code/Php'},
					{text: 'ThinkPhp', link: '/Code/Thinkphp'},
					{text: 'LaraCode', link: '/Code/LaraCode'},
				],
			},
			{
				text: "Python",
				items: [
					{text: 'Python入门', link: '/Python/Python'},
					{text: 'Scrapy', link: '/Python/Scrapy'},
				],
			}
		]
	},
	{text: "MyNote", link: "/MyNote/"},
	{text: "WebNote", link: "/WebNote/"},
	{text: "OrangBus", link: "/OrangBus/"},
	{
		text: 'More',
		items: [
			{text: 'BiliBili', link: "https://space.bilibili.com/32604448"},
			{text: 'NetMusic', link: "https://music.163.com/#/user/home?id=107573124"},
			{text: 'QQ交流群', link: "https://jq.qq.com/?wv=1027&k=5UQXtUm"}
		]
	},
]