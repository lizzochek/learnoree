<template>
    <div id="login" :class="mode">
        <div id="img-container" v-if="mode == 'dark'">
            <img id="img-1" src="../../assets/img/7.png" />
            <!-- <img id="img-2" src="../../assets/img/6.png" /> -->
        </div>
        <div id="container">
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoginPage',
    data() {
        return {
            mode: localStorage.getItem('mode'),
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/css/components/login-page.scss';
</style>