<template>
  <div>
    <v-sheet
      tile
      height="56"
      class="d-flex"
      style="
        align-items: center;
        padding: 20px;
        font-size: 20px;
        justify-content: space-between;
      "
    >
      <span>휴가 신청</span>
      <span> 남은 연차: {{ lastVacation }} </span>
    </v-sheet>

    <!--  -->
    <div class="container">
      <v-calendar
        ref="calendar"
        locale="kr"
        :events="events"
        @click:date="onClickDate"
      ></v-calendar>

      <div class="form-container">
        <div>신청 날짜 {{ computeDateInfo(today) }}</div>
        <v-select
          v-model="vacationForm.name"
          :items="nameList"
          label="부재 항목"
          hide-details="auto"
        ></v-select>

        <div class="spacer"></div>
        <v-textarea
          outlined
          no-resize
          label="사유를 적어주세요"
          v-model="vacationForm.title"
          hide-details="auto"
        ></v-textarea>

        <div class="button-wrapper">
          <v-btn :loading="loading" @click="requestVacation">신청</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from "moment"

  import { mapActions, mapState } from "vuex"
  import {
    doc,
    updateDoc,
    increment,
    arrayUnion,
    getDoc,
  } from "@firebase/firestore"
  import { db } from "../firebase"

  export default {
    name: "ManageCommuting",
    watch: {
      async userInfo(newVal) {
        this.lastVacation = newVal.vacation
        await this.getUserVacationList()
      },
    },
    computed: {
      ...mapState("authStore", ["userInfo", "uid"]),
    },
    data: () => ({
      loading: false,
      today: moment().format("YYYY-MM-DD"),
      lastVacation: 0,
      vacationForm: {
        name: "", // 종일, 반일
        start: "",
        title: "",
        color: "",
      },
      events: [],
      nameList: ["종일", "반일", "병가", "경조휴가"],
      colors: {
        종일: "blue",
        반일: "indigo",
        병가: "cyan",
        경조휴가: "green",
      },
    }),
    methods: {
      ...mapActions("authStore", ["getUser"]),
      onClickDate(data) {
        this.today = data.date
      },
      computeDateInfo(date) {
        return moment(date).format("YY년 MM월 DD일")
      },
      async requestVacation() {
        this.loading = true
        this.vacationForm.start = this.today
        this.vacationForm.color = this.colors[this.vacationForm.name]

        const vacationDate = this.vacationForm.name === "반일" ? -0.5 : -1

        await updateDoc(doc(db, "employee", this.uid), {
          vacation: increment(vacationDate),
          vacationList: arrayUnion(this.vacationForm),
        })

        // 연차 삭감됐을테니까 다시 불러오기
        await this.getUser()
        await this.getUserVacationList()

        this.loading = false
        // 끝나고 초기화
        this.vacationForm = {
          name: "", // 종일, 반일
          start: "",
          title: "",
          color: "",
        }
      },
      async getUserVacationList() {
        const docSnapShot = await getDoc(doc(db, "employee", this.uid))
        this.events = docSnapShot.data().vacationList
      },
    },
  }
</script>

<style lang="scss" scoped>
  .container {
    padding: 20px;
    border-top: 1px solid #e0e0e0;

    .form-container {
      margin-top: 20px;
      padding: 20px;
      border: 1px solid #e0e0e0;
      .spacer {
        height: 20px;
      }
      .button-wrapper {
        margin-top: 20px;
      }
    }
  }
</style>
