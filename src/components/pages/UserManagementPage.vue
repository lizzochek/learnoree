<template>
    <div id="user-management">
        <BaseHeading text="Teachers" />
        <ul class="teachersList">
            <li class="table-header">
                <div class="col col-1">Full name</div>
                <div class="col col-2">Email</div>
                <div class="col col-3">Phone</div>
                <div class="col col-4">Cathedra</div>
                <div class="col col-5">Authorization</div>
            </li>
            <li v-for="(teacher, index) in teachers" :key="index" class="table-row">
                <div class="col col-1" data-label="Name">{{ teacher.name + ' ' + teacher.secondName + ' ' + teacher.surname
                }}</div>
                <div class="col col-2" data-label="Email">{{ teacher.email }}</div>
                <div class="col col-3" data-label="Phone">{{ teacher.phone }}</div>
                <div class="col col-4" data-label="Cathedra">{{ teacher.cathedraName }}</div>
                <div class="col col-5" data-label="Authorized">
                    <button @click="setAuthorization(teacher.id, teacher.authorized ? 0 : 1)">{{
                        teacher.authorized ? 'Unauthorize' : 'Authorize' }}</button>
                </div>
                <div id="delete">
                    <svg id="delete-icon" @click="deleteUser(teacher.id, 'teacher')" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 58.67">
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
        <BaseHeading text="Students" />
        <ul class="studentsList">
            <li class="table-header">
                <div class="col col-1">Full name</div>
                <div class="col col-2">Email</div>
                <div class="col col-3">Phone</div>
                <div class="col col-4">Group</div>
                <div class="col col-5">Cathedra</div>
                <div class="col col-6">Authorization</div>
            </li>
            <li v-for="(student, index) in students" :key="index" class="table-row">
                <div class="col col-1" data-label="Name">{{ student.name + ' ' + student.secondName + ' ' + student.surname
                }}</div>
                <div class="col col-2" data-label="Email">{{ student.email }}</div>
                <div class="col col-3" data-label="Phone">{{ student.phone }}</div>
                <div class="col col-4" data-label="Group">{{ student.groupName }}</div>
                <div class="col col-5" data-label="Cathedra">{{ student.cathedraName }}</div>
                <div class="col col-6" data-label="Authorized"> <button
                        @click="setAuthorization(student.id, student.authorized ? 0 : 1)">{{ student.authorized ?
                            'Unauthorize' : 'Authorize'
                        }}</button></div>
                <div id="delete">
                    <svg id="delete-icon" @click="deleteUser(student.id, 'student')" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 58.67">
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
        <BaseHeading text="Admins" />
        <ul class="adminsList">
            <li class="table-header">
                <div class="col col-1">Full name</div>
                <div class="col col-2">Email</div>
                <div class="col col-3">Phone</div>
                <div class="col col-4">Authorization</div>
            </li>
            <li v-for="(admin, index) in admins" :key="index" class="table-row">
                <div class="col col-1" data-label="Name">{{ admin.name + ' ' + admin.secondName + ' ' + admin.surname
                }}</div>
                <div class="col col-2" data-label="Email">{{ admin.email }}</div>
                <div class="col col-3" data-label="Phone">{{ admin.phone }}</div>
                <div class="col col-4" data-label="Authorized"> <button
                        @click="setAuthorization(admin.id, admin.authorized ? 0 : 1)">{{ admin.authorized ?
                            'Unauthorize' : 'Authorize'
                        }}</button></div>
                <div id="delete">
                    <svg id="delete-icon" @click="deleteUser(admin.id, 'admin')" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 58.67">
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
    </div>
</template>

<script>
import BaseHeading from '../common/BaseHeading.vue';

export default {
    name: "UserManagementPage",
    components: { BaseHeading },
    data() {
        return {
            // teachers: [],
            students: [],
            admins: [],
        };
    },
    async created() {
        await this.$store.dispatch('userManagement/getUserData');
    },
    computed: {
        teachers() {
            return [...this.$store.getters['userManagement/getUsers']['teachers']];
        },
        students() {
            return [...this.$store.getters['userManagement/getUsers']['students']];
        },
        admins() {
            return [...this.$store.getters['userManagement/getUsers']['admins']];
        }
    },
    methods: {
        async setAuthorization(id, authorizationValue) {
            await this.$store.dispatch('userManagement/setAuthorization', { id, authorizationValue })

            if (this.$store.getters['userManagement/getError']) alert('Something went wrong! Please try again')
            else await this.$store.dispatch('userManagement/getUserData');
        },
        async deleteUser(id, type) {
            await this.$store.dispatch('userManagement/deleteUser', { id, type });
            if (this.$store.getters['userManagement/getError']) alert('Something went wrong! Please try again')
            else await this.$store.dispatch('userManagement/getUserData');
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/css/components/user-management-page.scss'
</style>