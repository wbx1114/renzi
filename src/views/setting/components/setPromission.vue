<template>
  <el-dialog
    title="分配权限"
    :visible="dialogVisible"
    width="50%"
    @close="close"
    @open="onOpen"
  >
    <el-tree ref="tree" node-key="id" :default-checked-keys="defCheckKeys" show-checkbox default-expand-all :data="data" :props="defaultProps" />
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="saveRolePromission">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getRoleInfo, assignPerm } from '@/api/roles'
import { getPermissions } from '@/api/employees'
import { tranListToTreeData } from '@/utils'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      require: true
    },
    roleId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      data: [],
      defaultProps: {
        label: 'name'
      },
      defCheckKeys: []
    }
  },
  methods: {
    close() {
      this.$emit('update:dialogVisible', false)
    },
    async onOpen() {
      const res = await getPermissions()
      this.data = tranListToTreeData(res, '0')
      this.getRolePremission()
    },
    async getRolePremission() {
      const res = await getRoleInfo(this.roleId)
      this.defCheckKeys = res.permIds
    },
    async saveRolePromission() {
      const id = this.roleId
      const permIds = this.$refs.tree.getCheckedKeys()
      await assignPerm({ id, permIds })
      this.$message.success('分配成功')
      this.close()
    }
  }
}
</script>

<style>

</style>
