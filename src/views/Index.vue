<template>
  <v-app>
    <v-app-bar height="56px" elevation="0" fixed class="nav-transparent">
      <div style="width: 100%"><nav-bar></nav-bar></div>
    </v-app-bar>
    <v-main>
      <v-carousel cycle height="900" hide-delimiter-background show-arrows-on-hover>
        <v-carousel-item v-for="(slide, i) in slides" :key="i">
          <v-sheet height="100%">
            <v-row class="fill-height">
              <img :src="slide" class="slider-img" width="100%" height="100%" style="opacity:0.5" />
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>

      <v-row style="width:80%;margin:0 auto;margin-top:-80px;">
        <v-col cols="12" md="6" v-for="(article, index) in indexList" :key="index">
          <v-hover v-slot="{ hover }">
            <v-card
              class="rounded-lg mask"
              height="500"
              link
              :elevation="hover ? 12 : 2"
              :class="{ 'on-hover': hover }"
            >
              <v-img class="white--text" :src="article.cover" height="100%" style="text-align:center;">
                <h4 class="light-grey--text my-6 pt-6">{{ article.category }}</h4>
                <h1 class="mt-6 mask pa-6">{{ article.title }}</h1>
                <div class="text-md-h6 light-grey--text pa-2 mask display">{{ article.summary }}</div>
                <v-btn rounded dark elevation="12" class="mt-6 px-12 py-6 purple-btn" @click="gotoDetail(article.id)">
                  <h3>阅读更多</h3>
                </v-btn>
              </v-img>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>

      <v-row style="width: 80%;margin: 0 auto;margin-top: 10px;">
        <v-col cols="12" md="4" v-for="(article, index) in articles" :key="index" @click="gotoDetail(article.id)">
          <v-hover v-slot="{ hover }">
            <v-card class="rounded-lg" height="550" link :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }">
              <v-img class="white--text align-end" :src="article.cover" height="55%">
                <h2 class="px-3 mb-6 mask">{{ article.title }}</h2>
              </v-img>
              <v-card-text class="text--primary">
                <div class="grey--text text-md-h6 display">{{ article.summary }}</div>
                <v-row justify="space-between" class="px-3 mt-5 text-md-h6 font-weight-regular">
                  <span>{{ article.publishDate }}</span>
                  <div>
                    <v-icon color="#38485c">
                      mdi-bookmark
                    </v-icon>
                    <span>{{ article.category }}</span>
                  </div>
                </v-row>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions class="px-3 mt-2">
                <v-btn class="bg-color mr-1" text v-for="(tag, index) in article.tagList" :key="index">
                  {{ tag.tagName }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
      <!-- 分页-->
      <v-row justify="space-around" class="my-6">
        <v-btn class="mx-2 grey" fab dark large elevation="12" :class="{ bgColor: pageNum > 1 }" @click="previous(e)">
          <v-icon dark>
            mdi-less-than
          </v-icon>
        </v-btn>
        <h2>{{ pageNum }}/{{ pages }}</h2>
        <v-btn
          class="mx-2 bgColor"
          fab
          dark
          large
          elevation="12"
          :class="{ greyColor: pageNum === pages }"
          @click="next"
        >
          <v-icon dark>
            mdi-greater-than
          </v-icon>
        </v-btn>
      </v-row>
    </v-main>
    <my-footer></my-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import NavBar from '../components/NavBar'
import MyFooter from '../components/MyFooter'
export default {
  name: 'Index',
  data: () => ({
    pageNum: 1,
    pages: 0,
    articles: [], //所有文章数组
    indexList: [], //推荐文章数组
    slides: [
      // {
      //   src:'http://first-bucket20201002.oss-cn-hangzhou.aliyuncs.com/img/img/picture/1.jpg'
      // },
      // {
      //   src:'http://first-bucket20201002.oss-cn-hangzhou.aliyuncs.com/img/img/picture/10.jpg'
      // },
      // {
      //   src:'http://first-bucket20201002.oss-cn-hangzhou.aliyuncs.com/img/img/picture/3.jpg'
      // },
      // {
      //   src:'http://first-bucket20201002.oss-cn-hangzhou.aliyuncs.com/img/img/picture/2.jpg'
      // },
      // {
      //   src:'http://first-bucket20201002.oss-cn-hangzhou.aliyuncs.com/img/img/picture/5.jpg'
      // },
    ] //轮播图数组
  }),
  components: {
    MyFooter,
    NavBar
  },
  computed: {
    ...mapState({
      loginStatus: (state) => state.loginStatus,
      user: (state) => state.user
    })
  },
  created() {
    this.getIndexList()
    this.getData()
  },
  methods: {
   getIndexList() {
     this.axios({
       method: 'GET',
       url: '/article/recommend',
       headers: {
         userId: this.user.id
       }
     }).then((res) => {
       console.log(res.data.data)
       this.indexList = res.data.data
       this.indexList.forEach((element) => {
         this.slides.push(element.cover)
       })
     })
   },
    
    getData() {
      this.axios({
        method: 'POST',
        url: '/article/page',
        params: {
          pageNum: this.pageNum
        },
        headers: {
          userId: this.user.id
        }
      }).then((res) => {
        console.log(res.data.data)
        this.articles.splice(0, 9)
        this.articles = res.data.data.list
        this.pages = res.data.data.pages
        this.indexList = this.articles.slice(0, 6)
        this.indexList.forEach((element) => {
          this.slides.push(element.cover)
        })
      })
    },
    next() {
      if (this.pageNum < this.pages) {
        this.pageNum++
        this.getData()
      } else {
        this.$layer.alert(
          '已经是最后一页了',
          {
            title: '提示',
            icon: 2 //0,1,2,3
          },
          (layerid) => {
            this.$layer.close(layerid)
          }
        )
      }
    },
    previous() {
      if (this.pageNum > 1) {
        this.pageNum--
        this.getData()
      } else {
        this.$layer.alert(
          '已经是第一页了',
          {
            title: '提示',
            icon: 2 //0,1,2,3
          },
          (layerid) => {
            this.$layer.close(layerid)
          }
        )
      }
    },
    gotoDetail(id) {
      console.log("进入跳转")
      this.$router.push({
        path: '/article/' + id
      })
    }
  }
  }

</script>
<style lang="scss" scoped>
.purple-btn {
  width: 140px;
  height: 80px;
  background: #654ea3; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, rgb(101, 78, 163), rgb(234, 175, 200)); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    rgb(101, 78, 163),
    rgb(234, 175, 200)
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.nav-transparent {
  background-color: transparent !important;
  background-image: none;
  box-shadow: none;
}
.display {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.mask {
  background-color: rgba(0, 0, 0, 0.2);
}
/*卡片悬停*/
.v-card {
  transition: All 0.4s ease-in-out;
  -webkit-transition: All 0.4s ease-in-out;
  -moz-transition: All 0.4s ease-in-out;
  -o-transition: All 0.4s ease-in-out;
}
.v-card:hover {
  transform: scale(1.05);
  -webkit-transform: scale(1.05);
  -moz-transform: scale(1.05);
  -o-transform: scale(1.05);
  -ms-transform: scale(1.05);
  opacity: 0.7;
}

.bgColor {
  background: #654ea3; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, rgb(101, 78, 163), rgb(234, 175, 200)); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    rgb(101, 78, 163),
    rgb(234, 175, 200)
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  opacity: 0.7;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 7px 10px 0 rgba(0, 0, 0, 0.12);
}

.greyColor {
  background-image: linear-gradient(to right, #333 0%, #aaa 100%);
  opacity: 0.7%;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 7px 10px 0 rgba(0, 0, 0, 0.12);
}
</style>
