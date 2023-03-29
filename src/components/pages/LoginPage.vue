<template>
    <div id="login" :class="mode">
        <img id="img-2" src="../../assets/img/6.png" />
        <div id="container"> </div>
        <img id="img-1" src="../../assets/img/7.png" />
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