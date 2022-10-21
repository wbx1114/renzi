<template>
  <div>
    <el-row type="flex" justify="end">
      <el-col :span="4">
        <el-select v-model="value1" @change="timeChange">
          <el-option

            v-for="item in years"

            :key="item"

            :label="item"

            :value="item"
          />
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="value2" @change="timeChange">
          <el-option

            v-for="item in 12"

            :key="item"

            :label="item"

            :value="item"
          />
        </el-select>
      </el-col>
    </el-row>
    <el-calendar v-model="value">
      <template slot="dateCell" slot-scope="{date}">
        <div>
          <span>{{ date.getDate() }}</span>
          <span v-if="date.getDay()===6||date.getDay()===0">休</span>
        </div>
      </template>
    </el-calendar>

  </div>
</template>

<script>
export default {
  data() {
    return {
      value: new Date(),
      value1: '',
      value2: '',
      years: ['2020', '2022', '2023']
    }
  },
  created() {
    this.initYear()
  },
  methods: {
    initYear() {
      const date = new Date()
      this.currentYear = date.getFullYear()
      this.years = Array(11).fill(this.currentYear).map((item, index) => {
        return item - 5 + index
      })
    },
    timeChange() {
      this.value = this.value1 + '-' + this.value2
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-calendar__header {
 display: -webkit-box;
 display: -ms-flexbox;
 display: none;
 -webkit-box-pack: justify;
 -ms-flex-pack: justify;
 justify-content: space-between;
 padding: 12px 20px;
 border-bottom: 1px solid #EBEEF5;
}
::v-deep .el-calendar-table tr:first-child td{ border: none;
}
::v-deep .el-calendar-table td { border: none; margin-left: 20px;
}
</style>
