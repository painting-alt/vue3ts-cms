import { Module } from 'vuex'

import { IAccount } from '@/service/login/type'
import { ILoginState } from './types'
import { IRootState } from '../types'
import { mapMenusToRoutes, mapMenusToPermissions } from '@/utils/map-menus'
import router from '@/router'

import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login'
import LocalCache from '@/utils/cache'

// 泛型中要求传两个：1.模块中state的类型 2.根store中的state类型
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  getters: {},
  mutations: {
    // 修改actions唯一的方式就是通过mutations
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
      // 只要用户登录成功，就可以获得到userMenus，所以菜单和路由的映射关系也可以在这做

      // userMenus映射到routes里面
      const routes = mapMenusToRoutes(userMenus)
      // console.log(routes)

      // 将routes添加到原来的router的main的children里面
      // router.addRoute() 用来动态添加路由的，给它一个名称 就会找到对应的一级路由
      // 注册所有路由
      routes.forEach((route) => {
        router.addRoute('main', route)
      })

      // 获取用户按钮的权限
      const permissions = mapMenusToPermissions(userMenus)
      // console.log(permissions)
      state.permissions = permissions
    }
  },
  actions: {
    // 账号登录的actions
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      // 1.实现登录逻辑
      //accountLoginRequest()拿到的是一个promise的结果
      const loginResult = await accountLoginRequest(payload)
      console.log(loginResult)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      // 将token做本地缓存
      // console.log(token)

      LocalCache.setCache('token', token)

      // (1)发送初始化的请求（完整的role/department）
      // 调用根中的action
      dispatch('getInitialDataAction', null, { root: true })

      // 2.请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      console.log(userInfoResult)
      // userInfo：用户信息 一般也是需要缓存的 在跳转到首页时显示
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      LocalCache.setCache('userInfo', userInfo)

      // 3.请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      console.log(userMenus)
      commit('changeUserMenus', userMenus)
      LocalCache.setCache('userMenus', userMenus)

      // 4.跳到首页
      router.push('/main')
    },
    // 再次让vuex中也保存上token的值
    loadLocalLogin({ commit, dispatch }) {
      const token = LocalCache.getCache('token')
      if (token) {
        commit('changeToken', token)
        // 本地加载 也需要发送请求
        dispatch('getInitialDataAction', null, { root: true })
      }
      const userInfo = LocalCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = LocalCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
    // phoneLoginAction({ commit }, payload: any) {
    //   console.log('执行phoneLoginAction')
    // }
  }
}

export default loginModule
