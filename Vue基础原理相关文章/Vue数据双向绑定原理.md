# Vue数据双向绑定原理（内容可能有缺失）

* 什么是Vue的数据双向绑定
* Vue底层如何实现数据双向绑定
* Vue2和Vue3数据双向绑定的区别

## 一、什么是双向数据绑定
```
简单理解：数据双向绑定就是 Vue 中 data 数据改变会自动更新到视图上，视图有改动也会自动保存在 data 中。Vue 是利用 MVVM 的模式实现的数据双向绑定。
```
```
MVVM是“Model-View-ViewModel”，它是一种设计模式，用于实现用户界面的分离和交互。
```

![Alt text](/images/vbind1.png)

```
MVVM 模式组成部分分为以下四种：

1、Model(模型)：代表真实状态的内容，即数据访问层(包含数据实体以及数据实体的操作)。

2、View(视图)：用户能在屏幕上看到的结构、布局和外观，负责数据显示以及交互。

3、ViewModel(视图模型)：暴露公共属性和命名的视图的抽象，将Model和View进行绑定，两者在进行数据更改时能实时刷新。ViewModel能够观察到数据的变化，并对视图对应的内容进行更新；ViewModel能够监听到视图的变化，并通知数据发生变化。

4、绑定器：在视图模型中，在视图与数据绑定器之间进行通信。
```

通过上图我们发现：在 Vue 中关键点在于 data 如何更新 view ，因为 view 更新 data 其实可以通过事件监听即可，比如 input 标签监听 ‘input’ 事件就可以实现了。所以我们着重来分析下，当数据改变，如何更新视图的。

## 二、Vue底层如何实现数据双向绑定

```
首先我们需要知道：vue.js是采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调来渲染视图。
```

![Alt text](/images/vbind2.png)

```
1、我们已经知道实现数据的双向绑定，首先要对数据进行劫持监听，所以我们需要设置一个监听器Observer，用来监听所有属性。

2、如果属性发上变化了，就需要告诉订阅者Watcher看是否需要更新。

3、因为订阅者是有很多个，所以我们需要有一个消息订阅器Dep来专门收集这些订阅者，然后在监听器Observer和订阅者Watcher之间进行统一管理的。

4、接着，我们还需要有一个指令解析器Compile，对每个节点元素进行扫描和解析，将相关指令对应初始化成一个订阅者Watcher，并替换模板数据或者绑定相应的函数，此时当订阅者Watcher接收到相应属性的变化，就会执行对应的更新函数，从而更新视图。
```


接下来我们执行以下3个步骤，实现数据的双向绑定：

#### 1、实现一个监听器Observer
用来劫持并监听所有属性，如果有变动的，就通知订阅者。其实现核心方法就是前文所说的Object.defineProperty( )。如果要对所有属性都进行监听的话，那么可以通过递归方法遍历所有属性值，并对其进行Object.defineProperty( )处理。如下代码，实现了一个Observer。
```
function defineReactive(data, key, val) {
    observe(val); // 递归遍历所有子属性，给所有的属性都添加getter和setter监听
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            return val;
            console.log('监听属性的获取事件')
        },
        set: function(newVal) {
            val = newVal;
            console.log('监听属性的更改事件');
        }
    });
}
 
function observe(data) {
    if (!data) {
        return;
    }
    Object.keys(data).forEach(function(key) {
        defineReactive(data, key, data[key]);
    });
};
```
#### 2、创建一个可以容纳订阅者的消息订阅器Dep
订阅器Dep主要负责收集订阅者，然后在属性变化的时候执行对应订阅者的更新函数。将订阅器Dep添加一个订阅者设计在getter里面，这是为了让Watcher初始化进行触发，因此需要判断是否要添加订阅者。在setter函数里面，如果数据变化，就会去通知所有订阅者，订阅者们就会去执行对应的更新的函数。
```
function defineReactive(data, key, val) {
    observe(val); // 递归遍历所有子属性，给所有的属性都添加getter和setter监听
    var dep = new Dep(); 
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            if (是否需要添加订阅者) {
                dep.addSub(watcher); // 在这里添加一个订阅者
            }
            return val;
        },
        set: function(newVal) {
            if (val === newVal) {
                return;
            }
            val = newVal;
            dep.notify(); // 如果数据变化，通知所有订阅者
        }
    });
}
 
function Dep () {
    this.subs = [];
}
Dep.prototype = {
    addSub: function(sub) {
        this.subs.push(sub);
    },
    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
};
```
#### 3、实现一个订阅者Watcher
实现一个订阅者Watcher，可以收到属性的变化通知并执行相应的函数，从而更新视图。订阅者Watcher在初始化的时候需要将自己添加进订阅器Dep中，那该如何添加呢？我们已经知道监听器Observer是在get函数执行了添加订阅者Wather的操作的，所以我们只要在订阅者Watcher初始化的时候触发对应的get函数去执行添加订阅者操作即可。那要如何触发get的函数，只要获取对应的属性值就可以触发了，核心原因就是因为我们使用了Object.defineProperty( )进行数据监听。这里还有一个细节点需要处理，我们只要在订阅者Watcher初始化的时候才需要添加订阅者，所以需要做一个判断操作，因此可以在订阅器上做一下手脚：在Dep.target上缓存下订阅者，添加成功后再将其去掉就可以了。
```
function Watcher(vm, exp, cb) {
    this.cb = cb;
    this.vm = vm;
    this.exp = exp;
    this.value = this.get();  // 将自己添加到订阅器的操作
}
 
Watcher.prototype = {
    update: function() {
        this.run();
    },
    run: function() {
        var value = this.vm.data[this.exp];
        var oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
            this.cb.call(this.vm, value, oldVal);
        }
    },
    get: function() {
        Dep.target = this;  // 缓存自己
        var value = this.vm.data[this.exp]  // 强制执行监听器里的get函数
        Dep.target = null;  // 释放自己
        return value;
    }
};
```
这时候，我们需要对监听器Observer也做个稍微调整，主要是对应Watcher类原型上的get函数。需要调整地方在于defineReactive函数：
```
function defineReactive(data, key, val) {
    observe(val); // 递归遍历所有子属性
    var dep = new Dep(); 
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            if (Dep.target) {.  // 判断是否需要添加订阅者
                dep.addSub(Dep.target); // 在这里添加一个订阅者
            }
            return val;
        },
        set: function(newVal) {
            if (val === newVal) {
                return;
            }
            val = newVal;
            dep.notify(); // 如果数据变化，通知所有订阅者
        }
    });
}
```
#### 4、实现一个解析器Compile，实现步骤：

