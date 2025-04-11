import {http} from '@/utils/request'

// 学生注册
export const enterpriseRegister = (data) => {
  return http.request({
    url: '/enterprise/register',
    method: 'post',
    data,
  })
}

// 学生列表分页
export const enterpriseList = (data) => {
  return http.request({
    url: '/enterprise/list/page/vo',
    method: 'post',
    data,
  })
}

// 更新学生信息
export const updateEnterprise = (data) => {
  return http.request({
    url: '/enterprise/update',
    method: 'post',
    data,
  })
}

//删除学生
export const deleteEnterprise = (data) => {
  return http.request({
    url: '/enterprise/delete',
    method: 'post',
    data,
  })
}