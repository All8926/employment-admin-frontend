import {http} from '@/utils/request'

// 学生注册
export const departmentTree = (data) => {
  return http.request({
    url: '/department/tree',
    method: 'get',
    data,
  })
}
