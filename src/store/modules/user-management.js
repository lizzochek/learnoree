import helpers from '../helpers';

export default {
  namespaced: true,
  state: {
    users: [],
    error: false,
  },
  getters: {
    getUsers(state) {
      return state.users;
    },
    getError(state) {
      return state.error;
    },
  },
  mutations: {
    async getUserData(state, response) {
      if (response.status == '200') {
        const data = await response.json();
        Object.keys(data).forEach((key) => {
          data[key].forEach((element, index) => {
            data[key][index] = helpers.lowerCaseData(element);
          });
        });
        state.users = data;
      }
    },
    setAuthorization(state, response) {
      state.error = false;
      if (!response.status == '200') {
        state.error = true;
      }
    },
    deleteUser(state, response) {
      state.error = false;
      if (!response.status == '200') {
        state.error = true;
      }
    },
  },
  actions: {
    getUserData({ commit }) {
      return fetch(`/api/getUsersData`).then((response) => {
        commit('getUserData', response);
      });
    },
    setAuthorization({ commit }, { id, authorizationValue }) {
      return fetch(`/api/setUsersData`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          authorizationValue,
        }),
      }).then((response) => {
        commit('setAuthorization', response);
      });
    },
    deleteUser({ commit }, { id, type }) {
      return fetch(`/api/deleteUser`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          type,
        }),
      }).then((response) => {
        commit('deleteUser', response);
      });
    },
  },
};
