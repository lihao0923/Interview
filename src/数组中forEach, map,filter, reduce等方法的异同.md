# 数组中forEach, map,filter, reduce等方法的异同

## 1.相同点

* map、filter、forEach执行匿名函数支持三个参数，分别是：当前元素、当前元素索引、当前元素所属的数组
* 匿名函数this指向window
* 只能遍历数组
## 2.不同点

* map速度比forEach快
* map和filter返回新数组，不会影响原数组；forEach不会产生新数组，返回undefined，reduce把数组缩减为一个值（求和，求积）
* reduce有4个参数，第一个为初始值
