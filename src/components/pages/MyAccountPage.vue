
<template>
    <div id="my-account">
        <BaseModal v-if="isModalOpen" headingText="Email was sent"
            text="Link to restore your password was sent to your email" url="/main" />
        <div id="container">
            <BaseHeading text="Your data" />
            <p class="user-data">Full name: {{ user?.name }} {{ user?.secondName }} {{ user?.surname }}</p>
            <p class="user-data">Phone: {{ user?.phone }}</p>

            <!-- Role specific fields -->
            <p v-if="user?.role == 'student' || user?.role == 'teacher'" class="user-data">Faculty: {{ user?.faculty?.name
            }}
            </p>
            <p v-if="user?.role == 'teacher'" class="user-data">Cathedra: {{ user?.cathedra?.name }}</p>

            <p v-if="user?.role == 'student'" class="user-data">Specialty: {{ user?.specialty?.name }}</p>
            <p v-if="user?.role == 'student'" class="user-data">Group: {{ user?.group?.name }}</p>
            <p v-if="user?.role == 'student'" class="user-data">Year: {{ studentEducationYear }}</p>
            <p v-if="user?.role == 'student'" class="user-data">Status: {{ new Date() > user.endDate ? 'graduated' :
                'learning' }}</p>


            <!-- Change password -->
            <div class="buttons">
                <LinkButton class="control" text="Change Password" @click="changePassword" backgroundTheme="dark" />
                <LinkButton class="control" text="Log out" @click="logOut" backgroundTheme="dark" />
            </div>

        </div>
    </div>
</template>

<script>
import BaseHeading from '../common/BaseHeading.vue';
import BaseModal from '../common/BaseModal.vue';
import LinkButton from '../common/LinkButton.vue';

export default {
    components: { BaseHeading, LinkButton, BaseModal },
    data() {
        return {
            studentEducationYear: 0,
            isModalOpen: false,
        }
    },
    computed: {
        user() {
            return this.$store.getters['login/getUser']
        }
    },
    async created() {
        if (this.user?.role == 'student') {
            if (!this.user.specialty)
                await this.$store.dispatch('myAccount/getSpecialty', { id: this.user.id });

            if (!this.user.group)
                await this.$store.dispatch('myAccount/getStudentGroup', { id: this.user.id });

            if (!this.user.faculty)
                await this.$store.dispatch('myAccount/getFaculty', { id: this.user.specialty.id });

            this.calculateEducationYear();
        }

        if (this.user.role == 'teacher') {
            if (!this.user.faculty)
                await this.$store.dispatch('myAccount/getTeacherCathedraAndFaculty', { id: this.user.id });
        }
    },
    methods: {
        calculateEducationYear() {
            const startDate = new Date(this.user.startDate);
            const currentMonth = new Date().getMonth()
            const year = (new Date).getYear() - startDate.getYear()
            this.studentEducationYear = currentMonth < 9 ? year - 1 : year
        },
        async changePassword() {
            await this.$store.dispatch('login/restorePassword', { email: this.user.email });
            this.isModalOpen = true;
        },
        async logOut() {
            await this.$store.dispatch('login/logOut');
            this.$router.push('login');
        }
    },
}
</script>

<style lang="scss">
@import '@/assets/css/components/account-page.scss'
</style>