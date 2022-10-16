<template>
  <div class="dashboard-container">
    <UpdateImg @onSuccess="onSuccess1" />
    <UpdateImg @onSuccess="onSuccess2" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UpdateImg from '@/components/UpdateImg'
export default {
  name: 'Dashboard',
  components: {
    UpdateImg
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    onSuccess1(val) {
      console.log(123, val)
    },
    onSuccess2(val) {
      console.log(456, val)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
