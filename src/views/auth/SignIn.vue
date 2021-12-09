<template>
  <section class="sign-in-form">
    <div class="container">
      <div class="logo-container"><span>DB 코딩보험</span></div>
      <v-form v-model="emailPass">
        <v-text-field
          label="이메일"
          v-model="loginForm.email"
          hide-details="auto"
          :rules="emailRules"
        ></v-text-field>
        <v-text-field
          :type="'password'"
          name="input-10-2"
          label="비밀번호"
          v-model="loginForm.password"
          hide-details="auto"
        ></v-text-field>
      </v-form>
      <!--  -->
      <div class="button-wrapper">
        <v-btn
          class="login-btn"
          :loading="loading"
          :disabled="!emailPass || !isComplete"
          color="secondary"
          @click="callSignInApi"
        >
          로그인
        </v-btn>
        <router-link to="/auth/sign-up">회원가입</router-link>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapActions } from "vuex"

  export default {
    name: "SignIn",
    computed: {
      isComplete() {
        const { email, password } = this.loginForm
        return email.length > 0 && password.length > 0
      },
    },

    data: () => ({
      pw: "",
      loginForm: {
        email: "",
        password: "",
      },
      emailRules: [
        v =>
          !v ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "이메일 형식에 맞게 입력해주세요",
      ],
      emailPass: false,
      loading: false,
    }),
    methods: {
      ...mapActions("authStore", ["postSignIn"]),
      async callSignInApi() {
        this.loading = true
        await this.postSignIn(this.loginForm)
        this.loading = false
      },
    },
  }
</script>

<style lang="scss" scoped>
  .sign-in-form {
    width: 50vw;

    .logo-container {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      > span {
        font-size: 45px;
      }
    }

    .button-wrapper {
      display: flex;
      flex-direction: column;

      justify-content: center;
      align-items: center;
      margin-top: 20px;

      .login-btn {
        width: 100%;
        margin-bottom: 20px;
      }
    }
  }
</style>
