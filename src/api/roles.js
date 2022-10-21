import request from '@/utils/request'
/**
 * 获得人员角色列表
 */
export const getRoleList = () => {
  return request({
    url: '/sys/role'
  })
}
export const getRoleInfo = (id) => {
  return request({
    url: '/sys/role/' + id
  })
}

// 给角色分配权限
export function assignPerm(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data
  })
}
