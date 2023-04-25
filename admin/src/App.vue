<template>
  <router-view />
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">
@import './assets/reset.scss';
@import './assets/base.scss';
body,
html {
  height: 100%;
  width: 100%;
  background: #fff;
}

#app {
  height: 100%;
  width: 100%;
}
</style>
