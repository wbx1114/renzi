import axios from 'axios'
import { Message } from 'element-ui'
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
request.interceptors.response.use(response => {
  const { message, data, success } = response.data
  if (success) {
    return data
  }
  Message.error(message)
  return Promise.reject(new Error(message))
}, err => {
  Message.error(err.message)
  return Promise.reject(new Error(err))
})
export default request
