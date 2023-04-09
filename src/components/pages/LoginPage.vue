<template>
    <div id="login" :class="mode">
        <img v-if="mode == 'dark'" id="img-1" src="../../assets/img/15.png" />
        <img v-if="mode == 'light'" id="img-2" src="../../assets/img/10.png" />
        <div id="container">
            <form class="login-form">
                <h2>{{ headerText }}</h2>
                <input :class="error ? 'error-input' : ''" autocomplete="off" spellcheck="false" class="control"
                    type="email" placeholder="Email" v-model="email" />
                <div v-if="error == 'emailValidation'" class="message-container">
                    <img class="error-icon" src="https://img.icons8.com/emoji/48/null/exclamation-mark-emoji.png" />
                    <p class="error-p">Please enter valid email</p>
                </div>
                <input v-if="isLogin" :class="error == 'wrongData' ? 'error-input' : ''" spellcheck="false" class="control"
                    v-model="password" id="password" type="password" placeholder="Password" />
                <div v-if="error == 'wrongData'" class=" message-container">
                    <img class="error-icon" src="https://img.icons8.com/emoji/48/null/exclamation-mark-emoji.png" />
                    <p class="error-p">Your email or password is wrong</p>
                </div>
                <p id="link" @click="isLogin = !isLogin">{{ linkText }}</p>
                <button class="control" type="button" @click="handleLogin">{{ buttonText }}</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoginPage',
    data() {
        return {
            error: '',
            mode: localStorage.getItem('mode'),
            isLogin: true,
            email: '',
            password: '',
        }
    },
    computed: {
        linkText() {
            return this.isLogin ? "Don't remember your password?" : "Go back to login"
        },
        headerText() {
            return this.isLogin ? 'Log in' : 'Restore password'
        },
        buttonText() {
            return this.isLogin ? 'Log in now' : 'Restore password';
        }
    },
    watch: {
        email: {
            handler(newVal, oldVal) {
                this.error = newVal.search(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) === -1 ? 'emailValidation' : '';
            }
        }
    },
    methods: {
        handleLogin() {
            this.$store.dispatch('logIn', { email: this.email, password: this.password });
            if (!this.$store.state.isLoggedIn) {
                this.error = 'wrongData';
            } else {
                this.$router.push("/news");
            }
        },
    }
}
</script>

<style lang="scss">
@import '../../assets/css/components/login-page.scss';
</style>