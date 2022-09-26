import { login } from '@/api/login'
import { getUserInfoAPI, getUserDetailById } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: null,
    userInfo: {}
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
    }
  },
  actions: {
    async loginAction({ commit }, loginData) {
      const data = await login(loginData)
      commit('SET_TOKEN', data)
    },
    async  getUserInfo({ commit }) {
      const res1 = await getUserInfoAPI()
      const res2 = await getUserDetailById(res1.userId)
      console.log(res2)
      const res = { ...res1, ...res2 }
      commit('SET_USER_INFO', res)
      return JSON.parse(JSON.stringify(res))
    }
  }
}
