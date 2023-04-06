<template>
    <div id="register" :class="mode">
        <img v-if="mode == 'dark'" id="img-1" src="../../assets/img/15.png" />
        <img v-if="mode == 'light'" id="img-2" src="../../assets/img/10.png" />
        <div id="container">
            <div v-if="currentStep == 'role'" class="buttons">
                <LinkButton v-for="role in roles" @click="handleRoleChange(role)" class="link-button" :text="role"
                    backgroundTheme="dark" />
            </div>
            <form v-else class="register-form">
                <h2>{{ headerText }}</h2>
                <div v-if="currentStep == 'credentials'">
                    <input :class="error ? 'error-input' : ''" autocomplete="off" spellcheck="false" class="control"
                        type="email" placeholder="Email" v-model="email" />
                    <div v-if="error" class="message-container">
                        <img class="error-icon" src="https://img.icons8.com/emoji/48/null/exclamation-mark-emoji.png" />
                        <p class="error-p">Please enter valid email</p>
                    </div>
                    <input :class="error ? 'error-input' : ''" spellcheck="false" class="control" v-model="password"
                        id="password" type="password" placeholder="Password" onkeyup="handleChange()" />
                </div>
                <div v-else>
                    <input autocomplete="off" spellcheck="false" class="control" type="text" placeholder="Name"
                        v-model="enteredData.name" />
                    <input autocomplete="off" spellcheck="false" class="control" type="text" placeholder="Second name"
                        v-model="enteredData.secondName" />
                    <input autocomplete="off" spellcheck="false" class="control" type="text" placeholder="Surname"
                        v-model="enteredData.surname" />
                    <input autocomplete="off" spellcheck="false" class="control" type="tel" placeholder="Phone number"
                        v-model="enteredData.phone" />

                    <!-- Role specific fields -->
                    <input v-if="currentRole == 'teacher'" autocomplete="off" spellcheck="false" class="control" type="text"
                        placeholder="Cathedra" v-model="enteredData.cathedra" />

                    <div v-if="currentRole == 'student'">
                        <input autocomplete="off" spellcheck="false" class="control" type="text" placeholder="Group"
                            v-model="enteredData.group" />
                        <input autocomplete="off" spellcheck="false" class="control" type="date"
                            placeholder="Start date of your education" v-model="enteredData.startDate" />
                        <input autocomplete="off" spellcheck="false" class="control" type="date"
                            placeholder="End date of your education" v-model="enteredData.endDate" />
                    </div>
                </div>
                <router-link to="/login" id="link">Already have an account?</router-link>
                <button class="control" type="button" @click="handleRegister">{{ buttonText }}</button>
            </form>
        </div>
    </div>
</template>

<script>
import LinkButton from '../common/LinkButton.vue';

export default {
    name: 'RegisterPage',
    components: { LinkButton },
    data() {
        return {
            error: false,
            mode: localStorage.getItem('mode'),
            isRegister: true,
            email: '',
            password: '',
            currentRole: '',
            linkText: "Already have an account?",
            currentStep: 'role',
            roles: ['teacher', 'student', 'admin'],
            enteredData: {},
        }
    },
    watch: {
        email: {
            handler(newVal, oldVal) {
                this.error = newVal.search(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) === -1 ? true : false;
            }
        }
    },
    computed: {
        headerText() {
            return this.currentStep == 'credentials' ? 'Enter your credentials' : 'Enter your data'
        },
        buttonText() {
            return this.currentStep == 'credentials' ? 'Continue' : 'Register'
        }
    },
    methods: {
        validateForm() { },
        handleRegister() {
            if (this.currentStep == "credentials") {
                this.currentStep = "data";
            }
            if (this.currentStep == 'data') {
                this.validateForm();
                // Send data to store and db
            }
        },
        handleRoleChange(role) {
            this.currentRole = role;
            this.currentStep = 'credentials';
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/css/components/Register-page.scss';
</style>