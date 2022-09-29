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
              <template slot-scope="{row}">
                <el-button size="small" type="success">分配权限</el-button>
                <el-button type="primary" size="small" @click="editRole(row)">编辑</el-button>
                <el-button size="small" type="danger" @click="delRole(row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-row type="flex" justify="end" align="middle" style="height: 60px">
            <el-pagination
              v-if="totle>0"
              background
              layout="prev, pager, next,sizes"
              :total="totle"
              :current-page.sync="
                page.page"
              :page-size.sync="page.pagesize"
              :page-sizes="[2,5,10,15]"
              @current-change="getRole"
              @size-change="getRole"
            />
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          />
          <el-form label-width="120px" style="margin-top:50px">
            <el-form-item label="公司名称">
              <el-input v-model="companyInfo.name" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input v-model="companyInfo.companyAddress" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="companyInfo.mailbox" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="companyInfo.remarks" type="textarea" :rows="3" disabled style="width:400px" />
            </el-form-item>
          </el-form>
        </el-tab-pane>

      </el-tabs>
    </el-card>
    <addRole ref="addRoles" :dialogvisible.sync="divisible" @refreshList="getRole" />
  </div>
</template>

<script>
import { getRoleList, deleteRole, getCompanyInfo } from '@/api/setting'
import addRole from './components/addRole.vue'
import { mapGetters } from 'vuex'
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
      divisible: false,
      companyInfo: []
    }
  },

  mounted() {
    this.getCompanyInfo()
    this.getRole()
  },
  // eslint-disable-next-line vue/order-in-components
  computed: {
    ...mapGetters(['companyId'])
  },
  created() {
  },
  methods: {
    async  getRole() {
      try {
        this.loading = true
        const { rows, total } = await getRoleList(this.page)
        if (total > 0 && rows.length === 0) {
          this.page.page--
          this.getRole()
        }
        this.totle = total
        this.roleList = rows
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    editRole(row) {
      this.$refs.addRoles.formDate = { ...row }
      this.divisible = true
    },
    async delRole(id) {
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await deleteRole(id)
        this.getRole()
        this.message.success('删除成功')
      } catch (error) {
        console.log(error)
      }
    },
    async getCompanyInfo() {
    // 获取到公司接口封装好
    // 拿到companyId
    // 调用获取公司接口
      this.companyInfo = await getCompanyInfo(this.companyId)
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
