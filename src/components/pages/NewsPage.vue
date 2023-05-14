<template>
    <div id="news-page">
        <ul>
            <li v-for="(item, index) in news" :key="index">
                <BaseCard>
                    <BaseHeading ref="heading" :class="isAdmin ? 'editable' : ''" id="heading" :text="item.heading"
                        :contentEditable="isAdmin" />
                    <p ref="text" :class="isAdmin ? 'editable' : ''" id="card-text" :contentEditable="isAdmin">
                        {{ item.text }}
                    </p>
                    <p id="explanation-text">To edit text and heading click on it and start typing!</p>
                    <span id="date">{{ item.date }}</span>
                    <div v-if="isAdmin">
                        <LinkButton class="btn" text="Save changes" backgroundTheme="light" @click="saveChanges(index)" />
                        <div id="delete">
                            <svg id="delete-icon" @click="deleteNews(index)" xmlns="http://www.w3.org/2000/svg"
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
        <LinkButton v-if="isAdmin" id="add-btn" class="btn" text="Add news" backgroundTheme="dark" @click="addNews" />
    </div>
</template>

<script>
import BaseCard from '../common/BaseCard.vue';
import BaseHeading from '../common/BaseHeading.vue';
import LinkButton from '../common/LinkButton.vue';

export default {
    name: "NewsPage",
    components: { BaseCard, BaseHeading, LinkButton },
    computed: {
        isAdmin() {
            return this.$store.getters['login/getUser']?.role == 'admin';
        },
        news() {
            return this.$store.getters.getNews;
        },
    },
    methods: {
        async saveChanges(ind) {
            const newNews = [...this.news];
            newNews[ind] = {
                heading: this.$refs.heading[ind].text,
                text: this.$refs.text[ind].textContent,
            };
            await this.$store.dispatch('updateNews', newNews);
        },
        async addNews() {
            const newNews = [...this.news, {
                heading: 'Edit heading',
                text: 'Edit text',
            }];
            await this.$store.dispatch('updateNews', newNews);
        },
        async deleteNews(ind) {
            const newNews = this.news.filter((_, index) => ind !== index)
            await this.$store.dispatch('updateNews', newNews);
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/css/components/news-page.scss';
</style>