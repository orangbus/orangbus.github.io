> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 https://somsan.cc/archives/770352bb/

```
/**
 * 通过Token获取用户信息
 * @param $token
 * @return array|false|\PDOStatement|string|\think\Model
 */
protected function getUser($token = ''){

    if ($token == ''){
        if (empty($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])){
            $this->returnMsg(false, 'Token缺失', 10001, [], 401);
        }else{
            $token = $_SERVER['REDIRECT_HTTP_AUTHORIZATION'];  //从header中接收token
        }
    }

    try
    {
        //从token中取出数据
        $jwt_data = JWT::decode($token, '这里是秘钥，自己随便填写（zzz）', array('HS256'));
        //获取用户信息
        $user_info = User::find($jwt_data->data->userId); 

        if (empty($user_info))  $this->returnMsg(false, '用户不存在', 10004, [], 401);
        if ($user_info->status == -1) $this->returnMsg(false, '用户已被禁用', 10005, [], 401);

        return $user_info;

    }catch(\Exception $e){
        //通过捕获异常来判断app是否需要重新登陆获取token
        if ($e->getMessage() == 'Expired token'){

            $this->returnMsg(false, 'Token过期', 10003, [], 401); //token过期
        }else{
            $this->returnMsg(false, 'Token错误', 10002, [], 401);
        }
        //后面还有其他错误，这里不进行一一说明
    }
}
```

好了，现在给予 token 的 app 保持用户状态已经基本可以用了，需要获取用户信息的时候，直接调用 `getUser()`方法，该方法会自动判断用户状态，如果没有登录或者没有请求 token，会自动反馈给 APP，APP 自动跳转到登录页面。