/*
 * @Author: Garyonit 3253975221@qq.com
 * @Date: 2025-09-26 15:48:53
 * @LastEditors: Garyonit 3253975221@qq.com
 * @LastEditTime: 2025-11-08 19:51:39
 * @FilePath: \vue-blog\src\store\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import Vuex from 'vuex'
import store from 'store'
import base from '@/config/base.config'
import http from '@/api/http'
import { io } from 'socket.io-client'
import router from '../router'

import modal from './modules/modal'
import like from './modules/like'


Vue.use(Vuex)

const { TOKEN_NAME } = base
let actMe = false

export default new Vuex.Store({
  state: {
    token: store.get(TOKEN_NAME) || "",
    userInfo: {},
    uid: store.get('uid') || "",
    live2dDis: false
  },
  getters: {
    userInfo (state) {
      if (state.token) {
        return state.userInfo
      }
      return {}
    }
  },
  mutations: { //不允许异步
    RIGHT_LIVE2D_DIS (state) {
      state.live2dDis = true
    },
    LEFT_LIVE2D_DIS (state) {
      state.live2dDis = false
    },
    SET_TOKEN (state) {
      state.token = store.get(TOKEN_NAME)
    },
    CANCEL_TOKEN (state) {
      state.token = ""
      store.remove(TOKEN_NAME)
    },
    CANCEL_UID (state) {
      state.uid = ""
      store.remove('uid')
    },
    SET_USERINFO (state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: { //允许异步
    async login ({ dispatch, commit }) {
      commit('SET_TOKEN')
      dispatch('getUserInfo')
    },
    async logout ({ dispatch, commit }) {
      actMe = true
      Vue.prototype.$ws?.close()
      commit('CANCEL_TOKEN')
      commit('CANCEL_UID')
    },
    async online ({ commit, getters }) {
      Vue.prototype.$ws = io(process.env.VUE_APP_USER_CHAT_PATH, { transports: ['websocket'] })
      let { _id, nickname } = getters.userInfo

      Vue.prototype.$ws.emit('online', { uid: _id, nickname })
      
      Vue.prototype.$ws.on('disconnect', () => {
        Vue.prototype.$ws = null
        let message = `再见 ${nickname}`

        if (!actMe) {
          message = `账号已在其他设备登录`
        }
        Vue.prototype.$notify.success({
          title: '退出登录',
          message
        })
        
        actMe = false
        
        if (router.app._route.name !== 'index') {
          router.push('/index')
        }
        commit('CANCEL_TOKEN')
      })
    },
    async getUserInfo ({ dispatch, commit }) {
      try {
        let userInfo = await http({ type: 'getUserInfo' })
        commit('SET_USERINFO', userInfo)
        Vue.prototype.$notify.success({
          title: '登录成功',
          message: `欢迎您 ${userInfo.nickname}`
        })
        dispatch('online')
      } catch (err) {
        console.log(err)
      }
    }
  },
  modules: {
    modal,like
  }
})
