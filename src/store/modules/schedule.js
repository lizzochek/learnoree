import helpers from '../helpers';

export default {
  namespaced: true,
  state: {
    groupSchedule: [],
    teacherSchedule: [],
    studentSchedule: [],
    teachers: [],
    groups: [],
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
  },
};
