import { createStore } from 'vuex';
import login from './modules/login';
import myAccount from './modules/my-account';
import schedule from './modules/schedule';
import marks from './modules/marks';
import subjects from './modules/subjects';

export default createStore({
  modules: { login, myAccount, schedule, marks, subjects },
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
    questionnaireData: [
      {
        heading: 'Education quality questionnaire',
        text: 'You can fill in the questionnaire following this link:',
        link: 'https://forms.gle/cb8Mrx57ePCQp6ZH8',
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
    getQuestionnaire(state) {
      return state.questionnaireData;
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
    updateQuestionnaire(state, news) {
      state.questionnaireData = news;
    },
  },
  actions: {
    removeError({ commit }, data) {
      commit('removeError', data);
    },
    updateNews({ commit }, data) {
      commit('updateNews', data);
    },
    updateQuestionnaire({ commit }, data) {
      commit('updateQuestionnaire', data);
    },
  },
});
