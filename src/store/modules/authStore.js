import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase"

export default {
  namespaced: true,
  state: {
    userInfo: null,
  },
  mutations: {
    SET_USER_INFO(state, payload) {
      state.userInfo = payload
    },
  },
  actions: {
    async postSignIn(context, payload) {
      const { email, password } = payload
      try {
        const response = await signInWithEmailAndPassword(auth, email, password)
        console.log(response)
      } catch (error) {
        if (error.code === "auth/user-not-found")
          alert("가입되지 않은 유저입니다.")
        else console.dir(error)
      }
    },
  },
}
