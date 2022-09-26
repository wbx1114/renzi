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
