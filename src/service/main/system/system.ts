import hyRequest from '../../index'
import { IDateType } from '../../types'

export function getPageListData(url: string, queryInfo: any) {
  return hyRequest.post<IDateType>({
    url: url,
    data: queryInfo
  })
}

// url: /users/id
export function deletePageData(url: string) {
  return hyRequest.delete<IDateType>({
    url: url
  })
}

export function createPageData(url: string, newData: any) {
  return hyRequest.post<IDateType>({
    url: url,
    data: newData
  })
}

export function editPageData(url: string, editData: any) {
  return hyRequest.patch<IDateType>({
    url: url,
    data: editData
  })
}
