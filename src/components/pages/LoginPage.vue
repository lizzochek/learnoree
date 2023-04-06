<template>
    <div id="login" :class="mode">
        <img v-if="mode == 'dark'" id="img-1" src="../../assets/img/15.png" />
        <img v-if="mode == 'light'" id="img-2" src="../../assets/img/10.png" />
        <div id="container">
            <form class="login-form">
                <h2>Log in</h2>
                <input :class="error ? 'error-input' : ''" autocomplete="off" spellcheck="false" class="control"
                    type="email" placeholder="Email" />
                <div v-if="error == 'emailValidation'" class="message-container">
                    <img class="error-icon" src="https://img.icons8.com/emoji/48/null/exclamation-mark-emoji.png" />
                    <p class="error-p">Please enter valid email</p>
                </div>
                <input :class="error == 'wrongData' ? 'error-input' : ''" spellcheck="false" class="control" id="password"
                    type="password" placeholder="Password" onkeyup="handleChange()" />
                <div v-if="error == 'wrongData'" class="message-container">
                    <img class="error-icon" src="https://img.icons8.com/emoji/48/null/exclamation-mark-emoji.png" />
                    <p class="error-p">Your email or password is wrong</p>
                </div>
                <button class="control" type="button" @click="handleLogin">Log in now</button>
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
        }
    },
    methods: {
        handleLogin() {
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/css/components/login-page.scss';
</style>