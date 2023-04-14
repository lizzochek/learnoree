<template>
    <div id="restore" :class="mode">
        <BaseModal v-if="isModalOpen" headingText="Password successfully changed"
            text="Your password was successfully changed. You can log in now" url="/main" />
        <div v-if="tokenError" class="container">
            <BaseHeading text="Sorry, something is wrong with your token. Please try again" />
        </div>
        <div v-else class="container">
            <BaseHeading text="Change your password" />
            <input spellcheck="false" class="control" v-model="password" type="password" placeholder="New password" />
            <input spellcheck="false" class="control" v-model="repeatPassword" type="password"
                placeholder="Repeat password" />
            <div v-if="error" class="message-container">
                <img class="error-icon" src="https://img.icons8.com/emoji/48/null/exclamation-mark-emoji.png" />
                <p class="error-p">{{ error }}</p>
            </div>
            <button class="control" type="button" @click="handleRestore">Reset password</button>
        </div>
    </div>
</template>

<script>
import BaseHeading from '../common/BaseHeading.vue';
import BaseModal from '../common/BaseModal.vue';
export default {
    name: 'RestorePassPage',
    components: { BaseHeading, BaseModal },
    data() {
        return {
            password: '',
            repeatPassword: '',
            tokenError: false,
            mode: localStorage.getItem("mode"),
            error: '',
            isModalOpen: false,
        }
    },
    async created() {
        this.$store.dispatch('removeError', 'tokenError');
        await this.$store.dispatch('checkRestorePassToken', { token: this.$route.query.token });
        if (this.$store.getters.getErrors.tokenError) this.tokenError = true;
    },
    methods: {
        async handleRestore() {
            this.error = '';
            this.$store.dispatch('removeError', 'restoreError');
            if (this.password.length < 8) {
                this.error = "Password has to be at least 8 charachers long";
            } else if (this.password !== this.repeatPassword) {
                this.error = "Passwords don't match";
            } else {
                const res = await this.$store.dispatch('changePassword', { password: this.password });
                if (this.$store.getters.getErrors?.restoreError) this.tokenError = true;
                else this.isModalOpen = true;
            }
        },
    }
}
</script>

<style lang="scss">
@import '../../assets/css/components/restore-page.scss'
</style>