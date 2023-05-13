<template>
    <div id="choise-subj">
        <BaseHeading id="heading" text="Choose subjects" />
        <ul class="subjectsList">
            <li class="table-header">
                <div class="col col-1">Subject</div>
                <div class="col col-2">Teacher</div>
                <div class="col col-3">Cathedra</div>
                <div class="col col-4">Choise</div>
            </li>
            <li v-for="(subject, index) in choiseSubjects" :key="index" class="table-row">
                <div class="col col-1" data-label="Subject">{{ subject.subjectName }}</div>
                <div class="col col-2" data-label="Teacher">{{ subject.teacherName + ' ' + subject.teacherSecondName +
                    '' + subject.teacherSurname }}</div>
                <div class="col col-3" data-label="Cathedra">{{ subject.cathedra }}</div>
                <div class="col col-4" data-label="Choise">
                    <button @click="chooseSubject(subject)">{{ subject.chosen ? 'Unchoose' : 'Choose' }}</button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import BaseHeading from '../common/BaseHeading.vue';

export default {
    name: "TeacherContactsPage",
    components: { BaseHeading },
    data() {
        return {
            choiseSubjects: [],
            chosenSubjects: [],
        };
    },
    computed: {
        user() {
            return this.$store.getters['login/getUser'];
        }
    },
    created() {
        this.getSubjects()
    },
    methods: {
        chooseSubject(subject) {
            if (!subject.chosen) {
                this.$store.dispatch('subjects/setChosenSubject', { studentId: this.user.id, subjectId: subject.subjectId })
                if (this.$store.getters['schedule/getError']) alert('Something went wrong! Plase try again')
                this.getSubjects()
            } else {
                console.log('unchoose')
            }
        },
        getSubjects() {
            this.$store.dispatch('subjects/getChoiseSubjects', { id: this.user.id });
            this.$store.dispatch('subjects/getChosenSubjects', { id: this.user.id });

            this.choiseSubjects = this.$store.getters['subjects/getChoiseSubjects'];
            this.chosenSubjects = this.$store.getters['subjects/getChosenSubjects'];
            this.choiseSubjects.forEach(el => {
                if (this.chosenSubjects.find(element => element.id === el.subjectId)) el.chosen = true;
                else el.chosen = false
            })
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/css/components/choise-subj-page.scss'
</style>