import { auth } from "../firebase"

const onlyAuth = (to, from, next) => {
  if (auth.currentUser === null) next("/auth/sign-in")
  else next()
}

const onlyNotAuth = (to, from, next) => {
  if (auth.currentUser !== null) {
    alert("이미 로그인 하셨습니다.")
    next("/")
  } else next()
}

export { onlyAuth, onlyNotAuth }
