<template>
  <div>
    <button @click="logout">로그아웃</button>
  </div>
</template>

<script>
  import { auth } from "../firebase"

  export default {
    name: "Main",
    methods: {
      logout() {
        auth.signOut()
      },
    },
  }
</script>
