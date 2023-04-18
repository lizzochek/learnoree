import { createWebHistory, createRouter } from 'vue-router';
import MainPage from '@/components/pages/MainPage';
import LoginPage from '@/components/pages/LoginPage';
import RegisterPage from '@/components/pages/RegisterPage.vue';
import RestorePassPage from '@/components/pages/RestorePassPage.vue';
import MyAccountPage from '@/components/pages/MyAccountPage.vue';

import store from '../store/index.js';

const routes = [
  {
    path: '/',
    redirect: '/main',
  },
  {
    path: '/main',
    name: 'MainPage',
    component: MainPage,
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage,
  },
  {
    path: '/restore',
    name: 'RestorePassPage',
    component: RestorePassPage,
  },
  {
    path: '/my-account',
    name: 'MyAccountPage',
    component: MyAccountPage,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const state = JSON.parse(localStorage.getItem('state'));
  if (to.meta.requiresAuth && !state.login.isLoggedIn) {
    next('/login');
  } else if (
    to.meta.requiresAdmin &&
    state.login.isLoggedIn &&
    !(state.login.user.role == 'admin')
  ) {
    alert('Sorry, you do not have admin rights!');
    next('/news');
  } else if (to.meta.requiresConfirm && !state.login.isAuthorized) {
    alert('Sorry, you need to wait for the admin to confirm your profile!');
    next('/news');
  } else {
    next();
  }
});

export default router;
