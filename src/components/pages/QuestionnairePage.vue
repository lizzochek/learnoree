<template>
    <div id="questionnaire">
        <ul id="list">
            <li v-for="(item, index) in list" :key="index">
                <BaseCard>
                    <BaseHeading ref="heading" :class="isAdmin ? 'editable' : ''" id="heading" :text="item.heading"
                        :contentEditable="isAdmin" />
                    <span ref="text" :class="isAdmin ? 'editable' : ''" id="card-text" :contentEditable="isAdmin">
                        {{ item.text }}
                    </span>
                    <span ref="link" :class="isAdmin ? 'editable' : ''" :contentEditable="isAdmin"
                        @click="openLink(item.link)">{{ item.link }}</span>
                    <span id="explanation-text">To edit text and heading click on it and start typing!</span>

                    <div v-if="isAdmin">
                        <LinkButton class="btn" text="Save changes" backgroundTheme="light" @click="saveChanges(index)" />
                        <div id="delete">
                            <svg id="delete-icon" @click="deleteQuestionnaire(index)" xmlns="http://www.w3.org/2000/svg"
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
                    </div>
                </BaseCard>
            </li>
        </ul>
        <LinkButton v-if="isAdmin" id="add-btn" class="btn" text="Add" backgroundTheme="dark" @click="addQuestionnaire" />
    </div>
</template>

<script>
import BaseHeading from '../common/BaseHeading.vue';
import LinkButton from '../common/LinkButton.vue';
import BaseCard from '../common/BaseCard.vue';

export default {
    name: 'QuestionnairePage',
    components: { BaseHeading, LinkButton, BaseCard },
    data() {
        return {
            list: [],
        }
    },
    computed: {
        isAdmin() {
            return this.$store.getters["login/getUser"].role == 'admin';
        },
    },
    created() {
        this.list = this.$store.getters.getQuestionnaire;
    },
    methods: {
        async addQuestionnaire() {
            const newQuestionnaire = [...this.list, {
                heading: 'Edit heading',
                text: 'Edit text',
                link: 'Add link'
            }];
            await this.$store.dispatch('updateQuestionnaire', newQuestionnaire);
            this.list = this.$store.getters.getQuestionnaire;
        },
        async saveChanges(ind) {
            const newQuestionnaire = [...this.list];
            newQuestionnaire[ind] = {
                heading: this.$refs.heading[ind].text,
                text: this.$refs.text[ind].textContent,
                link: this.$refs.link[ind].textContent
            };
            await this.$store.dispatch('updateQuestionnaire', newQuestionnaire);
        },
        openLink(link) {
            if (!this.isAdmin) window.open(link);
        },
        async deleteQuestionnaire(ind) {
            const newQuestionnaire = this.list.filter((_, index) => ind !== index);
            await this.$store.dispatch('updateQuestionnaire', newQuestionnaire);
            this.list = this.$store.getters.getQuestionnaire;
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/css/components/questionnaire-page.scss'
</style>