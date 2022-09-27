import router from '@/router'
import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
const TimeOut = 3600

// 对比时间是否超时
function IsTimeOut() {
  const currentTime = Date.now() // 事件2 接口真正的调用时间
  const timeStamp = (currentTime - store.getters.hrsaasTime) / 1000
  return timeStamp > TimeOut // true超时/false
}
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
// axios设置请求拦截器
request.interceptors.request.use(config => {
  // 在这个位置需要统一的去注入token
  if (store.getters.token) {
    // 时间2-时间1 >token 超时的时间==》token登录失败
    if (IsTimeOut()) {
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('token超时'))
    }
    // 如果token存在 注入token
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config // 必须返回配置
}, error => {
  return Promise.reject(error)
})

request.interceptors.response.use(response => {
  const { message, data, success } = response.data
  if (success) {
    return data
  }
  Message.error(message)
  return Promise.reject(new Error(message))
}, err => {
  if (err.response.status === 401) {
    store.dispatch('user/logout')
    router.push('/login')
    Message.error('token超时')
  } else { Message.error(err.message) }
  return Promise.reject(new Error(err))
})
export default request
