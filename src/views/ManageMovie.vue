<template>
  <div>
    <v-sheet
      tile
      height="56"
      class="d-flex"
      style="align-items: center; padding: 20px; font-size: 20px"
    >
      <span>배급 영화 관리</span>
    </v-sheet>

    <div class="container"></div>
  </div>
</template>

<script>
  export default {
    name: "ManageMovie",
  }
</script>

<style lang="scss" scoped>
  .container {
    padding: 20px;
    border-top: 1px solid #e0e0e0;
  }
</style>
