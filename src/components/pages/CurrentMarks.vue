<template>
    <div id="current-marks">
        <div v-if="stage == 'subjects' && user.role == 'student'" class="container">
            <BaseHeading text="Choose a subject" />
            <ul class="subjectsList">
                <li v-for="(subject, index) in subjects" :key="index" @click="chooseSubject(subject)">
                    <div>{{ subject }}</div>
                </li>
            </ul>
        </div>
        <div v-if="stage == 'marks' && user.role == 'student'" class="container">
            <BaseHeading text="Your marks" />
            <div id="back-button" @click="goBack('subjects')">
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

        <div v-if="isOpen" id="modal">
            <BaseHeading id="modal-heading" text="Edit mark" />
            <select v-model="enteredData.student" name="students" class="control" id="student-select">
                <option v-for="(student, index) in marks" :key="index">{{ student.name + ' ' +
                    student.secondName + ' ' +
                    student.surname }}</option>
            </select>

            <input autocomplete="off" spellcheck="false" class="control" type="text" placeholder="Mark"
                v-model="enteredData.mark" />
            <input autocomplete="off" spellcheck="false" class="control" type="text" placeholder="Task type"
                v-model="enteredData.taskType" />

            <button class="action-btn" @click="setMark">Add</button>
            <button class="action-btn" @click="toggleModal">Cancel</button>
        </div>
        <div v-if="stage == 'subjects' && user.role == 'teacher'" class="container">
            <BaseHeading text="Choose subject" />
            <ul class="subjectsList">
                <li v-for="(subject, index) in subjects" :key="index" @click="chooseSubject(subject)">
                    <div>{{ subject.subjectName }}</div>
                </li>
            </ul>
        </div>
        <div v-if="stage == 'groups' && user.role == 'teacher'" class="container">
            <div id="back-button" @click="goBack('subjects')">
                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                    <title>Left, Arrow, Back</title>
                    <path d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10,10,0,0,1,12,22Z" />
                    <polygon points="14.11 5.67 7.77 12 14.11 18.33 15.52 16.92 10.6 12 15.52 7.08 14.11 5.67" />
                </svg>
            </div>
            <BaseHeading text="Choose group" />
            <ul class="subjectsList">
                <li v-for="(group, index) in groups" :key="index" @click="chooseGroup(group)">
                    <div>{{ group.name ? group.name : group.id }}</div>
                </li>
            </ul>
        </div>
        <div v-if="stage == 'marks' && user.role == 'teacher'" class="container">
            <BaseHeading text="Group marks" />
            <div id="back-button" @click="goBack('groups')">
                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                    <title>Left, Arrow, Back</title>
                    <path d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10,10,0,0,1,12,22Z" />
                    <polygon points="14.11 5.67 7.77 12 14.11 18.33 15.52 16.92 10.6 12 15.52 7.08 14.11 5.67" />
                </svg>
            </div>
            <ul class="marksList">
                <li class="table-header">
                    <div class="col col-1">Student</div>
                    <div class="col col-2">Task type</div>
                    <div class="col col-3">Mark</div>
                </li>
                <li v-for="(student, index) in marks" :key="index" class="table-row">
                    <div class="col col-1" data-label="Subject">{{ student.name + ' ' + student.secondName + ' ' +
                        student.surname }}</div>
                    <div class="col col-2" data-label="Task type">{{ student.taskType }}</div>
                    <div class="col col-3" data-label="Mark">{{ student.mark }}</div>
                </li>
            </ul>
            <LinkButton id="link-btn" text="Add mark" backgroundTheme="dark" @click="toggleModal()" />
        </div>
    </div>
</template>

<script>
import BaseHeading from '../common/BaseHeading.vue';
import LinkButton from '../common/LinkButton.vue';

export default {
    name: "CurrentMarks",
    components: { BaseHeading, LinkButton },
    data() {
        return {
            marks: [],
            subjectMarks: [],
            subjects: [],
            groups: [],
            stage: "subjects",
            isOpen: false,
            enteredData: {}
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
        if (this.user.role === 'teacher') {
            this.$store.dispatch("marks/getGroupMarks", { teacherId: this.user.id });
            this.subjects = this.$store.getters["marks/getGroupMarks"];

        }
    },
    methods: {
        chooseSubject(subject) {
            if (this.user.role === 'student') {

                this.subjectMarks = this.marks.filter(el => el.subjectName === subject);
                this.stage = 'marks';
            } else {
                this.groups = subject.groups;
                this.enteredData.subjectId = subject.subjectId;
                this.stage = 'groups';
            }
        },
        chooseGroup(group) {
            this.marks = []
            group.students.forEach(el => {
                el.marks.forEach(mark => {
                    this.marks.push({
                        studentId: el.studentId,
                        name: el.name,
                        surname: el.surname,
                        secondName: el.secondName,
                        markId: mark.markId,
                        mark: mark.mark,
                        taskType: mark.taskType
                    })
                })
            });

            this.stage = 'marks';
        },
        goBack(stage) {
            this.stage = stage;
        },
        setMark() {
            const { taskType, mark, subjectId } = this.enteredData;
            const { studentId } = this.marks.find(el => el.name + ' ' + el.secondName + ' ' + el.surname == this.enteredData.student)

            this.$store.dispatch('marks/setMark', {
                studentId,
                mark,
                taskType,
                subjectId
            });
            if (this.$store.getters['marks/getError']) alert('Sorry, something went wrong!')
            else this.toggleModal()
        },
        toggleModal() {
            this.isOpen = !this.isOpen
        },
    }
}
</script>

<style lang="scss">
@import '@/assets/css/components/current-marks.scss'
</style>