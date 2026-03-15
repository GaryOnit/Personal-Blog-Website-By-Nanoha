/*
 * @Author: Garyonit 3253975221@qq.com
 * @Date: 2025-10-02 14:05:55
 * @LastEditors: Garyonit 3253975221@qq.com
 * @LastEditTime: 2025-12-06 17:40:23
 * @FilePath: \vue-blog\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import store from '@/store'

import HomePage from '../views/HomePage.vue'
import ArticlePage from '../views/ArticlePage.vue'
import ArticleList from '../views/ArticleList.vue'
import ColumnPage from '../views/ColumnPage.vue'
import EditorPage from '../views/EditorPage.vue'
import UserPage from '../views/UserPage'
import SocketPage from '../views/SocketPage.vue'

//mobile views
import MHome from '../mviews/MHomePage'
import MArticleList from '../mviews/ArticleList'
import MArticle from '../mviews/ArticlePage'
import MColumn from '../mviews/ColumnPage.vue'
import MUserPage from '../mviews/MUserPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/index',
    component: HomePage,
    children: [
      {
        path: '/index',
        name: 'index',
        component: ArticleList,
        props: (route) => ({
          columnId: route.query.columnId
        })
      },
      {
        path: '/column',
        name: 'column',
        component: ColumnPage,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/article/:id',
        name: 'article',
        component: ArticlePage
      },
      {
        path: '/editor',
        name: 'editor',
        component: EditorPage,
      },
      {
        path: '/user',
        name: 'user',
        component: UserPage,
      },
      {
        path: '/socket',
        name: 'socket',
        component: SocketPage
      },
    ]
  },
  {
    path: '/m',
    name: 'mHome',
    redirect: '/m/articles',
    component: MHome,
    children: [
      {
        path: 'articles',
        name: 'mArticleList',
        component: MArticleList,
        meta: {
          headType: 'SearchBar'
        }
      },
      {
        path: 'article/:id',
        name: 'mArticle',
        component: MArticle,
        meta: {
          headType: 'NavBar',
          title: '文章',
          button: '评论',
          buttonHandler: 'show-comment-action'
        }
      },
      {
        path: 'column',
        name: 'mColumn',
        component: MColumn,
        meta: {
          headType: 'NavBar',
          title: '分类'
        }
      },
      {
        path: 'user',
        name: 'mUser',
        component: MUserPage,
        meta: {
          headType: 'NavBar',
          title: '个人信息'
        },
        props: (route) => {
          return {
            userFormType: route.query.userFormType || 'login'
          }
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  let useAuth = to.meta.requiresAuth //是否需要token
  if (useAuth && !store.state.token) {
    Vue.prototype.$notify.warning({
      title: '通知',
      message: `请先登录`
    })
    NProgress.done()
    next('/index') //重定向到首页
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
