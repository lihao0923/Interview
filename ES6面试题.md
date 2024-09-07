


……………………………………………………………
ES6
……………………………………………………………
# 一、let、const、var的区别
* 变量提升
* 暂时性死区
* 块级作用域
* 初始值设置：var和let可以不设置初始值，const 声明变量必须设置初始值
* 重复声明：let和const不允许重复声明变量
* 数据修改：const 定义的常量是基本数据类型，不能修改所以不能被修改。引用数据类型在栈内存中存储的是一个指针，真正的数据存储在指针指向的堆地址，不可被修改的是指针，真正的数据是可变的。


# 二、解构赋值
* 数组的解构赋值
* 对象的解构赋值

# 三、模板字符串``(反引号)

* 使用回车换行：标签与标签之 间能直接换行使用
* 变量、表达式拼接：直接使用${} 进行拼接


# 四、箭头函数
* 箭头函数中的this指向的是外层作用域下this的值
* 没有自己的arguments对象，但是可以访问外围函数的arguments对象
* 不能通过new关键字调用
* 适合使用箭头函数的场景： 与this无关的回调设置。定时器、数组方法回调。
* 不适合使用箭头函数的场景： 与this有关的回调设置。事件回调、对象中的方法。


# 五、扩展运算符
...能将「数组」转为逗号分隔的「参数序列]，是rest的逆运算

* 数组的展开
* 对象的展开


# 六、Symbol
* Symbol 是ES6新引入的一种原始数据类型，表示独一无二的值。它是js第七种数据类型 是一种类似于字符串的数据类型。

* 特点：
    * Symbol 的值是唯一的，常用来解决命名冲突问题。
    * Symbol 的值不能和其他数据进行运算。

* 创建方法：

        let h = Symbol()
        console.log(h) // Symbol()
        console.log(typeof h) // "symbol"
​

# 七、集合（set）
* Set是es6新增的数据结构，类似于数组，但是成员的值都是唯一的，没有重复的值，我们一般称为集合。
* 方法：add()、delete()、has()、clear()

        
        const s = new Set([1,2,3,41,12,21,1,1,1,2,3,4]) // 声明集合
        console.log(s); //[1,2,3,41,12,21,4] // 去重
        
        console.log(s.size); //7 // 1.元素个数

        s.add(8) // 2.添加
        
        s.delete(1) // 3.删除
        console.log(s); // [2,3,41,12,21,4,8]
        
        console.log(s.has(2)); //true // 4.检测是否包含某个元素
        
        s.clear() // 5.清空
        console.log(s); // []

* 应用场景： 数组去重、求交、并、差集。

# 八、字典（Map）
* Map类型是键值对的有序列表，而键和值都可以是任意类型
* 属性和方法：size()、set()、get()、has()、delete()、clear()


# 九、Promise
Promise是ES6引入的异步编程的新解决方案。比传统的解决方案（回调函数）更加合理和更加强大
* 状态：pending（进行时）、fulfilled（已成功）、rejected（已失败）
* 用法： Promise对象是一个构造函数，会接受一个函数作为参数，这个函数的两个参数分别是 resolve和reject
    * pending表示程序正在执行但未得到结果，即异步操作没有执行完毕
    * resolve函数的作用是将Promise对象的状态从 “未完成” 变为 “成功”
    * reject函数的作用是将Promise对象的状态从 “未完成” 变为 “失败”
    * const promise = new Promise(function(resolve, reject) {});
* 实例方法：
    * then() ---- 实例状态发生变化时，触发的回调函数，第一个参数是resolved状态的回调函数，第二个参数是rejected的回调函数（一般使用catch方法来替代第二个参数）
    * catch() ---- 用于指定发生错误的回调函数
    * finally() --- 用于指定 不管 Promise 对象最后状态如何，都会执行的操作

            promise
            .then(result => {···})
            .catch(error => {···})
            .finally(() => {···})

* 常用的构造函数方法：
    * Promise.all() ----将多个 Promise 实例包装成一个新的 Promise 实例
    * const p = Promise.all([p1, p2, p3]);
    * 只有 p1,p2,p3 状态全为 fulfilled，p的状态才会变成fulfilled。此时，p1,p2,p3 的返回值组成一个数组，传递给 p 的回调函数。
    * 只要 p1,p2,p3 有一个状态为 rejected，那么p的状态就变成rejected。此时第一个被reject的实例的返回值，会传递给p的回调函数。
    
    * Promise.race() ----将多个 Promise 实例包装成一个新的Promise实例
    * const p = Promise.race([p1, p2, p3]);
    * 三者谁先改变状态， p也就会跟着改变状态。率先改变的会将返回值传递给p的回调函数。


# 十、类（class）
ES6 引入了class类这个概念，通过class关键字可以定义类，这就是更符合我们平时所理解的面向对象的语言

* 类的声明：class...
* 类的继承：extends
* 静态属性：静态属性不能被子类继承，静态属性只能通过类名来调用，不能通过类的实例来调。
* 静态方法：静态方法中的this，指向的是类class，不是类的实例。因此静态方法只能通过类名来调用，不能通过实例来调用。


# 十一、谈谈你对async/await的理解
* async...await是基于promise的generator语法糖，它用来等待promise的执行结果，常规函数使用await没有效果
* async修饰的函数内部return不会得到预期的结果，会得到一个promise对象
* await等待的promise结果是resolve状态的内容，await 可以阻塞后面代码的执行，reject状态的内容需要使用try...catch获取
* await关键字必须要出现在async修饰的函数中，否则报错


# 十二、箭头函数有哪些特性
* 1、箭头函数是匿名函数，不绑定自己的this, arguments, super, new.target
* 2、箭头函数会捕获其所在上下文的this值，作为自己的this值，在使用call/apply绑定时，相当于只是传入了参数，对this没有影响
* 3、箭头函数不绑定arguments，取而代之用rest参数…解决
* 4、箭头函数当方法使用的时候，没有定义this绑定
* 5、箭头函数不能作为构造函数，和 new 一起用就会抛出错误
* 6、箭头函数没有原型属性
* 7、不能简单返回对象字面量，要用（包起来）

