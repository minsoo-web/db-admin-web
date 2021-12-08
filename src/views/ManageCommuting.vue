<template>
  <div>
    <v-sheet
      tile
      height="56"
      class="d-flex"
      style="align-items: center; padding: 20px; font-size: 20px"
    >
      출퇴근 관리
    </v-sheet>

    <!--  -->
    <div class="container">
      <div class="header">
        <VueTimepicker format="hh:mm" v-model="timeData" />

        <v-btn @click="commuteStart('출근')">출근</v-btn>
        <v-btn @click="commuteStart('퇴근')">퇴근</v-btn>

        선택한 시간: {{ today }}
      </div>

      <v-calendar
        ref="calendar"
        locale="kr"
        :events="events"
        @click:date="onClickDate"
      ></v-calendar>
    </div>
  </div>
</template>

<script>
  // Main JS (in UMD format)
  import VueTimepicker from "vue2-timepicker"

  // CSS
  import "vue2-timepicker/dist/VueTimepicker.css"
  import moment from "moment"

  import { mapState } from "vuex"
  import { doc, updateDoc } from "@firebase/firestore"
  import { db } from "../firebase"

  export default {
    name: "ManageCommuting",
    components: { VueTimepicker },
    watch: {
      userInfo(newVal) {
        this.events = newVal.commutes
      },
    },
    computed: {
      ...mapState("authStore", ["userInfo", "uid"]),
    },
    data: () => ({
      timeData: {
        hh: moment().format("hh"),
        mm: moment().format("mm"),
      },
      today: moment().format("YYYY-MM-DD hh:mm"),
      events: [],
      colors: [
        "blue",
        "indigo",
        "deep-purple",
        "cyan",
        "green",
        "orange",
        "grey darken-1",
      ],
    }),
    methods: {
      async commuteStart(label) {
        this.events.push({
          name: label,
          start: this.today,
          color: label === "출근" ? "orange" : "deep-purple",
        })

        await updateDoc(doc(db, "employee", this.uid), {
          commutes: this.events,
        })
      },
      onClickDate(data) {
        this.today = data.date + " " + moment().format("hh:mm")
      },
    },
    mounted() {
      console.log(this.userInfo)
    },
  }
</script>

<style lang="scss" scoped>
  .container {
    padding: 20px;
    border-top: 1px solid #e0e0e0;

    .header {
      margin-bottom: 20px;
    }
  }
</style>
