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
    async getGroupSchedule(state, response) {
      if (response.status == '200') {
        const data = await response.json();
        data.forEach((element, index) => {
          data[index] = helpers.lowerCaseData(element);
        });
        state.groupSchedule = data;
      }
    },
    async getStudentSchedule(state, response) {
      if (response.status == '200') {
        const data = await response.json();
        data.forEach((element, index) => {
          data[index] = helpers.lowerCaseData(element);
        });
        state.studentSchedule = data;
      }
    },
    async getTeacherSchedule(state, response) {
      if (response.status == '200') {
        const data = await response.json();
        data.forEach((element, index) => {
          data[index] = helpers.lowerCaseData(element);
        });
        state.teacherSchedule = data;
      }
    },
    async getAllTeachers(state, response) {
      if (response.status == '200') {
        const data = await response.json();
        data.forEach((element, index) => {
          data[index] = helpers.lowerCaseData(element);
        });
        state.teachers = data;
      }
    },
    async getAllGroups(state, response) {
      if (response.status == '200') {
        const data = await response.json();
        data.forEach((element, index) => {
          data[index] = helpers.lowerCaseData(element);
        });
        state.groups = data;
      }
    },
    setSchedule(state, response) {
      state.errors = false;
      if (response.status != '200') {
        state.errors = true;
      }
    },
    addSubject(state, response) {
      state.errors = false;
      if (response.status != '200') {
        state.errors = true;
      }
    },
    deletelesson(state, response) {
      state.errors = false;
      if (response.status != '200') {
        state.errors = true;
      }
    },
  },
  actions: {
    getGroupSchedule({ commit }, { groupName }) {
      return fetch(`/api/getGroupSchedule/${groupName}`).then((response) => {
        commit('getGroupSchedule', response);
      });
    },
    getStudentSchedule(context) {
      return fetch(
        `/api/getStudentSchedule/${context.rootState.login.user.id}`
      ).then((response) => {
        context.commit('getStudentSchedule', response);
      });
    },
    getTeacherSchedule({ commit }, { name, surname, secondName }) {
      return fetch(
        `/api/getTeacherSchedule/${name}/${surname}/${secondName}`
      ).then((response) => {
        commit('getTeacherSchedule', response);
      });
    },
    getAllTeachers({ commit }) {
      return fetch('/api/getAllTeachers').then((response) => {
        commit('getAllTeachers', response);
      });
    },
    getAllGroups({ commit }) {
      return fetch('/api/getAllGroups').then((response) => {
        commit('getAllGroups', response);
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
        commit('setSchedule', response);
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
        commit('addSubject', response);
      });
    },
    deleteLesson({ commit }, { id }) {
      return fetch(`/api/deleteSchedule/${id}`).then((response) => {
        commit('deleteLesson', response);
      });
    },
  },
};
