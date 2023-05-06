import { createStore } from 'vuex';
import login from './modules/login';
import myAccount from './modules/my-account';
import schedule from './modules/schedule';

export default createStore({
  modules: { login, myAccount, schedule },
  state: {
    errors: {},
    newsData: [
      {
        heading: 'What an event!',
        text: 'Something so exciting happened yesterday!',
        date: '05/05/23',
      },
      {
        heading: 'Another event',
        text: 'Something so exciting happened yesterday!',
        date: '05/05/23',
      },
    ],
  },
  getters: {
    getErrors(state) {
      return state.errors;
    },
    getNews(state) {
      return state.newsData;
    },
  },
  mutations: {
    initialiseStore(state) {
      if (localStorage.getItem('state')) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem('state')))
        );
      }
    },
    removeError(state, errName) {
      state.errors[errName] = false;
    },
    updateNews(state, news) {
      state.newsData = news;
    },
  },
  actions: {
    removeError({ commit }, data) {
      commit('removeError', data);
    },
    updateNews({ commit }, data) {
      commit('updateNews', data);
    },
  },
});
