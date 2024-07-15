# Vue异步渲染DOM原理分析


## 1、什么是异步更新DOM？
```
将多次数据变化合并到一个批处理中，从而减少了不必要的DOM操作。

例如在一个方法内重新更新一个值，Vue会在本轮数据更新后，再去异步更新视图，而不是每次对响应式数据改动都去更新DOM。
this.msg = 1;
this.msg = 2;
this.msg = 3;
```
## 2、Vue为什么采用异步方式更新

Vue的异步更新队列机制的优势在于：

* 性能优化：批量更新可以减少频繁的DOM操作，从而提高性能。如果每次数据变化都立即触发DOM更新，可能会导致频繁的重绘和回流，影响页面的流畅性和性能。
* 减少重复更新：如果在同一事件循环中发生多次数据变化，Vue会将它们合并为一个更新，避免多次无谓的DOM更新。
* 防止过度渲染：在某些情况下，组件的数据可能会在同一事件循环中发生多次变化。如果每次变化都立即触发DOM更新，可能会导致不必要的重复渲染。
* 提升用户体验：异步更新可以确保Vue在适当的时机执行DOM更新，从而减少阻塞主线程的情况，保证用户界面的响应性。

## 3、Vue中异步渲染解析

> Vue利用浏览器的事件循环机制，在更新DOM时是异步执行的，只要侦听到数据变化，Vue将开启一个队列，并缓存在同一事件循环中发生的所有数据变更，如果同一个watcher被多次触发，只会被推入到队列中一次，这种在缓冲时去除重复数据对于避免不必要的计算和DOM操作是非常重要的，然后，在下一个的事件循环tick中，Vue刷新队列并执行实际(已去重的)工作，Vue在内部对异步队列尝试使用原生的Promise.then、MutationObserver和setImmediate，如果执行环境不支持，则会采用setTimeout(fn,0)代替。

假如多次在一个方法内更新同一个值（直观体验同步渲染和异步渲染的区别）
```
	this.msg = 1;
	this.msg = 2;
	this.msg = 3;
```
根据以上代码，我们真正想要的其实只是最后一次赋值更新，也就是说前两次赋值DOM更新都是可以省略的，我们只需要等所有状态都修改好之后再进行渲染就可以。

假设这里是同步更新队列，this.msg=1，大致会发生这些事: msg值更新 -> 触发setter -> 触发Watcher的update -> 重新调用 render -> 生成新的vdom -> dom-diff -> dom更新，这里的dom更新并不是渲染(即布局、绘制、合成等一系列步骤)，而是更新内存中的DOM树结构，之后再运行this.msg=2，再重复上述步骤，之后的第3次更新同样会触发相同的流程，等开始渲染的时候，最新的DOM树中确实只会存在更新完成3，从这里来看，前2次对msg的操作以及Vue内部对它的处理都是无用的操作，可以进行优化处理。

如果是异步更新队列，会是下面的情况，运行this.msg=1，并不是立即进行上面的流程，而是将对msg有依赖的Watcher都保存在队列中，该队列可能这样[Watcher1, Watcher2…]，当运行this.msg=2后，同样是将对msg有依赖的Watcher保存到队列中，Vue内部会做去重判断，这次操作后，可以认为队列数据没有发生变化，第3次更新也是上面的过程，当然，你不可能只对msg有操作，你可能对该组件中的另一个属性也有操作，比如this.otherMsg=othermessage，同样会把对otherMsg有依赖的Watcher添加到异步更新队列中，因为有重复判断操作，这个Watcher也只会在队列中存在一次，本次异步任务执行结束后，会进入下一个任务执行流程，其实就是遍历异步更新队列中的每一个Watcher，触发其update，然后进行重新调用render -> new vdom -> dom-diff -> dom更新等流程，但是这种方式和同步更新队列相比，不管操作多少次msg， Vue在内部只会进行一次重新调用真实更新流程，所以，对于异步更新队列不是节省了渲染成本，而是节省了Vue内部计算及DOM树操作的成本，不管采用哪种方式，渲染确实只有一次。

此外，组件内部实际使用VirtualDOM进行渲染，也就是说，组件内部其实是不关心哪个状态发生了变化，它只需要计算一次就可以得知哪些节点需要更新，也就是说，如果更改了N个状态，其实只需要发送一个信号就可以将DOM更新到最新，如果我们更新多个值。

此处我们分三次修改了三种状态，但其实Vue只会渲染一次，因为VIrtualDOM只需要一次就可以将整个组件的DOM更新到最新，它根本不会关心这个更新的信号到底是从哪个具体的状态发出来的。

而为了达到这个目的，我们需要将渲染操作推迟到所有的状态都修改完成，为了做到这一点只需要将渲染操作推迟到本轮事件循环的最后或者下一轮事件循环，也就是说，只需要在本轮事件循环的最后，等前面更新状态的语句都执行完之后，执行一次渲染操作，它就可以无视前面各种更新状态的语法，无论前面写了多少条更新状态的语句，只在最后渲染一次就可以了。

