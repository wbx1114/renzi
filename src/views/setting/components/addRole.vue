<template>
  <el-dialog
    :title="title"
    width="50%"
    :visible.sync="dialogvisible"
    :before-close="handleBtn"
  >
    <el-form
      ref="roleDialogForm"
      label-width="80px"
      :model="formDate"
    >
      <el-form-item
        prop="name"
        label="角色"
        :rules="[{required:true,message:'角色必填',trigger:'blur'}]"
      >
        <el-input v-model="formDate.name" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="formDate.description" type="textarea" row="3" />
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center" align="middle" class="dialog-footer">
      <el-button @click="handleBtn">取 消</el-button>
      <el-button v-loading="loading" type="primary" @click="submit">确 定</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { addRole, updateRole } from '@/api/setting'
export default {
  props: {
    dialogvisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formDate: {
        name: '',
        description: ''
      },
      loading: false
    }
  },
  computed: {
    title() {
      return this.formDate.id ? '编辑角色' : '新增角色'
    }
  },
  methods: {
    handleBtn() {
      this.$emit('update:dialogvisible', false)
      this.$refs.roleDialogForm.resetFields()
      this.formDate = {
        name: '',
        description: ''
      }
    },
    async submit() {
      try {
        await this.$refs.roleDialogForm.validate()
        this.loading = true
        this.formDate.id ? await updateRole(this.formDate) : await addRole(this.formDate)
        this.$message.success(this.formDate.id ? '编辑成功' : '新增成功')
        this.handleBtn()
        this.$emit('refreshList')
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style>

</style>
