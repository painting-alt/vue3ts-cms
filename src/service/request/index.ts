import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { HYRequestInterceptors, HYRequestConfig } from './type'
// 类具有更强的封装性，可以将函数都写在类里面，比导出多个函数更好
import { ElLoading } from '../../../node_modules/element-plus'
import { ILoadingInstance } from '../../../node_modules/element-plus/lib/components/loading/src/loading.type'

const DEFAULT_LOADING = true

class HYRequest {
  instance: AxiosInstance
  // 而可以传入什么样的拦截器在HYRequestInterceptors中定义好了
  interceptors?: HYRequestInterceptors
  loading?: ILoadingInstance
  showLoading: boolean

  //HYRequestConfig的作用：为了扩展interceptors属性，在创建实例时可以传入一些拦截器
  //因为原来的AxiosRequestConfig中是没有interceptors属性的
  constructor(config: HYRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)
    // 保存基本信息
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    //config.后面的是传进来的属性
    this.interceptors = config.interceptors //获取到的是传进来的对象

    // 使用拦截器
    // 1.实例的拦截
    // 从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    this.instance.interceptors.response.use(
      //这个拿到的就是传进来的请求拦截函数
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 2.添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据...'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close()

        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败！')
        } else {
          return res.data
        }
      },
      (err) => {
        this.loading?.close()
        // 例子：判断不同的httpErrorCode显示不同的错误信息
        if (err.response.state === 404) {
          console.log('404错误')
        }
        return err
      }
    )
  }

  // 3.请求的拦截
  // 默认 这里也是不能传拦截器的 因为原来的类型是AxiosRequestConfig，所以这里改为了HYRequestConfig
  // 返回结果是什么类型 应该由请求者决定 所以 这里使用泛型
  request<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1.单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      // 2.判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1.单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // 2.完成之后 再改为初始值
          this.showLoading = DEFAULT_LOADING
          // 3.将结果resolve返回出去
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        })
    })
  }

  // get去调用request
  get<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}
export default HYRequest
