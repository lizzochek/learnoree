import { createStore } from 'vuex';

export default createStore({
  state: {
    isLoggedIn: false,
    user: {},
  },
  modules: {},
  getters: {},
  mutations: {
    async logIn(state, { email, password }) {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const userData = await response.json();

      if (password === userData[0]?.Password) {
        state.isLoggedIn = true;

        const table =
          userData[0].Role.charAt(0).toUpperCase() +
          userData[0].Role.slice(1) +
          's';

        const data = await fetch('/api/getUser', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ table, id: userData[0].Id }),
        });
        const parsedData = await data.json();
        state.user = {
          email,
          authorized: userData[0].Authorized,
          role: userData[0].Role,
          ...parsedData[0],
        };
      }
    },
  },
  actions: {
    logIn({ commit }, data) {
      commit('logIn', data);
    },
  },
});
