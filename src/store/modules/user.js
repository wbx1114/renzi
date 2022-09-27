import { login } from '@/api/login'
import { getUserInfoAPI, getUserDetailById } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: null,
    userInfo: {},
    hrsaasTime: 0
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    },
    DEL_USERINFO(state) {
      state.userInfo = {}
    },
    DEL_TOKEN(state) {
      state.token = null
    },
    GET_TIME(state, hrsaasTime) {
      state.hrsaasTime = hrsaasTime
    }
  },
  actions: {
    async loginAction({ commit }, loginData) {
      const data = await login(loginData)
      commit('SET_TOKEN', data)
      commit('GET_TIME', new Date().getTime())
    },
    async  getUserInfo({ commit }) {
      const res1 = await getUserInfoAPI()
      const res2 = await getUserDetailById(res1.userId)
      console.log(res2)
      const res = { ...res1, ...res2 }
      commit('SET_USER_INFO', res)
      return JSON.parse(JSON.stringify(res))
    },
    logout({ commit }) {
      commit('DEL_USERINFO')
      commit('DEL_TOKEN')
    }
  }
}
