<template>
  <div class="app-container">
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <el-row :gutter="10">
            <el-button size="small" type="primary" style="margin-left:10px" @click="divisible=true">新增角色</el-button>
          </el-row>
          <el-table
            v-loading="loading"
            :data="roleList"
            border=""
            style="width: 100%"
          >
            <el-table-column
              fixed
              label="序号"
              width="120"
              type="index"
            />
            <el-table-column
              prop="name"
              label="角色名称"
              width="240"
            />
            <el-table-column
              prop="description"
              label="描述"
            />
            <el-table-column
              label="操作"
            >
              <el-button size="small" type="success">分配权限</el-button>
              <el-button type="primary" size="small">编辑</el-button>
              <el-button size="small" type="danger">删除</el-button>
            </el-table-column>
          </el-table>
          <el-row type="flex" justify="end" align="middle" style="height: 60px">
            <el-pagination
              background
              layout="prev, pager, next,sizes"
              :total="totle"
              :current-page.sync="page.page"
              :page-size.sync="page.pagesize"
              :page-sizes="[2,5,10,15]"
              @current-change="getRole"
              @size-change="getRole"
            />
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">公司信息</el-tab-pane>
      </el-tabs>
    </el-card>
    <addRole :dialogvisible.sync="divisible" @refreshList="getRole" />
  </div>
</template>

<script>
import { getRoleList } from '@/api/setting'
import addRole from './components/addRole.vue'
export default {
  name: 'HrsaasIndex',
  components: {
    addRole
  },
  data() {
    return {
      activeName: 'first',
      page: {
        page: 1,
        pagesize: 10
      },
      totle: 0,
      roleList: [],
      loading: false,
      divisible: false
    }
  },

  mounted() {

  },
  created() {
    this.getRole()
  },
  methods: {
    async  getRole() {
      try {
        this.loading = true
        const { rows, total } = await getRoleList(this.page)
        this.totle = total
        this.roleList = rows
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
