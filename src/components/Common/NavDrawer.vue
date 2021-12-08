<template>
  <v-navigation-drawer
    v-if="userInfo"
    class="main-drawer"
    v-model="drawer"
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
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item
        v-for="item in manageItems"
        :key="item.title"
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

    <v-list dense>
      <v-list-item
        v-for="item in movieItems"
        :key="item.title"
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

    <v-list dense>
      <v-list-item
        v-for="item in etcItems"
        :key="item.title"
        @click="$getSafe(() => item.onclick())"
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
        if (this.userInfo === null) await this.getUser()
      },
    },
    data() {
      return {
        drawer: true,

        manageItems: [
          {
            title: "출퇴근 기록",
            icon: "mdi-home-variant-outline",
            activeIcon: "mdi-home-variant",
            path: "/manage-commuting",
          },
          {
            title: "고충신고",
            icon: "mdi-account-circle-outline",
            activeIcon: "mdi-account-circle",
            path: "/voice-of-customer",
          },
          {
            title: "휴가 신청 및 관리",
            icon: "mdi-account-circle-outline",
            activeIcon: "mdi-account-circle",
            path: "/vacation",
          },

          {
            title: "비품 관리",
            icon: "mdi-checkbox-multiple-marked-circle-outline",
            activeIcon: "mdi-checkbox-multiple-marked-circle",
            path: "/manage-product",
          },
        ],
        movieItems: [
          {
            title: "배급 영화 관리",
            icon: "mdi-checkbox-multiple-marked-circle-outline",
            activeIcon: "mdi-checkbox-multiple-marked-circle",
            path: "/manage-movie",
          },
          {
            title: "상영 일정 관리",
            icon: "mdi-checkbox-multiple-marked-circle-outline",
            activeIcon: "mdi-checkbox-multiple-marked-circle",
            path: "/manage-movie-date",
          },
        ],

        etcItems: [
          {
            title: "로그아웃",
            icon: "mdi-logout-variant",
            onclick: () => this.signOut(),
          },
        ],
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
