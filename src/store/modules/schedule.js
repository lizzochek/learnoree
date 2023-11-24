import helpers from '../helpers';

export default {
  namespaced: true,
  state: {
    groupSchedule: [],
    teacherSchedule: [],
    studentSchedule: [],
    teachers: [],
    groups: [],
    errors: {},
  },
  getters: {
    getGroupSchedule(state) {
      return state.groupSchedule;
    },
    getTeacherSchedule(state) {
      return state.teacherSchedule;
    },
    getStudentSchedule(state) {
      return state.studentSchedule;
    },
    getTeachers(state) {
      return state.teachers;
    },
    getGroups(state) {
      return state.groups;
    },
    getErrors(state) {
      return state.errors;
    },
  },
  mutations: {
    async setState(state, { response, prop }) {
      if (response.status == '200') {
        const data = await response.json();
        data.forEach((element, index) => {
          data[index] = helpers.lowerCaseData(element);
        });
        state[prop] = data;
      }
    },
    checkResponseStatus() {
      state.errors = false;
      if (response.status != '200') {
        state.errors = true;
      }
    },
  },
  actions: {
    getGroupSchedule({ commit }, { groupName }) {
      return fetch(`/api/getGroupSchedule/${groupName}`).then((response) => {
        commit('setState', { response, prop: 'groupSchedule' });
      });
    },
    getStudentSchedule(context) {
      return fetch(
        `/api/getStudentSchedule/${context.rootState.login.user.id}`
      ).then((response) => {
        context.commit('setState', { response, prop: 'studentSchedule' });
      });
    },
    getTeacherSchedule({ commit }, { name, surname, secondName }) {
      return fetch(
        `/api/getTeacherSchedule/${name}/${surname}/${secondName}`
      ).then((response) => {
        commit('setState', { response, prop: 'teacherSchedule' });
      });
    },
    getAllTeachers({ commit }) {
      return fetch('/api/getAllTeachers').then((response) => {
        commit('setState', { response, prop: 'teachers' });
      });
    },
    getAllGroups({ commit }) {
      return fetch('/api/getAllGroups').then((response) => {
        commit('setState', { response, prop: 'groups' });
      });
    },
    setSchedule(
      { commit },
      { groupName, subjectName, time, place, semester, weekDay, week }
    ) {
      return fetch(`/api/setSchedule`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          groupName,
          subjectName,
          time,
          place,
          semester,
          weekDay,
          week,
        }),
      }).then((response) => {
        commit('checkResponseStatus', response);
      });
    },
    addSubject(
      { commit },
      {
        subjectName,
        teacherName,
        teacherSurname,
        teacherSecondName,
        cathedraName,
      }
    ) {
      return fetch(`/api/addSubject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectName,
          teacherName,
          teacherSurname,
          teacherSecondName,
          cathedraName,
        }),
      }).then((response) => {
        commit('checkResponseStatus', response);
      });
    },
    deleteLesson({ commit }, { id }) {
      return fetch(`/api/deleteSchedule/${id}`).then((response) => {
        commit('checkResponseStatus', response);
      });
    },
  },
};
