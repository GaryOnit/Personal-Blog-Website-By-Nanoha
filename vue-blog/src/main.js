/*
 * @Author: Garyonit 3253975221@qq.com
 * @Date: 2025-09-21 16:21:16
 * @LastEditors: Garyonit 3253975221@qq.com
 * @LastEditTime: 2025-11-09 18:13:43
 * @FilePath: \vue-blog\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import _ from 'lodash'

import '@/plugins/vant'
import '@/plugins/element'
import '@/plugins/http'
import '@/plugins/vuescroll'
import '@/plugins/animate'

import 'element-ui/lib/theme-chalk/index.css';  //element-ui组件的样式需要单独引入
import '@/assets/css/global.styl'
import 'element-ui/lib/theme-chalk/display.css';


Vue.config.productionTip = false
Vue.prototype._ = _
Vue.prototype.$EventBus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
