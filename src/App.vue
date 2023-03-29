<template>
  <div :class="selectedMode">
    <router-view v-slot="{ Component }">

      <transition name="fade">
        <component :is="Component" />
      </transition>
      <Header />
    </router-view>
  </div>
</template>

<script>
import Header from './components/common/Header.vue';

export default {
  name: 'App',
  components: { Header },
  computed: {
    selectedMode() {
      const mode = localStorage.getItem("mode");
      let className;
      if (!mode) className = 'light-mode';
      className = mode === 'light' ? 'light-mode' : 'dark-mode';

      return className;
    },
  }
};
</script>

<style lang="scss">
html,
body {
  margin: 0;
}

@import "assets/css/variables/dark-mode";
@import "assets/css/variables/light-mode";
</style>
