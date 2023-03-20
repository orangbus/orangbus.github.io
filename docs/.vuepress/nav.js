module.exports = [
	{text: 'Home', link: '/'},
	{
		text: 'Window',
		items: [
			{text: '高效工具', link: '/Window/'},
			{text: '软件中心', link: 'https://pc.qq.com'},
            {
                text: '开发工具', items: [
                    {text: 'jetbrains', link: 'https://www.jetbrains.com/toolbox-app/'},
                    {text: 'laragon', link: 'https://laragon.org/'},
                    {text: 'php版本安装', link: 'https://www.php.net/downloads.php'},
                    {text: 'php扩展', link: 'https://pecl.php.net/'},
                ]
            }
		]
	},
	{
		text: 'Linux',
		items: [
			{text: "配置文件", link: '/Linux/Config'},
			{text: "生产工具", link: '/Linux/Tool'},
			{text: "应用", link: '/Linux/App'},
			{text: "SedAwk", link: '/Linux/SedAwk'},
			{text: "问题解答", link: '/Linux/Question'},
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
					{text: 'centos', link: 'https://www.centos.org/'},
					{text: 'Deepin', link: 'https://www.deepin.org/zh/'},
					{text: 'Ubuntu', link: 'https://cn.ubuntu.com/'},
					{text: 'Manjaro', link: 'https://manjaro.org/'},
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
					{text: 'play with Kubernetes',link: 'https://labs.play-with-k8s.com/'},
				]
			}
		]
	},
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
			},

		]
	},
	{text: "Docker", link: "/Docker/"},
	{text: "Mysql", link: "/Mysql/"},
	{text: "Java",link: "/Java/"},
	{text: "Golang",link: "/Golang/"},
	{text: "MyNote", link: "/MyNote/"},
	{text: "WebNote", link: "/WebNote/"},
	{text: "OrangBus", link: "/OrangBus/"}
]
