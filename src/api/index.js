import {http} from '@/utils/request'

// 登录
export const login = (data) => {
  return http.request({
    url: '/user/login',
    method: 'post',
    data,
  })
}

// 获取用户信息
export const getCurrentUser = () => {
  return http.request({
    url: '/user/get/info',
    method: 'get',
  })
}

// 退出登录
export const userLogout = () => {
  return http.request({
    url: '/user/logout',
    method: 'post',
  })
}
