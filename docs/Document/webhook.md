使用github的webhook自动部署项目

```php
<?php

// 1. sudo mkdir /var/www/.ssh
// 2. sudo chown -R www-data:www-data /var/www/.ssh/
// 3. ssh-keygen -t rsa -C "your_github_email"  在 home 目录执行
// 4. cd /var/www 然后执行  sudo -Hu www-data ssh-keygen -t rsa
// 5. sudo cat /var/www/.ssh/id_rsa.pub 这是部署公钥
// 6. git config --global user.name "JellyBool"    git config --global user.email "your_github@email"
// 7. sudo -Hu www-data git clone git@github.com:JellyBool/laravel-ubuntu.git
// 8. 普通的 php 项目，可以直接使用 $headers = getallheaders();
// 9. $signature = $headers['X-Hub-Signature'];
// 10. routes 文件的配置： Route::post('/deploy','DeploymentController@deploy');
// 11. csrf 路由 
/*
    protected $except = [
        'deploy'
    ];
*/

public function deploy(Request $request)
{
    $commands = ['cd /var/www/laravel-ubuntu', 'git pull'];
    $signature = $request->header('X-Hub-Signature');
    $payload = file_get_contents('php://input');
    if ($this->isFromGithub($payload, $signature)) {
        foreach ($commands as $command) {
            shell_exec($command);
        }
        http_response_code(200);
    } else {
        abort(403);
    }
}

private function isFromGithub($payload, $signature)
{
    return 'sha1=' . hash_hmac('sha1', $payload, env('GITHUB_DEPLOY_TOKEN'), false) === $signature;
}
```

