<template>
  <v-navigation-drawer
    v-if="userInfo"
    class="main-drawer"
    v-model="drawer"
    :mini-variant.sync="mini"
    permanent
  >
    <v-list-item class="px-2">
      <v-list-item-avatar>
        <v-img
          src="https://user-images.githubusercontent.com/57122180/144985636-fb5b64fb-3d5d-48e3-acee-7c37da0fd9d5.png"
        ></v-img>
      </v-list-item-avatar>

      <v-list-item-title>{{ userInfo.name }}</v-list-item-title>
      <v-list-item-subtitle>{{ userInfo.department }}</v-list-item-subtitle>

      <v-btn icon @click.stop="mini = !mini">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        @click="$getSafe(() => item.onclick())"
        :href="item.path"
      >
        <v-list-item-icon>
          <v-icon v-if="computeIcon(item)">{{ item.activeIcon }}</v-icon>
          <v-icon v-else>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import { mapActions, mapState } from "vuex"
  export default {
    computed: {
      ...mapState("authStore", ["uid", "userInfo"]),
    },
    watch: {
      async uid() {
        await this.getUser()
      },
    },
    data() {
      return {
        drawer: true,
        items: [
          {
            title: "근태관리",
            icon: "mdi-home-variant-outline",
            activeIcon: "mdi-home-variant",
            path: "/",
          },
          {
            title: "관리자 권한 관리",
            icon: "mdi-account-circle-outline",
            activeIcon: "mdi-account-circle",
            path: "/users",
          },
          {
            title: "투표 현황 조회",
            icon: "mdi-checkbox-multiple-marked-circle-outline",
            activeIcon: "mdi-checkbox-multiple-marked-circle",
            path: "/votes",
          },
          {
            title: "로그아웃",
            icon: "mdi-logout-variant",
            onclick: () => this.signOut(),
          },
        ],
        mini: false,
      }
    },
    methods: {
      ...mapActions("authStore", ["getUser", "signOut"]),
      computeIcon(item) {
        return item.path === this.$route.fullPath
      },
    },
  }
</script>

<style lang="scss" scoped>
  .main-drawer {
    position: fixed;
    z-index: 999;
  }
</style>
