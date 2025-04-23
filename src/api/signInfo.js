import {http} from '@/utils/request'

// 新增签约信息
export const addSignInfo = (data) => {
  return http.request({
    url: '/signInfo/add',
    method: 'post',
    data,
  })
}

// 修改签约信息
export const editSignInfo = (data) => {
  return http.request({
    url: '/signInfo/update',
    method: 'post',
    data,
  })
  
}

// 删除签约信息
export const deleteSignInfo = (data) => {
  return http.request({
    url: '/signInfo/delete',
    method: 'post',
    data,
  })
}

// 查询签约信息列表
export const signInfoList = (data) => {
  return http.request({
    url: '/signInfo/list/page',
    method: 'post',
    data,
  })
}