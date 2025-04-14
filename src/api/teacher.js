import {http} from '@/utils/request'

// 教师注册
export const teacherRegister = (data) => {
  return http.request({
    url: '/teacher/register',
    method: 'post',
    data,
  })
}

// 教师列表分页
export const teacherList = (data) => {
  return http.request({
    url: '/teacher/list/page/vo',
    method: 'post',
    data,
  })
}

// 更新教师信息
export const updateTeacher = (data) => {
  return http.request({
    url: '/teacher/update',
    method: 'post',
    data,
  })
}

//删除教师
export const deleteTeacher = (data) => {
  return http.request({
    url: '/teacher/delete',
    method: 'post',
    data,
  })
}
 
