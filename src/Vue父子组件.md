# Vue父子组件生命周期执行/渲染顺序

## 在正常开发，挂载周期的执行顺序为：
父beforeCreate => 父created => 父beforeMount => 子beforeCreate => 子created => 子beforeMount => 子mounted => 父mounted

## 在数据更新阶段执行顺序为：
父beforeUpdate => 子beforeUpdate => 子updated => 父updated

## 在组件销毁阶段执行顺序为：
父beforeDestroy -> 子beforeDestroy -> 子destroyed -> 父destroyed

## 由此可见，其实所有周期规律就是：只要子组件被引入触发，所处不管任何周期都是父组件先开始执行，然后等到子组件执行完，父组件收尾。
