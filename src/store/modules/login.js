import helpers from '../helpers';

export default {
  namespaced: true,
  state: {
    isLoggedIn: false,
    user: {},
    isAuthorized: true,
  },
  getters: {
    getLoggedIn(state) {
      return state.isLoggedIn;
    },
    getUser(state) {
      return state.user;
    },
  },
  mutations: {
    async logIn(state, { email, response }) {
      if (response.status == '200') {
        state.isLoggedIn = true;

        const userData = await response.json();
        const table =
          userData[0].Role.charAt(0).toUpperCase() +
          userData[0].Role.slice(1) +
          's';

        const data = await fetch(`/api/getUser/${table}/${userData[0].Id}`);
        const parsedData = await data.json();

        state.isAuthorized = userData[0].Authorized;

        parsedData[0] = helpers.lowerCaseData(parsedData[0]);
        state.user = {
          email,
          authorized: userData[0].Authorized,
          role: userData[0].Role,
          ...parsedData[0],
        };
      }
    },
    logOut(state) {
      (state.user = {}), (state.isLoggedIn = false);
      state.isAuthorized = false;
    },
    async restorePassword(state, response) {
      if (response.status == '404') state.errors.noUser = true;
    },
    async checkRestorePassToken(state, response) {
      if (response.status == '401') state.errors.tokenError = true;
      else state.user = helpers.lowerCaseData((await response.json())[0]);
    },
    changePassword(state, response) {
      if (response.status != '200') state.errors.restoreError = true;
    },
    getUser(state, response) {
      if (response.status == '200') state.errors.userExists = true;
    },
    registerUser(state, { email, enteredData, role, response }) {
      if (response.status != '200') {
        state.errors.userExists = true;
      } else {
        state.isLoggedIn = true;
        state.isAuthorized = false;

        state.user = {
          email,
          authorized: false,
          ...enteredData,
          role,
        };
      }
    },
  },
  actions: {
    logIn({ commit }, { email, password }) {
      return fetch(`/api/findByEmail/${email}/${password}`).then((response) => {
        commit('logIn', { email, response });
      });
    },
    logOut({ commit }) {
      commit('logOut');
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
    getUser({ commit }, { email }) {
      return fetch(`/api/findByEmail/${email}`).then((response) => {
        commit('getUser', response);
      });
    },
    checkRestorePassToken({ commit }, { token }) {
      return fetch(`/api/findByToken/${token}`).then((response) => {
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
    registerUser({ commit }, { email, password, enteredData, role }) {
      return fetch('/api/registerUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          enteredData,
          role,
        }),
      }).then((response) => {
        commit('registerUser', {
          email,
          enteredData,
          role,
          response,
        });
      });
    },
  },
};
