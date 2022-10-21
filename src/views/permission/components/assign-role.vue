<template>
  <div>
    <el-dialog
      title="提示"
      :visible="roleVisible"
      width="35%"
      @close="onClose"
      @open="getRoleList"
    >
      <el-checkbox-group v-model="checkList">
        <el-checkbox v-for="item in roles" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('update:roleVisible', false)">取 消</el-button>
        <el-button type="primary" @click="saveEmployeesRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList } from '@/api/roles'
import { getUserDetailById } from '@/api/user'
import { setEmployeesRoles } from '@/api/permission'
export default {
  props: {
    roleVisible: {
      type: Boolean,
      required: true
    },
    userId: {
      type: String,
      required: true
    }

  },
  data() {
    return {
      checkList: [],
      roles: []
    }
  },
  methods: {
    onClose() {
      this.$emit('update:roleVisible', false)
    },
    async  getRoleList() {
      const { rows } = await getRoleList()
      this.roles = rows
      this.getEmployRole()
    },
    async getEmployRole() {
      const res = await getUserDetailById(this.userId)
      this.checkList = res.roleIds || []
    },
    async saveEmployeesRole() {
      if (!this.checkList.length) return this.$message.error('请给员工分配权限')
      try {
        await setEmployeesRoles({ id: this.userId, roleIds: this.checkList })
        this.$message.success('分配成功')
        this.onClose()
      } catch (error) {
        this.$message.error('分配失败')
      }
    }
  }
}
</script>

<style>

</style>
