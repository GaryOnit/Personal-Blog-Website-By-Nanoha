/*
 * @Author: Garyonit 3253975221@qq.com
 * @Date: 2025-11-23 21:11:07
 * @LastEditors: Garyonit 3253975221@qq.com
 * @LastEditTime: 2025-11-23 21:11:22
 * @FilePath: \vue-blog\.postcssrc.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
  plugins: {
    'autoprefixer': {
      overrideBrowserslist: ["last 15 versions"]
    },
    'postcss-pxtorem': {
      rootValue: 75,//结果为：设计稿元素尺寸/32(一般750px的设计稿的根元素大小设置32)，比如元素宽320px,最终页面会换算成 10rem 设置1rem = 100px
      propList: ['*'], //属性的选择器，*表示通用
      selectorBlackList: ['.van', '.el-', '.blog', '.typo', '.markdown']    //忽略的选择器   .ig-  表示 .ig- 开头的都不会转换
    }
  }
}