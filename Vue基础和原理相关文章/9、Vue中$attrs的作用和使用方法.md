
# Vue中$attrs的作用和使用方法
  * 使用场景举例
  * 官方解释
  * 使用示例

**$attrs**是 vue2.4.0版本以上新增的属性；

## 1、使用场景举例
假如我们现在要二次封装一个组件，我们需要把当前组件获取到的所有的props都传递给子组件，我们可以在当前组件中接收所有的props，然后将props传递给子组件，这样难免有些繁琐，Vue给我们提供了简单的实现方式，就是$attrs。

## 2、官方解释
定义：一个包含了组件所有透传attributes的对象。
详细信息：透传Attributes是指由父组件传入，且没有被子组件声明为props或是组件自定义事件的attributes和事件处理函数。
默认情况下，若是单一根节点组件，$attrs中的所有属性都是直接自动继承自组件的根元素。而多根节点组件则不会如此，同时你也可以通过配置inheritAttrs选项来显式地关闭该行为。

## 3、使用示例
（1）父组件中调用子组件传入属性：
```
<template>
  <son-component
    message="Hello, world!"
    custom-attribute="hello"
  ></son-component>
</template>
```
（2）子组件中，通过v-bind="$attrs"将从父组件传递过来的属性传递给孙子组件：
```
// vue3代码示例
<template>
  <grandson-component v-bind:message="props.message" v-bind="$attrs">{{ message }}</div>
</template>

<script>
export default {
  name: 'Son',
  components: {
  	grandsonComponent,
  },
  props: {
    message: String,  // 在子组件的props中只声明接收message，不处理customAttribute
  },
  setup(props, context) {
    console.log(context.attrs.customAttribute); // 输出：hello，子组件中未显示接收，但可以在attrs属性中获取到
  },
};
</script>
```

（3）孙子组件中通过context.attrs.customAttribute获取到从父组件透传过来的属性：
```
// vue3代码示例
<template>
  <div>{{ message }}</div>
</template>

<script>
export default {
  name: 'Son',
  props: {
    message: String, // 在子组件的props中只声明接收message，不处理customAttribute
  },

  setup(props, context) {
    console.log(context.attrs.customAttribute); // 输出：hello，子组件中未显示接收，但可以在attrs属性中获取到
  },
}
</script>
```

当我们涉及到多层传参的时候，父组件传出去的值，中间的组件不用通过props接收，但是要在子组件（中间组件）身上通过**v-bind="$attrs"**,这样最下层的组件才能拿到最外层组件传过来的值。