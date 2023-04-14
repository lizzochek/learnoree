import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const formatData = (obj) =>
  Object.keys(obj).reduce((accumulator, key) => {
    accumulator[key.charAt(0).toLowerCase() + key.slice(1)] = obj[key];
    return accumulator;
  }, {});

export default createStore({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
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
    async logIn(state, { email, response }) {
      if (response.status == '200') {
        state.isLoggedIn = true;
        sessionStorage.setItem('isLoggedIn', true);

        const userData = await response.json();
        const table =
          userData[0].Role.charAt(0).toUpperCase() +
          userData[0].Role.slice(1) +
          's';

        const data = await fetch(`/api/getUser/${table}/${userData[0].Id}`);
        const parsedData = await data.json();

        sessionStorage.setItem('isAuthorized', userData[0].Authorized);

        parsedData[0] = formatData(parsedData[0]);
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
      else state.user = formatData((await response.json())[0]);
    },
    changePassword(state, response) {
      if (response.status != '200') state.errors.restoreError = true;
    },
    getUser(state, response) {
      if (response.status == '200') state.errors.userExists = true;
    },
    async getSpecialty(state, response) {
      if (response.status == '200') {
        const data = await response.json();
        data[0] = formatData(data[0]);
        state.user.specialty = { ...data[0] };
      }
    },
    async getFaculty(state, response) {
      if (response.status == '200') {
        const data = await response.json();
        data[0] = formatData(data[0]);
        state.user.faculty = { ...data[0] };
      }
    },
    async getStudentGroup(state, response) {
      if (response.status == '200') {
        const data = await response.json();
        data[0] = formatData(data[0]);
        state.user.group = { ...data[0] };
      }
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
    getUser({ commit }, { email }) {
      return fetch(`/api/findByEmail/${email}`).then((response) => {
        commit('getUser', response);
      });
    },
    getSpecialty({ commit }, { id }) {
      return fetch(`/api/findSpecialty/${id}`).then((response) => {
        commit('getSpecialty', response);
      });
    },
    getStudentGroup({ commit }, { id }) {
      return fetch(`/api/findStudentGroup/${id}`).then((response) => {
        commit('getStudentGroup', response);
      });
    },
    getFaculty({ commit }, { id }) {
      return fetch(`/api/findFaculty/${id}`).then((response) => {
        commit('getFaculty', response);
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
    removeError({ commit }, data) {
      commit('removeError', data);
    },
  },
});
