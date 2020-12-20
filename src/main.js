import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vuetify from './plugins/vuetify'
axios.defaults.baseURL = 'http://localhost:8081/api'


Vue.use(VueAxios,axios)

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)


new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
