/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "1bd65cf0c77b9d6bf00a2c3c73d7e6dc"
  },
  {
    "url": "About/index.html",
    "revision": "355dbbaf6d78936e0f27ccf537847301"
  },
  {
    "url": "assets/css/0.styles.8405cd42.css",
    "revision": "47ae4a38e751a4f0c1ff170df4e5daec"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.73c6197d.js",
    "revision": "ba6ebcd3082329db753d6ba96bf09e67"
  },
  {
    "url": "assets/js/11.6be7a7de.js",
    "revision": "5e9a71a8087e853894381063e60ca4ed"
  },
  {
    "url": "assets/js/12.bd2a76b5.js",
    "revision": "76d40f361032a6a5f872ee657a0ccc31"
  },
  {
    "url": "assets/js/13.2831420d.js",
    "revision": "92453ad754c19073b468d2df7c258b2c"
  },
  {
    "url": "assets/js/14.a145e198.js",
    "revision": "8bf316ba74a9f4ffa9f5097040eaf3fe"
  },
  {
    "url": "assets/js/15.8f601005.js",
    "revision": "06ef74733fb856fa088a04db47dfefb0"
  },
  {
    "url": "assets/js/16.2d49486e.js",
    "revision": "9a6e303b2421486fed3949cf18db9751"
  },
  {
    "url": "assets/js/17.15ac6e81.js",
    "revision": "a26a6f6e3950dfa5355835e2043d949d"
  },
  {
    "url": "assets/js/18.144ac3ee.js",
    "revision": "0787e91d4bcd96a0d89fc9f707f820d7"
  },
  {
    "url": "assets/js/19.0c2e3fc8.js",
    "revision": "0c0134ac6133935b5332d5604ffb81d2"
  },
  {
    "url": "assets/js/2.986f6ed5.js",
    "revision": "3b34047e132325b9603602fa2facbfe4"
  },
  {
    "url": "assets/js/20.31f35c12.js",
    "revision": "d4d54c123938d9e5ee76170b5cce85c9"
  },
  {
    "url": "assets/js/21.d5f04004.js",
    "revision": "bdbe24c8e5174aed4d29e2cef9d94c63"
  },
  {
    "url": "assets/js/22.8d905648.js",
    "revision": "097de28dd2f6e2358353da0c72da7cdc"
  },
  {
    "url": "assets/js/23.9b837a6e.js",
    "revision": "5015c7217e56804b6784de5c02020d8f"
  },
  {
    "url": "assets/js/24.541484c5.js",
    "revision": "f807a8ff6fe911f2f8476fbf514ea7b9"
  },
  {
    "url": "assets/js/25.861c8943.js",
    "revision": "837e372f1d34c126c968abfca6d0215a"
  },
  {
    "url": "assets/js/26.cac9feed.js",
    "revision": "39bd72613bea83e1f14a1943d57b8f1b"
  },
  {
    "url": "assets/js/27.7b8c6cc9.js",
    "revision": "36c54cacfd47069248eead12aa62d6e5"
  },
  {
    "url": "assets/js/28.b3b7e898.js",
    "revision": "bee5b0e1da1cb8eec64fb33df5aa7d90"
  },
  {
    "url": "assets/js/29.480ac30c.js",
    "revision": "2534e4ca603d0ca8d76c5d9ac771aa2c"
  },
  {
    "url": "assets/js/3.a3a6b999.js",
    "revision": "ec32c96c30a794185413db857ca2df0b"
  },
  {
    "url": "assets/js/30.5a3922da.js",
    "revision": "ad930748c3269f22c6e87c1a3edd5abe"
  },
  {
    "url": "assets/js/31.18e40bfb.js",
    "revision": "afd0f0b3262b6f9e1715cbcf99fdff06"
  },
  {
    "url": "assets/js/32.d34f30b8.js",
    "revision": "732573ee2e8e80832be66607ea40c745"
  },
  {
    "url": "assets/js/33.b5561872.js",
    "revision": "db4326366e336204803e5fb5bba15f6c"
  },
  {
    "url": "assets/js/34.b51669b0.js",
    "revision": "ab2191cb946299688baf7d4fad7d2203"
  },
  {
    "url": "assets/js/35.cc668717.js",
    "revision": "498a90379e82d43d29adefc307ce4f23"
  },
  {
    "url": "assets/js/36.04eebfcb.js",
    "revision": "62588c196c9b0e17a8293f041ed9acf6"
  },
  {
    "url": "assets/js/37.930a9801.js",
    "revision": "33daa79db9fc43f3893f28d95d524717"
  },
  {
    "url": "assets/js/38.d137b624.js",
    "revision": "edd92d3f65716d6493ac98cedc264e5a"
  },
  {
    "url": "assets/js/39.4d617c17.js",
    "revision": "50d52b078b552d307321dfc78dd119d9"
  },
  {
    "url": "assets/js/4.66cb441f.js",
    "revision": "ff225d9256ae378cbac77d18d3ab41f9"
  },
  {
    "url": "assets/js/40.0bf24fa8.js",
    "revision": "1ccb2727358fa48067fcf0a53f66f657"
  },
  {
    "url": "assets/js/41.9ace173e.js",
    "revision": "1b3c7d2f2b392d8b9c52a557cca5a7cb"
  },
  {
    "url": "assets/js/42.c5247c86.js",
    "revision": "8c07457487956f77acf23cfe5ba757d7"
  },
  {
    "url": "assets/js/43.d6662fd0.js",
    "revision": "214950f760003a124b63531254e8fe0f"
  },
  {
    "url": "assets/js/44.098e6d71.js",
    "revision": "fa64a4390bb4ead0c0957c3fb0164b1f"
  },
  {
    "url": "assets/js/45.a76eefef.js",
    "revision": "342398895d2654df9f4e8b0203c2ba77"
  },
  {
    "url": "assets/js/46.2616f378.js",
    "revision": "78df6c9c0d2342ccd9b704dca7ed57fd"
  },
  {
    "url": "assets/js/47.85652812.js",
    "revision": "0ebacac809d8164313350a7aa24dbcb4"
  },
  {
    "url": "assets/js/48.4e4b670c.js",
    "revision": "ac4475ffdd272e8e28b0b6d364e58b33"
  },
  {
    "url": "assets/js/49.536308a4.js",
    "revision": "92b5c74d8da92ab797b56871c047ed6f"
  },
  {
    "url": "assets/js/5.3efdf6a7.js",
    "revision": "9989fde5f40d3f0ed49298c9a9e318e1"
  },
  {
    "url": "assets/js/6.0fa850d7.js",
    "revision": "f4e981e95b07c5597d043ed8a7e6488e"
  },
  {
    "url": "assets/js/7.a784b705.js",
    "revision": "0bf58a892658168f3c715e2ac1980e72"
  },
  {
    "url": "assets/js/8.c36500a2.js",
    "revision": "fe88399f9c24dc28a3441b9e36daac35"
  },
  {
    "url": "assets/js/9.0ab208dc.js",
    "revision": "62129e56d138d0ec9694959900cf40d0"
  },
  {
    "url": "assets/js/app.c247bf6a.js",
    "revision": "000896ed8beabc4fcd575e4b56c1a07b"
  },
  {
    "url": "Code/Css.html",
    "revision": "a0fa891b7242494ca2b52655c74d1508"
  },
  {
    "url": "Code/index.html",
    "revision": "e5fda5c5e846fbee319425502239c831"
  },
  {
    "url": "Code/Javascript.html",
    "revision": "049ed1bf1776753dfbea126e34d51497"
  },
  {
    "url": "Code/LaraCode.html",
    "revision": "ebcc48e58a5f5b0f847302c500e12163"
  },
  {
    "url": "Code/Layui.html",
    "revision": "95c06d6331214e044502da370074dae3"
  },
  {
    "url": "Code/Menu.html",
    "revision": "145ae6c20ce8c02e8eff580abc91fad8"
  },
  {
    "url": "Code/Php.html",
    "revision": "7edf603c076c12cac6100976c77da25f"
  },
  {
    "url": "Code/RequireJs.html",
    "revision": "28fa3e5a1e499f11ad88cacfe42b1738"
  },
  {
    "url": "Code/Swoole.html",
    "revision": "53af3e615d58a8c6b7b9886a9c9ab0e5"
  },
  {
    "url": "Code/Thinkphp.html",
    "revision": "92b7544269458e1127142c5060e251ff"
  },
  {
    "url": "Code/UniApp.html",
    "revision": "d52b27a7e21e7058ccab1bd459625b79"
  },
  {
    "url": "Code/Untitled.html",
    "revision": "596d6cb2d0c291ad82a462cee2a128f1"
  },
  {
    "url": "Code/Vue.html",
    "revision": "366391edabe5b0a440370868cec0f682"
  },
  {
    "url": "Code/vueNote.html",
    "revision": "9b7f7592d17be9dadfbcc562996ca3d9"
  },
  {
    "url": "Code/Wechat.html",
    "revision": "f8c366ff1929c1e0ec7bc914c4215f17"
  },
  {
    "url": "Docker/Dockerfile.html",
    "revision": "7cce3ba0db632c00ce0a4c22702207ec"
  },
  {
    "url": "Docker/elasticsearch.html",
    "revision": "c5f888c3edb4d3233f1bc25996ea1ca6"
  },
  {
    "url": "Docker/index.html",
    "revision": "543e449629a9b4112dc02c82f5d67554"
  },
  {
    "url": "Docker/Minikube.html",
    "revision": "e04a933aaa55823bb9f682b55be19d30"
  },
  {
    "url": "Guide/index.html",
    "revision": "750449e2d469d4d20e86d216ace49acb"
  },
  {
    "url": "images/1.jpg",
    "revision": "7492bb8cddae799c9e3788f97cb6ac74"
  },
  {
    "url": "images/2.jpg",
    "revision": "f8df6d9c2492e4a60b3ece3f0413bdd4"
  },
  {
    "url": "images/3.jpg",
    "revision": "c74b485f9868798e7ab600f2989b7bc4"
  },
  {
    "url": "images/4.jpg",
    "revision": "cacbe6de5829c420b51093bd98c12336"
  },
  {
    "url": "images/5.jpg",
    "revision": "b1c444722ec4f181dbf010a9eeda6272"
  },
  {
    "url": "images/5d3c3159d1a49.png",
    "revision": "d0804ec4dca489cb9ba94523ed6c63a6"
  },
  {
    "url": "images/dockerimage.png",
    "revision": "aa427c927479f9e55f9063c371396d88"
  },
  {
    "url": "images/gb.jpg",
    "revision": "f182e6504d2650bf9421cae6ef309873"
  },
  {
    "url": "images/image-20201207103646644.png",
    "revision": "aa427c927479f9e55f9063c371396d88"
  },
  {
    "url": "images/image-20201215110741455.png",
    "revision": "10ba6582f96e8a63f17c51f4f3867358"
  },
  {
    "url": "images/image-20201215111505365.png",
    "revision": "2c9945071e611a13ec5948e8ffdc4fa9"
  },
  {
    "url": "images/image-20201215114012421.png",
    "revision": "f074b292a2cee0fa338243c44dad2e36"
  },
  {
    "url": "images/qq-avatar.jpg",
    "revision": "5104a9e0de46ac20f02897468e7cca0f"
  },
  {
    "url": "index.html",
    "revision": "5de40c9d0050490de47943e37667cd5f"
  },
  {
    "url": "js/cursor.min.js",
    "revision": "ac37a3a34e305fc3565ab14a6a457f7c"
  },
  {
    "url": "js/jquery-3.5.min.js",
    "revision": "dc5e7f18c8d36ac1d3d4753a87c98d0a"
  },
  {
    "url": "Linux/Config.html",
    "revision": "78796a45b777f4437ab0d12f332a71fd"
  },
  {
    "url": "Linux/Question.html",
    "revision": "4a058e58f42335ebd1a994b9c3ebdadd"
  },
  {
    "url": "Linux/Tool.html",
    "revision": "c6b3ce6a516d513111c8530b4eafc582"
  },
  {
    "url": "Live/index.html",
    "revision": "71eb995b2fdcb288571f4347052f307e"
  },
  {
    "url": "live2d/shizuku/assets/moc/shizuku.1024/texture_00.png",
    "revision": "ca0698ca5a3bf2400e5cf8a1f456a61c"
  },
  {
    "url": "live2d/shizuku/assets/moc/shizuku.1024/texture_01.png",
    "revision": "c960c28ee3f0353023d9498d2362d23c"
  },
  {
    "url": "live2d/shizuku/assets/moc/shizuku.1024/texture_02.png",
    "revision": "efb0515bcaee933f8c38e750d2c4bd3b"
  },
  {
    "url": "live2d/shizuku/assets/moc/shizuku.1024/texture_03.png",
    "revision": "f735487e72e73a0ea528975041548a14"
  },
  {
    "url": "live2d/shizuku/assets/moc/shizuku.1024/texture_04.png",
    "revision": "5b282aa9f7d4fa68cc24c946c0556b87"
  },
  {
    "url": "live2d/shizuku/assets/moc/shizuku.1024/texture_05.png",
    "revision": "16f7b74f1e61bf2b21d91ea5c3ee71de"
  },
  {
    "url": "MyNote/Es6.html",
    "revision": "b7f548b8c3779af2a4563a3928792f5e"
  },
  {
    "url": "MyNote/index.html",
    "revision": "0391e2b365cc42d9da56f33da3b8dc53"
  },
  {
    "url": "MyNote/Rclone.html",
    "revision": "292006333330ca915835979ea60441e4"
  },
  {
    "url": "notes/orangbus.html",
    "revision": "43247d6bd63875b3d8e229ec1dab58c7"
  },
  {
    "url": "orangbus.png",
    "revision": "c3b8ba46f6ddba8ca3c46b1a5865830a"
  },
  {
    "url": "OrangBus/index.html",
    "revision": "260cc683b716a837f1f1e4441c54e20f"
  },
  {
    "url": "OrangBus/OneWords.html",
    "revision": "4bc4010a8250b9bce23f3a8255d068dc"
  },
  {
    "url": "Python/Python.html",
    "revision": "71378646cfbfad74aba6622b4af87bec"
  },
  {
    "url": "Python/Scrapy.html",
    "revision": "64b32014380e5e26a9413730a16146eb"
  },
  {
    "url": "tempNote.html",
    "revision": "547407ca730374224f424c657159f856"
  },
  {
    "url": "WebNote/打包压缩命令.html",
    "revision": "9a649ca55a7eb56e14ac587447d57f1a"
  },
  {
    "url": "WebNote/如何快速清理 docker 资源.html",
    "revision": "f8e1d43cc94f2515419e4f70f45caa32"
  },
  {
    "url": "WebNote/十个催泪虐心的小故事.html",
    "revision": "cb0a7da4621a4ac7d6d6505e7d8a3a43"
  },
  {
    "url": "WebNote/Git 配置多个 SSH-Key.html",
    "revision": "2ef9776dcead8559f3eb7e0b72739f48"
  },
  {
    "url": "WebNote/Git webhook 实现自动部署教程.html",
    "revision": "46603c7848f5e1d5dac69b947dc80050"
  },
  {
    "url": "WebNote/index.html",
    "revision": "e2db6293092743a8b1fe30d33bbe61c8"
  },
  {
    "url": "WebNote/php中call_user_func 与 call_user_func_array的使用 .html",
    "revision": "244398149ee05e22491745fbbcf04f3e"
  },
  {
    "url": "WebNote/UserAgent.html",
    "revision": "b9151937659fe31d44993e1060e00706"
  },
  {
    "url": "Window/index.html",
    "revision": "7c6dc5c8a75c1673da06f2e71ce3f3fc"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
