import helpers from '../helpers';

export default {
  namespaced: true,
  state: {
    marks: [],
    error: false,
  },
  getters: {
    getMarks(state) {
      return state.marks;
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
  },
  actions: {
    getStudentMarks({ commit }, { id }) {
      return fetch(`/api/getStudentMarks/${id}`).then((response) => {
        commit('getStudentMarks', response);
      });
    },
  },
};
