# Vue双向数据绑定

Vue实现双向数据绑定是采用数据劫持和发布者-订阅者模式。
数据劫持是利用ES5的Object.defineProperty(obj, key, val)方法来劫持每个属性的getter和setter，
在数据变动时发布消息给订阅者，从而触发相应的回调来更新视图

## Vue在3.0版本上使用Proxy重构的原因

### 首先Object.defineProperty()的缺点:
* Object.defineProperty() 不会监测到数组引用不变的操作(比如push/pop等)
* Object.defineProperty() 只能监测到对象的属性的改变, 即如果有深度嵌套的对象则需要再次给之绑定

### Proxy的优点:
* 可以劫持数组的改变;
* defineProperty是对属性的劫持,Proxy是对对象的劫持;
