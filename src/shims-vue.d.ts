/* eslint-disable */
// 这里的.vue 导出的都是一个个的component对象
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare let $store: any
declare module '*.json'
