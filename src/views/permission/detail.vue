<template>
  <div>
    <div class="dashboard-container">
      <div class="app-container">
        <el-card class="box-card">
          <el-tabs v-model="activeName" @tab-click="tabClick">
            <el-tab-pane lazy label="登录账户设置" name="first">
              <el-form ref="form" style="margin-left: 120px; margin-top:30px" label-width="80px" :model="accountInfo" :rules="rules">
                <el-form-item label="姓名" prop="username">
                  <el-input v-model="accountInfo.username" style="width:300px" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input v-model="accountInfo.password" style="width:300px" type="password" />
                </el-form-item>
                <el-button type="primary" style="margin-left: 200px" @click="update">更新</el-button>
              </el-form>
            </el-tab-pane>
            <el-tab-pane lazy label="个人详情" name="second">
              <userInfo />
            </el-tab-pane>
            <el-tab-pane lazy label="岗位信息" name="third">
              <jobInfo />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserDetailById, saveUserDetailById } from '@/api/user'
import jobInfo from './components/job-info.vue'
import userInfo from './components/user-info.vue'
import Cookies from 'js-cookie'
export default {
  components: {
    jobInfo,
    userInfo
  },
  data() {
    return {
      activeName: Cookies.get('activeName') || 'first',
      accountInfo: {},
      rules: {
        username: [
          { required: true, message: '请输入员工名称', trigger: 'blur' },
          { min: 2, max: 10, message: '名称字数为2-10位', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码最短为6位', trigger: 'blur' }
        ]

      }
    }
  },
  created() {
    this.getUserDetailById()
  },
  methods: {
    async  getUserDetailById() {
      const data = await getUserDetailById(this.$route.params.id)
      this.accountInfo = data
    },
    async update() {
      try {
        await this.$refs.form.validate()
        await saveUserDetailById(this.accountInfo)
        this.$message.success('更新成功')
      } catch (error) {
        console.log(error)
      }
    },
    tabClick() {
      Cookies.set('activeName', this.activeName)
    }
  }
}
</script>

<style>

</style>
