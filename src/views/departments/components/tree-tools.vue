<template>
  <el-row type="flex" justify="space-between" align="middle" style="width: 100%">
    <el-col>
      <!-- 名称应该变成 对应的节点中的name -->
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <!-- 两个内容 -->
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <el-dropdown @command="handleCommand">
            <span>操作<i class="el-icon-arrow-down" /></span>
            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="isRoot" command="edit">编辑子部门</el-dropdown-item>
              <el-dropdown-item v-if="isRoot" command="del">删除子部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartments } from '@/api/departments'
export default {
  props: {
    //   定义一个props属性
    treeNode: {
      type: Object, // 对象类型
      required: true // 要求对方使用您的组件的时候 必须传treeNode属性 如果不传 就会报错
    },
    isRoot: {
      type: Boolean,
      default: true

    }
  },
  methods: {
    handleCommand(type) {
      if (type === 'add') {
        // 新增
        this.$emit('addDepts', this.treeNode)
      } else if (type === 'edit') {
        // 编辑
        this.$emit('editDepts', this.treeNode)
      } else {
        // 删除
        this.$confirm('是否确认删除该部门?', '提示', {
          type: 'warning'
        }).then(async res => {
          return delDepartments(this.treeNode.id)
        }).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.$emit('refshList')
        })
      }
    }
  }
}

</script>

<style>

</style>
