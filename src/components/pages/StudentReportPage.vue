<template>
    <div id="exam-results" ref="exams">
        <BaseHeading text="Your marks" id="heading" />
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
        <LinkButton id="link-btn" text="Export pdf" backgroundTheme="dark" @click="exportPdf" />
    </div>
</template>

<script>
import BaseHeading from '../common/BaseHeading.vue';
import LinkButton from '../common/LinkButton.vue';
import html2pdf from 'html2pdf.js'

export default {
    name: 'StudentReportPage',
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
    created() {
        if (this.user.role == "student") {
            this.$store.dispatch("marks/getStudentMarks", { id: this.user.id });
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
    methods: {
        exportPdf() {
            html2pdf(this.$refs.list, {
                margin: 1,
                filename: "marks.pdf",
            });
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/css/components/exam-res-page.scss'
</style>