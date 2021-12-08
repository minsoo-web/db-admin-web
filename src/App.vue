<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
  import { onAuthStateChanged } from "firebase/auth"
  import { auth } from "./firebase"
  import { mapMutations } from "vuex"
  import moment from "moment"
  import "moment/locale/ko" // without this line it didn't work

  export default {
    name: "App",

    data: () => ({
      //
    }),
    methods: {
      ...mapMutations("authStore", ["SET_UID"]),
    },
    mounted() {
      moment.locale("ko")
      onAuthStateChanged(auth, user => {
        if (user) {
          //

          this.SET_UID(user.uid)
        } else {
          //
          if (this.$route.path !== "/auth/sign-in")
            this.$router.push("/auth/sign-in")
        }
      })
    },
  }
</script>

<style lang="scss">
  @font-face {
    font-family: "GmarketSansMedium";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }

  * {
    font-family: "GmarketSansMedium" !important;
  }

  p {
    margin: 0 !important;
  }
  ul {
    list-style: none;
    margin: 0 !important;
    padding: 0 !important;
  }
  * {
    box-sizing: border-box !important;
  }
</style>
