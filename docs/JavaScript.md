
# 原型和原型链
#### 原型
* 1、每个函数都有一个prototype属性，被称为显示原型
* 2、每个实例对象都会有__proto__属性,其被称为隐式原型
* 3、每一个实例对象的隐式原型__prot__属性指向自身构造函数的显式原型prototype
* 4、每个prototype原型都有一个constructor属性，指向它关联的构造函数。

#### 原型链
* 获取对象属性时，如果对象本身没有这个属性，那就会去他的原型__proto__上去找，如果还查不到，就去找原型的原型，一直找到最顶层(Object.prototype)为止。Object.prototype对象也有__proto__属性值为null。


# 判断一个数据的类型的方法
#### 1、使用typeof。
* 注意：对于null及数组、对象，typeof均检测出为object，不能进一步判断它们的类型。

#### 2、使用instanceof
* obj instanceof Object，可以左边放你要判断的内容，右边放类型来进行JS类型判断，只能用来判断复杂数据类型，因为instanceof 是用于检测构造函数（右边）的prototype属性是否出现在某个实例对象（左边）的原型链上。

#### 3、使用Object.prototype.toString.call
* 在任何值上调用Object原生的toString() 方法，都会返回一个[object NativeConstructorName]格式的字符串。每个类在内部都有一个[[Class]]属性，这个属性中就指定了上述字符串中的构造函数名。
* 但是它不能检测非原生构造函数的构造函数名。

#### 4、使用constructor
* 注意：constructor不能判断undefined和null，并且使用它是不安全的，因为constructor的指向是可以改变的


# 从输入框输入一个url到加载完页面的过程
#### 从输入URL到页面加载的主干流程如下：
* 1、浏览器的地址栏输入URL并按下回车
* 2、浏览器查找当前URL的DNS缓存记录
* 3、DNS解析URL对应的IP
* 4、根据IP建立TCP连接（三次握手）
* 5、HTTP发起请求
* 6、服务器处理请求，浏览器接收HTTP响应
* 7、渲染页面，构建DOM树
* 8、关闭TCP连接（四次挥手）

# js中加减过程中如何避免精度丢失
* 原因：计算机将数据存储为二进制
* 1.第三方库Decimal
* 2.bignumber
* 3.变成整数（转换成字符串，然后计算小数部分加减，然后再转换成数值类型）


# hybrid项目如何调用原生api
* 1.通过url传输数据：（一般是在入口页面传下app的用户信息进来供vue h5使用）
* 2.原生APP提供一个接口对象的引用（例如一个扫码的接口，可能还有回调函数以获得扫码结果）（思路就是万物通过window 进行交互）


# 常用的响应码

#### HTTP 响应码，也称http状态码(HTTP Status Code)，反映了web服务器处理HTTP请求状态，每一个响应码都代表了一种服务端反馈的响应状态。

#### HTTP响应码通常分为五大类：

* 1XX——信息类（Information），表示收到http请求，正在进行下一步处理，通常是一种瞬间的响应状态

* 2XX——成功类（Successful），表示用户请求被正确接收、理解和处理
    * 200（OK）：请求成功。一般用于GET与POST请求
    * 201（Created）：已创建。成功请求并创建了新的资源
    * 202（Accepted）：请求已被接受，但尚未处理

* 3XX——重定向类（Redirection），表示没有请求成功，必须采取进一步的动作
    * 301（Moved Permanently）：资源被永久移动。请求的资源已被永久的移动到新URI，返回信息会包括新的URI，浏览器会自动定向到新URI。今后任何新的请求都应使用新的URI
    * 302（Found）：资源临时移动。资源只是临时被移动，客户端应继续使用原有URI
    * 304：用其他策略获取资源

* 4XX ——客户端错误（Client Error），表示客户端提交的请求包含语法错误或不能正确执行
    * 400（Bad Requests）：客户端请求的地址不存在或者包含不支持的参数
    * 401（Unauthorized）：未授权，或认证失败。对于需要登录的网页，服务器可能返回此响应
    * 403（Forbidden）：没权限。服务器收到请求，但拒绝提供服务
    * 404（Not Found）：请求的资源不存在。遇到404首先检查请求url是否正确

* 5XX ——服务端错误（Server Error），表示服务器不能正确执行一个正确的请求（客户端请求的方法及参数是正确的，服务端不能正确执行，如网络超时、服务僵死，可以查看服务端日志再进一步解决）
    * 500（Internal Server Error）：服务器内部错误，无法完成请求
    * 503（Service Unavailable）：由于超载或系统维护（一般是访问人数过多），服务器无法处理客户端的请求，通常这只是暂时状态



