import hyRequest from '../index'

import { IAccount, ILoginResult } from './type'
import { IDateType } from '../types'

// 枚举类型
enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/', // /users/1
  UserMenus = '/role/' //用法 role/1/menu
}

export function accountLoginRequest(account: IAccount) {
  return hyRequest.post<IDateType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

export function requestUserInfoById(id: number) {
  return hyRequest.get<IDateType>({
    url: LoginAPI.LoginUserInfo + id,
    //解决跳一下的问题
    showLoading: false
  })
}

export function requestUserMenusByRoleId(id: number) {
  return hyRequest.get<IDateType>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false
  })
}
