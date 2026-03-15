<!--
 * @Author: Garyonit 3253975221@qq.com
 * @Date: 2025-10-03 18:00:28
 * @LastEditors: Garyonit 3253975221@qq.com
 * @LastEditTime: 2025-11-09 17:49:11
 * @FilePath: \vue-blog\src\components\base\BaseCircleMenu.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <transition-group tag="div" class="blog-circle-menu" appear name="circle">
    <el-button
      v-for="item in menuList"
      :key="item.icon"
      size="medium"
      class="blog-btn-menu"
      @click="clickMenu(item)"
      :icon="item.icon"
      circle
    ></el-button>
    <el-button
      v-if="exceMenu"
      key="likes"
      size="medium"
      class="blog-btn-menu"
      :class="{ active: isLike }"
      @click="handlerArticleLike"
      :icon="exceMenu.icon"
      circle
    ></el-button>
  </transition-group>
</template>

<script>
import MIXIN from "@/core/mixin";
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("like");

export default {
  name: "BaseCircleMenu",
  mixins: [MIXIN],
  props: {
    circleMenuList: {
      type: Array,
    },
  },
  data() {
    return {};
  },
  computed: {
    menuList() {
      return this.circleMenuList.filter((item) => {
        return !item.exce; //menuList只保留没有exce属性的
      });
    },
    exceMenu() {
      return this.circleMenuList.filter((item) => {
        return item.exce;
      })[0];
    },
    isLike() {
      let aid = this.$route.params.id;
      return this.checkLike(aid);
    },
    ...mapGetters({
      checkLike: "isLike",
    }),
  },
  mounted() {},
  methods: {
    async handlerArticleLike() {
      if (!localStorage.getItem("ua_token")) {
        this.$notify.warning({
          title: "通知",
          message: "请先登录",
        });
        return; // 直接返回，不执行点赞操作
      }

      let aid = this.$route.params.id;
      this[this.isLike ? "pullLike" : "pushLike"]({ aid });
      await this.sendLikes({ aid });
    },
    handlerFocusTextarea() {
      this.$EventBus.$emit("focusTextarea");
    },
    addColumn() {
      this.refreshModal("column"); //添加分类
    },
    clickMenu(item) {
      let { route, handler } = item;
      if (route) {
        this.$router.push(route); //切换到指定路由
      }
      if (handler) {
        this[handler] && this[handler](); //执行相应的handler
      }
    },
    ...mapActions(["pullLike", "pushLike", "sendLikes"]),
  },
};
</script>

<style lang="stylus" >
.blog-circle-menu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
}

.el-button--medium.blog-btn-menu {
  width: 60px;
  height: 60px;
  font-size: 28px;

  &:active, &:focus {
    background: #FFF;
    border: 1px solid #fff;
    color: #606266;
    outline: 0;
  }
}

.el-button--medium.blog-btn-menu.active {
  color: #3a8ee6;
  border-color: #3a8ee6;
}

.el-button--medium.blog-btn-menu + .el-button--medium.blog-btn-menu {
  margin: 10px 0;
}

.circle-enter-active, .circle-leave-active {
  transition: transform 0.5s ease-in-out;
}

.circle-enter {
  transform: translateX(-80px);
}

.circle-leave-to {
  transform: translateX(0);
}
</style>