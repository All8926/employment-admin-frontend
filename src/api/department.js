import {http} from '@/utils/request'

// 部门树
export const departmentTree = (data) => {
  return http.request({
    url: '/department/tree',
    method: 'get',
    data,
  })
}

// 新增部门
export const addDepartment = (data) => {
  return http.request({
    url: '/department/add',
    method: 'post',
    data,
  })
}

// 更新部门
export const updateDepartment = (data) => {
  return http.request({
    url: '/department/update',
    method: 'post',
    data,
  })
}

// 删除部门
export const deleteDepartment = (data) => {
  return http.request({
    url: '/department/delete',
    method: 'post',
    data,
  })
}
