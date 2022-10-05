let、const、var的区别
变量提升

var 声明的变量存在变量提升，即变量可以在声明前调用，值为 undefined。

let 和 const 不存在变量提升，变量一定要声明之后才能使用，否则会报错。

暂时性死区

var 不存在暂时性死区

let 和 const 存在暂时性死区，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

块级作用域

var 不存在块级作用域

let 和 const 存在块级作用域

初始值设置

var 和 let 可以不设置初始值

const 声明变量必须设置初始值

重复声明

var 允许重复声明变量

let 和 const 不允许重复声明变量，会抛出 SyntaxError 的错误

数据修改

var 和 let 可以修改数据

const 定义的常量是基本数据类型，不能修改。定义的常量要是引用数据类型，就可以修改。因为保存在栈内存的数据是不可以被修改的。而基本数据类型是直接存储在栈内存中的，所以不能被修改。引用数据类型在栈内存中存储的是一个指针，真正的数据存储在指针指向的堆地址，不可被修改的是指针，真正的数据是可变的。

重新赋值

var 和 let 声明的变量都可以重新赋值

const 声明的变量不能重新赋值

解构赋值
数组的解构赋值

    // 数组的解构赋值
    const arr = ['小1','小2','小3','小泽']
    let [b,q,h,ze] = arr // 或者等于 ['小1','小2','小3','小泽']
    console.log(b);
    console.log(q);
    console.log(h);
对象的解构赋值

//对象的解构赋值
let redian = {
      name: '1',
      chaozuo: function () {
        console.log('1');
      },
      dance: function () {
        console.log('2');
      }
    }
​
    let {chaozuo,dance} = redian;
    chaozuo();
    dance();
模板字符串
``(反引号)

使用回车换行：标签与标签之 间能直接换行使用

变量、表达式拼接：直接使用${} 进行拼接

// 1·能回车换行
    let name = 
               `<ul>
                  <li>1</li>  
                  <li>2</li>  
                  <li>3</li>  
                </ul>`;
    console.log(name);
    console.log(typeof name);
​
    // 2.字符串拼接
    let age = 18
    let str = `我今年${age}岁了！`
    console.log(str);
箭头函数
箭头函数中的this指向的是外层作用域下this的值

没有自己的arguments对象，但是可以访问外围函数的arguments对象

不能通过 new 关键字调用

适合使用箭头函数的场景： 与this无关的回调设置。定时器、数组方法回调。

不适合使用箭头函数的场景： 与this有关的回调设置。事件回调、对象中的方法。

书写格式例子：

//定时器
setTimeout(() => {
          //箭头函数中的this指向的是外层作用域下this的值
          console.log(this.data)
         },1000)
函数形参默认值
为形参赋默认值，有传实参用实参，没有用默认值

// es6允许给形参赋初始值
    // 参数直接设置默认值，位置一般靠后
    function add(a,b,c=2) {
      console.log(a + b + c);
    }
    add(1,2)
// 与解构赋值结合使用 结构赋值的先后不影响
    function connect({name, age=18, sex}) {
      console.log(name);
      console.log(age);
      console.log(sex);
    }
    connect({
      name:'小宝',
      sex: 'man'
    })
rest参数
用来代替arguments，直接获取一个真数组，方便操作 (arguments返回的是伪数组)

// rest 参数用来代替 arguments 的
    function main(...args) {
      console.log(arguments);
      console.log(args);
    }
    main(1,2,3,4,5,6,7,8);
简化对象写法
let name = '1'
    let change = function () {
      console.log('你好');
    }
    // 
    let obj = {
      // 变量的简化
      name,
      change,
      // 方法的简化
      improve() {
        console.log('提升');
      }
    }
    console.log(obj);
    obj.change();
    obj.improve();
扩展运算符
...能将「数组」转为逗号分隔的「参数序列] ,是 rest 的逆运算

数组的展开

// 数组的展开
      const arr = [1, 2, 3]
      function fn () {
        console.log(arguments);
      }
      fn(...arr); //fn(1, 2, 3)
对象的展开

// 对象的展开
      const one = {
        1: 'one'
      }
      const two = {
        2: 'two'
      }
      const three = {
        3: 'three'
      }
      const four = {
        4: 'four'
      }
      // 进行对象的合并
      const hero = {...one,...two,...three,...four}
      console.log(hero); // {1: 'one', 2: 'two', 3: 'three', 4: 'four'}
Symbol
Symbol 是 ES6 新引入的一种原始数据类型，表示独一无二的值。它是 js 第七种数据类型 是一种类似于字符串的数据类型。

特点

Symbol 的值是唯一的，常用来解决命名冲突问题。

Symbol 的值不能和其他数据进行运算。

创建方法

