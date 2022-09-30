<template>
  <!-- 新增部门的弹层 -->
  <el-dialog title="新增部门" :visible="showDialog" @close="handleClose">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form ref="addDeptForm" :model="formData" label-width="120px" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择">
          <el-option label="username11" value="username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button type="primary" size="small">确定</el-button>
        <el-button size="small">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
import { getDepartments } from '@/api/departments'
export default {
  props: {
    // eslint-disable-next-line vue/require-prop-types
    showDialog: {
      type: Boolean,
      default: false
    },
    node: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    const codeCheck = async(rules, value, callback) => {
      const { depts } = await getDepartments()
      const isRepeat = depts.some(item => item.code === value)
      isRepeat ? callback(new Error(`组织架构中已经有部门使用${value}编码`)) : callback()
    }
    const nameCheck = async(rules, value, callback) => {
      const { depts } = await getDepartments()
      const deptstj = depts.filter(item => item.pid === this.node.id)
      console.log(deptstj)
      const isRepeat = deptstj.some(item => item.name === value)
      isRepeat ? callback(new Error(`该部门下已经存在${value}部门名称`)) : callback()
    //   isRepeat ? callback(new Error(`组织架构中已经有部门使用${value}编码`)) : callback()
    }
    return {
      // 部门名称（name）：必填 1-50个字符 / 同级部门中禁止出现重复部门

      // 部门编码（code）：必填 1-50个字符 / 部门编码在整个模块中都不允许重复

      // 部门负责人（manager）：必填

      // 部门介绍 ( introduce)：必填 1-300个字符
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      rules: {
        name: [
          { required: true, message: '部门名称必填', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称1-50个字符', trigger: 'blur' },
          { validator: nameCheck, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码必填', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码1-50个字符', trigger: 'blur' },
          { validator: codeCheck, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '部门负责人必填', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '部门介绍必填', trigger: 'blur' },
          { min: 1, max: 300, message: '部门编码1-300个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:showDialog', false)
      this.$refs.addDeptForm.resetFields()
    }
  }
}
</script>
