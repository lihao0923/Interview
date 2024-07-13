# Vue3.0新特性
```
1、performance
2、tree-shaking
3、composition API
4、fragment，teleport，suspense
5、better typescript support
6、custom renderer API
```
## 1、performance（性能）
**（1）重写虚拟dom（rewrite virtual dom implementation）**

保留virtual dom是因为：
* a.保留兼容性能；
* b.提供了很好的，在模版之外进行的更复杂灵活的逻辑处理能力；

**（2）静态提升的方面**
* a.优化虚拟dom的diff算法，vue2是做的全面的比较，而vue3新增了静态标记，做diff比较时会判断有静态节点的不做。

* b.静态节点提升 应用启动时创建一次，这些节点每次渲染可以进行复用，所以在大项目中使用时，对内存是一个很大对改进。

* c.事件侦听器的缓存（例如在组件中，父组件更新子组件一定更新，再次动态绑定事件，但是子组件的事件没有做更新，所以增加了事件侦听器的缓存，在react hooks中也有这样的思想，比如使用useMemo包一层）。

* d.如果静态的节点足够深，vue会直接创建出一个inner html， 不需要经过虚拟dom这一层，也就是当静态树足够大的时候会启用这样的优化。

* e.vue ssr性能提高。


## 2、tree-shaking
three-shaking的前提是所有的module都必须用es module来写。vue3.0做了这方面的优化，使得vue整体的打包变小。

## 3、composition API
不影响vue2.x的API的使用，可以理解为新增的API，也可以与已有的API一起使用，在vue2.x的时候抽取复用的逻辑可能使用maxin，但是在vue3中要使用composition API。

## 4、fragment（碎片）
对于终端用户来说其实是无感知的，vue2必须只能有一个根节点，但是在vue3中可以是多个跟节点，vue会自动处理为一个碎片。

## 5、better typescript support
vue3是用ts开发的，终端用户可以使用ts，也可以不使用，如果想使用ts会有更好的体验。

**注意：**
（1）因为vue3的响应使用了es6的proxy， 但是在IE11中不支持，所以vue3对IE11做了特别的处理，会有一个单独的支持IE11的build，可以选择不同的build，如果不需要支持IE11，直接使用原生proxy的版本，需要支持IE11的版本会同时有基于proxy的响应侦测和基于defineproperties的响应侦测，在支持proxy的浏览器中会使用proxy的响应侦测，因为proxy 的性能更好一些，像IE11不支持proxy的浏览器中会使用基于defineproperties的响应侦测。当使用支持IE11的build时候，如果是在chrome浏览器中开发的，使用了一些IE11不支持的特性的时候会给出一个警告，避免开发时候忽略一些注意点。

（2）如果当前公司使用的是vue2并且项目是非常稳定的，不要立即升级为vue3，可能会有一些问题，如果没有对vue3新增特性的需求，也可以仍然使用vue2，vue3是兼容vue2。如果有需求使用vue3的特性并且当前的项目是已经存在的，可以考虑先使用composition API并且结合vue2专门定制的版本做升级。如果是前端项目是从0到1的开发，vue3也是前端技术发展的趋势，推荐直接使用vue3+ts进行构建。
