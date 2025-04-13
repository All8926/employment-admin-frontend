import {http} from '@/utils/request'

// 新增合同
export const addContract = (data) => {
  return http.request({
    url: '/contract/add',
    method: 'post',
    data,
  })
}

// 更新合同
export const updateContract = (data) => {
  return http.request({
    url: '/contract/update',
    method: 'post',
    data,
  })
}

// 删除合同
export const deleteContract = (data) => {
  return http.request({
    url: '/contract/delete',
    method: 'post',
    data,
  })
}

// 合同列表分页
export const contractList = (data) => {
  return http.request({
    url: '/contract/list/page',
    method: 'post',
    data,
  })
}

// 审核合同
export const auditContract = (data) => {
  return http.request({
    url: '/contract/audit',
    method: 'post',
    data,
  })
}
