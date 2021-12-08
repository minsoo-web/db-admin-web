<template>
  <div class="voc-page">
    <div class="db-title">고충신고</div>

    <ul class="voc-list">
      <li class="voc" :key="voc.id" v-for="(voc, index) in vocList">
        <div class="index">
          {{ index + 1 }}
        </div>

        <div class="content-wrapper">
          <p class="content-title">{{ voc.title }}</p>

          <p class="date-info">{{ computedDate(voc.createdAt) }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import moment from "moment"
  import { collection, getDocs } from "@firebase/firestore"
  import { db } from "../firebase"

  export default {
    name: "VoiceOfCustomer",
    data: () => ({
      vocList: [],
    }),
    methods: {
      computedDate(date) {
        return moment(date).fromNow()
      },
    },
    async mounted() {
      const snapshot = await getDocs(collection(db, "voc"))
      snapshot.forEach(doc => this.vocList.push(doc.data()))
    },
  }
</script>

<style lang="scss" scoped>
  .voc-page {
    padding: 20px;
    .db-title {
      font-size: 30px;
    }

    .voc-list {
      list-style: none;
      padding: 0;
      margin: 0;
      border: 1px solid rgb(245, 245, 245);
      background-color: rgb(245, 245, 245);
      border-radius: 8px;
      height: 62.31px;

      .voc {
        display: flex;
        padding: 10px 0;
        height: 100%;

        .index {
          width: 50px;
          height: 100%;

          display: inline-flex;
          justify-content: center;
          align-items: center;
        }

        .content-wrapper {
          flex: 1;
          font-size: 16px;

          .content-title {
            max-width: 400px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }

          .date-info {
            font-size: 12px;
            color: #57606a;
          }
        }

        & + & {
          border-top: 1px solid #666;
        }
      }
    }
  }
</style>
