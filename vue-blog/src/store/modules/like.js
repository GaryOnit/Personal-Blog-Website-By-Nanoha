/*
 * @Author: Garyonit 3253975221@qq.com
 * @Date: 2025-10-18 15:43:57
 * @LastEditors: Garyonit 3253975221@qq.com
 * @LastEditTime: 2025-10-18 15:58:14
 * @FilePath: \vue-blog\src\store\modules\like.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import store from 'store'
import base from '@/config/base.config'
import Vue from 'vue'
const { LIKES_NAME } = base
export default {  
  namespaced: true,
  state: {
    likes: store.get(LIKES_NAME) || []    //当前用户点赞文章列表
  },
  getters: {
    // 文章是否存在于当前用户点赞列表
    isLike: state => (aid) => {
      return !!(state.likes.includes(aid))
    }
  },
  mutations: {
    CHANGE_LIKES (state) {
      state.likes = store.get(LIKES_NAME)
    }
  },
  actions: {
    pushLike ({ commit }, payload) {    //提交点赞
      let { aid } = payload   //文章id
      console.log(`using pushLike:${aid}`)
      if (aid) {
        let localLikes = store.get(LIKES_NAME) || []
        let idx = localLikes.indexOf(aid)
        if (idx === -1) {
          localLikes.push(aid)
        }
        store.set(LIKES_NAME, localLikes)
        commit('CHANGE_LIKES')      //每次改变like数组都要commit
      }
    },
    pullLike ({ commit }, payload) {    //取消点赞
      let { aid } = payload   //文章id
      console.log(`using pullLike:${aid}`)
      if (aid) {
        let localLikes = store.get(LIKES_NAME) || []
        let idx = localLikes.indexOf(aid)
        if (idx !== -1) {
          localLikes.splice(idx, 1)
        }
        store.set(LIKES_NAME, localLikes)
        commit('CHANGE_LIKES')    //每次改变like数组都要commit
      }
    },
    async sendLikes ({ rootState }, { aid }) {    //发送like请求
      const uid = rootState.uid
      console.log('调用sendLikes', uid, aid)
      return Vue.prototype.$api({ 
        type: 'articleLikes', 
        data: { 
          aid,
          uid
        }
      })
    }
  },
}
