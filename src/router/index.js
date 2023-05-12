import { createWebHistory, createRouter } from 'vue-router';
import MainPage from '@/components/pages/MainPage';
import LoginPage from '@/components/pages/LoginPage';
import RegisterPage from '@/components/pages/RegisterPage.vue';
import RestorePassPage from '@/components/pages/RestorePassPage.vue';
import MyAccountPage from '@/components/pages/MyAccountPage.vue';
import NewsPage from '@/components/pages/NewsPage.vue';
import SchedulePage from '@/components/pages/SchedulePage.vue';
import MarksPage from '@/components/pages/MarksPage.vue';
import ExamResPage from '@/components/pages/ExamResPage.vue';
import QuestionnairePage from '@/components/pages/QuestionnairePage.vue';
import StudentReportPage from '@/components/pages/StudentReportPage.vue';

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
    path: '/news',
    name: 'NewsPage',
    component: NewsPage,
  },
  {
    path: '/my-account',
    name: 'MyAccountPage',
    component: MyAccountPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/schedule',
    name: 'SchedulePage',
    component: SchedulePage,
    meta: { requiresAuth: true },
  },
  {
    path: '/marks',
    name: 'MarksPage',
    component: MarksPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/exams',
    name: 'ExamsPage',
    component: ExamResPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/questionnaire',
    name: 'QuestionnairePage',
    component: QuestionnairePage,
    meta: { requiresAuth: true },
  },
  {
    path: '/report',
    name: 'StudentReportPage',
    component: StudentReportPage,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const state = JSON.parse(localStorage.getItem('state'));
  if (to.meta.requiresAuth && !state?.login.isLoggedIn) {
    next('/login');
  } else if (to.path == '/main' && state?.login?.isLoggedIn) {
    next('/my-account');
  } else if (
    to.meta.requiresAdmin &&
    state?.login?.isLoggedIn &&
    !(state?.login?.user?.role == 'admin')
  ) {
    alert('Sorry, you do not have admin rights!');
    next('/news');
  } else if (to.meta.requiresConfirm && !state?.login?.isAuthorized) {
    alert('Sorry, you need to wait for the admin to confirm your profile!');
    next('/news');
  } else {
    next();
  }
});

export default router;
