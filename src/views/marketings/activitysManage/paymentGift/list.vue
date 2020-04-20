<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-button class="btn btn-add" type="primary" size="small" @click.stop="toCreate()">新建活动</el-button>
      <section @keydown.enter="search()">
        <div class="search-form" style="margin-top:20px;margin-bottom:10px">
          <div class="search-item">
            <span class="label-name" style="width: 80px">活动状态</span>
            <el-select
              v-model="searchForm.timeStatus"
              size="small"
              placeholder="全部"
              @change="search()"
            >
              <el-option label="全部" :value="-2" />
              <el-option label="进行中" :value="1" />
              <el-option label="未开始" :value="-1" />
              <el-option label="已结束" :value="0" />
            </el-select>
          </div>
          <div class="search-item">
            <span class="label-name" style="width: 80px">活动名称</span>
            <el-input v-model.trim="searchForm.name" size="small" style="width: 200px" />
          </div>
          <div class="search-item">
            <el-button size="small" @click="search()">查 询</el-button>
          </div>
        </div>
      </section>
      <section class="table-box webkit-scroll" style="height: calc(100% - 180px);overflow: auto">
        <el-table :data="tableData" style="width: 100%" size="small">
          <el-table-column prop="startTime" label="活动类型" min-width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.type === '10'">电子DM单</span>
              <span v-if="scope.row.type === '11'">限时特惠</span>
              <span v-if="scope.row.type === '12'">限时秒杀</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="活动名称" min-width="120" />
          <el-table-column prop="name" label="参与门店" min-width="120" />
          <el-table-column prop="startTime" label="活动开始时间" min-width="150" align="center" />
          <el-table-column prop="endTime" label="活动结束时间" min-width="150" align="center" />
          <el-table-column label="时间状态" min-width="80" align="center">
            <template slot-scope="scope">
              <el-tag v-if="statusCupte(scope.row)==0" size="small" type="info">未开始</el-tag>
              <el-tag v-if="statusCupte(scope.row)==1" size="small" type="success">进行中</el-tag>
              <el-tag v-if="statusCupte(scope.row)==2" size="small" type="danger">已结束</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="状态" min-width="80" align="center">
            <template slot-scope="scope">
              <el-tag v-if="statusCupte(scope.row)==2" size="small" type="info">已失效</el-tag>
              <el-tag v-else size="small">生效</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button
                v-if="statusCupte(scope.row)===0"
                plain
                size="mini"
                @click="toCreate(scope.row)"
              >编辑</el-button>
              <el-button
                v-else-if="statusCupte(scope.row)===2||statusCupte(scope.row)===1"
                plain
                size="mini"
                @click="toCreate(scope.row, 1)"
              >查看</el-button>
              <template v-if="statusCupte(scope.row)===1">
                <el-button type="danger" size="mini" @click="handleDisable(scope.row)">失效</el-button>
              </template>
              <template v-if="statusCupte(scope.row)===0||statusCupte(scope.row)===2">
                <el-button type="danger" size="mini" @click="handleDel(scope.row)">删除</el-button>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </section>
      <section class="c-footer">
        <el-pagination
          background
          :current-page="pager.current"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="pager.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pager.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { delActivity, disableActivity } from '@/api/marketing'
