import helpers from '../helpers';

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {
    async setState(_, { response, rootState, prop }) {
      if (response.status == '200') {
        const data = await response.json();
        data[0] = helpers.lowerCaseData(data[0]);
        rootState.login.user[prop] = { ...data[0] };
      }
    },
    async getTeacherCathedraAndFaculty(_, { response, rootState }) {
      if (response.status == '200') {
        const data = await response.json();
        const res = helpers.formatDataWithUnderscore(data[0]);
        rootState.login.user = { ...rootState.login.user, ...res };
      }
    },
  },
  actions: {
    getSpecialty({ commit, rootState }, { id }) {
      return fetch(`/api/getSpecialty/${id}`).then((response) => {
        commit('setState', { response, rootState, prop: 'specialty' });
      });
    },
    getStudentGroup({ commit, rootState }, { id }) {
      return fetch(`/api/getStudentGroup/${id}`).then((response) => {
        commit('setState', { response, rootState, prop: 'group' });
      });
    },
    getFaculty({ commit, rootState }, { id }) {
      return fetch(`/api/getFaculty/${id}`).then((response) => {
        commit('setState', { response, rootState, prop: 'faculty' });
      });
    },
    getTeacherCathedraAndFaculty({ commit, rootState }, { id }) {
      return fetch(`/api/getTeacherCathFac/${id}`).then((response) => {
        commit('getTeacherCathedraAndFaculty', { response, rootState });
      });
    },
  },
};
