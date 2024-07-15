# Vue 三步实现路由懒加载

#### 1、安装依赖包：@babel/plugin-syntax-dynamic-import

#### 2、在babel：config.js配置文件中声明该插件

#### 3、将路由改为按需加载的形式
const Foo=>import(/* webpackchunkName: 'group-foo' */, './Foo.vue')
