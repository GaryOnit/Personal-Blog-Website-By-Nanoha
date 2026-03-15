/*
 * @Author: Garyonit 3253975221@qq.com
 * @Date: 2025-11-01 13:24:49
 * @LastEditors: Garyonit 3253975221@qq.com
 * @LastEditTime: 2025-11-01 13:25:02
 * @FilePath: \vue-blog\src\util\formateDate.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
function toDouble (num) {
  return String(num)[1] && String(num) || '0' + num;
}

function formateDate (date = new Date(), format = "yyyy-MM-dd hh:mm:ss") {

  let regMap = {
    'y': date.getFullYear(),
    'M': toDouble(date.getMonth() + 1),
    'd': toDouble(date.getDate()),
    'h': toDouble(date.getHours()),
    'm': toDouble(date.getMinutes()),
    's': toDouble(date.getSeconds()),
  }

  //逻辑(正则替换 对应位置替换对应值) 数据(日期验证字符 对应值) 分离
  return Object.entries(regMap).reduce((acc, [reg, value]) => {
    return acc.replace(new RegExp(`${reg}+`, 'g'), value);
  }, format);
}

export default formateDate