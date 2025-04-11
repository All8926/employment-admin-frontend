import {http} from '@/utils/request'

// 学生注册
export const studentRegister = (data) => {
  return http.request({
    url: '/student/register',
    method: 'post',
    data,
  })
}

// 学生列表分页
export const studentList = (data) => {
  return http.request({
    url: '/student/list/page/vo',
    method: 'post',
    data,
  })
}

// 更新学生信息
export const updateStudent = (data) => {
  return http.request({
    url: '/student/update',
    method: 'post',
    data,
  })
}

//删除学生
export const deleteStudent = (data) => {
  return http.request({
    url: '/student/delete',
    method: 'post',
    data,
  })
}

// 新增简历
export const addResume = (data) => {
  return http.request({
    url: '/resume/add',
    method: 'post',
    data,
  })
}

// 获取简历列表
export const resumeList = (data) => {
  return http.request({
    url: '/resume/list/page',
    method: 'post',
    data,
  })
}

// 更新简历
export const updateResume = (data) => {
  return http.request({
    url: '/resume/update',
    method: 'post',
    data,
  })
}

// 删除简历
export const deleteResume = (data) => {
  return http.request({
    url: '/resume/delete',
    method: 'post',
    data,
  })
}
