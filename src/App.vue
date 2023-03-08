<template>
  <div :class="selectedMode">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    selectedMode() {
      const mode = localStorage.getItem("mode");
      let className;
      if (!mode) className = 'light-mode';
      className = mode === 'light' ? 'light-mode' : 'dark-mode';

      return className;
    }
  }
};
</script>

<style lang="scss">
@import "assets/css/variables/dark-mode";
@import "assets/css/variables/light-mode";
</style>
