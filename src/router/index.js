import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../views/index.vue'),
      meta: { title: 'Hungarofit' }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/register.vue'),
      meta: { title: 'Hungarofit / Register' }
    },
    {
      path: '/password',
      name: 'password',
      component: () => import('../views/password.vue'),
      meta: { title: 'Hungarofit / Password' }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue'),
      meta: { title: 'Hungarofit / Login' }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/profile.vue'),
      meta: { title: 'Hungarofit / Profile' }
    },
  ]
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
