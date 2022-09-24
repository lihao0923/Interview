# Vue中watch与computed的区别

* computed能够监听vue数据上的变化，页面上来就执行一次，每改变一次数据就又触发，在操作数据的时候，会派生出另一个事情
* watch当指定数据发生变化时候触发触发，只有指。一开始不会定的数据发生变化就又触发一次
* watch可以deep深度添加，computed不可以
