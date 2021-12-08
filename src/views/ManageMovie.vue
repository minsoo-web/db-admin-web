<template>
  <div>
    <v-sheet
      tile
      height="56"
      class="d-flex"
      style="
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        font-size: 20px;
      "
    >
      <span>배급 영화 관리</span>

      <p v-if="userInfo" class="title">
        {{ userInfo.name }}의 영화관: {{ userInfo.theather }}
      </p>
    </v-sheet>

    <div class="container">
      <p class="title">현재 상영중인 영화</p>
      <ul class="movie-list">
        <li class="movie-list-item" :key="movie.id" v-for="movie in movieList">
          <img class="poster" :src="movie.posterUrl" alt="" />
          <div class="description-container">
            <div class="description-wrapper">
              <p>{{ movie.movieNm }}</p>
              <p>평점: {{ movie.rate }}</p>
            </div>

            <div class="checkbox-wrapper">
              <v-simple-checkbox
                :value="movie.isPlaying"
                @input="callPatchAPI($event, movie)"
                :ripple="false"
              ></v-simple-checkbox>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { collection, doc, getDoc, getDocs } from "@firebase/firestore"
  import { mapActions, mapState } from "vuex"
  import { db } from "../firebase"
  export default {
    name: "ManageMovie",
    watch: {
      async uid() {
        await this.getUser()
        await this.getTheater()
        await this.getMovies()
      },
    },
    computed: {
      ...mapState("authStore", ["uid", "userInfo"]),
    },
    data: () => ({
      movieList: [],
      theaterMovieList: [],
    }),
    methods: {
      ...mapActions("authStore", ["getUser"]),
      async getTheater() {
        const snapshot = await getDoc(
          doc(db, "theater", this.userInfo.theather),
        )

        const movies = snapshot.data().movies
        this.theaterMovieList = movies
      },

      async getMovies() {
        const snapShot = await getDocs(collection(db, "movies"))
        snapShot.forEach(data => {
          const movie = data.data()
          this.movieList.push(movie)
        })
      },
      async callPatchAPI(event, payload) {
        // 추가
        console.log(event)

        console.log(payload)
      },
    },
    async mounted() {
      if (this.uid) await this.getMovies()
    },
  }
</script>

<style lang="scss" scoped>
  .container {
    padding: 20px;
    border-top: 1px solid #e0e0e0;

    .movie-list {
      display: grid; /* 1 */
      grid-template-columns: repeat(auto-fill, 200px); /* 2 */
      gap: 40px;
      justify-content: space-between; /* 4 */

      .movie-list-item {
        .poster {
          width: 200px;
          aspect-ratio: 2 / 3;
          border-radius: 4px;
        }
        .description-container {
          display: flex;
          .description-wrapper {
            flex: 1;
          }
          .checkbox-wrapper {
            display: flex;
          }
        }
      }
    }
  }
</style>
