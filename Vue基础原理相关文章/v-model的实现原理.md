# v-model的实现原理
* `v-model` 功能简介
* `v-model` 实现原理
* `v-model` 实现示例

## 1、v-model 功能简介
```
v-model是Vue.js中用于数据双向绑定的一个指令，它可以将input、textarea和select等表单元素的值与 Vue 实例的数据保持同步，实现修改数据直接渲染到页面上，修改页面上的值也会保存在数据里。
```

## 2、v-model 实现原理
```
v-model的实现原理是依赖于Vue的v-bind指令和@input特性；v-model实际上是一个语法糖，它在内部使用v-bind绑定 value 属性和 input 事件来实现数据的双向绑定。

实现v-model的前提是Vue实例的数据是响应式的，当数据变化时，视图会自动更新。
```

## 3、v-model 实现示例：
```
<template>
  <input :value="inputValue" @input="updateValue($event.target.value)">
</template>
 
<script>
export default {
  data() {
    return {
      inputValue: ''
    };
  },
  methods: {
    updateValue(value) {
      this.inputValue = value;
      this.$emit('input', value);
    }
  }
}
</script>
```

在这个例子中，:value 绑定确保了输入框的值与 inputValue 保持同步。当输入框的值发生变化时，@input 监听了 input 事件，并调用 updateValue 方法。这个方法更新了 inputValue 的值，并且通过 $emit 方法触发了一个新的 input 事件，这样父组件就可以监听这个事件，并对数据进行处理。

**v-model使用限制:**
```
1、绑定的属性必须要叫 value
2、事件必须要叫 input
3、组件只能用一个 v-mode 指令
```