/*
 * @Author: Garyonit 3253975221@qq.com
 * @Date: 2025-09-26 21:17:57
 * @LastEditors: Garyonit 3253975221@qq.com
 * @LastEditTime: 2025-09-28 16:32:23
 * @FilePath: \vue-blog\src\plugins\http.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import http from '@/api/http'

const install = function (Vue) {
  if (install.installed) return
  install.installed = true
  Object.defineProperties(Vue.prototype, {
    $api: {
      get () {
        return http
      },
      enumerable: false, // 不可枚举
      configurable: false // 不可重写
    }
  })
}

Vue.use(install)