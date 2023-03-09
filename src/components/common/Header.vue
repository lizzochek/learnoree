<template>
    <ColorChangeButton></ColorChangeButton>
</template>'

<script>
import ColorChangeButton from './ColorChangeButton.vue';

export default {
    name: 'Header',
    components: { ColorChangeButton },
}
</script>

<style scoped lang="scss">
#style-change {
    color: var(--primary-color);
}
</style>