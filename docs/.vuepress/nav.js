module.exports = [
    {text: 'Home', link: '/'},
    {
        text: 'Window',
        items: [
            {text: '高效生产力', link: '/Window/'},
            {
                text: '装机必备', items: [
                    {text: '软件中心', link: 'https://pc.qq.com'}
                ]
            },
        ]
    },
    {
        text: 'Linux',
        items: [
            {text: "配置文件", link: '/Linux/'},
            {text: "生产工具", link: '/Linux/Tool'},
            {
                text: '常规配置', items: [
                    {text: 'Manjaro入门到生产', link: 'https://github.com/orangbus/tool'},
                ]
            },
            {
                text: 'Laradock实战', items: [
                    {
                        text: 'Docker入门到实战',
                        link: 'https://yeasy.gitbooks.io/docker_practice/install/mirror.html'
                    },
                    {text: 'Laradock', link: 'http://laradock.io'},
                    {text: 'Docker在线学习调试', link: 'https://labs.play-with-docker.com/'},
                    {
                        text: 'Kubernetes互动教程',
                        link: 'https://k8smeetup.github.io/docs/tutorials/kubernetes-basics/deploy-interactive/'
                    },
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
                    {text: 'Layui笔记', link: '/Code/Layui'},
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
            }
        ]
    },
    {
        text: "WebNote",
        link: "/WebNote/"
    },
    {
        text: 'More',
        items: [
            {text: "AboutMe", link: "/About/"},
            {text: "Live", link: "/Code/"},
            {
                text: "AboutMe", items: [
                    {text: 'BiliBili', link: "https://space.bilibili.com/32604448"},
                    {text: 'NetMusic', link: "https://music.163.com/#/user/home?id=107573124"},
                    {text: 'QQ交流群', link: "https://jq.qq.com/?wv=1027&k=5UQXtUm"}
                ]
            }
        ]
    },
]