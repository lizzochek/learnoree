import helpers from '../helpers';

export default {
  namespaced: true,
  state: {
    choiseAllowed: true,
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
    getChoiseAllowed(state) {
      return state.choiseAllowed;
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
    setChosenSubject(state, response) {
      state.error = false;
      if (!response.status == '200') {
        state.error = true;
      }
    },
    setUnchooseSubject(state, response) {
      state.error = false;
      if (!response.status == '200') {
        state.error = true;
      }
    },
    deleteSubject(state, response) {
      state.error = false;
      if (!response.status == '200') {
        state.error = true;
      }
    },
    addSubject(state, response) {
      state.error = false;
      if (!response.status == '200') {
        state.error = true;
      }
    },
    setChoiseAllowed(state, allowed) {
      state.choiseAllowed = allowed;
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
    setUnchooseSubject({ commit }, { subjectId, studentId }) {
      return fetch('/api/setUnchooseSubject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectId,
          studentId,
        }),
      }).then((response) => {
        commit('setUnchooseSubject', response);
      });
    },
    setChoiseAllowed({ commit }, { allowed }) {
      commit('setChoiseAllowed', allowed);
    },
    addSubject({ commit }, { subject, teacher, group, semester }) {
      return fetch('/api/setChoiseSubject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject,
          teacher,
          group,
          semester,
        }),
      }).then((response) => {
        commit('addSubject', response);
      });
    },
    deleteSubject({ commit }, { id }) {
      return fetch(`/api/deleteSubject/${id}`, { method: 'DELETE' }).then(
        (response) => {
          commit('deleteSubject', response);
        }
      );
    },
  },
};
