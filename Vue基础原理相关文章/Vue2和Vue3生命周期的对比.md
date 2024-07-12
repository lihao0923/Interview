# Vue2和Vue3生命周期的对比

## 一、Vue2和Vue3生命周期对照表

| 触发时机 | vue2.x | vue3.x |
|-------|--------|--------|
| 组件创建时运行 | beforeCreate<br>created | setup |
| 挂载在DOM时运行 | beforeMount<br>mounted | onBeforeMount<br>onMounted |
| 响应数据修改时运行 | beforeUpdate<br>updated | onBeforeUpdate<br>onUpdated |
| 元素销毁前执行 | beforeDestroy<br>destroyed | onBeforeUnmount<br>onUnmounted |
| 管理Keep-Alive组件 | activated<br>deactivated | onActivated<br>onDeactivated|
| Vue3 Debug Hooks | -<br>- | onRenderTriggered<br>onRenderTracked |


## 二、Vue2和Vue3生命周期图示
### 1、Vue2生命周期图
![Alt text](./images/lifecycle2.png)

### 2、Vue3生命周期图
![Alt text](./images/lifecycle3.png)

