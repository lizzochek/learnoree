import { createStore } from 'vuex';

export default createStore({
  state: {
    isLoggedIn: false,
    user: {},
    errors: {},
  },
  modules: {},
  getters: {
    getLoggedIn(state) {
      return state.isLoggedIn;
    },
    getUser(state) {
      return state.user;
    },
    getErrors(state) {
      return state.errors;
    },
  },
  mutations: {
    removeError(state, errName) {
      state.errors[errName] = false;
    },
    async logIn(state, { email, password, response }) {
      const userData = await response.json();

      if (password === userData[0]?.Password) {
        state.isLoggedIn = true;

        const table =
          userData[0].Role.charAt(0).toUpperCase() +
          userData[0].Role.slice(1) +
          's';

        const data = await fetch(`/api/getUser/${table}/${userData[0].Id}`);
        const parsedData = await data.json();
        state.user = {
          email,
          authorized: userData[0].Authorized,
          role: userData[0].Role,
          ...parsedData[0],
        };
      }
    },
    async restorePassword(state, response) {
      if (response.status == '404') state.errors.noUser = true;
    },
    async checkRestorePassToken(state, response) {
      if (response.status == '401') state.errors.tokenError = true;
      else state.user = (await response.json())[0];
    },
    changePassword(state, response) {
      if (response.status != '200') state.errors.restoreError = true;
    },
    getUser(state, response) {
      if (response.status == '200') state.errors.userExists = true;
    },
    registerUser(state, response) {
      if (response.status != '200') state.errors.userExists = true;
    },
  },
  actions: {
    logIn({ commit }, { email, password }) {
      return fetch(`/api/findByEmail/${email}`).then((response) => {
        commit('logIn', { email, password, response });
      });
    },
    restorePassword({ commit }, { email }) {
      return fetch('/api/forgotPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      }).then((response) => {
        commit('restorePassword', response);
      });
    },
    checkRestorePassToken({ commit }, { token }) {
      return fetch('/api/findByToken', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      }).then((response) => {
        commit('checkRestorePassToken', response);
      });
    },
    changePassword(context, { password }) {
      return fetch('/api/changePassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password,
          token: context.state.user.ResetToken,
        }),
      }).then((response) => {
        context.commit('changePassword', response);
      });
    },
    getUser({ commit }, { email }) {
      return fetch(`/api/findByEmail/${email}`).then((response) => {
        commit('getUser', response);
      });
    },
    registerUser({ commit }, { email, password, enteredData, role }) {
      return fetch('/apiRegisterUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          enteredData,
          role,
        }),
      }).then((response) => {
        commit('registerUser', response);
      });
    },
    removeError({ commit }, data) {
      commit('removeError', data);
    },
  },
});
