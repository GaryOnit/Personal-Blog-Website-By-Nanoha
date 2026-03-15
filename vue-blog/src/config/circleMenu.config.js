/*
 * @Author: Garyonit 3253975221@qq.com
 * @Date: 2025-10-03 17:59:26
 * @LastEditors: Garyonit 3253975221@qq.com
 * @LastEditTime: 2025-10-18 15:41:49
 * @FilePath: \vue-blog\src\config\circleMenu.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default {
  home:()=>[ {
    icon: "el-icon-edit-outline",
    route: "/editor"
  }],
  index: () => [
    {
      icon: "el-icon-edit-outline",
      route: "/editor"
    }
  ],
  column: () => [
    {
      icon: 'el-icon-plus',
      handler: 'addColumn'
    }
  ],
  article: () => [
    {
      icon: "el-icon-star-on",
      exce: true,
    },
    {
      icon: "el-icon-edit",
      handler: "handlerFocusTextarea"
    }
  ]
}