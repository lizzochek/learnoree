<template>
    <h1>Schedule</h1>
</template>

<script>
export default {
    name: 'SchedulePage',
    computed: {
        groupSchedule() {
            return this.$store.getters['schedule/getGroupSchedule'];
        },
        teacherSchedule() {
            return this.$store.getters['schedule/getTeacherSchedule'];
        },
        studentSchedule() {
            return this.$store.getters['schedule/getStudentSchedule'];
        },
        teachers() {
            return this.$store.getters['schedule/getTeachers'];
        },
        groups() {
            return this.$store.getters['schedule/getGroups'];
        },
    },
    methods: {
        async getAllTeachers() {
            await this.$store.dispatch('schedule/getAllTeachers');
        },
        async getAllGroups() {
            await this.$store.dispatch('schedule/getAllGroups');
        },
        async getStudentSchedule() {
            await this.$store.dispatch('schedule/getStudentSchedule');
        },
        async getTeacherSchedule(name, surname, secondName) {
            await this.$store.dispatch('schedule/getTeacherSchedule', { name, surname, secondName });
        },
        async getGroupSchedule(groupName) {
            await this.$store.dispatch('schedule/getGroupSchedule', { groupName });
        },
    },
}
</script>

<style lang="scss"></style>