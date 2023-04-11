<template>
    <h2>{{ text }}</h2>
</template>

<script>
export default {
    name: 'BaseHeading',
    props: ['text']
}
</script>

<style lang="scss">
h2 {
    background-image: linear-gradient(to left,
            var(--primary-color),
            var(--secondary-color));
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    font-size: 30px;
}

#app .modal {
    background-image: linear-gradient(to left,
            var(--primary-color),
            var(--tertiary-color));
}
</style>