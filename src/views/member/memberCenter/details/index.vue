<template>
  <div class="mc-details-model">
    <el-tabs class="mc-details-content" value="first" type="card">
      <el-tab-pane label="基本信息" name="first">
        <div class="mc-details-content-itmes">
          <m-base-info />
        </div>
      </el-tab-pane>
      <el-tab-pane label="健康档案" name="second">
        <div class="mc-details-content-itmes">
          <m-health-file />
        </div>
      </el-tab-pane>
      <el-tab-pane label="消费记录" name="third">
        <div class="mc-details-content-itmes">
          <m-expensesRecord />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import mBaseInfo from './_source/basicInfo'
import mHealthFile from './_source/healthFile'
import mExpensesRecord from './_source/expensesRecord'
export default {
  name: 'Details',
  components: {
    mBaseInfo, mHealthFile, mExpensesRecord
  },
  props: {},
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .mc-details-model{
    .el-tabs__header{
      background-color: #fff;
      padding-top:20px;
      .el-tabs__nav-scroll{
        padding: 0 32px;
      }
    }
    .mc-details-content{
      .mc-details-content-itmes{
        margin-top: -20px;
        height: calc(100vh - 220px);overflow: auto;padding-bottom: 10px;
        &::-webkit-scrollbar{
          width: 2px;
        }
      }
    }
  }
</style>
