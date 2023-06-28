---
title: Laravel扩展包推荐
---

# ip地址信息

https://github.com/zoujingli/ip2region

```bash
composer require zoujingli/ip2region
```

## 在项目中快速调用

```php
$ip2region = new \Ip2Region();
$result = $ip2region->simple('8.8.8.8');
var_dump($result);
```

## 封装方法

```php
public static function getIpInfo($ip)
    {
        $app= new \Ip2Region();
        $result =$app->btreeSearch($ip);
        $data = explode("|", $result["region"]);
        $param['country'] = $data[0] ?? "";
        $param['region'] = $data[2] ?? '';
        $param['city'] = $data[3] ?? '';
        $param['isp'] = $data[4] ?? '';
        return $param;
    }
```

