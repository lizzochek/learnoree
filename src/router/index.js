import { createWebHistory, createRouter } from 'vue-router';
import MainPage from '../components/pages/MainPage';
import LoginPage from '../components/pages/LoginPage';

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Forbid certain pages for some users + not logged users

export default router;
