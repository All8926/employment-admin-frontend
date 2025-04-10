import {http} from '@/utils/request'

// 学生注册
export const register = (data) => {
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