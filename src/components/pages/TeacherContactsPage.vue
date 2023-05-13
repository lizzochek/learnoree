<template>
    <div id="teacher-contacts">
        <BaseHeading id="heading" text="Find your teacher" />
        <input autocomplete="off" spellcheck="false" class="control" type="text" placeholder="Teacher name"
            v-model="search" />
        <div id="card-container">
            <BaseCard v-for="(teacher, index) in selectedTeachers" :key="index" class="card">
                <span class="teacher-data">Full name: {{ teacher.name + ' ' + teacher.secondName + ' ' +
                    teacher.surname }}</span>
                <span class="teacher-data">Contact number: {{ teacher.phone }}</span>
                <span class="teacher-data">Cathedra: {{ teacher.cathedra }}</span>
                <span class="teacher-data">Faculty: {{ teacher.faculty }}</span>
            </BaseCard>
        </div>
    </div>
</template>

<script>
import BaseCard from '../common/BaseCard.vue';
import BaseHeading from '../common/BaseHeading.vue';

export default {
    name: "TeacherContactsPage",
    components: { BaseCard, BaseHeading },
    data() {
        return {
            teachers: [],
            selectedTeachers: [],
            search: ''
        };
    },
    created() {
        this.$store.dispatch('schedule/getAllTeachers')
        this.teachers = this.$store.getters["schedule/getTeachers"];
        this.selectedTeachers = this.teachers;
    },
    watch: {
        search(newVal) {
            if (newVal === '') this.selectedTeachers = this.teachers;
            else this.selectedTeachers = this.teachers.filter(teacher => teacher.name.includes(newVal) || teacher.surname.includes(newVal) || teacher.secondName.includes(newVal))
        }
    }

}
</script>

<style lang="scss">
@import '../../assets/css/components/teacher-contacts-page.scss'
</style>