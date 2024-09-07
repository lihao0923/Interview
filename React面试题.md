
……………………………………………………………
REACT
……………………………………………………………

# 一、React生命周期

#### 1、初始化阶段：
* getDefaultProps：获取实例的默认属性
* getInitialState：获取每个实例的初始化状态
* componentWillMount：组件即将被装载、渲染到页面上
* render：组件在这里生成虚拟的DOM节点
* componentDidMount：组件真正在被装载之后

#### 2、运行中状态：
* componentWillReceiveProps：组件将要接收到属性的时候调用
* shouldComponentUpdate：组件接受到新属性或者新状态的时候（可以返回false，阻止render调用）
* componentWillUpdate：组件即将更新不能修改属性和状态
* render：组件重新描绘
* componentDidUpdate：组件已经更新

#### 3、销毁阶段：
* componentWillUnmount：组件即将销毁(清除定时器，销毁一些内存占用)

#### 4、在React16废除以下三个生命周期：componentWillMount，componentWillReceiveProps，componentWillUpdate
* 废弃的原因，是在React16的Fiber架构中，可以中间进行暂停重启操作，调和过程会多次执行will周期，不再是一次执行，失去了原有的意义。
* 此外，多次执行，在周期中如果有setState或dom操作，会触发多次重绘，影响性能，也会导致数据错乱。 因而会有UNSAFE开头。

#### 5、两个新的生命周期
* getDerivedStateFromProps：该生命周期是从父获取数据时使用的，返回一个新状态和页面当前状态组合
* getSnapshotBeforeUpdate：从字面理解在更新前获取当前dom结构的快照，拿到更新前页面的各种状态。例如你在渲染前浏览器滚动条scrollTop，更新后会变化，你就可以记住当前状态进行计算。


#  二、对于store的理解
#### Store是reach项目的中央仓库，是把action，reducer联系到一起的对象。Store 有以下职责：

* 维持应用的state
* 提供getState() 方法获取state
* 提供dispatch(action)方法更新state
* 通过subscribe(listener)注册监听器

# 三、React Hook 的使用限制有哪些？
#### React Hooks 的限制主要有两条：
* 不要在循环、条件或嵌套函数中调用 Hook
* 在React的函数组件中调用Hook


# 四、Redux的三大原则
#### 单一数据源
* 整个应用的state被存储在一个object tree中，并且这个object tree只存在于唯一一个store中

#### state是只读的
* 唯一改变state的方式是触发action，action是一个用于描述已经发生事件的普通对象，这个保证了视图和网络请求都不能直接修改state，相反他们只能表达想要修改的意图

#### 使用纯函数来执行修改state
* 为了描述action如何改变state tree 需要编写reduce


# 五、对虚拟DOM的理解？
* 从本质上来说，Virtual Dom是一个JavaScript对象，通过对象的方式来表示DOM结构。将页面的状态抽象为JS对象的形式，配合不同的渲染工具，使跨平台渲染成为可能。通过事务处理机制，将多次DOM修改的结果一次性的更新到页面上，从而有效的减少页面渲染的次数，减少修改DOM的重绘重排次数，提高渲染性能。
* 虚拟DOM是对DOM的抽象，这个对象是更加轻量级的对DOM的描述。它设计的最初目的，就是更好的跨平台，比如node.js就没有DOM，如果想实现SSR，那么一个方式就是借助虚拟dom，因为虚拟dom本身是js对象。 在代码渲染到页面之前，vue或者react会把代码转换成一个对象（虚拟DOM）。以对象的形式来描述真实dom结构，最终渲染到页面。在每次数据发生变化前，虚拟dom都会缓存一份，变化之时，现在的虚拟dom会与缓存的虚拟dom进行比较。在vue或者react内部封装了diff算法，通过这个算法来进行比较，渲染时修改改变的变化，原先没有发生改变的通过原先的数据进行渲染。
* 另外现代前端框架的一个基本要求就是无须手动操作DOM，一方面是因为手动操作DOM无法保证程序性能，多人协作的项目中如果review不严格，可能会有开发者写出性能较低的代码，另一方面更重要的是省略手动DOM操作可以大大提高开发效率。


# 六、React Hooks在平时开发中需要注意的问题和原因
#### 1、不要在循环，条件或嵌套函数中调用Hook，必须始终在React函数的顶层使用Hook
* 这是因为React需要利用调用顺序来正确更新相应的状态，以及调用相应的钩子函数。一旦在循环或条件分支语句中调用Hook，就容易导致调用顺序的不一致性，从而产生难以预料到的后果

#### 2、使用useState时候，使用push，pop，splice等直接更改数组对象的坑
* 使用push直接更改数组无法获取到新值，应该采用析构方式，但是在class里面不会有这个问题

