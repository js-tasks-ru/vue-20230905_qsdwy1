import { createRouter, createWebHistory } from 'vue-router';
import PageIndex  from '../views/PageIndex'
import PageLogin from '../views/PageLogin'
import PageRegister from '../views/PageRegister'

export const router = createRouter({
  history: createWebHistory('/05-vue-router/01-AuthPages'),
  routes: [
    {
      path: '/',
      component: PageIndex,
      name: 'index',
    },
    {
      path: '/login',
      component: PageLogin,
      name: 'login',
    },
    {
      path: '/register',
      component: PageRegister,
      name: 'register',
    },
  ],
});
