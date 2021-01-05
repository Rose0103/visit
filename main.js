import Vue from 'vue'
import App from './App'
import {request} from "./common/request"
import drawer from "./components/drawer/drawer.vue"

import store from './store'
Vue.component('drawer',drawer)
Vue.config.productionTip = false

Vue.prototype.$store = store

Vue.prototype.$post = request.post
Vue.prototype.$get = request.get
Vue.prototype.$put = request.put
Vue.prototype.$del = request.del
Vue.prototype.$delete = request.delete
Vue.prototype.$download = request.download
Vue.prototype.$upload = request.upload
Vue.prototype.$login = request.login

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
