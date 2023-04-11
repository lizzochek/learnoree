<template>
    <div id="base-modal">
        <BaseHeading class="modal" :text="headingText" />
        <p class="main-text">{{ text }}</p>
        <LinkButton :url="url" backgroundTheme="light" text="Ok" />
    </div>
</template>

<script>
import BaseHeading from './BaseHeading.vue';
import LinkButton from './LinkButton.vue';

export default {
    name: 'BaseModal',
    components: { BaseHeading, LinkButton },
    props: ['headingText', 'text', 'closeModal', 'url'],
};
</script>

<style scoped lang="scss">
#base-modal {
    position: absolute;
    z-index: 100;
    top: 30%;
    left: 35%;
    width: 30rem;
    height: 20rem;
    background-color: var(--secondary-color);
    display: flex;
    flex-direction: column;
    gap: 5%;
    justify-content: center;
    align-items: center;
    box-shadow: 3px 3px 6px 3px var(--primary-color);
    border-radius: 1rem;

    h2 {
        margin-bottom: 0;
    }

    .main-text {
        position: static;
        font-size: larger;
        width: 80%;
        text-align: center;
    }
}
</style>
