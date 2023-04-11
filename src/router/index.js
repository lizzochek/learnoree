import { createWebHistory, createRouter } from 'vue-router';
import MainPage from '@/components/pages/MainPage';
import LoginPage from '@/components/pages/LoginPage';
import RegisterPage from '@/components/pages/RegisterPage.vue';
import RestorePassPage from '@/components/pages/RestorePassPage.vue';

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Forbid certain pages for some users + not logged users

export default router;
