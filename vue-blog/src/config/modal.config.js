/*
 * @Author: Garyonit 3253975221@qq.com
 * @Date: 2025-10-06 18:51:27
 * @LastEditors: Garyonit 3253975221@qq.com
 * @LastEditTime: 2025-10-06 19:17:25
 * @FilePath: \vue-blog\src\config\modal.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default {
  "login": {      //登录窗口
    title: '登录',
    formType: 'login',
    needUpdate: false,
    btns: [
      {
        targetName: 'close',
        name: '取消'
      },
      {
        targetName: 'confirm',
        name: '提交',
        isSubmit: true
      }
    ]
  },
  "column": {   //添加分类窗口
    title: '添加分类',
    formType: 'postColumn',
    needUpdate: true,
    btns: [
      {
        targetName: 'close',
        name: '取消'
      },
      {
        targetName: 'confirm',
        name: '提交',
        isSubmit: true
      }
    ]
  },
  "register": {     //注册窗口
    title: '注册',
    formType: 'register',
    btns: [
      {
        targetName: 'close',
        name: '取消'
      },
      {
        targetName: 'confirm',
        name: '注册',
        isSubmit: true
      }
    ]
  },
  "userInfo": {       //修改个人信息窗口
    title: '个人信息',
    formType: 'userInfo',
    btns: [
      {
        targetName: 'close',
        name: '取消'
      },
      {
        targetName: 'confirm',
        name: '提交',
        isSubmit: true
      }
    ]
  }
}