import config from '@/utils/config'
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)
export default {
  name: 'Banner',
  data() {
    return {
      searchForm: {
        type: '-1', // 活动类型 (int)(10: 电子DM单, 11: 限时特惠, 12: 限时秒杀)
        name: '',
        startTime: '',
        endTime: '',
        timeStatus: -2 // 活动.时间状态 int (-1: 未开始, 1: 进行中, 0: 已结束)
      },
      tableData: [],
      pager: {
        current: 1,
        size: 10,
        total: 0
      },
      dialogFormVisible: false
    }
  },
  computed: {
    ...mapGetters(['roles', 'merCode']),
    uploadFileUrl() {
      return `${this.uploadFileURL}`
    },
    headers() {
      return { Authorization: this.$store.getters.token }
    },
    merCode() {
      return this.$store.state.user.merCode || ''
    },
    upLoadUrl() {
      return `${this.uploadFileURL}/${config.merGoods}/1.0/file/_upload?merCode=${this.merCode}`
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    statusCupte(row) {
      const startTimestamp = Date.parse(new Date(row.startTime))
      const endTimestamp = Date.parse(new Date(row.endTime))
      const timestamp = Date.parse(new Date())
      if (timestamp < startTimestamp) {
        return 0
      } else if (timestamp > startTimestamp && timestamp < endTimestamp) {
        return 1
      } else if (timestamp > endTimestamp) {
        return 2
      }
    },
    fetchData() {
      this._getTableData()
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pager.size = val
      this._getTableData()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pager.current = val
      this._getTableData()
    },
    handleTimeChange(val, type) {
      console.log(val, type)
      if (type === 1 || type === 2) {
        // 搜索栏 1.开始时间 2.结束时间
        if (!val) {
          type === 1
            ? (this.searchForm.startTime = '')
            : (this.searchForm.endTime = '')
        } else {
          console.log('this.searchForm', this.searchForm)
          if (
            this.searchForm.startTime &&
            this.searchForm.endTime &&
            this.searchForm.startTime !== '' &&
            this.searchForm.endTime !== ''
          ) {
            // 比较时间
            const start = this.searchForm.startTime.replace(/[- :]/g, '')
            const end = this.searchForm.endTime.replace(/[- :]/g, '')
            if (parseInt(start) > parseInt(end)) {
              this.$message('结束时间必须大于开始时间')
              type === 1
                ? (this.searchForm.startTime = '')
                : (this.searchForm.endTime = '')
              return
            }
          }
        }
        this.search()
        // if (this.searchForm.startTime !== '' && this.searchForm.endTime !== '') {
        //   this.search()
        // } else {
        //   this.searchForm.startTime = ''
        //   this.searchForm.endTime = ''
        // }
      } else if (type === 3) {
        // dialog
        if (val && val.length === 2) {
          this.xForm.startTime = val[0]
          this.xForm.endTime = val[1]
        } else {
          this.xForm.startTime = ''
          this.xForm.endTime = ''
        }
      }
    },
    // 查询
    search() {
      this.pager = {
        current: 1,
        size: 10,
        total: 0
      }
      this._getTableData()
    },
    // 创建/op=1:查看/row不为空：编辑
    toCreate(row, op) {
      if (row) {
        this.$router.push('/marketings/activity-manage/payment-gift/add?id=' + row.id + '&op=' + op)
      } else {
        this.$router.push('/marketings/activity-manage/payment-gift/add')
      }
    },
    // 失效
    handleDisable(row) {
      console.log('delete row', row)
      this.$confirm('失效后该活动会立即结束，确定使该活动失效吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this._disableData(row.id)
      })
    },
    // 删除
    handleDel(row) {
      console.log('delete row', row)
      this.$confirm('确认删除吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this._delData(row.id)
      })
    },
    // 获取列表数据
    _getTableData() {
      this.tableData = [{ name: 'eee', startTime: '2019-10-21 22:22:22', endTime: '2019-10-28 22:22:22', id: '@@@' }]
      // const params = {
      //   type: this.searchForm.type,
      //   name: this.searchForm.name,
      //   minStartTime: this.searchForm.startTime,
      //   maxStartTime: this.searchForm.endTime,
      //   timeStatus: this.searchForm.timeStatus,
      //   currentPage: this.pager.current,
      //   pageSize: this.pager.size
      // }
      // console.log('params', params)
      // getActivityList(params).then(res => {
      //   if (res.code === '10000') {
      // this.tableData = res.data.data || []
      // this.pager.total = res.data.totalCount || 0
      //   } else {
      //     this.$message({
      //       message: res.msg,
      //       type: 'error',
      //       duration: 5 * 1000
      //     })
      //   }
      // })
    },
    _delData(id) {
      const params = {
        id: id
      }
      delActivity(params).then(res => {
        if (res.code === '10000') {
          this.$message.success('已删除')
          // 更新列表
          this._getTableData()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 失效数据
    _disableData(id) {
      const params = {
        id: id
      }
      disableActivity(params).then(res => {
        if (res.code === '10000') {
          this.$message.success('已失效')
          // 更新列表
          this._getTableData()
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>
<style lang="scss">
.scope-img-wrap {
  width: 60px;
  height: 40px;
  background: #f5f5f5;
  margin: auto;
  img {
    width: 100%;
    height: 100%;
  }
}
.x-dialog-body {
  width: 100%;
  display: flex;
  .form-box {
    flex: 1;
  }
  .preview-box {
    flex: 0 0 250px;
    .title {
      font-size: 18px;
    }
    .prview-pic {
      margin-top: 20px;
      width: 100%;
      height: 450px;
    }
  }
  .test-1 {
    color: red;
  }
}

.note-grey {
  font-size: 14px;
  line-height: 1.1;
  color: #999999;
}
</style>
