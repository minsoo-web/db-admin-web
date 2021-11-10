<template>
  <div :style="imageStyle" class="logo-wrapper">
    <img class="logo-image" src="https://via.placeholder.com/450x100" alt="" />
  </div>
</template>

<script>
  export default {
    name: "Logo",
    computed: {
      imageStyle() {
        return {
          width: "450px",
          height: "100px",
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .logo-wrapper {
    .logo-image {
      width: 100%;
      height: 100%;
    }
  }
</style>
