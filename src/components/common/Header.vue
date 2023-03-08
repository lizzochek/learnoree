<template>
    <button id="style-change" @click="changeStyle">Change style</button>
</template>'

<script>
export default {
    name: 'Header',
    methods: {
        changeStyle() {
            const mode = localStorage.getItem('mode');
            localStorage.setItem("mode", mode === 'light' ? 'dark' : 'light');
            window.location.reload();
        }
    }
}
</script>

<style scoped lang="scss">
#style-change {
    color: var(--primary-color);
}
</style>