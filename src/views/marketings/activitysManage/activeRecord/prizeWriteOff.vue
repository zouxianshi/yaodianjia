<template>
  <div class="prize-write-modal app-container">
    <div class="nav-tool">
      <div>
        <span>兑换编码：</span>
        <el-input v-model="searchParams.prizeCode" size="mini" style="width:200px" />
        <el-button type="primary" size="mini" @click="openDia">核销</el-button>
      </div>
      <div style="margin-top: 10px">
        <el-radio-group v-model="searchParams.isHx" size="mini" @change="getList">
          <el-radio-button :label="null">全部</el-radio-button>
          <el-radio-button :label="1">已核销</el-radio-button>
          <el-radio-button :label="0">未核销</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <el-table :data="tableData" height="calc(100vh - 350px)" style="width: 100%">
      <el-table-column prop="activityType" label="活动类型">
        <template slot-scope="scope">
          {{ scope.row.activityType === 'TA003' ? '大转盘' : '刮刮乐' }}
        </template>
      </el-table-column>
      <el-table-column prop="activityName" label="活动名称" />
      <el-table-column prop="prizeType" label="奖品类型">
        实物
      </el-table-column>
      <el-table-column prop="prizeName" label="奖品名称" />
      <el-table-column prop="memberCardId" label="中奖人" />
      <el-table-column prop="prizeTime" label="中奖时间" />
      <el-table-column prop="hxTime" label="核销时间" />
    </el-table>
    <div class="page-info">
      <el-pagination
        :current-page="pageInfo.currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog :visible.sync="dialogVisible" width="60%" :append-to-body="true">
      <span slot="title" />
      <div class="dia-content">
        <el-table :data="tabelDataPrice" empty-text="没有该中奖账户！">
          <el-table-column prop="prizeType" label="奖品类型">
            实物
          </el-table-column>
          <el-table-column prop="prizeName" label="奖品名称" />
          <el-table-column prop="memberCardId" label="中奖人" />
          <el-table-column prop="prizeTime" label="中奖时间" />
          <el-table-column label="是否核销">
            <template slot-scope="scope">
              {{ scope.row.isHx === 1? '已核销' : '未核销' }}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" style="text-algin:center">
        <el-button size="mini" @click="dialogVisible=false">{{ tabelDataPrice.length > 0 ? '取消' : '返回' }}</el-button>
        <el-button v-if="tabelDataPrice.length > 0 ? tabelDataPrice[0].isHx === 0 : false" size="mini" type="primary" @click="hexiao">确定核销</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { prizeUseList, hexiaoPrize } from '@/api/winning-use'
export default {
  data() {
    return {
      tableData: [],
      // 核销列表
      tabelDataPrice: [],
      searchParams: {
        'isHx': null,
        'prizeCode': ''
      },
      pageInfo: {
        pageSize: 10,
        currentPage: 1
      },
      totalCount: 0,
      dialogVisible: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleSizeChange(val) {
      this.pageInfo.currentPage = 1
      this.pageInfo.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val
      this.getList()
    },
    getList() {
      const params = Object.assign({}, this.pageInfo, { isHx: this.searchParams.isHx })
      prizeUseList(params).then(res => {
        if (res.data) {
          this.tableData = res.data.data
          this.totalCount = res.data.totalCount
        }
      })
    },
    // 打开核销列表
    openDia() {
      if (this.searchParams.prizeCode.trim() === '') {
        this.$message({
          message: '请填写兑换编码！',
          type: 'error'
        })
        return
      }
      const params = {
        prizeCode: this.searchParams.prizeCode,
        pageSize: 10,
        currentPage: 1
      }
      prizeUseList(params).then(res => {
        if (res.data && res.data.data) {
          this.tabelDataPrice = res.data.data
        } else {
          this.tabelDataPrice = []
        }
        this.dialogVisible = true
      })
    },
    // 核销实物
    hexiao() {
      var params = {
        merCode: this.$store.state.user.merCode
      }
      if (this.tabelDataPrice.length === 1) {
        params.prizeId = this.tabelDataPrice[0].id
      }
      hexiaoPrize(params).then(res => {
        if (res.code === '10000') {
          this.$message({
            message: '核销成功！',
            type: 'success'
          })
          this.dialogVisible = false
          this.getList()
        }
      })
    }
  }
}
</script>
<style lang="scss">
.prize-write-modal{
  .nav-tool{
    margin: 10px 0;
  }
  .page-info{
    text-align: right;
    margin-top: 10px;
    width: 100%;
  }
}
</style>
