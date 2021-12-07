import { signInWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../../firebase"
import { collection, getDocs } from "firebase/firestore"

export default {
  namespaced: true,
  state: {
    userInfo: null,
    theaterList: [],
  },
  mutations: {
    SET_USER_INFO(state, payload) {
      state.userInfo = payload
    },
    SET_THEATER_LIST(state, payload) {
      state.theaterList = payload
    },
  },
  actions: {
    async getTheaterList({ commit }) {
      const snapshot = await getDocs(collection(db, "theater"))
      let data = []

      snapshot.forEach(doc => data.push(doc.data()))

      // const data = snapshot._snapshot.map(doc => doc.data())

      commit("SET_THEATER_LIST", data)
    },

    async postSignIn(context, payload) {
      const { email, password } = payload

      try {
        const response = await signInWithEmailAndPassword(auth, email, password)
        console.log(response)
        console.log(auth.currentUser)
      } catch (error) {
        if (error.code === "auth/user-not-found")
          alert("가입되지 않은 유저입니다.")
        if (error.code === "auth/wrong-password")
          alert("이메일 혹은 비밀번호가 틀렸습니다.")
        else console.dir(error)
      }
    },

    async postSignUp({ dispatch }, payload) {
      await dispatch("getTheaterList")

      console.log(payload)
      // Todo: 이메일 회원가입
      // store 에 저장
    },
  },
}
