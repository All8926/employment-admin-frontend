import {http} from '@/utils/request'

// 学生注册
export const register = (data) => {
  return http.request({
    url: '/student/register',
    method: 'post',
    data,
  })
}
