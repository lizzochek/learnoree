<template>
    <div id="register" :class="mode">
        <BaseModal v-if="isModalOpen" headingText="User registered successfully" text="You have been successfully registered. 
                            Now you will not have access to some features until you're verified by the administrator of your educational facility. 
                            In case you have issues, please contact you educational facility" url="/news" />
        <img v-if="mode == 'dark'" id="img-1" src="../../assets/img/15.png" />
        <img v-if="mode == 'light'" id="img-2" src="../../assets/img/10.png" />
        <div v-if="registerError" class="container">
            <BaseHeading text="Sorry, something is wrong with your registration. Please try again" />
        </div>
        <div v-else id="container">
            <div v-if="currentStep == 'role'" class="buttons">
                <LinkButton v-for="role in roles" @click="handleRoleChange(role)" class="link-button" :text="role"
                    backgroundTheme="dark" />
            </div>
            <form v-else class="register-form">
                <BaseHeading :text="headerText" />

                <input v-if="currentStep == 'credentials'" :class="validation.emailInvalid ? 'error-input' : ''"
                    autocomplete="off" spellcheck="false" class="control" type="email" placeholder="Email"
                    v-model="email" />
                <div v-if="validation.emailInvalid && currentStep == 'credentials'" class="message-container">
                    <img class="error-icon" src="https://img.icons8.com/emoji/48/null/exclamation-mark-emoji.png" />
                    <p class="error-p">Please enter valid email</p>
                </div>
                <input v-if="currentStep == 'credentials'" :class="error ? 'error-input' : ''" spellcheck=" false"
                    class="control" v-model="password" id="password" type="password" placeholder="Password" />
                <div v-if="currentStep == 'credentials' && userExists" class="message-container">
                    <img class="error-icon" src="https://img.icons8.com/emoji/48/null/exclamation-mark-emoji.png" />
                    <p class="error-p">User with such email exists. Please log in instead</p>
                </div>

                <div v-if="currentStep == 'data'">
                    <input :class="validation.nameInvalid ? 'error-input' : ''" autocomplete="off" spellcheck="false"
                        class="control" type="text" placeholder="Name" v-model="enteredData.name" />
                    <div v-if="validation.nameInvalid" class="message-container">
                        <img class="error-icon" src="https://img.icons8.com/emoji/48/null/exclamation-mark-emoji.png" />
                        <p class="error-p">Name can't be less than 2 characters</p>
                    </div>
                    <input :class="validation.secondInvalid ? 'error-input' : ''" autocomplete="off" spellcheck="false"
                        class="control" type="text" placeholder="Second name" v-model="enteredData.secondName" />
                    <div v-if="validation.secondInvalid" class="message-container">
                        <img class="error-icon" src="https://img.icons8.com/emoji/48/null/exclamation-mark-emoji.png" />
                        <p class="error-p">Second name can't be less than 2 characters</p>
                    </div>
                    <input :class="validation.surnameInvalid ? 'error-input' : ''" autocomplete="off" spellcheck="false"
                        class="control" type="text" placeholder="Surname" v-model="enteredData.surname" />
                    <div v-if="validation.surnameInvalid" class="message-container">
                        <img class="error-icon" src="https://img.icons8.com/emoji/48/null/exclamation-mark-emoji.png" />
                        <p class="error-p">Surname can't be less than 2 characters</p>
                    </div>
                    <input :class="validation.phoneInvalid ? 'error-input' : ''" autocomplete="off" spellcheck="false"
                        class="control" type="tel" placeholder="Phone number" v-model="enteredData.phone" />
                    <div v-if="validation.phoneInvalid" class="message-container">
                        <img class="error-icon" src="https://img.icons8.com/emoji/48/null/exclamation-mark-emoji.png" />
                        <p class="error-p">Please enter a phone number in the format 0123456789</p>
                    </div>
                    <div v-if="userExists" class="message-container">
                        <img class="error-icon" src="https://img.icons8.com/emoji/48/null/exclamation-mark-emoji.png" />
                        <p class="error-p">User with such email exists. Please log in instead</p>
                    </div>

                    <!-- Role specific fields -->
                    <input v-if="currentRole == 'teacher'" :class="validation.cathedraInvalid ? 'error-input' : ''"
                        autocomplete="off" spellcheck="false" class="control" type="text" placeholder="Cathedra"
                        v-model="enteredData.cathedra" />
                    <div v-if="validation.cathedraInvalid" class="message-container">
                        <img class="error-icon" src="https://img.icons8.com/emoji/48/null/exclamation-mark-emoji.png" />
                        <p class="error-p">Cathedra name has to be more than 2 and less than 10 characters</p>
                    </div>
                    <input v-if="currentRole == 'teacher'" :class="validation.facultyInvalid ? 'error-input' : ''"
                        autocomplete="off" spellcheck="false" class="control" type="text" placeholder="Faculty"
                        v-model="enteredData.faculty" />
                    <div v-if="validation.facultyInvalid" class="message-container">
                        <img class="error-icon" src="https://img.icons8.com/emoji/48/null/exclamation-mark-emoji.png" />
                        <p class="error-p">Faculty name has to be more than 2 and less than 10 characters</p>
                    </div>

                    <div v-if="currentRole == 'student'">
                        <input :class="validation.groupInvalid ? 'error-input' : ''" autocomplete="off" spellcheck="false"
                            class="control" type="text" placeholder="Group" v-model="enteredData.group" />
                        <div v-if="validation.groupInvalid" class="message-container">
                            <img class="error-icon" src="https://img.icons8.com/emoji/48/null/exclamation-mark-emoji.png" />
                            <p class="error-p">Group name has to be more than 3 characters and contain number</p>
                        </div>

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
import BaseHeading from '../common/BaseHeading.vue';
import LinkButton from '../common/LinkButton.vue';
import BaseModal from '../common/BaseModal.vue';

