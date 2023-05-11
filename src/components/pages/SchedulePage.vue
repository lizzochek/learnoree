<template>
    <div id="schedule">
        <div v-if="isOpen" id="modal">
            <BaseHeading id="modal-heading" text="Add new lesson" />
            <input autocomplete="off" spellcheck="false" class="control" type="text"
                placeholder="Group (if general subject)" v-model="enteredData.groupName" />
            <input autocomplete="off" spellcheck="false" class="control" type="text" placeholder="Subject"
                v-model="enteredData.subjectName" />
            <input autocomplete="off" spellcheck="false" class="control" type="text" placeholder="Time"
                v-model="enteredData.time" />
            <input autocomplete="off" spellcheck="false" class="control" type="text" placeholder="Place"
                v-model="enteredData.place" />
            <input autocomplete="off" spellcheck="false" class="control" type="date"
                placeholder="Semester (choose any day within semester)" v-model="enteredData.semester" />
            <input autocomplete="off" spellcheck="false" class="control" type="text" placeholder="Week day"
                v-model="enteredData.weekDay" />
            <input autocomplete="off" spellcheck="false" class="control" type="text" placeholder="Week"
                v-model="enteredData.week" />


            <button class="action-btn" @click="addLesson">Save</button>
            <button class="action-btn" @click="cancelAction('lesson')">Cancel</button>
        </div>
        <div v-if="isSubjectOpen" id="modal">
            <BaseHeading id="modal-heading" text="Add new lesson" />
            <input autocomplete="off" spellcheck="false" class="control" type="text" placeholder="Subject name"
                v-model="enteredData.subjectName" />
            <input autocomplete="off" spellcheck="false" class="control" type="text" placeholder="Teacher name"
                v-model="enteredData.teacherName" />
            <input autocomplete="off" spellcheck="false" class="control" type="text" placeholder="Teacher surname"
                v-model="enteredData.teacherSurname" />
            <input autocomplete="off" spellcheck="false" class="control" type="text" placeholder="Teacher second name"
                v-model="enteredData.teacherSecondName" />
            <input autocomplete="off" spellcheck="false" class="control" type="text" placeholder="Cathedra name"
                v-model="enteredData.cathedraName" />

            <button class="action-btn" @click="addSubject">Save</button>
            <button class="action-btn" @click="cancelAction">Cancel</button>
        </div>
        <div id="container">
            <button v-if="user.role == 'admin'" class="tab-btn add-btn" @click="toggleSubjectModal">Add subject</button>
            <button v-if="user.role == 'admin'" class="tab-btn add-btn" @click="toggleModal">Add lesson</button>
            <BaseHeading id="heading" :text="headingText" />
            <div id="tabs" :class="{ adminButtons: user.role === 'admin' }">
                <div v-for="tab in tabs" :key="tab" class="tab" @click="setActiveTab(tab)">
                    <button class="tab-btn" :class="{ active: curTab === tab }">
                        {{ tab }}
                    </button>
                </div>
            </div>
            <div v-if="curTab === 'Group' || curTab === 'Teacher'" class="dropdown">
                <label for="touch"><span>Choose {{ curTab }}</span></label>
                <input type="checkbox" id="touch">

                <ul class="slide">
                    <li v-if="curTab === 'Teacher'" v-for="(teacher, index) in teachers" :key="index" @click="setTeacherSchedule(teacher.name,
                        teacher.surname, teacher.secondName)">
                        {{ teacher.name }} {{
                            teacher.secondName }} {{ teacher.surname }}</li>
                    <li v-else v-for="(group, groupIndex) in groups" :key="groupIndex"
                        @click="setGroupSchedule(group.name)">{{
                            group.name }}</li>
                </ul>
            </div>
            <div id="weeks">
                <button class="week-btn" :class="{ active: activeWeek === 1 }" @click="setActiveWeek(1)">
                    Week 1
                </button>
                <button class="week-btn" :class="{ active: activeWeek === 2 }" @click="setActiveWeek(2)">
                    Week 2
                </button>
            </div>
            <table ref="table" id="schedule-table" :class="{ hidden: !scheduleVisisble }">
                <thead>
                    <tr class="table-row">
                        <th>Time</th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Saturday</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="table-row">
                        <td>8:30</td>
                        <td></td>
                    </tr>
                    <tr class="table-row">
                        <td>10:25</td>
                        <td></td>
                    </tr>
                    <tr class="table-row">
                        <td>12:20</td>
                        <td></td>
                    </tr>
                    <tr class="table-row">
                        <td>14:15</td>
                        <td></td>
                    </tr>
                    <tr class="table-row">
                        <td>16:10</td>
                        <td></td>
                    </tr>
                    <tr class="table-row">
                        <td>18:30</td>
                        <td></td>
                    </tr>
                </tbody>

            </table>
        </div>
    </div>