#### 3、useState设置状态的时候，只有第一次生效，后期需要更新状态，必须通过useEffect

#### 4、善用useCallback
* 父组件传递给子组件事件句柄时，如果我们没有任何参数变动可能会选用useMemo。但是每一次父组件渲染子组件即使没变化也会跟着渲染一次

#### 5、不要滥用useContext
* 可以使用基于useContext封装的状态管理工具


# 七、React.Children.map和js的map有什么区别？
* JavaScript中的map不会对为null或者undefined的数据进行处理，而React.Children.map中的map可以处理React.Children为null或者undefined的情况。

# 八、Redux中的connect有什么作用
#### connect负责连接React和Redux

#### 1、获取state
* connect 通过context获取Provider中的store，通过store.getState()获取整个store tree上所有state
#### 2、包装原组件
* 将state和action通过props的方式传入到原组件内部wrapWithConnect返回—个ReactComponent对象Connect，
* Connect重新render外部传入的原组件WrappedComponent，并把connect中传入的 mapStateToProps，mapDispatchToProps与组件上原有的 props合并后，通过属性的方式传给WrappedComponent
#### 3、监听store tree变化
* connect缓存了store tree中state的状态，通过当前state状态 和变更前 state 状态进行比较，从而确定是否调用 this.setState()方法触发Connect及其子组件的重新渲染


# 九、React中什么是受控组件和非控组件？
#### 1、受控组件：
* 在使用表单来收集用户输入时，例如input、select、textearea等元素都要绑定一个change事件，当表单的状态发生变化，就会触发onChange事件，更新组件的state。
* 这种组件在React中被称为受控组件，在受控组件中，组件渲染出的状态与它的value或checked属性相对应，react通过这种方式消除了组件的局部状态，使整个状态可控。react官方推荐使用受控表单组件。

#### 2、非受控组件：
* 如果一个表单组件没有value props（单选和复选按钮对应的是checked props）时，就可以称为非受控组件。在非受控组件中，可以使用一个ref来从DOM获得表单值。而不是为每个状态更新编写一个事件处理程序。

#### 总结：页面中所有输入类的DOM如果是现用现取的称为非受控组件，而通过setState将输入的值维护到了state中，需要时再从state中取出，这里的数据就受到了state的控制，称为受控组件。


# 十、React和vue的异同
#### 共同点：
* 1、都使用虚拟dom
* 2、提供了响应式和组件化的视图组件
* 3、把注意力集中保持在核心库，而将其他功能如路由和全局状态管理交给相关的库。(vue-router、vuex、react-router、redux等等)

#### 各自优势：
* React
    * 1、灵活性和响应性：它提供最大的灵活性和响应能力。
    * 2、丰富的JavaScript库：来自世界各地的贡献者正在努力添加更多功能。
    * 3、可扩展性：由于其灵活的结构和可扩展性，React已被证明对大型应用程序更好。
    * 4、不断发展： React得到了Facebook专业开发人员的支持，他们不断寻找改进方法。
    * 5、web或移动平台： React提供React Native平台，可通过相同的React组件模型为iOS和Android开发本机呈现的应用程序。

* Vue
    * 1、易于使用： Vue.js包含基于HTML的标准模板，可以更轻松地使用和修改现有应用程序。
    * 2、更顺畅的集成：无论是单页应用程序还是复杂的Web界面，Vue.js都可以更平滑地集成更小的部件，而不会对整个系统产生任何影响。
    * 3、更好的性能，更小的尺寸：它占用更少的空间，并且往往比其他框架提供更好的性能。
    * 4、精心编写的文档：通过详细的文档提供简单的学习曲线，无需额外的知识; HTML和JavaScript将完成工作。
    * 5、适应性：整体声音设计和架构使其成为一种流行的JavaScript框架。它提供无障碍的迁移，简单有效的结构和可重用的模板。


# 十一、React组件通信方式
* 1、父组件向子组件通信：父组件通过props向子组件传递需要的信息
* 2、子组件向父组件通信：props+回调的方式
* 3、context，context相当于一个大容器，我们可以把要通信的内容放在这个容器中，这样不管嵌套多深，都可以随意取用，对于跨越多层的全局数据可以使用context实现
* 4、非嵌套关系的组件通信：即没有任何包含关系的组件，包括兄弟组件以及不在同一个父级中的非兄弟组件

    * 可以使用自定义事件通信（发布订阅模式）
    * 可以通过redux等进行全局状态管理
    * 如果是兄弟组件通信，可以找到这两个兄弟节点共同的父节点, 结合父子间通信方式进行通信

