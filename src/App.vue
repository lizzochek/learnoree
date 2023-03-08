<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!-- <component :is="Component" /> -->
      <h1>Running fine!</h1>
    </transition>
  </router-view>
</template>

<script>
  export default {
    name: 'App',
  };
</script>

<style>
</style>
