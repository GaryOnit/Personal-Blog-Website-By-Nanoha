/*
 * @Author: Garyonit 3253975221@qq.com
 * @Date: 2025-09-26 16:56:51
 * @LastEditors: kusachan 3253975221@qq.com
 * @LastEditTime: 2026-03-15 11:02:05
 * @FilePath: \vue-blog\src\api\http.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import service from './common'
import vuex from '@/store'
import store from 'store'
import encrypt from '@/util/encrypt'
import API_LIST from '@/config/api.config'
import base from '@/config/base.config'

const { TOKEN_NAME } = base
export default async function Http ({ type, data }) {
  if (!(type in API_LIST)) {
    throw new Error('API请求错误')
  }
  let { url, method, noMessage = false, rsaKey = false, rest = false, setToken = false } = API_LIST[type]
  try {
    method = method.toLowerCase()
    
    //这段代码就是为了把带占位符的通用 URL 模板（如 /api/user/:id），动态替换成带真实参数的具体 URL（如 /api/user/123）。
    if (rest) {
      let restSymbol = url.match(/:(.*)$/)[1]
      url = url.replace(/:(.*)$/, data[restSymbol])
    }
    //对需要加密的字段,比如密码进行加密
    if (rsaKey && data[rsaKey]) {
      data[rsaKey] = await encrypt(data[rsaKey])
    }
    data = method === 'get' ? { params: data } : data

    //service[method]和service.method同义
    let result = await service[method](url, data)

    if (setToken) {
      let token = result.token;
      let uid = result.userId
      store.set('uid', uid)
      //本地存储token
      store.set(TOKEN_NAME, token)
      //调用vuex的方法进行设置
      vuex.dispatch('login')
    }
    return result
  } catch (error) {
    if (error.response) {
      //http函数作为plugins挂载到了Vue的prototype上 因此this指向vue实例
      let message = error.response.data.message
      if (!noMessage) {
        this.$notify.error({
          title: '错误',
          message
        })
      }
    }
    return Promise.reject(error);
  }
}
