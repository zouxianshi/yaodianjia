<template>
  <div class="pop-beans-model">
    <el-dialog :visible.sync="dialogVisible" width="50%" :append-to-body="true" :close-on-click-modal="false" :before-close="closeDia">
      <div slot="title" class="dialog-title">健康豆明细</div>
      <div class="contents-body">
        <div class="nav-bar">
          <span>健康豆： 0</span>
          <el-select v-model="value" placeholder="请选择" @change="changeDate">
            <el-option
              v-for="item in options"
              :key="item.value"
              size="mini"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <el-table
          :data="tableData"
          :border="false"
          style="width: 100%"
          max-height="350"
        >
          <el-table-column
            prop="integral"
            label="健康豆数量"
            width="100"
          />
          <el-table-column
            prop="source"
            label="来源"
            width="140"
          />
          <el-table-column
            prop="createTime"
            label="发生时间"
          />
          <el-table-column
            prop="notes"
            label="备注"
          />
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="closeDia(null)">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { queryOnlineIntegra } from '@/api/memberService'
export default {
  data() {
    var nowS = new Date()
    var nowMon = nowS.getFullYear() + '-' + ('' + (nowS.getMonth() + 1)).padStart(2, '0')
    return {
      dialogVisible: false,
      options: [],
      value: nowMon,
      tableData: []
    }
  },
  created() {
    var year = []
    var month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    var nowYear = new Date().getFullYear()
    var nowMonth = new Date().getMonth() + 1
    for (let i = 0; i <= nowYear - 2019; i++) {
      year.push(2019 + i)
    }
    for (let i = 0; i <= year.length - 1; i++) {
      var obj = {}
      if (i === year.length - 1) {
        for (let j = 0; j < nowMonth; j++) {
          obj = {
            value: `${year[i]}-${('' + month[j]).padStart(2, '0')}`,
            label: `${year[i]}年${month[j]}月`
          }
          this.options.push(obj)
        }
      } else {
        for (let j = 0; j < 12; j++) {
          obj = {
            value: `${year[i]}-${('' + month[j]).padStart(2, '0')}`,
            label: `${year[i]}年${month[j]}月`
          }
          this.options.push(obj)
        }
      }
    }
    this.options.reverse()
  },
  methods: {
    closeDia(done) {
      if (done) {
        done()
      } else {
        this.dialogVisible = false
      }
      var nowS = new Date()
      this.value = nowS.getFullYear() + '-' + ('' + (nowS.getMonth() + 1)).padStart(2, '0')
    },
    changeDia(data) {
      if (data) {
        this.tableData = data.data
      }
      this.dialogVisible = true
    },
    // 改变查询日期
    changeDate(value) {
      var params = {
        'userId': 1,
        'date': value,
        'currentPage': 1,
        'pageSize': 10
      }
      queryOnlineIntegra(params).then(res => {
        this.tableData = res.data.data
      })
    }
  }
}
</script>
<style lang="scss" >
.dialog-title {
  font-size: 16px; font-weight:600;
}
.contents-body{
  margin: 10px auto;
  .el-table__header tr,
  .el-table__header th {
    padding: 0;
    height: 40px;
  }
  .nav-bar{
    margin-bottom: 10px;display: flex;justify-content: space-between;align-items: center;
  }
}
</style>
