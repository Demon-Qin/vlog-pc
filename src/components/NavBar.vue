<template>
  <div class="nav-wrapper" ref="navbar" :class="{ bgColor: active }">
    <v-row class="nav-transparent mx-2 pl-12" justfy="space-between" align="center">
      <v-col cols="12" md="3">
        <router-link to="/index">
          <h1 class="grey--text">{{ user.nickname }}的博客</h1>
        </router-link>
      </v-col>
      <v-col cols="12" md="8">
        <router-link v-for="(item, index) in items" :to="item.path" :key="index" link class="mr-2">
          <v-btn text large class="nav-item text-md-h6 white--text">
            <v-icon right dark class="mr-2">
              {{ item.icon }}
            </v-icon>
            {{ item.text }}
          </v-btn>
        </router-link>
      </v-col>

      <v-col class="12" md="1">
        <v-menu right top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list color="accent">
            <v-list-item link>
              <v-list-item-title>系统设置</v-list-item-title>
            </v-list-item>
            <v-list-item link>
              <v-list-item-title>主题设置</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout" link>
              <v-list-item-title>退出登录</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'NavBar',
  data: () => ({
    active: false,
    items: [
      {
        icon: 'mdi-home',
        text: '主页',
        path: '/index'
      },
      {
        icon: 'mdi-format-list-bulleted-square',
        text: '分类',
        path: '/category'
      },
      {
        icon: 'mdi-message',
        text: '消息',
        path: '/message'
      },
      {
        icon: 'mdi-tag',
        text: '标签',
        path: 'tag'
      },
      {
        icon: 'mdi-link',
        text: '友链',
        path: '/friend'
      },
      {
        icon: 'mdi-account',
        text: '我的',
        path: '/my'
      }
    ]
  }),
  computed: {
    ...mapState({
      loginStatus: (state) => state.loginStatus,
      user: (state) => state.user
    })
  },
  mounted() {
    //页面产生滚动时实行监听
    this.$nextTick(function() {
      window.addEventListener('scroll', this.onScroll)
    })
  },
  methods: {
    onScroll() {
      let scrolled = document.documentElement.scrollTop || document.body.scrollTop
      //顶部nav-warapper 元素的高度
      // if (document.getElementByClassName('nav-wrapper')[0]){
      //     header_height = document.getElementByClassName('nav-bar')[0].offsetHeight
      //     console.log('滚动条位置'+scrolled)
      // }
      // 如果滚动点大于指定值，active变成true，导航加上背景色
      this.active = scrolled > 200
    },
    logout() {
      this.$store.commit('logout')
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="scss" scoped>
.nav-warpper {
  position: fixed;
  top: 10;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
}
.bgColor {
  opacity: 0.7;
  background: #654ea3; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, rgb(101, 78, 163), rgb(234, 175, 200)); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    rgb(101, 78, 163),
    rgb(234, 175, 200)
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
