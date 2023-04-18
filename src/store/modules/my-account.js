import helpers from '../helpers';

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {
    async getSpecialty(_, { response, rootState }) {
      if (response.status == '200') {
        const data = await response.json();
        data[0] = helpers.lowerCaseData(data[0]);
        rootState.login.user.specialty = { ...data[0] };
      }
    },
    async getFaculty(_, { response, rootState }) {
      if (response.status == '200') {
        const data = await response.json();
        data[0] = helpers.lowerCaseData(data[0]);
        rootState.login.user.faculty = { ...data[0] };
      }
    },
    async getStudentGroup(_, { response, rootState }) {
      if (response.status == '200') {
        const data = await response.json();
        data[0] = helpers.lowerCaseData(data[0]);
        rootState.login.user.group = { ...data[0] };
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
      return fetch(`/api/findSpecialty/${id}`).then((response) => {
        commit('getSpecialty', { response, rootState });
      });
    },
    getStudentGroup({ commit, rootState }, { id }) {
      return fetch(`/api/findStudentGroup/${id}`).then((response) => {
        commit('getStudentGroup', { response, rootState });
      });
    },
    getFaculty({ commit, rootState }, { id }) {
      return fetch(`/api/findFaculty/${id}`).then((response) => {
        commit('getFaculty', { response, rootState });
      });
    },
    getTeacherCathedraAndFaculty({ commit, rootState }, { id }) {
      return fetch(`/api/findTeacherCathedraAndFaculty/${id}`).then(
        (response) => {
          commit('getTeacherCathedraAndFaculty', { response, rootState });
        }
      );
    },
  },
};
