# React生命周期

* 初始化阶段：
    * getDefaultProps：获取实例的默认属性
    * getInitialState：获取每个实例的初始化状态
    * componentWillMount：组件即将被装载、渲染到页面上
    * render：组件在这里生成虚拟的DOM节点
    * componentDidMount：组件真正在被装载之后

* 运行中状态：
    * componentWillReceiveProps：组件将要接收到属性的时候调用
    * shouldComponentUpdate：组件接受到新属性或者新状态的时候（可以返回false，阻止render调用）
    * componentWillUpdate：组件即将更新不能修改属性和状态
    * render：组件重新描绘
    * componentDidUpdate：组件已经更新

* 销毁阶段：
    * componentWillUnmount：组件即将销毁(清除定时器，销毁一些内存占用)


* 在React16废除以下三个生命周期：componentWillMount，componentWillReceiveProps，componentWillUpdate
    * 废弃的原因，是在React16的Fiber架构中，可以中间进行暂停重启操作，调和过程会多次执行will周期，不再是一次执行，失去了原有的意义。
    * 此外，多次执行，在周期中如果有setState或dom操作，会触发多次重绘，影响性能，也会导致数据错乱。 因而会有UNSAFE开头。

* 两个新的生命周期
    * getDerivedStateFromProps：该生命周期是从父获取数据时使用的，返回一个新状态和页面当前状态组合
    * getSnapshotBeforeUpdate：从字面理解在更新前获取当前dom结构的快照，拿到更新前页面的各种状态。例如你在渲染前浏览器滚动条scrollTop，更新后会变化，你就可以记住当前状态进行计算。








………………………………………………………………
………………………………………………………………


# React 中 refs 干嘛用的？
Refs 提供了一种访问在render方法中创建的 DOM 节点或者 React 元素的方法。在典型的数据流中，props 是父子组件交互的唯一方式，想要修改子组件，需要使用新的pros重新渲染它。凡事有例外，某些情况下咱们需要在典型数据流外，强制修改子代，这个时候可以使用 Refs。
咱们可以在组件添加一个 ref 属性来使用，该属性的值是一个回调函数，接收作为其第一个参数的底层 DOM 元素或组件的挂载实例。