export default {
    name: 'RegisterPage',
    components: { LinkButton, BaseHeading, BaseModal },
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
            isModalOpen: false,
            validation: {
                nameInvalid: false,
                secondInvalid: false,
                surnameInvalid: false,
                phoneInvalid: false,
                cathedraInvalid: false,
                facultyInvalid: false,
                groupInvalid: false,
            },
        }
    },
    watch: {
        email: {
            handler(newVal, oldVal) {
                this.validation.emailInvalid = newVal.search(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) === -1;
            }
        },
    },
    computed: {
        headerText() {
            return this.currentStep == 'credentials' ? 'Enter your credentials' : 'Enter your data'
        },
        buttonText() {
            return this.currentStep == 'credentials' ? 'Continue' : 'Register'
        },
        userExists() {
            return this.$store.getters.getErrors.userExists;
        },
        registerError() {
            return this.$store.getters.getErrors.registerError;
        }
    },
    methods: {
        validateForm() {
            const { name, secondName, surname, phone } = this.enteredData;
            if (name?.length < 2) this.validation.nameInvalid = true;
            if (surname?.length < 2) this.validation.surnameInvalid = true;
            if (secondName?.length < 2) this.validation.secondInvalid = true;
            if (phone?.search(/0[0-9]{9}/) == -1) this.validation.phoneInvalid = true;

            if (this.currentRole == 'teacher') {
                const { faculty, cathedra } = this.enteredData;
                if (cathedra.length < 2 || cathedra.length > 10) this.validation.cathedraInvalid = true;
                if (faculty.length < 2 || faculty.length > 10) this.validation.facultyInvalid = true;
            }

            if (this.currentRole == 'student') {
                if (this.enteredData.group < 3 || this.enteredData?.group?.search(/\d/) == -1) this.validation.groupInvalid = true;
            }
        },
        formatData() {
            Object.keys(this.enteredData).forEach(key => {
                switch (key) {
                    case 'name':
                    case 'surname':
                    case 'secondName':
                        this.enteredData[key] = this.enteredData[key].charAt(0).toUpperCase() + this.enteredData[key].slice(1);
                        break;
                    case 'faculty':
                    case 'cathedra':
                        this.enteredData[key] = this.enteredData[key].toUpperCase;
                        break;
                    default: break;
                }
            })
        },
        async handleRegister() {
            this.$store.dispatch('removeError', 'userExists');

            if (this.currentStep == "credentials") {
                await this.$store.dispatch('login/getUser', { email: this.email });

                if (!this.$store.getters.getErrors.userExists) {
                    this.currentStep = "data";
                };
            } else if (this.currentStep == 'data') {
                this.validateForm();
                const isFormValid = Object.values(this.validation).every(element => !element);

                if (isFormValid) {
                    this.formatData();
                    await this.$store.dispatch('login/registerUser', { email: this.email, password: this.password, enteredData: this.enteredData, role: this.currentRole });
                    if (!this.registerError) this.isModalOpen = true;
                }
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