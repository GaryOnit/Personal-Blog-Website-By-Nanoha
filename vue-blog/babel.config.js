/*
 * @Author: Garyonit 3253975221@qq.com
 * @Date: 2025-11-09 16:15:56
 * @LastEditors: Garyonit 3253975221@qq.com
 * @LastEditTime: 2025-11-09 19:53:12
 * @FilePath: \vue-blog\babel.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ],
  ]
}