将渲染推迟到本轮事件循环的最后执行渲染的时机会比推迟到下一轮快很多，所以Vue优先将渲染操作推迟到本轮事件循环的最后，如果执行环境不支持会降级到下一轮，Vue的变化侦测机制(setter)决定了它必然会在每次状态发生变化时都会发出渲染的信号，但Vue会在收到信号之后检查队列中是否已经存在这个任务，保证队列中不会有重复，如果队列中不存在则将渲染操作添加到队列中，之后通过异步的方式延迟执行队列中的所有渲染的操作并清空队列，当同一轮事件循环中反复修改状态时，并不会反复向队列中添加相同的渲染操作，所以我们在使用Vue时，修改状态后更新DOM都是异步的。

当数据变化后会调用notify方法，将watcher遍历，调用update方法通知watcher进行更新，这时候watcher并不会立即去执行，在update中会调用queueWatcher方法将watcher放到了一个队列里，在queueWatcher会根据watcher的进行去重，若多个属性依赖一个watcher，则如果队列中没有该watcher就会将该watcher添加到队列中，然后便会在nextTick方法的执行队列中加入一个flushSchedulerQueue方法(这个方法将会触发在缓冲队列的所有回调的执行)，然后将nextTick方法的回调加入nextTick方法中维护的执行队列，flushSchedulerQueue中开始会触发一个before的方法，其实就是beforeUpdate，然后watcher.run()才开始真正执行watcher，执行完页面就渲染完成，更新完成后会调用updated钩子。

当用户数据更新时，Vue将会维护一个缓冲队列，对于所有的更新数据将要进行的组件渲染与DOM操作进行一定的策略处理后加入缓冲队列，然后便会在nextTick方法的执行队列中加入一个flushSchedulerQueue方法(这个方法将会触发在缓冲队列的所有回调的执行)，然后将nextTick方法的回调加入nextTick方法中维护的执行队列，在异步挂载的执行队列触发时就会首先会首先执行flushSchedulerQueue方法来处理DOM渲染的任务，然后再去执行nextTick方法构建的任务，这样就可以实现$nextTick方法中取得已渲染完成的DOM结构。在测试的过程中发现了一个很有意思的现象，在上述例子中的加入两个按钮，在点击updateMsg按钮的结果是3 2 1，点击updateMsgTest按钮的运行结果是2 3 1。
```
<!DOCTYPE html>
<html>
<head>
    <title>Vue</title>
</head>
<body>
    <div id="app"></div>
</body>
<script src="https://cdn.bootcss.com/vue/2.4.2/vue.js"></script>
<script type="text/javascript">
    var vm = new Vue({
        el: '#app',
        data: {
            msg: 'Vue'
        },
        template:`
            <div>
                <div ref="msgElement">{{msg}}</div>
                <button @click="updateMsg">updateMsg</button>
                <button @click="updateMsgTest">updateMsgTest</button>
            </div>
        `,
        methods:{
            updateMsg: function(){
                this.msg = "Update";
                setTimeout(() => console.log(1))
                Promise.resolve().then(() => console.log(2))
                this.$nextTick(() => {
                    console.log(3)
                })
            },
            updateMsgTest: function(){
                setTimeout(() => console.log(1))
                Promise.resolve().then(() => console.log(2))
                this.$nextTick(() => {
                    console.log(3)
                })
            }
        },
    })
</script>
</html>
```

这里假设运行环境中Promise对象是完全支持的，那么使用setTimeout是宏队列在最后执行这个是没有异议的，但是使用nextTick方法以及自行定义的Promise实例是有执行顺序的问题的，虽然都是微队列任务，但是在Vue中具体实现的原因导致了执行顺序可能会有所不同，首先直接看一下nextTick方法的源码，关键地方添加了注释，请注意这是Vue2.4.2版本的源码，在后期nextTick方法可能有所变更。