//创建 Symbol
let h = Symbol()
console.log(h) //Symbol()
console.log(typeof h) //"symbol"
​
//正常的 Symbol
let h1 = Symbol('小宝')
let h2 = Symbol('小宝')
console.log(h1 === h2) // false
​
//相等的Symbol   ----使用 Symbol.for()
let h3 = Symbol.for('小宝')
let h4 = Symbol.for('小宝')
console.log(h1 === h2) // true
使用场景（唯一且合理使用方式：为对象添加唯一属性）

let school = {
      name: '南山幼儿园'
    }
    let goto = Symbol()
    // 为 school 对象创建一个独一无二的方法名 避免覆盖掉对象中相同方法名的方法
    school[goto] = function () {
      console.log('去上学');
    }
    // 调用这个方法
    school[goto]()
集合（set）
Set是es6新增的数据结构，类似于数组，但是成员的值都是唯一的，没有重复的值，我们一般称为集合

方法：add()、delete()、has()、clear()

// 声明集合 自动去重
    const s = new Set([1,2,3,41,12,21,1,1,1,2,3,4])
    console.log(s); //[1,2,3,41,12,21,4]
    // 1.元素个数
    console.log(s.size); //7
    // 2.添加
    s.add(8)
    // 3.删除
    s.delete(1)
    console.log(s);//[2,3,41,12,21,4,8]
    // 4.检测是否包含某个元素
    console.log(s.has(2)); //true
    // 5.清空
    // s.clear()
    console.log(s); //[]
应用场景： 数组去重、求交、并、差集。

字典（Map）
Map类型是键值对的有序列表，而键和值都可以是任意类型

属性和方法：size()、set()、get()、has()、delete()、clear()

// 声明Map
        let m = new Map()
​
        // 1.添加元素(键值对)
        m.set('name','小宝')
        m.set('age',18)
​
        // 2.获取元素
        console.log(m.get(name)) //小宝
​
        // 3.删除元素
        m.delete('name')
​
        // 4.获取元素个数
        let size = m.size
        console.log(size) //1
​
        // 5.检测是否包含某个元素
        console.log(m.has('age')); //true
        
        // 6.清空Map
        m.clear()
        console.log(m) //0
Promise
Promise 是ES6引入的异步编程的新解决方案。比传统的解决方案（回调函数）更加合理和更加强大

状态：pending（进行时）、fulfilled（已成功）、rejected（已失败）

用法： Promise 对象是一个构造函数，会接受一个函数作为参数，这个函数的两个参数分别是 resolve和reject

resolve 函数的作用是将 Promise 对象的状态从 “未完成” 变为 “成功”

reject 函数的作用是将 Promise 对象的状态从 “未完成” 变为 “失败”

const promise = new Promise(function(resolve, reject) {});
实例方法：

then() ---- 实例状态发生变化时，触发的回调函数，第一个参数是 resolved状态的回调函数，第二个参数是 rejected 的回调函数（一般使用 catch 方法来替代第二个参数）

catch() ---- 用于指定发生错误的回调函数

finally() --- 用于指定 不管 Promise 对象最后状态如何，都会执行的操作

promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});
常用的构造函数方法：

Promise.all() ----将多个 Promise 实例包装成一个新的 Promise 实例

const p = Promise.all([p1, p2, p3]);
只有 p1,p2,p3 状态全为 fulfilled ，p 的状态才会变成fulfilled。此时，p1,p2,p3 的返回值组成一个数组，传递给 p 的回调函数。

只要 p1,p2,p3 有一个状态为 rejected ，那么 p 的状态就变成 rejected。此时第一个被reject的实例的返回值，会传递给p的回调函数。

Promise.race() ----将多个 Promise 实例包装成一个新的 Promise 实例

const p = Promise.race([p1, p2, p3]);
三者谁先改变状态， p 也就会跟着改变状态。率先改变的会将返回值传递给 p 的回调函数。

类（class）
ES6 引入了class类这个概念，通过class关键字可以定义类，这就是更符合我们平时所理解的面向对象的语言

简单的类

//类的声明
    class Phone {
      //构造方法 不是必须的，但是constructor名字不能修改
      constructor(brand, price) {
        this.brand = brand;
        this.price = price;
      }
​
      //声明成员方法
      call(someone) {
        console.log(`我可以给${someone}打电话`);
      }
      sendMessage(someone) {
        console.log(`我可以给${someone}打电话`);
      }
​
      //声明静态成员
      static name = '手机';
      static change() {
        console.log('吃了吗');
      }
    }
类的继承

//子类继承父类
    class SmartPhone extends Phone {
      //子类的构造方法
      constructor(brand,price,screen,pixel) {
        //调用父类的构造方法进行初始化  super
        super(brand,price);
        this.screen = screen;
        this.pixel = pixel;
      }
      //方法声明
      playGame() {
        console.log('我可以玩游戏');
      }
​
      sw() {
        console.log('我可以上网');
      }
    }
​
    // 子类实例化
    const onePlus = new SmartPhone('1+', 3999, 6.5, '4800w');
    console.log(onePlus);
​
    console.dir(Phone)
    console.log(Phone.name);
取值函数getter和存值函数setter

