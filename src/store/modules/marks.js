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
    getError(state) {
      return state.error;
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
    async setMark(state, response) {
      state.error = false;
      if (!response.status == '200') state.error = true;
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
    setMark({ commit }, { studentId, mark, taskType, subjectId }) {
      return fetch('/api/setMark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId,
          mark,
          taskType,
          subjectId,
        }),
      }).then((response) => {
        commit('setMark', response);
      });
    },
  },
};
