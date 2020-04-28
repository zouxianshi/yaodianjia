<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-button class="btn btn-add" type="primary" size="small" @click.stop="toCreate()">新建活动</el-button>
      <section @keydown.enter="search()">
        <div class="search-form" style="margin-top:20px;margin-bottom:10px">
          <div class="search-item">
            <span class="label-name" style="width: 60px">活动状态</span>
            <el-select v-model="searchForm.state" size="small" placeholder="全部1" @change="search()">
              <el-option label="全部" :value="0" />
              <el-option label="进行中" :value="1" />
              <el-option label="未开始" :value="2" />
              <el-option label="已结束" :value="3" />
              <!-- <el-option label="已删除" :value="2" /> -->
            </el-select>
          </div>
          <div class="search-item">
            <span class="label-name" style="width: 60px">参与门店</span>
            <el-select
              v-model="searchForm.storeCode"
              size="small"
              placeholder="全部"
              @change="search()"
              @focus="_loadStoresList()"
            >
              <el-option
                v-for="item in storeData"
                :key="item.id"
                :label="item.stName"
                :value="item.stCode"
              />
            </el-select>
          </div>
          <div class="search-item">
            <span class="label-name" style="width: 60px">活动名称</span>
            <el-input
              v-model.trim="searchForm.activeName"
              size="small"
              style="width: 160px"
              @change="search()"
            />
          </div>
          <div class="search-item">
            <el-button size="small" type="primary" @click="search()">查 询</el-button>
            <el-button size="small" type="primary" @click="search()">导 出</el-button>
          </div>
        </div>
      </section>
      <section class="table-box webkit-scroll" style="height: calc(100% - 180px);overflow: auto">
        <el-table :data="tableData" style="width: 100%" size="small">
          <el-table-column prop="activityType" label="活动类型" min-width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.activityType === 0">其他类型</span>
              <span v-if="scope.row.activityType === 1">免费</span>
              <span v-if="scope.row.activityType === 2">积分</span>
              <span v-if="scope.row.activityType === 3">现金</span>
            </template>
          </el-table-column>
          <el-table-column prop="activityDetailName" label="活动名称" min-width="120" />
          <el-table-column label="金额门槛" min-width="80" prop="userRule" />
          <el-table-column label="活动开始时间" min-width="150" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.beginTime!=null?scope.row.beginTime.replace('T',' '):'-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="活动结束时间" min-width="150" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.endTime!=null?scope.row.endTime.replace('T',' '):'-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="时间状态" min-width="80" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.state===1" size="small" type="success">进行中</el-tag>
              <el-tag v-if="scope.row.state===2" size="small" type="info">未开始</el-tag>
              <el-tag v-if="scope.row.state===3" size="small" type="danger">已结束</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="状态" min-width="80" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status===0" size="small" type="info">已失效</el-tag>
              <el-tag v-else size="small">生效</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.state===2&&scope.row.status===1"
                plain
                size="mini"
                @click="toCreate(scope.row)"
              >编辑</el-button>
              <el-button
                v-else-if="scope.row.state===3||scope.row.state===1"
                plain
                size="mini"
                @click="toCreate(scope.row, 1)"
              >查看</el-button>
              <template v-if="scope.row.state===1&&scope.row.status===1">
                <el-button type="danger" size="mini" @click="handleDisable(scope.row)">失效</el-button>
              </template>
              <template v-else>
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
import {
  setNormalActivity,
  normalActivityList
} from '@/api/marketing'
import { queryStoreByOrgId } from '@/api/coupon'
import config from '@/utils/config'
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)
export default {
  name: 'Banner',
  data() {
    return {
      storeData: [{ stCode: '', stName: '全部', id: '' }],
      searchForm: {
        type: '-1', // 活动类型 (int)(10: 电子DM单, 11: 限时特惠, 12: 限时秒杀)
        activeName: '',
        storeCode: '', // 门店
        state: 0 // 活动.时间状态 int (2: 未开始, 1: 进行中, 3: 已结束)
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
      const startTimestamp = Date.parse(new Date(row.beginTime))
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
    // 门店
    _loadStoresList() {
      const param = {
        currentPage: 1,
        merCode: this.merCode,
        orgId: '',
        pageSize: 9999,
        storeProperty: ''
      }
      queryStoreByOrgId(param)
        .then(res => {
          console.log('_loadStoresList-------', res)
          res.data.data.map(st => {
            this.storeData.push({ stCode: st.stCode, stName: st.stName, id: st.id })
          })
        })
        .catch(() => {})
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
        this.$router.push(
          '/marketings/activity-manage/payment-gift/add?id=' +
            row.id +
            '&op=' +
            op
        )
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
      const params = {
        currentPage: this.pager.current,
        pageSize: this.pager.size,
        activityTemplateCode: 'TC002',
        merCode: this.merCode,
        activeName: this.searchForm.activeName,
        state: this.searchForm.state,
        storeCode: this.searchForm.storeCode
      }
      console.log('params', params)
      normalActivityList(params).then(res => {
        if (res.code === '10000') {
          this.tableData = res.data.records || []
          this.pager.total = res.data.total || 0
        } else {
          this.$message({
            message: res.msg,
            type: 'error',
            duration: 5 * 1000
          })
        }
      })
    },
    _delData(id) {
      const params = {
        id: id,
        state: 1
      }
      setNormalActivity(params).then(res => {
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
        id: id,
        state: 2
      }
      setNormalActivity(params).then(res => {
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
