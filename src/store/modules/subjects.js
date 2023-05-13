import helpers from '../helpers';

export default {
  namespaced: true,
  state: {
    choiseSubjects: [],
    chosenSubjects: [],
    error: false,
  },
  getters: {
    getChoiseSubjects(state) {
      return state.choiseSubjects;
    },
    getChosenSubjects(state) {
      return state.chosenSubjects;
    },
    getError(state) {
      return state.error;
    },
  },
  mutations: {
    async getChoiseSubjects(state, response) {
      if (response.status == '200') {
        const data = await response.json();
        data.forEach((element, index) => {
          data[index] = helpers.lowerCaseData(element);
        });
        state.choiseSubjects = data;
      }
    },
    async getChosenSubjects(state, response) {
      if (response.status == '200') {
        const data = await response.json();
        data.forEach((element, index) => {
          data[index] = helpers.lowerCaseData(element);
        });
        state.chosenSubjects = data;
      }
    },
    async setChosenSubject(state, response) {
      state.error = false;
      if (!response.status == '200') {
        state.error = true;
      }
    },
  },
  actions: {
    getChoiseSubjects({ commit }, { id }) {
      return fetch(`/api/getChoiseSubjects/${id}`).then((response) => {
        commit('getChoiseSubjects', response);
      });
    },
    getChosenSubjects({ commit }, { id }) {
      return fetch(`/api/getChosenSubjects/${id}`).then((response) => {
        commit('getChosenSubjects', response);
      });
    },
    setChosenSubject({ commit }, { subjectId, studentId }) {
      return fetch('/api/setChosenSubject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectId,
          studentId,
        }),
      }).then((response) => {
        commit('setChosenSubject', response);
      });
    },
  },
};
