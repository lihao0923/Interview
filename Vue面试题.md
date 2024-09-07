


……………………………………………………………
VUE
……………………………………………………………

# 一、简述Vue等单页面应用及优缺点

* 含义：单页面应用，只有一个页面入口，用户所有的操作都在一个页面完成
* 优点：无刷新，用户体验好，共享资源只需要请求一次即可，采用组件化的思想，代码结构更加规范化，便于修改和调整
* 缺点：对搜索引擎不友好、低版本不支持，第一次加载首页耗时相对较长，不能使用浏览器导航按钮，需要自行实现前进后退


# 二、Vue父子组件生命周期执行/渲染顺序
* 在正常开发，挂载周期的执行顺序为：
    * 父beforeCreate => 父created => 父beforeMount => 子beforeCreate => 子created => 子beforeMount => 子mounted => 父mounted

* 在数据更新阶段执行顺序为：
    * 父beforeUpdate => 子beforeUpdate => 子updated => 父updated

* 在组件销毁阶段执行顺序为：
    * 父beforeDestroy => 子beforeDestroy => 子destroyed => 父destroyed

* 由此可见，其实所有周期规律就是：只要子组件被引入触发，所处不管任何周期都是父组件先开始执行，然后等到子组件执行完，父组件收尾。


# 三、Vue双向数据绑定

Vue实现双向数据绑定是采用数据劫持和发布者-订阅者模式。数据劫持是利用ES5的Object.defineProperty(obj, key, val)方法来劫持每个属性的getter和setter，
在数据变动时发布消息给订阅者，从而触发相应的回调来更新视图。

### Vue在3.0版本上使用Proxy重构的原因：

#### 1、首先Object.defineProperty()的缺点：
* Object.defineProperty() 不会监测到数组引用不变的操作(比如push/pop等)
* Object.defineProperty() 只能监测到对象的属性的改变，即如果有深度嵌套的对象则需要再次给之绑定

#### 2、Proxy的优点：
* 可以劫持数组的改变
* defineProperty是对属性的劫持，Proxy是对对象的劫持


# 四、路由守卫

#### 1、类型：
* 全局守卫：beforeEach（登录拦截）、afterEach
* 路由独享守卫：beforeEnter（部分路由的登录拦截）
* 组件内守卫：beforeRouteEnter（权限管理）、beforeRouteUpdate、beforeRouteLeave
* 路由全局解析守卫：beforeResolve（这里根据单页面name的指向不同，去访问的接口域名也不同）

#### 2、参数：
* 三个参数：to：去哪，from：从哪来，next：下一步


#### 3、当从a页面离开进入b页面时触发的生命周期：
* 1、beforeRouteLeave: 路由组件的组件离开路由前钩子，可取消路由离开。
* 2、beforeEach: 路由全局前置守卫，可用于登录验证、全局路由loading等。
* 3、beforeEnter: 路由独享守卫
* 4、beforeRouteEnter: 路由的组件进入路由前钩子。
* 5、beforeResolve: 路由全局解析守卫
* 6、afterEach: 路由全局后置钩子
* 7、beforeCreate: 组件生命周期，不能访问this。
* 8、created: 组件生命周期，可以访问this，不能访问dom。
* 9、beforeMount: 组件生命周期
* 10、deactivated: 离开缓存组件a，或者触发a的beforeDestroy和destroyed组件销毁钩子。
* 11、mounted: 访问/操作dom。
* 12、activated: 进入缓存组件，进入a的嵌套子组件(如果有的话)。
* 13、执行beforeRouteEnter回调函数next。


# 五、Vue中watch与computed的区别

#### 1、计算属性computed：
* 1、定义：要用的属性不存在，要通过已有属性计算得来
* 2、原理：底层借助了Object.defineproperty方法提供的getter和setter
* 3、computed的get函数什么时候执行: 1)初次读取时会执行一次 2)当依赖的数据发生改变时会被再次调用
* 4、优势：与methods实现相比，内部有缓存机制（复用），效率更高，调试方便。


