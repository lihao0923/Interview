# Vue中实现【组件局部刷新】及【页面刷新】

* 实现组件局部刷新
* 实现页面刷新

## 1、实现组件局部刷新
**（1）通过设置组件的key属性来触发组件的重新渲染，实现组件局部刷新，**利用**vue虚拟DOM的diff算法**，对比新旧节点时，发现key值改变会重新渲染组件。
```
<template>
  <YourComponent :key="componentKey" />
</template>
<script>
export default {
  data() {
    return {
      componentKey: 0
    };
  },
  methods: {
    refreshComponent() {
      this.componentKey += 1;
    }
  }
};
</script>
```
**（2）使用v-if指令：控制组件显示隐藏，使组件进行重绘达到刷新效果。**
```
<div v-if='isShow'>...<div>
export default {
	data(){
		isShow:true
	},
	method:{
		refresh(){
			this.isShow = false;
			this.$nextTick(() => ){
				this.isShow = true;
			}
		}
	}
}
```
**（3）在需要刷新的组件中，通过 $forceUpdate()方法实现组件渲染的强制更新。** 
当某个组件的数据发生变化，但是该组件的视图没有及时更新，导致页面没有被正确渲染时，可以在需要刷新的组件中调用 $forceUpdate() 方法来强制更新。

例如，在某个组件的某个方法中需要刷新页面，可以这样调用：
```
methods: {
  refresh() {
    this.$forceUpdate();
  }
}
```
但是，因为 $forceUpdate() 是强制更新整个组件，所以会使得组件的所有子组件也重新渲染，从而可能影响到整个页面的性能。因此，在使用该方法时应该慎重考虑，并仅在必要的情况下使用。

## 2、实现页面刷新
**（1）直接调用 location.reload() 方法进行页面刷新**
```
需要注意的是，使用该方法会刷新整个页面，包括Vue实例、组件以及其他的页面元素，可能会导致一些不必要的开销
```

**（2）在路由跳转时，使用 $router.go(0) 方法实现当前页面的刷新**

**（3）使用 window.location.href = window.location.href 实现当前页面的刷新。**
```
刷新范围参考 location.reload()
```
**（4）使用 window.location.reload(true) 方法实现当前页面的刷新，其中 true 表示强制使用缓存刷新。**
```
a. 参数设置为true，那么浏览器会从缓存中加载页面资源，而不是从服务器重新请求资源。

b. 如果将参数设置为 false 或者省略，那么浏览器就会忽略缓存，强制从服务器重新请求资源，实现真正意义上的刷新效果。

c. 刷新范围参考 location.reload()
```
（5）使用 meta 标签中的 http-equiv 属性设置为 refresh 实现页面的自动刷新。

```
a.可以使用 标签中的 http-equiv 属性，配合 content 属性来实现页面的自动刷新。

b.具体来说，可以在HTML文档的 区域中添加如下代码：

<meta http-equiv="refresh" content="3">

c.其中，http-equiv 属性告诉浏览器要用 HTTP 的哪个方法来处理页面，这里设置为 refresh 表示浏览器应该定期刷新页面。content 属性则指定了刷新的间隔时间，这里设置为3秒钟，表示3秒钟页面自动刷新一次。

d.但是，使用 meta 标签实现的自动刷新功能，用户无法手动停止刷新或者修改刷新时间间隔，可能会对用户体验造成一定程度的影响。建议在使用该功能时谨慎考虑，权衡好刷新频率和用户体验的平衡。
```

