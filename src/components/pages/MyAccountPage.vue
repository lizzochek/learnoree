
<template>
    <div id="my-account">
        <div id="container">
            <BaseHeading text="Your data" />
            <p class="user-data">Full name: {{ user.name }} {{ user.secondName }} {{ user.surname }}</p>
            <p class="user-data">Phone: {{ user.phone }}</p>

            <!-- Role specific fields -->
            <p v-if="user.role == 'student'" class="user-data">Faculty: {{ user.faculty.name }}</p>
            <p v-if="user.role == 'student'" class="user-data">Specialty: {{ user.specialty.name }}</p>
            <p v-if="user.role == 'student'" class="user-data">Group: {{ user.group.name }}</p>
        </div>
    </div>
</template>

<script>
import BaseHeading from '../common/BaseHeading.vue';

export default {
    components: { BaseHeading },
    computed: {
        user() {
            return this.$store.getters.getUser;
        }
    },
    async created() {
        if (this.user.role == 'student') {
            if (!this.user.specialty)
                await this.$store.dispatch('getSpecialty', { id: this.user.id });

            if (!this.user.faculty)
                await this.$store.dispatch('getFaculty', { id: this.user.specialty.id });

            if (!this.user.group)
                await this.$store.dispatch('getStudentGroup', { id: this.user.id });
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/css/components/account-page.scss'
</style>