</template>

<script>
import BaseHeading from '../common/BaseHeading.vue';
import BaseModal from '../common/BaseModal.vue';

export default {
    name: "SchedulePage",
    components: { BaseHeading, BaseModal },
    data() {
        return {
            curTab: '',
            activeWeek: 1,
            scheduleVisisble: true,
            teacherSchedule: {},
            groupSchedule: {},
            isOpen: false,
            isSubjectOpen: false,
            enteredData: {},
        }
    },
    computed: {
        headingText() {
            switch (this.curTab) {
                case 'Personal':
                    return 'Personal Schedule';
                case 'Group':
                    return 'Group Schedule';
                case 'Teacher':
                    return 'Teacher Schedule';
                default:
                    return 'Schedule'
            }
        },
        studentSchedule() {
            return this.formatSchedule(this.$store.getters["schedule/getStudentSchedule"]);
        },
        teachers() {
            return this.$store.getters["schedule/getTeachers"];
        },
        groups() {
            return this.$store.getters["schedule/getGroups"];
        },
        user() {
            return this.$store.getters["login/getUser"];
        },
        tabs() {
            return this.user.role == 'student' ? ['Personal', 'Group', 'Teacher'] : ['Group', 'Teacher']
        }
    },
    mounted() {
        this.getAllGroups();
        this.getAllTeachers();
        if (this.user.role === 'student') {
            this.curTab = 'Personal';
            this.getStudentSchedule();
            this.setSchedule();
        } else {
            this.curTab = 'Group'
        }
    },
    methods: {
        async getAllTeachers() {
            await this.$store.dispatch("schedule/getAllTeachers");
        },
        async getAllGroups() {
            await this.$store.dispatch("schedule/getAllGroups");
        },
        async getStudentSchedule() {
            await this.$store.dispatch("schedule/getStudentSchedule");
        },
        async getTeacherSchedule(name, surname, secondName) {
            await this.$store.dispatch("schedule/getTeacherSchedule", { name, surname, secondName });
        },
        async getGroupSchedule(groupName) {
            await this.$store.dispatch("schedule/getGroupSchedule", { groupName });
        },
        setActiveTab(tab) {
            this.curTab = tab;
            this.setSchedule();
        },
        setActiveWeek(week) {
            this.activeWeek = week;
            this.setSchedule();
        },
        formatSchedule(schedule) {
            const newSchedule = {
                week1: {
                    Monday: {},
                    Tuesday: {}, Wednesday: {}, Thursday: {}, Friday: {}, Saturday: {},
                }, week2: {
                    Monday: {},
                    Tuesday: {}, Wednesday: {}, Thursday: {}, Friday: {}, Saturday: {},
                }
            };
            schedule.forEach(element => {
                let { place, subjectName, teacherName, teacherSecondName, teacherSurname, week, weekDay, time } = element;
                newSchedule[`week${week}`][weekDay][time] = { place, subjectName, teacherName, teacherSecondName, teacherSurname }
            });
            return newSchedule;
        },
        deleteLesson(id) {
            this.$store.dispatch(`schedule/deleteLesson`, id);

            if (errors) {
                alert('Something went wrong. Please try again')
            }
        },
        setSchedule() {
            this.removeSchedule();
            let schedule;

            if (this.studentSchedule && this.curTab === 'Personal') schedule = this.studentSchedule;
            if (this.teacherSchedule && this.curTab === 'Teacher') schedule = this.teacherSchedule;
            if (this.groupSchedule && this.curTab === 'Group') schedule = this.groupSchedule;

            if (Object.keys(schedule)?.length) {
                Object.entries(schedule[`week${this.activeWeek}`]).forEach((weekDay, weekIndex) => {
                    Object.entries(weekDay[1]).forEach((time, timeIndex) => {
                        const { id, subjectName, teacherName, teacherSecondName, teacherSurname, place } = time[1]
                        this.$refs.table.rows[timeIndex + 1].cells[weekIndex + 1].innerHTML = `<div class="lesson-container">
                        <p>${subjectName}</p>                       
                        <div class="teacher">
                            <svg class="icon-cap" xmlns="http://www.w3.org/2000/svg" fill="#000000" width="800px" height="800px" viewBox="-5 0 32 32" version="1.1">
                                <title>graduation-cap</title>
                                <path d="M21.080 12.84l-8.92-3.24c-0.4-0.16-0.88-0.2-1.16-0.2-0.32 0-0.76 0.040-1.16 0.2l-8.92 3.24c-0.84 0.32-0.92 0.88-0.92 1.12s0.080 0.8 0.92 1.12l0.4 0.12v3.32c0 0.48 0.36 0.84 0.84 0.84s0.84-0.36 0.84-0.84v-2.72l1.56 0.56v3.76c0 1.64 3.84 2.44 6.44 2.44s6.44-0.76 6.44-2.44v-3.72l3.64-1.32c0.84-0.28 0.92-0.88 0.92-1.12s-0.080-0.8-0.92-1.12zM15.8 19.92c-0.48 0.32-2.28 0.96-4.76 0.96s-4.32-0.64-4.76-0.96v-2.92l3.6 1.32c0.4 0.16 0.88 0.2 1.16 0.2s0.76-0.040 1.16-0.2l3.6-1.32v2.92zM11.6 16.72c-0.28 0.12-0.88 0.12-1.16 0l-7.64-2.76 7.6-2.76c0.28-0.12 0.88-0.12 1.16 0l7.64 2.76-7.6 2.76z"/>
                            </svg>
                            <p>${teacherName} ${teacherSecondName} ${teacherSurname}</p>
                        </div>
                        <div class="place">
                            <svg class="icon-location" xmlns="http://www.w3.org/2000/svg" fill="#000000" width="800px" height="800px" viewBox="0 0 32 32" version="1.1">
                                 <path d="M16.114-0.011c-6.559 0-12.114 5.587-12.114 12.204 0 6.93 6.439 14.017 10.77 18.998 0.017 0.020 0.717 0.797 1.579 0.797h0.076c0.863 0 1.558-0.777 1.575-0.797 4.064-4.672 10-12.377 10-18.998 0-6.618-4.333-12.204-11.886-12.204zM16.515 29.849c-0.035 0.035-0.086 0.074-0.131 0.107-0.046-0.032-0.096-0.072-0.133-0.107l-0.523-0.602c-4.106-4.71-9.729-11.161-9.729-17.055 0-5.532 4.632-10.205 10.114-10.205 6.829 0 9.886 5.125 9.886 10.205 0 4.474-3.192 10.416-9.485 17.657zM16.035 6.044c-3.313 0-6 2.686-6 6s2.687 6 6 6 6-2.687 6-6-2.686-6-6-6zM16.035 16.044c-2.206 0-4.046-1.838-4.046-4.044s1.794-4 4-4c2.207 0 4 1.794 4 4 0.001 2.206-1.747 4.044-3.954 4.044z"/>
                            </svg>
                            <p>${place}</p>
                        </div>
                    </div>`;
                    })
                })
            }
        },
        removeSchedule() {
            const lessons = document.querySelectorAll('.lesson-container');
            lessons.forEach(lesson => lesson.remove());
        },
        setGroupSchedule(name) {
            this.getGroupSchedule(name);
            this.groupSchedule = this.formatSchedule(this.$store.getters["schedule/getGroupSchedule"]);
            this.setSchedule();
        },
        async setTeacherSchedule(name, surname, secondName) {
            this.getTeacherSchedule(name, surname, secondName);
            this.teacherSchedule = this.formatSchedule(this.$store.getters["schedule/getTeacherSchedule"]);
            this.setSchedule();
        },
        toggleModal() {
            this.isOpen = !this.isOpen;
        },
        toggleSubjectModal() {
            this.isSubjectOpen = !this.isSubjectOpen;
        },
        async addLesson() {
            const { groupName, subjectName, time, place, semester, weekDay, week } = this.enteredData;
            await this.$store.dispatch('schedule/setSchedule', { groupName, subjectName, time, place, semester, weekDay, week })
            const errors = this.$store.getters['schedule/getErrors'];

            if (errors) {
                alert('Something went wrong. Please try again')
            } else {
                this.toggleModal();
                Object.keys(this.enteredData).forEach(key => this.enteredData[key] = null)
            }
        },
        async addSubject() {
            const { subjectName, teacherName, teacherSurname, teacherSecondName, cathedraName } = this.enteredData;
            await this.$store.dispatch('schedule/addSubject', { subjectName, teacherName, teacherSurname, teacherSecondName, cathedraName })
            const errors = this.$store.getters['schedule/getErrors'];

            if (errors) {
                alert('Something went wrong. Please try again')
            } else {
                this.toggleSubjectModal();
                Object.keys(this.enteredData).forEach(key => this.enteredData[key] = null)
            }
        },
        cancelAction(type) {
            type === 'lesson' ? this.toggleModal() : this.toggleSubjectModal();
            Object.keys(this.enteredData).forEach(key => this.enteredData[key] = null)
        }
    },
    components: { BaseHeading, BaseModal }
}
</script>

<style lang="scss">
@import '../../assets/css/components/schedule-page.scss'
</style>