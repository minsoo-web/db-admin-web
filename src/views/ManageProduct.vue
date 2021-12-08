<template>
  <div>
    <v-sheet
      tile
      height="56"
      class="d-flex"
      style="align-items: center; padding: 20px; font-size: 20px"
    >
      <span>비품 관리</span>
    </v-sheet>

    <div class="container">
      <v-data-table
        :loading="loading"
        loading-text="처리중입니다..."
        :headers="headers"
        :items="productItemList"
        :items-per-page="10"
        class="elevation-1"
      >
        <template v-slot:item.index="{ item }">
          {{ item.index }}
        </template>
        <template v-slot:item.orderBtn="{ item }">
          <v-btn class="delete-btn" :loading="loading" @click="callOrder(item)">
            주문하기
          </v-btn>
        </template>
      </v-data-table>

      <ul class="product-list">
        <li
          class="product-list-item"
          v-for="(product, index) in productList"
          :key="product.id"
        >
          <div class="index">
            {{ index + 1 }}
          </div>
          <div class="content-wrapper">
            <p class="content-title">{{ product.name }}</p>
            <p class="description">
              갯수 {{ product.counts }} / 주문 일자
              {{ product.lastOrderDate }}
            </p>
          </div>
          <div>
            <v-btn
              class="delete-btn"
              :loading="loading"
              @click="cancelOrder(product)"
            >
              주문취소하기
            </v-btn>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState } from "vuex"
  import {
    arrayRemove,
    arrayUnion,
    doc,
    getDoc,
    updateDoc,
  } from "@firebase/firestore"
  import { db } from "../firebase"
  import moment from "moment"
  import { v4 as uuidv4 } from "uuid"

  export default {
    name: "ManageProduct",
    watch: {
      async uid() {
        await this.getProducts()
      },
    },
    data: () => ({
      productList: [],
      loading: false,
      productItemList: [
        {
          id: "monster",
          name: "몬스터 드링크",
          price: 123123123,
          minNum: 100,
          origin: "농심",
        },
        {
          id: "hotdog",
          name: "핫도그",
          price: 12334521,
          minNum: 100,
          origin: "롯데",
        },
        {
          id: "starbuck",
          name: "커피 원두",
          price: 213123,
          minNum: 100,
          origin: "스타벅스",
        },
      ],
    }),
    computed: {
      ...mapState("authStore", ["uid", "userInfo"]),
      headers() {
        return [
          {
            text: "이름",
            value: "name",
          },
          { text: "배급사", value: "origin" },
          { text: "가격", value: "price" },
          { text: "최소 주문 갯수", value: "minNum" },
          { text: "주문하기", value: "orderBtn" },
        ]
      },
    },
    methods: {
      ...mapActions("authStore", ["getUser"]),
      async callOrder(item) {
        this.loading = true

        await updateDoc(doc(db, "theater", this.userInfo.theather), {
          products: arrayUnion({
            id: uuidv4(),
            lastOrderDate: moment().format("YYYY-MM-DD"),
            name: item.name,
            counts: item.minNum,
          }),
        })

        await this.getProducts()
        this.loading = false
      },

      async cancelOrder(product) {
        console.log(product)

        this.loading = true

        await updateDoc(doc(db, "theater", this.userInfo.theather), {
          products: arrayRemove(product),
        })

        await this.getProducts()
        this.loading = false
      },

      async getProducts() {
        await this.getUser()

        const docSnapShot = await getDoc(
          doc(db, "theater", this.userInfo.theather),
        )

        this.productList = docSnapShot.data().products
      },
    },
    async mounted() {
      if (this.uid) await this.getProducts()
    },
  }
</script>

<style lang="scss" scoped>
  .container {
    padding: 20px;
    border-top: 1px solid #e0e0e0;
    .product-list {
      border: 1px solid rgb(245, 245, 245);
      background-color: rgb(245, 245, 245);
      border-radius: 8px;

      margin-top: 20px !important;
      padding-right: 20px !important;

      .product-list-item {
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

          .description {
            font-size: 12px;
            color: #57606a;
          }
        }
      }
    }
  }
</style>
