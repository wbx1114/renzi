<template>
  <div>
    <el-upload
      v-loading="loading"
      class="UpdateImg"
      action="#"
      list-type="picture-card"
      :on-preview="onPreview"
      :on-remove="onRemove"
      :file-list="fileList"
      :on-change="onChange"
      :http-request="onHttpRequest"
      :before-upload="beforeUpload"
      :limit="1"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <!-- 图片弹出层 -->
    <el-dialog
      title="图片预览"
      :visible.sync="previewDialog"
      width="50%"
    >
      <img style="width:100%" :src="previewImgUrl">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDmEWhosw10wjUHqID9wcBe5UwKD7799A4',
  SecretKey: 'mHoMpgWSBpIdqtu09ELbkiVGubXg7rcO'
})
export default {
  name: 'UpdateImg',
  props: {
    defaultUrl: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      fileList: [
        // { name: 'food.jpg', url: 'http://destiny001.gitee.io/image/cxk.gif' }
      ],
      previewDialog: false,
      previewImgUrl: '',
      loading: false
    }
  },
  watch: {
    defaultUrl() {
      this.fileList.push({
        name: 'default',
        url: this.defaultUrl
      })
    }
  },
  methods: {
    onPreview(file) {
      this.previewImgUrl = file.url
      this.previewDialog = true
    },
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    onChange(file, fileList) {
      this.fileList = fileList
    },
    onHttpRequest({ file }) {
      this.loading = true
      cos.putObject({
        Bucket: 'hz-33-1314348450', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-shanghai', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        Body: file, /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */
        onProgress: function(progressData) {
          console.log(JSON.stringify(progressData))
        }
      }, (err, data) => {
        if (err) return this.$message.error('上传图片失败')
        this.loading = false
        this.$emit('onSuccess', {
          imgUrl: 'https://' + data.Location
        })
      })
    },
    beforeUpload(file) {
      const allowTypes = ['image/jpeg', 'image/gif']
      const isHas = allowTypes.includes(file.type)
      if (!isHas) {
        this.$message.error('上传图片只能是 JPG、PNG 格式!')
        return false
      }
      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('图片不能超过1mb')
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.UpdateImg{
    width: 148px;
    height: 148px;
    overflow: hidden;
}
</style>
