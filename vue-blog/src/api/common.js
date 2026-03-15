/*
 * @Author: Garyonit 3253975221@qq.com
 * @Date: 2025-09-26 16:58:03
 * @LastEditors: Garyonit 3253975221@qq.com
 * @LastEditTime: 2025-10-09 17:11:09
 * @FilePath: \vue-blog\src\api\common.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios'
import store from 'store'
import base from '@/config/base.config'

//基础config属性
const { BASE_URL, TIMEOUT, TOKEN_NAME } = base
//创建axios服务
const service = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT
})

//request 拦截器
//config中包含url,请求头,请求体参数,url拼接参数等
service.interceptors.request.use(async (config) => {
  let token = store.get(TOKEN_NAME)
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error);
});

//response 拦截器
//response包含config,返回数据,响应状态码等
service.interceptors.response.use((response) => {
  //剥离最外层
  let result = response.data
  return result?.data;
}, (error) => {
  return Promise.reject(error);
});

export default service
