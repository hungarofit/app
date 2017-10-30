import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: r => require(['views/index.vue'], r),
      meta: { title: 'Hungarofit' }
    },
    {
      path: '/register',
      name: 'register',
      component: r => require(['views/register.vue'], r),
      meta: { title: 'Hungarofit / Register' }
    },
    {
      path: '/password',
      name: 'password',
      component: r => require(['views/password.vue'], r),
      meta: { title: 'Hungarofit / Password' }
    },
    {
      path: '/login',
      name: 'login',
      component: r => require(['views/login.vue'], r),
      meta: { title: 'Hungarofit / Login' }
    },
    {
      path: '/profile',
      name: 'profile',
      component: r => require(['views/profile.vue'], r),
      meta: { title: 'Hungarofit / Profile' }
    },
  ]
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
