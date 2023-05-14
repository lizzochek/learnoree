<template>
    <div id="exam-results" ref="exams">
        <BaseHeading text="Exam results" id="heading" />
        <ul class="marksList" ref="list">
            <li class="table-header">
                <div class="col col-1">Subject</div>
                <div class="col col-2">Mark</div>
            </li>
            <li v-for="(subj, index) in list" :key="index" class="table-row">
                <div class="col col-1" data-label="Subject">{{ subj.subject }}</div>
                <div class="col col-2" data-label="Mark">{{ subj.mark }}</div>
            </li>
        </ul>
    </div>
</template>

<script>
import BaseHeading from '../common/BaseHeading.vue';
import LinkButton from '../common/LinkButton.vue';

export default {
    name: 'ExamResPage',
    components: { BaseHeading, LinkButton },
    data() {
        return {
            list: []
        }
    },
    computed: {
        user() {
            return this.$store.getters["login/getUser"];
        }
    },
    async created() {
        if (this.user.role == "student") {
            await this.$store.dispatch("marks/getStudentMarks", { id: this.user.id });
            const sortedMarks = [];
            const marks = this.$store.getters["marks/getMarks"];

            marks.forEach(el => {
                let index = sortedMarks.findIndex(mark => el.subjectName == mark.subject)

                if (index < 0) {
                    sortedMarks.push({ subject: el.subjectName, mark: el.mark })
                }
                else sortedMarks[index].mark += el.mark;
            });

            this.list = sortedMarks;
        }
    },
}
</script>

<style lang="scss">
@import '@/assets/css/components/exam-res-page.scss'
</style>