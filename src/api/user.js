import request from '@/utils/request'
/**
 * 获取用户信息
 * @returns
 */
export const getUserInfoAPI = () => {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}
export const getUserDetailById = (id) => {
  return request({
    url: `/sys/user/${id}`,
    method: 'GET'
  })
}
/** *
 *
 * 保存员工的基本信息
 * **/
export function saveUserDetailById(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}
