<template>
  <div>
    <NavDrawer />

    <v-main class="main-container">
      <router-view />
    </v-main>
  </div>
</template>

<script>
  import NavDrawer from "@/components/Common/NavDrawer.vue"
  export default {
    name: "Main",
    components: { NavDrawer },
    methods: {},
  }
</script>

<style lang="scss">
  .main-container {
    margin-left: 256px;
  }
</style>
