---
title: Swoole
---



```js
var webSocket = new WebSocket("ws://localhost:9502");
//连接
webSocket.onopen = function (event) {
    layer.msg("content is ok!");
    return false;
};
//接收消息
webSocket.onmessage = function(event){
    console.log(event.data);
};
//关闭
webSocket.onclose = function(event){
    layer.msg("关闭连接!");
    return false;
};
//错误信息
webSocket.onerror = function (event) {
    layer.msg("网络错误!");
    return false;
};
// 发送消息
$("#send-submit").click(function () {
    let data = $("#sendMsg").val();
    webSocket.send(data);
    layer.msg(data);
});
```

