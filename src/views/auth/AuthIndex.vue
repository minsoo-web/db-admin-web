<template>
  <div class="auth-routes">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: "AuthIndex",
  }
</script>

<style lang="scss" scoped>
  .auth-routes {
    width: 100%;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
