<template>
    <div id="choise-subj">
        <div v-if="isOpen" id="modal">
            <BaseHeading id="modal-heading" text="Add new lesson" />
            <input autocomplete="off" spellcheck="false" class="control" type="text" placeholder="Subject name"
                v-model="enteredData.subject" />
            <input autocomplete="off" spellcheck="false" class="control" type="text"
                placeholder="Teacher (surname, name, second name)" v-model="enteredData.teacher" />
            <input autocomplete="off" spellcheck="false" class="control" type="text" placeholder="Group"
                v-model="enteredData.group" />
            <input autocomplete="off" spellcheck="false" class="control" type="date"
                placeholder="Semester (choose any day within semester)" v-model="enteredData.semester" />

            <button class="action-btn" @click="addSubject">Save</button>
            <button class="action-btn" @click="cancelAction">Cancel</button>
        </div>
        <BaseHeading id="heading" text="Choose subjects" />
        <div v-if="user.role == 'admin'">
            <button>{{ choiseAllowed ? 'Disallow choise' : 'Allow choise' }}</button>
        </div>
        <div class="subj-container" v-if="choiseAllowed">
            <p>If the action is not taking effect, reload the page</p>
            <ul class="subjectsList">
                <li :class="user.role == 'admin' ? 'admin table-header' : 'table-header'">
                    <div class="col col-1">Subject</div>
                    <div class="col col-2">Teacher</div>
                    <div class="col col-3">Cathedra</div>
                    <div class="col col-4" v-if="user.role !== 'admin'">Choise</div>
                    <div class="col col-4" v-else>Group</div>
                </li>
                <li v-for="(subject, index) in choiseSubjects" :key="index" class="table-row">
                    <div class="col col-1" data-label="Subject">{{ subject.subjectName }}</div>
                    <div class="col col-2" data-label="Teacher">{{ subject.teacherName + ' ' + subject.teacherSecondName +
                        '' + subject.teacherSurname }}</div>
                    <div class="col col-3" data-label="Cathedra">{{ subject.cathedra }}</div>
                    <div v-if="user.role !== 'admin'" class="col col-4" data-label="Choise">
                        <button @click="chooseSubject(subject)">{{ subject.chosen ? 'Unchoose' : 'Choose' }}</button>
                    </div>
                    <div v-else class="col col-4" data-label="Choise">
                        {{ subject.groupName }}
                    </div>
                    <div v-if="user.role == 'admin'" id="delete" @click="deleteSubject(subject.subjectId)">
                        <svg id="delete-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 58.67">
                            <defs></defs>
                            <title>Asset 25</title>
                            <g id="Layer_2" data-name="Layer 2">
                                <g id="Layer_1-2" data-name="Layer 1">
                                    <path class="cls-1"
                                        d="M61.33,5.33H48V2.67A2.66,2.66,0,0,0,45.33,0H18.67A2.66,2.66,0,0,0,16,2.67V5.33H2.67a2.67,2.67,0,0,0,0,5.34H8v40a8,8,0,0,0,8,8H48a8,8,0,0,0,8-8v-40h5.33a2.67,2.67,0,1,0,0-5.34ZM50.67,50.67A2.67,2.67,0,0,1,48,53.33H16a2.67,2.67,0,0,1-2.67-2.66v-40H50.67Z" />
                                    <path class="cls-1"
                                        d="M24,45.33a2.67,2.67,0,0,0,2.67-2.66V21.33a2.67,2.67,0,0,0-5.34,0V42.67A2.67,2.67,0,0,0,24,45.33Z" />
                                    <path class="cls-1"
                                        d="M40,45.33a2.67,2.67,0,0,0,2.67-2.66V21.33a2.67,2.67,0,0,0-5.34,0V42.67A2.67,2.67,0,0,0,40,45.33Z" />
                                </g>
                            </g>
                        </svg>
                    </div>
                </li>
            </ul>
            <LinkButton v-if="user.role == 'admin'" id="add-btn" text="Add subject" backgroundTheme="dark"
                @click="toggleModal" />
        </div>
        <div v-if="user.role !== 'admin' && !choiseAllowed">
            <p>Choise is not allowed at the moment</p>
        </div>

    </div>
</template>

<script>
import BaseHeading from '../common/BaseHeading.vue';
import LinkButton from '../common/LinkButton.vue';

export default {
    name: "TeacherContactsPage",
    components: { BaseHeading, LinkButton },
    data() {
        return {
            choiseSubjects: [],
            chosenSubjects: [],
            isOpen: false,
            enteredData: {}
        };
    },
    computed: {
        user() {
            return this.$store.getters['login/getUser'];
        },
        choiseAllowed() {
            return this.$store.getters['subjects/getChoiseAllowed'];
        }
    },
    created() {
        this.getSubjects();
    },
    methods: {
        async chooseSubject(subject) {
            if (!subject.chosen) {
                await this.$store.dispatch('subjects/setChosenSubject', { studentId: this.user.id, subjectId: subject.subjectId })
                if (this.$store.getters['schedule/getError']) alert('Something went wrong! Plase try again')
                this.getSubjects()
            } else {
                await this.$store.dispatch('subjects/setUnchooseSubject', { studentId: this.user.id, subjectId: subject.subjectId })
                if (this.$store.getters['schedule/getError']) alert('Something went wrong! Plase try again')
                this.getSubjects()
            }
        },
        async getSubjects() {
            if (this.user.role != 'admin') {
                await this.$store.dispatch('subjects/getChoiseSubjects', { id: this.user.id });
                this.choiseSubjects = this.$store.getters['subjects/getChoiseSubjects'];
                console.log(this.choiseSubjects)
                await this.$store.dispatch('subjects/getChosenSubjects', { id: this.user.id });
                this.chosenSubjects = this.$store.getters['subjects/getChosenSubjects']; this.choiseSubjects.forEach(el => {
                    if (this.chosenSubjects.find(element => element.id === el.subjectId)) el.chosen = true;
                    else el.chosen = false
                })
            } else {
                await this.$store.dispatch('subjects/getChoiseSubjects', { id: null });
                this.choiseSubjects = this.$store.getters['subjects/getChoiseSubjects'];
            }

        },
        async changeChoiseAllowed() {
            await this.$store.dispatch('subjects/setChoiseAllowed', { allowed: !this.choiseAllowed });
        },
        async deleteSubject(id) {
            await this.$store.dispatch('subjects/deleteSubject', { id })
            if (this.$store.getters['schedule/getError']) alert('Something went wrong! Plase try again')
            this.getSubjects();
        },
        toggleModal() {
            this.isOpen = !this.isOpen
        },
        cancelAction() {
            this.toggleModal();
            this.enteredData = {};
        },
        async addSubject() {
            const { subject, teacher, group, semester } = this.enteredData;
            await this.$store.dispatch('subjects/addSubject', { subject, teacher, group, semester })
            this.toggleModal();
            this.enteredData = {};
            if (this.$store.getters['subjects/getError']) alert('Something went wrong! Plase try again');
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/css/components/choise-subj-page.scss'
</style>