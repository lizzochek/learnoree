import { createWebHistory, createRouter } from 'vue-router';


const routes = [
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Forbid certain pages for some users + not logged users

export default router;
