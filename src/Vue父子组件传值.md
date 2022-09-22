# Vue父子组件传值方法总结(六种方法)

## 一.父组件传值给子组件
* 1、props
* 2、$parent, 子组件接收:this.$parents.msg//这个msg是父组件的msg

* 3、依赖注入: 通过父组件提供给后代组件曝露的属性和方法
父组件：provide; 子组件：inject;

## 二、 子组件传值给父组件

* 1、emit
this.$emit("fn", data) // fn: 随便自定义的事件名称，data第二个参数是传值的数据

* 2、ref
this.$refs.childId.name

* 3、终极方法
使用状态管理工具，例如Vuex

## 其他方法：
### 事件总线：
<pre>
<code>
import Vue from 'vue'
export default new Vue()

// main.js
Vue.prototype.$EventBus = new Vue()

import bus from '@/utils/eventBus.js'

bus.$emit('collapse', this.collapse)
bus.$on('collapse', (data) => {
    console.log(data)
})
</code>
</pre>

### 本地存储：
* localStorage
* sessionStorage



