import helpers from '../helpers';

export default {
  namespaced: true,
  state: {
    marks: [],
    groupMarks: [],
    error: false,
  },
  getters: {
    getMarks(state) {
      return state.marks;
    },
    getGroupMarks(state) {
      return state.groupMarks;
    },
  },
  mutations: {
    async getStudentMarks(state, response) {
      state.error = false;
      if (response.status == '200') {
        const data = await response.json();
        data.forEach((element, index) => {
          data[index] = helpers.lowerCaseData(element);
        });
        state.marks = data;
      } else {
        state.error = true;
      }
    },
    async getGroupMarks(state, response) {
      state.error = false;
      if (response.status == '200') {
        const data = await response.json();
        data.forEach((element, index) => {
          data[index] = helpers.lowerCaseData(element);
        });
        state.groupMarks = data;
      } else {
        state.error = true;
      }
    },
  },
  actions: {
    getStudentMarks({ commit }, { id }) {
      return fetch(`/api/getStudentMarks/${id}`).then((response) => {
        commit('getStudentMarks', response);
      });
    },
    getGroupMarks({ commit }, { teacherId }) {
      return fetch(`/api/getGroupMarks/${teacherId}`).then((response) => {
        commit('getGroupMarks', response);
      });
    },
  },
};
