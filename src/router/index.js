import { createWebHistory, createRouter } from 'vue-router';
import MainPage from '../components/MainPage';

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Forbid certain pages for some users + not logged users

export default router;
