> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 https://blog.csdn.net/qq_41950190/article/details/94558716?depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-8&utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-8

> **在 main.js 中判断是否需要登录**

```
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
      //这里判断用户是否登录，验证本地存储是否有token
      if (!localStorage.token) { // 判断当前的token是否存在
          next({
              path: '/login',
              query: { redirect: to.fullPath }
          })
      } else {
          next()
      }
  } else {
      next() // 确保一定要调用 next()
  }
})

```

> 在路由配置文件中 (router.js) 给需要登录的路由加一个 meta

```
{
      path: '/mint',
      component: Mint,
      meta: { requiresAuth: true } // 添加表示需要验证
    }


```