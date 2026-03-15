/*
 * @Author: Garyonit 3253975221@qq.com
 * @Date: 2025-10-06 18:51:27
 * @LastEditors: Garyonit 3253975221@qq.com
 * @LastEditTime: 2025-10-07 15:59:24
 * @FilePath: \vue-blog\src\store\modules\modal.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default{
  namespaced: true,
  state:{
    isShow: false,
    type: ''
  },
  mutations:{
    CLOSE(state){
      state.isShow = false
    },
    OPEN(state){
      state.isShow = true
    },
    CHANGE_TYPE(state, payload){
      state.type = payload.type
    }
  },
  actions:{
    close({commit}){
      commit('CLOSE')
    },
    open({commit}, type){
      commit('CHANGE_TYPE', {type})
      commit('OPEN')
    },
    confirm(){

    }
  },
  modules:{

  }
}