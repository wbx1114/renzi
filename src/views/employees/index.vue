<template>
  <div class="dashboard-container">
    <div class="app-container">
      <pageTools :show-before="false">
        <template #after>
          <el-button type="primary" @click="showAddPermission(1,'0')">添加权限</el-button>
        </template>
      </pageTools>
      <!-- 权限表格 -->
      <el-table
        ref="table"
        :data="tableData"
        style="width: 100%"
        row-key="id"
        border
      >
        <el-table-column
          prop="name"
          label="名称"
        >
          <template slot-scope="{row}">
            <template v-if="row.type===1">
              <i class="el-icon-folder-opened" @click="extendColumn(row)" />
              {{ row.name }}
            </template>
            <template v-if="row.type===2">
              <i style="margin-left:20px" class="el-icon-folder" />
              {{ row.name }}
            </template>
          </template>
        </el-table-column>
        <el-table-column
          prop="code"
          label="标识"
        />
        <el-table-column
          prop="description"
          label="描述"
        />
        <el-table-column
          label="操作"
        >
          <template slot-scope="{row}">
            <el-button v-if="row.type===1" type="text" @click="showAddPermission(2,row.id)">添加</el-button>
            <el-button type="text" @click="edit(row)">编辑</el-button>
            <el-button type="text" @click="del(row)">删除</el-button>
          </template>
        </el-table-column></el-table>

      <!-- 新增权限弹层 -->
      <el-dialog
        :title="title"
        :visible.sync="addDialog"
        width="50%"
        @close="close"
      >

        <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
          <el-form-item label="权限名称" prop="name">
            <el-input v-model="formData.name" style="width:90%" />
          </el-form-item>
          <el-form-item label="权限标识" prop="code">
            <el-input v-model="formData.code" style="width:90%" />
          </el-form-item>
          <el-form-item label="权限描述">
            <el-input v-model="formData.description" style="width:90%" />
          </el-form-item>
          <el-form-item label="开启">
            <el-switch
              v-model="formData.enVisible"
              active-value="1"
              inactive-value="0"
            />
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="close">取 消</el-button>
          <el-button type="primary" @click="btnOK">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getPermissions, addPermission, delPermission } from '@/api/employees'
import { tranListToTreeData } from '@/utils/index'
export default {
  name: 'Employees',
  components: {
  },
  data() {
    return {
      tableData: [],
      addDialog: false,
      formData: {
        name: '',
        code: '',
        description: '',
        enVisible: '0',
        type: '',
        pid: ''
      },
      rules: {
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {
    title() {
      return this.formData.pid ? '添加权限' : '编辑权限'
    }
  },
  created() {
    this.getPermissions()
  },
  methods: {
    async getPermissions() {
      this.tableData = tranListToTreeData(await getPermissions(), '0')
    },
    extendColumn(row) {
      // 参数1：传递一行的数据
      // 参数2：展开的状态
      // row.isExpand 没有这个属性 ！undefined
      row.isExpand = !row.isExpand
      this.$refs.table.toggleRowExpansion(row, row.isExpand)
    },
    close() {
      this.formData = {
        name: '',
        code: '',
        description: '',
        type: '',
        pid: '',
        enVisible: '0'
      }
      this.$refs.form.resetFields()
      this.addDialog = false
    },
    showAddPermission(type, pid) {
      this.formData.type = type
      this.formData.pid = pid
      this.addDialog = true
    },
    btnOK() {
      this.$refs.form.validate(async(valid) => {
        if (!valid) return
        await addPermission(this.formData)
        this.$message.success('添加权限成功')
        this.addDialog = false
        this.getPermissions()
      })
    },
    async del(row) {
      await delPermission(row.id)
      this.getPermissions()
      this.$message.success('删除成功')
    },
    edit(row) {
      this.addDialog = true
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-table__expand-icon{
  display: none !important;
}

</style>