# http协议与https协议的区别

* 1、HTTP和HTTPS的基本概念
    * HTTP：是互联网上应用最为广泛的一种网络协议，是一个客户端和服务器端请求和应答的标准（TCP），用于从WWW服务器传输超文本到本地浏览器的传输协议，它可以使浏览器更加高效，使网络传输减少。
    * HTTPS：是以安全为目标的HTTP通道，简单讲是HTTP的安全版，即HTTP下加入SSL层，HTTPS的安全基础是SSL，因此加密的详细内容就需要SSL。
    * HTTPS协议的主要作用可以分为两种：一种是建立一个信息安全通道，来保证数据传输的安全；另一种就是确认网站的真实性。

* 2、HTTPS和HTTP的区别主要如下：
    * (1) https协议需要到ca申请证书，一般免费证书较少，因而需要一定费用。
    * (2) http是超文本传输协议，信息是明文传输，https则是具有安全性的ssl加密传输协议。
    * (3) http和https使用的是完全不同的连接方式，用的端口也不一样，前者是80，后者是443。
    * (4) http的连接很简单，是无状态的；HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议，比http协议安全。

# 常用的设计模式

### 1、单例模式
单例模式是一种常用的软件设计模式，其定义是单例对象的类只能允许一个实例存在。目标为实现一个类，让这个类只有一个实例对象，即多次new这个类，也只返回第一次实例化时生成的对象，

* 适用场景：
    * 需要生成唯一序列的环境
    * 需要频繁实例化然后销毁的对象
    * 创建对象时耗时过多或者耗资源过多，但又经常用到的对象 

### 2、观察者模式(发布订阅模式)
观察者模式：当对象之间存在一对多的依赖关系时，其中一个对象的状态发生改变，所有依赖它的对象都会收到通知，这就是观察者模式。
发布者订阅者模式：基于一个事件通道，希望接收通知的对象Subscriber 通过自定义事件订阅主题，被激活事件的对象 Publisher 通过发布主题事件的方式通知订阅者该主题的 Subscriber 对象。
观察者模式是，当被观察者的数据发生变化时，调用被观察者的notify方法，去通知所有观察者执行update方法进行更新。对于发布者订阅者模式，首先发布者与订阅者互相并不知道彼此的存在，他们是通过事件中心来进行调度的，发布者在事件中心发布一个对应的事件主题，订阅者在事件中心订阅一个事件主体，当订阅者去触发emit时就去执行发布者所发布的事件。
Vue展示了其设计模式的案例体现，Vue的双向数据绑定使用了观察者模式，其事件总线EventBus使用了发布者订阅者模式。

* 适用场景：
    * 双向绑定
    * Dom事件，addEventListener()

### 3、策略模式
策略模式是指定义一系列算法，将这些算法一个个封装起来。一个基于策略模式的程序主要分为两部分，一部分是策略类，主要负责具体实现，另一部分是环境类，接收请求并将请求分配给某一个策略类

### 4、工厂模式
工厂模式定义了一个用于创建对象的接口,这个接口由子类决定实例化哪一个类。该模式使一个类的实例化延迟到了子类。而子类可以重写接口方法以便创建的时候指定自己的对象类型。

* 如果不想让某个子系统与较大的那个对象之间形成强耦合，而是想运行时从许多子系统中进行挑选的话，那么工厂模式是一个理想的选择；
* 将new操作简单封装，遇到new的时候就应该考虑是否用工厂模式；
* 需要依赖具体环境创建不同实例，这些实例都有相同的行为，这时候我们可以使用工厂模式，简化实现的过程，同时也可以减少每种对象所需的代码量，有利于消除对象间的耦合，提供更大的灵活性。


# 数组去重
#### 1、双重for循环
    function uniqueArr(arr) {
        let newArr = []
        let isRepeat

        for(let i=0; i<arr.length; i++) { // 第一次循环
            isRepeat = false
            for(let j= i + 1; j < arr.length; j++) { //第二次循环
                if(arr[i] === arr[j]){
                    isRepeat = true
                    break
                }
            }
            if(!isRepeat){
                newArr.push(arr[i])
            }
        }
        return newArr
    }

#### 2、利用数组下标索引过滤
    function uniqueArr(arr) {
        let temp = []
        for(let i = 0; i < arr.length; i++){
            // 如果当前数组的第i项在当前数组中第一次出现的位置是i
            if (arr.indexOf(arr[i]) === i){
                temp.push(arr[i])
            }
        }
        return temp
    }

