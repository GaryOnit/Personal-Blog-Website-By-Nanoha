/*
 * @Author: Garyonit 3253975221@qq.com
 * @Date: 2025-10-08 17:44:07
 * @LastEditors: Garyonit 3253975221@qq.com
 * @LastEditTime: 2025-10-09 15:58:08
 * @FilePath: \vue-blog\src\config\form.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default {
  "login": [
    {
      label: "用户名",
      query: "username",
      type: "text",
      placeholder: "用户名: 6-8位 字母数字",
    },
    {
      label: "密码",
      query: "password",
      type: "password",
      placeholder: "密码: 8-12位 最少包含一位(数字/大小写字母)",
    }
  ],
  "column": [
    {
      label: "分类名称",
      query: "name",
      type: "text",
      placeholder: "请填写分类名称"
    }
  ],
  "register": [
    {
      label: "用户名",
      query: "username",
      type: "text",
      placeholder: "用户名: 6-8位 字母数字"
    },
    {
      label: "邮箱",
      query: "email",
      type: "text",
      placeholder: "请输入邮箱地址"
    },
    {
      label: "密码",
      query: "password",
      type: "password",
      placeholder: "密码: 8-12位 最少包含一位(数字/大小写字母)"
    }
  ],
  "userInfo": [
    {
      label: "用户名",
      query: "username",
      type: "text",
      readonly: true,
      placeholder: "用户名: 6-8位 字母数字"
    },
    {
      label: "昵称",
      query: "nickname",
      type: "text",
      placeholder: "请输入昵称"
    },
    {
      label: "头像",
      query: "avatar",
      type: 'avatar',
    },
    {
      label: "邮箱",
      query: "email",
      type: "text",
      placeholder: "请输入邮箱地址"
    },
    {
      label: "签名",
      query: "signature",
      type: "text",
      placeholder: "请输入你的个性签名"
    }
  ]
}
