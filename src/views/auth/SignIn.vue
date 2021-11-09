<template>
  <section class="sign-in-form">
    <v-text-field
      label="아이디"
      v-model="loginForm.id"
      hide-details="auto"
    ></v-text-field>
    <v-text-field
      :type="'password'"
      name="input-10-2"
      label="비밀번호"
      v-model="loginForm.password"
      hide-details="auto"
    ></v-text-field>
    <!--  -->
    <div class="button-wrapper">
      <v-btn
        class="login-btn"
        :loading="loading"
        :disabled="!isComplete"
        color="secondary"
      >
        로그인
      </v-btn>
      <router-link to="/sign-up">회원가입</router-link>
    </div>
  </section>
</template>

<script>
  export default {
    name: "SignIn",
    computed: {
      isComplete() {
        const { id, password } = this.loginForm
        return id.length > 0 && password.length > 0
      },
    },

    data: () => ({
      pw: "",
      loginForm: {
        id: "",
        password: "",
      },

      loading: false,

      show: false,
    }),
    methods: {},
  }
</script>

<style lang="scss" scoped>
  .sign-in-form {
    width: 50vw;

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
