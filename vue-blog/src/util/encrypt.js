/*
 * @Author: kusachan 3253975221@qq.com
 * @Date: 2026-03-10 17:14:24
 * @LastEditors: kusachan 3253975221@qq.com
 * @LastEditTime: 2026-03-15 11:05:36
 * @FilePath: \vue-blog\src\util\encrypt.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import forge from 'node-forge'
import store from 'store'
import base from '@/config/base.config'
import service from '@/api/common'

const {PUBKEY_NAME} = base
//前端加密函数
export default async function encrypt(value) {
  //获取pubKey
  let pubKey = store.get(PUBKEY_NAME)
  try {
    //pubKey不存在,重新获取pubKey
    if (!pubKey || pubKey === undefined) {
      let result = await service.get('/keys')
      pubKey = result.pubKey
      pubKey = pubKey.replace(/\. +/g, '')
      pubKey = pubKey.replace(/[\r\n]/g, '')
      store.set(PUBKEY_NAME, pubKey)
    }
    //加密流程
    const publicObj = forge.pki.publicKeyFromPem(pubKey)
    let bytes = publicObj.encrypt(value, 'RSA-OAEP')
    return forge.util.encode64(bytes)
  } catch (err) {
    console.log(err)
  }
}