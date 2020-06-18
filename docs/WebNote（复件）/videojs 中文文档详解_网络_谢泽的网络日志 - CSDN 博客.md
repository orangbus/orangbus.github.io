> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 https://blog.csdn.net/a0405221/article/details/80923090

> 最近弄视频直播，网上没有全面的中文文档，只好自己整理了一份详细的 api。Video.js 是一款 web 视频播放器，支持 html5 和 flash 两种播放方式。更有自定义皮肤，插件，组件，语言还有丰富的选项配置。

[官方网站](http://docs.videojs.com/index.html)  
[下载最新版 videojs](https://github.com/videojs/video.js/releases)

入门使用
----

[查看 DEMO](http://xieze.gitee.io/videojs) | [DEMO 下载](https://gitee.com/xieze/videojs)

1.  引入 video.js 和 video-js.css

```
<link href="https://cdnjs.cloudflare.com/ajax/libs/video.js/7.3.0/video-js.min.css" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/video.js/7.3.0/video.min.js"></script>

```

2.  使用 video 标签就像下面这样：

```
  <video controls preload="none" width="640" height="264"
         poster="http://vjs.zencdn.net/v/oceans.png">
    <source src="http://vjs.zencdn.net/v/oceans.mp4" type="video/mp4">
  </video>

```

3.  videojs 使用方式就是以类似的方式开始的，不过由于我们借助 videojs 对视频进行一些控制或制定

```
var player = videojs('example_video_1',{
    muted: true,
	controls : true/false,      
	height:300, 
	width:300,
	loop : true,
	// 更多配置.....
});

```

### 常用事件

1.  播放 this.play()
2.  停止 – video 没有 stop 方法，可以用 pause 暂停获得同样的效果
3.  暂停 this.pause()
4.  销毁 this.dispose()
5.  监听 this.on(‘click‘,fn)
6.  触发事件 this.trigger(‘dispose‘)

```
var options = {};
 
var player = videojs(‘example_video_1‘, options, function onPlayerReady() {
  videojs.log(‘播放器已经准备好了!‘);
 
  // In this context, `this` is the player that was created by Video.js.<br>  // 注意，这个地方的上下文， `this` 指向的是Video.js的实例对像player
  this.play();
 
  // How about an event listener?<br>  // 如何使用事件监听？
  this.on(‘ended‘, function() {
    videojs.log(‘播放结束了!‘);
  });
});

```

### 常用选项

autoplay : true/false 播放器准备好之后，是否自动播放 【默认 false】  
controls : true/false 是否拥有控制条 【默认 true】, 如果设为 false , 那么只能通过 api 进行控制了。也就是说界面上不会出现任何控制按钮  
height: 视频容器的高度，字符串或数字 单位像素 比如： height:300 or height:‘300px‘  
width: 视频容器的宽度, 字符串或数字 单位像素  
loop : true/false 视频播放结束后，是否循环播放  
muted : true/false 是否静音  
poster: 播放前显示的视频画面，播放开始之后自动移除。通常传入一个 URL  
preload: 预加载  
‘auto‘ 自动  
’metadata‘ 元数据信息 ，比如视频长度，尺寸等  
‘none‘ 不预加载任何数据，直到用户开始播放才开始下载  
children: Array | Object 可选子组件 从基础的 Component 组件继承而来的子组件，数组中的顺序将影响组件的创建顺序哦。

### options 选项

**标准元素选项**  
这些选项中的每一个也可用作标准元素属性 ; 因此，可以使用设置指南中列出的所有三种方式定义它们。通常，未列出默认值，因为这是留给浏览器供应商的。

#### autoplay

类型： boolean  
如果 true / 作为属性存在，则在播放器准备就绪时开始播放。

注意：从 iOS 10 开始，Apple autoplay 在 Safari 中提供支持。有关详细信息，请参阅 “新增功能。

#### controls

类型： boolean  
确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用 autoplay 属性或通过 Player API。

#### height

类型： string|number  
设置视频播放器的显示高度（以像素为单位）。

#### loop

类型： boolean  
使视频一结束就重新开始。

#### muted

类型： boolean  
默认情况下会静音任何音频。

#### poster

类型： string  
在视频开始播放之前显示的图像的 URL。这通常是视频的框架或自定义标题屏幕。一旦用户点击 “播放”，图像就会消失。

#### preload

类型： string  
建议浏览器是否应在加载元素后立即开始下载视频数据。支持的值是：  
‘auto’  
立即开始加载视频（如果浏览器支持）。某些移动设备不会预加载视频，以保护用户的带宽 / 数据使用。这就是为什么这个价值被称为’汽车’，而不是更具决定性的东西’true’。  
这往往是最常见和推荐的值，因为它允许浏览器选择最佳行为。  
‘metadata’  
仅加载视频的元数据，其中包括视频的持续时间和尺寸等信息。有时，元数据将通过下载几帧视频来加载。  
‘none’  
不要预加载任何数据。浏览器将等待用户点击 “播放” 开始下载。

#### src

类型： string  
要嵌入的视频源的源 URL。

#### width

类型： string|number  
设置视频播放器的显示宽度（以像素为单位）。

### Video.js 特定的选项

undefined 除非另有说明，否则默认情况下每个选项

#### aspectRatio

类型： string  
将播放器置于流体模式，并在计算播放器的动态大小时使用该值。该值应表示比率 - 由冒号（例如 "16:9" 或 "4:3"）分隔的两个数字。

#### autoSetup

类型： boolean  
阻止播放器为具有 data-setup 属性的媒体元素运行 autoSetup 。

注意：必须在与 videojs.options.autoSetup = falsevideojs 源加载生效的同一时刻全局设置。

#### children

类型： Array|Object  
此选项继承自基 Component 类。

#### fluid

类型： boolean  
何时 true，Video.js 播放器将具有流畅的大小。换句话说，它将扩展以适应其容器。

此外，如果元素具有 "vjs-fluid"，则此选项自动设置为 true。

#### inactivityTimeout

类型： number  
Video.js 表示用户通过 "vjs-user-active" 和 "vjs-user-inactive" 类以及 "useractive" 事件与玩家进行交互。

在 inactivityTimeout 决定了不活动的许多毫秒声明用户闲置之前是必需的。值为 0 表示没有 inactivityTimeout，用户永远不会被视为非活动状态。

#### language

键入：string，默认值：浏览器默认值或’en’  
与播放器中的一种可用语言匹配的语言代码。这为播放器设置了初始语言，但始终可以更改。

在 Video.js 中了解有关语言的更多信息。

#### languages

类型： Object  
自定义播放器中可用的语言。此对象的键将是语言代码，值将是具有英语键和翻译值的对象。

在 Video.js 中了解有关语言的更多信息

注意：通常，不需要此选项，最好将自定义语言传递给 videojs.addLanguage() 所有玩家！

#### nativeControlsForTouch

类型： boolean  
明确设置关联技术选项的默认值。

#### notSupportedMessage

类型： string  
允许覆盖 Video.js 无法播放媒体源时显示的默认消息。

#### playbackRates

类型： Array  
严格大于 0 的数字数组，其中 1 表示常速（100％），0.5 表示半速（50％），2 表示双速（200％）等。如果指定，Video.js 显示控件（类 vjs-playback-rate）允许用户从选择数组中选择播放速度。选项以从下到上的指定顺序显示。

例如：

```
videojs('my-player', {
  playbackRates: [0.5, 1, 1.5, 2]
});

```

#### plugins

类型： Object  
这支持在初始化播放器时使用自定义选项自动初始化插件 - 而不是要求您手动初始化它们。

```
videojs('my-player', {
  plugins: {
    foo: {bar: true},
    boo: {baz: false}
  }
});

```

以上大致相当于：

```
var player = videojs('my-player');

player.foo({bar: true});
player.boo({baz: false});

```

虽然，由于 plugins 选项是对象，因此无法保证初始化顺序！

有关 Video.js 插件的更多信息，请参阅插件指南。

#### sources

类型： Array

一组对象，它们反映了本机元素具有一系列子元素的能力。这应该是带有 src 和 type 属性的对象数组。例如：

```
videojs('my-player', {
  sources: [{
    src: '//path/to/video.mp4',
    type: 'video/mp4'
  }, {
    src: '//path/to/video.webm',
    type: 'video/webm'
  }]
});

```

使用元素将具有相同的效果：

```
<video ...>
  <source src="//path/to/video.mp4" type="video/mp4">
  <source src="//path/to/video.webm" type="video/webm">
</video>

```

#### techCanOverridePoster

类型： boolean

使技术人员有可能覆盖玩家的海报并融入玩家的海报生命周期。当使用多个技术时，这可能很有用，每个技术都必须在播放新源时设置自己的海报。

#### techOrder

输入：Array，默认值：[‘html5’]

定义 Video.js 技术首选的顺序。默认情况下，这意味着 Html5 首选技术。其他注册的技术将在此技术之后按其注册顺序添加。

#### vtt.js

类型： string

允许覆盖 vtt.js 的默认 URL，该 URL 可以异步加载到 polyfill 支持 WebVTT。

此选项将用于 Video.js（即 video.novtt.js）的 “novtt” 版本中。否则，vtt.js 与 Video.js 捆绑在一起。

### 组件选项

Video.js 播放器是一个组件。与所有组件一样，您可以定义它包含的子项，它们出现的顺序以及传递给它们的选项。

这是一个快速参考; 因此，有关 Video.js 中组件的更多详细信息，请查看组件指南。

#### children

类型： Array|Object

如果 Array- 这是默认值 - 这用于确定哪些子节点（按组件名称）以及在播放器（或其他组件）上创建它们的顺序：

```
// The following code creates a player with ONLY bigPlayButton and
// controlBar child components.
videojs('my-player', {
  children: [
    'bigPlayButton',
    'controlBar'
  ]
});

```

该 children 选项还可以作为传递 Object。在这种情况下，它用于提供 options 任何 / 所有孩子，包括禁用它们 false：

```
// This player's ONLY child will be the controlBar. Clearly, this is not the
// ideal method for disabling a grandchild!
videojs('my-player', {
  children: {
    controlBar: {
      fullscreenToggle: false
    }
  }
});

```

#### ${componentName}

类型： Object

可以通过组件名称的低驼峰案例变体（例如 controlBarfor ControlBar）为组件提供自定义选项。这些可以嵌套在孙子关系的表示中。例如，要禁用全屏控件：

```
videojs('my-player', {
  controlBar: {
    fullscreenToggle: false
  }
});

```

技术选择

#### ${techName}

类型： Object

Video.js 回放技术（即 “技术”）可以作为传递给该 videojs 功能的选项的一部分给予自定义选项。它们应该在技​​术名称的小写变体下传递（例如 "flash" 或 "html5"）。

#### flash

swf  
指定 Video.js SWF 文件在 Flash 技术位置的位置：

```
videojs('my-player', {
  flash: {
    swf: '//path/to/videojs.swf'
  }
});

```

但是，更改全局默认值通常更合适：

videojs.options.flash.swf = ‘//path/to/videojs.swf’  
html5

#### nativeControlsForTouch

类型： boolean

只有技术支持 Html5，此选项可以设置 true 为强制触摸设备的本机控件。

#### nativeAudioTracks

类型： boolean

可以设置为 false 禁用本机音轨支持。最常用于 videojs-contrib-hls。

#### nativeTextTracks

类型： boolean

可以设置为 false 强制模拟文本轨道而不是本机支持。该 nativeCaptions 选项也存在，但只是一个别名 nativeTextTracks。

#### nativeVideoTracks

类型： boolean

可以设置为 false 禁用本机视频轨道支持。最常用于 videojs-contrib-hls。  
.