#### 3、Set + 扩展运算符
    function uniqueArr(arr){
        return Array.from(new Set(arr)) // Set数据结构，其成员的值都是唯一的，利用Array.from将Set结构转换成数组
    }

#### 4、indexof去重方法
    function uniqueArr(arr) {
        let temp = []
        for(let i = 0; i < arr.length; i++){
            if (temp.indexOf(arr[i]) === -1){ // 如果临时数组里面没有这个数就把这个数存进去
                temp.push(arr[i]);
            }
        }
        return temp
    }



# 防抖和节流

#### 1、防抖
函数防抖是指在事件被触发n秒后再执行回调，如果在这n秒内事件又被触发，则重新计时。

* 适用场景：
    * 按钮提交场景：防⽌多次提交按钮，只执⾏最后提交的⼀次。<br>
    * 服务端验证场景：表单验证需要服务端配合，只执⾏⼀段连续的输⼊事件的最后⼀次，还有搜索联想词功能等场景

* 防抖源代码

        function debounce(fn, delay){
            let timerId = null
            return function() {
                const context = this
                if(timerId) {
                    window.clearTimeout(timerId)
                }
                timerId = setTimeout(() => {
                    fn.apply(context, arguments)
                    timerId = null
                }, delay)
            }
        }
        const debounced = debounce(() => console.log('hi'))
        debounced()

#### 2、节流
函数节流是指规定一个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效。控制频率！

* 适用场景：
    * 拖拽场景：scroll滚动条事件，固定时间内只执⾏⼀次，防⽌超⾼频次触发位置变动
    * 缩放场景：监控浏览器resize事件

* 节流源代码

        function throttle(fn, delay){
            let canUse = true
            return function(){
                if (canUse){
                    fn.apply(this, arguments)
                    canUse = false
                    setTimeout(()=> canUse = true, delay)
                }
            }
        }
        const throttled = throttle(()=>console.log('hi'))
        throttled()

#### 3、总结
* 防抖：防止抖动，单位时间内事件触发会被重置，避免事件被误伤触发多次。代码实现重在清零 clearTimeout。业务场景有避免登录按钮多次点击的重复提交。
* 节流：控制流量，单位时间内事件只能触发一次。代码实现重在开锁关锁 timer=timeout; timer=null



# 闭包（closure）

#### 1、定义：
指的是一个函数可以访问另一个函数作用域中变量。常见的构造方法，是在一个函数内部定义另外一个函数。内部函数可以引用外层的变量；外层变量不会被垃圾回收机制回收。
注意，闭包的原理是作用域链，所以闭包访问的上级作用域中的变量是个对象，其值为其运算结束后的最后一个值。

    function f1(){
        var n=999;
        function f2(){
            alert(n); // 999
        }
    }

* 在上面的代码中，函数f2就被包括在函数f1内部，这时f1内部的所有局部变量，对f2都是可见的。
* 但是反过来就不行，f2内部的局部变量，对f1就是不可见的。
* 这就是Javascript语言特有的"链式作用域"结构（chain scope），子对象会一级一级地向上寻找所有父对象的变量。
* 所以，父对象的所有变量，对子对象都是可见的，反之则不成立。


#### 2、优缺点：
* 优点：
    * 允许函数外部访问函数内部变量
    * 可以有效减少全局变量的使用，避免全局变量污染

* 缺点：
    * 父作用域关联对象会一直存储在内存中得不到释放，易导致内存泄漏。
    * 由于函数外部可以访问函数内部变量，数据不安全


# 如何取消Promise请求

#### 方案1：借助reject 方法
一个promise对象状态的改变是通过resolve和reject来执行的。所以可以借助reject方法来终止Promise请求
    
    // 返回一个promise和abort方法
    function getPromise() {
        let _res, _rej
        const promise = new Promise((resolve, reject) => {
            _res = resolve
            _rej = reject
            setTimeout(() => {
                resolve('123')
            }, 5000)
        })
        return {
            promise,
            abort: () => {
                _rej({
                    name: "abort",
                    message: "the promise is aborted",
                    aborted: true,
                });
            }
        };
    }
    
    const { promise, abort } = getPromise();
    promise.then(console.log).catch(e => {
        console.log(e);
    });
    
    abort();