#### 2、侦听属性watch：
* 1、当被监视的属性变化时, 回调函数自动调用, 进行相关操作
* 2、监视的属性必须存在，才能进行监视
* 3、监视的两种写法：1)new Vue时传入watch配置 2)通过vm.$watch监视

#### 3、比较：
* 计算属性computed支持缓存，watch不支持缓存
* 计算属性computed不能开启异步任务，而侦听属性watch可以


# 六、为什么不能v-for和v-if一起使用？
* v-for优先级是比v-if高
* 永远不要把 v-if 和 v-for 同时用在一个元素上，带来性能方面的浪费（每次渲染都会先循环再进行条件判断）
* 如果避免出现这种情况，则在外层嵌套 template （页面渲染不生成dom节点），再这一层进行 v-if 判断，然后再内部进行 v-for 循环


# 七、Vue中key的作用是什么，index和id哪个更好
* key是为每个vnode指定唯一的id，在同级vnode的Diff过程中，可以根据key快速的进行对比，来判断是否为相同节点，
* 利用key的唯一性生成map对象来获取对应节点，比遍历方式更快，
* 指定key后，可以保证渲染的准确性(尽可能的复用DOM元素)赋值时应优先使用id。

# 八、diff算法如何比较？
* 只对同级比较，跨层级的dom不会进行复用
* 不同类型节点生成的dom树不同，此时会直接销毁老节点及子孙节点，并新建节点
* 可以通过key来对元素diff的过程提供复用的线索
* 单节点diff，单点diff有如下几种情况：
    * key和type相同表示可以复用节点
    * key不同直接标记删除节点，然后新建节点
    * key相同type不同，标记删除该节点和兄弟节点，然后新创建节点
    

# 九、Vuex刷新数据丢失问题出在哪里?
* 因为js代码运行在内存中，代码运行时所有的变量和函数都是保存在内存中的，但我们按下F5的时候以前申请的内存将会被释放，并会被重新加载js脚本，变量重新赋值。
所以在我们使用vuex的时候只要一刷新数据就没了。
* 如果我们想要持久化保存可以使用localStorage或者sessionStorage存储本地数据保证刷新后数据不会丢失。

#### 使用本地存储：

    import Vue from 'vue'
    import Vuex from 'vuex'
    Vue.use(Vuex)
    export default new Vuex.Store({
      state: {
        // 直接使用本地存储的方式
        name: JSON.parse(sessionStorage.getItem('name')) || 'name'
      },
      mutations: {
        set(state, data) {
          // 修改数据的时候直接存到本地
          sessionStorage.setItem('name', JSON.stringify(data))
          state.name = data
        }
      },
    })

#### 使用插件方式：

    npm install vuex-persistedstate --save

    import Vue from 'vue'
    import Vuex from 'vuex'
    import createPersistedState from 'vuex-persistedstate' // 配置插件vuex-persistedstate插件
    
    Vue.use(Vuex)
    export default new Vuex.Store({
      plugins: [createPersistedState()],
      state: {
        name: 'name'
      },
      mutations: {
        set(state, data) {
          state.name = data
        }
      }
    })


# 十、Vue组件之间传值方法总结

* 属性传递
* 发布订阅（EventBus）: $on/$emit
* Provide/ Inject
* slot
* $parent/$children
* vuex

# 十一、$nextTick原理分析
* this.$nextTick可以让我们在下次DOM更新循环结束之后执⾏延迟回调，⽤于获得更新后的DOM。

* 在Vue2.4之前都是使⽤的微任务（microtasks），但是微任务的优先级过⾼，在某些情况下可能会出现⽐事件冒泡更快的情况，但如果都使⽤宏任务（macrotasks）⼜可能会出现渲染的性能问题。所以在新版本中，会默认使⽤微任务，但在特殊情况下会使⽤宏任务，⽐如v-on。

* 对于实现宏任务，会先判断是否能使⽤setImmediate，不能的话降级为MessageChannel ，以上都不⾏的话就使⽤setTimeout。