class UnControlledForm extends Component {
  handleSubmit = () => {
    console.log("Input Value: ", this.input.value);
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" ref={(input) => (this.input = input)} />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

请注意，input 元素有一个ref属性，它的值是一个函数。该函数接收输入的实际 DOM 元素，然后将其放在实例上，这样就可以在 handleSubmit 函数内部访问它。
经常被误解的只有在类组件中才能使用 refs，但是refs也可以通过利用 JS 中的闭包与函数组件一起使用。

function CustomForm({ handleSubmit }) {
  let inputElement;
  return (
    <form onSubmit={() => handleSubmit(inputElement.value)}>
      <input type="text" ref={(input) => (inputElement = input)} />
      <button type="submit">Submit</button>
    </form>
  );
}


# 对于store的理解
Store 就是把它们联系到一起的对象。Store 有以下职责：

维持应用的 state；
提供 getState() 方法获取 state；
提供 dispatch(action) 方法更新 state；
通过 subscribe(listener)注册监听器;
通过 subscribe(listener)返回的函数注销监听器


# React中props.children和React.Children的区别
在React中，当涉及组件嵌套，在父组件中使用props.children把所有子组件显示出来。如下：

function ParentComponent(props){
    return (
        <div>
            {props.children}        </div>
    )
}

如果想把父组件中的属性传给所有的子组件，需要使用React.Children方法。

比如，把几个Radio组合起来，合成一个RadioGroup，这就要求所有的Radio具有同样的name属性值。可以这样：把Radio看做子组件，RadioGroup看做父组件，name的属性值在RadioGroup这个父组件中设置。

首先是子组件：

//子组件
function RadioOption(props) {
  return (
    <label>
      <input type="radio" value={props.value} name={props.name} />
      {props.label}    </label>
  )
}

然后是父组件，不仅需要把它所有的子组件显示出来，还需要为每个子组件赋上name属性和值：

//父组件用,props是指父组件的props
function renderChildren(props) {

  //遍历所有子组件
  return React.Children.map(props.children, child => {
    if (child.type === RadioOption)
      return React.cloneElement(child, {
        //把父组件的props.name赋值给每个子组件
        name: props.name
      })
    else
      return child
  })
}
//父组件
function RadioGroup(props) {
  return (
    <div>
      {renderChildren(props)}    </div>
  )
}
function App() {
  return (
    <RadioGroup name="hello">
      <RadioOption label="选项一" value="1" />
      <RadioOption label="选项二" value="2" />
      <RadioOption label="选项三" value="3" />
    </RadioGroup>
  )
}
export default App;

以上，React.Children.map让我们对父组件的所有子组件又更灵活的控制。

# Redux 中间件是怎么拿到store 和 action? 然后怎么处理?
redux中间件本质就是一个函数柯里化。redux applyMiddleware Api 源码中每个middleware 接受2个参数， Store 的getState 函数和dispatch 函数，分别获得store和action，最终返回一个函数。该函数会被传入 next 的下一个 middleware 的 dispatch 方法，并返回一个接收 action 的新函数，这个函数可以直接调用 next（action），或者在其他需要的时刻调用，甚至根本不去调用它。调用链中最后一个 middleware 会接受真实的 store的 dispatch 方法作为 next 参数，并借此结束调用链。所以，middleware 的函数签名是（{ getState，dispatch })=> next => action。

# 什么是 React的refs？为什么它们很重要？
refs允许你直接访问DOM元素或组件实例。为了使用它们，可以向组件添加个ref属性。
如果该属性的值是一个回调函数，它将接受底层的DOM元素或组件的已挂载实例作为其第一个参数。可以在组件中存储它。

export class App extends Component {
  showResult() {
    console.log(this.input.value);
  }
  render() {
    return (
      <div>
        <input type="text" ref={(input) => (this.input = input)} />
        <button onClick={this.showResult.bind(this)}>展示结果</button>
      </div>
    );
  }
}


如果该属性值是一个字符串， React将会在组件实例化对象的refs属性中，存储一个同名属性，该属性是对这个DOM元素的引用。可以通过原生的 DOM API操作它。

export class App extends Component {
  showResult() {
    console.log(this.refs.username.value);
  }
  render() {
    return (
      <div>
        <input type="text" ref="username" />
        <button onClick={this.showResu1t.bind(this)}>展示结果</button>
      </div>
    );
  }
}

# React Hook 的使用限制有哪些？
React Hooks 的限制主要有两条：

不要在循环、条件或嵌套函数中调用 Hook；
在 React 的函数组件中调用 Hook。
那为什么会有这样的限制呢？Hooks 的设计初衷是为了改进 React 组件的开发模式。在旧有的开发模式下遇到了三个问题。

组件之间难以复用状态逻辑。过去常见的解决方案是高阶组件、render props 及状态管理框架。
复杂的组件变得难以理解。生命周期函数与业务逻辑耦合太深，导致关联部分难以拆分。
人和机器都很容易混淆类。常见的有 this 的问题，但在 React 团队中还有类难以优化的问题，希望在编译优化层面做出一些改进。
这三个问题在一定程度上阻碍了 React 的后续发展，所以为了解决这三个问题，Hooks 基于函数组件开始设计。然而第三个问题决定了 Hooks 只支持函数组件。

那为什么不要在循环、条件或嵌套函数中调用 Hook 呢？因为 Hooks 的设计是基于数组实现。在调用时按顺序加入数组中，如果使用循环、条件或嵌套函数很有可能导致数组取值错位，执行错误的 Hook。当然，实质上 React 的源码里不是数组，是链表。

这些限制会在编码上造成一定程度的心智负担，新手可能会写错，为了避免这样的情况，可以引入 ESLint 的 Hooks 检查插件进行预防。



# redux的三大原则

单一数据源

整个应用的state被存储在一个object tree中，并且这个object tree 之存在唯一一个store中

state是只读的

唯一改变state的方式是触发action，action是一个用于描述已经发生时间的对象，这个保证了视图和网络请求都不能直接修改state，相反他们只能表达想要修改的意图

使用纯函数来执行修改state
为了描述action如何改变state tree 需要编写reduce

# 对虚拟DOM的理解？虚拟DOM主要做了什么？虚拟DOM本身是什么？
从本质上来说，Virtual Dom是一个JavaScript对象，通过对象的方式来表示DOM结构。将页面的状态抽象为JS对象的形式，配合不同的渲染工具，使跨平台渲染成为可能。通过事务处理机制，将多次DOM修改的结果一次性的更新到页面上，从而有效的减少页面渲染的次数，减少修改DOM的重绘重排次数，提高渲染性能。

虚拟DOM是对DOM的抽象，这个对象是更加轻量级的对DOM的描述。它设计的最初目的，就是更好的跨平台，比如node.js就没有DOM，如果想实现SSR，那么一个方式就是借助虚拟dom，因为虚拟dom本身是js对象。 在代码渲染到页面之前，vue或者react会把代码转换成一个对象（虚拟DOM）。以对象的形式来描述真实dom结构，最终渲染到页面。在每次数据发生变化前，虚拟dom都会缓存一份，变化之时，现在的虚拟dom会与缓存的虚拟dom进行比较。在vue或者react内部封装了diff算法，通过这个算法来进行比较，渲染时修改改变的变化，原先没有发生改变的通过原先的数据进行渲染。

另外现代前端框架的一个基本要求就是无须手动操作DOM，一方面是因为手动操作DOM无法保证程序性能，多人协作的项目中如果review不严格，可能会有开发者写出性能较低的代码，另一方面更重要的是省略手动DOM操作可以大大提高开发效率。

为什么要用 Virtual DOM：

（1）保证性能下限，在不进行手动优化的情况下，提供过得去的性能

下面对比一下修改DOM时真实DOM操作和Virtual DOM的过程，来看一下它们重排重绘的性能消耗∶

真实DOM∶ 生成HTML字符串＋ 重建所有的DOM元素
Virtual DOM∶ 生成vNode＋ DOMDiff＋必要的DOM更新
Virtual DOM的更新DOM的准备工作耗费更多的时间，也就是JS层面，相比于更多的DOM操作它的消费是极其便宜的。尤雨溪在社区论坛中说道∶ 框架给你的保证是，你不需要手动优化的情况下，我依然可以给你提供过得去的性能。 （2）跨平台 Virtual DOM本质上是JavaScript的对象，它可以很方便的跨平台操作，比如服务端渲染、uniapp等。

# react 强制刷新
component.forceUpdate() 一个不常用的生命周期方法, 它的作用就是强制刷新

官网解释如下

默认情况下，当组件的 state 或 props 发生变化时，组件将重新渲染。如果 render() 方法依赖于其他数据，则可以调用 forceUpdate() 强制让组件重新渲染。

调用 forceUpdate() 将致使组件调用 render() 方法，此操作会跳过该组件的 shouldComponentUpdate()。但其子组件会触发正常的生命周期方法，包括 shouldComponentUpdate() 方法。如果标记发生变化，React 仍将只更新 DOM。

通常你应该避免使用 forceUpdate()，尽量在 render() 中使用 this.props 和 this.state。

shouldComponentUpdate 在初始化 和 forceUpdate 不会执行

在使用 React Router时，如何获取当前页面的路由或浏览器中地址栏中的地址？
在当前组件的 props中，包含 location属性对象，包含当前页面路由地址信息，在 match中存储当前路由的参数等数据信息。可以直接通过 this .props使用它们。

# React Hooks在平时开发中需要注意的问题和原因
（1）不要在循环，条件或嵌套函数中调用Hook，必须始终在 React函数的顶层使用Hook

这是因为React需要利用调用顺序来正确更新相应的状态，以及调用相应的钩子函数。一旦在循环或条件分支语句中调用Hook，就容易导致调用顺序的不一致性，从而产生难以预料到的后果。

（2）使用useState时候，使用push，pop，splice等直接更改数组对象的坑

使用push直接更改数组无法获取到新值，应该采用析构方式，但是在class里面不会有这个问题。代码示例：

function Indicatorfilter() {
  let [num,setNums] = useState([0,1,2,3])
  const test = () => {
    // 这里坑是直接采用push去更新num
    // setNums(num)是无法更新num的
    // 必须使用num = [...num ,1]
    num.push(1)
    // num = [...num ,1]
    setNums(num)
  }
return (
    <div className='filter'>
      <div onClick={test}>测试</div>
        <div>
          {num.map((item,index) => (              <div key={index}>{item}</div>
          ))}      </div>
    </div>
  )
}

class Indicatorfilter extends React.Component<any,any>{
  constructor(props:any){
      super(props)
      this.state = {
          nums:[1,2,3]
      }
      this.test = this.test.bind(this)
  }

