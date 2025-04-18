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

// 编辑用户
const editApiMap = {
  'student': '/student/edit',
  'teacher': '/teacher/edit',
  'admin': '/teacher/edit',
  'enterprise': '/enterprise/edit'
}

export const editUser = (data) => {
  console.log(data);
  console.log(data.userRole);
  console.log(editApiMap[data.userRole]);

  if (!editApiMap[data.userRole]) {
    return Promise.reject('无效的用户角色')
  }
  console.log(editApiMap[data.userRole]);
  return http.request({
    url: editApiMap[data.userRole],
    method: 'post',
    data,
  })
}

// 文件上传
export const uploadFile = (data,biz) => {
  return http.request({
    url: '/file/upload?biz='+biz,
    method: 'post',
    data
  })
}

// 用户审核
export const userAudit = (data) => {
  return http.request({
    url: '/user/audit',
    method: 'post',
    data
  })
}

// 审核记录
export const auditLogList = (data) => {
  return http.request({
    url: '/audit/list/page',
    method: 'post',
    data
  })
}
