<template>
  <v-app>
    <div style="position: fixed; z-index: 1000 ;width:100%"><nav-bar></nav-bar></div>
    <v-card>
      <v-app-bar
        color="#fcb69f"
        clipped-left
        dark
        src="http://first-bucket20201002.oss-cn-hangzhou.aliyuncs.com/img/img/picture/2.jpg"
        height="600"
      >
        <template v-slot:img="{ props }">
          <v-img v-bind="props" gradient="to top right, rgba(40,44,52,0.3), rgba(211,190,223,0.5)"></v-img>
        </template>
      </v-app-bar>
    </v-card>

    <v-main>
      <v-container class="main-content">
        <router-view />
      </v-container>
    </v-main>
    <my-footer></my-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import NavBar from '../components/NavBar'
import MyFooter from '../components/MyFooter'
export default {
  name: 'Layout',
  components: {
    NavBar,
    MyFooter
  },
  computed: {
    ...mapState({
      loginStatus: (state) => state.loginStatus,
      user: (state) => state.user
    })
  }
}
</script>

<style lang="scss" scoped>
.main-content {
  box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1) 0 5px 15px rgba(0, 0, 0, 0.07) !important;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  position: relative;
  top: -90px;
  width: 100%;
  margin: 0 auto;
  z-index: 900;
}
</style>
