# Vue3的setup生命周期函数中为什么不能使用this？


> 官方解释：在setup()内部，this不会是该活跃实例的引用，因为setup()是在解析其它组件选项之前被调用的，所以setup()内部的this的行为与其它选项中的this完全不同。这在和其它选项式API一起使用setup()时可能会导致混淆。

> 简单理解：this未指向当前的组件实例，在setup被调用之前，data，methods，computed等都没有被解析，但是组件实例确实在执行setup函数之前就已经被创建好了。照理来说通过newVue()创建vue实例后应该进入beforeCreate生命周期，但是setup的执行时机是在beforeCreate之前的，并且在setup执行的时候组件实例还未创建完毕，故也不能使用data，methods，computed定义的变量和函数，此时this是undefined。

* setup生命周期函数在整个调用和处理的过程中根本没有绑定this，此时this并不指向实例，为避免混淆，Vue3将setup中的this置为了undefined。

