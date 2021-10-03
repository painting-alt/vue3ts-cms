import { createApp } from 'vue'

// import ElementPlus from '../node_modules/element-plus'
// import ElementPlus from 'element-plus'

import 'element-plus/dist/index.css'
import { globalRegister } from './global'

import 'normalize.css'
import './assets/css/index.less'

// import './service/axios_demo'

// import hyRequest from './service'

import App from './App.vue'
import router from './router'
import store from './store'
import { setupStore } from './store'

const app = createApp(App)

// registerApp(app)
// 注册element-plus
app.use(globalRegister)
// 只要重新运行代码 都会运行setupStore
// setupStore()要写在app.use(router之前)
// 在path 匹配路由之前，先将所有的路由都注册好
setupStore()

//执行app.use(router)其实是在执行install操作，然后路径和路由进行匹配，
//但是在没有执行setupStore之前，路由还没有注册，所以匹配不到
app.use(router)
app.use(store)
// app.use(ElementPlus)
app.mount('#app')

//.env 环境文件是通过运行 vue-cli-service 命令载入的，因此环境文件发生变化，你需要重启服务
// console.log(process.env.VUE_APP_BASE_URL)
// console.log(process.env.VUE_APP_BASE_NAME)

// interface DataType {
//   data: any
//   returnCode: string
//   success: boolean
// }

// hyRequest
//   .get<DataType>({
//     url: 'home/multidata',
//     // method: 'get',
//     interceptors: {
//       requestInterceptor: (config) => {
//         return config
//       },
//       responseInterceptor: (res) => {
//         return res
//       }
//     },
//     showLoading: false
//   })
//   .then((res) => {
//     console.log(res.data)
//   })