```
/**
 * Defer a task to execute it asynchronously.
 */
var nextTick = (function () {
  // 闭包 内部变量
  var callbacks = []; // 执行队列
  var pending = false; // 标识，用以判断在某个事件循环中是否为第一次加入，第一次加入的时候才触发异步执行的队列挂载
  var timerFunc; // 以何种方法执行挂载异步执行队列，这里假设Promise是完全支持的
  function nextTickHandler () { // 异步挂载的执行任务，触发时就已经正式准备开始执行异步任务了
    pending = false; // 标识置false
    var copies = callbacks.slice(0); // 创建副本
    callbacks.length = 0; // 执行队列置空
    for (var i = 0; i < copies.length; i++) {
      copies[i](); // 执行
    }
  }
  // the nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:

  /* istanbul ignore if */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve();
    var logError = function (err) { console.error(err); };
    timerFunc = function () {
      p.then(nextTickHandler).catch(logError); // 挂载异步任务队列

      // in problematic UIWebViews, Promise.then doesn't completely break, but
      // it can get stuck in a weird state where callbacks are pushed into the
      // microtask queue but the queue isn't being flushed, until the browser
      // needs to do some other work, e.g. handle a timer. Therefore we can
      // "force" the microtask queue to be flushed by adding an empty timer.

      if (isIOS) { setTimeout(noop); }
    };
  } else if (typeof MutationObserver !== 'undefined' && (
    isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === '[object MutationObserverConstructor]'
  )) {
    // use MutationObserver where native Promise is not available,
    // e.g. PhantomJS IE11, iOS7, Android 4.4
    var counter = 1;
    var observer = new MutationObserver(nextTickHandler);
    var textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
      characterData: true
    });
    timerFunc = function () {
      counter = (counter + 1) % 2;
      textNode.data = String(counter);
    };
  } else {
    // fallback to setTimeout
    /* istanbul ignore next */
    timerFunc = function () {
      setTimeout(nextTickHandler, 0);
    };
  }
  return function queueNextTick (cb, ctx) { // nextTick方法真正导出的方法
    var _resolve;
    callbacks.push(function () { // 添加到执行队列中 并加入异常处理
      if (cb) {
        try {
          cb.call(ctx);
        } catch (e) {
          handleError(e, ctx, 'nextTick');
        }
      } else if (_resolve) {
        _resolve(ctx);
      }
    });

    //判断在当前事件循环中是否为第一次加入，若是第一次加入则置标识为true并执行timerFunc函数用以挂载执行队列到Promise
    // 这个标识在执行队列中的任务将要执行时便置为false并创建执行队列的副本去运行执行队列中的任务，参见nextTickHandler函数的实现
    // 在当前事件循环中置标识true并挂载，然后再次调用nextTick方法时只是将任务加入到执行队列中，直到挂载的异步任务触发，便置标识为false然后执行任务，再次调用nextTick方法时就是同样的执行方式然后不断如此往复

    if (!pending) { 
      pending = true;
      timerFunc();
    }
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise(function (resolve, reject) {
        _resolve = resolve;
      })
    }
  }
})();
```

回到刚才提出的问题上，在更新DOM操作时会先触发nextTick方法的回调，解决这个问题的关键在于谁先将异步任务挂载到Promise对象上。

首先对有数据更新的updateMsg按钮触发的方法进行debug，断点设置在Vue.js的715行，版本为2.4.2，在查看调用栈以及传入的参数时可以观察到第一次执行nextTick方法的其实是由于数据更新而调用的nextTick(flushSchedulerQueue);语句，也就是说在执行this.msg = “Update”;的时候就已经触发了第一次的nextTick方法，此时在nextTick方法中的任务队列会首先将flushSchedulerQueue方法加入队列并挂载nextTick方法的执行队列到Promise对象上，然后才是自行自定义的Promise.resolve().then(() => console.log(2))语句的挂载，当执行微任务队列中的任务时，首先会执行第一个挂载到Promise的任务，此时这个任务是运行执行队列，这个队列中有两个方法，首先会运行flushSchedulerQueue方法去触发组件的DOM渲染操作，然后再执行console.log(3)，然后执行第二个微队列的任务也就是() => console.log(2)，此时微任务队列清空，然后再去宏任务队列执行console.log(1)。

接下来对于没有数据更新的updateMsgTest按钮触发的方法进行debug，断点设置在同样的位置，此时没有数据更新，那么第一次触发nextTick方法的是自行定义的回调函数，那么此时nextTick方法的执行队列才会被挂载到Promise对象上，很显然在此之前自行定义的输出2的Promise回调已经被挂载，那么对于这个按钮绑定的方法的执行流程便是首先执行console.log(2)，然后执行nextTick方法闭包的执行队列，此时执行队列中只有一个回调函数console.log(3)，此时微任务队列清空，然后再去宏任务队列执行console.log(1)。

简单来说就是谁先挂载Promise对象的问题，在调用nextTick方法时就会将其闭包内部维护的执行队列挂载到Promise对象，在数据更新时Vue内部首先就会执行nextTick方法，之后便将执行队列挂载到了Promise对象上，其实在明白Js的Event Loop模型后，将数据更新也看做一个nextTick方法的调用，并且明白nextTick方法会一次性执行所有推入的回调，就可以明白其执行顺序的问题了，下面是一个关于nextTick方法的最小化的DEMO。

```
var nextTick = (function(){
    var pending = false;
    const callback = [];
    var p = Promise.resolve();
    var handler = function(){
        pending = true;
        callback.forEach(fn => fn());
    }
    var timerFunc = function(){
        p.then(handler);
    }
    return function queueNextTick(fn){
        callback.push(() => fn());
        if(!pending){
            pending = true;
            timerFunc();
        }
    }
})();

(function(){
    nextTick(() => console.log("触发DOM渲染队列的方法")); // 注释 / 取消注释 来查看效果
    setTimeout(() => console.log(1))
    Promise.resolve().then(() => console.log(2))
    nextTick(() => {
        console.log(3)
    })
})();
```
