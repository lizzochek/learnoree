<template>
    <div id="login" :class="mode">
        <BaseModal v-if="isModalOpen" headingText="Email was sent"
            text="Link to restore your password was sent to your email" url="/main" />
        <img v-if="mode == 'dark'" id="img-1" src="../../assets/img/15.png" />
        <img v-if="mode == 'light'" id="img-2" src="../../assets/img/10.png" />
        <div id="container">
            <form class="login-form">
                <BaseHeading :text="headerText" />
                <input :class="error ? 'error-input' : ''" autocomplete="off" spellcheck="false" class="control"
                    type="email" placeholder="Email" v-model="email" />
                <div v-if="error == 'emailValidation' || error == 'noUser'" class="message-container">
                    <img class="error-icon" src="https://img.icons8.com/emoji/48/null/exclamation-mark-emoji.png" />
                    <p class="error-p">{{ emailError }}</p>
                </div>
                <input v-if="isLogin" :class="error == 'wrongData' ? 'error-input' : ''" spellcheck="false" class="control"
                    v-model="password" id="password" type="password" placeholder="Password" />
                <div v-if="error == 'wrongData'" class="message-container">
                    <img class="error-icon" src="https://img.icons8.com/emoji/48/null/exclamation-mark-emoji.png" />
                    <p class="error-p">Your email or password is wrong</p>
                </div>
                <p id="link" @click="isLogin = !isLogin">
                    {{ linkText }}
                </p>
                <button class="control" type="button" @click="handleLogin">
                    {{ buttonText }}
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import BaseHeading from '../common/BaseHeading.vue';
import BaseModal from '../common/BaseModal.vue';

export default {
    name: 'LoginPage',
    data() {
        return {
            error: '',
            mode: localStorage.getItem('mode'),
            isLogin: true,
            email: '',
            password: '',
            isModalOpen: false,
        };
    },
    computed: {
        linkText() {
            return this.isLogin
                ? "Don't remember your password?"
                : 'Go back to login';
        },
        headerText() {
            return this.isLogin ? 'Log in' : 'Restore password';
        },
        buttonText() {
            return this.isLogin ? 'Log in now' : 'Restore password';
        },
        emailError() {
            return this.error == 'emailValidation'
                ? 'Please enter a valid email'
                : "There's no user with such email!";
        },
    },
    watch: {
        email: {
            handler(newVal, oldVal) {
                this.error =
                    newVal.search(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) === -1
                        ? 'emailValidation'
                        : '';
            },
        },
    },
    methods: {
        async handleLogin() {
            this.$store.dispatch('removeError', 'noUser');
            if (this.isLogin) {
                await this.$store.dispatch('logIn', {
                    email: this.email,
                    password: this.password,
                });

                if (!this.$store.getters.getLoggedIn) {
                    this.error = 'wrongData';
                } else {
                    this.$router.push('/news');
                }
            } else {
                await this.$store.dispatch('restorePassword', { email: this.email });
                if (this.$store.getters.getErrors?.noUser) {
                    this.error = 'noUser';
                } else {
                    this.isModalOpen = true;
                }
            }
        },
    },
    components: { BaseHeading, BaseModal },
};
</script>

<style lang="scss">
@import '../../assets/css/components/login-page.scss';
</style>
