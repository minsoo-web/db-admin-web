<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
  import { onAuthStateChanged } from "firebase/auth"
  import { auth } from "./firebase"

  export default {
    name: "App",

    data: () => ({
      //
    }),
    mounted() {
      onAuthStateChanged(auth, user => {
        if (user) {
          //

          if (this.$route.path !== "/") this.$router.push("/")
        } else {
          //
          if (this.$route.path !== "/auth/sign-in")
            this.$router.push("/auth/sign-in")
        }
      })
    },
  }
</script>
