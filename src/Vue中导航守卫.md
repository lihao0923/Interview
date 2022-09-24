
# 路由守卫

## 类型
全局守卫：beforeEach（登录拦截）、afterEach

路由独享守卫：beforeEnter（部分路由的登录拦截）

组件内守卫：beforeRouteEnter（权限管理）、beforeRouteUpdate、beforeRouteLeave

路由全局解析守卫：beforeResolve（这里根据单页面name的指向不同，去访问的接口域名也不同）

## 参数
三个参数：to：去哪，from：从哪来，next：下一步


## 当从a页面离开进入b页面时触发的生命周期
* 1.beforeRouteLeave:路由组件的组件离开路由前钩子，可取消路由离开。
* 2.beforeEach: 路由全局前置守卫，可用于登录验证、全局路由loading等。
* 3.beforeEnter: 路由独享守卫
* 4.beforeRouteEnter: 路由的组件进入路由前钩子。
* 5.beforeResolve:路由全局解析守卫
* 6.afterEach:路由全局后置钩子
* 7.beforeCreate:组件生命周期，不能访问this。
* 8.created:组件生命周期，可以访问this，不能访问dom。
* 9.beforeMount:组件生命周期
* 10.deactivated: 离开缓存组件a，或者触发a的beforeDestroy和destroyed组件销毁钩子。
* 11.mounted:访问/操作dom。
* 12.activated:进入缓存组件，进入a的嵌套子组件(如果有的话)。
* 13.执行beforeRouteEnter回调函数next。
