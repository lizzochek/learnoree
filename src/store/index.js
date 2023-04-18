import { createStore } from 'vuex';
import login from './modules/login';
import myAccount from './modules/my-account';

export default createStore({
  state: {
    errors: {},
  },
  modules: { login, myAccount },
  getters: {
    getErrors(state) {
      return state.errors;
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
  },
  actions: {
    removeError({ commit }, data) {
      commit('removeError', data);
    },
  },
});
