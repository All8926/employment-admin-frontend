import {http} from '@/utils/request'

// 企业信息注册
export const enterpriseRegister = (data) => {
  return http.request({
    url: '/enterprise/register',
    method: 'post',
    data,
  })
}

// 企业信息列表分页
export const enterpriseList = (data) => {
  return http.request({
    url: '/enterprise/list/page/vo',
    method: 'post',
    data,
  })
}

// 更新企业信息信息
export const updateEnterprise = (data) => {
  return http.request({
    url: '/enterprise/update',
    method: 'post',
    data,
  })
}

//删除企业信息
export const deleteEnterprise = (data) => {
  return http.request({
    url: '/enterprise/delete',
    method: 'post',
    data,
  })
}

// 新增资质
export const addCertification = (data) => {
  return http.request({
    url: '/enterprise/certification/add',
    method: 'post',
    data,
  })
}

// 分页获取资质列表
export const certificationList = (data) => {
  return http.request({
    url: '/enterprise/certification/list/page',
    method: 'post',
    data,
  })
}

// 更新资质
export const updateCertification = (data) => {
  return http.request({
    url: '/enterprise/certification/update',
    method: 'post',
    data,
  })
}

// 删除资质
export const deleteCertification = (data) => {
  return http.request({
    url: '/enterprise/certification/delete',
    method: 'post',
    data,
  })
}

// 审核资质
export const auditCertification = (data) => {
  return http.request({
    url: '/enterprise/certification/audit',
    method: 'post',
    data,
  })
}


