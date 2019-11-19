import Vue from 'vue'
import App from './App'
import AcFrame from '@/common/acFrame'
import "@/static/fonts/iconfont.css"

Vue.config.productionTip = false
Vue.prototype.$acFrame = AcFrame

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
