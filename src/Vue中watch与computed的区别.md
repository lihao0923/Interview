# Vue中watch与computed的区别

## 计算属性：

* 1.定义：要用的属性不存在，要通过已有属性计算得来。
* 2.原理：底层借助了Objcet.defineproperty方法提供的getter和setter。
* 3.computed的get函数什么时候执行:
(1).初次读取时会执行一次
(2).当依赖的数据发生改变时会被再次调用。

* 4.优势：与methods实现相比，内部有缓存机制（复用），效率更高，调试方便。


## 侦听属性watch：

* 1.当被监视的属性变化时, 回调函数自动调用, 进行相关操作
* 2.监视的属性必须存在，才能进行监视
* 3.监视的两种写法(1).new Vue时传入watch配置 (2).通过vm.$watch监视


## 简单比较：
计算属性computed支持缓存，watch不支持缓存
计算属性computed不能开启异步任务，而侦听属性watch可以


