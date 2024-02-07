// 导入 Vue 和 VueRouter
import { createRouter, createWebHashHistory } from 'vue-router';

// 导入组件
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Chat from '../views/Chat.vue'
import Wxlogin from '../views/Wxlogin.vue'
import Config from '../views/Config.vue'
import History from '../views/History.vue'

// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: Home,
      name: 'Home',
    },
    {
      path: '/login',
      component: Login,
      name: 'Login',
    },
    {
      path: '/aichat',
      component: Chat,
      name: 'Chat',
    },
    {
      path: '/wxlogin',
      component: Wxlogin,
      name: 'Wxlogin',
    },
    {
      path: '/config',
      component: Config,
      name: 'Config',
    },
    {
      path: '/history',
      component: History,
      name: 'History',
    },
  ],
});

//为路由对象,添加beforeEach导航守卫
router.beforeEach((to, from, next) => {
  //如果用户访问的登录页,直接放行
  if (to.path === '/login') return next()
  //从localStorage中获取到保存的token值
  const tokenStr = window.localStorage.getItem('token')
  //如果没有token,强制跳转到登录页
  if (!tokenStr) return next('/login')
  next()
})

// 导出路由实例，以便在主应用中使用
export default router;
