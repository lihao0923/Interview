# Vue的父组件和子组件生命周期钩子函数执行顺序

## 1、加载渲染过程
```
父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted
```
## 2、子组件更新过程
```
父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated
```
## 3、父组件更新过程
```
父 beforeUpdate -> 父 updated
```
## 4、销毁过程
```
父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed
```


**由此可见，其实所有周期规律就是：只要子组件被引入触发，所处不管任何周期都是父组件先开始执行，然后等到子组件执行完，父组件收尾。**


