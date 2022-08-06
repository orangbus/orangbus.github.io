---
title: videojs使用
---

> 官网：https://videojs.com/

安装

```
npm install --save-dev video.js
```



```
npm install --save videojs-contrib-hls
```

使用

```

```

## Chimee播放器

> http://chimee.org/docs/chimee_readme.html

安装

```bash
npm install --save chimee
```

```thml
<div id="player"></div>
```

```javascript
import Chimee from 'chimee';
import hls from 'chimee-kernel-hls';

// 配置参数
var chimeeOptions = {
    wrapper: '#player',
    poster: "/images/banner/poster.png",
    src: "",
    controls: true,
    autoplay: false,
    autoload: false,
    box: 'hls', // flv hls mp4 ,native
    kernels: {
        hls
    },
    isLive: true,
    crossOrigin: true
}

 chimeePlayer(url){
     let That = this;
     if (!window.chimeePlayer){
         window.chimeePlayer = new Chimee(That.chimeeOptions);
     }
     if ( window.chimeePlayer.src || url){
         window.chimeePlayer.load(url); //载入视频，也可以当做切换视频
     }
 },
```

