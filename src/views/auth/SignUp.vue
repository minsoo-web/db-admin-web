<template>
  <section class="sign-up-form">
    <v-form v-model="isAllPass">
      <v-text-field
        v-model="userId"
        label="이메일"
        :rules="[rules.require]"
        hide-details="auto"
      ></v-text-field>
      <v-text-field
        :rules="[rules.require, rules.min]"
        :type="'password'"
        name="input-10-2"
        label="비밀번호"
        v-model="pw"
        hide-details="auto"
      ></v-text-field>
      <v-text-field
        :rules="[rules.require, rules.min, passwordConfirmationRule]"
        :type="'password'"
        name="input-10-2"
        label="비밀번호 확인"
        v-model="rePw"
        hide-details="auto"
      ></v-text-field>
      <v-text-field
        v-model="userName"
        label="이름"
        :rules="[rules.require]"
        hide-details="auto"
      ></v-text-field>
      <v-text-field
        v-model="department"
        label="부서명"
        :rules="[rules.require]"
        hide-details="auto"
      ></v-text-field>
      <v-select
        v-model="theather"
        :items="computedTheaterLabel"
        label="근무 영화관 (코드)"
      ></v-select>
      <!--  -->
      <div class="button-wrapper">
        <v-btn
          class="login-btn"
          :loading="loading"
          color="secondary"
          @click="
            postSignUp({
              userId,
              pw,
              userName,
              department,
              theather,
            })
          "
        >
          회원가입
        </v-btn>
        <router-link to="/auth/sign-in">로그인</router-link>
      </div>
    </v-form>
  </section>
</template>

<script>
  import { mapActions, mapState } from "vuex"

  export default {
    name: "login-form",
    computed: {
      ...mapState("authStore", ["theaterList"]),
      passwordConfirmationRule() {
        return () => this.pw === this.rePw || "비밀번호가 일치하지 않습니다."
      },
      computedTheaterLabel() {
        return this.theaterList.map(doc => {
          return doc.code + " " + doc.name
        })
      },
    },
    data: () => ({
      rules: {
        require: value => !!value || "필수입력 사항입니다.",
        min: v => v.length >= 8 || "비밀번호는 최소 8글자 이상입니다.",
      },

      userId: "",
      pw: "",
      rePw: "",
      userName: "",
      department: "",
      theather: "",

      loading: false,

      isAllPass: false,

      pwShow: false,
      pwReShow: false,
    }),
    methods: {
      ...mapActions("authStore", ["postSignUp", "getTheaterList"]),
    },
    async mounted() {
      await this.getTheaterList()
    },
  }
</script>

<style lang="scss" scoped>
  .sign-up-form {
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
