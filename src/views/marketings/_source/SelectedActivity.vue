<template>
  <div class="selected-store-view">
    <el-table ref="dataTable" :data="selectedActivity">
      <el-table-column label="活动类型" width="80" show-overflow-tooltip>
        <template slot-scope="scope">{{ handleTemplateName(scope.row.activityTemplateCode) }}</template>
      </el-table-column>
      <el-table-column property="activityDetailName" label="活动名称" show-overflow-tooltip />
      <el-table-column label="活动时间" width="100" show-overflow-tooltip>
        <template slot-scope="scope">{{ handletimeRule(scope.row.beginTime,scope.row.endTime) }}</template>
      </el-table-column>
      <el-table-column property="sceneRule" label="活动场景">
        <template slot-scope="scope">{{ scope.row.sceneRule===1?'线上活动':'线下活动' }}</template>
      </el-table-column>
      <el-table-column property="countRule" label="抽奖次数">
        <template slot-scope="scope">{{ '可抽奖'+scope.row.countRule+'次' }}</template>
      </el-table-column>
      <el-table-column v-if="pageStatus!=3" label="操作" width="60">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageStatus: 1, // 1.新增 2.编辑 3.查看(特殊：编辑时，未开始到开始)
      selectedActivity: []
    }
  },
  methods: {
    show(selectedActivity) {
      this.selectedActivity = selectedActivity
    },
    showPage(selectedActivity, pageStatus) {
      this.pageStatus = pageStatus
      this.selectedActivity = selectedActivity
    },
    handletimeRule(beginTime, endTime) {
      return beginTime.replace('T', ' ') + '-' + endTime.replace('T', ' ')
    },
    handleTemplateName(activityTemplateCode) {
      let name = ''
      switch (activityTemplateCode) {
        case 'TA001':
          name = '领券中心'
          break
        case 'TC002':
          name = '支付有礼'
          break
        case 'TA003':
          name = '大转盘'
          break
        case 'TA004':
          name = '刮刮乐'
          break
      }
      return name
    },
    // 删除已选门店
    handleDel(row) {
      this.$confirm('确认删除吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.selectedActivity = this.selectedActivity.filter(
          item => item !== row
        )
        this.$emit('onDel', this.selectedActivity)
      })
    }
  }
}
</script>
<style lang="scss">
.selected-store-view {
  .el-pagination {
    text-align: right;
    margin-top: 15px;
  }
  .amTips {
    color: #606266;
  }
}
</style>
