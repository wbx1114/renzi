import store from '@/store'
export default {
  computed: {
    ishasPermission() {
      return function(permissionId) {
        return !store.state.user.userInfo.roles.points.includes(permissionId)
      }
    }
  }
}
