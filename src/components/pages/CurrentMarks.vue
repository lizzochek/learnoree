<template>
    <div id="current-marks">
        <div v-if="stage == 'subjects'" class="container">
            <BaseHeading text="Choose a subject" />
            <ul class="subjectsList">
                <li v-for="(subject, index) in subjects" :key="index" @click="chooseSubject(subject)">
                    <div>{{ subject }}</div>
                </li>
            </ul>
        </div>
        <div v-else class="container">
            <BaseHeading text="Your marks" />
            <div id="back-button" @click="goBack">
                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                    <title>Left, Arrow, Back</title>
                    <path d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10,10,0,0,1,12,22Z" />
                    <polygon points="14.11 5.67 7.77 12 14.11 18.33 15.52 16.92 10.6 12 15.52 7.08 14.11 5.67" />
                </svg>
            </div>
            <ul class="marksList">
                <li class="table-header">
                    <div class="col col-1">Subject</div>
                    <div class="col col-2">Task type</div>
                    <div class="col col-3">Mark</div>
                </li>
                <li v-for="(mark, index) in subjectMarks" :key="index" class="table-row">
                    <div class="col col-1" data-label="Subject">{{ mark.subjectName }}</div>
                    <div class="col col-2" data-label="Task type">{{ mark.taskType }}</div>
                    <div class="col col-3" data-label="Mark">{{ mark.mark }}</div>
                </li>
            </ul>

        </div>
    </div>
</template>

<script>
import BaseHeading from '../common/BaseHeading.vue';

export default {
    name: "CurrentMarks",
    components: { BaseHeading },
    data() {
        return {
            marks: [],
            subjectMarks: [],
            subjects: [],
            stage: "subjects"
        };
    },
    computed: {
        user() {
            return this.$store.getters["login/getUser"];
        }
    },
    created() {
        if (this.user.role == "student") {
            this.$store.dispatch("marks/getStudentMarks", { id: this.user.id });
            this.marks = this.$store.getters["marks/getMarks"];
            this.marks.forEach(el => {
                if (!this.subjects.includes(el.subjectName))
                    this.subjects.push(el.subjectName);
            });
        }
    },
    methods: {
        chooseSubject(subject) {
            this.subjectMarks = this.marks.filter(el => el.subjectName === subject);
            this.stage = 'marks';
        },
        goBack() {
            this.stage = 'subjects';
            this.subjectMarks = []
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/css/components/current-marks.scss'
</style>