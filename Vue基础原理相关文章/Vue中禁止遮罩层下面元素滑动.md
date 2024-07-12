# Vue中禁止遮罩层下面元素滑动

在遮罩层标签上添加 @touchmove.prevent即可防止遮罩层下面的元素能滑动。

例：
```
<div class=“mask” @touchmove.prevent></div>
```

真机测试可用，浏览器或模拟器不可用

