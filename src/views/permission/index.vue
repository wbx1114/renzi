<template>
  <div class="app-container">
    <PageTools :type="type" :show-before="showBefore">
      <template #before>
        <span>共166条记录</span>
      </template>
      <template #after>
        <el-button size="small" type="warning" @click="$router.push('/import')">导入</el-button>
        <el-button size="small" type="danger" @click="exportExcel">导出</el-button>
        <el-button size="small" type="primary" @click="addEmploy">新增员工</el-button>
        <addEmploy :is-add-dialog.sync="isAddDialog" />
      </template>
    </PageTools>
    <!-- 放置表格和分页 -->
    <el-card>
      <el-table v-loading="loading" border :data="list">
        <el-table-column label="序号" sortable="" width="80" type="index" />
        <el-table-column label="头像" prop="username">
          <template slot-scope="{ row }"><img style="border-radius: 50%;width:100px;height:100px" :src="row.staffPhoto" @click="picBtn(row.staffPhoto)"></template>
        </el-table-column>
        <el-table-column label="姓名" prop="username" />
        <el-table-column label="工号" prop="workNumber" />
        <el-table-column label="聘用形式" prop="formOfEmployment" :formatter="formatEmployment" />
        <el-table-column label="部门" prop="departmentName" />
        <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
          <template slot-scope="{ row }">{{ row.timeOfEntry | formatDate }}</template>
        </el-table-column>
        <el-table-column label="账户状态" prop="enableState">
          <template slot-scope="{ row }">
            <!-- 根据当前状态来确定 是否打开开关 -->
            <el-switch :value="row.enableState === 1" />
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="280">
          <template slot-scope="{row}">
            <el-button type="text" size="small" @click="detail(row)">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small">角色</el-button>
            <el-button type="text" size="small" @click="del(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 二维码弹层 -->
      <el-dialog
        title="预览头像"
        :visible.sync="dialogVisibleCode"
        width="50%"
        @close="dialogVisibleCode=false"
      >
        <canvas ref="canvas" />
      </el-dialog>
      <!-- 分页组件 -->
      <el-row type="flex" justify="end" align="middle" style="height: 60px">
        <el-pagination
          background
          layout="prev, pager, next, sizes, total"
          :current-page.sync="page.page"
          :page-size.sync="page.size"
          :page-sizes="[2,5,10]"
          :total="total"
          @current-change="getEmployeeList"
          @size-change="getEmployeeList"
        />
      </el-row>
    </el-card>
  </div>
</template>
<script>
import EmployeeEnum from '@/api/constant/employees'
import PageTools from '@/components/PageTools'
import { getEmployeeList, delEmployee } from '@/api/permission'
import addEmploy from './components/addEmploy.vue'
import QRCode from 'qrcode'
export default {
  name: 'HrsaasIndex',
  components: {
    PageTools,
    addEmploy
  },
  data() {
    return {
      type: 'info',
      showBefore: true,
      page: {
        page: 1,
        size: 10
      },
      list: [],
      total: 0,
      loading: false,
      hireType: EmployeeEnum.hireType,
      isAddDialog: false,
      dialogVisibleCode: false
    }
  },

  mounted() {
    this.getEmployeeList()
  },

  methods: {
    async getEmployeeList() {
      try {
        this.loading = true
        const { rows, total } = await getEmployeeList(this.page)
        this.list = rows
        this.total = total
      } finally {
        this.loading = false
      }
    },
    formatEmployment(row, column, cellValue) {
      const obj = this.hireType.find(item => item.id === cellValue)
      return obj && obj.value || '非正式'
    },
    addEmploy() {
      this.isAddDialog = true
    },
    async del(id) {
      try {
        await this.$confirm('确认删除该员工吗?', '提示', {
          type: 'warning'
        })
        await delEmployee(id)
        this.getEmployeeList()
        this.$message.success('删除成功')
      } catch (error) {
        console.log(error)
      }
    },
    async exportExcel() {
      const { export_json_to_excel } = await import('@/wendor/Export2Excel.js')
      const { rows } = await getEmployeeList({
        page: 1,
        size: this.total
      })
      const exportExcelMapPath = {
        '手机号': 'mobile',
        '姓名': 'username',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      // 表头数据
      const header = Object.keys(exportExcelMapPath)
      // 表内容数据
      const data = rows.map(item => {
        return header.map(h => {
          if (h === '聘用形式') {
            const find = this.hireType.find(hire => {
              return hire.id === item[exportExcelMapPath[h]]
            })
            return find ? find.value : '未知'
          }
          return item[exportExcelMapPath[h]]
        })
      })
      export_json_to_excel({
        header, // 表头 必填
        data, // 具体数据 必填
        filename: '黑马学员33期学员表', // 非必填
        autoWidth: true, // 非必填
        bookType: 'xlsx' // 非必填
      })
    },
    detail(row) {
      this.$router.push('/permission/detail/' + row.id)
    },
    picBtn(staffPhoto) {
      if (!staffPhoto) return this.$message.error('暂无头像')
      this.dialogVisibleCode = true

      this.$nextTick(() => {
        QRCode.toCanvas(this.$refs.canvas, staffPhoto, function(error) {
          if (error) {
            console.error(error)
            console.log('success!')
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
