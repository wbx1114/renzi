import request from '@/utils/request'
/**
 * 获取权限s
 * @returns
 */
export function getPermissions() {
  return request({
    url: '/sys/permission'
  })
}
/**
 * 新增权限
 * @param {*} data
 * @returns
 */
export function addPermission(data) {
  return request({
    url: '/sys/permission',
    method: 'post',
    data
  })
}

/**
 * 删除权限
 * @param {*} id
 * @returns
 */
export function delPermission(id) {
  return request({
    url: `/sys/permission/${id}`,
    method: 'delete'
  })
}

/**
 * 更新权限
 * @param {*} data
 * @returns
 */
export function updatePermission(data) {
  return request({
    url: `/sys/permission/${data.id}`,
    method: 'put',
    data
  })
}
