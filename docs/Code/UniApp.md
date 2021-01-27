## Uniapp学习笔记

> 我的开发环境是：Manjaro

### [环境安装](https://uniapp.dcloud.io/quickstart?id=环境安装)

全局安装vue-cli

```bash
npm install -g @vue/cli
```

### [创建uni-app](https://uniapp.dcloud.io/quickstart?id=创建uni-app-1)

**使用正式版**（对应HBuilderX最新正式版）

```bash
vue create -p dcloudio/uni-preset-vue app

npm run serve
```

### [运行、发布uni-app](https://uniapp.dcloud.io/quickstart?id=运行、发布uni-app)

```bash
npm run dev:%PLATFORM%
npm run build:%PLATFORM%

// 比如我只是h5调试
npm run dev:h5
```

`%PLATFORM%` 可取值如下：

| 值                      | 平台                                                         |
| ----------------------- | ------------------------------------------------------------ |
| app-plus                | app平台生成打包资源（支持npm run build:app-plus，可用于持续集成。不支持run，运行调试仍需在HBuilderX中操作） |
| h5                      | H5                                                           |
| mp-alipay               | 支付宝小程序                                                 |
| mp-baidu                | 百度小程序                                                   |
| mp-weixin               | 微信小程序                                                   |
| mp-toutiao              | 字节跳动小程序                                               |
| mp-qq                   | qq 小程序                                                    |
| mp-360                  | 360 小程序                                                   |
| quickapp-webview        | 快应用(webview)                                              |
| quickapp-webview-union  | 快应用联盟                                                   |
| quickapp-webview-huawei | 快应用华为                                                   |