let data=[1,2,3,4];  //放在类外面，属于私有变量，可以只读取
class Phone{
    // 构造函数
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    get x(){
        console.log('获得name');
        return this._name;    //get读取属性
    }
    set x(x){
        console.log("设置name");  
        this._name=x;   //set给属性赋值
    }
    get data(){
        return data;   //只读属性，属性返回的值只能是私有变量
    }
}
静态属性

static name = '小宝';  // 静态属性
静态属性不能被子类继承，子类不能调用

静态属性只能通过类名来调用，不能通过类的实例来调。

静态方法

static sleep(){
        console.log('睡觉')
    }
静态方法不会被子类继承，子类不能调用

静态方法中的this，指向的是类class，不是类的实例。因此静态方法只能通过类名来调用，不能通过实例来调用。

浅拷贝
直接赋值

1.直接赋值
    let arr = [1,2,3,4];
    let result = arr;
    result[0] = '1234';
    console.log(arr);
    console.log(result);
数组

concat

      const result = [].concat(arr);
​
      result[3].name = 'ptu'
      console.log(arr);
      console.log(result);
slice

      const result = arr.slice(0)
      result[3].name = 'ptu';
      console.log(arr);
      console.log(result);
扩展运算符

      const result = [...arr];
​
      result[3].name = 'ptu';
      console.log(arr);
      console.log(result);
对象：使用Object.assign(空对象，旧对象)

      const school = {
        name: 'ptu',
        add: ['福州', '莆田', '厦门'],
        founder: {
          name: '小宝',
          age: 18
        }
      };
​
      const result = Object.assign({},school);
      result.add[0] = '泉州';
      console.log(school);
      console.log(result);
深拷贝
JSON：先用 JSON.stringify 将对象转为字符串，再使用 JSON.parse 将字符串转为一个新对象

缺点就是不能复制方法

//源对象
    const school = {
        name: 'ptu',
        add: ['福州', '莆田', '厦门'],
        founder: {
          name: '小宝',
          age: 18
        }
      };
​
    //JSON
    //stringify 对象转字符串
    //parse  字符串转对象
    //将对象转为字符串
    const str = JSON.stringify(school);
    console.log(school);
    console.log(str);
    console.log(typeof str);
    //将 JSON 字符串转化为新的对象
    const obj = JSON.parse(str);
    //修改新对象属性
    obj.add[2] = '漳州'
    console.log(obj);   
封装一个函数，实现递归深拷贝

    //封装一个函数 实现递归深拷贝
    function deepClone(data) {
      //创建一个容器
      let container;
      //获取目标数据类型
      let type = getDataType(data) //Array ||  Object
      //判断
      if(type === 'Object') {
        container = {}
      }
      if(type === 'Array') {
        container = []
      }
​
      //属性的添加
      //先遍历data数据 for...in
      for(let i in data) {
        //获取属性类型
        let type = getDataType(data[i])
        if(type === 'Array' || type === 'Object') {
          container[i] = deepClone(data[i]); //继续递归
        }else {
          container[i] = data[i];
        }
      }
      return container;
    }
​
    //封装一个函数 获取获取数据类型
    function getDataType(data) {
      return Object.prototype.toString.call(data).slice(8,-1)
    }















6、谈谈你对async/await的理解
async...await是基于promise的generator语法糖，它用来等待promise的执行结果，常规函数使用await没有效果；

async修饰的函数内部return不会得到预期的结果，会得到一个promise对象；

await等待的promise结果是resolve状态的内容，await 可以阻塞后面代码的执行，reject状态的内容需要使用try...catch获取，

await关键字必须要出现在async修饰的函数中，否则报错。


9、谈谈你对promise的理解
Promise用来解决异步回调问题，由于js是单线程的，很多异步操作都是依靠回调方法实现的，这种做法在逻辑比较复杂的回调嵌套中会相当复杂；也叫做回调地狱；promise用来将这种繁杂的做法简化，让程序更具备可读性，可维护性；

promise内部有三种状态，pedding，fulfilled，rejected；pedding表示程序正在执行但未得到结果，即异步操作没有执行完毕，fulfilled表示程序执行完毕，且执行成功，rejected表示执行完毕但失败；这里的成功和失败都是逻辑意义上的；并非是要报错。

其实，promise和回调函数一样，都是要解决数据的传递和消息发送问题，promise中的then一般对应成功后的数据处理，catch一般对应失败后的数据处理。



2、箭头函数有哪些特性
1、箭头函数是匿名函数，不绑定自己的this,arguments,super,new.target

2、箭头函数会捕获其所在上下文的this值，作为自己的this值，在使用call/apply绑定时，相当于只是传入了参数，对this没有影响

3、箭头函数不绑定arguments，取而代之用rest参数…解决

4、箭头函数当方法使用的时候，没有定义this绑定

5、箭头函数不能作为构造函数，和 new 一起用就会抛出错误

6、箭头函数没有原型属性

7、不能简单返回对象字面量，要用（包起来）


