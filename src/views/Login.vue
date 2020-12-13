<template>
  <div class="bg row">
    <v-form ref="form" v-model="valid" lazy-validation class="col" style="height:400px" v-if="!flag">
      <v-text-field v-model="phone" :counter="11" :rules="phoneRules" label="Phone" required></v-text-field>

      <v-text-field v-model="password" :rules="passRules" label="Password" required></v-text-field>
      <v-row>
        <v-col cols="12" md="8">
          <v-text-field v-model="verifyCode" label="verifyCode" required></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <img style="width: 150px; height: 40px;" class="verify" @click.prevent="getVerifyCode" ref="codeImg" />
        </v-col>
      </v-row>

      <v-checkbox
        v-model="checkbox"
        :rules="[(v) => !!v || '同意才能继续！']"
        label="同意社区协议？"
        required
      ></v-checkbox>
      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
        验证
      </v-btn>
      <v-btn color="primary" class="mr-4" @click="submit">
        登录
      </v-btn>
      <v-btn color="warning" @click="reset">
        重置
      </v-btn>
    </v-form>
    <v-dialog v-model="flag"  max-width="500" v-else>
      <v-card>
        <v-card-title>
          <v-img height="250" src="http://first-bucket20201002.oss-cn-hangzhou.aliyuncs.com/img/img/picture/2.jpg"></v-img>
          <v-card-text>
            进入我的博客
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-apacer></v-apacer>
            <v-btn color="primary" text @click="goIndex">
              I accept
            </v-btn>
          </v-card-actions>
        </v-card-title>
      </v-card>
    </v-dialog>

    <v-overlay absolute z-index="5" class="mask"></v-overlay>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data: () => ({
    flag: false,
    valid: true,
    phone: '',
    phoneRules: [(v) => !!v || '手机号不能为空', (v) => (v && v.length <= 11) || '手机号必须为11位'],
    password: '',
    passRules: [(v) => !!v || '密码不能为空', (v) => (v && v.length <= 11) || '密码必须为大于6小于10'],
    emailRules: [(v) => !!v || '密码不能为空', (v) => (v.length >= 6 && v.length <= 10) || '密码必须在6到10位之间'],
    checkbox: false,
    verifyCode:''
  }),
  created() {
    //页面创建，即请求获得验证码去填充图片标签
    this.getVerifyCode()
  },
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    getVerifyCode() {
      //点击验证码图片，重新请求验证码
      this.axios.get('/captcha?phone=' + this.phone, { responseType: 'blob' }).then((res) => {
        let img = this.$refs.codeImg
        let url = window.URL.createObjectURL(res.data)
        img.src = url
      })
    },
    goIndex() {
      this.flag = !this.flag
      this.$router.push('/')
    },
    submit() {
      this.axios({
        method: 'POST',
        url: '/user/captchaLogin',
        data: {
          phone: this.phone,
          password: this.password,
          captcha: this.verifyCode
        }
      }).then((res) => {
        if (res.data.code === 1) {
          this.flag = !this.flag
          /* alert('登陆成功') */
          this.$store.commit('login', res.data.data)
        }else{
          console.log(res.data)
          alert('登陆失败')
        }
      })
    }
  }
}
</script>
<style lang="scss">
.row {
  display: flex;
  align-items: center;
  justify-content: center;

  .col {
    flex: 0 0 40%;
    background-color: #eee;
    border-radius: 10px;
    z-index: 10;
    height: 80px;
    line-height: 80px;
  }
}
.bg {
  width: 100%;
  height: 100vh;
  background: url('https://static.tumblr.com/94eb957a00fd03c0c2f7d26decd71578/u1rhacw/osAmyyh1q/tumblr_static_tumblr_static_gaussian_blur_gradient_desktop_1680x943_wallpaper-393751.jpg');
}
.mask {
  background-image: linear-gradient(to right, #bf30ac 0%, #0f9d58 100%);
  opacity: 0.45;
  z-index: 5;
}
</style>