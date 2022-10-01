
# 如何取消Promise请求

## 方案1 - 借助reject 方法
我们都知道一个promise对象状态的改变是通过resolve和reject来执行的。
所以可以借助reject方法来终止Promise请求

<pre>
// 返回一个promise和abort方法
function getPromise() {
    let _res, _rej
    const promise = new Promise((resolve, reject) => {
        _res = resolve
        _rej = reject
        setTimeout(() => {
            resolve('123')
        }, 5000);
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

</pre>

## 2、返回一个pending状态的Promise，原Promise链会终止
<pre>
Promise.resolve().then(() => {
    console.log('ok1')
    return new Promise(()=>{})  // 返回“pending”状态的Promise对象
}).then(() => {
    // 后续的函数不会被调用
    console.log('ok2')
}).catch(err => {
    console.log('err:', err)
})
</pre>