(1)解析模板指令，并替换模板数据，初始化视图。

(2)将模板指令对应的节点绑定对应的更新函数，初始化相应的订阅器
为了解析模板，首先需要获取到dom元素，然后对含有dom元素上含有指令的节点进行处理，因此这个环节需要对dom操作比较频繁，所有可以先建一个fragment片段，将需要解析的dom节点存入fragment片段里再进行处理：
```
function nodeToFragment (el) {
    var fragment = document.createDocumentFragment();
    var child = el.firstChild;
    while (child) {
        // 将Dom元素移入fragment中
        fragment.appendChild(child);
        child = el.firstChild
    }
    return fragment;
}
```
接下来需要遍历各个节点，对含有相关指定的节点进行特殊处理，这里先处理最简单的情况，只对带有 ‘{{变量}}’ 这种形式的指令进行处理，后面再考虑更多指令情况：

```
function compileElement (el) {
    var childNodes = el.childNodes;
    var self = this;
    [].slice.call(childNodes).forEach(function(node) {
        var reg = /\{\{(.*)\}\}/;
        var text = node.textContent;
 
        if (self.isTextNode(node) && reg.test(text)) {  // 判断是否是符合这种形式{{}}的指令
            self.compileText(node, reg.exec(text)[1]);
        }
 
        if (node.childNodes && node.childNodes.length) {
            self.compileElement(node);  // 继续递归遍历子节点
        }
    });
},

function compileText (node, exp) {
    var self = this;
    var initText = this.vm[exp];
    updateText(node, initText);  // 将初始化的数据初始化到视图中
    new Watcher(this.vm, exp, function (value) {  // 生成订阅器并绑定更新函数
        self.updateText(node, value);
    });
},
```
获取到最外层节点后，调用compileElement函数，对所有子节点进行判断，如果节点是文本节点且匹配{{}}这种形式指令的节点就开始进行编译处理，编译处理首先需要初始化视图数据，接下去需要生成一个并绑定更新函数的订阅器。这样就完成指令的解析、初始化、编译三个过程，一个解析器Compile也就可以正常的工作了。


## 三、Vue2和Vue3数据双向绑定的区别
Vue2和Vue3在双向绑定原理上的区别主要体现在以下几个方面：

#### 1、数据响应式系统：
* Vue2：使用Object.defineProperty实现数据的响应式。
* Vue3：使用Proxy代替Object.defineProperty，并且结合Reflect操作目标对象，提供更完善的代理能力。
#### 2、模板编译方式：
* Vue2：模板在编译时转换为渲染函数。
* Vue3：模板使用了新的编译系统，可以更好地支持原生Custom DOM，并且生成的代码更加精简。
#### 3、响应式系统的使用：
* Vue2：需要手动管理依赖和触发更新。
* Vue3：使用Composition API，内部有更细粒度的响应式系统控制，可以更容易地管理依赖和触发更新。
#### 4、响应式原理的性能：
* Vue2：使用getter/setter增加了一些性能开销。
* Vue3：Proxy直接代理属性，减少了多余的调用，并且提供了更优的捕获机制，性能更优。
#### 5、与第三方库的兼容性：
* Vue2：可能需要额外的库来支持Proxy。
* Vue3：可以直接使用Proxy，无需额外库。
