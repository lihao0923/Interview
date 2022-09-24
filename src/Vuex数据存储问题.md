# Vuex刷新数据丢失问题出在哪里?
* 因为js代码运行在内存中，代码运行时所有的变量和函数都是保存在内存中的，
但我们按下F5的时候以前申请的内存将会被释放，并会被重新加载js脚本，变量重新赋值。
所以在我们使用vuex的时候只要一刷新数据就没了。
如果我们想要持久化保存可以使用localStorage或者sessionStorage存储本地数据保证刷新后数据不会丢失。

## 使用本地存储
<pre>
<code>
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    // 直接使用本地存储的方式
    name: JSON.parse(sessionStorage.getItem('name')) || 'name'
  },
  mutations: {
    set(state, data) {
      // 修改数据的时候直接存到本地
      sessionStorage.setItem('name', JSON.stringify(data))
      state.name = data
    }
  },
})
</code>
</pre>

## 使用插件方式
<pre>
<code>
    npm install vuex-persistedstate --save

    import Vue from 'vue'
    import Vuex from 'vuex'
    // 配置插件vuex-persistedstate插件
    <strong>import createPersistedState from 'vuex-persistedstate';</strong>
    
    Vue.use(Vuex)
    export default new Vuex.Store({
      <strong>plugins: [createPersistedState()],</strong>
      state: {
        name: 'name'
      },
      mutations: {
        set(state, data) {
          state.name = data
        }
      }
    })
</code>
</pre>