  test(){
      // class采用同样的方式是没有问题的
      this.state.nums.push(1)
      this.setState({
          nums: this.state.nums
      })
  }

  render(){
      let {nums} = this.state
      return(
          <div>
              <div onClick={this.test}>测试</div>
                  <div>
                      {nums.map((item:any,index:number) => (                          <div key={index}>{item}</div>
                      ))}                  </div>
          </div>

      )
  }
}


（3）useState设置状态的时候，只有第一次生效，后期需要更新状态，必须通过useEffect

TableDeail是一个公共组件，在调用它的父组件里面，我们通过set改变columns的值，以为传递给TableDeail 的 columns是最新的值，所以tabColumn每次也是最新的值，但是实际tabColumn是最开始的值，不会随着columns的更新而更新：

const TableDeail = ({    columns,}:TableData) => {
    const [tabColumn, setTabColumn] = useState(columns) 
}

// 正确的做法是通过useEffect改变这个值
const TableDeail = ({    columns,}:TableData) => {
    const [tabColumn, setTabColumn] = useState(columns) 
    useEffect(() =>{setTabColumn(columns)},[columns])
}

（4）善用useCallback

父组件传递给子组件事件句柄时，如果我们没有任何参数变动可能会选用useMemo。但是每一次父组件渲染子组件即使没变化也会跟着渲染一次。

（5）不要滥用useContext

可以使用基于 useContext 封装的状态管理工具。

# React.Children.map和js的map有什么区别？
JavaScript中的map不会对为null或者undefined的数据进行处理，而React.Children.map中的map可以处理React.Children为null或者undefined的情况。

# Redux中的connect有什么作用
connect负责连接React和Redux

（1）获取state

connect 通过 context获取 Provider 中的 store，通过 store.getState() 获取整个store tree 上所有state

（2）包装原组件

将state和action通过props的方式传入到原组件内部 wrapWithConnect 返回—个 ReactComponent 对 象 Connect，Connect 重 新 render 外部传入的原组件 WrappedComponent ，并把 connect 中传入的 mapStateToProps，mapDispatchToProps与组件上原有的 props合并后，通过属性的方式传给WrappedComponent

（3）监听store tree变化

connect缓存了store tree中state的状态，通过当前state状态 和变更前 state 状态进行比较，从而确定是否调用 this.setState()方法触发Connect及其子组件的重新渲染


# React的严格模式如何使用，有什么用处？
StrictMode 是一个用来突出显示应用程序中潜在问题的工具。与 Fragment 一样，StrictMode 不会渲染任何可见的 UI。它为其后代元素触发额外的检查和警告。
可以为应用程序的任何部分启用严格模式。例如：

import React from 'react';
function ExampleApplication() {
  return (
    <div>
      <Header />
      <React.StrictMode>        
        <div>
          <ComponentOne />
          <ComponentTwo />
        </div>
      </React.StrictMode>      
      <Footer />
    </div>
  );
}


在上述的示例中，不会对 Header 和 Footer 组件运行严格模式检查。但是，ComponentOne 和 ComponentTwo 以及它们的所有后代元素都将进行检查。

StrictMode 目前有助于：

识别不安全的生命周期
关于使用过时字符串 ref API 的警告
关于使用废弃的 findDOMNode 方法的警告
检测意外的副作用
检测过时的 context API


# state 是怎么注入到组件的，从 reducer 到组件经历了什么样的过程
通过connect和mapStateToProps将state注入到组件中：

import { connect } from 'react-redux'
import { setVisibilityFilter } from '@/reducers/Todo/actions'
import Link from '@/containers/Todo/components/Link'

const mapStateToProps = (state, ownProps) => ({
    active: ownProps.filter === state.visibilityFilter
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    setFilter: () => {
        dispatch(setVisibilityFilter(ownProps.filter))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Link)


上面代码中，active就是注入到Link组件中的状态。 mapStateToProps（state，ownProps）中带有两个参数，含义是∶

state-store管理的全局状态对象，所有都组件状态数据都存储在该对象中。
ownProps 组件通过props传入的参数。

# reducer 到组件经历的过程：

reducer对action对象处理，更新组件状态，并将新的状态值返回store。
通过connect（mapStateToProps，mapDispatchToProps）（Component）对组件 Component进行升级，此时将状态值从store取出并作为props参数传递到组件。


# 高阶组件实现源码∶

import React from 'react'
import PropTypes from 'prop-types'

// 高阶组件 contect 
export const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
    class Connect extends React.Component {
        // 通过对context调用获取store
        static contextTypes = {
            store: PropTypes.object
        }

        constructor() {
            super()
            this.state = {
                allProps: {}
            }
        }

        // 第一遍需初始化所有组件初始状态
        componentWillMount() {
            const store = this.context.store
            this._updateProps()
            store.subscribe(() => this._updateProps()); // 加入_updateProps()至store里的监听事件列表
        }

        // 执行action后更新props，使组件可以更新至最新状态（类似于setState）
        _updateProps() {
            const store = this.context.store;
            let stateProps = mapStateToProps ?
                mapStateToProps(store.getState(), this.props) : {} // 防止 mapStateToProps 没有传入
            let dispatchProps = mapDispatchToProps ?
                mapDispatchToProps(store.dispatch, this.props) : {
                                    dispatch: store.dispatch
                                } // 防止 mapDispatchToProps 没有传入
            this.setState({
                allProps: {
                    ...stateProps,
                    ...dispatchProps,
                    ...this.props
                }
            })
        }

        render() {
            return <WrappedComponent {...this.state.allProps} />
        }
    }
    return Connect
}





# React中什么是受控组件和非控组件？
（1）受控组件 在使用表单来收集用户输入时，例如<input><select><textearea>等元素都要绑定一个change事件，当表单的状态发生变化，就会触发onChange事件，更新组件的state。这种组件在React中被称为受控组件，在受控组件中，组件渲染出的状态与它的value或checked属性相对应，react通过这种方式消除了组件的局部状态，使整个状态可控。react官方推荐使用受控表单组件。

受控组件更新state的流程：

可以通过初始state中设置表单的默认值
每当表单的值发生变化时，调用onChange事件处理器
事件处理器通过事件对象e拿到改变后的状态，并更新组件的state
一旦通过setState方法更新state，就会触发视图的重新渲染，完成表单组件的更新
受控组件缺陷： 表单元素的值都是由React组件进行管理，当有多个输入框，或者多个这种组件时，如果想同时获取到全部的值就必须每个都要编写事件处理函数，这会让代码看着很臃肿，所以为了解决这种情况，出现了非受控组件。

（2）非受控组件 如果一个表单组件没有value props（单选和复选按钮对应的是checked props）时，就可以称为非受控组件。在非受控组件中，可以使用一个ref来从DOM获得表单值。而不是为每个状态更新编写一个事件处理程序。

React官方的解释：

要编写一个非受控组件，而不是为每个状态更新都编写数据处理函数，你可以使用 ref来从 DOM 节点中获取表单数据。
因为非受控组件将真实数据储存在 DOM 节点中，所以在使用非受控组件时，有时候反而更容易同时集成 React 和非 React 代码。如果你不介意代码美观性，并且希望快速编写代码，使用非受控组件往往可以减少你的代码量。否则，你应该使用受控组件。

例如，下面的代码在非受控组件中接收单个属性：

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.value);
    event.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:          <input type="text" ref={(input) => this.input = input} />        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}


总结： 页面中所有输入类的DOM如果是现用现取的称为非受控组件，而通过setState将输入的值维护到了state中，需要时再从state中取出，这里的数据就受到了state的控制，称为受控组件。

# React和vue.js的相似性和差异性是什么？
相似性如下。
（1）都是用于创建UI的 JavaScript库。
（2）都是快速和轻量级的代码库（这里指 React核心库）。
（3）都有基于组件的架构。
（4）都使用虚拟DOM。
（5）都可以放在单独的HTML文件中，或者放在 Webpack设置的一个更复杂的模块中。
（6）都有独立但常用的路由器和状态管理库。
它们最大的区别在于 Vue. js通常使用HTML模板文件，而 React完全使用 JavaScript创建虚拟DOM。 Vue. js还具有对于“可变状态”的“ reactivity”的重新渲染的自动化检测系统。








































































