#### 方案2：返回一个pending状态的Promise，原Promise链会终止
    Promise.resolve().then(() => {
        console.log('ok1')
        return new Promise(()=>{})  // 返回“pending”状态的Promise对象
    }).then(() => {
        // 后续的函数不会被调用
        console.log('ok2')
    }).catch(err => {
        console.log('err:', err)
    })


# 数组中forEach, map,filter, reduce等方法的异同

####  1、相同点
* map、filter、forEach执行匿名函数支持三个参数，分别是：当前元素、当前元素索引、当前元素所属的数组
* 匿名函数this指向window
* 只能遍历数组

#### 2、不同点
* map速度比forEach快
* map和filter返回新数组，不会影响原数组；forEach不会产生新数组，返回undefined，reduce把数组缩减为一个值（求和，求积）
* reduce有4个参数，第一个为初始值


# 浅拷贝和深拷贝

#### 1、浅拷贝：分两种情况
如果属性是基本类型，会新开辟一个内存空间。
如果属性是引用类型，引用类型属性是还是指向同一块内存地址，所以如果其中一个对象改变了这个地址，就会影响到另一个对象。

* 实现方式：
    * Object.assign() 方法可以把任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回目标对象。<br />
    * 展开运算符
    * Array.prototype.concat()
    * Array.prototype.slice()


#### 2、深拷贝：
将一个对象从内存中完整的拷贝一份出来，从堆内存中开辟一个新的区域存放新对象，且修改新对象不会影响原对象。

* 实现方式：
* JSON.parse(JSON.stringify(data)) (JSON.stringify()在对象中遇到 undefined、function 和 symbol 时会自动将其忽略，在数组中则会返回 null，以保证单元位置不变)
* 递归

        function deepClone(data) {
            let newObj = {};
            if (data === null) return null
            if (typeof data !== 'object') return data
            if (data instanceof RegExp) return new RegExp(data)
            if (data instanceof Date) return new Date(data)
        
            if (Array.isArray(data)) {
                let temp = []
                data.forEach(item => {
                    temp.push(item)
                })
                return temp
            }
        
            for(let k in data) {
                newObj[k] = deepClone(data[k])
            }
        
            return newObj
        }

        let obj = {
            name: 'peter',
            flag: true,
            arr: [1, 2, 3, 4],
            run: function() {
                console.log('run!');
            },
            reg: /^\d+$/,
            o: { title: 'hello', content: 'hello world!!!'}
        }



# 栈和堆的区别？
* 栈（stack）：由编译器自动分配释放，存放函数的参数值，局部变量等；
* 堆（heap）：一般由程序员分配释放，若程序员不释放，程序结束时可能由操作系统释放。

# 谈谈this的理解？
* this总是指向函数的直接调用者（而非间接调用者）
* 如果有new关键字，this指向new出来的那个对象
* 在事件中，this指向目标元素，特殊的是IE的attachEvent中的this总是指向全局对象window


# new操作符具体干了什么呢?
* 创建一个空对象，并且this变量引用该对象，同时还继承了该函数的原型。
* 属性和方法被加入到this引用的对象中。
* 新创建的对象由this所引用，并且最后隐式的返回this。

# new一个实例的过程
* (1) 在内存中创建一个新对象
* (2) 这个新对象内部的[[Prototype]]特性被赋值为构造函数的 prototype 属性
* (3) 构造函数内部的this被赋值为这个新对象（即this指向新对象）
* (4) 执行构造函数内部的代码（给新对象添加属性）
* (5) 如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象

# 同步和异步的区别?
同步的概念在操作系统中：不同进程协同完成某项工作而先后次序调整（通过阻塞、唤醒等方式），同步强调的是顺序性，谁先谁后。异步不存在顺序性。

* 同步：浏览器访问服务器，用户看到页面刷新，重新发请求，等请求完，页面刷新，新内容出现，用户看到新内容之后进行下一步操作。
* 异步：浏览器访问服务器请求，用户正常操作，浏览器在后端进行请求。等请求完，页面不刷新，新内容也会出现，用户看到新内容。


# call和applyd的区别？
call()方法和apply()方法的作用相同，动态改变某个类的某个方法的运行环境。他们的区别在于接收参数的方式不同。
区别：

* 在使用call()方法时，传递给函数的参数必须逐个列举出来
* 使用apply()时，传递给函数的是参数数组

# JavaScript的数据类型有哪些
* 基本数据类型：字符串（String）、数字(Number)、布尔(Boolean)、空值（Null）、未定义（Undefined）、Symbol。
* 引用数据类型：对象(Object)、数组(Array)、函数(Function)。



























