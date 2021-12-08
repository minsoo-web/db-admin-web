<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
  import { onAuthStateChanged } from "firebase/auth"
  import { auth } from "./firebase"
  import { mapMutations } from "vuex"

  export default {
    name: "App",

    data: () => ({
      //
    }),
    methods: {
      ...mapMutations("authStore", ["SET_UID"]),
    },
    mounted() {
      onAuthStateChanged(auth, user => {
        if (user) {
          //

          this.SET_UID(user.uid)
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
