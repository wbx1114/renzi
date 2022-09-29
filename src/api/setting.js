import request from '@/utils/request'
/**
 * 获取员工列表
 * @param {*} params
 * @returns
 */
export const getRoleList = (params) => {
  return request({
    url: '/sys/role',
    params
  })
}
/**
 * 新增角色
 * @param {*} data
 * @returns
 */
export const addRole = (data) => {
  return request({
    url: '/sys/role',
    data,
    method: 'POST'
  })
}
/**
 * 修改角色
 * ***/
export function updateRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    data,
    method: 'put'
  })
}
/** **
 *  删除角色
 *
 * ****/
export function deleteRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}
/**
 * 获取公司信息
 * **/
export function getCompanyInfo(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}

