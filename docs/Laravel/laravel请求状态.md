## laravel请求状态统一管理

我们新建一个 `trait`

```php
<?php
/**
 * Created by OragBus
 * User email: orangbus40400@gmail.com
 * website: orangbus.cn
 * blog: doc.orangbus.cn
 * github: github.com/orangbus
 */
namespace App\Traits;

trait ResponseData{
    /**
     * 成功返回消息
     * @param string $msg
     * @param array $data
     * @param int $code
     * @return \Illuminate\Http\JsonResponse
     */
    public function success($msg="ok",$data=[],$code=200){
        if (!empty($data)) return response()->json(["code"=>$code,"data"=>$data,"msg"=>$msg]);
        return response()->json(["code"=>$code,"msg"=>$msg]);
    }
    /**
     * 失败返回消息
     * @param string $msg
     * @param int $code
     * @return \Illuminate\Http\JsonResponse
     */
    public function error($msg="请求错误",$code=202){
        return response()->json(["code"=>$code,"msg"=>$msg]);
    }

    /**
     * 数据返回
     * @param array $data
     * @param string $count
     * @param string $msg
     * @param int $code
     * @return \Illuminate\Http\JsonResponse
     */
    public function resData($data=[],$count = '',$msg="ok",$code=0){
        if (empty($count)) return response()->json(["code"=>$code,"msg"=>$msg,"data"=>$data]);
        return response()->json(["code"=>$code,"data"=>$data,"count"=>$count,"msg"=>$msg]);
    }

}

```

我们在父级的controller中引用这个trait即可： `ResponseData` , 

```
namespace App\Http\Controllers;
class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests, ResponseData;
*****************
```

Ps: 这个是在执行：`php artisan make:controller UserTest` 之后，laravel默认继承的那个controller

resources/js/bootstrap.js

```js
// 定义前后端返回状态码统一处理
import responseCode from "./responseCode";

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 请求返回状态码不是 200 统一处理
    if (response.status !== 200){
        switch (response.status) {
            case 419:
                layer.alert("登录失效，请重新登录",function () {
                    window.location.reload(); //跳转登录
                });
                break;
            case 401:
                layer.alert("你没有操作权限！");
                return false;
                break;
        }
        console.log(response);

    }
    // 自定义返回状态返回统一处理
    let responseData = response.data;
    switch (responseData.code) {
        case responseCode.success || responseCode.layuiGetDataResponseCode: //成功请求返回结果
            return responseData;
            break;
        case responseCode.error: //失败请求统一处理
            layer.alert(responseData.msg);
            break;
        default:
            return response;
            break;
    }
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
```

responseCode.js

```js
/**
 * 前后端状态码统一规范
 * @type {{success: number, layuiGetDataResponseCode: number, error: number}}
 */
const responseCode = {
    success: 200,//请求成功
    error: 202,// 请求失败
    layuiGetDataResponseCode: 0,//layui后台获取数据成功
}

export default responseCode;
```

