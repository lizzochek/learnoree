import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';

store.subscribe((mutation, state) => {
  if (mutation.type != 'initialiseStore') {
    setTimeout(() => localStorage.setItem('state', JSON.stringify(state)), 100);
  }
});

createApp(App).use(store).use(router).mount('#app');
