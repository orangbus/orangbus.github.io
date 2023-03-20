---
title: minio 对象存储
---



# laravel 9对接minio存储

> 1、默认你已经安装好了minio
>
> 2、登录后台创建一个 BUCKET 桶

安装扩展

```bash
composer require -W league/flysystem-aws-s3-v3 "^3.0"
```

示例代码

```
AWS_ACCESS_KEY_ID=you-minio-username
AWS_SECRET_ACCESS_KEY=you-minio-password
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=web
AWS_USE_PATH_STYLE_ENDPOINT=false
AWS_ENDPOINT=http://192.168.2.1:9000
CDN_HOST=http://cdn.domain.com
```

```php
<?php

namespace App\Http\Controllers\Upload;

use App\Http\Controllers\Controller;
use App\Utils\AssertUtils;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class Index extends Controller
{
    public function upload()
    {
        $file = \request()->file("file");
        AssertUtils::isNull($file,"请选择文件");
        AssertUtils::isTrue(!$file->isValid(),"文件无效");

        // 文件类型
        $fileType = explode("/", $file->getClientMimeType())[0];
        $ext = $file->getClientOriginalExtension();
        AssertUtils::isTrue(!in_array($ext, self::enableUploadExt()), '该文件不支持上传');

        // 上传文件大小限制为2m
        $fileSize = round($file->getSize() / 1024, 2);
        AssertUtils::isTrue($fileSize > 5 * 1024, "文件大小不能超过5M");

        // 非登录用户禁止上传文件 (不需要登录验证可删除)
        $user = \request()->user();
        AssertUtils::isTrue(is_null($user), "禁止上传文件");

        $path = Storage::disk(self::getOssType())->put(self::getFileDist($fileType),$file);
        return $this->resData([
            "name" => $file->getClientOriginalName(),
            "size" => ($file->getSize() / 1024 * 1024),
            "url" => env("CDN_HOST") . "/" . self::backetName() . "/" . $path,
            "fileType" => $fileType
        ]);
    }

    public function delete()
    {
        $url = \request("url");
        if (is_null($url)) return $this->error("文件名不能为空");
        $explode = explode("/", $url);
        $fileName = "/" . implode("/", array_splice($explode, 4, 6));
        // 判断文件是否存在
        $existFile = Storage::disk(self::getOssType())->exists($fileName);
        if (!$existFile) {
            return $this->success("文件不存在！");
        }
        Storage::disk(self::getOssType())->delete($fileName);
        return $this->success("删除成功！");
    }

    /**
     * 文件存储桶
     */
    private static function backetName()
    {
        return env("AWS_BUCKET");
    }

    /**
     * 文件存储方式
     * @return string
     */
    private static function getOssType()
    {
        return 's3';
    }

    /**
     * 允许文件上传的后缀
     * @return string[]
     */
    private static function enableUploadExt()
    {
        $string = "jpg|png|jpeg|zip|pdf";
        return explode("|", $string);
    }

    /**
     * 获取存储分类文件夹
     * @return string
     */
    private static function getFileDist($fileType = "image")
    {
        switch ($fileType) {
            case "image":
                $disk = "images";
                break;
            case "video":
                $disk = "videos";
                break;
            case "audio":
                $disk = "audios";
                break;
            case "private": //重要文件
                $disk = "private";
                break;
            default:
                $disk = "others";
                break;
        }
        return $disk;
    }
}

```

