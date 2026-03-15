/*
 * @Author: Garyonit 3253975221@qq.com
 * @Date: 2025-09-26 15:48:53
 * @LastEditors: Garyonit 3253975221@qq.com
 * @LastEditTime: 2025-09-26 16:45:28
 * @FilePath: \vue-blog\src\config\validate.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default {
  username: [
    { required: true, message: '账号必填', trigger: 'blur' },
    { pattern: /^(?!\d+$)(?![a-zA-Z]+$)[a-zA-Z0-9]{6,9}$/, message: '账号格式 数字+字母 6-9位', trigger: 'blur' }],
  email: [
    { required: true, message: '邮箱必填', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }],
  password: [
    { required: true, message: '密码必填', trigger: 'blur' },
    { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!.#*?&]{8,12}$/, message: '密码格式 至少包含大写字母+小写字母+数字 8-12位', trigger: 'blur' }],
  name: [
    { required: true, message: '名称必填', trigger: 'blur' }],
  nickname: [
    { required: true, message: '昵称必填', trigger: 'blur' }
  ]
}