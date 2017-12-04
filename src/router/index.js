import Vue from 'vue'
import Router from 'vue-router'
import titles from './titles'
Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: resolve => require(["@/pages/home"], resolve)
    },
    {
      path: '/post',
      name: 'post',
      component: resolve => require(["@/pages/post"], resolve)
    },
    {
      path: '/my',
      name: 'my',
      component: resolve => require(["@/pages/my/my"], resolve)
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(["@/pages/my/login"], resolve)
    },
    {
      path: '/reg',
      name: 'reg',
      component: resolve => require(["@/pages/my/reg"], resolve)
    },
    {
      path: '/my/tasks',
      name: 'my_tasks',
      component: resolve => require(["@/pages/my/tasks"], resolve)
    },
    {
      path: '/task/:id',
      name: 'task_detail',
      component: resolve => require(["@/pages/task/detail"], resolve)
    },
  ]
})
router.beforeEach((to, from, next) => {
  document.title = titles[to.path];
  next();
})
export default router
