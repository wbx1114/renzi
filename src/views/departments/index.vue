<template>
  <div v-loading="loading" class="departments-container">
    <el-card>
      <treeTools :tree-node="company" :is-root="false" @addDepts="handleAddDept" />
    </el-card>
    <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
      <!-- 传入内容 插槽内容 会循环多次 有多少节点 就循环多少次 -->
      <!-- 作用域插槽 slot-scope="obj" 接收传递给插槽的数据   data 每个节点的数据对象-->
      <tree-tools slot-scope="{ data }" :tree-node="data" @addDepts="handleAddDept" @editDepts="editDepts" @refshList="getDepartments" />
    </el-tree>
    <addDept ref="addDept" :show-dialog.sync="showDialog" :node="node" /></div>
</template>

<script>
import treeTools from './components/tree-tools.vue'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils/index'
import addDept from './components/add-dept.vue'
export default {
  name: 'HrsaasIndex',
  components: {
    treeTools,
    addDept
  },
  data() {
    return {
      showDialog: false,
      departs: [],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      },
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' },
      node: {},
      loading: false
    }
  },
  created() {
    this.getDepartments()
  },

  methods: {
    async getDepartments() {
      try {
        this.loading = true
        const { depts, companyManage, companyName } = await getDepartments()
        this.departs = tranListToTreeData(depts, '')
        this.company = { name: companyName, manager: companyManage, id: '' }
      } finally {
        this.loading = false
      }
    },
    handleAddDept(node) {
      this.node = node
      // addDept显示
      // addDept组件引入
      // addDept组件 绑定变量showDialog
      this.showDialog = true
    },
    editDepts(node) {
      this.showDialog = true
      this.node = { ...node }
      // 数据回显
      this.$refs.addDept.formData = { ...node }
    }
  }
}

</script>

<style lang="scss" scoped>
.departments-container {
  width: 900px;
  margin: 20px auto;
  .el-tree {
    .el-tree-node__content {
      // padding-right: 20px;
    }
  }
}
</style>
