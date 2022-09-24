# React生命周期

## 初始化阶段：
* getDefaultProps：获取实例的默认属性
* getInitialState：获取每个实例的初始化状态
* componentWillMount：组件即将被装载、渲染到页面上
* render：组件在这里生成虚拟的DOM节点
* componentDidMount：组件真正在被装载之后

## 运行中状态：
* componentWillReceiveProps：组件将要接收到属性的时候调用
* shouldComponentUpdate：组件接受到新属性或者新状态的时候（可以返回false，阻止render调用）
* componentWillUpdate：组件即将更新不能修改属性和状态
* render：组件重新描绘
* componentDidUpdate：组件已经更新

## 销毁阶段：
* componentWillUnmount：组件即将销毁(清除定时器，销毁一些内存占用)


## 在React16废除以下三个生命周期
* 废弃的原因，是在React16的Fiber架构中，可以中间进行暂停重启操作，调和过程会多次执行will周期，不再是一次执行，失去了原有的意义。此外，多次执行，在周期中如果有setState或dom操作，会触发多次重绘，影响性能，也会导致数据错乱。 因而会有UNSAFE开头。
componentWillMount, componentWillReceiveProps, componentWillUpdate(UNSAFE_)

## 两个新的生命周期
* getDerivedStateFromProps：该生命周期是从父获取数据时使用的，返回一个新状态和页面当前状态组合
* getSnapshotBeforeUpdate：从字面理解在更新前获取当前dom结构的快照，拿到更新前页面的各种状态。例如你在渲染前浏览器滚动条scrollTop，更新后会变化，你就可以记住当前状态进行计算。
