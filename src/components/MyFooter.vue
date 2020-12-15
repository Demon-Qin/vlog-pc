<template>
  <div class="footer-bg">
    <v-row justify="center" align="center">
      <v-col cols="12" md="12">
        2017-2020 ZYQin. 版权所有 站点总字数：
      </v-col>
      <v-col cols="12" md="12">
        本站已运行 0 年  10 天 10 小时 21 分钟 45 秒
      </v-col>
      <v-col cols="12" md="12">
        本站总访问量 235234 人次， 访客 3244 人
      </v-col>
    </v-row>
  </div>
</template>

<script >
export default{
   name:'MyFooter'
}
</script>
<style scoped>
.footer-bg{
    opacity:0.7;
    height: 140px;
    background: #12c2e9;  /* fallback for old browsers */      
    background: -webkit-linear-gradient(to right, rgb(18, 194, 233), rgb(196, 113, 237), rgb(246, 79, 89)); 
     /* Chrome 10-25, Safari 5.1-6 */      
     background: linear-gradient(to right, rgb(18, 194, 233), rgb(196, 113, 237), rgb(246, 79, 89)); 
     /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */      
}
</style>
