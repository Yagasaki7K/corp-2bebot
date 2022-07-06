import Vue from 'vue';
import Router from 'vue-router';
// import Dashboard from '@/views/Dashboard/index.vue'
import Campaign from '@/views/Campaign/index.vue'
import CampaignDetail from '@/views/Campaign/detail.vue'
import Login from '@/views/Login/index.vue'
import Reset from '@/views/Reset/index.vue'
import store from '../store';
import BadGateway from '@/components/BadGateway'
import Profile from '@/views/Profile'
import Users from '@/views/Users'
Vue.use(Router)

const router = new Router({
  routes: [
    // {
    //   path: '/dashboard',
    //   name: 'Relatórios',
    //   component: Dashboard,
    //   props: { page: 1 },
    //   alias: '/',
    //   meta: { requiresAuth: true, admin: true }
    // },
    {
      path: '/campaign',
      name: 'Campanhas',
      props: { page: 4 },
      component: Campaign,
      alias:'/',
      meta: { requiresAuth: true }
    },
    {
      path: '/campaign/:id',
      name: 'Detalhes da campanha',
      props: { page: 4 },
      component: CampaignDetail,
      meta: { requiresAuth: true }
    },
    {
      path: '/users',
      name: 'Usuários',
      props: { page: 5 },
      component: Users,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'Profile',
      props: { page: 10 },
      component: Profile,
      meta: { requiresAuth: true, admin: true }
    },
    {
      path: '/404',
      name: 'BadGateway',
      props: { page: 7 },
      component: BadGateway
    },
    {
      path: '*',
      props: { page: 8 },
      redirect: '/404'
    },
    {
      path: '/login',
      name: 'Login',
      props: { page: 9 },
      component: Login
    },
    {
      path: '/reset',
      name: 'Reset',
      props: { page: 10 },
      component: Reset
    },
  ],
  mode: 'history',
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters['auth/isAuthenticated']) {
      next();
      return;
    }
    next('/login');
  } else {
    if (to.name === 'Login') {
      if (store.getters['auth/isAuthenticated']) {
        next('/');
        return;
      }
    }
    next();
  }
})

export default router;